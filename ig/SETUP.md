# Instagram Auto-Poster — One-Time Setup

The poster (`ig/run.mjs`) publishes 1 card/day to **@MayseQards** via the Meta Graph API (v21.0). It needs two credentials in `ig/ig-config.json`: an Instagram user id (`igUserId`) and a long-lived `accessToken`. This guide gets you both. You only do this once (plus a token refresh every ~60 days).

---

## 1. Make @MayseQards a Professional account + link a Facebook Page

Graph API publishing only works for Instagram **Professional** accounts that are **connected to a Facebook Page**.

1. In the Instagram app: **Settings → Account type and tools → Switch to professional account** → pick **Business** (or Creator).
2. Connect it to a Facebook Page: **Settings → Business tools and controls → Connected Facebook Page** (create a Page for MayseQards if you don't have one).

## 2. Create a Meta app

1. Go to <https://developers.facebook.com> → **My Apps → Create App** → choose the **Business** app type.
2. In the app dashboard, add the **Instagram Graph API** product (may appear as "Instagram" / "Instagram API"). Also add **Facebook Login for Business** if prompted — it's what issues the token.

## 3. Permissions (scopes) you need

When generating a token, request these scopes:

```
instagram_basic
instagram_content_publish
pages_read_engagement
pages_show_list
```

> Note: some setups also require `business_management` (if your Page lives in a Business Portfolio). If step 5 can't find the account, add it and re-generate the token.

## 4. Get a long-lived access token

1. Open the **Graph API Explorer**: <https://developers.facebook.com/tools/explorer>
2. Select your app, click **Generate Access Token**, and approve the scopes from step 3 (make sure your Page and the Instagram account are both selected in the popup).
3. That token is **short-lived (~1 hour)**. Exchange it for a **long-lived token (~60 days)**:

```
GET https://graph.facebook.com/v21.0/oauth/access_token
  ?grant_type=fb_exchange_token
  &client_id=APP_ID
  &client_secret=APP_SECRET
  &fb_exchange_token=SHORT_LIVED_TOKEN
```

(App ID and App Secret are in the app dashboard under **Settings → Basic**.) The response's `access_token` is your long-lived token — that's what goes in the config.

> **Important:** long-lived tokens expire after ~60 days, and when the token dies the daily posts **silently stop** — there's no visible error unless you check. Set a calendar reminder (~every 50 days) to re-run this exchange (generate a fresh short-lived token in the Explorer, exchange it again) and paste the new token into `ig-config.json`.

## 5. Find your Instagram user id (`igUserId`)

The id you need is the **Instagram Business Account id**, found through the connected Page.

Option A — you know the Page id:

```
GET https://graph.facebook.com/v21.0/PAGE_ID?fields=instagram_business_account&access_token=TOKEN
```

Option B — list your Pages first:

```
GET https://graph.facebook.com/v21.0/me/accounts?access_token=TOKEN
```

Grab the MayseQards Page's `id`, then run Option A. The number inside `instagram_business_account.id` is your `igUserId`.

## 6. Fill in the config

```bash
cp ig/ig-config.example.json ig/ig-config.json
```

Edit `ig/ig-config.json` and paste in the two values:

```json
{
  "igUserId": "1784XXXXXXXXXXXXX",
  "accessToken": "EAAG..."
}
```

`ig-config.json` is **gitignored** — it stays on this machine and will never be pushed to the public repo. (Same for `ig/state.json`, the rotation state file that's auto-created on first publish.)

## 7. Test, then go live

```bash
# Dry run: builds + prints the next post, publishes NOTHING, needs no token.
node ig/run.mjs --dry-run

# The real thing: publishes today's card.
node ig/run.mjs
```

Use `--dry-run` freely to tune captions — it's completely safe.

---

## How it publishes (FYI)

Two Graph API calls per post:

1. `POST https://graph.facebook.com/v21.0/{igUserId}/media` with `{image_url, caption, access_token}` → creates a media container.
2. `POST https://graph.facebook.com/v21.0/{igUserId}/media_publish` with `{creation_id, access_token}` → publishes it.

The `image_url` must be **publicly reachable** — ours already are, hosted at `https://mayseqards.com/photos/...`, so there's no upload step.

## Publishing limits

Instagram allows roughly **25 API-published posts per 24 hours** per account. At 1 post/day we're nowhere near the cap.

## Running it daily

Put it on the 24/7 box with a daily cron entry, e.g.:

```cron
0 10 * * * node /path/to/ig/run.mjs >> /path/to/ig/post.log 2>&1
```

Adjust the path and time; once a day is all it needs.

## Troubleshooting

| Symptom | Likely cause / fix |
|---|---|
| Auth error / `Error validating access token` / posts silently stopped | Token expired. Re-run **step 4** (new short-lived token → exchange → paste into `ig-config.json`). |
| "media create failed" on the `/media` call | The `image_url` isn't publicly reachable (check it opens in an incognito browser), or the token is missing `instagram_content_publish`. |
| "No Instagram business account" / account-not-linked errors | The IG account isn't Professional, isn't linked to the Page, or the app/scopes are missing — redo **steps 1–3**. |
