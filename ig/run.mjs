// run.mjs — MayseQards Instagram auto-poster (1 card/day via Meta Graph API).
//   node ig/run.mjs --dry-run     build + print the next post, DON'T publish (no token needed)
//   node ig/run.mjs               publish the next card to @MayseQards
//
// Why Graph API (not browser): posting is a pure server-side HTTP call (image_url + caption),
// so this runs headless on the 24/7 box with NO login/browser — none of the fragile automation.
// Graph API REQUIRES a public image URL → we use the card photos already hosted at mayseqards.com.
//
// Setup (one-time, see ig/SETUP.md): @MayseQards must be a Business/Creator account linked to a
// Facebook Page; a Meta app grants a long-lived token + the IG-user-id. Paste both into
// ig/ig-config.json (gitignored). Until then, --dry-run works fully for tuning captions.
import { readFileSync, writeFileSync } from 'node:fs';

const HERE = new URL('.', import.meta.url);
const DRY = process.argv.includes('--dry-run');
const SITE = 'https://mayseqards.com';

// ── load cards from collection.js (window.CARDS = [...]) ──
function loadCards() {
  const txt = readFileSync(new URL('../collection.js', HERE), 'utf8');
  const arr = txt.match(/\[[\s\S]*\]/);
  return arr ? JSON.parse(arr[0]) : [];
}

// ── eligibility: real photo, public, not a personal keep ──
const eligible = c => c.photo && !c.hidden && !c.personal && c.status !== 'sold';

// ── caption + hashtags from one card ──
function parseType(type = '') {
  const serial = (type.match(/\d+\/\d+|\/\d+/) || [])[0] || '';
  const num = (type.match(/#[A-Za-z]*-?\d+/) || [])[0] || '';
  return { serial, num };
}
function hashtags(c) {
  const tags = ['#thehobby', '#nbacards', '#basketballcards', '#whodenit', '#cardcollector'];
  const p = c.player.replace(/[^A-Za-z]/g, '');
  if (p) tags.push('#' + p);
  if (c.team) tags.push('#' + c.team.replace(/[^A-Za-z0-9]/g, ''));
  if (c.grade) tags.push('#' + c.grade.replace(/[^A-Za-z0-9]/g, ''), '#gradedcards');
  if (/RC\b|Rookie/i.test(c.type)) tags.push('#rookiecard');
  if (/\/\d+|\d+\/\d+/.test(c.type)) tags.push('#numbered');
  return [...new Set(tags)].slice(0, 12).join(' ');
}
function caption(c) {
  const { serial } = parseType(c.type);
  const gradeLine = c.grade ? ` — ${c.grade} 🔒` : '';
  const availLine = c.status === 'forSale'
    ? '🟢 Available now — tap the link in bio to grab it on eBay.'
    : '💎 From the MayseQards vault.';
  const lines = [
    `🏀 ${c.player} — ${c.pack}${gradeLine}`,
    `${c.type}${serial && !c.type.includes(serial) ? ` (${serial})` : ''}`,
    '',
    availLine,
    `🔗 ${SITE}  ·  link in bio`,
    '',
    hashtags(c),
  ];
  return lines.join('\n');
}

// ── rotation state: never repeat until the whole pool cycles ──
function loadState() {
  try { return JSON.parse(readFileSync(new URL('state.json', HERE), 'utf8')); }
  catch { return { posted: [], updated: null }; }
}
function pickNext(cards, state) {
  const pool = cards.filter(eligible);
  // prefer never-posted, oldest-posted next; within that, for-sale first (drives sales)
  const rank = c => (state.posted.includes(c.id) ? 1 : 0);
  const unposted = pool.filter(c => !state.posted.includes(c.id));
  const list = (unposted.length ? unposted : pool)
    .sort((a, b) => (rank(a) - rank(b)) || ((a.status === 'forSale' ? 0 : 1) - (b.status === 'forSale' ? 0 : 1)));
  return list[0] || null;
}

// ── Meta Graph API publish (2-step: create media container → publish) ──
async function publish(cfg, imageUrl, cap) {
  const base = `https://graph.facebook.com/v21.0/${cfg.igUserId}`;
  const mk = await fetch(`${base}/media`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ image_url: imageUrl, caption: cap, access_token: cfg.accessToken }),
  }).then(r => r.json());
  if (!mk.id) throw new Error('media create failed: ' + JSON.stringify(mk));
  const pub = await fetch(`${base}/media_publish`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ creation_id: mk.id, access_token: cfg.accessToken }),
  }).then(r => r.json());
  if (!pub.id) throw new Error('publish failed: ' + JSON.stringify(pub));
  return pub.id; // the published IG media id
}

// ── main ──
const cards = loadCards();
const state = loadState();
const card = pickNext(cards, state);
if (!card) { console.log('No eligible cards to post.'); process.exit(0); }

const imageUrl = `${SITE}/${card.photo}`;
const cap = caption(card);

console.log(`\n── Next IG post: ${card.id} ${card.player} ──`);
console.log('image:', imageUrl);
console.log('caption:\n' + cap + '\n');

if (DRY) { console.log('[dry-run] not published.'); process.exit(0); }

let cfg;
try { cfg = JSON.parse(readFileSync(new URL('ig-config.json', HERE), 'utf8')); }
catch { console.error('Missing ig/ig-config.json — do the Meta setup (ig/SETUP.md) first, or use --dry-run.'); process.exit(1); }

const mediaId = await publish(cfg, imageUrl, cap);
state.posted.push(card.id);
state.updated = new Date().toISOString().slice(0, 10);
writeFileSync(new URL('state.json', HERE), JSON.stringify(state, null, 1));
console.log(`✅ Posted ${card.id} to @MayseQards (media ${mediaId}). ${state.posted.length}/${cards.filter(eligible).length} cycled.`);
