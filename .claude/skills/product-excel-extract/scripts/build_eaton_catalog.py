import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[4]
IMPORT_PATH = ROOT / "data" / "product-imports" / "copy-of-bang-gia-eaton.json"
CATALOG_PATH = ROOT / "lib" / "productsCatalog.json"

HIDDEN_ROWS = {22, 23, 25, 42, 48, 49, 56, 57, 58, 59, 60, 61, 62, 63}

SERIES_PATTERNS = [
    (re.compile(r"^5SC", re.IGNORECASE), "Eaton 5SC Series"),
    (re.compile(r"^5PX", re.IGNORECASE), "Eaton 5PX Series"),
    (re.compile(r"^5P", re.IGNORECASE), "Eaton 5P Series"),
    (re.compile(r"^5A", re.IGNORECASE), "Eaton 5A Series (Line Interactive)"),
    (re.compile(r"^9AEBM|^9A", re.IGNORECASE), "Eaton 9A Series"),
    (re.compile(r"^9SX", re.IGNORECASE), "Eaton 9SX Series"),
    (re.compile(r"^DXRT", re.IGNORECASE), "Eaton DX RT Series"),
]

TRAILING_CODE_RE = re.compile(r"\s*\([^()]*\)\s*$")


def series_label(part_number):
    for pattern, label in SERIES_PATTERNS:
        if pattern.search(part_number):
            return label
    return "Eaton UPS khác"


def is_battery(name):
    upper = name.upper()
    return "ẮCQUY" in upper or "ẮC QUY" in upper or "BATTERY" in upper


def clean_name(raw_name):
    return TRAILING_CODE_RE.sub("", raw_name).strip()


def slugify(value):
    value = value.lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-")


def warranty_label(raw):
    if raw is None:
        return None
    raw = raw.strip()
    if raw == "3 năm":
        return "3 years"
    if raw == "2 năm":
        return "2 years"
    return raw


import_data = json.loads(IMPORT_PATH.read_text(encoding="utf-8"))
catalog = json.loads(CATALOG_PATH.read_text(encoding="utf-8"))

existing_slugs = {p["slug"] for p in catalog["products"]}

new_groups = [
    {
        "key": "eaton-ups",
        "title": "Bộ lưu điện UPS EATON",
        "desc": "Các dòng UPS Eaton — line-interactive đến online double-conversion, văn phòng nhỏ đến trung tâm dữ liệu.",
        "icon": "Zap",
    },
    {
        "key": "eaton-phu-kien-ups",
        "title": "Phụ kiện & bình ắc quy UPS EATON",
        "desc": "Bình ắc quy mở rộng (EBM) chính hãng Eaton cho các dòng UPS 9A/9SX/5PX/DX RT.",
        "icon": "PackageCheck",
    },
]

built_products = []
skipped_hidden = 0
skip_report = []

for prod in import_data["categories"][0]["products"]:
    row = prod["row"]
    if row in HIDDEN_ROWS:
        skipped_hidden += 1
        continue

    part_number = prod["part_number"]
    raw_name = prod["name"]
    if not part_number or not raw_name:
        skip_report.append({"row": row, "reason": "missing part_number or name despite not being in hidden set"})
        continue

    group_key = "eaton-phu-kien-ups" if is_battery(raw_name) else "eaton-ups"
    category_label = series_label(part_number)
    name = clean_name(raw_name)

    slug = slugify(part_number)
    if slug in existing_slugs:
        slug = f"eaton-{slug}"
    if slug in existing_slugs:
        skip_report.append({"row": row, "reason": f"slug collision even after prefixing: {slug}"})
        continue
    existing_slugs.add(slug)

    specs = []
    va = prod["specs"].get("capacity_va")
    w = prod["specs"].get("capacity_w")
    if va and w:
        specs.append({"label": "Capacity", "value": f"{va} VA / {w} W"})
    voltage = prod["specs"].get("voltage")
    if voltage:
        specs.append({"label": "Voltage", "value": voltage})

    product = {
        "slug": slug,
        "group": group_key,
        "part_number": part_number,
        "name": name,
        "category_label": category_label,
        "brand": "EATON",
        "warranty": warranty_label(prod["warranty"]),
    }
    if specs:
        product["specs"] = specs

    built_products.append(product)

catalog["groups"].extend(new_groups)
catalog["products"].extend(built_products)

CATALOG_PATH.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

by_group = {}
by_category = {}
for p in built_products:
    by_group[p["group"]] = by_group.get(p["group"], 0) + 1
    by_category[p["category_label"]] = by_category.get(p["category_label"], 0) + 1

print(f"Added {len(built_products)} products, skipped {skipped_hidden} hidden rows, {len(skip_report)} unexpected skips")
print("By group:", json.dumps(by_group, ensure_ascii=False))
print("By category:", json.dumps(by_category, ensure_ascii=False))
if skip_report:
    print("UNEXPECTED SKIPS:", json.dumps(skip_report, ensure_ascii=False))
for p in built_products:
    print(f"  [{p['group']}] {p['part_number']} -> {p['slug']} | {p['category_label']} | {p['warranty']}")
