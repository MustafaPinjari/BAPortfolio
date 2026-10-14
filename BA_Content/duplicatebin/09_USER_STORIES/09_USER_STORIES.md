# 📖 Phase 9: User Stories & Agile Backlog Catalog

> **Document Code:** US-CAT-001  
> **Project:** Duplicate Bin Ecosystem  
> **Format:** Standard Agile User Stories with Gherkin Acceptance Criteria  
> **Traceability:** Mapped to Epics, Business Values & System Modules  

---

## 1. Epic Overview

- **EPIC-01: Intelligent Core Scanning & Hashing Engine**
- **EPIC-02: Automated Selection & Decision Rules**
- **EPIC-03: Zero-Risk Archiving & Rollback**
- **EPIC-04: User Experience & Desktop Ergonomics**
- **EPIC-05: Cloud SaaS Pairing, Fleet Telemetry & Monetization**

---

## 2. User Stories Specification

### EPIC-01: Intelligent Core Scanning & Hashing Engine

#### US-001: Two-Pass Size Pre-Filtering
- **Story ID:** US-001
- **Epic:** EPIC-01 (Core Engine)
- **User Story:**  
  *As a content creator with thousands of mixed media files,*  
  *I want the scanning engine to immediately discard files with unique byte sizes,*  
  *So that I do not waste CPU cycles and battery computing hashes for files that cannot possibly be duplicates.*
- **Business Value:** Reduces scan latency by 85% on large datasets; prevents system freezing.
- **Priority:** **Must Have** (Sprint 1)
- **Dependencies:** None
- **Acceptance Criteria (Gherkin):**
  ```gherkin
  Scenario: Size pre-filtering optimization
    Given a target scan directory containing 20,000 files
    And 19,000 files have unique byte lengths
    When the user initiates a scan
    Then the engine must group files by size in O(n) time
    And only the 1,000 files sharing size collisions shall proceed to cryptographic hashing.
  ```

#### US-002: Multi-Algorithm Hashing Selection
- **Story ID:** US-002
- **Epic:** EPIC-01 (Core Engine)
- **User Story:**  
  *As a security-conscious system administrator,*  
  *I want to choose between SHA-256, BLAKE2b, and MD5 algorithms,*  
  *So that I can balance cryptographic collision resistance against raw scanning speed according to company policy.*
- **Business Value:** Provides flexibility between enterprise-grade collision proofing and lightweight performance.
- **Priority:** **Must Have** (Sprint 1)
- **Dependencies:** None
- **Acceptance Criteria (Gherkin):**
  ```gherkin
  Scenario: User selects SHA-256 algorithm
    Given the user sets detection algorithm to "SHA-256" in settings
    When duplicate candidates are evaluated
    Then all candidate hashes must be 64-character hexadecimal SHA-256 digests
    And identical file contents must produce identical hash strings.
  ```

#### US-003: Persistent SQLite WAL Hash Cache
- **Story ID:** US-003
- **Epic:** EPIC-01 (Core Engine)
- **User Story:**  
  *As a frequent user scanning the same multi-terabyte project drives daily,*  
  *I want the system to persist computed hashes in a local SQLite cache,*  
  *So that subsequent scans complete in seconds rather than minutes.*
- **Business Value:** Enhances user retention by delivering 3-5x faster rescans (4.2 seconds on 10k files).
- **Priority:** **Must Have** (Sprint 2)
- **Dependencies:** US-001, US-002
- **Acceptance Criteria (Gherkin):**
  ```gherkin
  Scenario: Cache hit on unchanged files
    Given a file previously hashed and stored in ~/.cache/duplicate-bin/hash_cache.db
    When a rescan occurs and the file's size and mtime are unchanged
    Then the engine must read the hash directly from the SQLite database
    And zero disk read I/O operations shall be performed on that file.
  ```

---

### EPIC-02: Automated Selection & Decision Rules

#### US-004: Automated Selection Strategy Application
- **Story ID:** US-004
- **Epic:** EPIC-02 (Selection Engine)
- **User Story:**  
  *As a photographer managing 500 duplicate photo groups,*  
  *I want to apply an automated rule like "Keep Best Quality" or "Keep Newest",*  
  *So that I don't have to manually inspect and click 500 individual checkboxes.*
- **Business Value:** Eliminates decision fatigue; turns a 2-hour manual chore into a 5-second automated action.
- **Priority:** **Must Have** (Sprint 2)
- **Dependencies:** US-001
- **Acceptance Criteria (Gherkin):**
  ```gherkin
  Scenario: Applying Keep Newest strategy
    Given a duplicate cluster containing "doc_may.pdf" (modified May 2026) and "doc_june.pdf" (modified June 2026)
    When the user applies the "KEEP_NEWEST" strategy
    Then "doc_june.pdf" must remain unselected (kept)
    And "doc_may.pdf" must be automatically checked for removal
    And at no point shall both files be marked for removal.
  ```

---

### EPIC-03: Zero-Risk Archiving & Rollback

#### US-005: Safe Archive Quarantine
- **Story ID:** US-005
- **Epic:** EPIC-03 (Archive System)
- **User Story:**  
  *As an anxious computer user,*  
  *I want duplicate files to be safely moved to a quarantine folder instead of permanently deleted,*  
  *So that I have peace of mind knowing my files can be recovered if I made a mistake.*
- **Business Value:** Removes the #1 barrier to user conversion: fear of accidental data loss.
- **Priority:** **Must Have** (Sprint 2)
- **Dependencies:** US-004
- **Acceptance Criteria (Gherkin):**
  ```gherkin
  Scenario: Archiving preserves folder structure
    Given 10 duplicate files marked for removal across nested subdirectories
    When the user clicks "Archive Selected Files"
    Then the files must be moved into ~/.duplicate_bin/archive/<timestamp>/
    And original relative directory hierarchies must be preserved
    And no files shall be permanently deleted from the hard drive.
  ```

