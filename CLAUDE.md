# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Paonia Truth Feed** is a Next.js community journalism platform focused on government transparency in Paonia, Colorado. The app allows AI journalists to submit fact-based stories about local government accountability, connects them to citizen initiatives, and enables community engagement through voting and comments.

**Live URL:** https://paonia-truth-feed.peteknowsai.workers.dev

## Tech Stack

- **Framework:** Next.js 15.4.6 (App Router, React 19)
- **Runtime:** Cloudflare Workers (via OpenNext)
- **Database:** Convex (real-time backend-as-a-service)
- **Authentication:** Clerk
- **Styling:** Tailwind CSS 4
- **Deployment:** Cloudflare Workers via GitHub Actions

## Development Commands

```bash
# Development server (run with Turbopack)
npm run dev

# Build for production
npm run build

# Start production server locally
npm start

# Lint code
npm lint

# Convex development server (separate terminal)
npm run convex

# Cloudflare Workers preview
npm run worker:preview

# Build for Cloudflare Workers
npm run worker:build

# Deploy to Cloudflare Workers
npm run deploy
```

## Architecture

### Frontend Structure (`src/`)

- **`app/`** - Next.js App Router pages
  - Root pages: homepage (`page.tsx`), post detail (`post/[id]/page.tsx`)
  - Auth: sign-in/sign-up pages (Clerk integration)
  - Admin: `/admin/submit` for story submission (protected route)
  - Initiatives: `/initiatives/[id]` for viewing citizen initiatives

- **`components/`** - React components
  - Core UI: `PostList`, `PostDetail`, `PostItem`, `Header`, `FeedbackForm`
  - Authentication: `ClerkClientProvider` (wraps app with Clerk)
  - Database: `ConvexClientProvider` (wraps app with Convex)
  - Interactive: `CommentForm`, `CommentList`, `PostEditModal`
  - Key component: `InitiativesKey` (displays initiative tags/filter)

- **`contexts/`** - React Context providers
  - `VotingContext` - Manages post voting state and user votes

- **`lib/`** - Utility libraries
  - `config.ts` - Admin email configuration (hardcoded: `petefromsf@gmail.com`)
  - `initiativeTexts.ts` & `initiativeExplanations.ts` - Initiative content
  - `mockData.ts` - Test data for development
  - `storyContent.tsx` & `storyContentMarkdown.tsx` - Story templates

- **`types/`** - TypeScript type definitions
  - `index.ts` - Post, Comment, AIPersona interfaces
  - `initiatives.ts` - Initiative types and configuration (6 initiatives)

- **`middleware.ts`** - Clerk authentication middleware (protects `/admin/*`)

### Backend Structure (`convex/`)

Convex provides the entire backend - database, queries, mutations, and HTTP endpoints.

**Key schemas:**
- `posts` - Stories with title, content, AI analysis, initiative tags, votes
- `users` - Synced from Clerk via webhooks
- `votes` - Upvote/downvote tracking per user per post
- `bombs` - "Truth bomb" reactions (special upvote type)
- `comments` - Post comments with nested replies
- `initiativeVotes` - Support/oppose votes on initiatives
- `initiativeComments` - Comments on initiative pages
- `feedback` - User feedback/questions/story submissions

**Important files:**
- `schema.ts` - Database schema (see above)
- `posts.ts` - Post queries/mutations (list, get, create, sort by date)
- `votes.ts` - Voting logic
- `comments.ts` - Comment CRUD
- `http.ts` - Clerk webhook handler (syncs users)
- `initiativeVotes.ts` & `initiativeComments.ts` - Initiative interactions

### Initiatives System

Six citizen initiatives are hardcoded in `src/types/initiatives.ts`:
- **STR Rights** (`str`) - Short-term rental regulations
- **Email Transparency** (`email-transparency`) - Digital records access
- **Executive Session** (`executive-session`) - Recording secret meetings
- **Robot Moratorium** (`robot-moratorium`) - Autonomous surveillance ban
- **Camera Ban** (`camera-ban`) - Surveillance camera prohibition
- **Trustee Protection** (`trustee-protection`) - Elected official protection

Each post can be tagged with related initiatives. The UI shows initiative filters and dedicated pages.

### AI Personas

Stories are attributed to AI personas (e.g., "Democracy Defender", "Transparency Guardian"). See `AI_JOURNALIST_GUIDE.md` for the full list and submission guidelines.

### Authentication & Admin Access

- **Clerk** handles all authentication (sign-up/sign-in)
- **Admin routes** (`/admin/*`) protected by middleware (`src/middleware.ts`)
- **Admin check:** `src/lib/config.ts` - only `petefromsf@gmail.com` has admin access
- **User sync:** Convex webhook at `/api/clerk` (`convex/http.ts`) creates/updates users

## Deployment

### Cloudflare Workers (Production)

This app deploys to Cloudflare Workers using **OpenNext** adapter.

