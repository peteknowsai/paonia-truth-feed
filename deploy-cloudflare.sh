#!/bin/bash

# Cloudflare Pages Deployment Script
# This script helps deploy to Cloudflare Pages with proper environment setup

set -e

PROJECT_NAME="paonia-truth-feed"

echo "🚀 Cloudflare Pages Deployment for $PROJECT_NAME"
echo ""

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Error: wrangler is not installed"
    echo "Install with: npm install -g wrangler"
    exit 1
fi

# Check if authenticated
if ! wrangler whoami &> /dev/null; then
    echo "❌ Error: Not authenticated with Cloudflare"
    echo "Run: wrangler login"
    exit 1
fi

echo "✅ Wrangler authenticated"
echo ""

# Check for .env.local file
if [ ! -f .env.local ]; then
    echo "⚠️  Warning: .env.local not found"
    echo "You'll need to set environment variables in Cloudflare Dashboard"
    echo "See CLOUDFLARE_DEPLOY.md for instructions"
    echo ""
fi

# Build the application
echo "📦 Building Next.js application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check your environment variables."
    echo "Required variables:"
    echo "  - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
    echo "  - CLERK_SECRET_KEY"
    echo "  - NEXT_PUBLIC_CONVEX_URL"
    echo "  - CONVEX_DEPLOYMENT"
    echo ""
    echo "Create a .env.local file or set them before building"
    exit 1
fi

echo "✅ Build successful"
echo ""

# Deploy to Cloudflare Pages
echo "🚀 Deploying to Cloudflare Pages..."
wrangler pages deploy .next --project-name=$PROJECT_NAME

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo "🌐 Your site: https://$PROJECT_NAME.pages.dev"
    echo ""
    echo "📝 Next steps:"
    echo "  1. Set environment variables in Cloudflare Dashboard"
    echo "  2. Test your deployment"
    echo "  3. Configure custom domain (optional)"
    echo ""
    echo "See CLOUDFLARE_DEPLOY.md for more details"
else
    echo "❌ Deployment failed"
    exit 1
fi
