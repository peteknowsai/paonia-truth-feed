---
title: "Wynn Memorandum: Verification and Clarification of Claims Regarding the Verkada Security Camera Systems"
type: source
created: 2026-04-15
updated: 2026-04-15
tags: [verkada, surveillance, wynn, rebuttal, cameras, facial-recognition, memo]
sources: [cora-c26-09-verkada-audit-logs, final-published-letter, facial-recognition-proof]
---

# Wynn Memorandum: Verification and Clarification of Claims Regarding the Verkada Security Camera Systems

**Raw file:** `raw/documents/their-responses/wynn-verkada-memo-2026-04-14.md` (full transcription from screenshots)
**Type:** Internal memorandum, submitted to the Board of Trustees at a public meeting
**Date:** 2026-04-14
**Author:** [[stefen-wynn|Stefen Wynn]], Town Administrator & Treasurer
**Addressed to:** Mayor & Board of Trustees
**Presented at:** April 14, 2026 Regular Board Meeting, agenda item G.1 (Review and Discussion of Draft Ordinance for Regulation of Security Cameras)

## Summary

A seven-page written rebuttal submitted by Town Administrator Stefen Wynn responding to public claims about the Verkada security camera system, most of which were based on records produced in [[cora-c26-09-verkada-audit-logs|CORA C 26-09]]. Delivered during discussion of the draft security-camera ordinance brought by Trustees Hunter and Mejorado.

The memo takes positions on five claim categories, provides screenshots of Verkada documentation and the Feature Manager page, and concludes by endorsing adoption of the ordinance as "appropriate, prudent, and I highly encourage adopting."

## Key Positions

1. **Facial recognition is "disabled."** Wynn states he "personally reviewed the Verkada administrator dashboard" on April 14, 2026 and that the People History feature and associated advanced analytics "were disabled." He explicitly does **not** address whether these features were enabled at any prior time.

2. **"Two isolated audit log entries"** — Wynn characterizes the POI-related activity as "Two isolated audit log entries out of 32,339 separate log entries, referencing a 'person_of_interests_id'" that "appear to coincide with system installation and testing in October 2025." See [[wynn-memo-vs-audit-log]] for the actual event counts, which are materially different.

3. **Log volume defense.** Claims that each login, camera selection, or page refresh generates a separate log entry, so aggregate counts overstate activity.

4. **Community Room camera operationally justified** for meeting-minutes clarification, facility rental monitoring, cleaning verification, and vandalism/theft protection.

5. **No hostile work environment surveillance** documented in the records.

6. **Endorses the ordinance.** Notable pivot: Wynn publicly supports adoption of the draft ordinance brought by Trustees Hunter and Mejorado as a means of "promoting transparency, accountability, and public trust."

## Rhetorical Pattern

The memo is written in hedged first-person: "It is my belief," "In my professional judgment," "To the best of my knowledge." These are not sworn representations and are not verifiable by any external record cited in the memo itself.

The memo cites two evidentiary sources: (a) the CORA C 26-09 audit log (the same source as the citizen claims it rebuts), and (b) Wynn's own review of the Verkada admin dashboard on April 14, 2026. Both screenshots included in the memo depict Verkada documentation and the Feature Manager settings page as seen by Wynn on April 14, 2026. No prior-state screenshots are provided.

## What the Memo Does Not Address

- The `IDENTITY_LIST` event (114 occurrences in the produced log), which Verkada logs when a user opens the face identity database surface.
- The `ANALYTICS_DASHBOARD_CREATED` / `_MODIFIED` events that produced "Ruben's Dashboard" on October 22-23, 2025.
- The `ALERT_RULE_CREATED` / `_UPDATED` events that produced the "Crowd Out Front" alert rule with 24/7 SMS/email/push notifications.
- The `ARCHIVE_START` event of October 23, 2025 by Police Chief Laiminger, labeled "Ballot Box Observation Footage" with the `"Blurred Faces"` tag.
- Whether the [[final-published-letter|March 30, 2026 board letter]] statement that the cameras "are not face recognition, or private property surveillance apparatus" was accurate at the time it was published.
- The time window between March 27, 2026 (the last date covered by the produced audit log) and April 14, 2026 (the date of Wynn's dashboard review).
- The redaction of internal Verkada user IDs alongside user names and emails remaining unredacted, inconsistent with a narrow phishing/security rationale.

## See Also

- [[wynn-memo-vs-audit-log]] — Point-by-point comparison of the memo's claims against the audit log
- [[factual-corrections-2026-04-15]] — Pete McCarthy's one-page written response filed 2026-04-15
- [[cora-c26-09-verkada-audit-logs]] — Source CORA response
- [[facial-recognition-proof]] — Prior analysis of the facial recognition evidence
- [[final-published-letter]] — The March 30 board letter containing the "not face recognition" statement
- [[verkada-usage-patterns]] — Usage pattern analysis
- [[stefen-wynn]]
- [[2026-04-14-regular-board-meeting]]
