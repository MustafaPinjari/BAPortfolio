# 📸 Domain Case Study 2: Prosumer Media Asset Governance & Quality Heuristics

> **Document Classification:** **[SIMULATED BA CASE STUDY — DERIVED FROM PROJECT DOMAIN]**  
> **Domain:** Prosumer Digital Asset Management, Commercial Photography, Media Workflows  
> **Target Scenario:** A boutique wedding and commercial photography studio managing 12 TB of high-resolution RAW and JPEG imagery across local NVMe storage and Google Drive.  

---

## 1. Case Study Overview & Business Problem

### Business Context
"Lumina Photo Studios" shoots 60 commercial events per year. Each event generates 3,000 to 5,000 camera exposures shot in dual-slot mode (Slot 1: Sony `.ARW` RAW 45 MB; Slot 2: High-res JPEG 12 MB). Across editing, culling, client proofing, and social media exports, redundant versions of the same shots proliferate across folders (`Raw_Imports/`, `Cull_Round1/`, `Client_Web/`, `Final_Print/`).

### The Problem
The studio's 4 TB editing workstation SSDs were permanently full (> 95%), causing editing software (Adobe Lightroom / DaVinci Resolve) cache crashes. Furthermore, Google Drive storage tiers escalated from $9.99/mo to $49.99/mo per photographer. Manual file culling consumed an estimated **8 to 12 hours per week** of high-cost senior photographer time.

---

## 2. Stakeholder Analysis

| Stakeholder | Role | Primary Goal | Core Concern |
|---|---|---|---|
| **Studio Principal / Lead Photographer** | Business Owner / User | Reclaim local SSD speed and slash Google Drive subscription tiers. | Accidentally trashing pristine 45 MB RAW files or unedited camera originals. |
| **Associate Retoucher** | Production User | Fast, visual side-by-side inspection before marking files for removal. | Sluggish software with poor thumbnail previews or complex command lines. |
| **Technical Business Analyst** | Requirements Lead | Model "Keep Best Quality" heuristics, drag-and-drop ergonomics, and undo mechanics. | Edge cases where edited JPEGs have different crop dimensions than original RAW files. |

---

## 3. As-Is vs. To-Be Process & Gap Analysis

```mermaid
flowchart LR
    subgraph "As-Is Painful Workflow"
        A[Photoshoot finishes: 4,000 photos] --> B[Photographer spends 10 hours manually opening photos]
        B --> C[Manual guess: Which file is the master?]
        C --> D[Accidental deletion of RAW camera file]
        D --> E[Client demands print revision -> Disaster]
    end

    subgraph "To-Be Duplicate Bin Workflow"
        F[Drag folder onto DropZoneWidget] --> G[Intelligent Detection: O(n) Size Pre-Filter]
        G --> H[Selection Strategy: KEEP_BEST_QUALITY]
        H --> I[System auto-keeps 45MB RAW, marks 12MB JPEG duplicate]
        I --> J[Side-by-side preview verifies identical EXIF timestamps]
        J --> K[Safe Archive: 180 GB recovered in 45 seconds; Ctrl+Z active]
    end
```

---

## 4. Key Functional Requirements (FRD Summary)

- **FR-MEDIA-01 (Quality Hierarchy Rule):** When executing `KEEP_BEST_QUALITY`, uncompressed RAW formats (`.arw`, `.cr2`, `.nef`, `.dng`) shall rank above lossless formats (`.tiff`, `.png`), which shall rank above lossy formats (`.jpg`, `.webp`).
- **FR-MEDIA-02 (EXIF Metadata Validation):** The system shall extract and compare EXIF timestamps (`DateTimeOriginal`), camera model, and lens serial number to differentiate identical burst shots from exact file duplicates.
- **FR-MEDIA-03 (Side-by-Side Thumbnail Rendering):** The GUI preview widget shall render side-by-side visual image comparisons with zoom capability, bounded by an LRU cache of 200 thumbnails to protect RAM.
- **FR-MEDIA-04 (Drag-and-Drop Ingestion):** Users must be able to drag folders directly from macOS Finder or Windows Explorer onto the window to begin scanning.

---

## 5. Agile User Story & Gherkin Acceptance Criteria

```gherkin
Feature: Automated High-Quality Media Preservation
  As a commercial photographer
  I want the system to automatically select compressed web exports for removal while preserving original RAW negatives
  So that I can clean up client delivery folders without risking high-resolution master assets.

  Scenario: Automated selection of RAW over JPEG duplicate
    Given a duplicate group with "wedding_041.arw" (RAW, 48 MB) and "wedding_041.jpg" (JPEG, 6 MB)
    When I select the "KEEP_BEST_QUALITY" strategy
    Then "wedding_041.arw" must be preserved as the master file
    And "wedding_041.jpg" must be marked for safe archiving
    And the preview pane must display camera EXIF metadata confirming matching shutter timestamp.
```

---

## 6. Business Outcomes & Measurable Impact

- **Storage Reclaimed:** Reclaimed **1.8 TB** of redundant JPEG exports across 3 editing workstations.
- **Cloud Spend Reduction:** Downgraded 3 Google Workspace accounts, saving **$1,440 annually**.
- **Labor Efficiency:** Reduced weekly culling time from **10 hours down to 15 minutes** per event.
- **Data Protection:** Zero loss of original camera RAW files across 60 completed client projects.

---

## 7. Interview Preparation: How to Defend This Case Study

1. **How did you handle user skepticism regarding automated image deletion?**  
   *"Photographers are terrified of automated tools deleting their art. I addressed this with two critical BA design choices: first, the **Side-by-Side Preview Pane** with EXIF metadata comparison (showing exact shutter speed, aperture, and camera serial number); second, the **Safe Archive Quarantine with instant `Ctrl+Z` undo**. Users tested it on sample folders and immediately trusted the platform."*
2. **What technical constraint did you uncover during requirements definition?**  
   *"We discovered that loading 45 MB RAW photos into memory for thumbnail previews rapidly caused Out-Of-Memory crashes in Qt. I formulated Non-Functional Requirement NFR-003, mandating an **LRU Cache bounded at 200 pixmaps**, and using Pillow thumbnail decoders rather than loading full-resolution sensor bitmaps into RAM."*
