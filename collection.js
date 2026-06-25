/* ──────────────────────────────────────────────────────────────
   MayseQards — Collection data (single source of truth for the site)
   ──────────────────────────────────────────────────────────────
   This file feeds storefront.html. Edit cards here.

   FIELDS
     id        unique card id, e.g. "C001"
     player    player full name
     pack      set / product (used by the Set filter)
     type      descriptive parallel + serial + card number
               (this is the "descriptive name" — pulled from the
               verified checklist in checklists.json)
     cat       card-type tier — "Base" | "Parallel/Refractor" | "Hits" | "Specialty".
               Mirrors the spreadsheet's Category column; powers the Type filter.
     team      team nickname, e.g. "Jazz" / "Spurs" / "76ers"; powers the Team filter.
     featured  true  -> shown in the homepage "Headliners" spotlight
     photo     ""    -> gunmetal placeholder
               "photos/C001.jpg" -> real photo (falls back if missing)
     listing   ""    -> shows "eBay Link · SOON" slot
               "https://www.ebay.com/itm/..." -> live "View on eBay" button
     status    "collection" | "forSale" | "sold"
     grade     "" or omit -> Raw / ungraded (default — all current cards).
               Set a grade like "PSA 10" or "BGS 9.5" to mark a card graded;
               it shows a gold grade badge. (Values still reflect raw comps
               unless you update them — graded slabs sell higher.)

   NOTE: purchase prices are intentionally NOT in this file — it ships
   to the public, so cost basis stays private. Pricing lives on eBay.
   ────────────────────────────────────────────────────────────── */

