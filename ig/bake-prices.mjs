// bake-prices.mjs — refresh the `price` field on for-sale cards in collection.js from the
// latest eBay asks in selldesk.json (matched by `listing` URL). Idempotent: only touches lines
// whose price actually changed. Run AFTER /selldesk; then commit + push collection.js to deploy
// (the IG poster on the box + the storefront both read the live collection.js).
//
//   node ig/bake-prices.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const sd = JSON.parse(readFileSync(new URL('selldesk.json', root), 'utf8'));
const priceByUrl = {};
for (const l of (sd.listings || [])) if (l.url && l.ask != null) priceByUrl[l.url.trim()] = l.ask;

const path = new URL('collection.js', root);
const lines = readFileSync(path, 'utf8').split('\n');
let added = 0, updated = 0, removed = 0;

const out = lines.map(line => {
  if (!/^\s*\{.*"id":"/.test(line)) return line;               // not a card object line
  let obj; try { obj = JSON.parse(line.trim().replace(/,\s*$/, '')); } catch { return line; }
  const want = obj.status === 'forSale' && obj.listing ? priceByUrl[obj.listing.trim()] : undefined;
  const has = obj.price;
  if (want == null && has == null) return line;                // nothing to do
  if (want != null && has === want) return line;               // already correct
  if (want != null && has == null) {                           // add
    added++; return line.replace(/\}(,?)\s*$/, `,"price":${want}}$1`);
  }
  if (want != null && has != null) {                           // update
    updated++; return line.replace(/"price":\s*[0-9.]+/, `"price":${want}`);
  }
  removed++;                                                   // no longer for sale / no match → drop
  return line.replace(/,\s*"price":\s*[0-9.]+/, '').replace(/"price":\s*[0-9.]+\s*,/, '');
});

writeFileSync(path, out.join('\n'));
console.log(`prices: +${added} added, ${updated} updated, ${removed} removed`);
