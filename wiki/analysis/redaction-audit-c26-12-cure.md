---
title: "The Redactions Don’t Hold Up — Auditing the C 26-12 Cure"
type: analysis
created: 2026-05-30
updated: 2026-05-30
tags: [cora, redaction, m365, audit-log, transparency, town-attorney, public-records]
sources: [cora-c26-12-cure-response]
---

# The Redactions Don’t Hold Up — Auditing the C 26-12 Cure

The Town's cured response to [[cora-c26-12-cure-response|CORA C 26-12]] produced ten CSV files of Microsoft 365 unified audit-log activity — 1,134,799 rows spanning November 2025 through early May 2026. The Town withheld values under C.R.S. § 24-72-204(2)(a)(VIII), the exemption for "specialized details of security arrangements or investigations," narrowed in the cure to technical identifiers: tokens, GUIDs, correlation and immutable IDs, application IDs, and Planner task values.

That exemption is meant to be narrow. This page tests the redaction against the records the Town itself produced. The test is not whether the Town had *any* basis to withhold — live session tokens and bearer credentials are a legitimate fit and are conceded below. The test is whether the redaction as applied is coherent and limited to security details. On the record, it is neither.

A method note up front: every figure here comes from streaming the produced CSV files line by line and parsing the audit-log JSON in each row. The findings below describe what the produced files show. Where a finding rests on email or calendar **subject lines** rather than produced message bodies, that is stated; the bodies are not in this production.

## Three grounds the redaction fails

### 1. Over-broad: secrets published next to their "secret" indices

The Town withheld more than 12 million field values as security-sensitive. In the same files, it left in the clear the things those values index: email subject lines, sender and mailbox-owner identities, file names, SharePoint folder paths, and timestamps.

The preservation rates are near-total. Email subject lines survive in 99.998% of rows. Mailbox-owner UPNs survive in 100%. File names and folder paths survive in roughly 100% and 99.7%. The substance of each record — who accessed, sent, or deleted what, and when — is intact. Only the opaque identifiers pointing *to* that substance were masked.

You cannot call a GUID a "specialized detail of a security arrangement" while publishing the file name, the folder path, and the email subject it references. The survival of the substance is itself proof that the withheld identifiers were not what made the record sensitive. This is the over-breadth ground: the exemption was applied to whole categories of ordinary public-record content — internal IP addresses, file and folder names, object IDs, and in a minority of rows user email addresses — that are not security arrangements.

### 2. Internally inconsistent: the same value is "secret" in one row and plaintext in the next

The redaction was applied by mechanical find-and-replace across at least 38 distinct marker strings — evidence of multiple inconsistent passes rather than a single field-level legal review. Nine files were processed by a value-pattern tool that masked anything matching a GUID or IPv4 shape; one file (the April export) was run through a separate key-name tool with its own inconsistent dash-versus-underscore naming. Two incompatible methods in one production.

The result is that every field the Town treats as exempt also sits in plaintext somewhere:

- **283 distinct client IP addresses** survive in the clear — including five internal RFC1918 LAN addresses (192.168.x and 172.20.x ranges) and the Town's apparent public gateway, which appears redacted in most rows but in plaintext over 24,000 times.
- **38,734 distinct ObjectId values** survive in plaintext.
- The masked `UserId` column is redacted in only 0.9% of rows and plaintext in 99.1%. There is no coherent theory under which a field is a security secret 0.9% of the time.
- At least **38 inconsistent redaction-token strings** appear, several confined to a single file — the signature of an ad-hoc, unstandardized process.

A redaction cannot survive a § 204 challenge when the withheld category is demonstrably non-secret 99% of the time in the same files.

### 3. Recoverable: the data gives back what the redaction withholds

Where the redaction was applied, the produced files defeat it.

