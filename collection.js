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
               When sold (via /sold), add "soldPrice":N + "soldDate":"YYYY-MM-DD".
     lot       optional group tag (e.g. "lot-1") marking a cheap card to be sold
               TOGETHER with others in a future "pack listing" (a bundled eBay lot for
               higher ROI). It does NOT merge entries — EVERY card stays its own entry
               with its own id (duplicates included; never grouped by quantity). Omit
               -> not in a pack lot.
     photoBack "photos/CXXX_back.jpg" -> stored back image (optional; not shown on grid).
     grade     "" or omit -> Raw / ungraded (default — all current cards).
               Set a grade like "PSA 10" or "BGS 9.5" to mark a card graded;
               it shows a gold grade badge. (Values still reflect raw comps
               unless you update them — graded slabs sell higher.)

   NOTE: purchase prices are intentionally NOT in this file — it ships
   to the public, so cost basis stays private. Pricing lives on eBay.
   ────────────────────────────────────────────────────────────── */

window.CARDS = [
  {"id":"C001","player":"Luka Doncic","pack":"2025-26 Topps Chrome x Cactus Jack","type":"Gold Refractor 43/50 #47","cat":"Specialty","team":"Lakers","listing":"https://www.ebay.com/itm/137465808331","photo":"photos/C001.jpg","photoBack":"photos/C001_back.jpg","status":"sold","soldPrice":800,"soldDate":"2026-07-10"},
  {"id":"C002","player":"Ace Bailey","pack":"2025-26 Topps Chrome x Cactus Jack","type":"Red Refractor 2/5 #65","cat":"Specialty","team":"Jazz","listing":"","photo":"photos/C002.jpg","photoBack":"photos/C002_back.jpg","status":"forSale"},
  {"id":"C003","player":"Stephen Curry","pack":"2025-26 Topps Chrome x Cactus Jack","type":"Utopia Highlights 022/150 #UH-11","cat":"Specialty","team":"Warriors","listing":"https://www.ebay.com/itm/137465825721","photo":"photos/C003.jpg","photoBack":"photos/C003_back.jpg","status":"sold","soldPrice":78,"soldDate":"2026-07-11"},
  {"id":"C004","player":"Donovan Mitchell","pack":"2025-26 Topps Chrome x Cactus Jack","type":"Utopia Highlights #UH-6","cat":"Specialty","team":"Cavaliers","listing":"","photo":"photos/C004.jpg","photoBack":"photos/C004_back.jpg","status":"collection"},
  {"id":"C006","player":"Cam Thomas","pack":"2025-26 Topps Chrome x Cactus Jack","type":"Gold Refractor SSP 05/50 #3","cat":"Specialty","team":"Nets","listing":"","photo":"photos/C006.jpg","photoBack":"photos/C006_back.jpg","hold":true,"status":"collection"},
  {"id":"C007","player":"De'Aaron Fox","pack":"2025-26 Topps Finest","type":"Masters Orange Geometric Auto 14/15","cat":"Hits","team":"Spurs","listing":"","photo":"","status":"collection"},
  {"id":"C008","player":"Christian Braun","pack":"2025-26 Topps","type":"Marks of Excellence Black Auto #ME-CB 1/10","cat":"Hits","team":"Nuggets","listing":"","photo":"photos/C008.jpg","photoBack":"photos/C008_back.jpg","hold":true,"personal":true,"status":"collection"},
  {"id":"C009","player":"Christian Braun","pack":"2025-26 Topps","type":"Marks of Excellence Gold Rainbow #ME-CB 34/50","cat":"Parallel/Refractor","team":"Nuggets","listing":"","photo":"","hold":true,"personal":true,"status":"collection"},
  {"id":"C010","player":"Christian Braun","pack":"2022-23 Panini Prizm","type":"Rookie Signatures Auto RC #RSI-CBR","cat":"Hits","team":"Nuggets","listing":"","photo":"photos/C010.jpg","photoBack":"photos/C010_back.jpg","hold":true,"personal":true,"status":"collection"},
  {"id":"C011","player":"Victor Wembanyama","pack":"2023-24 Panini Prizm","type":"RC Debut #136","cat":"Base","team":"Spurs","listing":"","photo":"","status":"collection"},
  {"id":"C012","player":"Victor Wembanyama","pack":"2023-24 Panini Mosaic","type":"Thunder Road Green Mosaic Prizm #8","cat":"Specialty","team":"Spurs","listing":"https://www.ebay.com/itm/137459711987","photo":"photos/C012.jpg","photoBack":"photos/C012_back.jpg","status":"sold","soldPrice":26,"soldDate":"2026-07-11"},
  {"id":"C013","player":"Victor Wembanyama","pack":"2023-24 Topps NOW","type":"40/20 Game Insert (VW-5)","cat":"Specialty","team":"Spurs","listing":"https://www.ebay.com/itm/137459721930","photo":"photos/C013.jpg","photoBack":"photos/C013_back.jpg","status":"sold","soldPrice":25.65,"soldDate":"2026-07-02"},
  {"id":"C014","player":"Dylan Harper","pack":"2025-26 Topps Chrome x Cactus Jack","type":"RC #62","cat":"Base","team":"Spurs","listing":"","photo":"photos/C014.jpg","photoBack":"photos/C014_back.jpg","status":"collection"},
  {"id":"C015","player":"Ace Bailey","pack":"2025-26 Topps Chrome x Cactus Jack","type":"RC #65","cat":"Base","team":"Jazz","listing":"","photo":"photos/C015.jpg","photoBack":"photos/C015_back.jpg","status":"collection"},
  {"id":"C016","player":"Carter Bryant","pack":"2025-26 Topps Chrome x Cactus Jack","type":"RC #74","cat":"Base","team":"Spurs","listing":"","photo":"","status":"collection"},
  {"id":"C018","player":"Kawhi Leonard","pack":"2025-26 Topps Chrome x Cactus Jack","type":"Jacked Up 047/150 #JU-23","cat":"Specialty","team":"Clippers","listing":"","photo":"photos/C018.jpg","photoBack":"photos/C018_back.jpg","status":"forSale"},
  {"id":"C019","player":"Jrue Holiday","pack":"2025-26 Topps Signature Class","type":"Round 1 Pick 17 024/275 #20","cat":"Parallel/Refractor","team":"Celtics","listing":"","photo":"photos/C019.jpg","photoBack":"photos/C019_back.jpg","status":"collection"},
  {"id":"C020","player":"Kon Knueppel","pack":"2025-26 Topps NBA Hoops","type":"RC #67","cat":"Base","team":"Hornets","listing":"","photo":"","status":"forSale"},
  {"id":"C021","player":"VJ Edgecombe","pack":"2025-26 Topps NBA Hoops","type":"RC #244","cat":"Base","team":"76ers","listing":"","photo":"","status":"collection"},
  {"id":"C022","player":"Dylan Harper","pack":"2025-26 Topps NBA Hoops","type":"RC #7","cat":"Base","team":"Spurs","listing":"","photo":"","status":"forSale"},
  {"id":"C023","player":"Cam Spencer","pack":"2025-26 Topps NBA Hoops","type":"Hyper Signatures Auto #HHS-CS","cat":"Specialty","team":"Grizzlies","listing":"","photo":"photos/C023.jpg","photoBack":"photos/C023_back.jpg","status":"forSale"},
  {"id":"C024","player":"Dylan Harper","pack":"2025-26 Bowman Chrome","type":"Chrome RC #BCV-2","cat":"Base","team":"Spurs","listing":"","photo":"photos/C024.jpg","photoBack":"photos/C024_back.jpg","status":"collection"},
  {"id":"C025","player":"Ryan Kalkbrenner","pack":"2025-26 Donruss","type":"Significant Signatures RC Auto","cat":"Specialty","team":"Hornets","listing":"","photo":"","status":"forSale"},
  {"id":"C026","player":"Cooper Flagg","pack":"2025-26 Bowman Chrome","type":"Chrome RC #BCV-1","cat":"Base","team":"Mavericks","listing":"","photo":"","status":"collection"},
  {"id":"C027","player":"VJ Edgecombe","pack":"2025-26 Topps NBA Hoops","type":"Holo Foil RC #244","cat":"Parallel/Refractor","team":"76ers","listing":"","photo":"photos/C027.jpg","hidden":true,"status":"forSale"},
  {"id":"C028","player":"Peyton Watson","pack":"2025-26 Topps Holiday","type":"Blue Metallic Glitter SP #H83","cat":"Parallel/Refractor","team":"Nuggets","listing":"","photo":"photos/C028.jpg","hidden":true,"status":"collection"},
  {"id":"C029","player":"Kon Knueppel","pack":"2025-26 Topps NBA Hoops","type":"Holo Foil RC #67","cat":"Parallel/Refractor","team":"Hornets","listing":"","photo":"photos/C029.jpg","hidden":true,"status":"collection"},
  {"id":"C030","player":"Brooks Barnhizer","pack":"2025-26 Topps NBA Hoops","type":"Holo Foil RC #158","cat":"Parallel/Refractor","team":"Thunder","listing":"","photo":"photos/C030.jpg","hidden":true,"status":"collection"},
  {"id":"C031","player":"Isaiah Collier","pack":"2024-25 Topps Chrome","type":"Blue Refractor /150 RC #112","cat":"Parallel/Refractor","team":"Jazz","listing":"","photo":"photos/C031.jpg","photoBack":"photos/C031_back.jpg","hold":true,"status":"collection"},
  {"id":"C032","player":"Ace Bailey","pack":"2025-26 Topps Holiday","type":"Glitter RC #H165","cat":"Base","team":"Jazz","listing":"","photo":"photos/C032.jpg","hidden":true,"status":"collection"},
  {"id":"C033","player":"Cooper Flagg","pack":"2025-26 Bowman","type":"Base RC #1","cat":"Base","team":"Mavericks","listing":"","photo":"photos/C033.jpg","photoBack":"photos/C033_back.jpg","status":"collection"},
  {"id":"C034","player":"Dylan Harper","pack":"2025-26 Topps NBA Hoops","type":"Holo Foil RC #7","cat":"Parallel/Refractor","team":"Spurs","listing":"","photo":"photos/C034.jpg","photoBack":"photos/C034_back.jpg","status":"collection"},
  {"id":"C035","player":"Victor Wembanyama","pack":"2023-24 Panini Mosaic","type":"NBA Debut Silver Prizm #257","cat":"Parallel/Refractor","team":"Spurs","listing":"","photo":"photos/C035.jpg","photoBack":"photos/C035_back.jpg","status":"collection"},
  {"id":"C036","player":"Isaiah Collier","pack":"2025-26 Topps Signature Class","type":"Round 1 Pick 29 /150 #5","cat":"Specialty","team":"Jazz","listing":"","photo":"photos/C036.jpg","photoBack":"photos/C036_back.jpg","hold":true,"status":"collection"},
  {"id":"C037","player":"Damian Lillard","pack":"2025-26 Bowman Chrome","type":"Refractor 022/499 #BCV-81","cat":"Parallel/Refractor","team":"Bucks","listing":"","photo":"photos/C037.jpg","photoBack":"photos/C037_back.jpg","status":"collection"},
  {"id":"C038","player":"Ace Bailey","pack":"2025-26 Bowman Chrome","type":"Refractor 304/499 RC #BCV-5","cat":"Parallel/Refractor","team":"Jazz","featured":true,"listing":"https://www.ebay.com/itm/137459696133","photo":"photos/C038.jpg","photoBack":"photos/C038_back.jpg","status":"sold","soldPrice":11.5,"soldDate":"2026-06-29"},
  {"id":"C039","player":"Cam Thomas","pack":"2025-26 Topps Chrome","type":"Gold Refractor 03/50 #85","cat":"Parallel/Refractor","team":"Nets","listing":"","photo":"photos/C039.jpg","photoBack":"photos/C039_back.jpg","hold":true,"status":"collection"},
  {"id":"C040","player":"Dwyane Wade","pack":"2025-26 Bowman Chrome","type":"Young Kings #YK-23","cat":"Specialty","team":"Heat","listing":"","photo":"photos/C040.jpg","photoBack":"photos/C040_back.jpg","status":"collection"},
  {"id":"C041","player":"Kon Knueppel","pack":"2025-26 Topps NBA Hoops","type":"Holo Foil RC #67","cat":"Parallel/Refractor","team":"Hornets","listing":"","photo":"photos/C041.jpg","photoBack":"photos/C041_back.jpg","status":"collection"},
  {"id":"C042","player":"Cade Cunningham","pack":"2025-26 Bowman Chrome","type":"Young Kings #YK-12","cat":"Specialty","team":"Pistons","listing":"","photo":"photos/C042.jpg","photoBack":"photos/C042_back.jpg","status":"collection"},
  {"id":"C043","player":"Cade Cunningham","pack":"2025-26 Bowman Chrome","type":"Young Kings #YK-12","cat":"Specialty","team":"Pistons","listing":"","photo":"photos/C043.jpg","photoBack":"photos/C043_back.jpg","status":"collection"},
  {"id":"C044","player":"Magic Johnson","pack":"2025-26 Topps Chrome","type":"Galaxy Greats #GG-30","cat":"Specialty","team":"Lakers","listing":"","photo":"photos/C044.jpg","photoBack":"photos/C044_back.jpg","status":"collection"},
  {"id":"C045","player":"Ja Morant","pack":"2025-26 Topps Chrome","type":"Propulsion #PRP-8","cat":"Specialty","team":"Grizzlies","listing":"","photo":"photos/C045.jpg","photoBack":"photos/C045_back.jpg","status":"collection"},
  {"id":"C046","player":"Kevin Durant","pack":"2025-26 Bowman Chrome","type":"Hobby Stars #HS-12","cat":"Specialty","team":"Rockets","listing":"","photo":"photos/C046.jpg","photoBack":"photos/C046_back.jpg","status":"collection"},
  {"id":"C047","player":"Kevin Durant","pack":"2025-26 Topps Signature Class","type":"Round 1 Pick 2 #57","cat":"Specialty","team":"Rockets","listing":"","photo":"photos/C047.jpg","photoBack":"photos/C047_back.jpg","status":"collection"},
  {"id":"C048","player":"Kawhi Leonard","pack":"2025-26 Topps NBA Hoops","type":"Net 2 Net #NTN-19","cat":"Specialty","team":"Clippers","listing":"","photo":"photos/C048.jpg","photoBack":"photos/C048_back.jpg","status":"collection"},
  {"id":"C049","player":"Tyrese Haliburton","pack":"2025-26 Bowman Chrome","type":"Chrome #BCV-77","cat":"Base","team":"Pacers","listing":"","photo":"photos/C049.jpg","photoBack":"photos/C049_back.jpg","status":"collection"},
  {"id":"C050","player":"Jeremiah Fears","pack":"2025-26 Topps Signature Class","type":"Unfazed #FAZE-17","cat":"Specialty","team":"Pelicans","listing":"","photo":"photos/C050.jpg","photoBack":"photos/C050_back.jpg","status":"collection"},
  {"id":"C051","player":"VJ Edgecombe","pack":"2025-26 Topps NBA Hoops","type":"Holo Foil RC #244","cat":"Parallel/Refractor","team":"76ers","listing":"","photo":"photos/C051.jpg","photoBack":"photos/C051_back.jpg","status":"collection"},
  {"id":"C052","player":"Khaman Maluach","pack":"2025-26 Donruss","type":"Zero Gravity #16","cat":"Specialty","team":"Suns","listing":"","photo":"photos/C052.jpg","photoBack":"photos/C052_back.jpg","status":"collection"},
  {"id":"C053","player":"Ace Bailey","pack":"2025-26 Bowman Chrome","type":"Greatness Loading #GL-5","cat":"Specialty","team":"Jazz","listing":"","photo":"photos/C053.jpg","photoBack":"photos/C053_back.jpg","status":"collection"},
  {"id":"C054","player":"VJ Edgecombe","pack":"2025-26 Bowman Chrome","type":"Rockstar Rookies #RR-3","cat":"Specialty","team":"76ers","listing":"","photo":"photos/C054.jpg","photoBack":"photos/C054_back.jpg","status":"collection"},
  {"id":"C055","player":"Cedric Coward","pack":"2025-26 Bowman Chrome","type":"ROY Favorites #RY-11","cat":"Specialty","team":"Grizzlies","listing":"","photo":"photos/C055.jpg","photoBack":"photos/C055_back.jpg","status":"collection"},
  {"id":"C056","player":"Nikola Jokic","pack":"2024-25 Panini Revolution","type":"Base #76","cat":"Base","team":"Nuggets","listing":"","photo":"photos/C056.jpg","photoBack":"photos/C056_back.jpg","status":"collection"},
  {"id":"C057","player":"Anthony Edwards","pack":"2025-26 Bowman Chrome","type":"Hobby Stars Refractor #HS-14","cat":"Specialty","team":"Timberwolves","listing":"","photo":"photos/C057.jpg","photoBack":"photos/C057_back.jpg","status":"collection"},
  {"id":"C058","player":"Anthony Edwards","pack":"2025-26 Bowman Chrome","type":"Hobby Stars #HS-14","cat":"Specialty","team":"Timberwolves","listing":"","photo":"photos/C058.jpg","photoBack":"photos/C058_back.jpg","status":"collection"},
  {"id":"C059","player":"Jaden McDaniels","pack":"2020-21 Panini Absolute","type":"Rookie Autograph Variation #RAV-JMC","cat":"Hits","team":"Timberwolves","listing":"","photo":"photos/C059.jpg","photoBack":"photos/C059_back.jpg","hold":true,"personal":true,"status":"collection"},
  {"id":"C060","player":"Ryan Kalkbrenner","pack":"2025-26 Donruss","type":"Significant Signatures Auto RC #SS-RYK","cat":"Hits","team":"Hornets","listing":"","photo":"photos/C060.jpg","photoBack":"photos/C060_back.jpg","status":"collection"},
  {"id":"C061","player":"Cameron Thomas","pack":"2021-22 Panini Black","type":"Rookie Memorabilia Auto Patch 12/25 #RMA-CT","cat":"Hits","team":"Nets","listing":"","photo":"photos/C061.jpg","photoBack":"photos/C061_back.jpg","hold":true,"status":"collection"},
  {"id":"C062","player":"Stephon Castle","pack":"2025-26 Bowman Chrome","type":"Chrome RC #BCV-145","cat":"Base","team":"Spurs","listing":"","photo":"photos/C062.jpg","photoBack":"photos/C062_back.jpg","status":"collection"},
  {"id":"C063","player":"Jeremiah Fears","pack":"2025-26 Bowman","type":"Base RC #7","cat":"Base","team":"Pelicans","listing":"","photo":"photos/C063.jpg","photoBack":"photos/C063_back.jpg","status":"collection"},
  {"id":"C064","player":"Jordan Clarkson","pack":"2025-26 Topps Signature Class","type":"Round 2 Pick 46 #100","cat":"Specialty","team":"Jazz","listing":"","photo":"photos/C064.jpg","photoBack":"photos/C064_back.jpg","status":"collection"},
  {"id":"C065","player":"Herbert Jones","pack":"2025-26 Topps Signature Class","type":"Round 2 Pick 35 #38","cat":"Specialty","team":"Pelicans","listing":"","photo":"photos/C065.jpg","photoBack":"photos/C065_back.jpg","status":"collection"},
  {"id":"C066","player":"Anfernee Simons","pack":"2025-26 Topps Signature Class","type":"Round 2 Pick 24 #70","cat":"Specialty","team":"Trail Blazers","listing":"","photo":"photos/C066.jpg","photoBack":"photos/C066_back.jpg","status":"collection"},
  {"id":"C067","player":"Micah Peavy","pack":"2025-26 Topps Signature Class","type":"Round 2 Pick 40 #134","cat":"Specialty","team":"Pelicans","listing":"","photo":"photos/C067.jpg","photoBack":"photos/C067_back.jpg","status":"collection"},
  {"id":"C068","player":"Josh Giddey","pack":"2025-26 Topps Signature Class","type":"Round 1 Pick 6 #45","cat":"Specialty","team":"Bulls","listing":"","photo":"photos/C068.jpg","photoBack":"photos/C068_back.jpg","status":"collection"},
  {"id":"C069","player":"Derik Queen","pack":"2025-26 Topps Signature Class","type":"High Frequency #HF-13","cat":"Specialty","team":"Pelicans","listing":"","photo":"photos/C069.jpg","photoBack":"photos/C069_back.jpg","status":"collection"},
  {"id":"C070","player":"Walter Clayton Jr.","pack":"2025-26 Bowman Chrome","type":"Chrome RC #BCV-18","cat":"Base","team":"Jazz","listing":"","photo":"photos/C070.jpg","photoBack":"photos/C070_back.jpg","status":"collection"},
  {"id":"C071","player":"Thomas Sorber","pack":"2025-26 Bowman Chrome","type":"Greatness Loading #GL-15","cat":"Specialty","team":"Thunder","listing":"","photo":"photos/C071.jpg","photoBack":"photos/C071_back.jpg","status":"collection"},
  {"id":"C072","player":"Joan Beringer","pack":"2025-26 Bowman Chrome","type":"Rockstar Rookies #RR-17","cat":"Specialty","team":"Timberwolves","listing":"","photo":"photos/C072.jpg","photoBack":"photos/C072_back.jpg","status":"collection"},
  {"id":"C074","player":"Jeremiah Fears","pack":"2025-26 Donruss","type":"Zero Gravity #8","cat":"Specialty","team":"Pelicans","listing":"","photo":"photos/C074.jpg","photoBack":"photos/C074_back.jpg","status":"collection"},
  {"id":"C075","player":"Yang Hansen","pack":"2025-26 Topps Holiday","type":"Player Relic Jersey Patch /99 #PR-YH","cat":"Hits","team":"Trail Blazers","listing":"","photo":"photos/C075.jpg","photoBack":"photos/C075_back.jpg","hold":true,"status":"collection"},
  {"id":"C076","player":"Jaden McDaniels","pack":"2024-25 Donruss Optic","type":"Green 20/25 #40","cat":"Parallel/Refractor","team":"Timberwolves","listing":"","photo":"photos/C076.jpg","photoBack":"photos/C076_back.jpg","hold":true,"personal":true,"status":"collection"},
  {"id":"C077","player":"Jaden McDaniels","pack":"2025-26 Topps Chrome","type":"Purple Refractor 03/75 #176","cat":"Parallel/Refractor","team":"Timberwolves","listing":"","photo":"photos/C077.jpg","photoBack":"photos/C077_back.jpg","status":"forSale"},
  {"id":"C078","player":"Donovan Mitchell","pack":"2017-18 Panini Prizm","type":"Mosaic RC #5","cat":"Parallel/Refractor","team":"Jazz","listing":"","photo":"photos/C078.jpg","photoBack":"photos/C078_back.jpg","grade":"PSA 10","hold":true,"status":"collection"},
  {"id":"C079","player":"VJ Edgecombe","pack":"2025-26 Topps Chrome x Cactus Jack","type":"Jacked Up #JU-2","cat":"Specialty","team":"76ers","listing":"","photo":"photos/C079.jpg","photoBack":"photos/C079_back.jpg","status":"collection"},
  {"id":"C080","player":"VJ Edgecombe","pack":"2025-26 Topps Chrome x Cactus Jack","type":"RC #63","cat":"Base","team":"76ers","listing":"","photo":"photos/C080.jpg","photoBack":"photos/C080_back.jpg","status":"collection"},
  {"id":"C081","player":"Cooper Flagg","pack":"2025-26 Topps Chrome x Cactus Jack","type":"RC #61","cat":"Base","team":"Mavericks","listing":"https://www.ebay.com/itm/137465730661","photo":"photos/C081.jpg","photoBack":"photos/C081_back.jpg","status":"sold","soldPrice":22.50,"soldDate":"2026-07-11"},
  {"id":"C082","player":"Victor Wembanyama","pack":"2025-26 Topps Chrome x Cactus Jack","type":"Base #59","cat":"Base","team":"Spurs","listing":"","photo":"photos/C082.jpg","photoBack":"photos/C082_back.jpg","hold":true,"status":"collection"},
  {"id":"C083","player":"Johni Broome","pack":"2025-26 Topps Chrome x Cactus Jack","type":"Refractor 154/299 RC #95","cat":"Parallel/Refractor","team":"76ers","listing":"","photo":"photos/C083.jpg","photoBack":"photos/C083_back.jpg","status":"collection"},
  {"id":"C084","player":"Nolan Traore","pack":"2025-26 Topps Chrome x Cactus Jack","type":"Refractor 164/299 RC #79","cat":"Parallel/Refractor","team":"Nets","listing":"","photo":"photos/C084.jpg","photoBack":"photos/C084_back.jpg","hold":true,"status":"collection"},
  {"id":"C085","player":"Joan Beringer","pack":"2025-26 Topps Chrome x Cactus Jack","type":"Refractor 231/299 RC #77","cat":"Parallel/Refractor","team":"Timberwolves","listing":"","photo":"photos/C085.jpg","photoBack":"photos/C085_back.jpg","status":"collection"},
  {"id":"C086","player":"Jase Richardson","pack":"2025-26 Topps Chrome x Cactus Jack","type":"Refractor 151/175 RC #85","cat":"Parallel/Refractor","team":"Magic","listing":"","photo":"photos/C086.jpg","photoBack":"photos/C086_back.jpg","status":"collection"},
  {"id":"C087","player":"Chaz Lanier","pack":"2025-26 Topps Chrome x Cactus Jack","type":"Gold Refractor 34/50 RC #98","cat":"Parallel/Refractor","team":"Pistons","listing":"","photo":"photos/C087.jpg","photoBack":"photos/C087_back.jpg","status":"collection"},
  {"id":"C088","player":"Alex Sarr","pack":"2025-26 Topps Chrome x Cactus Jack","type":"Gold Refractor 23/50 RC #29","cat":"Parallel/Refractor","team":"Wizards","listing":"https://www.ebay.com/itm/137465772814","photo":"photos/C088.jpg","photoBack":"photos/C088_back.jpg","status":"sold","soldPrice":10,"soldDate":"2026-06-29"},
  {"id":"C089","player":"Derik Queen","pack":"2025-26 Topps Chrome x Cactus Jack","type":"RC #73","cat":"Base","team":"Pelicans","listing":"","photo":"photos/C089.jpg","photoBack":"photos/C089_back.jpg","status":"forSale"},
  {"id":"C090","player":"Cedric Coward","pack":"2025-26 Topps Chrome x Cactus Jack","type":"RC #71","cat":"Base","team":"Grizzlies","listing":"","photo":"photos/C090.jpg","photoBack":"photos/C090_back.jpg","status":"collection"},
  {"id":"C091","player":"Jayson Tatum","pack":"2025-26 Topps Chrome x Cactus Jack","type":"Jacked Up #JU-11","cat":"Specialty","team":"Celtics","listing":"","photo":"photos/C091.jpg","photoBack":"photos/C091_back.jpg","status":"forSale"},
  {"id":"C092","player":"Karl-Anthony Towns","pack":"2025-26 Topps Chrome x Cactus Jack","type":"Base #5","cat":"Base","team":"Knicks","listing":"","photo":"photos/C092.jpg","photoBack":"photos/C092_back.jpg","status":"collection"},
  {"id":"C093","player":"Ja Morant","pack":"2025-26 Topps Chrome x Cactus Jack","type":"Utopia Highlights #UH-15","cat":"Specialty","team":"Grizzlies","listing":"","photo":"photos/C093.jpg","photoBack":"photos/C093_back.jpg","status":"collection"},
  {"id":"C094","player":"Kon Knueppel","pack":"2025-26 Topps Chrome x Cactus Jack","type":"RC #64","cat":"Base","team":"Hornets","listing":"","photo":"photos/C094.jpg","photoBack":"photos/C094_back.jpg","status":"forSale"},
  {"id":"C095","player":"Pascal Siakam","pack":"2025-26 Topps Chrome x Cactus Jack","type":"Jacked Up #JU-29","cat":"Specialty","team":"Pacers","listing":"","photo":"photos/C095.jpg","photoBack":"photos/C095_back.jpg","status":"forSale"},
  {"id":"C096","player":"Jase Richardson","pack":"2025-26 Topps Cosmic Chrome","type":"#144 RC","cat":"Base","team":"Magic","listing":"","photo":"photos/C096.jpg","photoBack":"photos/C096_back.jpg","status":"collection"},
  {"id":"C097","player":"Payton Pritchard","pack":"2024-25 Panini Prizm Black","type":"Mojo Prizm SP 08/25 #212","cat":"Parallel/Refractor","team":"Celtics","listing":"","photo":"photos/C097.jpg","photoBack":"photos/C097_back.jpg","status":"forSale"},
  {"id":"C098","player":"Jalen Brunson","pack":"2025-26 Topps Chrome x Cactus Jack","type":"Gold Refractor SSP 17/50 #4","cat":"Specialty","team":"Knicks","listing":"","photo":"photos/C098.jpg","photoBack":"photos/C098_back.jpg","status":"forSale"},
  {"id":"C099","player":"Giannis Antetokounmpo","pack":"2025-26 Topps Chrome x Cactus Jack","type":"Teal Speckle 242/299 #17","cat":"Specialty","team":"Bucks","listing":"","photo":"photos/C099.jpg","photoBack":"photos/C099_back.jpg","lot":true,"status":"forSale"},
  {"id":"C100","player":"Walker Kessler","pack":"2022-23 Panini Spectra","type":"Rookie Patch Auto 21/35 #207","cat":"Hits","team":"Jazz","listing":"","photo":"photos/C100.jpg","photoBack":"photos/C100_back.jpg","status":"forSale"},
  {"id":"C101","player":"Payton Pritchard","pack":"2020-21 Panini Prizm","type":"Green Prizm #257","cat":"Parallel/Refractor","team":"Celtics","listing":"","photo":"photos/C101.jpg","photoBack":"photos/C101_back.jpg","grade":"PSA 9","status":"forSale"},
  {"id":"C103","player":"Donovan Mitchell","pack":"2025-26 Topps Chrome","type":"Sleek Finishers Red Refractor 2/5 #SF-7","cat":"Specialty","team":"Cavaliers","listing":"","photo":"photos/C103.jpg","photoBack":"photos/C103_back.jpg","grade":"PSA 10","status":"forSale"},
  {"id":"C104","player":"Barry Sanders","pack":"2004 Topps HOF","type":"On-Card Autograph (Plaque Photo Print)","cat":"Hits","team":"Lions","listing":"","photo":"photos/C104.jpg","photoBack":"photos/C104_back.jpg","status":"forSale"},
  {"id":"C105","player":"Damian Lillard","pack":"2025-26 Bowman Chrome","type":"Refractor 499 #BCV-81","cat":"Parallel/Refractor","team":"Bucks","listing":"","photo":"photos/C105.jpg","photoBack":"photos/C105_back.jpg","status":"forSale"},
  {"id":"C106","player":"Joan Beringer","pack":"2025-26 Topps Chrome x Cactus Jack","type":"Refractor 231/299 RC","cat":"Parallel/Refractor","team":"Timberwolves","listing":"","photo":"photos/C106.jpg","photoBack":"photos/C106_back.jpg","status":"forSale"},
  {"id":"C107","player":"VJ Edgecombe","pack":"2025-26 Topps Chrome x Cactus Jack","type":"Jacked Up #JU-2 RC","cat":"Specialty","team":"76ers","listing":"","photo":"photos/C107.jpg","photoBack":"photos/C107_back.jpg","status":"forSale"},
  {"id":"C108","player":"Cooper Flagg","pack":"2025-26 Bowman","type":"RC #1","cat":"Base","team":"Mavericks","listing":"https://www.ebay.com/itm/137531239990","photo":"photos/C108.jpg","photoBack":"photos/C108_back.jpg","status":"forSale"},
  {"id":"C109","player":"Cedric Coward","pack":"2025-26 Bowman","type":"Rookie of the Year Favorites #RY-11 RC","cat":"Specialty","team":"Grizzlies","listing":"","photo":"photos/C109.jpg","photoBack":"photos/C109_back.jpg","status":"forSale"},
  {"id":"C110","player":"Ace Bailey","pack":"2025-26 Bowman","type":"Greatness Loading #GL-5 RC","cat":"Specialty","team":"Jazz","listing":"","photo":"photos/C110.jpg","photoBack":"photos/C110_back.jpg","status":"forSale"},
  {"id":"C111","player":"Kawhi Leonard","pack":"2025-26 Topps NBA Hoops","type":"Net 2 Net Insert","cat":"Specialty","team":"Clippers","listing":"","photo":"photos/C111.jpg","photoBack":"photos/C111_back.jpg","status":"forSale"},
  {"id":"C112","player":"Payton Pritchard","pack":"2024-25 Panini Prizm Black","type":"Mojo Prizm SP 22/25 #212","cat":"Parallel/Refractor","team":"Celtics","listing":"","photo":"","grade":"PSA 10","status":"collection"}
];
