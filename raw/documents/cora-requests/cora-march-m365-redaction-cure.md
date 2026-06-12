---
title: "CORA Request — March 2026 M365 Audit Log + AuditData Redaction Cure (C 26-12 Supplemental)"
type: source
filed_by: Pete McCarthy
filed_to: Samira M. Vetter, Town Clerk / Official Custodian of Records
filed_date: 2026-05-05
predecessor: C 26-12 (filed April 7, 2026; produced April 22, 2026)
tags: [cora, m365, audit-log, redaction, vetter, deficiency-cure]
---

# Form-page entries (overlay on cora-request-form.pdf)

- Name: Pete McCarthy
- Date: 2026-05-05
- Phone: (415) 623-9773
- Mailing Address: Paonia, CO 81428
- Email: petefromsf@gmail.com
- Physical or PDF: PDF

| Copies | Document Name or Detailed Description |
|---|---|
| 1 | **March 2026 M365 unified audit log — complete.** The complete Microsoft 365 unified audit log for the Town's tenant covering March 1, 2026 through March 31, 2026, produced via paginated programmatic export (e.g., `Search-UnifiedAuditLog -StartDate 03/01/2026 -EndDate 03/31/2026 -ResultSize 5000` with continuation), in CSV format. *See attached narrative for context.* |
| 1 | **Complete paginated export for the C 26-12 retention window.** The complete M365 unified audit log for all available retention dates from November 1, 2025 through May 5, 2026, produced beyond the 50,000-row Microsoft Purview UI cap that limited each monthly file in the C 26-12 production. CSV format, paginated programmatic export. |
| 1 | **AuditData column — unredacted production OR per-item redaction log.** For all rows produced under C 26-12 and under items 1 and 2 above: the AuditData column unredacted to the maximum extent permissible. To the extent the Town continues to assert exemption over any specific AuditData subfield, an itemized redaction log per C.R.S. § 24-72-204(4) identifying, for each redaction: (a) the RecordId, (b) the AuditData subfield(s) redacted (e.g., Subject, RecipientUPN, ClientIPAddress, AffectedItems, Operation, MailboxOwnerUPN, Parameters), (c) the specific statutory subsection asserted as the basis, and (d) the factual basis on which the asserted subsection applies to those subfields. |

---

# Attached narrative (page 2 of the PDF)

**Re: Supplemental records request following CORA C 26-12 (production dated April 22, 2026)**

This request is filed to obtain records that were responsive to CORA C 26-12 but were not produced or were produced in a form that does not satisfy the original request or the Colorado Open Records Act.

## Item 1 — March 2026 audit log

The C 26-12 production included a file labeled `Redacted_TownOfPaonia_Audit_Log_Mar2026.xlsx`. The first 50,000 RecordIds in that file are byte-identical to the first 50,000 RecordIds in the file labeled `Redacted_TownOfPaonia_Audit_Log_Apr2026.xlsx`. The "Mar2026" file contains April 1–9, 2026 data. It does not contain any March 2026 records.

The original C 26-12 request expressly sought "the complete Microsoft 365 Unified Audit Log export … for all available dates retained by the system." March 2026 falls within the Town's 180-day retention window. The records exist; they were not produced.

I request that the actual March 1, 2026 through March 31, 2026 audit log records be produced as a paginated export. The export should be generated via `Search-UnifiedAuditLog` with `-ResultSize 5000` and continuation pagination, or via the Microsoft Management Activity API, neither of which is subject to the 50,000-row UI cap.

## Item 2 — Beyond the 50,000-row UI cap for all months

Each of the six monthly XLSX files in the C 26-12 production contains exactly 50,000 rows. Fifty thousand is the legacy Microsoft Purview UI export ceiling; it is not a record-count limit imposed by Colorado law or by the M365 platform itself. A single Vetter account generated more than 25,000 events in November 2025. Full months across the Town's 70+ active accounts run substantially higher. The 50,000-row files are therefore partial productions, not complete months.

I request the records that exist beyond the 50,000-row cap for each month in the C 26-12 retention window — that is, the complete monthly populations for November 2025, December 2025, January 2026, February 2026, March 2026, April 2026, and through the date of this request. The records should be produced via paginated programmatic export.

## Item 3 — AuditData column: unredacted production or itemized redaction log

The C 26-12 production redacted the entire AuditData column on every row produced — approximately 250,000 rows — under a single broad citation to C.R.S. § 24-72-204(2)(a)(VIII), the critical-infrastructure-information exemption.

AuditData is a structured JSON field. It contains discrete subfields including, but not limited to, `Subject` (email subject), `Recipients` and `RecipientUPN`, `ClientIPAddress`, `Operation`, `MailboxOwnerUPN`, `AffectedItems` (for delete operations), `Parameters` (for mailbox rules), `ItemFolderPathName`, and many others. Per-field redaction within AuditData is a standard operation in Microsoft Purview and in any post-export tooling. A column-wide blackout treats every field in every event as if each independently met § 204(2)(a)(VIII), and supplies no analysis as to why.

C.R.S. § 24-72-204(4) requires the records custodian, "upon request," to produce a written statement of the specific grounds for any denial or partial denial by reference to the records or portion withheld and the specific statutory authority. C.R.S. § 24-72-204(2) further requires the asserted exemption to be specifically supported, not invoked categorically. Where, as here, only certain subfields plausibly implicate "specific details" of "any security arrangements or investigations," the proper response is per-field redaction supported by a per-field justification — not a blanket column blackout.

I therefore request, in the alternative:

**(A)** Production of the AuditData column **unredacted** to the maximum extent permissible; **or**

**(B)** If the Town continues to assert exemption over any specific AuditData subfield, an **itemized redaction log** identifying, for each redaction:

  1. the **RecordId** of the row,
  2. the **AuditData subfield(s)** that have been redacted within that row (named, not generalized),
  3. the **specific statutory subsection** asserted as the basis (e.g., § 24-72-204(2)(a)(VIII), § 24-72-204(3)(a)(i), etc.),
  4. the **factual basis** on which that subsection applies to that subfield in that row — sufficient to allow a reviewing party to evaluate whether the asserted exemption applies as a matter of law.

This is what § 204(4) requires once an asserted exemption is challenged. A column-wide redaction with one citation does not satisfy the statute. An itemized log does.

## Format and delivery

CSV is the preferred export format (matching the C 26-12 request). The redaction log may be produced in CSV, XLSX, or PDF form, provided each redaction is itemized as set out above. I would appreciate electronic delivery to the email above, with a notice of any deposit required before staff time is incurred.

## Statutory notes

This request is filed under C.R.S. § 24-72-201 et seq. Items 1 and 2 above identify records that were not produced in C 26-12 but were responsive to it. Item 3 addresses the redaction methodology used in C 26-12 and seeks the per-item statement § 204(4) requires once the categorical assertion of exemption has been challenged.

I previously placed the Town on preservation notice covering this category of records by letter dated April 23, 2026 to the Custodian, copied to the Town Attorney, the Town Administrator, and the Mayor. That preservation notice remains in effect.

Respectfully,

Pete McCarthy
petefromsf@gmail.com
(415) 623-9773
