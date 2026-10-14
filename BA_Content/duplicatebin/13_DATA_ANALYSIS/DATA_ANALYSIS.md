# 🗄️ Phase 13: Data Architecture & Entity Relationship Analysis

> **Document Code:** DA-DOC-001  
> **Project:** Duplicate Bin Ecosystem  
> **Scope:** Cloud Relational Schema (PostgreSQL/SQLite) & Desktop Local Persistence (SQLite WAL / JSON)  
> **Diagramming:** Mermaid Entity Relationship Diagram (ERD)  

---

## 1. Unified Data Architecture

The Duplicate Bin data tier is architected into two distinct tiers:
1. **Local Desktop Tier (Offline-First):** SQLite database (`~/.cache/duplicate-bin/hash_cache.db`) operating with Write-Ahead Logging (WAL) for high-concurrency file hash caching, and JSON manifests for quarantine rollback tracking.
2. **Cloud SaaS Tier (Centralized Fleet Management):** Relational database (SQLAlchemy models in `backend/app/models.py`) tracking user identities, paired devices, telemetry history, and credit ledgers.

---

## 2. Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    USER ||--o{ DEVICE : "owns / manages"
    DEVICE ||--o{ SCAN : "executes / reports"

    USER {
        string id PK "UUID Primary Key"
        string email UK "Unique User Email"
        string name "User Full Name"
        string password_hash "Bcrypt Salted Hash"
        bigint credit_bytes "Remaining Deduplication Credit (Bytes)"
        string plan "Subscription Tier (e.g. SaaS Premium)"
        datetime created_at "Account Creation Timestamp"
    }

    DEVICE {
        string id PK "Hardware UUID / Agent Machine ID"
        string user_id FK "References USER(id) ON DELETE CASCADE"
        string name "Hostname / Device Nickname"
        string os "Operating System (Windows, Linux, Darwin)"
        string pairing_token "Cryptographic 64-char Hex Token"
        boolean is_active "Real-time Connectivity Indicator"
        datetime last_seen "Last Heartbeat / Activity"
        datetime created_at "Registration Timestamp"
    }

    SCAN {
        string id PK "Scan UUID"
        string device_id FK "References DEVICE(id) ON DELETE CASCADE"
        string status "Status: running, completed, failed"
        string path_scanned "Target Directory Scanned"
        integer files_count "Total Files Analyzed"
        integer duplicates_count "Total Redundant Files Found"
        integer bytes_recoverable "Total Reclaimable Bytes"
        float duration_seconds "Total Execution Time (Seconds)"
        datetime created_at "Scan Initiation Timestamp"
        datetime completed_at "Scan Completion Timestamp"
    }

    LOCAL_HASH_CACHE {
        string file_path PK "Canonical Absolute File Path"
        bigint file_size "Exact Byte Size"
        float mtime "File Modification Timestamp"
        string hash_value "Cryptographic Digest (SHA-256/MD5)"
        string algorithm "Algorithm Used"
        datetime cached_at "Cache Entry Timestamp"
    }
```

---

## 3. Business Entity Profiles

### 3.1 Entity: `User`
- **Business Meaning:** Represents the customer entity (individual creator or corporate account holder) who owns software licenses and holds deduplication credits.
- **Primary Purpose:** Authentication, billing ledger maintenance, and fleet ownership root.
- **Key Attributes:**
  - `credit_bytes` (BigInteger): The core monetization balance. Default allocation is $10,737,418,240$ bytes (10 GB free tier).
  - `plan` (String): Controls enterprise features (e.g., "SaaS Premium", "Team Starter").
- **Data Owner:** Account / Finance Domain.
- **Persistence:** Cloud database `users` table.

### 3.2 Entity: `Device`
- **Business Meaning:** Represents a physical desktop or server running the Duplicate Bin background agent.
- **Primary Purpose:** Enforces authorization boundaries for remote scan execution and routes WebSocket commands.
- **Key Attributes:**
  - `pairing_token` (String): Secure 64-character secret generated during the 6-digit handshake. Validates incoming WebSocket requests.
  - `is_active` (Boolean): Dynamically derived based on live WebSocket registry status.
- **Data Owner:** Systems Engineering / IT Admin Domain.
- **Persistence:** Cloud database `devices` table.

### 3.3 Entity: `Scan`
- **Business Meaning:** Represents an individual deduplication audit event executed on a specific device.
- **Primary Purpose:** Ingests operational telemetry to drive dashboard ROI charts and trigger credit deductions.
- **Key Attributes:**
  - `bytes_recoverable` (Integer): The measured duplicate file volume. Serves as the mathematical basis for credit deduction.
  - `duplicates_count` (Integer): Total redundant files discovered.
  - `duration_seconds` (Float): Scan execution time, used for system health and speed benchmarks.
- **Data Owner:** Telemetry & Analytics Domain.
- **Persistence:** Cloud database `scans` table.

### 3.4 Entity: `LocalHashCache` (Client SQLite)
- **Business Meaning:** Client-side digital fingerprint ledger that avoids redundant disk reads.
- **Primary Purpose:** Accelerates rescanning of unchanged files from minutes to milliseconds.
- **Validation Key:** Triple compound check `(file_path, file_size, mtime)`. If the OS modification timestamp or file size changes, the cache entry is invalidated.
- **Persistence:** Embedded SQLite database (`hash_cache.db`) with Write-Ahead Logging.
