#!/usr/bin/env python3
"""gen_whatnot.py — collection.js -> whatnot-listings.csv (Whatnot bulk-import CSV).

Emits one row per sellable card (status forSale/scheduled, not hold) in the exact
format of Whatnot's US non-Coins template (headers + allowed values verified from
the official template sheet, 2026-09-25). Import at Seller Hub > Inventory >
Import from CSV -> creates DRAFT listings (nothing goes live until published).

NOTE: each upload of the same file creates duplicate drafts — re-import only
rows you haven't imported before (use --since or delete old drafts first).
"""
import csv, json, re, sys

SITE = "https://mayseqards.com"
HEADERS = ["Category","Sub Category","Title","Description","Quantity","Type","Price",
           "Shipping Profile","Offerable","Hazmat","Condition","Cost Per Item","SKU"] + \
          [f"Image URL {i}" for i in range(1, 9)]
NBA = {"Hawks","Celtics","Nets","Hornets","Bulls","Cavaliers","Mavericks","Nuggets",
       "Pistons","Warriors","Rockets","Pacers","Clippers","Lakers","Grizzlies","Heat",
       "Bucks","Timberwolves","Pelicans","Knicks","Thunder","Magic","76ers","Suns",
       "Trail Blazers","Blazers","Kings","Spurs","Raptors","Jazz","Wizards"}
FOOTBALL = {"Lions","Bears","Packers","Cowboys","Eagles","Chiefs","Bills","49ers"}

def cards():
    for line in open("collection.js"):
        s = line.strip().rstrip(",")
        if s.startswith('{"id":"C'):
            yield json.loads(s)

def subcategory(c):
    teams = re.split(r"\s*/\s*", c.get("team", ""))
    if any(t in NBA for t in teams):
        return "Basketball Singles"
    if any(t in FOOTBALL for t in teams):
        return "Football Singles"
    return "Other Sports Cards"

def title(c):
    t = f"{c['player']} {c['pack']} {c['type']}"
    if c.get("grade"):
        t += f" {c['grade']}"
    return t[:80].strip()

def description(c):
    lines = [f"{c['player']} — {c['pack']}", c["type"]]
    if c.get("grade"):
        lines.append(f"Graded {c['grade']} (cert {c.get('cert','on slab')})")
    else:
        lines.append("Raw — ships in penny sleeve + top loader.")
    lines.append("From the MayseQards basketball collection · mayseqards.com")
    return "\n".join(lines)

def rows(only_ids=None):
    for c in cards():
        if c.get("status") not in ("forSale", "scheduled") or c.get("hold"):
            continue
        if only_ids and c["id"] not in only_ids:
            continue
        price = c.get("price")
        if not price:
            print(f"  ! {c['id']} {c['player']}: no price — skipped", file=sys.stderr)
            continue
        imgs = []
        if c.get("photo"):
            imgs.append(f"{SITE}/{c['photo']}")
        if c.get("photoBack"):
            imgs.append(f"{SITE}/{c['photoBack']}")
        yield [
            "Sports Cards", subcategory(c), title(c), description(c), 1,
            "Buy it Now", price, "Sports singles (3oz)", "TRUE", "Not Hazmat",
            "Graded" if c.get("grade") else "Raw - Near Mint or Better",
            "", c["id"],
        ] + imgs + [""] * (8 - len(imgs))

def main():
    only = set(a for a in sys.argv[1:] if a.startswith("C")) or None
    out = "whatnot-listings.csv"
    with open(out, "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(HEADERS)
        n = 0
        total = 0.0
        for r in rows(only):
            w.writerow(r)
            n += 1
            total += float(r[6])
    print(f"wrote {out} — {n} listings, ${total:,.2f} total ask")

if __name__ == "__main__":
    main()
