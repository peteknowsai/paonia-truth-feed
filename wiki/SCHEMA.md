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

Cross-cutting pages that synthesize across multiple sources and generate new understanding. Named descriptively: `surveillance-procurement-timeline.md`, `initiative-rejection-pattern.md`, `water-infrastructure-spending.md`.

Analysis pages are where the wiki *thinks*, not just remembers. They serve two purposes:

**Factual reconstructions:** "Here is what the record shows, in order, with citations." Timelines, comparisons, side-by-side analyses.

**Emergent insights:** Connections between facts that no single source contains. "The town's response to citizen complaints follows the same pattern as its response to CORA requests: delay, deflect, and recharacterize the request." These insights should emerge naturally from the accumulated record and be stated neutrally with citations.

Include:
- What the record shows (chronological or thematic)
- Source citations for every claim
- Where the record is incomplete (link to relevant open questions)
- **What this connects to** -- how this analysis relates to other patterns in the wiki
- **What would change this analysis** -- what new information could strengthen, weaken, or overturn the finding

**Analysis pages are living documents.** After every ingest, the LLM should revisit relevant analysis pages and ask: "Does this new source change, strengthen, or challenge any existing analysis?" If so, update the page. If a new cross-cutting insight has emerged that didn't exist before, create a new analysis page.

### Open Questions (`open-questions/`)

Gaps in the public record that a reasonable citizen might want answered. Named descriptively: `verkada-approval-process.md`, `water-rate-projections.md`.

Include:
- The question, stated plainly
- What the existing record shows (and doesn't show)
- What public information could answer it
- **Suggested CORA requests** -- specific, actionable records requests that could fill the gap, with enough detail that a citizen could submit them. Include: what records to request, from whom, the relevant date range, and the specific CORA citation (C.R.S. 24-72-201 et seq.)
- **Other ways to get answers** -- board meeting public comment, budget hearings, direct questions to trustees
- Status: open, partially answered, resolved

These aren't accusations. "How was the Verkada purchase approved?" is a legitimate civic question regardless of the answer. The CORA suggestions make the questions actionable, not just rhetorical.

The wiki should actively generate new open questions as sources accumulate. After every ingest, ask: "What does the record not explain? What would a resident reading this want to know next?"

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

**10. Revisit analysis pages** -- for every analysis page that touches the same issues, ask: does this new source change, strengthen, or challenge the existing analysis? Update if so.
**11. Generate new questions** -- ask: what does this source leave unexplained? What would a citizen reading this want to know next? Create new open question pages with CORA suggestions.

**Adapt to source type:**
- Short documents (letters, posts, filings): full ingest in one pass.
- Meeting transcripts: summarize by agenda item, pull key quotes and votes, note timestamps.
- Court filing collections: process as a case, not individual documents. Build a litigation timeline.
- Budget documents: extract specific line items, compare across fiscal years, note changes in fund balances, staffing levels, and debt obligations. Update spending-related issue pages.
- Batch ingest: when processing many related documents at once, do entity/issue updates after all source pages are created to avoid redundant edits.

### Query

When Pete asks a question:

1. Read `index.md` to find relevant pages.
2. Read those pages and follow cross-references.
3. Answer with citations to wiki pages and underlying sources.
4. If the answer reveals a gap, note it and suggest whether it warrants an open question page.
5. If the answer produces something worth keeping (a timeline, a comparison, a reconstruction), offer to file it in `analysis/`.

### Reflect

Periodic synthesis. The wiki's most valuable output. Ask after every few ingests, or when the wiki reaches a new threshold of accumulated knowledge:

1. **New connections** -- what patterns have emerged that no existing analysis page captures? What connects issues that are currently siloed?
2. **Strengthened or weakened claims** -- which analysis pages are now better supported? Which have been challenged by new evidence?
3. **New questions** -- what does the accumulated record now make you curious about that you weren't before? What CORA requests would be most revealing?
4. **Narrative threads** -- what story is the record telling that a citizen new to all of this would want to understand? Is there an analysis page that would help them see it?
5. **The "so what"** -- for each open question, ask: if we got the answer, what would it change? Prioritize the questions whose answers would matter most.

The goal is not to editorialize. It is to let the facts generate their own momentum. If the record shows something, the wiki should help people see it. If the record has gaps, the wiki should help people know what to ask for.

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

## Source Monitoring

The wiki is fed by automated source watchers that check for new public documents and news articles. New items are queued in `raw/INBOX.md` for manual ingest.

### CivicClerk API (Town Meeting Portal)

The town uses CivicClerk for agendas, minutes, and meeting media. No authentication required.

**Base URL:** `https://paoniaco.api.civicclerk.com/v1/`

**List events (meetings):**
```
GET /Events?$filter=startDateTime+ge+{DATE}&$orderby=startDateTime+asc
```
Returns JSON with meeting dates, names, YouTube links, and `publishedFiles` array containing file IDs, names, types, and publish dates.

**Download meeting files (agenda, packet, minutes):**
```
GET /Meetings/GetMeetingFileStream(fileId={ID},plainText=false)
```
Returns the PDF directly. File IDs come from the `publishedFiles` array on each event.

**Event categories:**
```
GET /EventCategories
```

**YouTube channel for meeting videos:**
`https://www.youtube.com/channel/UC2mZDPKrwEAf5T-x3Camtow`

### News Sources

- **Delta County Independent**: `deltacountyindependent.com/news/north-fork/` (primary Paonia government coverage, reporter Justin Shaw)
- **High Country Spotlight**: `highcountryspotlight.com/local_news/`
- **KVNF**: `kvnf.org` (community radio, less frequent government coverage)

### Daily Watcher Loop

A `/loop` runs daily at 3:17 AM checking all sources above. New items are appended to `raw/INBOX.md`. Articles are downloaded to `raw/articles/`. The loop does not ingest into the wiki; it only queues items for review.

## Relationship to Other Project Layers

```
raw/       Immutable source documents. The LLM reads, never modifies.
wiki/      Structured civic record. The LLM writes and maintains.
stories/   Published narratives for the truth feed app. Informed by the wiki.
```

The wiki is the knowledge layer. Stories draw from it but add editorial voice and narrative structure. The wiki stays neutral so the stories don't have to pretend to be.
