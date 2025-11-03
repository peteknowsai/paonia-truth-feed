# CI/CD Setup - Automatic Deployment

Your repository is now configured for **automatic deployment** to Cloudflare Workers on every push to `main` branch!

## ✅ What's Configured

- **GitHub Actions workflow**: `.github/workflows/deploy.yml`
- **Environment secrets**: All set in GitHub repository
- **Automatic triggers**: Push to main, or manual trigger

## 🔐 Secrets Configured

The following secrets have been set in your GitHub repository:

- ✅ `CLOUDFLARE_ACCOUNT_ID` - Your Cloudflare account
- ✅ `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk authentication
- ✅ `CLERK_SECRET_KEY` - Clerk server key
- ✅ `NEXT_PUBLIC_CONVEX_URL` - Convex database URL
- ✅ `CONVEX_DEPLOYMENT` - Convex deployment key
- ✅ `NEXT_PUBLIC_ADMIN_EMAILS` - Admin email addresses
- ⏳ `CLOUDFLARE_API_TOKEN` - **You need to add this!**

## ⚠️ Final Step: Add Cloudflare API Token

1. Go to: https://dash.cloudflare.com/profile/api-tokens/create
2. Click **"Edit Cloudflare Workers"** template
3. Select your account in "Account Resources"
4. Click **"Continue to summary"** → **"Create Token"**
5. Copy the token
6. Run this command:

```bash
echo "YOUR_TOKEN_HERE" | gh secret set CLOUDFLARE_API_TOKEN --repo peteknowsai/paonia-truth-feed
```

Or set it manually at:
https://github.com/peteknowsai/paonia-truth-feed/settings/secrets/actions

## 🚀 How It Works

### Automatic Deployment (on push to main)

```bash
git add .
git commit -m "Your changes"
git push origin main
```

GitHub Actions will automatically:
1. Build your Next.js app
2. Build with OpenNext for Cloudflare
3. Deploy to Workers at: https://paonia-truth-feed.peteknowsai.workers.dev

### Manual Deployment

You can also trigger deployment manually:

1. Go to: https://github.com/peteknowsai/paonia-truth-feed/actions
2. Click "Deploy to Cloudflare Workers"
3. Click "Run workflow" → "Run workflow"

### Local Deployment (still works)

You can still deploy locally anytime:

```bash
npm run deploy
```

## 📊 View Deployments

- **GitHub Actions runs**: https://github.com/peteknowsai/paonia-truth-feed/actions
- **Cloudflare Dashboard**: https://dash.cloudflare.com/
- **Live site**: https://paonia-truth-feed.peteknowsai.workers.dev

## 🔍 Troubleshooting

### Deployment fails with "missing secrets"

Check that all secrets are set:
```bash
gh secret list --repo peteknowsai/paonia-truth-feed
```

### Build fails

Check the GitHub Actions logs:
https://github.com/peteknowsai/paonia-truth-feed/actions

### Update a secret

```bash
echo "NEW_VALUE" | gh secret set SECRET_NAME --repo peteknowsai/paonia-truth-feed
```

## 📝 Next Steps

1. ✅ Add `CLOUDFLARE_API_TOKEN` secret
2. ✅ Push to main branch to test automatic deployment
3. ✅ Monitor the GitHub Actions workflow
4. ✅ Verify deployment at your Worker URL

---

**That's it!** Every push to main will now automatically deploy your site! 🎉
