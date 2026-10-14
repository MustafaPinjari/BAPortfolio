# 📋 Phase 5: Comprehensive Requirements Catalog

> **Document Code:** REQ-001  
> **Project:** Duplicate Bin Ecosystem  
> **Methodology:** IEEE 830 / ISO/IEC/IEEE 29148 Standard Requirements Engineering  
> **Traceability Level:** 100% Repository-Verified Evidence  

---

## 1. Requirements Taxonomy & ID Nomenclature

- **BR-xxx:** Business Requirements (Executive & Organizational Goals)
- **SR-xxx:** Stakeholder Requirements (User Persona Expectations)
- **FR-xxx:** Functional Requirements (System Behaviors & Capabilities)
- **NFR-xxx:** Non-Functional Requirements (Performance, Usability, Reliability)
- **DR-xxx:** Data Requirements (Storage, Schemas & Persistence)
- **INT-xxx:** Integration Requirements (APIs, WebSockets & External Tools)
- **SEC-xxx:** Security & Compliance Requirements (Safety, Auth, Hardening)
- **REP-xxx:** Reporting & Telemetry Requirements (Dashboards, Logs, Export)

---

## 2. Business Requirements (BR)

| Req ID | Requirement Statement | Business Objective | Evidence in Repository | Module | Priority | Dependencies | Status |
|---|---|---|---|---|---|---|---|
| **BR-001** | The system shall reduce consumed storage volume on client systems by identifying and eliminating byte-identical and near-identical files. | OBJ-03 (Space Reclamation) | [docs/SAAS_ANALYSIS_AND_STRATEGY.md#L9](file:///c:/Users/mustafa/Desktop/duplicate-bin/docs/SAAS_ANALYSIS_AND_STRATEGY.md#L9) | Core Engine | **Must Have** | None | **Implemented** |
| **BR-002** | The system shall provide an irreversible risk-free operational safety net ensuring zero permanent data loss during deduplication operations. | OBJ-02 (Zero Data Loss) | [duplicate_bin/engine/archive.py#L20-L80](file:///c:/Users/mustafa/Desktop/duplicate-bin/duplicate_bin/engine/archive.py#L20-L80) | Archive System | **Must Have** | BR-001 | **Implemented** |
| **BR-003** | The system shall support commercial hybrid SaaS monetization through Pay-As-You-Go deduplication credit packs and recurring team subscriptions. | OBJ-04 (Commercialization) | [backend/app/main.py#L296-L318](file:///c:/Users/mustafa/Desktop/duplicate-bin/backend/app/main.py#L296-L318) | SaaS Backend | **Must Have** | BR-001 | **Implemented** |
| **BR-004** | The system shall enable corporate IT administrators to monitor and orchestrate storage deduplication across distributed fleet workstations from a central portal. | OBJ-01 (Fleet Management) | [backend/app/main.py#L245-L290](file:///c:/Users/mustafa/Desktop/duplicate-bin/backend/app/main.py#L245-L290) | SaaS Management | **Should Have** | BR-003 | **Implemented** |

---

## 3. Functional Requirements (FR)

| Req ID | Feature / Capability | Detailed Functional Requirement Statement | Evidence in Code | Module | Priority | Status |
|---|---|---|---|---|---|---|
| **FR-001** | Multi-Algorithm Hashing | The engine shall compute file content digests using SHA-256, MD5, CRC32, or BLAKE2b based on user configuration. | [duplicate_bin/core/hashing.py#L25-L65](file:///c:/Users/mustafa/Desktop/duplicate-bin/duplicate_bin/core/hashing.py#L25-L65) | Core Engine | **Must Have** | **Implemented** |
| **FR-002** | Two-Pass Size Pre-Filtering | The engine shall group candidate files by exact file size in bytes before computing cryptographic hashes, immediately discarding unique file sizes in $O(n)$ time. | [duplicate_bin/core/detection.py#L85-L120](file:///c:/Users/mustafa/Desktop/duplicate-bin/duplicate_bin/core/detection.py#L85-L120) | Detection Engine | **Must Have** | **Implemented** |
| **FR-003** | Union-Find Duplicate Grouping | The engine shall employ a Union-Find disjoint-set data structure with path compression to accurately cluster transitive duplicate relationships ($A=B \land B=C \implies \{A,B,C\}$). | [docs/TECHNICAL_ARCHITECTURE.md#L85-L89](file:///c:/Users/mustafa/Desktop/duplicate-bin/docs/TECHNICAL_ARCHITECTURE.md#L85-L89), [duplicate_bin/core/detection.py#L140](file:///c:/Users/mustafa/Desktop/duplicate-bin/duplicate_bin/core/detection.py#L140) | Detection Engine | **Must Have** | **Implemented** |
| **FR-004** | Automated Selection Heuristics | The system shall provide 8 distinct automated selection strategies (Keep Newest, Keep Oldest, Keep Largest, Keep Smallest, Keep Best Quality, Keep Deepest Path, Keep Shortest Path, Custom Priority). | [duplicate_bin/core/selection.py#L15-L85](file:///c:/Users/mustafa/Desktop/duplicate-bin/duplicate_bin/core/selection.py#L15-L85) | Selection Engine | **Must Have** | **Implemented** |
| **FR-005** | Pre-Scan Filter Rules | The system shall permit users to filter files by extension, minimum size, maximum size, modification date range, and regular expression patterns (capped at 512 chars). | [duplicate_bin/core/filtering.py#L10-L75](file:///c:/Users/mustafa/Desktop/duplicate-bin/duplicate_bin/core/filtering.py#L10-L75) | Filter Engine | **Must Have** | **Implemented** |
| **FR-006** | Safe Archive Quarantine | When a user requests file deletion, the system shall move files into a designated quarantine directory (`~/.duplicate_bin/archive`) preserving directory hierarchy. | [duplicate_bin/engine/archive.py#L30-L70](file:///c:/Users/mustafa/Desktop/duplicate-bin/duplicate_bin/engine/archive.py#L30-L70) | Archive Engine | **Must Have** | **Implemented** |
| **FR-007** | Instant Undo / Restore | The system shall provide an undo mechanism (`Ctrl+Z`) restoring archived files back to their exact original disk locations with metadata preserved. | [duplicate_bin/engine/archive.py#L85-L125](file:///c:/Users/mustafa/Desktop/duplicate-bin/duplicate_bin/engine/archive.py#L85-L125) | Archive Engine | **Must Have** | **Implemented** |
| **FR-008** | Drag-and-Drop Ingestion | The GUI shall support dragging and dropping directory folders directly onto the application window to trigger an immediate scan configuration. | [duplicate_bin/ui/main_window.py#L180-L210](file:///c:/Users/mustafa/Desktop/duplicate-bin/duplicate_bin/ui/main_window.py#L180-L210) | PySide6 UI | **Should Have** | **Implemented** |
| **FR-009** | Side-by-Side Visual Previews | The system shall generate visual thumbnail previews and metadata side-by-side for candidate images, audio tags, and PDF documents. | [duplicate_bin/ui/preview_widget.py#L25-L95](file:///c:/Users/mustafa/Desktop/duplicate-bin/duplicate_bin/ui/preview_widget.py#L25-L95) | PySide6 UI | **Should Have** | **Implemented** |
| **FR-010** | Device 6-Digit Pairing | The system shall support pairing a desktop client daemon to a central cloud account using an expiring 6-digit cryptographic pairing code. | [backend/app/main.py#L74-L130](file:///c:/Users/mustafa/Desktop/duplicate-bin/backend/app/main.py#L74-L130) | SaaS / Auth | **Must Have** | **Implemented** |
| **FR-011** | Remote Scan Dispatch | The SaaS backend shall allow users to trigger scans on active paired agents remotely via persistent WebSocket channels. | [backend/app/main.py#L246-L290](file:///c:/Users/mustafa/Desktop/duplicate-bin/backend/app/main.py#L246-L290) | SaaS / WS | **Should Have** | **Implemented** |
| **FR-012** | Credit Deduction Ledger | The SaaS backend shall deduct deduplication credits (`credit_bytes`) from the user's account upon receiving verified scan telemetry indicating recovered bytes. | [backend/app/main.py#L163-L198](file:///c:/Users/mustafa/Desktop/duplicate-bin/backend/app/main.py#L163-L198) | Billing Engine | **Must Have** | **Implemented** |
| **FR-013** | 13 Global Keyboard Shortcuts | The GUI shall provide full operational keyboard navigation for core actions (`Ctrl+O`, `Ctrl+S`, `Ctrl+F`, `Ctrl+Z`, `Ctrl+A`, `F1`, etc.). | [duplicate_bin/ui/shortcuts.py#L10-L45](file:///c:/Users/mustafa/Desktop/duplicate-bin/duplicate_bin/ui/shortcuts.py#L10-L45) | PySide6 UI | **Could Have** | **Implemented** |
| **FR-014** | Extensible Plugin System | The core engine shall expose an event hook lifecycle (`on_scan_start`, `on_scan_complete`, `on_file_archived`) allowing external modular extensions. | [duplicate_bin/plugins/manager.py](file:///c:/Users/mustafa/Desktop/duplicate-bin/duplicate_bin/plugins/manager.py) | Plugin System | **Could Have** | **Implemented** |

---

## 4. Non-Functional Requirements (NFR)

| Req ID | Category | Requirement Statement | Target Metric / Benchmark | Evidence | Priority |
|---|---|---|---|---|---|
| **NFR-001** | Performance (Scan Velocity) | The system shall complete initial scanning of 10,000 files in under 20 seconds on standard multi-core hardware. | 18.7 seconds verified | [README.md#L231](file:///c:/Users/mustafa/Desktop/duplicate-bin/README.md#L231) | **Must Have** |
| **NFR-002** | Performance (Cache Rescan) | The system shall complete rescanning of an unchanged 10,000-file directory in under 5 seconds using persistent hash caching. | 4.2 seconds verified (3-5x speedup) | [README.md#L232](file:///c:/Users/mustafa/Desktop/duplicate-bin/README.md#L232) | **Must Have** |
| **NFR-003** | Scalability & Memory Bounding | The engine shall use streaming chunk processing (4KB to 1MB) ensuring client RAM consumption remains bounded (< 200 MB for 10k files, < 850 MB for 100k files). | Max 850 MB on 100k files | [README.md#L233](file:///c:/Users/mustafa/Desktop/duplicate-bin/README.md#L233), [performance_engine.py#L65](file:///c:/Users/mustafa/Desktop/duplicate-bin/scripts/performance_engine.py#L65) | **Must Have** |
| **NFR-004** | Usability (UI Responsiveness) | Long-running file scans and hash computations shall execute on decoupled worker threads (`QThread`), maintaining 60 FPS GUI responsiveness with zero freezing. | Worker decoupling via Qt Signals | [duplicate_bin/ui/scan_worker.py#L15-L60](file:///c:/Users/mustafa/Desktop/duplicate-bin/duplicate_bin/ui/scan_worker.py#L15-L60) | **Must Have** |
| **NFR-005** | Reliability & Crash Recovery | The system shall record JSON scan checkpoints periodically, allowing interrupted scans to resume without re-processing already hashed items. | JSON Checkpoint Manager | [duplicate_bin/engine/checkpoint.py#L20-L75](file:///c:/Users/mustafa/Desktop/duplicate-bin/duplicate_bin/engine/checkpoint.py#L20-L75) | **Should Have** |
| **NFR-006** | Portability & Cross-Platform | The application shall package natively for Linux (.deb), Windows (.exe standalone), and macOS without environment configuration. | PyInstaller spec & Debian scripts | [build_windows.py](file:///c:/Users/mustafa/Desktop/duplicate-bin/build_windows.py), [build_debian.sh](file:///c:/Users/mustafa/Desktop/duplicate-bin/build_debian.sh) | **Must Have** |

---

## 5. Security Requirements (SEC)

| Req ID | Requirement Statement | Business Rationale | Evidence | Priority |
|---|---|---|---|---|
| **SEC-001** | System Directory Protection | The system shall refuse to scan or modify protected operating system roots (`C:\Windows`, `C:\Program Files`, `/bin`, `/usr`, `/etc`, `/System`). | Prevent catastrophic operating system corruption. | [duplicate_bin/core/utils.py#L15-L45](file:///c:/Users/mustafa/Desktop/duplicate-bin/duplicate_bin/core/utils.py#L15-L45) | **Must Have** |
| **SEC-002** | Path Traversal & Symlink Safety | The archive system shall resolve absolute canonical paths (`os.path.realpath`) to verify that no target destination escapes the designated sandbox boundary. | Prevent directory traversal exploits (`../../etc`). | [docs/TECHNICAL_ARCHITECTURE.md#L141-L142](file:///c:/Users/mustafa/Desktop/duplicate-bin/docs/TECHNICAL_ARCHITECTURE.md#L141-L142) | **Must Have** |
| **SEC-003** | Safe Checkpoint Deserialization | Checkpoint data shall be persisted strictly using JSON formats; arbitrary object deserialization (`pickle`) is prohibited. | Prevent remote code execution via poisoned checkpoint files. | [docs/TECHNICAL_ARCHITECTURE.md#L100-L103](file:///c:/Users/mustafa/Desktop/duplicate-bin/docs/TECHNICAL_ARCHITECTURE.md#L100-L103) | **Must Have** |
| **SEC-004** | API Authentication & Token Security | Cloud API endpoints shall mandate OAuth2 Bearer JWT authentication (HS256) with password storage hashed via Bcrypt. | Prevent unauthorized access to device commands and telemetry. | [backend/app/auth.py#L15-L55](file:///c:/Users/mustafa/Desktop/duplicate-bin/backend/app/auth.py#L15-L55) | **Must Have** |

---

## 6. Data & Integration Requirements (DR / INT)

| Req ID | Requirement Statement | Source / Schema | Target Entity | Priority |
|---|---|---|---|---|
| **DR-001** | Persistent Hash Cache Database | SQLite schema (`hash_cache.db`) storing `(file_path, file_size, mtime, hash_value, algorithm, created_at)` with WAL mode. | `PersistentHashCache` | **Must Have** |
| **DR-002** | SaaS User & Device Ledger | Relational schema modeling `users`, `devices`, and `scans` with foreign keys and cascade delete rules. | `backend/app/models.py` | **Must Have** |
| **INT-001** | WebSocket Agent Relay Channel | Bidirectional real-time channel (`/ws/agent`) transmitting status payloads (`AGENT_PROGRESS`, `AGENT_COMPLETE`, `CMD_START_SCAN`). | `websocket_manager.py` | **Must Have** |
| **INT-002** | REST Telemetry Sync | Endpoint (`POST /api/scans/telemetry`) ingesting scan metrics (`bytes_recoverable`, `duplicates_count`, `duration_seconds`). | `backend/app/main.py#L149` | **Must Have** |

---

## 7. Reporting Requirements (REP)

| Req ID | Requirement Statement | Output Format | Evidence | Priority |
|---|---|---|---|---|
| **REP-001** | Scan Audit Report Generation | The system shall export comprehensive duplicate analysis reports detailing group clusters, file paths, hashes, and size savings. | HTML, JSON, CSV formats | [duplicate_bin/engine/reporting.py#L25-L120](file:///c:/Users/mustafa/Desktop/duplicate-bin/duplicate_bin/engine/reporting.py#L25-L120) | **Must Have** |
| **REP-002** | Central Web Dashboard Analytics | The SaaS portal shall aggregate and display total bytes saved, active paired devices, remaining credit balance, and scan history. | JSON response to UI (`/api/dashboard/stats`) | [backend/app/main.py#L202-L243](file:///c:/Users/mustafa/Desktop/duplicate-bin/backend/app/main.py#L202-L243) | **Must Have** |
