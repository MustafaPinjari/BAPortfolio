# 📋 Phase 17: User Acceptance Test Cases (UAT)

> **Document Code:** UAT-TC-001  
> **Project:** Duplicate Bin Ecosystem  
> **Test Cycle:** Acceptance Phase Beta (v0.2.0 Desktop + v1.0.0 SaaS)  
> **Lead QA / BA Analyst:** Senior Technical Business Analyst  

---

## 1. UAT Execution Summary Table

| Test Case ID | Requirement ID | Feature Area | Scenario Description | Status | Sign-off Owner |
|---|---|---|---|---|---|
| **UAT-TC-01** | FR-001, FR-002 | Core Engine | Cold scan of 1,000 mixed media files with size pre-filtering. | **PASSED** | Elena (Prosumer) |
| **UAT-TC-02** | FR-003, BRULE-008 | Cache Engine | Warm rescan of unchanged directory using SQLite cache. | **PASSED** | Marcus (IT Admin) |
| **UAT-TC-03** | FR-004, BRULE-001 | Selection | Applying "Keep Best Quality" on RAW/JPEG photo duplicates. | **PASSED** | Elena (Prosumer) |
| **UAT-TC-04** | FR-006, BRULE-005 | Archive | Safe quarantine of 10 selected duplicate files. | **PASSED** | Sophia (Agency Owner) |
| **UAT-TC-05** | FR-007 | Rollback | Instant Undo (`Ctrl+Z`) restoring quarantined files. | **PASSED** | Sophia (Agency Owner) |
| **UAT-TC-06** | SEC-001, BRULE-002 | Security | Prohibited system directory scan attempt (`C:\Windows`). | **PASSED** | David (Security Auditor) |
| **UAT-TC-07** | FR-010, BRULE-003 | SaaS Pairing | Workstation registration via 6-digit expiring pairing code. | **PASSED** | Marcus (IT Admin) |
| **UAT-TC-08** | FR-011, INT-001 | SaaS Relay | Remote scan trigger from web portal via WebSocket. | **PASSED** | Marcus (IT Admin) |
| **UAT-TC-09** | FR-012, BRULE-004 | Billing | Deduplication credit debit upon verified scan completion. | **PASSED** | Sophia (Agency Owner) |
| **UAT-TC-10** | FR-008, FR-013 | UI / Usability | Drag & drop folder ingestion and keyboard shortcuts (`Ctrl+S`). | **PASSED** | Elena (Prosumer) |

---

## 2. Detailed UAT Test Case Specifications

### UAT-TC-01: Cold Scan Across Mixed Media Files
- **Test Case ID:** UAT-TC-01
- **Requirement ID:** FR-001, FR-002, BR-001
- **Feature:** Core Detection & Size Pre-Filter
- **Business Scenario:** Verify that a photographer can scan a directory of 1,000 files and accurately discover duplicate clusters without crashing or hanging.
- **Precondition:** Application is launched in GUI mode; target test folder exists with known duplicates.
- **Test Data:** `test_duplicates/` staging folder containing 1,000 files (50 known duplicate pairs, 900 unique files, total size 1.2 GB).
- **Execution Steps:**
  1. Launch Duplicate Bin desktop application.
  2. Click "Browse Folder" and navigate to `test_duplicates/`.
  3. Select algorithm `SHA-256`.
  4. Click "Start Scan" (`Ctrl+S`).
  5. Observe progress bar and elapsed time display.
- **Expected Result:**
  - Scan completes in under 3 seconds.
  - Progress bar updates smoothly without freezing GUI.
  - Exactly 50 duplicate groups are displayed in the results tree.
  - Total recoverable bytes is calculated accurately as the sum of redundant copies.
- **Actual Result:** Scan completed in 2.1 seconds; 50 duplicate groups correctly rendered with 0 false positives.
- **Status:** **PASSED**
- **Business Owner:** Elena (Content Creator)
- **Defect Reference:** None.

---

### UAT-TC-02: Warm Rescan Verification (Persistent SQLite Cache)
- **Test Case ID:** UAT-TC-02
- **Requirement ID:** FR-003, NFR-002, BRULE-008
- **Feature:** Persistent Hash Cache
- **Business Scenario:** Verify that rescanning the same directory immediately afterward completes in a fraction of the time by leveraging cached hashes.
- **Precondition:** UAT-TC-01 completed; `hash_cache.db` populated.
- **Test Data:** Same `test_duplicates/` folder without any file modifications.
- **Execution Steps:**
  1. Immediately click "Start Scan" again on the same directory.
  2. Measure completion time and observe disk I/O activity.
- **Expected Result:**
  - Rescan completes in < 1 second (< 4.2 seconds for 10k files).
  - No new file hash calculations occur (100% cache hit rate).
  - Results tree matches previous scan output identically.
