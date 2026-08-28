# Extraction guide

Read this before writing the extraction script for a new workbook. It explains the
*why* behind each rule — supplier price sheets from different vendors are laid out
inconsistently, so treat these as heuristics to apply in order, not a rigid parser.

## Why this document is strict: this data drives real sales quotes

The user runs a sales business on this data — a wrong price or a silently-dropped
product is not a cosmetic bug, it's a wrong quote to a real customer. The very first
version of this extraction (built and tested against the real APC file this skill was
created from) looked fine at a glance — reasonable category counts, no crash — and
still had four real accuracy bugs hiding in it: a broken boolean condition that skipped
category-header detection for some sheets, a category-header matcher that only
recognized labels containing specific keywords (silently misfiling 15 real products into
the wrong category when a vendor used different wording), a header-matching regex for
"Origin" that only matched the misspelled variant and silently returned `null` for every
correctly-spelled one, and — most dangerous of all — `Stock` values that were dates
(`"15-Jun"`) coming back as raw Excel serial numbers (`46188`) because the read call
didn't request formatted values. None of these threw an error. All of them looked like
working output. **"it ran without errors" and "the counts look plausible" are not
evidence of correctness for this task** — treat every extraction as unverified until you
have actually reconciled it against the source, per the checklist below.

## Verification checklist — do this for every sheet, every time

1. **Row reconciliation.** Every single row in the sheet must end up classified as
   exactly one of: a product, a category header, a promo/banner row, a continuation row
   merged into the product above it, the header row, a preamble row, or a blank row.
   `products_found + skipped_rows` must equal `total_rows`. If a row doesn't fit any
   known type, that is not a case to guess your way past — stop, print the row, and
   either extend the classification logic to handle it correctly or ask the user what it
   is. A script that silently drops an unrecognized row is worse than one that crashes
   on it, because a crash gets noticed.
2. **Column completeness.** After mapping the columns you expected (Part Number,
   Description, price tier(s), Origin, Stock, Warranty), check whether the sheet's
   header row still has *other* labeled columns you haven't accounted for. Vendors add
   columns you won't expect in advance — this workbook's `RBC APC` sheet has *three*
   stock-related columns (`Stock`, `Stock hiện tại`, `Hàng về cuối T5`), not one. Capture
   any remaining labeled column into a generic `extra_fields: [{label, value}]` on each
   product rather than assuming you've already found everything worth keeping.
3. **Read cells formatted, not raw.** Always read with SheetJS's `raw: false` option
   (`XLSX.utils.sheet_to_json(ws, { header: 1, defval: '', raw: false })`). Without it, a
   cell that's date-formatted in Excel (a restock date in a Stock column, for instance)
   comes back as the underlying serial number instead of the displayed text — a value
   that's silently wrong rather than missing, which is the worst kind of error for this
   use case.
4. **Spot-check real values against the source**, not just structural counts. Pick 3-5
   products spread across different sheets/categories, open the workbook and look at
   those exact rows, and compare every field — price, origin, stock, warranty, category —
   against what your script produced. Matching row *counts* proves your classification
   logic ran; it does not prove the *values* it captured are right. Both matter equally
   here.
5. **Flag duplicate part numbers within a sheet, don't silently dedupe them.** The same
   part number can legitimately appear more than once (e.g. one replacement battery
   compatible with several UPS models, each as its own row with a different
   compatibility note in the description) — that's real and correct. But a source
   spreadsheet can also just have an accidental copy-pasted duplicate row. Don't try to
   guess which case you're looking at; report every part number that repeats within a
   sheet, with each row's full content, and let the user decide whether it's expected or
   a mistake in their file. Silently deduplicating risks discarding a real second entry;
   silently keeping both without flagging risks the user unknowingly quoting from a typo.
6. **Report your reconciliation status to the user**, every time — not just a product
   count. "Read 8 sheets, 126 products, every row accounted for, 3 sets of duplicate part
   numbers found (listed below) — spot-checked against the source on 5 products, all
   matched" is a claim the user can trust. "Extracted 126 products" on its own is not.

## 1. Detecting the category for each product

Suppliers encode "what group does this belong to" in whichever way was convenient for
whoever built the spreadsheet — sometimes explicitly, sometimes only implicitly through
layout. Check these in order and use the most specific one that's actually present;
don't fall back further than you need to.

1. **Explicit category columns.** Look at the header row for anything meaning "product
   line/category/family/group" — in English (`Product Line`, `Product Category`,
   `Product Family`) or Vietnamese (`Nhóm hàng`, `Nhóm sản phẩm`, `Dòng sản phẩm`), or a
   breadcrumb-style column (`Navigation Path`) that reads like
   `Business Continuity Software >> Data Center Infrastructure Management`. When present,
   this is the supplier's own taxonomy — it's more reliable than anything you'd infer
   yourself, so use it directly. A breadcrumb splits on `>>` (or `/`) into a path array.

2. **In-sheet section header rows.** Many sheets group products by inserting a row that's
   *only* a label spanning where the data would be — e.g. a row reading
   `DÒNG APC SMART-UPS SMC (2 YEAR WARRANTY)` with every other column empty, followed by
   several real product rows, then another such row starting the next group. Detect these
   as: first cell has text, but it doesn't look like a product code (no plausible part
   number), and the price/description columns for that row are empty. Everything below a
   header row belongs to it until the next header row or the end of the sheet.
   Vietnamese section headers tend to start with words like "DÒNG", "LOẠI", "NHÓM" — but
   don't hard-match those words specifically; the "empty except the label" shape is the
   reliable signal, the wording varies by vendor.

3. **The sheet name itself.** If a sheet is titled `Back UPS` or `RBC APC`, that name
   already *is* a category — the person who built the workbook did the categorization by
   splitting it into tabs. Use the sheet name as the top-level category whenever nothing
   more specific applies within the sheet.

