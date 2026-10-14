# 👥 Phase 3: Stakeholder Analysis & Power-Interest Matrix

> **Document Code:** SA-001  
> **Project:** Duplicate Bin Ecosystem  
> **Methodology:** PMI Standard Stakeholder Engagement & Mendelow Power-Interest Grid  
> **Target Audience:** Product Management, Delivery Team, Interview Evaluation Panels  

---

## 1. Stakeholder Identification & Profile Matrix

Every stakeholder identified below is directly derived from actual roles, workflows, components, and documentation in the Duplicate Bin repository.

| Stakeholder ID | Stakeholder Name & Role | Organizational Domain | Primary Responsibilities | Key Goals & Expectations | Core Pain Points | System Touchpoints |
|---|---|---|---|---|---|---|
| **SH-01** | **Content Creator / Prosumer** (Elena) | External Customer (B2C) | Managing personal high-resolution photos, raw videos, and local design files. | Quickly reclaim SSD storage; ensure zero loss of valuable original assets; simple visual comparison. | Fear of deleting the wrong file; sluggish manual file organization; cloud storage limit alerts. | PySide6 Desktop GUI, Drag & Drop zone, File Preview widget, Archive Restore button (`Ctrl+Z`). |
| **SH-02** | **Corporate IT Administrator** (Marcus) | Enterprise Customer (B2B) | Maintaining workstations, network attached storage (NAS), and office server capacity. | Automated scheduled scans; zero manual intervention; low CPU/RAM overhead on workstations. | Disk full crashes on shared file servers; lack of central visibility; script maintenance overhead. | Headless CLI (`run.py scan`), Service Daemon (`run.py service`), YAML config (`~/.config/duplicate-bin/config.yaml`). |
| **SH-03** | **Business Owner / Agency Director** (Sophia) | Enterprise Customer (B2B) | Approving software budgets and managing cloud storage operational expenses. | Reduce cloud storage bills (Google Drive, Dropbox); track aggregate company storage savings. | Unpredictable escalating monthly SaaS storage fees; lack of ROI visibility. | Central SaaS Web Portal (`/api/dashboard/stats`), Credit Purchase Screen (`/api/billing/buy-credits`). |
| **SH-04** | **Security & Compliance Auditor** (David) | Enterprise Governance | Ensuring enterprise data protection, privacy compliance, and zero data leakage. | Guarantee that company files are not uploaded to unauthorized cloud servers; prevent path injection. | Third-party cloud apps exfiltrating proprietary IP; accidental deletion of audit records. | Local-only hash architecture, System Directory Protection (`UNSAFE_DIRS`), JSON Checkpoint integrity. |
| **SH-05** | **Product Owner (PO)** | Internal Delivery | Prioritizing backlog, defining release roadmaps, and steering monetization models. | Achieve product-market fit; convert free desktop users to SaaS subscribers; maximize usability. | Balancing free open-source feature expectations against SaaS monetization gates. | JIRA Backlog, Product Roadmap (`SAAS_ANALYSIS_AND_STRATEGY.md`), Feature Checklist (`FEATURES_COMPLETE.md`). |
| **SH-06** | **Lead Software / Solution Architect** | Internal Delivery | Designing engine architecture, threading models, and cross-platform packaging. | Sub-second hash caching; thread-safe Qt progress reporting; clean API boundary separation. | Python Global Interpreter Lock (GIL) limits; cross-platform packaging quirks (Debian vs PyInstaller). | Core Engine (`detection.py`, `hashing.py`), FastAPI SaaS (`main.py`), Build Scripts (`build_windows.py`). |
| **SH-07** | **QA / Test Engineer** | Internal Delivery | Validating detection accuracy, performance benchmarks, and regression suites. | 100% detection accuracy; zero false positives; automated stress testing across 100k files. | Mocking massive file systems; testing race conditions in multi-threaded file traversal. | Pytest suite (`tests/`), Integration Scripts (`verify_saas_integration.py`, `verify_backend.py`). |
| **SH-08** | **Senior Technical Business Analyst (Candidate)** | Internal Delivery | Eliciting requirements, modeling business processes, documenting BRD/FRD, and bridging tech-business gap. | Complete requirement traceability; verifiable KPI formulas; transparent risk management. | Scope creep between desktop utility and full enterprise SaaS cloud synchronization. | Requirements Catalog, RTM, Process Flow Diagrams, Data Dictionary, API Specifications. |

---

## 2. Mendelow's Power-Interest Grid

```
HIGH POWER  │
            │  [KEEP SATISFIED]                  [MANAGE CLOSELY]
            │  - Security & Compliance (SH-04)   - Product Owner (SH-05)
            │  - Corporate IT Admin (SH-02)      - Business Owner / Director (SH-03)
            │
            ├─────────────────────────────────────────────────────────────
            │  [MONITOR / MINIMAL EFFORT]        [KEEP INFORMED]
            │  - External Package Maintainers    - Content Creators / Prosumers (SH-01)
            │                                    - QA / Test Engineers (SH-07)
            │                                    - Lead Architect (SH-06)
            │
LOW POWER   └─────────────────────────────────────────────────────────────
            LOW INTEREST                                     HIGH INTEREST
```

### Strategic Engagement Recommendations:
1. **Manage Closely (High Power, High Interest):**
   - **Business Owner (SH-03):** Provide weekly ROI dashboards demonstrating storage megabytes saved converted into financial dollar savings.
   - **Product Owner (SH-05):** Align on sprint priorities using MoSCoW methodology; track credit monetization metrics.
2. **Keep Satisfied (High Power, Low Interest):**
   - **Security Auditor (SH-04):** Provide formal architecture proofs demonstrating that file contents are hashed strictly on the local machine and never transmitted over the network.
   - **Corporate IT Admin (SH-02):** Deliver robust CLI exit codes, silent background daemon options, and zero-dependency packaging.
3. **Keep Informed (Low Power, High Interest):**
   - **Content Creators (SH-01):** Solicit usability feedback via telemetry and community forums; ensure UI provides instant visual reassurance (thumbnails, undo buttons).

---

## 3. Stakeholder RACI Matrix

| Project Capability / Deliverable | SH-01 (Prosumer) | SH-02 (IT Admin) | SH-03 (Owner) | SH-04 (Security) | SH-05 (PO) | SH-06 (Architect) | SH-07 (QA) | SH-08 (BA) |
|---|---|---|---|---|---|---|---|---|
| **Business Case & ROI Definition** | I | C | **A** | I | C | I | I | **R** |
| **Core Detection & Hashing Engine** | I | C | I | C | C | **A / R** | C | C |
| **Selection Heuristics & Rules** | C | C | I | I | **A** | C | C | **R** |
| **Safe Archive & Rollback System** | C | C | I | **A** | C | R | C | R |
| **SaaS Pairing & Telemetry Backend** | I | C | C | C | **A** | R | C | R |
| **SaaS Credit & Billing Engine** | I | I | **A** | I | C | R | C | R |
| **Security & Path Hardening** | I | C | I | **A** | I | R | C | C |
| **UAT & Acceptance Sign-off** | C | C | **A** | C | **A** | I | C | **R** |

*Legend:* **R** = Responsible, **A** = Accountable, **C** = Consulted, **I** = Informed.
