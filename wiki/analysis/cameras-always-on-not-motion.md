---
title: The Cameras Are Not Motion Activated
type: analysis
created: 2026-04-09
updated: 2026-04-09
tags: [surveillance, verkada, cameras, board-letter, fact-check]
sources: [cora-c26-09-verkada-audit-logs, final-published-letter, verkada-usage-patterns]
---

# The Cameras Are Not Motion Activated

## The Claim Being Tested

On March 30, 2026, the Paonia Board of Trustees published an official "Letter to Town of Paonia Citizens" on the Town website, signed by all seven trustees. The letter stated:

> "The proposal to install **motion activated cameras** in Town Park, Town-owned buildings, and critical water and sewer buildings was the topic of discussion during at least six public meetings held between October 2024 and December 2025."

Source: [[final-published-letter|Final Published "Letter to Town of Paonia Citizens" (2026-03-30)]]

## What Verkada Says About Its Own Cameras

Verkada's own product documentation explicitly states that all Verkada cameras record continuously, regardless of motion. This is a feature Verkada markets as "Adaptive Quality Recording."

From Verkada's official product blog (publicly accessible at https://www.verkada.com/blog/recording-in-adaptive-quality/):

> **"The standard quality video retention is unaffected by motion and is recorded continuously up to the designated retention of 15, 30, 60, 90, 120 or 365 days."**

> "Our cameras record video in both high and standard quality streams simultaneously. Standard quality video is recorded up to the amount of retention specified by the customer — 30 days for most of our deployments. If motion is detected within a scene, our cameras also save high quality footage to the onboard storage."

There is no "motion only" mode in Verkada's product line. Every Verkada camera records two simultaneous streams:

1. **Standard Quality (SQ)**: always-on, continuous, 24/7 recording
2. **High Quality (HQ)**: motion-triggered additional capture layered on top of the continuous SQ stream

The "motion activated" claim in the March 30 letter does not describe how Verkada cameras function. Verkada's own documentation, on Verkada's own website, directly contradicts it.

## What the Mitchell and Company Contract Specifies

The signed contract in the Town's CORA response lists five camera models, each with "30 days retention" in the specification. Those models are:

- **CF81-E Fisheye Camera**
- **CH52-E Multisensor Camera**
- **CB52-E Bullet Camera**
- **CM42 Mini Dome Camera**
- **CF83-E Fisheye Camera**

Verkada's product pages and datasheets for each of these models explicitly list "Adaptive quality, capturing both standard and high quality streams" as a feature. The "30 days retention" on the Mitchell quote refers to the retention of the continuous Standard Quality stream, per Verkada's documentation. It does not mean "30 days of motion events." It means 30 days of continuous 24/7 footage.

Source: [[cora-c26-09-verkada-audit-logs|CORA C 26-09 Response]], pages 3-8 (signed Mitchell and Company quote).

## What the Town's Device Configurations Show

The CORA response includes 16 separate device configuration screenshots from the Town's Verkada Command admin panel, one for each camera. Every screenshot shows the same configured values:

- **Max Retention Days: 30 days**
- **Cloud Backup: Earliest [date] to Latest [date]** — typically showing exactly 30 days of continuous backup data

For example, the Bulk Fill Station camera screenshot shows:

> Cloud Backup: Earliest: 2/24/2026, 1:01 PM MST | Latest: 3/26/2026, 11:48 AM MDT

That is a 30-day continuous range ending at the time the screenshot was taken. Two cameras (WTP Front and WTP Interior) show "Cloud Backup: Not Enabled" — meaning they record locally but not to cloud. Either way, they record continuously, not on motion.

Source: [[cora-c26-09-verkada-audit-logs|CORA C 26-09 Response]], camera configuration screenshots.

## What the Audit Log Shows

In six months of operation, the Town's Verkada system recorded:

| Event type | Count | What it means |
|---|---|---|
| `LIVE_STREAM_START` | **21,245** | A user opened a live camera feed |
| `LIVE_STREAM_END` | 21,214 | A live camera feed was closed |
| `VIDEO_HISTORY_M3U8` | 1,964 | A user scrubbed through recorded footage |

21,245 live stream events in six months is roughly **115 per day**. Every one of those is a deliberate user action: opening a live camera view in the Verkada Command admin panel.

Additionally, the `VIDEO_HISTORY_M3U8` events (1,964 instances) prove that users can scrub back through any moment in the 30-day retention window. In the detailed event records, the `start_time` field on some of these events points to specific timestamps the user scrubbed to. Those timestamps are continuous across the retention window. If the cameras were motion-activated, gaps would appear where no motion had been detected. Instead, users are able to scrub to any moment in the past 30 days and play footage.

Source: [[cora-c26-09-verkada-audit-logs|CORA C 26-09 Response]], audit log XLSX files. Raw files at `raw/documents/cora-requests/c26-09-response/`.

## The Plain-English Interpretation

**A motion-activated camera records only when motion is detected.** It does not have a continuous 24/7 feed. It does not accumulate 30 days of footage regardless of what happens in front of it. It does not support a live stream that users can open and watch at any time.

**Verkada cameras do all three.** They record 24 hours a day, 7 days a week, on a continuous Standard Quality stream that is "unaffected by motion" in Verkada's own words. They save an additional High Quality clip when motion happens, but the continuous stream exists regardless. Users can open a live feed of any camera at any time. They have done so 21,245 times in six months.

**The board's March 30 statement that these are "motion activated cameras" is contradicted by three independent sources:**

1. Verkada's own publicly available product documentation
2. The Mitchell and Company contract signed by the Town Administrator
3. The Town's own audit log and device configuration data

Every one of those sources was produced or is publicly verifiable. No disputed fact is required to establish that the claim is inaccurate.

## What Would Change This Analysis

- If Verkada updated its product documentation to state that its cameras support a "motion only" recording mode. (They do not, and the "Adaptive Quality Recording" feature is Verkada's flagship recording model.)
- If the Town produced evidence that the cameras had been specifically configured to override the default Adaptive Quality Recording behavior. (No such configuration change appears in the audit log, and the device configuration screenshots show the default continuous recording is active.)

## See Also

- [[cora-c26-09-verkada-audit-logs]] — The CORA response source
- [[verkada-usage-patterns]] — Full statistical analysis
- [[final-published-letter]] — The board letter being fact-checked
- [[facial-recognition-proof]] — The other false claim in the same letter
- [[surveillance]] — Issue overview

## External Sources Cited

- Verkada, "Recording in Adaptive Quality" (blog): https://www.verkada.com/blog/recording-in-adaptive-quality/
- Verkada product page for CM42 Mini Dome: https://www.verkada.com/security-cameras/mini/cm42/
- Verkada CM42 datasheet (PDF): https://docs.verkada.com/docs/video-security-cm42-datasheet.pdf
