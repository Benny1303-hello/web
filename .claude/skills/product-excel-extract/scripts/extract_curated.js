/**
 * Rigorous extractor for the "curated" sheets (Part Number / Description layout).
 *
 * Design principle: every row in the sheet must be classified into exactly one
 * known type. If a row doesn't match any known pattern, STOP and report it
 * instead of silently skipping or misclassifying it — for a sales price list,
 * a loud failure on an unrecognized row is far safer than a quiet wrong guess.
 *
 * Usage: node extract_curated.js "<workbook.xlsx>" "<Sheet1>" ["<Sheet2>" ...]
 */
const XLSX = require('xlsx');
const path = require('path');

const [, , filePath, ...sheetArgs] = process.argv;
if (!filePath || sheetArgs.length === 0) {
  console.error('Usage: node extract_curated.js <workbook.xlsx> <Sheet1> [Sheet2 ...]');
  process.exit(1);
}

function parseNum(v) {
  if (typeof v === 'number') return v;
  const s = (v || '').toString().replace(/[, ]/g, '').trim();
  if (s === '' || !/^-?\d+(\.\d+)?$/.test(s)) return null;
  return Number(s);
}
function isPriceLikeHeader(h) {
  const s = (h || '').toString().toLowerCase();
  return /gia ban|u\/price|sl\s*\d|sl\s*>|price/.test(s);
}
function looksLikeProductCode(s) {
  // A part number: short-ish, no sentence punctuation, has alphanumerics.
  // Tolerates an embedded newline (some cells append a note like
  // "(Thay thế cho BX1100LI-MS)" or "(NEW)" on a second line) — judge only
  // the first line.
  const first = (s || '').split(/\r?\n/)[0].trim();
  if (!first) return false;
  if (first.length > 30) return false;
  if (/[.!?]/.test(first)) return false;
  return /[A-Za-z0-9]/.test(first);
}

const wb = XLSX.readFile(path.resolve(filePath));
const result = { source_file: path.basename(filePath), sheets: [] };
let hadUnclassified = false;

