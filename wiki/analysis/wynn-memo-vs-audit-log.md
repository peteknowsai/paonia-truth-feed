---
title: "The Administrator's April 14 Memorandum Compared to the Audit Log"
type: analysis
created: 2026-04-15
updated: 2026-04-15
tags: [verkada, surveillance, wynn, facial-recognition, audit-log, fact-check, analysis]
sources: [wynn-verkada-memo-2026-04-14, cora-c26-09-verkada-audit-logs, facial-recognition-proof, final-published-letter, verkada-usage-patterns, factual-corrections-2026-04-15]
---

# The Administrator's April 14 Memorandum Compared to the Audit Log

On April 14, 2026, Town Administrator [[stefen-wynn|Stefen Wynn]] submitted a seven-page written memorandum to the Board of Trustees responding to public claims about the Town's Verkada surveillance system, most of which were based on records produced in [[cora-c26-09-verkada-audit-logs|CORA C 26-09]]. This analysis compares the specific factual statements in that memorandum to the content of the audit log Wynn cites.

The analysis uses only three inputs: the [[wynn-verkada-memo-2026-04-14|memorandum itself]], the audit log the Town produced, and Verkada's own public documentation. No characterization of intent is offered. The question is whether the memorandum's factual assertions match the document it describes.

## Assertion 1: "Two isolated audit log entries"

### The memorandum says

> "Two isolated audit log entries out of 32,339 separate log entries, referencing a 'person_of_interests_id' appear to coincide with system installation and testing in October 2025 and do not demonstrate ongoing or operational use."

### The audit log contains

A direct count of `message_code` values in `Verkada_Audit Log_REDACTED.xlsx` returns the following events related to People Analytics, facial-recognition infrastructure, and Persons of Interest:

| Event code | Count |
|---|---|
| `IDENTITY_LIST` | 114 |
| `IDENTITY_PEOPLE_LIST_BULK_GET` | 6 |
| `LPOI_LIST` | 4 |
| `ANALYTICS_DASHBOARD_CREATED` | 1 |
| `ANALYTICS_DASHBOARD_MODIFIED` | 1 |
| `ALERT_RULE_CREATED` | 1 |
| `ALERT_RULE_UPDATED` | 2 |
| `ARCHIVE_START` with tag `"Blurred Faces"` | 1 |
| **Total** | **130** |

The string `person_of_interests_id` is a field name inside the JSON payload of `ALERT_RULE_*` events. It is not itself an event code. Searching the log for that literal string would not return the 114 `IDENTITY_LIST` events, the 6 `IDENTITY_PEOPLE_LIST_BULK_GET` events, the dashboard creation events, the alert rule events as rows (only as payload contents), or the Blurred Faces archive.

### Observation

The memorandum's count is off by two orders of magnitude against the events directly tied to People Analytics and facial-recognition surfaces. Whether the miscount is the product of a narrow literal-string search or a different methodology is not stated in the memorandum.

## Assertion 2: "System installation and testing in October 2025"

### The memorandum says

> "... appear to coincide with system installation and testing in October 2025 and do not demonstrate ongoing or operational use."

### The audit log contains

Of the 114 `IDENTITY_LIST` events, **100 are logged under user account "Matt Laiminger"** and span **65 distinct calendar days from October 22, 2025 through March 16, 2026**.

The October 23, 2025 `ARCHIVE_START` event with the `"Blurred Faces"` tag is logged under the same account, with archive label "Ballot Box Observation Footage" — an archive of actual operational footage, not a test clip.

### Observation