4. **Combine when both exist.** A sheet can have a name-level category *and* in-sheet
   section headers — e.g. sheet `SMC-SUA` containing both a `DÒNG ... SMC` and a
   `DÒNG ... SUA` section. In that case the category is a path:
   `"SMC-SUA" > "DÒNG APC SMART-UPS SMC (2 YEAR WARRANTY)"`. This gives you a category
   tree you can flatten or roll up later, rather than losing the finer grouping.

## 2. Telling product rows apart from everything else

A sheet is never *only* product rows. Skip, without treating as a product:

- Fully blank rows.
- The header row itself (`Part Number`, `Description`, ...).
- Promo/marketing banner rows — usually a long sentence in the first cell (voucher
  offers, "Tặng...", warranty program blurbs), often merged across columns, with no
  price or part-number-shaped value anywhere in the row.
- Section header rows (see above) — they set the current category, they aren't products.

**Watch for continuation rows.** Some sheets (e.g. rack cabinets) put a product's
technical spec paragraph on the row *below* it, with an empty Part Number cell —
that's not a second product, it's an overflow of the first one's description. If a row
has no part number but the row above did, and this row's non-empty cell(s) read like
spec prose rather than a new product, append its text to the previous product's
description instead of treating it as its own row (and definitely don't skip it — the
data in it is real and useful, just misplaced by the row-based layout).

A row *is* a product when its Part-Number-equivalent column (almost always the first
column) holds something that looks like an actual code — short, alphanumeric, no
sentence punctuation — and at least one of the price or description columns also has
content.

## 3. Splitting the Description cell

The Description column typically packs two different things into one cell, separated
by a newline: a clean product title on the first line, then a technical spec paragraph
below it. Split on the first `\n`:

- `name` = everything before the first newline (trimmed).
- `spec_text` = everything after it (trimmed), or `''` if there was no newline.

If a continuation row was merged in (see above), its text becomes part of `spec_text`
too.

## 4. Pricing — capture what's there, don't assume a shape

Different sheets price things differently: some have quantity-break tiers
(`SL 1-3` / `SL 4-10` / `SL>10`), some have one flat price (`Gia Ban` / `U/Price`),
some have a promo price alongside the list price. Don't hardcode column names — scan the
header row for anything that looks like a price column (label suggests it, and the
column's values are currency-formatted numbers with thousands separators), and capture
every one you find as `{ label: <header text>, value: <number, thousands-separators
stripped> }`. A product ends up with a `prices` array of however many tiers its sheet
actually has — one entry for a flat-price sheet, three for a tiered one.

## 5. Origin, stock, warranty

Match header cells case-insensitively for `Origin` **and** `Orgin` — this workbook uses
the correct spelling on some sheets and the typo on others, sometimes both across the
same source file, so match both explicitly (`/^(origin|orgin)$/i`) rather than a
"clever" single pattern meant to cover both — a pattern that looks like it should match
both spellings can still fail to match either one; the fix that actually worked was
matching the two exact known spellings, not a shorter regex. Carry Origin/Stock values
through as plain strings (stock is sometimes a number, sometimes "OK", sometimes a
date-like restock note — don't force it into a type it doesn't have, and remember rule 3
above: read with `raw: false` or a date-formatted Stock cell silently corrupts into a
serial number). For warranty, check both a dedicated `Warranty` column and the category
label itself, since vendors often state it there instead
(`"DÒNG APC SMART-UPS SMC (2 YEAR WARRANTY)"` → `warranty: "2 years"`).

## 6. Best-effort spec parsing

From `spec_text`, try to pull out structured facts when the pattern is unambiguous:
VA/W rating (`650VA`, `325W`), voltage (`230V`), output connection counts, rack height
(`42U`). Put whatever you confidently extract into a `specs` object; leave fields out
rather than guessing when the text is ambiguous — a missing field is harmless, a wrong
one pollutes the dataset. This step is a bonus, not a requirement — never let a
description you can't parse block you from recording the product's core fields.

## Output schema

Write one JSON file per input workbook:

```json
{
  "source_file": "TỔNG HỢP KHUNG GIÁ APC (1).xlsx",
  "extracted_at": "2026-08-23",
  "categories": [
    {
      "category": "SMC-SUA > DÒNG APC SMART-UPS SMC (2 YEAR WARRANTY)",
      "source": "sheet:SMC-SUA",
      "products": [
        {
          "part_number": "SMC1000IC",
          "name": "APC Smart-UPS C 1000VA LCD 230V with SmartConnect",
          "spec_text": "APC Smart-UPS, 1000VA/600W, Input 230V/Output 230V. Topology: Line Interactive...",
          "specs": { "capacity_va": 1000, "capacity_w": 600, "voltage": "230V" },
          "prices": [{ "label": "Gia Ban", "value": 7210000 }],
          "origin": "Philippines/India/China",
          "stock": "OK",
          "warranty": "2 years",
          "extra_fields": [{ "label": "Stock hiện tại", "value": "9" }]
        }
      ]
    }
  ],
  "summary": {
    "total_categories": 9,
    "total_products": 141,
    "by_category": { "Back UPS": 8, "SMC-SUA > ...SMC...": 9, "...": "..." },
    "duplicate_part_numbers": [
      { "sheet": "RBC APC", "part_number": "RBC55", "occurrences": 2 }
    ]
  }
}
```

`extra_fields` is whatever's left after the named fields — usually empty, present only
when a sheet has columns beyond the ones this schema names outright. Field names stay
consistent across every workbook you process, even though the source column names vary
wildly — that consistency is the entire point: it's what lets a later step consume any
brand's export the same way.
