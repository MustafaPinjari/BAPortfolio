# 🔀 Phase 11: Business & Technical Process Flows

> **Document Code:** PF-DOC-001  
> **Project:** Duplicate Bin Ecosystem  
> **Format:** End-to-End Workflow Specifications with Mermaid Sequence & Flowchart Diagrams  

---

## 1. Process Map: System Workflow Portfolio

1. **Workflow 1 (WF-01):** End-to-End Multi-Pass Duplicate Detection Lifecycle
2. **Workflow 2 (WF-02):** Automated Selection Strategy Decision Flow
3. **Workflow 3 (WF-03):** Safe Archiving & Disaster Rollback Pipeline
4. **Workflow 4 (WF-04):** SaaS Workstation Pairing & WebSocket Command Dispatch
5. **Workflow 5 (WF-05):** Scan Telemetry Processing & Credit Balance Reconciliation

---

## 2. Workflow 1 (WF-01): Multi-Pass Duplicate Detection Lifecycle

```mermaid
flowchart TD
    A[Start: User selects directory & clicks Scan] --> B{Path in UNSAFE_DIRS?}
    B -->|Yes: System Root| C[Halt: Display Security Block Notification]
    B -->|No: Safe Path| D[os.walk: Collect files recursively]
    
    D --> E[Filter Engine: Evaluate Size, Extensions, Regex]
    E --> F[Pass 1: Group files into buckets by exact byte size]
    
    F --> G{Bucket size > 1?}
    G -->|No: Unique Size| H[Discard file: Cannot be a duplicate]
    G -->|Yes: Size Collision| I[Pass 2: Evaluate Cryptographic Hashes]
    
    I --> J{Entry in SQLite Cache with matching size & mtime?}
    J -->|Cache Hit| K[Retrieve cached SHA-256 hash]
    J -->|Cache Miss| L[Stream file in 4KB-1MB chunks -> Compute SHA-256]
    L --> M[Insert/Update SQLite Cache DB with WAL mode]
    
    K --> N[Union-Find: Group identical hashes into disjoint sets]
    M --> N
    
    N --> O{Duplicate set size >= 2?}
    O -->|Yes| P[Create Duplicate Group & calculate bytes recoverable]
    O -->|No| Q[Exclude from results]
    
    P --> R[Signal Scan Worker Complete -> Render Results Tree in GUI]
```

- **Process Name:** Multi-Pass Duplicate Detection Lifecycle
- **Purpose:** Maximize scanning velocity by eliminating non-duplicate files prior to expensive disk reads and hash computations.
- **Actors:** Prosumer, IT Systems Administrator, Detection Engine.
- **Trigger:** Folder drag-and-drop or clicking "Start Scan" (`Ctrl+S`).
- **Decision Points:**
  - Is directory a protected OS root? (Abort if true).
  - Does file match filter rules? (Skip if false).
  - Is file size unique across corpus? (Discard in Pass 1).
  - Does file signature exist in SQLite cache? (Bypass disk read if true).
- **Exceptions:** Permission denied (skip and log), corrupted cache file (re-init SQLite WAL).
- **Outputs:** Categorized duplicate groups, recoverable gigabytes calculation, updated cache.
- **Business Rules:** BRULE-02 (System Protection).

---

## 3. Workflow 2 (WF-02): Automated Selection Strategy Decision Flow

```mermaid
flowchart TD
    A[Start: Duplicate Group Loaded] --> B[Evaluate Chosen Selection Strategy]
    
    B -->|KEEP_BEST_QUALITY| C[Score files by format: RAW > Lossless > Compressed]
    B -->|KEEP_NEWEST| D[Sort files descending by modification time mtime]
    B -->|KEEP_OLDEST| E[Sort files ascending by modification time mtime]
    B -->|KEEP_LARGEST| F[Sort files descending by size]
    B -->|KEEP_SHORTEST_PATH| G[Sort files by pathname length ascending]
    B -->|KEEP_DEEPEST_PATH| H[Sort files by directory depth descending]
    
    C --> I[Designate top-ranked file as Master: keep=True]
    D --> I
    E --> I
    F --> I
    G --> I
    H --> I
    
    I --> J[Mark all remaining files in group for removal: keep=False]
    J --> K[Validate Master Preservation Rule: exactly 1 master kept]
    K --> L[Update UI Tree Checkboxes & Recalculate Removal Total]
```

- **Process Name:** Automated Selection Strategy Decision Flow
- **Purpose:** Deterministically determine which file copy to keep and which to quarantine, eliminating manual human decision fatigue.
- **Actors:** End User, Selection Engine.
- **Trigger:** Strategy selection dropdown changed in GUI.
- **Decision Points:**
  - Evaluates heuristic scoring criteria (resolution, timestamp, path depth).
  - Enforces invariant that at least one file remains unselected.
- **Outputs:** Boolean selection flags on all duplicate tree nodes.
- **Business Rules:** BRULE-01 (Master Preservation).

---

## 4. Workflow 3 (WF-03): Safe Archiving & Disaster Rollback Pipeline

