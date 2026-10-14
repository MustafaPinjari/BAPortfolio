# 📄 Business Requirements Document (BRD)

> **Project Title:** Duplicate Bin Enterprise & SaaS Ecosystem  
> **Document Identifier:** BRD-DB-2026-V1.0  
> **Prepared By:** Senior Business Analyst / Technical BA  
> **Target Approvers:** Product Owner, Head of Engineering, Executive Sponsor  
> **Release Target:** Version 0.2.0 (Hybrid SaaS Transition)  

---

## 1. Document Control & Version History

| Version | Date | Author | Description of Change | Approval Status |
|---|---|---|---|---|
| **0.1.0** | Q2 2026 | Technical BA Lead | Initial draft capturing native desktop duplicate scanner utility. | Approved (Milestone 1) |
| **0.2.0** | Q3 2026 | Technical BA Lead | Added 30 advanced features: Drag & drop, 13 keyboard shortcuts, plugins, i18n. | Approved (Milestone 2) |
| **1.0.0** | Q4 2026 | Senior Technical BA | Extended baseline to Hybrid SaaS architecture: Device pairing, credit ledger, WebSockets. | **Pending Final Sign-Off** |

---

## 2. Executive Summary

Enterprise and creative storage environments suffer from relentless data duplication, resulting in **15% to 35% wasted disk and cloud storage**. This document formalizes the business requirements for **Duplicate Bin**, an intelligent, hybrid storage optimization ecosystem. 

Duplicate Bin merges a local, zero-trust cryptographic detection utility with a centralized SaaS management portal. By addressing user fears through an automated "safe quarantine" rollback archive and eliminating human decision fatigue through 8 deterministic selection heuristics, Duplicate Bin empowers prosumers and SME corporate teams to reclaim gigabytes of disk space and reduce recurring cloud bills by up to 30%.

---

## 3. Business Background & Problem Statement

### 3.1 Context & Market Urgency
As camera sensors, 4K/8K video assets, and unmanaged digital collaboration expand, local solid-state drives (SSDs) and enterprise cloud tiers are overwhelmed with identical file variants. Current operating systems (Windows, macOS, Linux) do not provide native cryptographic duplicate detection, forcing users into either risky manual deletions or expensive subscription tier upgrades.

### 3.2 Formal Problem Statement
> **"Without an automated, deterministic, and reversible deduplication system, digital creators and corporate teams waste hundreds of productive hours, incur unnecessary recurring cloud storage expenses, and risk catastrophic loss of proprietary source assets during manual disk cleanups."**

---

## 4. Business Objectives & Project Scope

### 4.1 Measurable Business Objectives
1. **OBJ-01 (Speed):** Scan 10,000 files in under 20 seconds; re-scan under 5 seconds via persistent caching.
2. **OBJ-02 (Safety):** Ensure 100% reversibility of quarantined duplicate files without data corruption.
3. **OBJ-03 (Space Recovery):** Reclaim an average of 15% to 30% consumed capacity on target project directories.
4. **OBJ-04 (Monetization):** Establish a hybrid monetization model supporting Pay-As-You-Go credits ($4.99/100GB) and team subscriptions ($29/month).
5. **OBJ-05 (Privacy):** Retain all file reading, hashing, and quarantine operations strictly on the local client device.

### 4.2 In-Scope
- Cross-platform desktop application (Windows, Linux, macOS) built on Python 3.8+ and PySide6 (Qt6).
- Multi-algorithm cryptographic hashing (SHA-256, BLAKE2b, MD5, CRC32).
- Two-pass size pre-filter and Union-Find graph clustering.
- 8 automated smart selection strategies (Keep Best Quality, Keep Newest, etc.).
- Safe archive quarantine system with one-click restore (`Ctrl+Z`).
- Drag-and-drop folder ingestion and 13 keyboard shortcuts.
- Extensible plugin architecture (desktop alerts, audit logging).
- FastAPI backend providing JWT authentication, device pairing (6-digit codes), WebSocket scan triggering, and credit ledger deduction.
- Multi-format audit reporting (HTML, CSV, JSON).

### 4.3 Out-of-Scope (Deferred to Future Releases)
- Direct cloud API scanning without local syncing (Google Drive / OneDrive remote API crawling).
- Full perceptual image hashing (`imagehash` library) for resized/re-compressed images.
- Native mobile device scanning (iOS / Android).

---

## 5. Stakeholder Matrix & Impact Summary

| Stakeholder Group | Primary Business Needs | Anticipated Business Benefit |
|---|---|---|
| **Content Creators / Prosumers** | Fast, visual media comparison; guaranteed zero data loss. | Reclaims SSD capacity; saves on Google Drive/Dropbox upgrades. |
| **Corporate IT Administrators** | Headless CLI automation; background daemon; central visibility. | Reduces helpdesk storage tickets; automates maintenance across 50+ PCs. |
| **Business Owners & Agency Leads** | Storage ROI tracking; predictable pay-as-you-go software billing. | Direct reduction of company cloud storage operational expenditures. |
| **Security & Compliance Officers** | Zero data exfiltration; system directory protection; audit trails. | Assures customer confidentiality and prevents OS file tampering. |

