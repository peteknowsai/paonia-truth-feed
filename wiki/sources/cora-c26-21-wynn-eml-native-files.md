---
title: "CORA C 26-21 — Native .eml Files for Four Wynn Emails (Nov 4 2024)"
type: source
created: 2026-05-30
updated: 2026-05-30
tags: [cora, wynn, native-format, eml, timestamps, message-directionality, planning-commission]
sources: ["cora-c26-15-wynn-sent-emails-nov4-2024"]
---

# CORA C 26-21 — Native .eml Files for Four Wynn Emails (Nov 4 2024)

**Type:** CORA request and response package
**Request filed:** 2026-05-20
**Request received by clerk:** 2026-05-21
**Fulfilled:** 2026-05-27, marked PARTIAL (2 of 4 responsive)
**Requester:** Pete McCarthy
**Relationship:** Follow-up to [[cora-c26-15-wynn-sent-emails-nov4-2024|CORA C 26-15]]

## What This Request Was For

C 26-15 produced 165 pages of [[stefen-wynn|Wynn]]'s outbound email from November 4, 2024 as a PDF assembled in Microsoft Word. Several of those messages were produced without a top-level "Sent:" timestamp — the Word-based assembly did not preserve the header for every item. The Town's M365 audit retention is 180 days, and the production date is roughly 18 months after November 4, 2024, so the send timestamps cannot be recovered from the audit log. The native mailbox files are the only remaining source.

C 26-21 asked for native `.eml` files (or direct Outlook-to-PDF prints) for the four specific messages C 26-15 produced without a send timestamp:

- **(a)** Wynn's forward of McCarthy's Planning Commission comments to Mayor, Trustees, and Planning Commission
- **(b)** Wynn's reply to Town Clerk Vetter's 12:32 PM forward about the master-plan revision (the produced text was a short instruction to a staff member to print copies, signed off "SW")
- **(c)** Wynn's forward noting an invoice — produced under C 26-15 with the short sign-off "Invoice from Mary for October. SW."
- **(d)** Wynn's "P-Hill tower extension" email

The request sought the complete header metadata for each so the actual send times could be established.

## What Was Produced

Four `.eml` files were delivered. Two are responsive; two are not.

### (a) — Responsive

`C106545E0C5FBD068AF13A8ABE5F767A.eml` is Wynn's forward of McCarthy's Planning Commission comments. The message is From StefenW and carries a Date header reading `Tue 5 Nov 2024 01:10:53 +0000`. That UTC time converts to **November 4, 2024, 6:10 PM Mountain** — a November 4 send, despite the UTC date rolling over to the 5th.

### (c) — Responsive

`60B177499A58440D79E8A013B567FC39.eml` is Wynn's invoice forward. The message is From StefenW with a Date header of `Mon 4 Nov 2024 15:55:04 +0000`, which converts to **November 4, 2024, 8:55 AM Mountain**.

Both recovered timestamps are read from the native message headers — the metadata the Word-assembled C 26-15 production had dropped.

### (b) — Non-responsive (wrong direction)

`55856453240EA8FB230790ECB1A83086.eml` is not Wynn's reply. It is Vetter's **inbound** message *to* Wynn — the master-plan email he was supposed to have replied to — not his outbound print-copies response. The Town substituted the message Wynn received for the message Wynn sent.

### (d) — Non-responsive (wrong direction)

`2F3CDF22176991B29A52C9E5C479CCF9.eml` is an external contractor's email to Delta County Planning on which Wynn appears only on Cc. Its Exchange header carries `X-MS-Exchange-Organization-MessageDirectionality: Incoming`, confirming it is mail Wynn received, not mail he sent. No Wynn-authored "P-Hill tower extension" email was produced.

## What the Records Show, and What They Do Not

The two responsive `.eml` files do what the request set out to do: they recover send timestamps that the C 26-15 production had stripped, for items (a) and (c). Those timestamps come directly from the native message headers.

For items (b) and (d), the produced files are inbound messages — one Wynn received from Vetter, one on which he was only a Cc recipient. The `MessageDirectionality: Incoming` tag on (d) is the Town's own Exchange metadata. These files do not establish a send time for any Wynn-authored message, because they are not Wynn-authored messages. The requested outbound items remain unproduced.

The Town closed C 26-21 as fulfilled despite producing inbound substitutes for half the request. On these records, two of the four targeted timestamps are still outstanding. The matter is a candidate to be reopened for items (b) and (d) — Wynn's master-plan reply and any Wynn-sent P-Hill tower email — which the produced files do not contain.

## See Also

- [[cora-c26-15-wynn-sent-emails-nov4-2024]] — The original Nov-4 outbound-email production this follows up
- [[stefen-wynn]] — Town Administrator and author of the responsive messages
- [[cora-tracking-log]] — Full CORA request and response log