An access pattern that occurs on 65 distinct days over five months, attributed to a single user account (the Police Chief's), through ten days before the CORA request arrived, is not limited to October installation and testing. The memorandum does not offer an alternative characterization for the November 2025 through March 2026 portion of the pattern.

## Assertion 3: "Verified as disabled"

### The memorandum says

> "Administrator verification conducted on April 14, 2026, confirmed that these features were disabled."

And in the summary table:

> **Claim:** Facial recognition is enabled. **Determination:** Verified as disabled. **Conclusion:** Not Substantiated.

### What the statement does and does not cover

The statement describes the **state of the Verkada admin dashboard on April 14, 2026**. It does not state:

- Whether the features were ever enabled at any prior time.
- When the features were first enabled, if ever.
- When the features were disabled, if they had been.
- Whether the [[final-published-letter|March 30, 2026 board letter]] statement that the cameras "are not face recognition" was accurate at the time it was published.

The produced audit log covers October 3, 2025 to March 26, 2026. The memorandum's verification was conducted April 14, 2026. The 19-day window between March 27 and April 14 is not covered by the records released to date, and any feature-state change during that window would not be visible to the public until additional audit log entries are produced.

### Observation

"Disabled on April 14, 2026" and "never enabled" are not the same assertion. The memorandum makes the first and does not make the second. Determining whether the features were enabled at any time between October 22, 2025 and March 26, 2026, and when they were disabled if so, requires either a written clarification from the Administrator or production of the audit log from March 27 forward.

## Assertion 4: "People detection does not constitute facial recognition"

### The memorandum says

> "All Verkada cameras perform basic people detection 'out of the box,' meaning they identify when a person is present within the camera's field of view without any additional configuration. This function is a standard feature and does not identify or recognize specific individuals."

This statement is correct. People detection (finding a person in frame) is distinct from face detection (finding a face) and from face matching (identifying a specific person).

### The audit log contains

An `ARCHIVE_START` event on October 23, 2025 under user account Matt Laiminger, with the following details field:

```json
{"archive_group_id":null,"filter_type":"4~1af7d81c","label":"Ballot Box Observation Footage","public":false,"tags":["Blurred Faces"]}
```

Verkada's own documentation describes the "Blurred Faces" feature as follows:

> "Selective face blur automatically detects faces in footage and applies a blur filter to protect privacy."
> — help.verkada.com/en/articles/9321844-selective-face-blur-for-archives

Selective face blur requires face detection to operate on the footage. You cannot selectively blur faces that have not first been detected as faces.

### Observation

The presence of the `"Blurred Faces"` tag on an archive created on October 23, 2025 establishes that face detection was operating on the Town's Verkada system on that date. The memorandum's assertion that only basic people-detection has ever been active is not consistent with the existence of this event in the log.

## Assertion 5: "Each login, camera selection, or page refresh generates a separate log entry"

### The memorandum says

> "It is my belief that this claim misinterprets how Verkada systems record activity. Each login, camera selection, or page refresh generates a separate log entry. Consequently, a single user session may produce multiple 'views.'"

This is correct as a general statement about how audit logs work. Individual log rows are micro-events, not viewing sessions.

### The audit log contains

Counts that the session-math critique does not apply to:

- **Distinct calendar days** on which `IDENTITY_LIST` events are recorded under the Police Chief's account: **65**, spanning a five-month window.
- **Distinct archives** created by the Town: **33 total archive creation events**, each representing a deliberate save of footage beyond the 30-day retention window.
- **Distinct camera configuration changes**: 82 `CAMERA_SET_NAME`, 42 `CAMERA_CONFIG_SET`, 12 `CAMERA_SET_FOCUS_TARGET` events.

### Observation

The session-inflation critique applies to aggregate event counts. It does not apply to distinct-day counts, distinct archive counts, or configuration events, each of which represents a discrete human action. The memorandum's critique is valid for one framing and does not apply to the framings most commonly used in the public record.

## Assertion 6: Community Room camera operational justification

### The memorandum says

> "It is my understanding that the Community Room camera has been accessed for legitimate municipal purposes, including:
> - Clarifying meeting minutes;
> - Monitoring facility rentals;
> - Verifying cleaning services; and
> - Protecting public property from vandalism or theft."

### The audit log contains (see [[verkada-usage-patterns]])

- 1,938 Community Room live-stream views total, of which 1,670 are under user account Ruben Santiago.
- 35% of Santiago's Community Room views occur on Saturday or Sunday.
- Sunday is the single highest day of the week (342 views).
- 428 views occur at or after 5 PM; 408 views occur at or before 9 AM.
- 93.6% of events on the Community Room camera are `LIVE_STREAM_STARTED`, not `VIDEO_HISTORY_STREAMED` (real-time viewing, not minutes review).

### Observation

The four operational purposes cited in the memorandum do not account for the weekend concentration, the after-hours distribution, or the predominance of real-time live streaming over historical review. The Board of Trustees does not meet on Sundays. Town offices are closed on weekends. Minutes clarification, by definition, would use historical-review functions rather than live-stream functions.

## Assertion 7: Redaction rationale

### The memorandum says

> "According to the Town Clerk, the only information redacted from the Verkada audit logs consisted of MAC addresses, IP addresses, device identification numbers, and serial numbers. These elements constitute sensitive technical security information that, if disclosed, could expose or make the Town's camera system vulnerable to unauthorized access or cyber attack."

### What was actually redacted

In addition to the categories Wynn lists, the produced log also redacts:

- `organization_id`
- `user_id` (Verkada's internal UUID for each user)
- `impersonator_id`
- `device_id`

What was **not** redacted:

- `user_name` (full names of all 11 users)
- `user_email` (complete townofpaonia.com and vendor email addresses)

### Observation

If the redaction rationale is phishing, credential-stuffing, or social-engineering prevention, the attack surface is user names and email addresses, not opaque internal UUIDs. The redaction pattern — opaque UUIDs redacted, human-readable identifiers left in plain text — is the opposite of what the stated rationale would produce.

## What Is Not Disputed

The memorandum does not dispute the existence or authenticity of any of the underlying audit log events. Wynn cites the same CORA C 26-09 dataset used in the public analysis. The disagreement is over characterization and interpretation, not over the presence of the events themselves.

The memorandum also does not dispute the language or publication of the [[final-published-letter|March 30, 2026 board letter]] stating the cameras "are not face recognition, or private property surveillance apparatus." It does not address that statement at all.

## Open Questions

1. Were the People Analytics, face detection, or related facial-recognition features ever enabled on the Town's Verkada organization at any time between October 2025 and April 2026? If so, on what date were they enabled, on what date disabled, by which user account, and under what event codes are those state changes recorded?

2. Does the audit log from March 27, 2026 to April 14, 2026 contain a `FEATURE_DISABLE`, `ORG_SETTINGS_UPDATED`, or equivalent event that would explain the transition from the Oct 22–23 configuration events to the "disabled" state verified on April 14?

3. If no such state-change event exists in the missing 19-day window, what evidence supports the assertion that the features were disabled prior to April 14 rather than toggled off on that day?

4. Was the March 30, 2026 board letter statement that the cameras "are not face recognition" accurate at the time it was published? Which trustees were made aware of the Oct 22–23 configuration events before signing?

## See Also

- [[wynn-verkada-memo-2026-04-14]] — The memorandum under analysis
- [[factual-corrections-2026-04-15]] — The citizen written response filed 2026-04-15
- [[cora-c26-09-verkada-audit-logs]] — The CORA response source
- [[facial-recognition-proof]] — Prior fact-check of the March 30 letter
- [[verkada-usage-patterns]] — Usage pattern analysis
- [[final-published-letter]] — The March 30 board letter
- [[2026-04-14-regular-board-meeting]] — The meeting where the memo was presented
- [[stefen-wynn]]
