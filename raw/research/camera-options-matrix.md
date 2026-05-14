# Town of Paonia — Closed-Loop Camera Options Matrix

**Prepared:** 2026-05-14
**Context:** At the May board meeting the Town agreed to remove the Verkada cameras and
explore putting a camera back on Town infrastructure — on the condition that it be
"closed loop," with the Town keeping total custody and ownership of the footage. This
matrix lays out what actually exists, what the traps are, and a recommendation.

---

## What the community is actually objecting to

It is worth being precise, because it changes the answer. The objection to Verkada was
**not** that it was Chinese hardware (it isn't — Verkada is a US company and is NDAA
compliant). The objection was:

- **Cloud custody** — footage lived on Verkada's servers, not the Town's.
- **Third-party access** — Verkada staff, and in the 2021 breach *hackers*, could see
  feeds. ~150,000 Verkada cameras were accessed in that breach.
- **Subscription lock-in** — ongoing license fees; stop paying and the system degrades.
- **No local audit** — the Town could not independently verify who had looked at what.

So the test for a replacement is **custody**, not brand. "NDAA compliant" alone does
**not** satisfy the community — Verkada was NDAA compliant. The bar is: *the footage
never leaves Town-owned hardware, and no outside party can reach it.*

NDAA compliance still matters as a **separate** procurement guardrail (see traps below),
but it is not the headline.

---

## The three traps (read this before buying anything)

1. **Don't replace Verkada with Dahua/Hikvision.** The cheap "NDAA compliant" kits on
   Amazon are frequently rebadged Chinese-government-linked hardware. **Amcrest is made
   by Dahua and is NOT NDAA compliant.** Banned makers under NDAA §889: Dahua, Hikvision,
   Huawei, Hytera, ZTE, and their affiliates/OEM rebrands. Buying this gear would be a
   worse optic than Verkada and could create a federal-grant compliance problem if any
   federal money ever touches the Town's IT budget.

2. **"No cloud" is a configuration, not a product.** Almost every consumer camera tries
   to phone home. Reolink cameras, for example, send a packet to Reolink's AWS server
   roughly every 10 seconds unless you block it at the firewall. A camera marketed as
   "local storage" will still beacon out if you give it a path to the internet. The
   air-gap has to be **enforced on the network** — either no network at all, or a
   physically/logically isolated segment with no route to the WAN.

3. **Remote viewing is the thing that breaks the air-gap.** "Watch it from your phone"
   and "closed loop" are in direct tension. Every remote-access feature is attack
   surface. Recommendation: on-site monitor only. If the Town insists on remote viewing,
   it should be over a Town-controlled VPN into the isolated segment — never a
   manufacturer's app — and that decision should be made deliberately, in public.

---

## The options matrix

| | **Tier 0 — Standalone SD-card** | **Tier 1 — Local PoE + NVR (air-gapped LAN)** | **Tier 2 — Self-hosted open-source NVR** | **Tier 3 — Enterprise on-prem** |
|---|---|---|---|---|
| **What it is** | A camera that records to a microSD card inside it. No network. You physically pull the card. | PoE cameras hard-wired to a Network Video Recorder, on a network segment with **no internet route**. NVR plugs into a monitor by HDMI. | NDAA-compliant ONVIF/RTSP cameras feeding open-source software (Frigate or Blue Iris) on a small Town-owned PC. | Axis cameras recording to an on-prem recorder / VMS. The "real infrastructure" answer. |
| **Custody** | Total. Footage is on a card in a box the Town owns. Nothing to hack remotely. | Total, *if* the network isolation is done right. Footage on the NVR's drive on Town premises. | Total. Town owns the box, the drives, and — uniquely — the *source code*. Fully auditable. | Total. Footage on Town-owned recorder. Vendor support contract optional, not required for custody. |
| **Cloud exposure** | None. Truly air-gapped by design. | None *if* air-gapped; high if someone lazily plugs the kit into Town wifi. | None. Frigate has no cloud component at all. | None required. Axis supports fully offline operation. |
| **NDAA** | Depends on camera — pick a compliant brand. | Depends on camera — Reolink is compliant; avoid Amcrest. | Use Reolink RLC-series or other compliant ONVIF cameras. | Axis is 100% NDAA compliant, used by US federal / critical infrastructure. |
| **Live monitoring** | No. You walk to the camera to review. | Yes — on a monitor at the NVR location. | Yes — local web UI on the Town network. | Yes — local VMS workstation. |
| **Continuous recording** | Motion clips only, limited by card (~128 GB/camera). | Yes — 24/7, 4 TB+ shared storage, weeks of retention. | Yes — sized to whatever drive you install. | Yes — enterprise retention. |
| **Cost (rough)** | $60–200/camera, no other hardware. ~$300–500 for 3 cameras. | $500–900 all-in for an 8-channel kit + 4 TB (e.g. Reolink PoE kit). | ~$150–250 mini-PC (Intel N100) + $60–120/camera + SSD. ~$600–1,000 for 4–6 cameras. | $500–800/camera + recorder + possible VMS license. $3,000–8,000+. |
| **Setup difficulty** | Trivial. Anyone can do it. | Moderate — someone has to enforce the network isolation correctly. | Higher — needs someone comfortable with a Linux box. Good fit for the Town's IT group, with a recipe handed to them. | Professional install, typically a dealer. |
| **Maintenance burden** | Swap/clear cards; cards fail and fill. | Low. Check drive health occasionally. | Moderate — software updates applied manually (which is fine, and good for air-gap). | Low, but tied to a vendor relationship. |
| **Best for** | 1–3 cameras, maximum trust, minimum complexity. Fastest to deploy. | The practical Town-wide answer: real coverage, real retention, modest budget. | When transparency itself is the goal — the Town can publish the config and anyone can audit it. | If the site is genuinely critical (e.g. water/utility) and there's budget. |
| **Weak points** | No live view; manual retrieval; weak chain-of-custody across many cameras; cards are fragile. | One lazy network mistake recreates the Verkada problem. Discipline required. | Needs a technical owner. If that person leaves, the Town needs a successor. | Cost. Probably overkill for Paonia. |

