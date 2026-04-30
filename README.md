# paoniatruth.site

A civic transparency project for the Town of Paonia, Colorado. The 60+ page wiki under `wiki/` is the knowledge base; the receipts under `raw/` are the source documents. Both are exposed as a Next.js site at **[paoniatruth.site](https://paoniatruth.site)**.

## Why this exists

Paonia is a town of ~1,600 people in western Colorado where most public records, board meeting transcripts, and CORA productions sit in PDFs nobody reads. This project pulls the records, publishes the receipts, writes up the analysis, and lets neighbors vote, comment, and submit follow-up CORA requests through the site.

The repo is the working draft. Every clerk rejection letter, every CORA Excel export, every meeting transcript, every email exchange with the Town, every analytical write-up — it all lives in this tree, in version control. The site curates what surfaces; the repo lets you trace every claim back to its source.

If you want to fork it for your town, please do.

## What's actually in here

### The investigation

```
wiki/
├── people/          # elected officials and town staff
├── events/          # board meetings, key dates
├── issues/          # ongoing governance concerns
├── sources/         # ingested documents, letters, transcripts
├── analysis/        # cross-cutting patterns and timelines
└── open-questions/  # unanswered questions with CORA templates

raw/
├── correspondence/  # emails to/from the Town
├── documents/       # CORA responses, board packets, agendas
├── meeting-agendas/ # scraped from townofpaonia.colorado.gov
├── transcripts/     # YouTube auto-captions of every public meeting since 2020
└── INBOX.md         # daily-ingest output before triage
```

Wiki pages link with `[[slug]]` markdown wikilinks. Backlinks compute at build time and render on every page. Pages declare type, tags, and source references in YAML frontmatter — that's how `/initiatives`, `/actions`, and `/timeline` find what to display.

### The site

A Next.js 15 + React 19 app on Cloudflare Workers (via OpenNext), with Convex for real-time voting/comments and Clerk for auth.

```
src/
├── app/             # routes
├── components/      # SiteHeader, WikiContent, PageVoting, CommentSection, etc.
└── lib/wiki.ts      # build-time markdown compiler + wikilink resolver

convex/              # voting, comments, CORA tracking, auth-gated mutations
```

Routes:
- `/` — curated homepage (initiatives, events, analysis, actions)
- `/wiki` and `/wiki/[category]/[slug]` — full wiki, browseable
- `/initiatives/[slug]` — citizen-initiative pages with support/oppose voting
- `/articles/[slug]` — analysis pages with voting + comments
- `/actions/[slug]` — open questions with CORA-tracking interest counts
- `/timeline` — auto-generated from event frontmatter

### The pipeline

A daily-ingest pipeline runs every 4 hours and:
- Polls Town meeting agendas, CORA portal updates, and Gmail for civic correspondence
- Auto-captions new YouTube board meeting recordings (yt-dlp + VTT dedup)
- Runs a structured summarizer over fresh material
- Pushes the day's findings to a per-day inbox branch (`inbox/YYYY-MM-DD`)

It's orchestrated by [Claude Code](https://claude.com/claude-code) agents defined in `.claude/agents/` and `.claude/commands/daily-ingest.md`.

## Tech stack

- **Next.js 15 / React 19** (App Router, Server Components, Turbopack dev)
- **Cloudflare Workers** via OpenNext (effectively zero hosting cost)
- **Convex** for the real-time tier (voting, comments, CORA tracking)
- **Clerk** for auth (no protected routes; auth gates Convex mutations)
- **Tailwind CSS 4** + Courier Prime — brutalist civic-document aesthetic
- **gray-matter** + custom `src/lib/wiki.ts` markdown compiler
- Daily-ingest pipeline in Bash + Python, orchestrated by Claude agents

## Local development

Prereqs: Node 20+, a Convex deployment, a Clerk app.

```bash
npm install
cp .env.example .env.local       # fill CONVEX, CLERK, BASE_URL
npm run convex                   # terminal 1
npm run dev                      # terminal 2 (Turbopack)
```

Build & deploy:

```bash
npm run worker:build
npm run deploy                   # wrangler to Cloudflare Workers
```

GitHub Actions deploys on push to `main` (when CI is healthy; manual deploy otherwise — see `CLAUDE.md`).

## Adding a wiki page

```yaml
---
title: Page Title
type: person | event | issue | source | analysis | open-question
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: [relevant, tags]
sources: [other-page-slugs]
---

Page body in markdown. Use [[slug]] for wikilinks
or [[slug|display text]] for renamed links.
```

- Issues tagged `initiative` appear at `/initiatives`.
- New `open-question` pages auto-appear at `/actions`.
- Backlinks render automatically on the next build.

## Why the source documents are in version control

If `wiki/` and `raw/` live on a public repo, then:
- Every claim on the site can be traced to the underlying record.
- Every CORA production lives forever, even after the Town's portal rotates them out.
- Every meeting transcript stays searchable, including the ones the Town has since taken offline.
- A neighbor with a similar fight in their own town can fork it and start with a working template.

That is the point.

## Author

Pete McCarthy — [petefromsf@gmail.com](mailto:petefromsf@gmail.com) — resident of Paonia, CO. Not affiliated with the Town of Paonia, any media outlet, or any political committee. Source documents are public records; analysis pages reflect my reading of those records and are not legal advice.
