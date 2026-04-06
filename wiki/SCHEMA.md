# Wiki Schema

This file governs how the LLM maintains the Paonia civic wiki. Read this before any wiki operation.

## Purpose

A community transparency record for the Town of Paonia, Colorado. The wiki organizes public information about local government -- meetings, decisions, spending, policy -- into a structured, interlinked knowledge base that any citizen could use to understand what their government is doing.

The LLM maintains the wiki. Pete curates sources and directs what gets ingested. The wiki is factual and neutral. If the facts tell a story, the facts tell it.

## Directory Structure

```
wiki/                    # LLM-maintained knowledge base (this directory)
├── SCHEMA.md            # This file -- conventions and workflows
├── index.md             # Content catalog with summaries and links
├── log.md               # Chronological record of all operations
├── people/              # Public officials, staff, and key community members
├── events/              # Meetings, votes, hearings, elections
├── issues/              # Civic issues and policy areas
├── sources/             # One summary page per ingested raw document
├── analysis/            # Timelines, comparisons, record reconstructions
├── open-questions/      # Gaps in the public record
└── assets/              # Images, diagrams

raw/                     # Immutable source documents -- never modified by LLM
├── meeting-minutes/     # Board/committee meeting transcripts
├── articles/            # News articles, opinion pieces
├── documents/           # Letters, filings, official docs, flyers
└── correspondence/      # Emails, CORA requests/responses
```

## Page Format

Every wiki page uses this structure:

```markdown
---
title: Page Title
type: person | event | issue | source | analysis | open-question
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: [relevant, tags]
sources: [links to source pages that inform this page]
---

# Page Title

Content here. Use [[wikilinks]] for cross-references to other wiki pages.
Link format: [[filename]] or [[filename|display text]]

## See Also

- Links to related pages
```

## Page Types

### People (`people/`)

Public officials, town staff, and key community figures. Named by slug: `clay-buchner.md`, `lucy-hunter.md`.

These are public servant profiles, not dossiers. Include:

- **Role and tenure**: Title, elected/appointed, term dates, committee assignments
- **Voting record**: How they voted on key issues, with dates and meeting links
- **Public statements**: What they've said on the record (meeting minutes, published letters, public filings)
- **Decisions and actions**: Official actions taken in their capacity
- **Discrepancies**: Where public statements and documented actions don't align. State both sides neutrally with citations. Let the record speak.

### Events (`events/`)

Specific occurrences with dates. Named with date prefix: `2026-03-30-special-meeting.md`.

Include:
- Date, location, type (regular meeting, special meeting, hearing, election)
- Attendees and absent members (for board meetings)
- Agenda items and what was discussed
- Motions, votes, and outcomes (record each vote by name)
- Public comment (who spoke, summary of what was said)
- Decisions made and their stated rationale
- Links to source documents (minutes, transcripts, recordings)

### Issues (`issues/`)

Civic policy areas and ongoing matters the community tracks. Named by slug: `surveillance.md`, `short-term-rentals.md`, `public-records-access.md`.

These are the topics a resident might search for to understand what's going on. Include:

- **Summary**: What this issue is about in plain language
- **Timeline**: Key developments in chronological order, with dates and source links
- **Current status**: Where things stand as of the last update
- **Key people**: Officials and staff involved, with links to their pages
- **Public process**: What public input has occurred (hearings, comment periods, votes). Also note where public process was absent if the record shows it.
- **Spending**: Any public money involved, amounts, approval process
- **Related initiatives**: Links to citizen initiatives connected to this issue
- **Documents**: Key source documents related to this issue

### Sources (`sources/`)

One page per ingested raw document. Named to match the raw file where possible.

Include:
- Link to raw file in `raw/`
- Document type, date, author or origin
- Key facts (bulleted, specific, citeable)
- Notable quotes (with enough context to be fair)
- People mentioned (with links)
- Events referenced (with links)
- Issues touched (with links)
- Discrepancies with existing wiki content (flag prominently, cite both sides)

**For meeting transcripts (SRT files):** These are large. The source page should include a structured summary: attendees, each agenda item with key discussion points, all motions and votes, and public comment. Pull direct quotes for anything significant. Note timestamps for key moments.

**For court filings:** Group related filings under the case. The source page for a case should include a litigation timeline, key claims from each side, and current status. Individual filings get subsections, not separate pages, unless a single filing is exceptionally significant.

### Analysis (`analysis/`)

Cross-cutting pages that reconstruct a record from multiple sources. Named descriptively: `surveillance-procurement-timeline.md`, `initiative-rejection-pattern.md`.