window.CARDS = [
  {"id":"C001","player":"Luka Doncic","pack":"2025-26 Topps Chrome x Cactus Jack","type":"Gold Refractor 43/50 #47","cat":"Specialty","team":"Lakers","featured":true,"listing":"","photo":"","status":"collection"},
  {"id":"C002","player":"Ace Bailey","pack":"2025-26 Topps Chrome x Cactus Jack","type":"Red Refractor 2/5 #65","cat":"Specialty","team":"Jazz","featured":true,"listing":"","photo":"","status":"collection"},
  {"id":"C003","player":"Stephen Curry","pack":"2025-26 Topps Chrome x Cactus Jack","type":"Utopia Insert 22/150 #UH-11","cat":"Specialty","team":"Warriors","featured":true,"listing":"","photo":"","status":"collection"},
  {"id":"C004","player":"Donovan Mitchell","pack":"2025-26 Topps Chrome x Cactus Jack","type":"Utopia Insert #UH-6","cat":"Specialty","team":"Cavaliers","listing":"","photo":"","status":"collection"},
  {"id":"C006","player":"Cam Thomas","pack":"2025-26 Topps Chrome x Cactus Jack","type":"Gold Refractor SSP 05/50 #3","cat":"Specialty","team":"Nets","listing":"","photo":"","status":"collection"},
  {"id":"C007","player":"De'Aaron Fox","pack":"2025-26 Topps Finest","type":"Masters Orange Geometric Auto 14/15","cat":"Hits","team":"Spurs","featured":true,"listing":"","photo":"","status":"collection"},
  {"id":"C008","player":"Christian Braun","pack":"2025-26 Topps","type":"Marks of Excellence Black Auto #ME-CB 1/10","cat":"Hits","team":"Nuggets","listing":"","photo":"","status":"collection"},
  {"id":"C009","player":"Christian Braun","pack":"2025-26 Topps","type":"Marks of Excellence Gold Rainbow #ME-CB 34/50","cat":"Parallel/Refractor","team":"Nuggets","listing":"","photo":"","status":"collection"},
  {"id":"C010","player":"Christian Braun","pack":"2022-23 Panini Prizm","type":"Rookie Signatures Auto RC #RSI-CBR","cat":"Hits","team":"Nuggets","listing":"","photo":"","status":"collection"},
  {"id":"C011","player":"Victor Wembanyama","pack":"2023-24 Panini Prizm","type":"RC Debut #136","cat":"Base","team":"Spurs","listing":"","photo":"","status":"collection"},
  {"id":"C012","player":"Victor Wembanyama","pack":"2023-24 Panini Mosaic","type":"Thunder Road Green Mosaic Prizm #8","cat":"Specialty","team":"Spurs","listing":"","photo":"","status":"collection"},
  {"id":"C013","player":"Victor Wembanyama","pack":"2023-24 Topps NOW","type":"40/20 Game Insert (VW-5)","cat":"Specialty","team":"Spurs","listing":"","photo":"","status":"collection"},
  {"id":"C014","player":"Dylan Harper","pack":"2025-26 Topps Chrome x Cactus Jack","type":"RC #62","cat":"Base","team":"Spurs","listing":"","photo":"","status":"collection"},
  {"id":"C015","player":"Ace Bailey","pack":"2025-26 Topps Chrome x Cactus Jack","type":"RC #65","cat":"Base","team":"Jazz","listing":"","photo":"","status":"collection"},
  {"id":"C016","player":"Carter Bryant","pack":"2025-26 Topps Chrome x Cactus Jack","type":"RC #74","cat":"Base","team":"Spurs","listing":"","photo":"","status":"collection"},
  {"id":"C017","player":"Victor Wembanyama","pack":"2025-26 Topps Chrome x Cactus Jack","type":"Refractor #59","cat":"Parallel/Refractor","team":"Spurs","listing":"","photo":"","status":"collection"},
  {"id":"C018","player":"Kawhi Leonard","pack":"2025-26 Topps Chrome x Cactus Jack","type":"Jacked Up Insert 047/150 #JU-23","cat":"Specialty","team":"Clippers","listing":"","photo":"","status":"collection"},
  {"id":"C019","player":"Jrue Holiday","pack":"2025-26 Topps Signature Class","type":"Gold Refractor 024/275 #20","cat":"Parallel/Refractor","team":"Trail Blazers","listing":"","photo":"","status":"collection"},
  {"id":"C020","player":"Kon Knueppel","pack":"2025-26 Topps NBA Hoops","type":"RC #67","cat":"Base","team":"Hornets","listing":"","photo":"","status":"collection"},
  {"id":"C021","player":"VJ Edgecombe","pack":"2025-26 Topps NBA Hoops","type":"RC #244","cat":"Base","team":"76ers","listing":"","photo":"","status":"collection"},
  {"id":"C022","player":"Dylan Harper","pack":"2025-26 Topps NBA Hoops","type":"RC #7","cat":"Base","team":"Spurs","listing":"","photo":"","status":"collection"},
  {"id":"C023","player":"Cam Spencer","pack":"2025-26 Topps NBA Hoops","type":"Hyper Signatures Auto #HHS-CS","cat":"Specialty","team":"Grizzlies","listing":"","photo":"photos/C023.jpg","status":"collection"},
  {"id":"C024","player":"Dylan Harper","pack":"2025-26 Bowman Chrome","type":"Chrome RC #BCV-2","cat":"Base","team":"Spurs","listing":"","photo":"","status":"collection"},
  {"id":"C025","player":"Ryan Kalkbrenner","pack":"2025-26 Donruss","type":"Significant Signatures RC Auto","cat":"Specialty","team":"Hornets","listing":"","photo":"","status":"collection"},
  {"id":"C026","player":"Cooper Flagg","pack":"2025-26 Bowman Chrome","type":"Chrome RC #BCV-1","cat":"Base","team":"Mavericks","listing":"","photo":"","status":"collection"},
  {"id":"C027","player":"VJ Edgecombe","pack":"2025-26 Topps NBA Hoops","type":"Holo Foil RC #244","cat":"Parallel/Refractor","team":"76ers","listing":"","photo":"photos/C027.jpg","status":"collection"},
  {"id":"C028","player":"Peyton Watson","pack":"2025-26 Topps Holiday","type":"Blue Metallic Glitter SP #H83","cat":"Parallel/Refractor","team":"Nuggets","listing":"","photo":"photos/C028.jpg","status":"collection"},
  {"id":"C029","player":"Kon Knueppel","pack":"2025-26 Topps NBA Hoops","type":"Holo Foil RC #67","cat":"Parallel/Refractor","team":"Hornets","listing":"","photo":"photos/C029.jpg","status":"collection"},
  {"id":"C030","player":"Brooks Barnhizer","pack":"2025-26 Topps NBA Hoops","type":"Holo Foil RC #158","cat":"Parallel/Refractor","team":"Thunder","listing":"","photo":"photos/C030.jpg","status":"collection"},
  {"id":"C031","player":"Isaiah Collier","pack":"2024-25 Topps Chrome","type":"Blue Refractor /150 RC #112","cat":"Parallel/Refractor","team":"Jazz","listing":"","photo":"photos/C031.jpg","status":"collection"},
  {"id":"C032","player":"Ace Bailey","pack":"2025-26 Topps Holiday","type":"Glitter RC #H165","cat":"Base","team":"Jazz","listing":"","photo":"photos/C032.jpg","status":"collection"}
];
