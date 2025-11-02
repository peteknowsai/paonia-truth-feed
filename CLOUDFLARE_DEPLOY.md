# Cloudflare Pages Deployment Guide

This guide covers migrating your Next.js app from Vercel to Cloudflare Pages.

## Prerequisites

- Wrangler CLI installed and authenticated ✅
- Cloudflare Pages project created: `paonia-truth-feed` ✅
- Your site will be available at: https://paonia-truth-feed.pages.dev

## Environment Variables Setup

You need to set up the following environment variables in Cloudflare:

### Required Environment Variables

1. **Clerk Authentication** (from your Vercel deployment):
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
   - `NEXT_PUBLIC_CLERK_SIGN_UP_URL`

2. **Convex Backend**:
   - `CONVEX_DEPLOYMENT`
   - `NEXT_PUBLIC_CONVEX_URL`

3. **Other variables** (if any from your Vercel deployment)

### Set Environment Variables via CLI

#### Easy Method (Using Script)

1. Copy your environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your values in `.env.local`

3. Run the setup script:
   ```bash
   ./setup-cloudflare-env.sh
   ```

#### Manual Method

```bash
# Production variables
wrangler pages secret put CLERK_SECRET_KEY --project-name paonia-truth-feed
wrangler pages secret put NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY --project-name paonia-truth-feed
wrangler pages secret put NEXT_PUBLIC_CLERK_SIGN_IN_URL --project-name paonia-truth-feed
wrangler pages secret put NEXT_PUBLIC_CLERK_SIGN_UP_URL --project-name paonia-truth-feed
wrangler pages secret put CONVEX_DEPLOYMENT --project-name paonia-truth-feed
wrangler pages secret put NEXT_PUBLIC_CONVEX_URL --project-name paonia-truth-feed
wrangler pages secret put NEXT_PUBLIC_ADMIN_EMAILS --project-name paonia-truth-feed
wrangler pages secret put NEXT_PUBLIC_BASE_URL --project-name paonia-truth-feed
```

Or set them via the Cloudflare Dashboard:
1. Go to https://dash.cloudflare.com/
2. Navigate to Workers & Pages → paonia-truth-feed
3. Go to Settings → Environment Variables
4. Add each variable for Production

## Deployment

### Option 1: Deploy via Git (Recommended)

1. Connect your GitHub repository to Cloudflare Pages:
   ```bash
   # Go to Cloudflare Dashboard
   # Workers & Pages → paonia-truth-feed → Settings → Builds & deployments
   ```

2. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Root directory**: `/`
   - **Environment variables**: Set all required variables

3. Push to your repository to trigger automatic deployments

### Option 2: Deploy via CLI (Direct)

```bash
# Build the app
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy .next --project-name paonia-truth-feed
```

## Verification

After deployment:
1. Visit https://paonia-truth-feed.pages.dev
2. Test authentication with Clerk
3. Verify Convex integration is working

## Custom Domain Setup

To use a custom domain:

```bash
wrangler pages domain add yourdomain.com --project-name paonia-truth-feed
```

Or configure via Dashboard:
1. Workers & Pages → paonia-truth-feed → Custom domains
2. Add your domain and follow DNS configuration steps

## Differences from Vercel

- Cloudflare Pages uses edge runtime by default
- Some Next.js features may behave differently
- Environment variables are managed through Cloudflare Dashboard or CLI
- Logs available in Cloudflare Dashboard under Workers & Pages

## Troubleshooting

If you encounter issues:
1. Check environment variables are set correctly
2. Review build logs in Cloudflare Dashboard
3. Ensure Clerk webhook URLs are updated to new domain
4. Check Convex deployment configuration

## Cleanup Vercel (Optional)

Once everything works on Cloudflare:
1. Update DNS to point to Cloudflare
2. Update Clerk dashboard URLs
3. Remove Vercel deployment if desired