These aren't opinion pieces. They're factual reconstructions: "here is what the record shows, in order, with citations." Include:

- What the record shows (chronological or thematic)
- Source citations for every claim
- Where the record is incomplete (link to relevant open questions)

### Open Questions (`open-questions/`)

Gaps in the public record that a reasonable citizen might want answered. Named descriptively: `verkada-approval-process.md`, `executive-session-recordings.md`.

Include:
- The question, stated plainly
- What the existing record shows (and doesn't show)
- What public information could answer it (e.g., a CORA request, a board agenda item, a budget document)
- Status: open, partially answered, resolved

These aren't accusations. "How was the Verkada purchase approved?" is a legitimate civic question regardless of the answer.

## Workflows

### Ingest

When Pete adds a raw source and asks to ingest it:

1. **Read** the raw document completely.
2. **Discuss** key takeaways with Pete. Flag anything surprising, new, or that conflicts with existing wiki content.
3. **Create source page** in `sources/`.
4. **Update or create people pages** for officials and staff mentioned.
5. **Update or create event pages** for meetings, votes, or incidents.
6. **Update or create issue pages** for policy areas touched.
7. **Note discrepancies** -- if the new source conflicts with what's already in the wiki, document both versions on the relevant pages with citations.
8. **Surface open questions** -- if the source reveals gaps, create or update open question pages.
9. **Update index.md** and **append to log.md**.

**Adapt to source type:**
- Short documents (letters, posts, filings): full ingest in one pass.
- Meeting transcripts: summarize by agenda item, pull key quotes and votes, note timestamps.
- Court filing collections: process as a case, not individual documents. Build a litigation timeline.
- Batch ingest: when processing many related documents at once, do entity/issue updates after all source pages are created to avoid redundant edits.

### Query

When Pete asks a question:

1. Read `index.md` to find relevant pages.
2. Read those pages and follow cross-references.
3. Answer with citations to wiki pages and underlying sources.
4. If the answer reveals a gap, note it and suggest whether it warrants an open question page.
5. If the answer produces something worth keeping (a timeline, a comparison, a reconstruction), offer to file it in `analysis/`.

### Lint

Periodic health check:

1. **Orphans** -- pages with no inbound links.
2. **Stale pages** -- not updated despite newer sources on the same topic.
3. **Unresolved discrepancies** -- conflicts flagged but not yet investigated.
4. **Missing pages** -- people or events mentioned on other pages but lacking their own.
5. **Broken links** -- wikilinks pointing to nonexistent pages.
6. **Open questions** -- review for any that can now be answered with available sources.

Report findings. Fix with Pete's approval.

## Conventions

- **Wikilinks**: Use `[[filename]]` without directory prefix. Obsidian resolves automatically.
- **Dates**: Always absolute. `2026-03-30`, never "last Thursday."
- **Every claim needs a source**: Link to the source page. Use inline citations: `[[source-page|source]]`.
- **Neutral tone**: The wiki describes what the record shows. No editorializing, no characterizing motives, no sarcasm. If an action looks bad, the factual description is sufficient.
- **No em dashes**: Use commas, semicolons, or separate sentences.
- **Discrepancies are noted, not judged**: "The mayor stated X on [date]. The published document shows Y." Full stop.
- **Fair context for quotes**: Include enough surrounding context that the quote can't be accused of being taken out of context.
- **Update, don't duplicate**: Extend existing pages before creating new ones.
- **Public information only**: The wiki contains information from public meetings, public documents, published statements, and court records. No private communications, no off-the-record information, no speculation.

## Tags

Consistent tags across pages (expand as needed):

**Government**: `board`, `meeting`, `vote`, `executive-session`, `budget`, `spending`, `ordinance`
**Policy areas**: `surveillance`, `cameras`, `str`, `short-term-rental`, `transparency`, `public-records`, `cora`
**Process**: `initiative`, `petition`, `election`, `public-comment`, `public-notice`
**Legal**: `filing`, `complaint`, `court`, `first-amendment`
**People**: Use last names as tags: `buchner`, `smith`, `hunter`, `brunner`, `bowman`, `vetter`

## Relationship to Other Project Layers

```
raw/       Immutable source documents. The LLM reads, never modifies.
wiki/      Structured civic record. The LLM writes and maintains.
stories/   Published narratives for the truth feed app. Informed by the wiki.
```

The wiki is the knowledge layer. Stories draw from it but add editorial voice and narrative structure. The wiki stays neutral so the stories don't have to pretend to be.