```mermaid
sequenceDiagram
    autonumber
    actor User as End User
    participant UI as Desktop GUI
    participant Arch as SafeArchiveSystem
    participant FS as Local File System

    User->>UI: Clicks 'Archive Selected Files'
    UI->>UI: Prompt confirmation modal with file count & total GB
    User->>UI: Confirms action
    UI->>Arch: archive_files(selected_items)
    Arch->>FS: Create quarantine directory ~/.duplicate_bin/archive/<timestamp>/
    loop For each selected file
        Arch->>FS: Resolve realpath (boundary check)
        Arch->>FS: Move file from source path to quarantine directory
        Arch->>Arch: Append original and new path to manifest
    end
    Arch->>FS: Write manifest.json to quarantine folder
    Arch-->>UI: Operation complete
    UI->>User: Reclaimed storage displayed; enable 'Undo' (Ctrl+Z)

    opt User triggers Undo (Disaster Recovery)
        User->>UI: Presses Ctrl+Z
        UI->>Arch: restore_latest_archive()
        Arch->>FS: Read manifest.json
        loop For each item in manifest
            Arch->>FS: Recreate original parent folder if missing
            Arch->>FS: Move file back to original source path
        end
        Arch->>FS: Delete empty quarantine directory
        Arch-->>UI: Restore complete
        UI->>User: Confirmation: 100% files restored to original locations
    end
```

- **Process Name:** Safe Archiving & Disaster Rollback Pipeline
- **Purpose:** Prevent accidental data loss by quarantining rather than deleting files, providing a single-click undo mechanism.
- **Actors:** End User, Archive Engine, Host OS File System.
- **Trigger:** "Archive Selected" button clicked or `Ctrl+Z` undo shortcut pressed.
- **Business Rules:** BRULE-05 (Reversibility Rule).

---

## 5. Workflow 4 (WF-04): SaaS Workstation Pairing & Remote Scan Dispatch

```mermaid
sequenceDiagram
    autonumber
    actor Mgr as Central IT Manager
    participant Web as SaaS Web Portal
    participant API as FastAPI Backend
    participant WS as WebSocket Hub
    participant DB as Cloud Database
    participant Agent as Workstation Daemon

    Mgr->>Web: Navigate to Device Pairing
    Web->>API: GET /api/devices/pairing-code
    API->>API: Generate 6-digit random code (e.g. 849201)
    API-->>Web: {code: "849201", expires_in: 300}
    Web->>Mgr: Display code on screen
    Mgr->>Agent: Terminal: 'python run.py pair 849201'
    Agent->>API: POST /api/devices/pair {pairing_code, device_id, os, hostname}
    API->>DB: Store device record with generated 64-char pairing_token
    API-->>Agent: {device_id, pairing_token}
    Agent->>Agent: Save config in ~/.duplicate_bin/agent_config.json

    Mgr->>Agent: Terminal: 'python run.py service'
    Agent->>WS: Connect /ws/agent?device_id=...&token=...
    WS-->>Agent: Connection active

    Mgr->>Web: Click 'Scan Remote Drive' on paired machine
    Web->>API: POST /api/scan/trigger?device_id=...&path=...
    API->>WS: send_command_to_agent(device_id, CMD_START_SCAN, {path})
    WS->>Agent: WebSocket packet: CMD_START_SCAN
    Agent->>Agent: Spawns local scan worker
    loop Progress Streaming
        Agent->>WS: AGENT_PROGRESS {scanned_files, percentage}
        WS->>Web: Live update progress bar on manager screen
    end
    Agent->>API: POST /api/scans/telemetry {status: completed, bytes_recoverable, dups}
    API->>DB: Record scan completion & deduct credit_bytes
```

---

## 6. Workflow 5 (WF-05): Scan Telemetry & Credit Balance Reconciliation

```mermaid
flowchart TD
    A[Agent Completes Scan on Workstation] --> B[POST /api/scans/telemetry with ScanResponse]
    B --> C{Verify Device Exists in DB?}
    C -->|No| D[Return 404: Device Not Found]
    C -->|Yes| E{Verify User Exists in DB?}
    E -->|No| F[Return 404: User Not Found]
    E -->|Yes| G{Scan Status == 'completed'?}
    
    G -->|No: Running/Failed| H[Update Scan Record Status & Timestamp in DB]
    G -->|Yes: Completed| I{Scan already completed previously?}
    
    I -->|Yes| H
    I -->|No: First completion| J[Calculate deduct_amount = bytes_recoverable]
    
    J --> K[Update Scan table with duration, dups, and bytes]
    K --> L[Deduct credit_bytes from user account ledger: user.credit_bytes -= deduct_amount]
    L --> M[Commit DB Transaction]
    M --> N[Return 200 OK: Telemetry processed successfully]
```

- **Process Name:** Scan Telemetry & Credit Balance Reconciliation
- **Purpose:** Ingest scan outcome metrics and atomically debit user deduplication credits.
- **Actors:** Desktop Agent Daemon, FastAPI Backend, SQLAlchemy Session.
- **Business Rules:** BRULE-04 (Credit Ledger Debit Rule).
