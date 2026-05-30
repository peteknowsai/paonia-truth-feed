---
title: "CORA C 26-12 — The Cure Response (May 27, 2026)"
type: source
created: 2026-05-30
updated: 2026-05-30
tags: [cora, m365, audit-log, redaction, cure, inbox-rules, wynn]
sources: ["cora-c26-12-m365-audit-logs-response"]
---

# CORA C 26-12 — The Cure Response (May 27, 2026)

On May 27, 2026, the Town produced a "cure" to CORA request C 26-12, the Microsoft 365 Unified Audit Log request. This page documents the cure as a record distinct from the original, defective production page [[cora-c26-12-m365-audit-logs-response]]. The cure functions two ways at once: it is an admission that the first production was both incomplete and over-redacted, and it is itself an incomplete fix.

## What the Cure Delivered

- **An admission that exports were missing.** The Town acknowledged that four exports had been omitted from the original C 26-12 production.
- **Ten uncapped CSV exports.** The cure delivered ten exports — six monthly files spanning November 2025 through April 2026, plus four short-window files that fill gaps or overlap the monthly coverage — totaling roughly 1.13 million audit records, far less truncated than the capped original export.
- **The `AuditData` column un-redacted.** The original C 26-12 redacted the `AuditData` column in full. The cure removed that blanket redaction, making operation context, user, workload, client application, mailbox owner, folder names, and rule metadata readable.
- **Narrowed redactions.** Redaction was narrowed to identifier classes (GUIDs and correlation/session/token IDs, IP addresses, and mailbox/item immutable IDs).
- **Fees waived.** The Town waived its fees for the cure production.

## What the Cure Resolved

The cure found no record of mail suppression. With `AuditData` readable, the inbox-rule activity attributed to [[stefen-wynn|Stefen Wynn]] could be examined directly. Every populated rule action across all ten files is a "move sender into folder" operation; there are no delete, external-forward, or redirect actions anywhere in the inbox-rule events. The only forwarding rules in the data — utility-locate ticket distribution, voicemail notifications, a clerks listserv — forward to internal `@townofpaonia.com` addresses. No external forwarding, no auto-delete rule, and no mailbox exfiltration appears in the 1.13 million records.

The large `UpdateInboxRules` bursts (Dec 19, Jan 27, Feb 24, Apr 3, Apr 9) are confirmed and, in the uncapped data, larger than previously estimated — the cure shows roughly 19,543 Wynn `UpdateInboxRules` events summed across the set (a few hundred overlap between the late-March gap-filler and the monthly files and would be double-counted in that raw sum), still on the order of three times the prior figure of 6,357. But the bursts are overwhelmingly `ModifyMailboxRule` events: hundreds to thousands of pre-existing rule IDs re-stamped within seconds, all from Wynn's own logged-in Outlook desktop client. That is the mechanical signature of an Outlook rule-store resync, not deliberate per-rule editing. This activity is benign — see [[inbox-rules-investigation-closed]].

A limit of the cure, not a redaction: the substance of a modified rule (its name, conditions, and actions) is blank for `ModifyMailboxRule` events because Microsoft never records the rule body for a modify/resync operation. Rule contents are present only for `AddMailboxRule` (new-rule) events and admin cmdlets. The bursts therefore cannot be read for purpose from the log — not because the Town redacted them, but because the underlying data was never in the M365 log to begin with. Where intent rests on whether a rule "does" something, the rule body is the relevant record, and for the burst events that body does not exist in any export.

## What the Cure Did Not Resolve

The cure introduced a new problem: its redactions are over-broad and internally inconsistent. The clock time inside the `CreationDate` column was redacted as if it were an IP address (e.g., a timestamp rendered as `[REDACTED_IP]`), and some operation cmdlet names were partially clobbered to `[REDACTED_TOKEN]` (for example `Set-[REDACTED_TOKEN]`). These are mechanical redaction errors, not exemptions applied to substantive content. The full redaction audit is at [[redaction-audit-c26-12-cure]].

## Significance

The cure is an admission against the original production: by delivering four previously omitted exports, un-redacting `AuditData`, and waiving fees, the Town effectively conceded that the first C 26-12 response was incomplete and over-redacted. On the question that drew the most scrutiny, the readable records show no evidence of mail suppression — no delete, external-forward, or redirect rule actions, and no mailbox exfiltration across the 1.13 million records. What the bursts were for cannot be read from the log, because Microsoft never recorded the rule bodies for the modify/resync events that compose them. The cure leaves a narrower problem of its own: a redaction process that mislabels timestamps as IP addresses and clips cmdlet names is not applying exemptions, it is malfunctioning. This places the cure within the broader [[pattern-of-cora-obstruction]]: a production that requires a cure, and a cure that still ships defective redactions.

## See Also

- [[cora-c26-12-m365-audit-logs-response]] — the original, defective production
- [[redaction-audit-c26-12-cure]] — analysis of the cure's over-broad and inconsistent redactions
- [[inbox-rules-investigation-closed]] — why the inbox-rule bursts are benign
- [[pattern-of-cora-obstruction]] — broader pattern
- [[cora-tracking-log]] — request status tracking
