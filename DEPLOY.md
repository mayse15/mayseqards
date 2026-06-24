# Deploying MayseQards (free hosts)

The site is fully static — just HTML/CSS/JS + images — so any static host works, free.

## What ships (and what never does)
**Public files (the site):** `index.html`, `storefront.html`, `collection.js`, `values.js`, `photos/`
`index.html` redirects `/` → `storefront.html` (the real page), so the site loads at the host root.

**Never published** — these are listed in `.gitignore`, so a `git`-based deploy excludes them automatically:
`Card_Collection.xlsx` (private cost/value history), `serve.py`, `comp-lookup.html`, `checklists.json`,
`HANDOFF.md`, `MayseQards_BuildBrief.md`, `.claude/`, legacy `mayseqards*.html` / `cards.json`, `*.dmg`, `.DS_Store`.

> ⚠️ If you use a **drag-and-drop** host (Netlify/Cloudflare "drop a folder"), do **not** drag the whole
> `files-2` folder — that would upload the private spreadsheet. Build a clean folder first (see Option C).

---

## Option A — GitHub Pages (uses .gitignore, safest)
A git repo is already initialized here and the public files are committed.
1. Create an empty repo on github.com (e.g. `mayseqards`).
2. In this folder:
   ```
   git remote add origin https://github.com/<you>/mayseqards.git
   git branch -M main
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → `main` / root** → Save.
4. Live in ~1 min at `https://<you>.github.io/mayseqards/`.
Because of `.gitignore`, only the public files are in the repo, so only they go live.

## Option B — Netlify or Cloudflare Pages via Git (recommended for a custom URL)
1. Push to GitHub (Option A, steps 1–2).
2. Netlify: "Add new site → Import from Git" → pick the repo → no build command, publish directory = root → Deploy.
   Cloudflare: "Workers & Pages → Create → Pages → Connect to Git" → same settings.
3. Free `*.netlify.app` / `*.pages.dev` URL; add a custom domain later if you want.

## Option C — Drag-and-drop (no Git) — build a clean folder first
From this folder, copy only the public files into `dist/`:
```
rm -rf dist && mkdir dist && cp index.html storefront.html collection.js values.js dist/ && cp -R photos dist/
```
Then drag the **`dist/`** folder onto app.netlify.com/drop (or Cloudflare Pages "Upload assets"). Re-run the copy
and re-drop whenever cards change. (`dist/` is safe to delete; it's just an export.)

---

## After deploying
- New cards / value updates: edit `collection.js` / `values.js` (or via `/addcard`, `/comps`, `/sold`), then
  re-deploy — `git push` (Options A/B auto-rebuild) or rebuild+re-drop `dist/` (Option C).
- The public URL is what you share / link from your eBay storefront.
