/**
 * Turns the raw extracted product-import JSON (which carries wholesale/dealer
 * pricing and is gitignored) into a public-safe catalog file for the website
 * — no prices, no stock counts, grouped into site-facing catalog groups.
 *
 * Usage: node build_public_catalog.js <raw-import.json> <output.json>
 */
const fs = require('fs');
const path = require('path');

const [, , inputPath, outputPath] = process.argv;
if (!inputPath || !outputPath) {
  console.error('Usage: node build_public_catalog.js <raw-import.json> <output.json>');
  process.exit(1);
}

// Explicit category -> catalog group mapping. Listed one by one (not a fuzzy
// keyword match) so a category that doesn't appear here fails loudly instead
// of silently landing in the wrong group or getting dropped.
const GROUP_MAP = {
  'Back UPS': 'ups',
  'SMC-SUA > DÒNG APC SMART-UPS SMC (2 YEAR WARRANTY)': 'ups',
  'SMC-SUA > DÒNG APC SMART-UPS SUA (2 YEAR WARRANTY)': 'ups',
  'SMT-SRT > DÒNG APC SMART-UPS LOẠI TOWER (CHO SERVER)': 'ups',
  'SMT-SRT > DÒNG APC SMART-UPS LOẠI RACKMOUNT (CHO SERVER)': 'ups',
  'SMT-SRT > DÒNG APC SMART-UPS SRT ON-LINE (for servers, voice / data networks, medical labs, and light industrial applications)': 'ups',
  'SMT-SRT > DÒNG APC SMART-UPS SRTG ON-LINE (for servers, voice / data networks, medical labs, and light industrial applications)': 'ups',
  'SMT-SRT > CÁC PHỤ KIỆN (BATTERY, RAIL KIT, PDU, CARD, POWER CORD)': 'phu-kien-ups',
  'RBC APC > APC Replacement cartridge for SMC, SMT Tower UPS': 'phu-kien-ups',
  'RBC APC > Replacement cartridge for SMC, SMT Rackmount UPS': 'phu-kien-ups',
  'RBC APC > Replacement cartridge for SRT Smart UPS & External Battery': 'phu-kien-ups',
  'Tủ APC': 'tu-rack',
  'Tủ APC > Rack Cabinet Accessories': 'tu-rack',
  'Tủ APC > Power Distribution Unit (PDU) & Power Cord': 'tu-rack',
  'Easy UPS > DÒNG APC EASY ONLINE UPS - TOWER (No External Battery)': 'ups',
  'Easy UPS > DÒNG APC EASY ONLINE UPS - RACK MOUNT': 'ups',
  'Easy UPS > APC MANAGEMENT CARD': 'phu-kien-ups',
  'Easy W Ext > DÒNG APC EASY ONLINE UPS -( With External Battery)': 'ups',
  'Easy W Ext > DÒNG APC EASY ONLINE UPS - RACK MOUNT WITH EXTENDED BATTERY': 'ups',
  'Easy W Ext > APC EXTERNAL BATTERY PACK': 'phu-kien-ups',
  'Easy W Ext > APC MANAGEMENT CARD': 'phu-kien-ups',
  'Easy W Ext > APC PDU (POWER DISTRIBUTION UNIT) & POWER CORD': 'phu-kien-ups',
  'Tủ Easy > APC Easy rack cabinet by Schneider Electric': 'tu-rack',
  'Tủ Easy > Easy PDU (Thanh nguồn) & Accessories': 'tu-rack',
};

