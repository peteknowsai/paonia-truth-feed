---
title: "The Town Was Asked, On Camera, to Preserve the Person-of-Interest List. Then It Erased It."
type: analysis
created: 2026-06-13
updated: 2026-06-13
tags: [surveillance, verkada, cora, cover-up, spoliation, person-of-interest, poi, destruction, wynn, vetter, facial-recognition]
sources: [cora-c26-30-verkada-poi-denial, cora-c26-09-verkada-audit-logs, cora-tracking-log, pattern-of-cora-obstruction, audit-log-first-viewed-after-cora, facial-recognition-proof, employee-surveillance-archives, board-letter-2026-03-30]
---

# The Town Was Asked, On Camera, to Preserve the Person-of-Interest List. Then It Erased It.

On **May 12, 2026**, standing at the podium in a Town of Paonia Board meeting, Pete McCarthy told the trustees — on the record, on camera — exactly what they were holding and exactly what not to do with it:

> *"This town's own [Verkada] audit log produced under records requests show a person of interest list … those are facial recognition operations … permanent video archives labeled with names of specific town employees. At least one of those archives was used as part of a basis for terminating [an] employee … I'm asking that you preserve for the record and you do not delete the archives … because they may be the subject of … legal action."*

He asked for one specific, concrete thing: that when the Board voted to end the camera contract, it **"direct that no [Verkada] stored footage be deleted between now and the completion of an independent audit."**

**Twenty-nine days later, the Board voted to terminate the system and erased all of it.** Then the Clerk told him there was nothing to find.

This is the most serious thing that has happened in the long-running records fight with this Town. Not a slow response. Not a heavy redaction. The **destruction of the exact records a resident had asked them — out loud, in public, in advance — to preserve.**

## What was on the list

The Town spent a year insisting it ran a modest, vandalism-focused camera setup. Its own records say otherwise. The Verkada Command audit log the Town produced under [[cora-c26-09-verkada-audit-logs|CORA C 26-09]] — a log it generated, redacted, and **billed Pete $167.90 for** in April 2026 — contains, in its `event_type` column:

- **`IDENTITY_PEOPLE_LIST_BULK_GET`** — a **People List / Person of Interest list** being read and exported;
- **`LPOI_LIST`** — a **License Plates of Interest** list;
- identity-database queries — the operations behind **facial recognition** (see [[facial-recognition-proof]]);
- permanent **video archives labeled with the names of specific Town employees** (see [[employee-surveillance-archives]]), at least one of which, per Pete's on-record statement, factored into an employee's termination.

The system had been running and logging continuously **"from installation (October 22, 2025) to present."** None of this is alleged. It is the Town's own export.

## The contradiction the erasure was meant to bury

On **March 30, 2026**, the Board sent a signed [[board-letter-2026-03-30|letter to Paonia citizens]] telling them there was **no facial recognition**. The Town's own audit log records identity-database queries — facial-recognition operations — on its system. As Pete put it to the Board on May 12: *"Those two records cannot both be true. The board has not reconciled them. Terminating the contract does not reconcile them either."*

He was right that termination wouldn't reconcile it. What termination did — as carried out — was **erase the record that proved which statement was the lie.**

## The timeline

| Date | What happened |
|---|---|
| **2025-10-22** | Verkada system goes live and begins logging. |
| **2026-03-30** | Board's signed letter to citizens: no facial recognition. |
| **2026-04-08** | Town produces the C 26-09 Verkada audit log — and charges Pete **$167.90** for it. It names the POI list, the LPOI list, identity queries, and named-employee archives. |
| **2026-05-12** | **At a public Board meeting, on camera, Pete asks the trustees to preserve the data, not delete the archives "because they may be the subject of legal action," and to direct that no footage be deleted pending an independent audit.** |
| **2026-06-04** | Pete files [[cora-c26-30-verkada-poi-denial\|CORA C 26-30]]: the current POI and LPOI lists + every add/remove event, Oct 22 2025 → present. |
| **2026-06-08** | Pete files **C 26-33**: the continuation of the same audit log. The Clerk acknowledges C 26-30 the same day — *four days* after it was filed. |
| **2026-06-10** | **The Board votes unanimously to terminate Verkada. The cameras go off and, per the Town, "all data was erased."** Two records requests for that exact data are open at this moment. |
| **2026-06-11 / 12** | Both requests answered with the **identical** letter: *"all data was erased … there are no responsive records … no data exists to be searched."* |

