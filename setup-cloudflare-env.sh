#!/bin/bash

# Setup Cloudflare Pages Environment Variables
# This script helps set up environment variables from .env.local

set -e

PROJECT_NAME="paonia-truth-feed"

echo "🔐 Setting up Cloudflare Pages Environment Variables"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ Error: .env.local file not found"
    echo "Please create .env.local with your environment variables"
    echo "You can copy from .env.example: cp .env.example .env.local"
    exit 1
fi

# Source the .env.local file
set -a
source .env.local
set +a

echo "📝 Setting environment variables for project: $PROJECT_NAME"
echo ""

# Function to set a secret
set_secret() {
    local var_name=$1
    local var_value=${!var_name}
    
    if [ -n "$var_value" ]; then
        echo "Setting $var_name..."
        echo "$var_value" | wrangler pages secret put "$var_name" --project-name="$PROJECT_NAME"
    else
        echo "⚠️  Skipping $var_name (not set in .env.local)"
    fi
}

# Set all required environment variables
set_secret "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
set_secret "CLERK_SECRET_KEY"
set_secret "NEXT_PUBLIC_CLERK_SIGN_IN_URL"
set_secret "NEXT_PUBLIC_CLERK_SIGN_UP_URL"
set_secret "CONVEX_DEPLOYMENT"
set_secret "NEXT_PUBLIC_CONVEX_URL"
set_secret "NEXT_PUBLIC_ADMIN_EMAILS"
set_secret "NEXT_PUBLIC_BASE_URL"

echo ""
echo "✅ Environment variables setup complete!"
echo ""
echo "You can view/manage variables at:"
echo "https://dash.cloudflare.com/ → Workers & Pages → $PROJECT_NAME → Settings → Environment Variables"
