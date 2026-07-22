#!/usr/bin/env node
/* ──────────────────────────────────────────────────────────────
   AUTO-CATALYSTS — catgen.mjs
   Turns the NBA chase board (nba-intel.json) into board-derived
   catalysts.js factors, WITHOUT clobbering hand-written news
   catalysts. News (source:"manual") always wins; the board only
   FILLS players that have no manual entry.

   Run: node catgen.mjs            (writes ./catalysts.js in place)
        node catgen.mjs --out X    (write elsewhere; dry-run/testing)
        node catgen.mjs --dry      (print, don't write)
   ────────────────────────────────────────────────────────────── */
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const HERE   = path.dirname(url.fileURLToPath(import.meta.url));
const INTEL  = path.join(HERE, 'nba-intel.json');
const COLL   = path.join(HERE, 'collection.js');
const CATOUT = (() => { const i = process.argv.indexOf('--out'); return i > -1 ? process.argv[i+1] : path.join(HERE, 'catalysts.js'); })();
const DRY    = process.argv.includes('--dry');
const AGENTS = path.join(HERE, 'agents-status.json');

// ── tunables (documented in the spec) ───────────────────────────
const K_POS = 0.30, CAP_POS = 0.22;       // underpriced → positive
const K_NEG = 0.14, CAP_NEG = -0.12;      // priced-up → gentle negative
const FLOOR_PRICE = 150, ART_RESID = -0.5, ART_CLAMP = -0.25; // superstar-floor artifact guard
const DEADBAND = 0.02;                     // |factor|<band ⇒ snap to 0 (anchor)
const HARD_CAP = 0.25;                     // contract bound
const HEAT_ONLY_MAX = 10;                  // # of non-held buy-candidates to publish for Goal-HQ heat
const SOURCE = 'nba-intel';

// ── name join: fold for MATCHING, emit collection spelling for KEY ──
const fold = s => s.normalize('NFD').replace(/[̀-ͯ]/g,'')
                    .replace(/[‘’]/g,"'").replace(/\s+/g,' ').trim().toLowerCase();

// direct-eval loader: runs the file with a local `window` in scope
function loadWindowGlobal(file, name){
  try { const window = {}; eval(fs.readFileSync(file,'utf8')); return window[name]; }
  catch(e){ console.error(`[catgen] failed to parse ${file}: ${e.message}`); return undefined; }
}

// ── inputs ──────────────────────────────────────────────────────
const intel = JSON.parse(fs.readFileSync(INTEL,'utf8'));
const CARDS = loadWindowGlobal(COLL,'CARDS') || [];
const prevCat = loadWindowGlobal(CATOUT === path.join(HERE,'catalysts.js') ? CATOUT : path.join(HERE,'catalysts.js'), 'CATALYSTS') || {players:{}};

// canonical collection names, keyed by fold(name)  → exact card.player spelling
const canon = new Map();
for (const c of CARDS){ if (c && c.player) canon.set(fold(c.player), c.player); }

// manual entries to PRESERVE: anything without source:"nba-intel"
const manualEntries = {};
for (const [k,v] of Object.entries(prevCat.players || {})){
  if (!v || v.source !== SOURCE) manualEntries[k] = v;   // news catalyst — untouched
}
const manualFold = new Set(Object.keys(manualEntries).map(fold));

// ── mapping formula: chase-board row → factor ───────────────────
function residFactor(resid, cardPrice){
  if (resid >= 0) return { f: Math.min(resid*K_POS, CAP_POS), artifact:false };
  let r = resid, artifact = false;
  if (cardPrice >= FLOOR_PRICE && resid <= ART_RESID){ r = Math.max(resid, ART_CLAMP); artifact = true; }
  return { f: Math.max(r*K_NEG, CAP_NEG), artifact };
}
const contenderBump = (type, teamScore) => type === 'contender' ? 0.05*(teamScore||0) : 0;
function youthBump(type, age, ym){
  if (type !== 'ascending') return 0;
  if (age <= 21 && ym >= 1.25) return 0.04;
  if (age <= 23 && ym >= 1.20) return 0.02;
  return 0;
}
const clampHard = x => Math.max(-HARD_CAP, Math.min(HARD_CAP, x));

function scoreRow(r){
  const { f: rf, artifact } = residFactor(r.valueResid, r.cardPrice);
  let f = clampHard(rf + contenderBump(r.type, r.teamScore) + youthBump(r.type, r.age, r.youthMult));
  if (Math.abs(f) < DEADBAND) f = 0;
  f = Math.round(f*1000)/1000;
  const dir  = f > 0 ? 'up' : f < 0 ? 'down' : 'flat';
  const heat = r.heat || 0;
  let conf = 'low';
  if (artifact) conf = 'low';
  else if (Math.abs(f) >= 0.12 && heat >= 35) conf = 'high';
  else if (Math.abs(f) >= 0.06) conf = 'med';
  return { f, dir, conf, artifact };
}