## Why "there's nothing to find" is the tell

A custodian who says a record never existed is making a claim you usually cannot disprove. This one you can — because **the Town already produced the record and made Pete pay for it.** You cannot bill a resident $167.90 for the Verkada audit log in April and then certify in June that "no data exists to be searched." The April invoice is the receipt that the June denial is false.

So the honest description of what happened is not "the records don't exist." It is: **the records existed when Pete asked for them, the Town had been told in public not to destroy them, and the Town destroyed them anyway and then said there was nothing there.**

## What this is, in plain terms

This is the move that ends an accountability trail. Every other obstruction on the [[cora-tracking-log|docket]] is curable — an incomplete production can be completed, an over-redaction can be lifted, a missing month can be re-exported. **Destruction is not curable.** Once the People List and its add/remove history are gone, no follow-up request can bring them back. That is what makes erasing records *while two requests for them are pending* qualitatively different, and why it lands as **Pattern 9 — "destroy-the-record-then-deny"** in the tracking log.

It also recolors the small stuff. The Clerk's habit of stamping requests "received" several days late (here, four days on each of C 26-30 and C 26-33) reads as bureaucratic friction — until you notice it pushed the "no records" letters to the far side of the June 10 vote.

The legal frame writes itself: records responsive to pending CORA requests, destroyed after an express on-the-record preservation demand to the body that ordered the destruction. That implicates CORA (C.R.S. § 24-72-203/204/205), Colorado's records-retention law (§ 24-80-101 et seq.), and common-law **spoliation** — destruction of evidence with notice, which supports an adverse inference. The Town already carries a judicial finding of CORA bad faith from the [[bill-brunner|Brunner case]]. This is not a first offense in kind; it is an escalation of one.

## What is still recoverable — and worth pressing

"We turned off the cameras, so everything is gone" should not be taken at face value:

- **The Command audit log is cloud data, not camera footage.** The People List, the LPOI list, and the log of who added and removed names are organizational records in Verkada Command — distinct from video on a camera. Powering down hardware does not, by itself, wipe a cloud org's audit trail, and vendors routinely retain backups. Whether this data is truly irretrievable from **Verkada the vendor** is an open question the Town has not answered and should be made to.
- **The decision to erase is itself a record.** The June 10 vote, the agenda item, the staff direction to delete, and any communications about destroying data that was under active records requests are all public records — and they postdate the erasure, so they still exist.
- **The people are still here.** As Pete told the Board: the footage already captured, the archives that already exist, and the residents and employees already affected "are still in the town's hands." Termination closed the contract. It did not answer what the system was used for, by whom, against whom, between October 2025 and the day the cameras went dark.

## The point

A town that will destroy the evidence after a resident asks it, on camera, to preserve that evidence is not having a paperwork problem. The cameras going off is the headline the Town wants. The story underneath it is that when Paonia was handed a clear, advance, public instruction to keep the records that would show how its surveillance system had actually been used — including a **person-of-interest list** the Town had told citizens didn't involve facial recognition — it chose to erase them instead, and then certified that there had never been anything to see.

The receipts for all of the above are collected in [[cora-c26-30-verkada-poi-denial]] (the documentary record), [[cora-c26-09-verkada-audit-logs]] (the log that proves the list existed), and the [[cora-tracking-log|CORA tracking log]] (Pattern 9). The May 12 preservation demand is preserved in `raw/documents/public-comments/2026-05-12-speech-deck.html` (prepared remarks) and `raw/documents/public-comments/2026-05-12-verkada-termination-public-comment-as-delivered.txt`; the meeting video is the primary record.

## See also

- [[cora-c26-30-verkada-poi-denial]] — the full C 26-30 / C 26-33 documentary record
- [[cora-c26-09-verkada-audit-logs]] — the April production that proves the POI/LPOI lists existed
- [[audit-log-first-viewed-after-cora]] — the Town didn't look at its own surveillance log until Pete asked for it
- [[facial-recognition-proof]] · [[employee-surveillance-archives]] · [[community-room-surveillance]] — what the system was actually doing
- [[pattern-of-cora-obstruction]] · [[cora-tracking-log]] — the broader records-obstruction record
- [[surveillance]] · [[camera-ban]] — the underlying issue and the citizen effort to end it