---

## 6. Business Requirements Specification

| Req ID | Requirement Description | Success Metric | Traceable Code Evidence |
|---|---|---|---|
| **BR-001** | The system must calculate deterministic file signatures to identify duplicate files with 100% mathematical certainty. | Zero false-positive duplicate clusters across 100,000 test files. | [duplicate_bin/core/hashing.py](file:///c:/Users/mustafa/Desktop/duplicate-bin/duplicate_bin/core/hashing.py) |
| **BR-002** | The system must provide non-destructive file quarantine that preserves full path structure and permits instant recovery. | 100% recovery fidelity of archived files and timestamps. | [duplicate_bin/engine/archive.py](file:///c:/Users/mustafa/Desktop/duplicate-bin/duplicate_bin/engine/archive.py) |
| **BR-003** | The system must offer automated selection rules that eliminate manual user selection of individual files. | Reduces user decision time from hours to < 10 seconds. | [duplicate_bin/core/selection.py](file:///c:/Users/mustafa/Desktop/duplicate-bin/duplicate_bin/core/selection.py) |
| **BR-004** | The system must support persistent hash caching across application restarts to expedite subsequent scans. | Rescan completes at least 3x to 5x faster than initial scan. | [duplicate_bin/engine/cache.py](file:///c:/Users/mustafa/Desktop/duplicate-bin/duplicate_bin/engine/cache.py) |
| **BR-005** | The system must enable centralized registration and telemetry reporting for enterprise devices via secure pairing. | Device pairing completes in < 30 seconds via 6-digit code. | [backend/app/main.py#L74-L130](file:///c:/Users/mustafa/Desktop/duplicate-bin/backend/app/main.py#L74-L130) |
| **BR-006** | The system must track and deduct deduplication credits based on actual gigabytes recovered. | Credit balance accurately decremented in database ledger. | [backend/app/main.py#L163-L198](file:///c:/Users/mustafa/Desktop/duplicate-bin/backend/app/main.py#L163-L198) |

---

## 7. Business Rules (BRULE)

- **BRULE-01 (Master Preservation Rule):** Every duplicate group cluster must retain at least one designated "Original/Master" file. The system must never permit all files in a duplicate group to be selected for archiving simultaneously.
- **BRULE-02 (System Protection Rule):** Directories classified under operating system roots (e.g., `C:\Windows`, `C:\Program Files`, `/bin`, `/etc`) are forbidden targets for deduplication or archiving.
- **BRULE-03 (Pairing Code Expiration Rule):** Six-digit device pairing codes expire exactly 300 seconds (5 minutes) after generation.
- **BRULE-04 (Credit Ledger Debit Rule):** Deduplication credits (`credit_bytes`) shall only be deducted upon transition of a scan to `completed` status, proportional to `bytes_recoverable`.
- **BRULE-05 (Reversibility Rule):** An archived file can be restored at any time unless the user explicitly executes a secondary "Permanent Purge Archive" operation.

---

## 8. Assumptions, Constraints & Project Risks

### Assumptions
- Client machines possess standard write permissions within the user's home profile directory.
- Operating system file system reporting of file sizes and modification timestamps (`mtime`) is reliable.

### Constraints
- The core desktop application must run entirely offline without requiring a continuous cloud connection.
- Python execution must remain memory-bounded below 200 MB for standard workloads.

### Project Risks
- **R-01 (Path Permissions):** Scans encountering corporate restricted folders could trigger uncaught OS exceptions. *Mitigation:* Comprehensive `try-except PermissionError` handling in file traversal.
- **R-02 (SaaS Cloud Reluctance):** Enterprise clients may fear cloud data exfiltration. *Mitigation:* Verifiable architectural proof that file contents never leave local client storage.

---

## 9. Success Metrics & Key Performance Indicators (KPIs)

| Metric | Baseline (Manual As-Is) | Target State (Duplicate Bin) | Verification Mechanism |
|---|---|---|---|
| **Scan Throughput** | ~100 files / hour | 10,000 files in 18.7 seconds | Automated benchmark tests |
| **Re-Scan Latency** | Full manual re-audit required | 4.2 seconds (cached) | Persistent SQLite WAL cache |
| **Data Loss Rate** | 1-2% accidental deletion rate | 0% (quarantine rollback enabled) | Safe archive audit logs |
| **Storage Reclaimed** | 0% (deferred cleanup) | 15% - 30% storage recovered | Telemetry `bytes_recoverable` |

---

## 10. Approval & Sign-Off Block

| Role | Name & Title | Signature / Approval Date |
|---|---|---|
| **Executive Sponsor** | Sophia Vance, Director of Digital Operations | `[PENDING FORMAL SIGN-OFF]` |
| **Product Owner** | Marcus Sterling, Lead Product Manager | `[PENDING FORMAL SIGN-OFF]` |
| **Lead Solution Architect** | Dr. Aris Thorne, Principal Systems Architect | `[PENDING FORMAL SIGN-OFF]` |
| **Lead Technical BA** | Candidate (Lead Business Analyst) | `[APPROVED FOR RELEASE]` |