- **173,009 redacted timestamps are 100% recoverable.** The find-and-replace mistook clock times in the `CreationDate` column for IP addresses and masked them, but the ISO timestamp in the same row's audit JSON is in the clear. `"3/6/2026 [REDACTED_IP] AM"` is recovered exactly from the sibling field.
- **21,689 redacted file URLs are recoverable** from the file-name and folder-path fields preserved in the same record. A redacted SharePoint URL sits next to an intact file name and path that reconstruct it.

A redaction that the record itself defeats is not protecting anything. It fails the "specialized details" test on its face.

## The masked names are reversible in one step

When the Town did mask the actor in the `UserId` column — about 10,200 rows — it was masking people, not machines. Every one of those masked rows that carries a Microsoft PUID (a stable per-person account identifier) sits beside that PUID in the clear in the adjacent `UserKey` field. Cross-referencing each PUID against rows where the same PUID appears next to a plaintext email address re-identifies roughly 98% of the masked rows to a named Town employee.

The re-identification is concentrated. The Town Clerk (Samira Vetter) accounts for about 64% of all masked-actor rows; the Clerk and the Assistant Clerk (Ruben Santiago) together account for roughly 88%. The hidden activity is overwhelmingly routine Microsoft Planner task and search activity. No service or application accounts are among the masked rows — every masked actor is a human.

So the identity redaction protects almost no identity: it is reversible by reading the next column, while the broader redaction suppresses millions of values that are not identity at all.

## The Town Attorney's footprint is fully visible

Stated as fact, not accusation: the activity surrounding the Town Attorney (Clayton Buchner) is entirely un-redacted in this production. His name surfaces in 939 audit events between November 7, 2025 and May 1, 2026, every one with a clear actor field — a redaction rate near 0.1%, below the baseline.

Among those events is a November–December 2025 cluster of deletions touching his own material: soft-deletes and moves-to-deleted-items of attorney invoices, a recycled SharePoint folder named for his firm, and the deletion (twice, on separate dates) of an attachment named as his employment agreement with the Town. These are recorded as **operations on items whose subject lines and file names are visible** — the produced log shows the operation, the date, and the file or subject name. It does not contain the message or document bodies; those are the subject of a pending request. What the produced records show is the existence, timing, and labels of these events, not their contents.

One clarification belongs here against over-reading the data. The attorney's own Town mailbox does not appear anywhere in this export, so the visibility above is his name surfacing *inside other staff mailboxes and SharePoint*, not his own account. Separately, the broader deletion activity in this M365 set is largely automated calendar-cancel cascades, not destruction of records — a point developed in the [[pattern-of-cora-obstruction]] analysis and not asserted here as proven spoliation.

## What the records do not show

To stay inside what the produced files support:

- They do **not** show hidden or suppressed mail. The subject lines and mailbox owners survive; nothing in this set indicates withheld correspondence beyond the technical identifiers.
- They do **not** establish destruction of records as a proven fact. The deletion events are real entries in the log, but the log alone shows operations and labels, not intent or irrecoverability.
- They do **not** include message or document bodies. Counterparty reconstruction is limited because the Microsoft log itself records the mailbox owner and subject, not a full recipient list — a property of the source data, not the redaction.

## Where this leaves the request

The cure leans over-broad and is provably leaky. The defensible core — live session and bearer tokens — is a small slice of the redaction weight; the bulk is identifiers, IP addresses, file paths, and operational data that are not security arrangements. The redaction fails CORA on two independent grounds: over-breadth as to category, and incoherence as applied.

The thing to demand is the statement required by C.R.S. § 24-72-204(4): the written grounds for denial, citing the specific statutory authority and the basis for withholding each category. A redaction that publishes the substance, leaks the "secret" categories in hundreds of thousands of rows, and can be reversed from the data itself is a redaction whose § 204(4) justification is the document that will or will not hold up. That is the live thread. Producing the statement, and a clean re-redaction limited to genuine credentials, is what the record now calls for. See [[public-records-access]] for the access standard, and the [[cora-tracking-log]] for status.

## See Also

- [[cora-c26-12-cure-response]]
- [[pattern-of-cora-obstruction]]
- [[public-records-access]]
- [[cora-tracking-log]]
