#!/bin/bash

# Automated CI/CD Setup for Cloudflare Workers

set -e

echo "🚀 Setting up GitHub Actions CI/CD for Cloudflare Workers"
echo "=========================================================="
echo ""

# Load environment variables
if [ ! -f .env.local ]; then
    echo "❌ Error: .env.local not found!"
    exit 1
fi

set -a
source .env.local
set +a

# Get Cloudflare Account ID
ACCOUNT_ID="5a6fef07a998d84ec047ef43d0543342"

echo "Step 1: Setting Cloudflare Account ID..."
gh secret set CLOUDFLARE_ACCOUNT_ID --body="$ACCOUNT_ID" --repo peteknowsai/paonia-truth-feed
echo "✅ CLOUDFLARE_ACCOUNT_ID set"
echo ""

echo "Step 2: Setting environment variables..."
gh secret set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY --body="$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" --repo peteknowsai/paonia-truth-feed
echo "✅ NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY set"

gh secret set CLERK_SECRET_KEY --body="$CLERK_SECRET_KEY" --repo peteknowsai/paonia-truth-feed
echo "✅ CLERK_SECRET_KEY set"

gh secret set NEXT_PUBLIC_CONVEX_URL --body="$NEXT_PUBLIC_CONVEX_URL" --repo peteknowsai/paonia-truth-feed
echo "✅ NEXT_PUBLIC_CONVEX_URL set"

gh secret set CONVEX_DEPLOYMENT --body="$CONVEX_DEPLOYMENT" --repo peteknowsai/paonia-truth-feed
echo "✅ CONVEX_DEPLOYMENT set"

gh secret set NEXT_PUBLIC_ADMIN_EMAILS --body="$NEXT_PUBLIC_ADMIN_EMAILS" --repo peteknowsai/paonia-truth-feed
echo "✅ NEXT_PUBLIC_ADMIN_EMAILS set"

echo ""
echo "⚠️  Manual Step Required:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "You need to create a Cloudflare API Token:"
echo ""
echo "1. Opening: https://dash.cloudflare.com/profile/api-tokens"
echo "2. Click 'Create Token'"
echo "3. Use 'Edit Cloudflare Workers' template"
echo "4. Click 'Continue to summary' → 'Create Token'"
echo "5. Copy the token"
echo ""

# Open the API tokens page
open "https://dash.cloudflare.com/profile/api-tokens"

echo "After you have the token, run this command:"
echo ""
echo "  gh secret set CLOUDFLARE_API_TOKEN --body=\"YOUR_TOKEN_HERE\" --repo peteknowsai/paonia-truth-feed"
echo ""
echo "Or enter it now (paste and press Enter):"
read -r API_TOKEN

if [ -n "$API_TOKEN" ]; then
    gh secret set CLOUDFLARE_API_TOKEN --body="$API_TOKEN" --repo peteknowsai/paonia-truth-feed
    echo "✅ CLOUDFLARE_API_TOKEN set"
    echo ""
    echo "🎉 All secrets configured!"
    echo ""
    echo "Next: Push to main branch to trigger deployment"
    echo "  git push origin main"
else
    echo ""
    echo "⚠️  You can set the API token later with:"
    echo "  gh secret set CLOUDFLARE_API_TOKEN --body=\"YOUR_TOKEN\" --repo peteknowsai/paonia-truth-feed"
fi

echo ""
echo "📝 View your secrets at:"
echo "https://github.com/peteknowsai/paonia-truth-feed/settings/secrets/actions"
