# CLAUDE.md

## Project Overview

**reformpaonia.co** -- a wiki-powered civic transparency site for Paonia, Colorado. The 60+ page wiki in `wiki/` is the knowledge base; the site curates what surfaces from it; the full wiki is browsable for transparency. Community interaction (voting, comments, CORA tracking) uses Convex + Clerk auth.

## Tech Stack

- **Framework:** Next.js 15 (App Router, React 19)
- **Runtime:** Cloudflare Workers (via OpenNext)
- **Database:** Convex (real-time)
- **Auth:** Clerk
- **Styling:** Tailwind CSS 4 + inline styles (brutalist Courier Prime aesthetic)
- **Content:** Markdown wiki with YAML frontmatter, compiled at build time by `src/lib/wiki.ts`

## Development Commands

```bash
npm run dev          # Dev server (Turbopack)
npm run build        # Production build
npm run convex       # Convex dev server (separate terminal)
npm run worker:build # Build for Cloudflare Workers
npm run deploy       # Deploy to Cloudflare Workers
```

## Architecture

### Wiki (`wiki/`)

60+ markdown files with YAML frontmatter organized by type:
- `wiki/people/` -- elected officials and town staff
- `wiki/events/` -- board meetings, key dates
- `wiki/issues/` -- ongoing governance concerns (some tagged `initiative`)
- `wiki/sources/` -- ingested documents, letters, transcripts
- `wiki/analysis/` -- cross-cutting patterns, timelines
- `wiki/open-questions/` -- unanswered questions with CORA templates

Frontmatter format:
```yaml
---
title: Page Title
type: person | event | issue | source | analysis | open-question
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: [relevant, tags]
sources: [slug-references-to-source-pages]
---
```

Wikilinks: `[[slug]]` or `[[slug|display text]]` resolved at build time to site routes.

### Wiki Compiler (`src/lib/wiki.ts`)

Build-time data layer. Reads all wiki files, parses frontmatter (gray-matter), resolves wikilinks, builds backlinks. Key exports: `getAllPages()`, `getPagesByDirectory()`, `getPage()`, `getStoryPages()`, `getInitiativePages()`, `getActionPages()`.

### Routes

```
/                         Curated homepage (initiatives, events, analysis, actions)
/stories                  Wiki-derived story feed with voting
/initiatives              Initiative listing
/initiatives/[slug]       Initiative detail + support/oppose voting + comments
/articles/[slug]          Analysis pages as articles + voting + comments
/actions                  Open questions listing
/actions/[slug]           CORA action detail + interest tracking + comments
/timeline                 Master timeline from wiki
/wiki                     Full wiki index by category
/wiki/[category]/[slug]   Individual wiki page + comments
/about                    Site explanation
/sign-in, /sign-up       Clerk auth
```

### Components

**Server:** `SiteHeader`, `SiteFooter`, `WikiContent` (react-markdown), `Breadcrumb`, `BacklinksSection`
**Client ('use client'):** `PageVoting`, `CommentSection`, `InitiativeVoting`, `CoraInterest`
**Providers:** `ClerkClientProvider`, `ConvexClientProvider`

### Convex (`convex/`)

**Active tables:** `users`, `pageVotes`, `pageComments`, `coraTracking`, `initiativeVotes`, `initiativeComments`, `feedback`
**Legacy tables (data preserved):** `posts`, `votes`, `bombs`, `comments`

Key function files: `pageVotes.ts`, `pageComments.ts`, `coraTracking.ts`, `initiativeVotes.ts`, `initiativeComments.ts`, `users.ts`, `http.ts` (Clerk webhook)

### Auth

Clerk handles sign-in/sign-up. No protected routes -- all auth-gated actions happen in Convex mutations. Middleware is Clerk session detection only.

## Adding a Wiki Page

1. Create `wiki/[directory]/[slug].md` with frontmatter
2. Use `[[existing-slug]]` for wikilinks
3. Backlinks auto-generated at build time
4. If adding a new open-question, it appears in /actions automatically
5. Issues tagged `initiative` appear on /initiatives

## Deployment

Cloudflare Workers via GitHub Actions on push to `main`. Manual: `npm run worker:build && npm run deploy`.

Env vars: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `CONVEX_DEPLOYMENT`, `NEXT_PUBLIC_CONVEX_URL`, `NEXT_PUBLIC_BASE_URL`, `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `CLERK_WEBHOOK_SECRET`
