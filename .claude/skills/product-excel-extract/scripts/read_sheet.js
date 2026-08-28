#!/usr/bin/env node
/**
 * Dump a worksheet as raw rows (array-of-arrays), or list sheet names.
 *
 * Usage:
 *   node read_sheet.js <workbook.xlsx>              -> JSON array of sheet names
 *   node read_sheet.js <workbook.xlsx> "<SheetName>" -> JSON array of rows (each row is an array of cell strings/numbers)
 *
 * Blank cells come back as '' (not undefined), so every row has the same length
 * as the widest row in the sheet — safe to index by column position.
 */
const path = require('path');
const XLSX = require('xlsx');

const [, , filePath, sheetName] = process.argv;
if (!filePath) {
  console.error('Usage: node read_sheet.js <workbook.xlsx> [sheetName]');
  process.exit(1);
}

const wb = XLSX.readFile(path.resolve(filePath));

if (!sheetName) {
  console.log(JSON.stringify(wb.SheetNames));
  process.exit(0);
}

const ws = wb.Sheets[sheetName];
if (!ws) {
  console.error(`Sheet not found: "${sheetName}". Available sheets: ${wb.SheetNames.join(', ')}`);
  process.exit(1);
}

// raw: false formats each cell the way Excel displays it (so a date-formatted
// cell reads back as "15-Jun", not the underlying serial number like 46188) —
// always read this way; the raw serial is never what you want for reporting.
const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '', raw: false });
console.log(JSON.stringify(rows));
