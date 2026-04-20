---
description: Build and deploy paoniatruth.site to Cloudflare Workers via wrangler
---

Deploy the site to Cloudflare Workers. GitHub Actions CI is broken (missing `CLOUDFLARE_API_TOKEN` secret), so deploys happen manually from this machine using Pete's OAuth'd wrangler session.

Run these two commands in order, then verify the deploy:

1. Build the worker bundle:
   ```bash
   npx opennextjs-cloudflare build
   ```

2. Deploy via wrangler:
   ```bash
   npx wrangler deploy
   ```

3. Verify live by curling the site and checking for a recent change (prefer a specific string the user expects to see). If the user didn't specify one, confirm `https://paoniatruth.site` returns HTTP 200 with `x-opennext: 1` in headers.

Notes:
- `wrangler.toml` points `main` at `.open-next/worker.js`, which the build step produces.
- Custom domain: `paoniatruth.site`. Also reachable at `paonia-truth-feed.peteknowsai.workers.dev`.
- Do NOT attempt to fix CI or set the `CLOUDFLARE_API_TOKEN` secret unless Pete asks — he's chosen manual-deploy as the workflow.
- If the build or deploy fails, surface the error clearly. Don't retry blindly. Common failures: stale `.open-next/` dir (delete and rebuild), Convex/Clerk env vars missing (check `.env.local`), wrangler auth expired (`npx wrangler login`).