#### US-006: One-Click Instant Restore (`Ctrl+Z`)
- **Story ID:** US-006
- **Epic:** EPIC-03 (Archive System)
- **User Story:**  
  *As a user who just archived files by mistake,*  
  *I want to press Ctrl+Z or click "Restore",*  
  *So that all quarantined files immediately return to their exact original locations.*
- **Business Value:** Provides enterprise-grade auditability and instant disaster recovery.
- **Priority:** **Must Have** (Sprint 2)
- **Dependencies:** US-005
- **Acceptance Criteria (Gherkin):**
  ```gherkin
  Scenario: Successful undo operation
    Given a completed archive operation with 10 quarantined files
    When the user presses Ctrl+Z
    Then all 10 files must be moved back to their original absolute file paths
    And original timestamps must be preserved
    And the UI archive tree must reflect an empty quarantine state.
  ```

---

### EPIC-04: User Experience & Desktop Ergonomics

#### US-007: Drag-and-Drop Ingestion
- **Story ID:** US-007
- **Epic:** EPIC-04 (UI Layer)
- **User Story:**  
  *As a daily desktop user,*  
  *I want to drag a folder directly from my file manager onto the Duplicate Bin window,*  
  *So that I can start a scan instantly without clicking through nested file dialog trees.*
- **Business Value:** Modernizes user experience, matching consumer expectations of premium software.
- **Priority:** **Should Have** (Sprint 3)
- **Dependencies:** None
- **Acceptance Criteria (Gherkin):**
  ```gherkin
  Scenario: Dragging folder into application
    Given the Duplicate Bin application is open on the desktop
    When the user drags and drops a folder onto the DropZoneWidget
    Then the input path field must populate with the dropped folder path
    And the interface must visually prompt to begin scanning.
  ```

#### US-008: Side-by-Side Visual Previews
- **Story ID:** US-008
- **Epic:** EPIC-04 (UI Layer)
- **User Story:**  
  *As a creative designer reviewing duplicate images,*  
  *I want to see visual image previews and file dimensions side-by-side,*  
  *So that I can visually verify that the files are identical before archiving.*
- **Business Value:** Builds absolute confidence during cleanup workflows.
- **Priority:** **Should Have** (Sprint 3)
- **Dependencies:** US-001
- **Acceptance Criteria (Gherkin):**
  ```gherkin
  Scenario: Viewing duplicate image thumbnails
    Given a duplicate group selected in the results tree
    When the user clicks on the group header
    Then the preview pane must display thumbnails and dimensions for all candidate files
    And thumbnail caching must not exceed 200 items in memory.
  ```

---

### EPIC-05: Cloud SaaS Pairing, Fleet Telemetry & Monetization

#### US-009: 6-Digit Device Pairing
- **Story ID:** US-009
- **Epic:** EPIC-05 (SaaS Backend)
- **User Story:**  
  *As an IT administrator managing multiple office computers,*  
  *I want to link a desktop machine to my central web dashboard using a short 6-digit code,*  
  *So that I can pair devices in seconds without typing complex database connection strings or passwords.*
- **Business Value:** Frictionless B2B onboarding; zero-configuration deployment.
- **Priority:** **Must Have** (Sprint 4)
- **Dependencies:** None
- **Acceptance Criteria (Gherkin):**
  ```gherkin
  Scenario: Pairing workstation to web portal
    Given an administrator generates pairing code "592104" on the SaaS portal
    When the command "python run.py pair 592104" is run on an office workstation
    Then the backend must register the device as active
    And return a persistent 64-character pairing token to the client daemon.
  ```

#### US-010: Remote Scan Trigger & Live Progress Broadcast
- **Story ID:** US-010
- **Epic:** EPIC-05 (SaaS Backend)
- **User Story:**  
  *As a team manager,*  
  *I want to trigger a duplicate scan on a paired office machine from my web browser,*  
  *So that I can clean up shared drives remotely and watch live progress updates.*
- **Business Value:** Enables remote IT operations without interrupting employee screen sessions.
- **Priority:** **Should Have** (Sprint 4)
- **Dependencies:** US-009
- **Acceptance Criteria (Gherkin):**
  ```gherkin
  Scenario: Remote scan trigger via WebSocket
    Given a paired workstation connected to the backend WebSocket
    When the manager triggers a scan on path "/shared/projects" via the web portal
    Then the agent must receive CMD_START_SCAN
    And stream live AGENT_PROGRESS updates back to the manager's browser dashboard.
  ```

#### US-011: Pay-As-You-Go Deduplication Credits
- **Story ID:** US-011
- **Epic:** EPIC-05 (Billing & Monetization)
- **User Story:**  
  *As a prosumer who only cleans my drives twice a year,*  
  *I want to purchase a 100 GB deduplication credit pack for $4.99,*  
  *So that I don't have to commit to an ongoing monthly subscription I won't use.*
- **Business Value:** Unlocks high-margin consumer monetization by removing subscription friction.
- **Priority:** **Must Have** (Sprint 4)
- **Dependencies:** US-009
- **Acceptance Criteria (Gherkin):**
  ```gherkin
  Scenario: Credit deduction upon scan completion
    Given a user account with 10 GB of deduplication credits
    When a paired scan completes, recovering 2 GB of duplicate data
    Then the user's credit ledger must decrement to exactly 8 GB
    And the transaction must be permanently recorded in the database.
  ```
