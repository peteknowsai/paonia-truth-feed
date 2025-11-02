# Cloudflare Deployment - Quick Start

Your site is now ready to deploy on Cloudflare Pages! 🚀

## Status: ✅ Configured

- Cloudflare Pages project created: `paonia-truth-feed`
- Deployment URL: https://paonia-truth-feed.pages.dev
- Wrangler authenticated ✅

## Deploy in 3 Steps

### 1️⃣ Set up environment variables

Copy your environment variables from Vercel or create new ones:

```bash
cp .env.example .env.local
# Edit .env.local with your Clerk and Convex credentials
```

Then upload them to Cloudflare:

```bash
./setup-cloudflare-env.sh
```

### 2️⃣ Deploy your site

```bash
./deploy-cloudflare.sh
```

### 3️⃣ Verify deployment

Visit https://paonia-truth-feed.pages.dev and test your app!

## What Changed?

- ✅ Added `wrangler.toml` for Cloudflare configuration
- ✅ Updated `package.json` with deploy script
- ✅ Created deployment helper scripts
- ✅ Created environment variables template
- ✅ Updated README with Cloudflare instructions

## Environment Variables Needed

Copy these from your Vercel deployment or Clerk/Convex dashboards:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - From Clerk Dashboard
- `CLERK_SECRET_KEY` - From Clerk Dashboard
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL` - Usually `/sign-in`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL` - Usually `/sign-up`
- `CONVEX_DEPLOYMENT` - From Convex Dashboard
- `NEXT_PUBLIC_CONVEX_URL` - From Convex Dashboard
- `NEXT_PUBLIC_ADMIN_EMAILS` - Your admin email(s)
- `NEXT_PUBLIC_BASE_URL` - Your domain (initially `https://paonia-truth-feed.pages.dev`)

## Manual Deployment (Alternative)

If you prefer manual control:

```bash
# Build
npm run build

# Deploy
wrangler pages deploy .next --project-name paonia-truth-feed
```

## Set Up Automatic Deployments (Optional)

Connect your GitHub repository:

1. Go to https://dash.cloudflare.com/
2. Navigate to **Workers & Pages** → **paonia-truth-feed**
3. Go to **Settings** → **Builds & deployments**
4. Click **Connect to Git**
5. Select your repository
6. Configure:
   - Build command: `npm run build`
   - Build output directory: `.next`
   - Set environment variables in the dashboard

## Next Steps

1. ✅ Deploy your site
2. Test all features (auth, database, etc.)
3. Update Clerk webhook URLs to new domain
4. Configure custom domain (optional)
5. Remove Vercel deployment (once verified)

## Need Help?

- Full guide: [CLOUDFLARE_DEPLOY.md](./CLOUDFLARE_DEPLOY.md)
- Cloudflare Docs: https://developers.cloudflare.com/pages/
- Wrangler CLI: https://developers.cloudflare.com/workers/wrangler/

## Troubleshooting

**Build fails?** Make sure all environment variables are set in `.env.local`

**Auth not working?** Update Clerk dashboard URLs to your new Cloudflare domain

**Convex errors?** Verify `NEXT_PUBLIC_CONVEX_URL` is correct

---

Happy deploying! 🎉
