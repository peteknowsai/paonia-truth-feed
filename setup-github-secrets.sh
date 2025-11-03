#!/bin/bash

# Setup GitHub Secrets for CI/CD

echo "🔐 GitHub Secrets Setup for Cloudflare Workers CI/CD"
echo "===================================================="
echo ""
echo "You need to add these secrets to your GitHub repository:"
echo "https://github.com/peteknowsai/paonia-truth-feed/settings/secrets/actions"
echo ""

# Get Cloudflare Account ID
ACCOUNT_ID=$(wrangler whoami 2>&1 | grep "Account ID" | awk '{print $4}')

echo "1️⃣  CLOUDFLARE_ACCOUNT_ID"
echo "   Value: $ACCOUNT_ID"
echo ""

echo "2️⃣  CLOUDFLARE_API_TOKEN"
echo "   You need to create a new API token:"
echo "   • Go to: https://dash.cloudflare.com/profile/api-tokens"
echo "   • Click 'Create Token'"
echo "   • Use 'Edit Cloudflare Workers' template"
echo "   • Select your account"
echo "   • Create Token and copy the value"
echo ""

echo "3️⃣  Environment Variables (from .env.local):"
if [ -f .env.local ]; then
    source .env.local
    echo "   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: $NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
    echo "   CLERK_SECRET_KEY: [HIDDEN - copy from .env.local]"
    echo "   NEXT_PUBLIC_CONVEX_URL: $NEXT_PUBLIC_CONVEX_URL"
    echo "   CONVEX_DEPLOYMENT: [HIDDEN - copy from .env.local]"
    echo "   NEXT_PUBLIC_ADMIN_EMAILS: $NEXT_PUBLIC_ADMIN_EMAILS"
else
    echo "   ⚠️  .env.local not found!"
fi

echo ""
echo "📝 Using GitHub CLI (if installed):"
echo ""
echo "If you have 'gh' CLI installed, you can set secrets with:"
echo ""
echo "gh secret set CLOUDFLARE_ACCOUNT_ID --body=\"$ACCOUNT_ID\""
echo "gh secret set CLOUDFLARE_API_TOKEN --body=\"YOUR_API_TOKEN_HERE\""
echo "gh secret set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY --body=\"\$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY\""
echo "gh secret set CLERK_SECRET_KEY --body=\"\$CLERK_SECRET_KEY\""
echo "gh secret set NEXT_PUBLIC_CONVEX_URL --body=\"\$NEXT_PUBLIC_CONVEX_URL\""
echo "gh secret set CONVEX_DEPLOYMENT --body=\"\$CONVEX_DEPLOYMENT\""
echo "gh secret set NEXT_PUBLIC_ADMIN_EMAILS --body=\"\$NEXT_PUBLIC_ADMIN_EMAILS\""
echo ""
echo "Or set them manually at:"
echo "https://github.com/peteknowsai/paonia-truth-feed/settings/secrets/actions"
echo ""
echo "After setting secrets, push to main branch to trigger deployment!"
