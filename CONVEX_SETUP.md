# Convex Setup Instructions

## Steps to Complete Convex Integration

### 1. Create a Convex Project

1. Go to https://dashboard.convex.dev
2. Sign in or create an account
3. Click "Create a new project"
4. Name your project (e.g., "paonia-truth-feed")
5. Copy the deployment URL (it will look like: `https://your-project-name.convex.cloud`)

### 2. Configure Environment Variables

1. Open `.env.local` in the project root
2. Add your Convex URL:
   ```
   NEXT_PUBLIC_CONVEX_URL=https://your-project-name.convex.cloud
   ```

### 3. Deploy Convex Functions

In a new terminal, run:
```bash
npm run convex
```

This will:
- Connect to your Convex project
- Deploy the schema and functions
- Generate TypeScript types
- Watch for changes

Keep this terminal running while developing.

### 4. Seed the Database (Optional)

Once Convex is running, you can seed the database with mock data:

1. Open the Convex dashboard: https://dashboard.convex.dev
2. Go to your project
3. Navigate to "Functions" tab
4. Find and run the `seed:seedDatabase` mutation
5. This will populate your database with the mock posts and comments

### 5. Switch to Convex Components

The app currently uses mock data. To switch to Convex:

1. Rename the current files to keep as backup:
   ```bash
   mv src/app/page.tsx src/app/page-mock.tsx
   mv src/app/post/[id]/page.tsx src/app/post/[id]/page-mock.tsx
   mv src/contexts/VotingContext.tsx src/contexts/VotingContext-mock.tsx
   ```

2. Use the Convex versions:
   ```bash
   mv src/app/page-convex.tsx src/app/page.tsx
   mv src/app/post/[id]/page-convex.tsx src/app/post/[id]/page.tsx
   mv src/contexts/VotingContext-convex.tsx src/contexts/VotingContext.tsx
   ```

3. Restart your Next.js dev server

### 6. Verify Everything Works

1. The app should now be fetching data from Convex
2. Voting should persist across page refreshes
3. Check the Convex dashboard to see your data

## File Structure

### Convex Files Created:
- `convex/schema.ts` - Database schema definitions
- `convex/posts.ts` - Post-related queries and mutations
- `convex/votes.ts` - Voting functionality
- `convex/comments.ts` - Comment functionality
- `convex/seed.ts` - Database seeding function
- `convex.json` - Convex configuration

### React Components Updated:
- `src/components/ConvexClientProvider.tsx` - Convex React provider
- `src/app/page-convex.tsx` - Main page using Convex
- `src/app/post/[id]/page-convex.tsx` - Post detail page using Convex
- `src/contexts/VotingContext-convex.tsx` - Voting context using Convex

## Troubleshooting

### If you get a "CONVEX_URL not defined" error:
- Make sure `.env.local` has the correct URL
- Restart your Next.js dev server after adding the environment variable

### If data doesn't appear:
- Check that `npm run convex` is running
- Run the seed function from the Convex dashboard
- Check the browser console for errors

### To reset the database:
1. Go to the Convex dashboard
2. Navigate to "Data" tab
3. Delete all records from tables
4. Re-run the seed function