---

## Recommendation

**Lead with Tier 1, and offer Tier 0 as the "start tomorrow" option.**

- **Tier 0** is the answer if the Town wants something up *immediately* with zero
  argument about security — a standalone SD-card camera literally has no network attack
  surface. Good for one or two specific spots. It is the cheapest way to prove the
  concept and rebuild trust.

- **Tier 1** is the right Town-wide answer: PoE cameras on a dedicated recorder, on a
  network island with no door to the internet, viewed on a monitor at Town Hall or the
  shop. It gives real 24/7 coverage and weeks of retention for well under $1,000, and
  the footage never touches anyone else's hardware. **The single point of discipline:**
  the install must be done by someone who understands network isolation — not just
  unboxed and plugged into the nearest jack.

- **Tier 2 (Frigate)** is the one to put in front of the Town's IT group as the
  *upgrade* path, because it answers the transparency question better than anything
  else: it is open-source software running on a Town-owned PC, with no vendor, no
  subscription, and no cloud account in existence. The Town could literally publish its
  configuration. If IT is comfortable running a Linux box, this is the strongest
  long-term posture.

- **Tier 3 (Axis)** belongs in the matrix so the Town sees the full range, but it is
  likely more than Paonia needs to spend.

**Whatever hardware is chosen, the Town also needs a written policy** — retention
period, who may view footage, how access is logged, and how footage is produced in
response to a CORA request. Local custody is actually an *advantage* here: the Town can
answer records requests directly instead of going through a vendor. The policy should be
adopted in public, the same meeting the hardware is approved.

---

## One-paragraph version for the Board

> The Town can put cameras back on its infrastructure without any of the problems that
> got the Verkada system removed. The footage stays on hardware the Town owns and
> controls, with nothing reaching the cloud and no subscription. The simplest version is
> a standalone camera that records to a memory card inside it — no network at all, so
> there is nothing to hack. The practical Town-wide version is wired cameras feeding a
> local recorder on an isolated network, viewable on a monitor at Town Hall, for under
> $1,000. The key requirements are: buy NDAA-compliant cameras (not the cheap rebranded
> Chinese gear), enforce the network isolation properly, skip remote phone-viewing, and
> adopt a written footage-retention and access policy at the same meeting.

---

## Sources

- [NDAA Compliant Security Cameras: 2026 Guide and List — Pelco](https://www.pelco.com/blog/ndaa-compliant-cameras)
- [NDAA Video Surveillance Ban / Blacklists Guide — IPVM](https://ipvm.com/reports/ndaa-guide)
- [Is Reolink Device NDAA Compliant? — Reolink Support](https://support.reolink.com/hc/en-us/articles/48244867426329-Is-Reolink-Device-NDAA-Compliant/)
- [Amcrest vs Reolink (Amcrest = Dahua-manufactured) — SmartHomePerfected](https://www.smarthomeperfected.com/amcrest-vs-reolink/)
- [Spy Alert! Reolink products phone home every ~10s — Shinobi Systems](https://medium.com/@ShinobiSystems/spy-alert-reolink-products-have-a-security-hole-de1528a221c3)
- [New Reolink P2P Vulnerabilities — Nozomi Networks](https://www.nozominetworks.com/blog/new-reolink-p2p-vulnerabilities-show-iot-security-camera-risks)
- [Frigate NVR — recommended hardware](https://docs.frigate.video/frigate/hardware/)
- [100% Local UniFi Protect: NVR cameras without cloud (air-gapped guide)](https://airgapped.hashnode.dev/deploying-and-managing-ubiquiti-unifi-network-video-recorder-unvr-and-cameras-without-internet-connectivity-fullyair-gapped)
- [NDAA Compliance — Axis Communications](https://www.axis.com/en-us/forms/national-defense-authorization-act-ndaa-compliance)
- [Best Local Storage Security Cameras of 2026 — ModemGuides](https://www.modemguides.com/blogs/modemguides-blog/best-local-storage-security-cameras)
