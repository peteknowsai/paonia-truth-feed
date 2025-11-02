#!/bin/bash

# Helper script to get environment variable values

echo "🔍 Environment Variables Setup Helper"
echo "========================================"
echo ""

echo "📋 Where to find your values:"
echo ""

echo "1️⃣  CLERK KEYS"
echo "   Dashboard: https://dashboard.clerk.com/"
echo "   Steps:"
echo "   - Go to your application"
echo "   - Click 'API Keys' in the sidebar"
echo "   - Copy 'Publishable key' → NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
echo "   - Copy 'Secret key' → CLERK_SECRET_KEY"
echo ""

echo "2️⃣  CONVEX DEPLOYMENT"
echo "   Dashboard: https://dashboard.convex.dev/"
echo "   Steps:"
echo "   - Select your project"
echo "   - Go to Settings → URL & Deploy Key"
echo "   - Copy 'Deployment URL' → NEXT_PUBLIC_CONVEX_URL"
echo "   - Copy 'Deploy Key' → CONVEX_DEPLOYMENT"
echo ""

echo "3️⃣  ADMIN EMAILS"
echo "   Your email: petefromsf@gmail.com (already set)"
echo ""

echo "================================"
echo ""
echo "📝 Edit .env.local and replace the XXXXXXX placeholders"
echo ""
echo "Then run:"
echo "  ./setup-cloudflare-env.sh    # Upload to Cloudflare"
echo "  ./deploy-cloudflare.sh        # Deploy your site"
echo ""

# Try to open dashboards
read -p "Open Clerk dashboard in browser? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    open "https://dashboard.clerk.com/" 2>/dev/null || echo "Visit: https://dashboard.clerk.com/"
fi

read -p "Open Convex dashboard in browser? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    open "https://dashboard.convex.dev/" 2>/dev/null || echo "Visit: https://dashboard.convex.dev/"
fi

echo ""
echo "✅ After you've updated .env.local, verify with:"
echo "   cat .env.local | grep -v '#' | grep '='"
