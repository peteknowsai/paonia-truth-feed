---
title: "Factual Corrections to the Administrator's April 14, 2026 Memorandum"
type: source
created: 2026-04-15
updated: 2026-04-15
tags: [verkada, surveillance, rebuttal, mccarthy, cora, facial-recognition]
sources: [wynn-verkada-memo-2026-04-14, cora-c26-09-verkada-audit-logs, facial-recognition-proof]
---

# Factual Corrections to the Administrator's April 14, 2026 Memorandum

**Raw file:** `raw/documents/board-complaint/factual-corrections-2026-04-15.md`
**Type:** Written citizen correction filed with the Board of Trustees
**Date:** 2026-04-15
**Author:** Pete McCarthy

## Summary

One-page written response from Pete McCarthy to the Board of Trustees correcting factual statements in the [[wynn-verkada-memo-2026-04-14|April 14, 2026 memorandum]] submitted by Town Administrator Stefen Wynn.

The corrections cite event codes and row counts directly from the [[cora-c26-09-verkada-audit-logs|CORA C 26-09 audit log]] the Town itself produced. The document does not allege misconduct. It asks the Board to request a written clarification from the Administrator, direct the Clerk to produce the post-March 26 audit log, and address whether the [[final-published-letter|March 30 board letter]] was accurate at the time it was published.

## Corrections Documented

1. The memorandum's "two isolated audit log entries" count is contradicted by 130 events across eight event codes related to People Analytics, facial recognition infrastructure, and Persons of Interest.
2. The characterization of POI activity as "testing in October 2025" does not account for 100 `IDENTITY_LIST` events logged under the Police Chief's user account spanning 65 distinct days from October 22, 2025 through March 16, 2026.
3. The memorandum attests to the system's state on April 14, 2026 only, not to its prior state.
4. The "Blurred Faces" archive tag on an October 23, 2025 archive requires face detection to function, contradicting the memorandum's position that only basic people-detection was ever active.
5. The redaction pattern (internal user IDs redacted, names and emails left plain-text) is inconsistent with the stated narrow-tailoring rationale.

## Requested Board Actions

1. Written, dated response from the Administrator specifying whether FR features were ever enabled, when they were enabled and disabled, and the corresponding audit log events.
2. Production of the audit log from March 27, 2026 to present and a timestamped screenshot of current Feature Manager toggle states.
3. Board response on whether the March 30 board letter's "not face recognition" statement was accurate at publication.

## See Also

- [[wynn-verkada-memo-2026-04-14]] — The memorandum being corrected
- [[wynn-memo-vs-audit-log]] — Analysis comparing the memo to the log
- [[cora-c26-09-verkada-audit-logs]] — Source CORA response
- [[facial-recognition-proof]] — Underlying evidence
- [[final-published-letter]] — The March 30 board letter
- [[2026-04-14-regular-board-meeting]]