// Clean Vietnamese-facing display label for each source category.
const LABEL_MAP = {
  'Back UPS': 'Back-UPS & Easy UPS gia đình, văn phòng nhỏ',
  'SMC-SUA > DÒNG APC SMART-UPS SMC (2 YEAR WARRANTY)': 'Smart-UPS SMC (bảo hành 2 năm)',
  'SMC-SUA > DÒNG APC SMART-UPS SUA (2 YEAR WARRANTY)': 'Smart-UPS SUA (bảo hành 2 năm)',
  'SMT-SRT > DÒNG APC SMART-UPS LOẠI TOWER (CHO SERVER)': 'Smart-UPS SMT — dạng Tower (cho server)',
  'SMT-SRT > DÒNG APC SMART-UPS LOẠI RACKMOUNT (CHO SERVER)': 'Smart-UPS SMT — dạng Rackmount (cho server)',
  'SMT-SRT > DÒNG APC SMART-UPS SRT ON-LINE (for servers, voice / data networks, medical labs, and light industrial applications)': 'Smart-UPS SRT Online',
  'SMT-SRT > DÒNG APC SMART-UPS SRTG ON-LINE (for servers, voice / data networks, medical labs, and light industrial applications)': 'Smart-UPS SRTG Online',
  'SMT-SRT > CÁC PHỤ KIỆN (BATTERY, RAIL KIT, PDU, CARD, POWER CORD)': 'Phụ kiện Smart-UPS (bình ắc quy, rail kit, PDU, card, dây nguồn)',
  'RBC APC > APC Replacement cartridge for SMC, SMT Tower UPS': 'Bình ắc quy thay thế — dòng SMC, SMT Tower',
  'RBC APC > Replacement cartridge for SMC, SMT Rackmount UPS': 'Bình ắc quy thay thế — dòng SMC, SMT Rackmount',
  'RBC APC > Replacement cartridge for SRT Smart UPS & External Battery': 'Bình ắc quy thay thế — dòng SRT & bình ngoài',
  'Tủ APC': 'Tủ rack APC',
  'Tủ APC > Rack Cabinet Accessories': 'Phụ kiện tủ rack APC',
  'Tủ APC > Power Distribution Unit (PDU) & Power Cord': 'PDU & dây nguồn cho tủ rack APC',
  'Easy UPS > DÒNG APC EASY ONLINE UPS - TOWER (No External Battery)': 'Easy UPS Online — dạng Tower',
  'Easy UPS > DÒNG APC EASY ONLINE UPS - RACK MOUNT': 'Easy UPS Online — dạng Rackmount',
  'Easy UPS > APC MANAGEMENT CARD': 'Card quản lý Easy UPS',
  'Easy W Ext > DÒNG APC EASY ONLINE UPS -( With External Battery)': 'Easy UPS Online có bình ắc quy ngoài',
  'Easy W Ext > DÒNG APC EASY ONLINE UPS - RACK MOUNT WITH EXTENDED BATTERY': 'Easy UPS Online Rackmount có bình ắc quy ngoài',
  'Easy W Ext > APC EXTERNAL BATTERY PACK': 'Bình ắc quy ngoài cho Easy UPS',
  'Easy W Ext > APC MANAGEMENT CARD': 'Card quản lý Easy UPS',
  'Easy W Ext > APC PDU (POWER DISTRIBUTION UNIT) & POWER CORD': 'PDU & dây nguồn cho Easy UPS',
  'Tủ Easy > APC Easy rack cabinet by Schneider Electric': 'Tủ rack Easy',
  'Tủ Easy > Easy PDU (Thanh nguồn) & Accessories': 'Thanh nguồn & phụ kiện tủ Easy',
};

const GROUPS = {
  ups: { title: 'Bộ lưu điện UPS', desc: 'Các dòng UPS APC — từ văn phòng nhỏ đến trung tâm dữ liệu.', icon: 'Zap' },
  'phu-kien-ups': { title: 'Phụ kiện & bình ắc quy UPS', desc: 'Bình ắc quy thay thế, card quản lý, PDU và phụ kiện đi kèm UPS.', icon: 'PackageCheck' },
  'tu-rack': { title: 'Tủ Rack & phụ kiện', desc: 'Tủ rack APC, phụ kiện lắp đặt và PDU cho phòng máy chủ.', icon: 'Server' },
};

