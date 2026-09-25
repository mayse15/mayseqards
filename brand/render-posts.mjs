// render-posts.mjs — Whatnot-themed show announcements rendered from code (no Canva).
// Generates the IG post (1080x1350) and the Whatnot show cover (1080x1920) from one
// HTML template, using REAL card photos from photos/. Re-run weekly with the new date.
//
//   node brand/render-posts.mjs --date "FRIDAY 7PM ET" --cards C117,C103
//
// Outputs brand/post-ig.png + brand/post-cover.png. Uses the scanner's playwright.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { chromium } from '../scanner/node_modules/playwright/index.mjs';

const ROOT = path.dirname(fileURLToPath(new URL('.', import.meta.url)));   // files-2
const arg = (name, dflt) => {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : dflt;
};
const DATE = arg('--date', 'FRIDAY 7PM ET');
const IDS = arg('--cards', 'C164,C033').split(',').map(s => s.trim());

const src = readFileSync(path.join(ROOT, 'collection.js'), 'utf8');
const cards = JSON.parse(src.slice(src.indexOf('['), src.lastIndexOf(']') + 1));
const heroes = IDS.map(id => cards.find(c => c.id === id)).filter(Boolean)
  .map(c => ({ ...c, photoAbs: 'file://' + path.join(ROOT, c.photo) }));

// Whatnot-flavored palette: their yellow on near-black.
const YELLOW = '#FFD60A', BLACK = '#0B0B0C', WHITE = '#FFFFFF';

const page_ = (mode) => {
  const cover = mode === 'cover';
  const W = 1080, H = cover ? 1920 : 1350;
  const photos = heroes.map((h, i) => `
    <div class="card" style="transform:rotate(${i % 2 ? 5 : -6}deg) translateY(${i % 2 ? 18 : 0}px)">
      <img src="${h.photoAbs}" alt=""></div>`).join('');
  const title = cover
    ? `<div class="eyebrow">LIVE ON WHATNOT</div>
       <h1>BASKETBALL<br>SINGLES<br>NIGHT</h1>`
    : `<div class="eyebrow">@MAYSEQARDS PRESENTS</div>
       <h1>LIVE ON<br>WHATNOT</h1>`;
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@500;700&display=swap" rel="stylesheet">
<style>
  * { margin:0; box-sizing:border-box; }
  body { width:${W}px; height:${H}px; background:${BLACK}; overflow:hidden;
    font-family:'Archivo',sans-serif; color:${WHITE}; position:relative; }
  body::before { content:''; position:absolute; inset:0;
    background:radial-gradient(ellipse 90% 45% at 50% -10%, rgba(255,214,10,.22), transparent 60%); }
  .wrap { position:relative; height:100%; display:flex; flex-direction:column;
    align-items:center; text-align:center; padding:${cover ? 110 : 90}px 70px ${cover ? 90 : 70}px; }
  .eyebrow { font-weight:700; letter-spacing:.32em; font-size:${cover ? 40 : 36}px; color:${WHITE};
    border:3px solid ${YELLOW}; border-radius:999px; padding:${cover ? 18 : 14}px 44px; }
  h1 { font-family:'Archivo Black'; color:${YELLOW}; font-size:${cover ? 128 : 160}px;
    line-height:.92; letter-spacing:-.01em; margin-top:${cover ? 54 : 40}px;
    text-shadow:0 0 90px rgba(255,214,10,.35); }
  .chips { display:flex; gap:22px; margin-top:${cover ? 56 : 48}px; align-items:center; }
  .chip { background:${YELLOW}; color:${BLACK}; font-family:'Archivo Black';
    font-size:${cover ? 52 : 46}px; padding:${cover ? 18 : 14}px 38px; border-radius:14px; }
  .sub { font-weight:700; font-size:${cover ? 44 : 40}px; color:${WHITE}; }
  .cards { flex:1; display:flex; align-items:center; justify-content:center; gap:46px;
    margin-top:${cover ? 40 : 30}px; }
  .card { background:#17181a; padding:20px; border-radius:18px;
    box-shadow:0 40px 90px rgba(0,0,0,.75), 0 0 0 1px rgba(255,255,255,.07); }
  .card img { display:block; height:${cover ? 640 : 360}px; width:auto; border-radius:8px; }
  .handle { font-family:'Archivo Black'; font-size:${cover ? 66 : 58}px; color:${WHITE}; }
  .handle b { color:${YELLOW}; }
  .datebar { margin-top:${cover ? 44 : 36}px; }
</style></head><body><div class="wrap">
  ${title}
  <div class="chips"><div class="chip">$1 STARTS</div><div class="sub">RCs · REFRACTORS · PARALLELS</div></div>
  <div class="cards">${photos}</div>
  <div class="chips datebar"><div class="chip">${DATE}</div></div>
  <div class="handle" style="margin-top:${cover ? 40 : 32}px">@<b>Mayseqards</b></div>
</div></body></html>`;
};

const br = await chromium.launch();
for (const mode of ['ig', 'cover']) {
  const W = 1080, H = mode === 'cover' ? 1920 : 1350;
  const pg = await br.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  const tmp = path.join(ROOT, 'brand', `.render-${mode}.html`);   // real file:// page so local photos load
  writeFileSync(tmp, page_(mode));
  await pg.goto('file://' + tmp, { waitUntil: 'networkidle' });
  await pg.waitForTimeout(700);   // font paint
  const out = path.join(ROOT, 'brand', `post-${mode}.png`);
  await pg.screenshot({ path: out });
  console.log('wrote', out);
  await pg.close();
}
await br.close();