for (const sheetName of sheetArgs) {
  const ws = wb.Sheets[sheetName];
  if (!ws) {
    console.error(`Sheet not found: "${sheetName}"`);
    process.exit(1);
  }
  // raw: false formats each cell the way Excel displays it (a date-formatted
  // Stock cell reads back as "15-Jun", not the underlying serial number
  // 46188) — reading raw numbers here silently corrupts any date-like cell.
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '', raw: false });

  const headerRowIdx = rows.findIndex((r) => r.some((c) => c.toString().trim().toLowerCase() === 'part number'));
  if (headerRowIdx === -1) {
    console.error(`No "Part Number" header row found in sheet "${sheetName}" — this sheet may not follow the curated layout; inspect it manually.`);
    process.exit(1);
  }
  const header = rows[headerRowIdx].map((h) => h.toString().trim());
  const col = {
    part: header.findIndex((h) => h.toLowerCase() === 'part number'),
    desc: header.findIndex((h) => h.toLowerCase() === 'description'),
    // "Origin" is spelled correctly in some sheets and typo'd "Orgin" in
    // others within this same workbook — match both explicitly rather than
    // a clever pattern (an earlier version's /^org?in$/i silently matched
    // neither spelling correctly and dropped every Origin value).
    origin: header.findIndex((h) => /^(origin|orgin)$/i.test(h)),
    stock: header.findIndex((h) => /^stock/i.test(h)),
    warranty: header.findIndex((h) => /warranty/i.test(h)),
  };
  const priceCols = header.map((h, i) => (isPriceLikeHeader(h) ? i : -1)).filter((i) => i !== -1);

  // Any header column not already claimed by a known field (part/desc/price/
  // origin/stock/warranty) still gets captured — e.g. RBC APC has "Stock",
  // "Stock hiện tại", AND "Hàng về cuối T5" (an incoming-stock note) as three
  // separate columns; a fixed single "stock" field would silently drop two
  // of them. Whatever a sheet actually has, every labeled column ends up
  // somewhere in the output instead of only the columns this script expected
  // in advance.
  const claimedCols = new Set([col.part, col.desc, col.origin, col.stock, col.warranty, ...priceCols]);
  const extraCols = header
    .map((h, i) => ({ h, i }))
    .filter(({ h, i }) => h && !claimedCols.has(i));

  const products = [];
  const skipped = []; // {row, type, text} for the human-readable log
  let currentCategory = sheetName;
  let lastProduct = null;

  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    const rowText = r.join('').trim();

    if (i <= headerRowIdx) {
      skipped.push({ row: i, type: i === headerRowIdx ? 'header-row' : 'preamble', text: rowText.slice(0, 60) });
      continue;
    }
    if (!rowText) {
      skipped.push({ row: i, type: 'blank', text: '' });
      continue;
    }

    const partRaw = (r[col.part] || '').toString().trim();
    const descRaw = (r[col.desc] || '').toString().trim();
    const otherColsFilled = header.some((_, ci) => ci !== col.part && (r[ci] || '').toString().trim());

    // Shape-based category header: only the first cell has content, nothing
    // else in the row (no price, no description, no origin/stock) — this is
    // the reliable signal, not any specific keyword.
    if (partRaw && !otherColsFilled) {
      currentCategory = `${sheetName} > ${partRaw.replace(/\s+/g, ' ').trim()}`;
      skipped.push({ row: i, type: 'category-header', text: partRaw.slice(0, 70) });
      lastProduct = null; // a new section resets continuation tracking
      continue;
    }

    // Promo / banner row: long first-cell sentence, no part-number-shaped
    // value, but (unlike a category header) it may have other stray content.
    if (partRaw && !looksLikeProductCode(partRaw) && !descRaw) {
      skipped.push({ row: i, type: 'promo-or-banner', text: partRaw.slice(0, 70) });
      continue;
    }

    // Continuation row: no part number, but description text and a
    // previous product to attach it to.
    if (!partRaw && descRaw) {
      if (!lastProduct) {
        skipped.push({ row: i, type: 'UNCLASSIFIED-continuation-with-no-prior-product', text: descRaw.slice(0, 70) });
        hadUnclassified = true;
        continue;
      }
      lastProduct.spec_text = (lastProduct.spec_text ? lastProduct.spec_text + ' ' : '') + descRaw;
      skipped.push({ row: i, type: 'continuation-merged', text: descRaw.slice(0, 70) });
      continue;
    }

    if (partRaw && looksLikeProductCode(partRaw)) {
      const descLines = descRaw.split(/\r?\n/);
      const name = (descLines[0] || '').trim();
      const specText = descLines.slice(1).join(' ').trim();
      const prices = priceCols
        .map((ci) => ({ label: header[ci], value: parseNum(r[ci]) }))
        .filter((p) => p.value !== null);

      const extraFields = extraCols
        .map(({ h, i: ci }) => ({ label: h, value: (r[ci] || '').toString().trim() }))
        .filter((f) => f.value);

      const product = {
        part_number: partRaw.replace(/\s+/g, ' ').trim(),
        name,
        spec_text: specText,
        prices,
        origin: col.origin !== -1 ? (r[col.origin] || '').toString().replace(/\s+/g, ' ').trim() || null : null,
        stock: col.stock !== -1 ? (r[col.stock] || '').toString().trim() || null : null,
        warranty: col.warranty !== -1 ? (r[col.warranty] || '').toString().trim() || null : null,
        extra_fields: extraFields,
        category: currentCategory,
        _row: i,
      };
      products.push(product);
      lastProduct = product;
      continue;
    }

    // Nothing matched — this is exactly the case we must never silently drop.
    skipped.push({ row: i, type: 'UNCLASSIFIED', text: JSON.stringify(r).slice(0, 100) });
    hadUnclassified = true;
  }

  // Duplicate part numbers within the same sheet: could be a battery
  // legitimately compatible with several UPS models (different rows, real
  // difference in the description) or a genuine copy-pasted duplicate row
  // (rows read identically). Report both kinds — the point isn't to decide
  // which one this is, it's to make sure a human does.
  const byPartNumber = {};
  for (const p of products) {
    (byPartNumber[p.part_number] = byPartNumber[p.part_number] || []).push(p);
  }
  const duplicates = Object.entries(byPartNumber)
    .filter(([, list]) => list.length > 1)
    .map(([part_number, list]) => ({
      part_number,
      occurrences: list.length,
      identical_rows: new Set(list.map((p) => JSON.stringify([p.name, p.prices]))).size === 1,
      rows: list.map((p) => p._row),
    }));

  const accountedFor = products.length + skipped.length;
  result.sheets.push({
    sheet: sheetName,
    total_rows: rows.length,
    products_found: products.length,
    rows_accounted_for: accountedFor,
    reconciled: accountedFor === rows.length,
    columns_captured: { ...col, price: priceCols, extra: extraCols.map((c) => c.h) },
    duplicate_part_numbers: duplicates,
    products,
    skipped,
  });
}

console.log(JSON.stringify(result, null, 2));
if (hadUnclassified) {
  console.error('\n*** WARNING: one or more rows could not be classified — see "UNCLASSIFIED" entries in skipped[]. Fix the script before trusting this output. ***');
  process.exit(2);
}