function slugify(s) {
  return s
    .toString()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/gi, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Best-effort split of the free-text spec paragraph into an "overview" (the
// sentences with no clear key:value shape) and a list of labeled spec lines
// (sentences that do have one) — good enough to read like a spec sheet
// without needing to hand-build a schema for every possible attribute.
function parseSpecText(specText) {
  if (!specText) return { overview: '', specs: [] };
  const fragments = specText
    .split(/\.\s+(?=[A-ZÀ-Ỹ])/)
    .map((f) => f.trim().replace(/\.$/, ''))
    .filter(Boolean);
  const overviewParts = [];
  const specs = [];
  for (const frag of fragments) {
    const m = frag.match(/^([^:]{2,40}):\s*(.+)$/);
    if (m) {
      specs.push({ label: m[1].trim(), value: m[2].trim() });
    } else {
      overviewParts.push(frag);
    }
  }
  return { overview: overviewParts.join('. '), specs };
}

const raw = JSON.parse(fs.readFileSync(path.resolve(inputPath), 'utf8'));

const rawProducts = [];
const unmapped = new Set();
for (const s of raw.sheets) {
  for (const p of s.products) {
    const group = GROUP_MAP[p.category];
    if (!group) {
      unmapped.add(p.category);
      continue;
    }
    const { overview, specs } = parseSpecText(p.spec_text);
    // A per-row Warranty column is often absent because the source sheet
    // stated it once in the section header instead (e.g. "DÒNG APC
    // SMART-UPS SMC (2 YEAR WARRANTY)") — fall back to reading it from
    // there rather than leaving every product under that header warranty-
    // less just because it wasn't repeated on each row.
    const warrantyFromCategory = p.category.match(/(\d+)\s*YEAR/i);
    rawProducts.push({
      slug: slugify(p.part_number),
      group,
      part_number: p.part_number,
      name: p.name,
      category_label: LABEL_MAP[p.category] || p.category,
      overview,
      specs,
      warranty: p.warranty || (warrantyFromCategory ? `${warrantyFromCategory[1]} năm` : null),
      // Deliberately omitted: prices, stock — this file ships to the public
      // site; wholesale/dealer pricing and live inventory counts must never
      // appear on the public product pages (matches the old site's own
      // "contact to buy" model, which never showed prices either).
    });
  }
}

if (unmapped.size > 0) {
  console.error('UNMAPPED categories (not written to output):', [...unmapped]);
}

// The same physical part (typically a replacement battery or management
// card) is legitimately sold as compatible with several different UPS
// families, each showing up as its own row in the source spreadsheet with
// an identical part number but a different "compatible with" description.
// Two products can't share one URL on the public site, so merge same-slug
// entries within a group into a single page that lists every compatibility
// note instead — that's also more useful to an actual customer than two
// near-identical pages would be.
const merged = new Map();
for (const p of rawProducts) {
  const key = `${p.group}/${p.slug}`;
  if (!merged.has(key)) {
    merged.set(key, { ...p, compatibility: [p.name] });
  } else {
    const existing = merged.get(key);
    if (!existing.compatibility.includes(p.name)) existing.compatibility.push(p.name);
  }
}
const products = [...merged.values()].map(({ compatibility, ...p }) => ({
  ...p,
  // Only surfaced when there's more than one — a single-entry product's
  // `name` already says everything, no need for a redundant one-item list.
  compatible_with: compatibility.length > 1 ? compatibility : undefined,
}));

const output = {
  groups: Object.entries(GROUPS).map(([key, meta]) => ({ key, ...meta })),
  products,
};

fs.writeFileSync(path.resolve(outputPath), JSON.stringify(output, null, 2), 'utf8');
const mergedCount = rawProducts.length - products.length;
console.log('Wrote', outputPath, '—', products.length, 'product pages (from', rawProducts.length, 'source rows,', mergedCount, 'merged as multi-compatibility duplicates),', unmapped.size, 'unmapped categories.');
