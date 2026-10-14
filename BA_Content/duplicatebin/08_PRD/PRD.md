# 📱 Product Requirements Document (PRD)

> **Product Name:** Duplicate Bin  
> **Document Code:** PRD-DB-2026-V1.0  
> **Product Lead / Owner:** Senior Product Analyst / Technical BA  
> **Target Release:** Version 0.2.0 Desktop + Version 1.0.0 SaaS Relay  
> **Status:** Approved Baseline  

---

## 1. Product Vision & Value Proposition

**Product Vision:**  
*"To become the world's most trusted, performant, and privacy-respecting storage optimization ecosystem, empowering individuals and distributed enterprise teams to effortlessly reclaim digital storage, slash recurring cloud costs, and govern unstructured data without risk of data loss."*

**Value Proposition:**  
Duplicate Bin solves digital storage clutter by combining ultra-fast local cryptographic detection with the oversight of a centralized cloud management platform. Unlike legacy utilities that risk permanent file deletion, Duplicate Bin introduces a guaranteed reversible quarantine system and 8 automated selection heuristics, turning hours of agonizing file reviews into a 10-second background operation.

---

## 2. Target Personas & User Journey Maps

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ PERSONA 1: Elena - The Commercial Photographer (Prosumer)                   │
├─────────────────────────────────────────────────────────────────────────────┤
│ • Demographics: 29, Freelance Media Creator, 8 TB Local NVMe + Google Drive │
│ • Core Pain: Storage limit warnings, duplicates scattered across 20 folders │
│ • Goal: Fast visual identification of duplicate shots; keep RAW, trash JPEG │
│ • Favorite Feature: Drag & Drop Ingestion + "Keep Best Quality" Strategy    │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ PERSONA 2: Marcus - The Digital Agency IT Lead (Enterprise B2B)             │
├─────────────────────────────────────────────────────────────────────────────┤
│ • Demographics: 41, Systems Administrator managing 35 creative workstations │
│ • Core Pain: Shared office NAS filling up; employees hoarding duplicates    │
│ • Goal: Centralized visibility; automated remote scans without user friction│
│ • Favorite Feature: 6-Digit Device Pairing + Cloud SaaS Dashboard Telemetry │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Product Goals & Non-Goals

### Product Goals (What We Are Building)
1. **Unrivaled Scan Velocity:** Scan 10,000 files in < 20 seconds, maintaining 3-5x faster rescans through persistent SQLite hash caching.
2. **Absolute Data Protection:** 100% rollback capability via non-destructive quarantine archiving.
3. **Frictionless Onboarding:** Sub-60-second time-to-first-scan with zero-configuration drag-and-drop.
4. **Hybrid Monetization Engine:** Profitable, low-friction pay-as-you-go credit model ($4.99/100GB) and enterprise team tiers ($29 - $99/mo).

### Non-Goals (Explicitly Out of Scope for Current Cycle)
- We are **not** building a cloud backup/storage provider (we optimize existing storage, not host files).
- We are **not** building a mobile photo gallery app (focus remains on desktop and networked NAS storage).
- We are **not** implementing destructive permanent file wiping by default (safety quarantine is mandatory).

---

## 4. Feature Prioritization Framework (MoSCoW)

Every feature in the product backlog is prioritized with explicit business and engineering rationale:

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ MUST HAVE (Mandatory for Product Viability)                                  │
├──────────────────────────────────────────────────────────────────────────────┤
│ • Multi-Algorithm Cryptographic Hashing (SHA-256, BLAKE2b, MD5)              │
│   Rationale: Absolute mathematical proof of duplicate identity is non-negotiable.
│ • Two-Pass Size Pre-Filter Engine                                            │
│   Rationale: Prevents system crashing and scales scanning to 100k+ files.   │
│ • Safe Archive Quarantine & 1-Click Restore                                  │
│   Rationale: Overcomes the primary psychological barrier to adoption: fear. │
│ • Core Selection Strategies (Keep Newest, Oldest, Best Quality)             │
│   Rationale: Eradicates manual checkbox fatigue.                             │
│ • Device Pairing & Telemetry Ingestion (SaaS Backend)                       │
│   Rationale: Foundational pipeline for corporate SaaS monetization.          │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│ SHOULD HAVE (High-Value User Experience Enhancements)                        │
├──────────────────────────────────────────────────────────────────────────────┤
│ • Drag-and-Drop Folder Ingestion Widget                                      │
│   Rationale: Modernizes desktop interaction; reduces cognitive friction.    │
│ • Persistent SQLite WAL Hash Cache                                           │
│   Rationale: Drives 80% latency reduction on repeat scans.                   │
│ • Side-by-Side Visual Previews (Images, Audio, PDF)                          │
│   Rationale: Provides reassuring visual proof before user confirms cleanup. │
│ • Centralized SaaS Storage Savings Dashboard                                 │
│   Rationale: Gives IT buyers proof of ROI to justify subscription renewal.  │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│ COULD HAVE (Delighters & Power-User Features)                                │
├──────────────────────────────────────────────────────────────────────────────┤
│ • 13 Global Keyboard Shortcuts (Ctrl+O, Ctrl+S, F1, etc.)                   │
│   Rationale: Appeals to developer and power-user prosumer workflows.        │
│ • Modular Plugin Architecture (Desktop Notifications, Stats Logger)         │
│   Rationale: Fosters community open-source extensions.                       │
│ • Multi-Language Support (English, Spanish, French, German, Chinese, Japanese)│
│   Rationale: Expands international distribution reach.                       │
└──────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│ WON'T HAVE (Deferred to Future Milestones)                                   │
├──────────────────────────────────────────────────────────────────────────────┤
│ • Direct Google Drive / Dropbox Remote API Scanning                          │
│   Rationale: Requires extensive OAuth token maintenance and cloud rate-limit │
│   handling; users currently achieve this via local virtual sync folders.    │
│ • Perceptual Hashing (pHash) for Resized Images                             │
│   Rationale: Requires complex AI image processing dependencies (`imagehash`).│
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Success Metrics & Product KPIs

| Objective | Metric Indicator | Baseline | Target (v0.2.0 / v1.0.0) |
|---|---|---|---|
| **Performance** | Initial Scan Time (10k files) | 60+ seconds (Competitors) | **18.7 seconds** |
| **Efficiency** | Rescan Time (10k files cached) | 45 seconds | **4.2 seconds** |
| **Safety** | User Support Tickets for Data Loss | Industry average 0.5% | **0.0%** (Safe Archive) |
| **Monetization** | Credit Pack Conversion Rate | N/A (New release) | **12%** of active users |
| **Engagement** | Average Storage Reclaimed per Scan | 0 MB | **15 - 35 GB** |

---

## 6. Release & Go-To-Market Strategy

### Phase 1: Community Desktop Open-Source Launch (v0.2.0)
- Release native packages: Debian repository `.deb` package (187 KB), Windows standalone `.exe`, and macOS universal binary.
- Position as a fast, beautiful, privacy-first desktop utility to build creator goodwill and gather bug telemetry.

### Phase 2: Hybrid SaaS Beta (v1.0.0)
- Soft launch web portal and FastAPI cloud relay.
- Offer all desktop users 10 GB of free cloud-coordinated deduplication credits.
- Introduce $4.99 / 100 GB Pay-As-You-Go credit packs for high-volume creators.

### Phase 3: Enterprise Team Tier Expansion
- Launch Team Starter ($29/mo) and Business Premium ($99/mo) with centralized multi-device pairing and fleet-wide storage reporting.
