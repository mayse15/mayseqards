#!/usr/bin/env python3
"""gen_whatnot.py — collection.js -> Whatnot bulk-import CSVs.

Two modes, matching Whatnot's two import targets:

  python3 gen_whatnot.py shop [--min 10]
      -> whatnot-shop.csv : Buy-it-Now INVENTORY drafts for the expensive
         cards only (ask >= --min, default $10). Import at Seller Hub >
         Inventory > Import from CSV. These become your profile Shop /
         show BINs. Keeps inventory small so nothing is hard to find.

  python3 gen_whatnot.py show [--under 10] [--start 1] [--limit 999] [C081 C035 ...]
      -> whatnot-show.csv : AUCTION run-sheet uploaded DIRECTLY INTO A SHOW
         (Shows > your show > Add > Create Temporary Listing > Upload CSV).
         Temporary listings, never touch Inventory, appear in CSV row order —
         so the file order IS the run order. Pass card ids for an exact
         hand-picked order, or --under N to auto-pick the tail (sorted
         high->low). Price column = auction starting bid (--start, default $1).

Format verified against Whatnot's official US non-Coins template 2026-09-25.
Re-importing the same rows creates duplicate drafts — import each row once.
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
    out = []
    for line in open("collection.js"):
        s = line.strip().rstrip(",")
        if s.startswith('{"id":"C'):
            c = json.loads(s)
            if c.get("status") in ("forSale", "scheduled") and not c.get("hold"):
                out.append(c)
    return out

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

def row(c, listing_type, price, offerable):
    imgs = [f"{SITE}/{c[k]}" for k in ("photo", "photoBack") if c.get(k)]
    return ["Sports Cards", subcategory(c), title(c), description(c), 1,
            listing_type, price, "Sports singles (3oz)", offerable, "Not Hazmat",
            "Graded" if c.get("grade") else "Raw - Near Mint or Better",
            "", c["id"]] + imgs + [""] * (8 - len(imgs))

def write(out, rws):
    with open(out, "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(HEADERS)
        for r in rws:
            w.writerow(r)
    total = sum(float(r[6]) for r in rws)
    print(f"wrote {out} — {len(rws)} listings, ${total:,.2f} "
          f"({'total ask' if rws and rws[0][5]=='Buy it Now' else 'total start bids'})")

def arg(name, default):
    if name in sys.argv:
        return float(sys.argv[sys.argv.index(name) + 1])
    return default

def main():
    mode = sys.argv[1] if len(sys.argv) > 1 and not sys.argv[1].startswith(("-", "C")) else "shop"
    cs = {c["id"]: c for c in cards()}
    priced = [c for c in cs.values() if c.get("price")]
    for c in cs.values():
        if not c.get("price"):
            print(f"  ! {c['id']} {c['player']}: no price — skipped", file=sys.stderr)

    if mode == "shop":
        lo = arg("--min", 10)
        keep = sorted((c for c in priced if c["price"] >= lo), key=lambda c: -c["price"])
        write("whatnot-shop.csv", [row(c, "Buy it Now", c["price"], "TRUE") for c in keep])
    elif mode == "show":
        start = arg("--start", 1)
        ids = [a for a in sys.argv[2:] if a.startswith("C")]
        if ids:
            missing = [i for i in ids if i not in cs]
            if missing:
                sys.exit(f"not sellable / unknown: {missing}")
            keep = [cs[i] for i in ids]                      # your order = run order
        else:
            hi = arg("--under", 10)
            limit = int(arg("--limit", 999))
            keep = sorted((c for c in priced if c["price"] < hi),
                          key=lambda c: -c["price"])[:limit]  # best fodder first
        write("whatnot-show.csv", [row(c, "Auction", start, "FALSE") for c in keep])
    else:
        sys.exit(__doc__)

if __name__ == "__main__":
    main()