function catalystString(r, sc){
  const c = Math.round(r.cardPrice), e = Math.round(r.expPrice);
  const tags = [];
  if (r.type === 'ascending') tags.push('ascending');
  if (r.type === 'contender' && (r.teamScore||0) >= 0.5) tags.push('contender timing');
  if ((r.heat||0) >= 40) tags.push(`hot (heat ${Math.round(r.heat)})`);
  const tail = tags.length ? ' — ' + tags.join(', ') : '';
  if (sc.artifact) return `Board: premium blue-chip, model floor N/A ($${c} ask) — held flat`;
  if (sc.f > 0)  return `Board: underpriced vs model ($${c} ask → $${e} fair)${tail}`;
  if (sc.f < 0)  return `Board: priced up vs model ($${c} ask vs $${e} fair) — mild mean-revert risk`;
  return `Board: fairly valued vs model ($${c} ≈ $${e}) — no active edge`;
}

// ── build board entries ─────────────────────────────────────────
const today = new Date().toISOString().slice(0,10);
// dedupe board rows by folded name (chases + watchlist can double-list)
const rows = new Map();
for (const r of [...(intel.chases||[]), ...(intel.watchlist||[])]){
  if (!r || r.valueResid == null) continue;
  if (!rows.has(fold(r.player))) rows.set(fold(r.player), r);
}

const fills = {};       // held-in-collection, no manual entry
const heatCand = [];    // not held — buy candidates for Goal-HQ heat scan
for (const [nf, r] of rows){
  if (manualFold.has(nf)) continue;               // news wins — never overwrite
  const sc = scoreRow(r);
  const entry = {
    dir: sc.dir, factor: sc.f, conf: sc.conf,
    catalyst: catalystString(r, sc), date: today, source: SOURCE
  };
  if (canon.has(nf)){                              // matched a real held card
    fills[canon.get(nf)] = entry;                  // KEY = exact collection spelling
  } else if (sc.f > 0) {                           // heat-only buy candidate
    const key = r.player.normalize('NFD').replace(/[̀-ͯ]/g,''); // ascii display name
    heatCand.push([key, entry, sc.f]);
  }
}
// keep only the top-N heating buy candidates
heatCand.sort((a,b)=>b[2]-a[2]);
const heat = Object.fromEntries(heatCand.slice(0, HEAT_ONLY_MAX).map(([k,e])=>[k,e]));

// ── merge: manual first (authoritative), then board fills, then heat ──
const players = { ...heat, ...fills, ...manualEntries };  // manual last = wins on any key collision

const obj = { updated: today, players };
const banner =
`/* ──────────────────────────────────────────────────────────────
   MayseQards — Catalyst signals  (PRIVATE; git-ignored)
   AUTO-GENERATED by catgen.mjs on ${today}.
   • Entries with  source:"manual" (or no source) = hand-written /catalyst news — PRESERVED.
   • Entries with  source:"nba-intel"             = board-derived, regenerated each run.
   News beats data: a manual entry always overrides the board for the same player.
   factor bounded ±0.25; projectedValue = compValue * (1 + factor).
   ────────────────────────────────────────────────────────────── */
`;
const outText = banner + 'window.CATALYSTS = ' + JSON.stringify(obj, null, 2) + ';\n';

if (DRY){ process.stdout.write(outText); }
else {
  fs.writeFileSync(CATOUT, outText);
  console.error(`[catgen] wrote ${CATOUT}: ${Object.keys(manualEntries).length} manual + ${Object.keys(fills).length} board-fill + ${Object.keys(heat).length} heat-only = ${Object.keys(players).length} players`);

  // ── keep agents-status.json catalyst tile in sync (board rows only) ──
  // FIX: the ops-board tile reads data.agents.catalyst.signals (home.html:631/701), NOT top-level.
  try {
    const st = JSON.parse(fs.readFileSync(AGENTS,'utf8'));
    st.agents = st.agents || {};
    st.agents.catalyst = st.agents.catalyst || {};
    if (st.catalyst && st.catalyst.signals) delete st.catalyst.signals;   // clean up the old dead write
    const manualSignals = (st.agents.catalyst.signals || []).filter(s => s.source !== SOURCE);
    const boardSignals = Object.entries({ ...heat, ...fills }).map(([player,e]) => ({
      player, dir: e.dir, factorPct: Math.round(e.factor*100),
      catalyst: e.catalyst, conf: e.conf, source: SOURCE
    }));
    st.agents.catalyst.signals = [...manualSignals, ...boardSignals];
    fs.writeFileSync(AGENTS, JSON.stringify(st, null, 2));
  } catch(e){ console.error(`[catgen] agents-status.json not updated: ${e.message}`); }
}
