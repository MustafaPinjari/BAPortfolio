# 🏢 Domain Case Study 1: Enterprise NAS & Shared Storage Optimization

> **Document Classification:** **[SIMULATED BA CASE STUDY — DERIVED FROM PROJECT DOMAIN]**  
> **Domain:** Enterprise Storage Governance, Network-Attached Storage (NAS), IT Infrastructure  
> **Target Scenario:** A 150-person architectural engineering firm running out of capacity on an on-premise 40 TB Synology NAS.  

---

## 1. Case Study Overview & Business Problem

### Business Context
ArchStudio Partners operates 150 design workstations collaborating over a shared 40 TB Network-Attached Storage (NAS) array. Designers and CAD modelers frequently copy multi-gigabyte BIM (Building Information Modeling) assets, 3D render textures, and site surveys across project folders (`Project_A/Survey_2026/` and `Project_B/Site_Data/`). 

### The Problem
The primary NAS array reached **94% capacity warning thresholds**. Purchasing an additional 40 TB expansion shelf carries a hardware and licensing cost of **$18,500**, plus ongoing maintenance. IT management suspected that between 20% and 30% of consumed space consisted of identical duplicate revisions and archived staging folders.

---

## 2. Stakeholder Analysis

| Stakeholder | Role | Primary Goal | Core Concern |
|---|---|---|---|
| **Head of IT Infrastructure** | Sponsor / Owner | Reclaim 8+ TB of disk space to avoid purchasing an $18,500 expansion shelf. | Accidental deletion of active project blueprints or legal compliance archives. |
| **Lead BIM Architect** | End User / Subject Matter Expert | Ensure master project models (`.rvt`, `.dwg`) remain 100% accessible. | Disruption of active project links or broken file references. |
| **Senior Systems Administrator** | Technical Implementer | Run non-disruptive, scheduled background scans without overloading network SMB shares. | Network bandwidth saturation during daytime office hours. |
| **Technical Business Analyst** | Requirements & Delivery Lead | Define selection heuristics, safety quarantine boundaries, and verifiable audit reports. | Resistance from design teams afraid of losing draft files. |

---

## 3. As-Is vs. To-Be Process & Gap Analysis

```mermaid
flowchart LR
    subgraph "As-Is Manual Inefficiency"
        A[Disk Warning 94%] --> B[IT Admin sends all-hands email asking staff to clean drives]
        B --> C[Staff ignores email due to project deadlines]
        C --> D[IT purchases expensive $18,500 NAS hardware upgrade]
    end

    subgraph "To-Be Automated Governance (Duplicate Bin)"
        E[Duplicate Bin CLI Daemon scheduled via cron] --> F[Two-Pass O(n) Size Pre-Filter on SMB share]
        F --> G[Persistent Hash Cache avoids network re-reads]
        G --> H[Automated Selection: Keep Newest Master]
        H --> I[Safe Quarantine Archive with 30-day auto-expiry]
        I --> J[Reclaim 9.2 TB space; NAS capacity drops to 71%]
    end
```

---

## 4. Business & Functional Requirements (BRD / FRD Summary)

- **BR-NAS-01:** Reclaim at least 15% (6 TB) of storage on the primary engineering share within 30 days.
- **BR-NAS-02:** Provide 100% non-destructive rollback for quarantined assets during a 30-day grace period.
- **FR-NAS-01 (Headless Scheduled Scans):** The system shall execute headless CLI deduplication (`duplicate-bin-cli scan /mnt/arch_share`) triggered via Linux cron at 02:00 AM Sundays.
- **FR-NAS-02 (Selection Heuristic):** The system shall automatically select duplicate files residing in `/Archive/` or `/Drafts/` for removal, preserving master copies in `/Production/` (`KEEP_SHORTEST_PATH` or custom path priority).
- **FR-NAS-03 (Audit Manifest):** The system shall generate a cryptographically verified CSV audit report listing original file paths, SHA-256 hashes, file sizes, and quarantine destination paths.

---

## 5. Agile User Stories & Gherkin Acceptance Criteria

```gherkin
Feature: Enterprise NAS Storage Reclamation
  As an IT Infrastructure Lead
  I want to schedule automated duplicate detection across shared network shares
  So that I can reclaim terabytes of wasted storage without manual employee effort.

  Scenario: Scheduled off-hours network deduplication
    Given the Duplicate Bin CLI configured to scan "/mnt/arch_share" with 4 worker threads
    When the scheduled cron job triggers at 02:00 AM on Sunday
    Then the engine must query the SQLite hash cache to bypass unchanged files
    And write all duplicate clusters and potential savings to an executive CSV report
    And network bandwidth consumption must remain below 150 MB/s.
```

---

## 6. UAT Test Plan & RTM Mapping

| Test Scenario | Traceable Req | Test Data | Expected Outcome | Status |
|---|---|---|---|---|
| **UAT-NAS-01: Large SMB Scan** | FR-NAS-01 | 5 TB share with 120,000 files | Scan completes in < 15 minutes; cache populates. | **PASSED** |
| **UAT-NAS-02: Path Priority Rule** | FR-NAS-02 | Duplicate files in `/Prod/` and `/Drafts/` | File in `/Prod/` kept; file in `/Drafts/` archived. | **PASSED** |
| **UAT-NAS-03: Quarantine Recovery** | BR-NAS-02 | 100 GB quarantined CAD models | Full restoration to original SMB folders via script. | **PASSED** |

---

## 7. Business Outcomes & Measurable ROI

- **Baseline Consumed Capacity:** $37.6\text{ TB}$ ($94\%$ of $40\text{ TB}$).
- **Measured Recovered Space:** $\mathbf{9.2\text{ TB}}$ of redundant CAD drafts and render textures reclaimed.
- **After-State Consumed Capacity:** $28.4\text{ TB}$ ($71\%$ utilization).
- **Direct Financial Savings:** Avoided immediate purchase of **$18,500** hardware expansion shelf.
- **Labor Efficiency:** Saved an estimated **450 hours** of billable architect time previously lost to manual drive cleanup.

---

## 8. Interview Preparation: How to Defend This Case Study

1. **How did you identify the business problem?**  
   *"During stakeholder interviews with the Head of IT, I discovered the company faced a looming $18,500 capital expenditure because their shared NAS was at 94% capacity. Instead of reflexively buying more hardware, I conducted a data audit demonstrating that over 20% of their consumed space was unmanaged duplicate project revisions."*
2. **How did you address the architects' fear of losing critical drawings?**  
   *"I mandated our Safe Quarantine Archive architecture. Rather than wiping files, we moved duplicates to a dedicated, compressed archive volume with an automated 30-day retention window. If an architect discovered a missing link, they could restore the file in seconds. This completely eliminated stakeholder pushback."*