- **Actual Result:** Rescan finished in 0.7 seconds (~3x faster than initial cold scan).
- **Status:** **PASSED**
- **Business Owner:** Marcus (IT Admin)
- **Defect Reference:** None.

---

### UAT-TC-03: Automated Selection Strategy ("Keep Best Quality")
- **Test Case ID:** UAT-TC-03
- **Requirement ID:** FR-004, BRULE-001, BRULE-007
- **Feature:** Smart Selection Strategies
- **Business Scenario:** Verify that a creative professional can automatically preserve high-quality RAW files while selecting low-resolution JPEG exports for removal.
- **Precondition:** A duplicate group contains `wedding_shot.nef` (RAW, 28 MB) and `wedding_shot.jpg` (JPEG, 3.5 MB) with matching content signatures.
- **Test Data:** Staged RAW + JPEG duplicate pairs.
- **Execution Steps:**
  1. Open Selection Strategy dropdown.
  2. Select "Keep Best Quality".
  3. Inspect the checkbox state of the duplicate group in the UI tree.
- **Expected Result:**
  - `wedding_shot.nef` has its checkbox **unchecked** (retained master).
  - `wedding_shot.jpg` has its checkbox **checked** (marked for removal).
  - Master Preservation Rule enforced: exactly 1 file remains unchecked.
- **Actual Result:** RAW format automatically prioritized as master; JPEG marked for deletion.
- **Status:** **PASSED**
- **Business Owner:** Elena (Content Creator)
- **Defect Reference:** None.

---

### UAT-TC-04: Safe Quarantine Archiving
- **Test Case ID:** UAT-TC-04
- **Requirement ID:** FR-006, BR-002, BRULE-005
- **Feature:** Safe Archive System
- **Business Scenario:** Verify that marked duplicate files are safely moved into a local quarantine folder rather than permanently erased.
- **Precondition:** 10 duplicate files checked for removal in the results tree.
- **Test Data:** 10 marked files across nested subfolders `Photos/Summer/`.
- **Execution Steps:**
  1. Click "Archive Selected Files".
  2. Read confirmation dialog stating: *"10 files (85 MB) will be archived to safe quarantine"*.
  3. Click "Confirm".
  4. Inspect the source folder `Photos/Summer/`.
  5. Inspect the quarantine directory `~/.duplicate_bin/archive/<timestamp>/`.
- **Expected Result:**
  - Files no longer exist in source directory.
  - Files are present inside `~/.duplicate_bin/archive/<timestamp>/Photos/Summer/` with identical file sizes.
  - Manifest file `manifest.json` is generated recording original paths.
  - "Restore" button (`Ctrl+Z`) becomes active in the UI.
- **Actual Result:** 10 files successfully relocated to timestamped quarantine; directory hierarchy preserved; manifest verified.
- **Status:** **PASSED**
- **Business Owner:** Sophia (Agency Owner)
- **Defect Reference:** None.

---

### UAT-TC-05: Instant Disaster Recovery / Undo (`Ctrl+Z`)
- **Test Case ID:** UAT-TC-05
- **Requirement ID:** FR-007, BR-002
- **Feature:** Rollback & Disaster Recovery
- **Business Scenario:** Verify that a user who accidentally archived files can instantly undo the operation with zero data loss.
- **Precondition:** UAT-TC-04 completed; files reside in quarantine.
- **Test Data:** 10 quarantined files from UAT-TC-04.
- **Execution Steps:**
  1. Press `Ctrl+Z` on keyboard or click "Restore" button.
  2. Observe system progress.
  3. Inspect source folder `Photos/Summer/`.
  4. Inspect quarantine folder.
- **Expected Result:**
  - All 10 files are returned to their exact original source paths.
  - File modification dates and permissions are intact.
  - The quarantine batch directory is cleaned up.
  - UI displays confirmation: *"10 files successfully restored"*.
- **Actual Result:** 100% of files restored with zero corruption; timestamps preserved.
- **Status:** **PASSED**
- **Business Owner:** Sophia (Agency Owner)
- **Defect Reference:** None.

---

### UAT-TC-06: Prohibited System Directory Protection
- **Test Case ID:** UAT-TC-06
- **Requirement ID:** SEC-001, BRULE-002
- **Feature:** System Directory Protection
- **Business Scenario:** Verify that the system blocks attempts to scan or modify critical operating system files.
- **Precondition:** Application is open.
- **Test Data:** Path input: `C:\Windows` (on Windows) or `/etc` (on Linux).
- **Execution Steps:**
  1. Manually type `C:\Windows` into the target directory input field.
  2. Click "Start Scan".
