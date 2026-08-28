---
name: product-excel-extract
description: Reads a supplier/vendor product price-list Excel file (APC/Schneider, HPE, Microsoft, Telegartner, or any other distributor price sheet dropped into this project) and extracts every product row into one clean, categorized JSON dataset — capturing product group/category, part number, product name, price (including tiered/quantity pricing), origin, stock, warranty, and best-effort structured specs parsed from the description text. Use this skill whenever the user shares, mentions, or points at a product price list, bảng giá, khung giá, or supplier Excel/.xlsx file for TTC-Infotech's Distribution Center — even if they only say "coi file này", "phân loại sản phẩm", or "đọc file excel này" without naming the skill. This skill's job ends at producing the structured dataset and a summary for the user to sanity-check; it does NOT push data onto the website — that is a deliberately separate, later step.
---

# Product Excel Extract

Turns a messy supplier price sheet into one consistent JSON dataset, regardless of how
that particular vendor happened to lay out their spreadsheet. Different brands (APC,
HPE, Microsoft, Telegartner, ...) format these completely differently — some use one
sheet per product line, some bury the category in a breadcrumb column, some mix promo
banners and multi-row products into the data. The point of this skill is to absorb that
inconsistency once, here, so every future import produces the same shape of output that
a later "push this to the website" task can rely on without re-learning each vendor's
quirks.

## Before you start: check for Python

The general `xlsx` skill's approach (`openpyxl`/`pandas`/`markitdown`) is more robust
when it's available — use it if a real Python is on this machine. Confirm with:

```bash
python3 --version || python --version
```

If this returns a real version number, prefer that skill's approach for reading the
workbook, then apply the category-detection and row-classification logic below on top
of it.

**If it fails, or prints the Windows Store "Python was not found" message**, there is no
usable Python on this machine (verified true on at least one machine this project runs
on) — use the Node-based path instead, which only needs `npm`:

```bash
cd .claude/skills/product-excel-extract
npm install          # once per machine; installs the xlsx (SheetJS) package locally
node scripts/read_sheet.js "<path to workbook.xlsx>"                # -> JSON list of sheet names
node scripts/read_sheet.js "<path to workbook.xlsx>" "<Sheet Name>" # -> JSON array of rows (array-of-arrays, header:1)
```

`read_sheet.js` gives you raw rows exactly as the cells contain them — no header
assumptions, no type coercion beyond what the cell already was. All the actual
extraction logic (category detection, row classification, price/description parsing)
happens in your own script or reasoning on top of that raw data, following the
procedure in `references/extraction-guide.md`.

## Workflow

1. **List the sheets** in the workbook first (`read_sheet.js` with no sheet name, or the
   Python equivalent). Skim a few rows of each to get a feel for the layout before
   committing to an extraction approach — don't assume every sheet in the same workbook
   follows the same pattern (a workbook can mix "one sheet = one clean category" sheets
   with one giant "master catalog with its own taxonomy columns" sheet, as this
   project's original APC price list does).

2. **Read `references/extraction-guide.md`** for the detailed, tested rules on:
   category detection (explicit columns → in-sheet section headers → sheet name),
   telling real product rows apart from promo banners / section headers / blank rows /
   multi-row continuations, splitting the Description cell into name + spec text,
   capturing whatever pricing columns exist without assuming a fixed shape, and the
   exact output JSON schema to write to. **This data drives real sales quotes for the
   user — read the "Verification checklist" section in particular and actually run
   through it; a version of this extraction that looked fine and ran without errors
   still had 4 real accuracy bugs the first time, including one that silently turned a
   restock date into a meaningless number.** Don't skip straight to writing a script from
   memory of a previous run — the checklist exists because "it ran, the counts look
   plausible" was not enough evidence last time either.

3. **Write a short Node (or Python, if available) script** that applies that procedure
   to every sheet and produces one JSON file matching the schema in the guide. Prefer
   writing the script over doing this row-by-row in your own reasoning — a real workbook
   has hundreds to thousands of rows, and a script is the only way to apply the same
   rule consistently to all of them.

4. **Save the output** to `data/product-imports/<slugified-source-filename>.json` in the
   project (create the directory if it doesn't exist). This directory holds raw
   extracted data, not finished site content — **make sure `data/product-imports/` is
   in `.gitignore`** before anything gets committed. Supplier price sheets carry
   wholesale/dealer pricing tiers that must never end up in the public GitHub repo this
   site deploys from, even indirectly through a committed JSON export.

5. **Report a short summary** in the chat that states the reconciliation result, not
   just a product count: how many categories and products were found, confirmation that
   every row in every sheet was accounted for (or which ones weren't and why), any
   duplicate part numbers found within a sheet, and the specific products you
   spot-checked against the source with the result. "Extracted 126 products across 8
   sheets" is not a report the user can trust on its own for sales-critical data — "all
   126 rows across 8 sheets reconciled, 3 sets of duplicate part numbers found (listed),
   spot-checked 5 products against the source file and all matched" is.

## Explicitly out of scope

Do not modify `lib/content.js`, any locale JSON, or any page under `app/` as part of
this skill — turning the extracted dataset into actual website content (choosing which
products to feature, writing display copy, deciding page structure) is a separate task
with its own judgment calls, deliberately kept apart from this one so a bad extraction
never gets silently baked into a site change.
