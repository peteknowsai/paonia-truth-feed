#!/bin/bash

echo "Setting up Convex for Paonia Truth Feed"
echo "========================================="
echo ""
echo "When prompted:"
echo "1. Choose 'existing project'"
echo "2. Select your team (if you have multiple)"
echo "3. Select 'paonia-truth-feed' or the project name you created"
echo "4. Choose 'production' deployment"
echo ""
echo "Press Enter to continue..."
read

# Run Convex dev to configure the project
npx convex dev --once

echo ""
echo "Configuration complete! Now you can:"
echo "1. Run 'npm run convex' in a separate terminal to keep Convex synced"
echo "2. Go to https://dashboard.convex.dev to run the seed function"
echo "3. Switch to the Convex-powered components (see CONVEX_SETUP.md)"