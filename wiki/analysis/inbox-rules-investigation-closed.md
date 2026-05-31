---
title: "What the Audit Logs Don’t Show: The Inbox-Rules Dead End"
type: analysis
created: 2026-05-30
updated: 2026-05-30
tags: [audit-log, inbox-rules, m365, deletions, wynn, cora, forensics]
sources: ["cora-c26-12-cure-response"]
---

# What the Audit Logs Don’t Show: The Inbox-Rules Dead End

Transparency cuts both ways. This page records a theory the records do **not** support, because a citizen-transparency project that only publishes the findings that help its case is doing the same thing it criticizes.

## The theory we chased

The starting point was a set of real, large numbers in Town Administrator Stefen Wynn's Microsoft 365 mailbox: roughly 19,543 `UpdateInboxRules` events across the period, with tightly clustered bursts on several dates — including about 1,134 events on April 3, 2026, the first business day after the Board's March 30 letter. The hypothesis was that those rules were being used to suppress, hide, or redirect email.

The [[cora-c26-12-cure-response|C 26-12 cure]] let us test that hypothesis directly. The cure un-redacted the audit-data column the original response had blanked across about 1.13 million rows. We parsed all of them.

## What the records actually show: benign

The theory does not hold. Across all 1.13 million rows:

- **The bursts are `ModifyMailboxRule` events, and Microsoft logs no rule body for them.** Inbox-rule events come in two flavors. A `AddMailboxRule` (a genuinely new rule) is fully logged — name, condition, action. A `ModifyMailboxRule` (an existing rule touched or re-synced) is logged with the rule body blank by design: empty name, empty condition, empty action, only the rule's ID surviving. The bursts are overwhelmingly the second kind. **The blank fields are native M365 behavior, not a Town redaction** — Exchange simply does not re-serialize a rule's contents on a modify operation.
- **The April 3 burst is a re-stamp of an existing rule set, not the creation of new rules.** Those ~1,134 events touch 567 distinct rule IDs, most appearing about twice — the signature of Outlook bulk re-syncing the entire existing rule store in a few seconds, not a person authoring rules by hand.
- **Every rule whose body *is* logged is an ordinary move-to-folder rule.** The fully-populated `AddMailboxRule` events are mundane mail filing (for example, rules that move a given sender's mail into a folder). There are zero delete, auto-forward-external, or redirect actions in any inbox-rule event in any of the ten files.
- **Every `ForwardTo` target in the data is internal.** Forwarding appears only in legitimate administrative rules belonging to other staff (a Colorado 811 utility-locate distribution rule, a voicemail-forwarding rule, a clerks'-listserv filing rule), and every forwarding address is an `@townofpaonia.com` account.
- **The mechanics match a desktop client resync.** Every one of Wynn's inbox-rule events carries the same fingerprint: `OUTLOOK.EXE` over internal Exchange RPC, owner logon, `ExternalAccess: false`, same mailbox SID. This is his own logged-in Outlook desktop client re-stamping its rule store, not an external actor or an administrator acting on his mailbox.
- **No self-granted permissions, no exfiltration.** No external mail forwarding, no auto-delete rule, and no self-granted mailbox permission appears anywhere in the 1.13 million records.

A note on what the records cannot say either way: because Microsoft never recorded the bodies of the modified rules, the log cannot prove what those rules *do*. It also offers no evidence that they do anything other than file mail. The mechanical pattern points to a client resync; the contents are simply not in the M365 log to begin with.

This finding reverses an earlier line of inquiry. The inbox-rule bursts are not evidence of hidden or suppressed mail.

## The deletions, checked the same skeptical way

A separate theory — that mailbox deletions tenant-wide amounted to records destruction or "spoliation" — was re-checked against the same un-redacted data with the same skepticism.

- **About 79% of all hard-deletes tenant-wide are automation or third-party-client artifacts**, not interactive human deletions. The bulk are a Microsoft Substrate server-side process and two users' mail clients running a fixed ~30-second draft-purge timer.
- **The "synchronized cascade" pattern is routine.** Where the same message is hard-deleted across several mailboxes in the same second, the field values show the cause: staff hold delegate access to each other's calendars, so when a meeting is canceled the Substrate removes the duplicate copy from every delegate's mailbox at the same instant. That pattern fires hundreds of times on lunches, webinars, and hire dates. Of ten flagged "synchronized cascade" clusters, eight collapse into this same benign calendar-cancel mechanism (or into draft cleanup and routine move-to-Deleted-Items of items that demonstrably still existed afterward).
- **One lead survives, and is noted — not asserted.** A SharePoint folder recycle by the Town Clerk's account targets the Town's attorney, insurer, and a `Legal_2022` folder, with the folder contents downloaded locally immediately before the deletion and no restore anywhere in the logs. This is the one cluster that withstands scrutiny. Honest caveats apply: a recycle is recoverable, not permanent destruction, and download-then-delete is also consistent with relocating files. It is a lead worth pursuing, not proven destruction.

## Where this leaves the live issue

The live records dispute is **not** hidden mail. It is the **legality of the redactions** the Town applied to the original C 26-12 response — whether the withholdings were proper under CORA — which is the subject of [[redaction-audit-c26-12-cure]]. The inbox-rules theory closes here.

That distinction matters for the broader record in [[pattern-of-cora-obstruction]]: an obstruction case is stronger, not weaker, for naming the leads that did not pan out. The status of the underlying requests is tracked in the [[cora-tracking-log]].

## See Also

- [[cora-c26-12-cure-response]]
- [[redaction-audit-c26-12-cure]]
- [[pattern-of-cora-obstruction]]
- [[cora-tracking-log]]
