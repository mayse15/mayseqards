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
// Prefer the LIVE deployed collection so the poster is always current (esp. on the 24/7 box);
// fall back to the local file for offline dev.
async function loadCards() {
  try {
    const res = await fetch(`${SITE}/collection.js`);
    if (res.ok) {
      const m = (await res.text()).match(/\[[\s\S]*\]/);
      if (m) return JSON.parse(m[0]);
    }
  } catch { /* offline / site down → fall back to local */ }
  try {
    const m = readFileSync(new URL('../collection.js', HERE), 'utf8').match(/\[[\s\S]*\]/);
    return m ? JSON.parse(m[0]) : [];
  } catch { return []; }
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
const fmtPrice = p => { const n = Number(p); return Number.isInteger(n) ? `$${n}` : `$${n.toFixed(2)}`; };
function caption(c) {
  const { serial } = parseType(c.type);
  const gradeLine = c.grade ? ` — ${c.grade} 🔒` : '';
  const forSale = c.status === 'forSale';
  // Instagram never makes caption URLs clickable — the only tappable route is "link in bio".
  const priceStr = forSale && c.price != null ? ` — ${fmtPrice(c.price)}` : '';
  const availLine = forSale
    ? `🟢 Available now${priceStr} — tap the link in bio to grab it on eBay.`
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

// ── Meta Graph API publish (create media container(s) → wait until ready → publish) ──
const GRAPH = 'https://graph.facebook.com/v21.0';
const sleep = ms => new Promise(r => setTimeout(r, ms));

// Create a media container on the IG user, return its id.
async function createContainer(cfg, params) {
  const mk = await fetch(`${GRAPH}/${cfg.igUserId}/media`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ ...params, access_token: cfg.accessToken }),
  }).then(r => r.json());
  if (!mk.id) throw new Error('media create failed: ' + JSON.stringify(mk));
  return mk.id;
}

// Poll a container until FINISHED — IG rejects publishing an unready container with code 9007.
async function waitReady(cfg, id) {
  for (let i = 0; i < 15; i++) {
    const st = await fetch(`${GRAPH}/${id}?fields=status_code&access_token=${cfg.accessToken}`).then(r => r.json());
    if (st.status_code === 'FINISHED') return;
    if (st.status_code === 'ERROR' || st.status_code === 'EXPIRED') throw new Error('media processing failed: ' + JSON.stringify(st));
    await sleep(2000);
  }
  throw new Error('media not ready after polling: ' + id);
}

// Publish a single image, or a carousel when given multiple (e.g. card front + back).
async function publish(cfg, imageUrls, cap) {
  let creationId;
  if (imageUrls.length === 1) {
    creationId = await createContainer(cfg, { image_url: imageUrls[0], caption: cap });
    await waitReady(cfg, creationId);
  } else {
    // Carousel: one child container per image, then a parent CAROUSEL container holding them.
    const children = [];
    for (const url of imageUrls) {
      const id = await createContainer(cfg, { image_url: url, is_carousel_item: true });
      await waitReady(cfg, id);
      children.push(id);
    }
    creationId = await createContainer(cfg, { media_type: 'CAROUSEL', children: children.join(','), caption: cap });
    await waitReady(cfg, creationId);
  }
  const pub = await fetch(`${GRAPH}/${cfg.igUserId}/media_publish`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ creation_id: creationId, access_token: cfg.accessToken }),
  }).then(r => r.json());
  if (!pub.id) throw new Error('publish failed: ' + JSON.stringify(pub));
  return pub.id; // the published IG media id
}

// ── main ──
const cards = await loadCards();
const state = loadState();
const card = pickNext(cards, state);
if (!card) { console.log('No eligible cards to post.'); process.exit(0); }

// Post both sides when a back photo exists (→ carousel); otherwise just the front.
const images = [`${SITE}/${card.photo}`];
if (card.photoBack) images.push(`${SITE}/${card.photoBack}`);
const cap = caption(card);

console.log(`\n── Next IG post: ${card.id} ${card.player} ──`);
console.log(`images (${images.length}${images.length > 1 ? ', carousel' : ''}):`);
images.forEach(u => console.log('  ' + u));
console.log('caption:\n' + cap + '\n');

if (DRY) { console.log('[dry-run] not published.'); process.exit(0); }

let cfg;
try { cfg = JSON.parse(readFileSync(new URL('ig-config.json', HERE), 'utf8')); }
catch { console.error('Missing ig/ig-config.json — do the Meta setup (ig/SETUP.md) first, or use --dry-run.'); process.exit(1); }

const mediaId = await publish(cfg, images, cap);
state.posted.push(card.id);
state.updated = new Date().toISOString().slice(0, 10);
writeFileSync(new URL('state.json', HERE), JSON.stringify(state, null, 1));
console.log(`✅ Posted ${card.id} to @MayseQards (media ${mediaId}). ${state.posted.length}/${cards.filter(eligible).length} cycled.`);