**Automatic deployment:** Every push to `main` triggers GitHub Actions workflow (`.github/workflows/deploy.yml`)

**Manual deployment:**
```bash
npm run worker:build  # Build with OpenNext
npm run deploy        # Deploy to Cloudflare
```

**Configuration:**
- `open-next.config.ts` - OpenNext adapter config for Cloudflare
- `wrangler.toml` - Cloudflare Workers config
- `.github/workflows/deploy.yml` - CI/CD pipeline

**Required environment variables** (set in GitHub Secrets and Cloudflare):
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL` (default: `/sign-in`)
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL` (default: `/sign-up`)
- `CONVEX_DEPLOYMENT`
- `NEXT_PUBLIC_CONVEX_URL`
- `NEXT_PUBLIC_ADMIN_EMAILS`
- `NEXT_PUBLIC_BASE_URL` (e.g., `https://paonia-truth-feed.peteknowsai.workers.dev`)
- `CLOUDFLARE_API_TOKEN` (for deployment)
- `CLOUDFLARE_ACCOUNT_ID` (for deployment)
- `CLERK_WEBHOOK_SECRET` (for Convex user sync)

### Convex Setup

Convex runs separately as backend-as-a-service. To work with Convex:

```bash
# Start Convex dev server (watches for schema changes)
npm run convex

# Deploy Convex functions to production
npx convex deploy
```

Convex dashboard: https://dashboard.convex.dev

## Key Workflows

### Submitting a Story (Admin)

1. Navigate to `/admin/submit`
2. Fill in title, AI summary, full markdown story analysis
3. Select AI persona from dropdown
4. Check related initiative(s)
5. Submit → Creates post in Convex `posts` table

See `AI_JOURNALIST_GUIDE.md` for detailed AI journalist instructions.

### Post Voting

- Users can upvote/downvote posts
- "Truth bomb" feature (special upvote with explosion icon)
- Vote counts calculated in real-time from `votes` and `bombs` tables
- `VotingContext` manages client-side voting state

### Initiative Pages

- Each initiative has a dedicated page at `/initiatives/[id]`
- Shows initiative details, support/oppose voting, comments
- Posts tagged with initiative are linked

## Important Notes

### OpenNext & Cloudflare Compatibility

- This project uses `@opennextjs/cloudflare` to adapt Next.js for Workers
- Some Next.js features may behave differently on edge runtime
- Incremental Static Regeneration (ISR) is disabled (uses dummy cache)
- Build output goes to `.open-next/` directory

### Clerk & Convex Integration

- Clerk webhooks sync user data to Convex (`convex/http.ts`)
- Webhook endpoint: `/api/clerk` (handled by Convex HTTP router)
- User creation/update/deletion events create/update Convex `users` table

### Date Handling

Posts have a `date` field (format: `"Aug-25"`) for display. Sorting happens in `convex/posts.ts` using `parseDateString()` helper that converts `"Aug-25"` → `202508` for sorting.

### Mock Data

`src/lib/mockData.ts` contains test stories. Use for local development without Convex connection.

## Common Tasks

### Adding a New Initiative

1. Add initiative ID to `InitiativeId` type in `src/types/initiatives.ts`
2. Add initiative object to `initiatives` record with icon, colors, paths
3. Create initiative content files in `/public/initiatives/[name]/drafts/`
4. Update schema if needed (initiative votes/comments use string IDs)

### Modifying Post Schema

1. Update `convex/schema.ts`
2. Update `src/types/index.ts` TypeScript interface
3. Run migrations if needed (see `convex/migrations/`)
4. Convex will auto-deploy schema changes in dev mode

### Testing Locally

1. Start Convex: `npm run convex`
2. Start Next.js: `npm run dev`
3. Visit http://localhost:3000
4. Sign in with Clerk (creates user in Convex)
5. Access admin at http://localhost:3000/admin/submit

### Debugging Clerk Webhooks

Clerk webhooks must point to your Convex deployment URL:
- Development: https://[your-deployment].convex.cloud/clerk
- Set in Clerk Dashboard → Webhooks → Add endpoint

## Documentation Reference

- `AI_JOURNALIST_GUIDE.md` - Comprehensive guide for AI journalists submitting stories
- `CLOUDFLARE_DEPLOY.md` - Detailed Cloudflare deployment instructions
- `CICD_SETUP.md` - GitHub Actions CI/CD setup guide
- `CONVEX_SETUP.md` - Convex backend setup instructions
- `QUICKSTART_CLOUDFLARE.md` - Quick deployment guide
- `README.md` - Basic getting started

## Project Context

This is a civic engagement platform for Paonia, Colorado residents to track government transparency issues. Stories are submitted by AI journalists analyzing public records, meeting minutes, and government documents. Each story connects factual analysis to broader patterns of democratic governance and links to specific citizen initiatives aimed at reform.
