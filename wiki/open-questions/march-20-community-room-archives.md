---
title: Why Were Four Community Room Archives Created on March 20-21, 2026?
type: open-question
created: 2026-04-08
updated: 2026-04-08
tags: [surveillance, verkada, cameras, cora, audit-log, archives]
sources: [cora-c26-09-verkada-audit-logs, verkada-usage-patterns]
---

# Why Were Four Community Room Archives Created on March 20-21, 2026?

**Question:** What was the stated operational or investigatory purpose of the four permanent archives of the Community Room camera created by Assistant Town Clerk Ruben Santiago on Friday 2026-03-20 and Saturday 2026-03-21?

## What the Record Shows

The [[cora-c26-09-verkada-audit-logs|CORA C 26-09 audit log export]] shows the following sequence of actions by [[ruben-santiago|Ruben Santiago]] on the Community Room camera:

**Friday 2026-03-20 (afternoon):**

```
14:41:44 MDT  Live Stream Started
14:41:46 MDT  Live Stream Started
14:42:16 MDT  Camera Audio Changed
14:45:34 MDT  Archive Action Taken      [archive #1]
15:18:37 MDT  Camera Audio Changed
15:18:58 MDT  Video History Streamed
15:19:37 MDT  Camera Audio Changed
15:19:44 MDT  Archive Action Taken      [archive #2]
15:24:53 MDT  Video History Streamed
15:36:08 MDT  Archive Action Taken      [archive #3]
15:36:19 MDT  Video History Streamed
15:53:59 MDT  Video History Streamed
```

**Saturday 2026-03-21 (late morning):**

```
11:51:54 MDT  Live Stream Started
11:51:58 MDT  Live Stream Started
11:52:03 MDT  Archive Action Taken      [archive #4]
11:52:03 MDT  Video History Streamed
```

Archive Action Taken events permanently save specific footage clips beyond the 30-day retention window. The four archives from this sequence still exist in the Town's Verkada account. Each archive carries metadata including a name, description, case number, tags, creating user, creation timestamp, camera(s) included, time window covered, sharing history, and download history.

## Context

- The Community Room is Town Hall's meeting space, where the Board of Trustees, Planning Commission, and public committees hold meetings and where citizens make public comment.
- Friday 2026-03-20 and Saturday 2026-03-21 are not days on which the Board of Trustees or Planning Commission hold regular meetings.
- These archives were created 9 and 10 days before the [[2026-03-30-special-meeting|March 30, 2026 special meeting]] where the Board issued its response to the [[ten-things-flyer|10 Things flyer]].
- The archives were created 5 and 6 days before [[stefen-wynn|Wynn]] accessed the Verkada audit log on 2026-03-26.
- The associated archive metadata was not produced in the CORA response despite the original request seeking "access logs for all Verkada cameras showing who viewed feeds, dates/times, **and purpose**" ([[cora-c26-09-verkada-audit-logs|source]]).

## What Public Information Could Answer It

1. **Archive metadata from the Verkada Command "Archives" page.** Verkada provides this as a standard exportable list including every archive's name, description, case number, tags, creator, creation timestamp, camera(s), time window, sharing history, and download history.

2. **The archive files themselves.** Copies of the four Community Room archives would show exactly what footage was preserved.

3. **Town Hall usage records for 2026-03-20 and 2026-03-21.** Any record of a meeting, CORA inspection, work session, committee meeting, or rental of the Community Room during these specific windows.

4. **Communications between [[ruben-santiago|Santiago]], [[samira-vetter|Vetter]], [[stefen-wynn|Wynn]], or Police Chief Laiminger referencing the archives** or any incident justifying the archives.

## Suggested CORA Requests

### Request 1: Complete Verkada archive metadata export

> Under C.R.S. 24-72-201 et seq., I request a complete export of the Town's Verkada Archives list from installation (October 22, 2025) to the date of this request, including for each archive: archive name, description or notes field, case number field, tags, creating user, creation timestamp, camera(s) included, time window covered (start and end timestamps), sharing history, download history, and retention setting. This metadata is produced in Verkada Command via the Archives page export function.
>
> For any archive withheld in whole or in part, please provide a written statement per C.R.S. 24-72-204(3)(a) identifying: (a) the archive name, (b) the specific statutory exemption invoked, (c) if the Colorado Criminal Justice Records Act (C.R.S. 24-72-305) is invoked, the specific case number, agency pursuing the investigation, and custodial determination that disclosure is contrary to the public interest, and (d) whether any non-exempt portions can be severed and produced.

### Request 2: Specific Community Room and Front Desk archives

> Under C.R.S. 24-72-201 et seq., I request copies of the following specific archives identified in the audit log produced in CORA C 26-09:
>
> - All archives of the **Community Room** camera created by Ruben Santiago between March 20 and March 21, 2026
> - All archives of the **Front Desk** camera created by Ruben Santiago on January 30, 2026, February 27, 2026, and March 11, 2026
> - All archives of the **Stage** camera created by Matt Laiminger on March 24, 2026
>
> For each archive, please also provide the associated archive name, description, case number, and any written justification for the archive's creation.

### Request 3: Town Hall Community Room usage on specific dates

> Under C.R.S. 24-72-201 et seq., I request any records documenting use of the Town Hall Community Room on March 20 and March 21, 2026, including but not limited to: meeting calendars, room reservation records, public meeting agendas, private meeting records, CORA record inspection logs, and any staff records of who was present in the room during these dates.

## Other Ways to Get Answers

- Ask at a board meeting during public comment: "What was the purpose of the four Community Room camera archives created by the Assistant Town Clerk on the weekend of March 20-21, 2026, and does the Town have a written policy requiring that camera archives be documented with a reason for their creation?"
- Request the topic be placed on a future board meeting agenda for discussion
- Inspect the archives in person if the Town will not produce copies (CORA inspection is a separate right from copying)

## Status

**Open.** The CORA response for C 26-09 documents that the archives exist but does not produce their metadata or content. The "purpose" field explicitly requested in the original CORA was not provided.

## See Also

- [[cora-c26-09-verkada-audit-logs]]
- [[verkada-usage-patterns]]
- [[ruben-santiago]]
- [[samira-vetter]]
- [[surveillance]]
- [[verkada-approval-process]]
- [[public-records-access]]