- **Expected Result:**
  - Scan does not start.
  - Application displays a modal alert: *"Access Denied: Scanning operating system root directories is prohibited for system safety"*.
  - Audit log records security block.
- **Actual Result:** Block alert triggered immediately; zero file operations executed.
- **Status:** **PASSED**
- **Business Owner:** David (Security Auditor)
- **Defect Reference:** None.

---

### UAT-TC-07: 6-Digit Device Pairing Handshake
- **Test Case ID:** UAT-TC-07
- **Requirement ID:** FR-010, BRULE-003
- **Feature:** SaaS Device Pairing
- **Business Scenario:** Verify that an administrator can link a new workstation to their SaaS web portal using a 6-digit numeric pairing code.
- **Precondition:** User logged into SaaS web portal; agent CLI available on workstation.
- **Test Data:** Workstation hostname: `Studio-MacBook-02`.
- **Execution Steps:**
  1. On SaaS portal, click "Add Device" -> Note generated code (e.g., `839104`).
  2. On workstation terminal, run: `python run.py pair 839104`.
  3. Check terminal output.
  4. Refresh SaaS portal device list.
- **Expected Result:**
  - Terminal outputs: *"Device paired successfully"*.
  - Agent stores 64-character pairing token in `agent_config.json`.
  - SaaS portal displays `Studio-MacBook-02` in paired devices table.
- **Actual Result:** Handshake completed in 4.2 seconds; pairing token stored; device visible on portal.
- **Status:** **PASSED**
- **Business Owner:** Marcus (IT Admin)
- **Defect Reference:** None.

---

### UAT-TC-08: Remote Scan Triggering via WebSockets
- **Test Case ID:** UAT-TC-08
- **Requirement ID:** FR-011, INT-001
- **Feature:** Remote Scan Dispatch
- **Business Scenario:** Verify that an administrator can trigger a scan on a remote paired workstation and receive live progress over WebSockets.
- **Precondition:** Workstation running daemon `python run.py service`; SaaS portal open.
- **Test Data:** Remote target path: `/test_duplicates`.
- **Execution Steps:**
  1. On SaaS portal, locate paired device and click "Remote Scan".
  2. Enter target directory `/test_duplicates` and click "Dispatch".
  3. Observe dashboard progress bar.
- **Expected Result:**
  - Workstation daemon receives `CMD_START_SCAN` over `/ws/agent`.
  - Daemon streams `AGENT_PROGRESS` events.
  - Manager dashboard progress bar updates in real time.
- **Actual Result:** Scan dispatched and completed remotely; live progress displayed on dashboard.
- **Status:** **PASSED**
- **Business Owner:** Marcus (IT Admin)
- **Defect Reference:** None.

---

### UAT-TC-09: Deduplication Credit Balance Deduction
- **Test Case ID:** UAT-TC-09
- **Requirement ID:** FR-012, BR-003, BRULE-004
- **Feature:** SaaS Credit Ledger
- **Business Scenario:** Verify that when a paired workstation completes a scan, the user's cloud credit balance is debited by the exact number of recoverable bytes found.
- **Precondition:** User account has 10 GB ($10,737,418,240$ bytes) credit balance.
- **Test Data:** Completed scan finding 1 GB ($1,073,741,824$ bytes) of duplicate files.
- **Execution Steps:**
  1. Workstation completes scan and posts telemetry to `/api/scans/telemetry`.
  2. User navigates to web portal billing profile.
  3. Inspect remaining credit balance.
- **Expected Result:**
  - Remaining credit displays as 9 GB ($9,663,676,416$ bytes).
  - Scan history record indicates `completed` with 1 GB recoverable.
- **Actual Result:** Database balance decremented by exactly 1 GB; ledger reconciled.
- **Status:** **PASSED**
- **Business Owner:** Sophia (Agency Owner)
- **Defect Reference:** None.

---

### UAT-TC-10: Drag-and-Drop Ingestion & Keyboard Shortcuts
- **Test Case ID:** UAT-TC-10
- **Requirement ID:** FR-008, FR-013
- **Feature:** UI Ergonomics
- **Business Scenario:** Verify that a user can drag a directory folder directly onto the application and start a scan using `Ctrl+S`.
- **Precondition:** Desktop GUI running.
- **Test Data:** Any local directory folder.
- **Execution Steps:**
  1. Drag a directory from File Explorer/Finder and drop it over the application window.
  2. Press `Ctrl+S` on keyboard.
- **Expected Result:**
  - Target path input immediately populates with dropped directory path.
  - Pressing `Ctrl+S` starts scan worker without clicking the mouse.
- **Actual Result:** Drag and drop recognized instantly; `Ctrl+S` triggered scan.
- **Status:** **PASSED**
- **Business Owner:** Elena (Content Creator)
- **Defect Reference:** None.
