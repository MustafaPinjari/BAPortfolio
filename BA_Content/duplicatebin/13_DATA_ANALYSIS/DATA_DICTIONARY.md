# 📚 Data Dictionary & Schema Specification

> **Document Code:** DD-DOC-001  
> **Project:** Duplicate Bin Ecosystem  
> **Databases:** Cloud SaaS Database (SQLAlchemy / PostgreSQL / SQLite) & Client Persistent Cache (SQLite WAL)  

---

## 1. Cloud SaaS Database (`backend/app/models.py`)

### 1.1 Table: `users`
Represents customer account credentials, subscription tiers, and credit ledgers.

| Field Name | Data Type | Nullable | Primary Key | Default | Business Description & Validation Rules | Example |
|---|---|---|---|---|---|---|
| `id` | `VARCHAR(36)` | No | Yes | `uuid.uuid4()` | System-generated unique identifier for the user account. | `"c8a9f3b2-7a41-48e2-b1c5-23f4a908d1e3"` |
| `email` | `VARCHAR(255)` | No | No | None | Unique login email address. Must be a valid email format. | `"elena.photos@gmail.com"` |
| `name` | `VARCHAR(100)` | No | No | None | Full display name of the customer or account holder. | `"Elena Rostova"` |
| `password_hash`| `VARCHAR(255)` | No | No | None | Bcrypt-hashed password digest. Plaintext is never persisted. | `"$2b$12$e8Y4vL..."` |
| `credit_bytes` | `BIGINT` | Yes | No | `10737418240` | Available deduplication credit balance in bytes. Default 10 GB. Debited upon scan completion. | `10737418240` (10 GB) |
| `plan` | `VARCHAR(50)` | Yes | No | `"SaaS Premium"`| Active subscription tier (e.g., "Free", "SaaS Premium", "Team Starter", "Business Premium"). | `"Team Starter"` |
| `created_at` | `DATETIME` | Yes | No | `utcnow()` | UTC timestamp when account was registered. | `"2026-10-03 14:32:00"` |

---

### 1.2 Table: `devices`
Represents paired client machines running the Duplicate Bin background daemon.

| Field Name | Data Type | Nullable | Primary Key | Foreign Key | Business Description & Validation Rules | Example |
|---|---|---|---|---|---|---|
| `id` | `VARCHAR(36)` | No | Yes | No | Unique hardware identifier or client-generated machine UUID. | `"agent-node-04-macbook"` |
| `user_id` | `VARCHAR(36)` | No | No | `users.id` (CASCADE) | Identifies the owning user account. Deleted if user account is deleted. | `"c8a9f3b2-7a41-..."` |
| `name` | `VARCHAR(100)` | No | No | No | Hostname or user-assigned label for the machine. | `"Elena-Studio-MacBook"` |
| `os` | `VARCHAR(50)` | No | No | No | Operating system platform (`Windows`, `Linux`, `Darwin`). | `"Windows 11 Pro"` |
| `pairing_token`| `VARCHAR(64)` | No | No | No | 64-character hexadecimal shared secret used to authenticate WebSockets. | `"9a4f2c018b7e..."` |
| `is_active` | `BOOLEAN` | Yes | No | No | Online presence flag. Dynamically synchronized with active WebSockets. | `True` |
| `last_seen` | `DATETIME` | Yes | No | `utcnow()` | Timestamp of last received telemetry heartbeat or WebSocket ping. | `"2026-10-03 18:15:22"` |
| `created_at` | `DATETIME` | Yes | No | `utcnow()` | Initial registration timestamp of the device. | `"2026-10-01 09:12:00"` |

---

### 1.3 Table: `scans`
Records completed or in-progress scan audits executed by paired devices.

| Field Name | Data Type | Nullable | Primary Key | Foreign Key | Business Description & Validation Rules | Example |
|---|---|---|---|---|---|---|
| `id` | `VARCHAR(36)` | No | Yes | No | Unique scan audit identifier. | `"scan-8291f0-4821"` |
| `device_id` | `VARCHAR(36)` | No | No | `devices.id` (CASCADE) | Identifies the physical device executing the scan. | `"agent-node-04-macbook"` |
| `status` | `VARCHAR(20)` | No | No | No | Lifecycle status: `running`, `completed`, `failed`, `cancelled`. | `"completed"` |
| `path_scanned` | `VARCHAR(500)` | No | No | No | Absolute root path evaluated during this scan audit. | `"D:\Photos\2026_Weddings"` |
| `files_count` | `INTEGER` | Yes | No | `0` | Total number of files scanned in target directory. | `14250` |
| `duplicates_count`| `INTEGER` | Yes | No | `0` | Total redundant duplicate files identified. | `3120` |
| `bytes_recoverable`| `BIGINT` | Yes | No | `0` | Total potential storage savings in bytes. Used to debit `credit_bytes`. | `48318382080` (~45 GB) |
| `duration_seconds`| `FLOAT` | Yes | No | `0.0` | Total runtime of the scan in seconds. | `24.8` |
| `created_at` | `DATETIME` | Yes | No | `utcnow()` | Timestamp when scan was started or commanded. | `"2026-10-03 14:00:00"` |
| `completed_at` | `DATETIME` | Yes | No | None | Timestamp when scan finished and telemetry was ingested. | `"2026-10-03 14:00:25"` |

---

## 2. Desktop Local Hash Cache Database (`hash_cache.db`)

Embedded SQLite database stored in `~/.cache/duplicate-bin/hash_cache.db`.

| Column Name | SQLite Type | Constraints | Business Description |
|---|---|---|---|
| `file_path` | `TEXT` | `PRIMARY KEY` | Absolute canonical file path on local filesystem. |
| `file_size` | `INTEGER` | `NOT NULL` | Exact size in bytes. Checked against disk `st_size` on cache lookup. |
| `mtime` | `REAL` | `NOT NULL` | POSIX modification timestamp. If disk `mtime > cache.mtime`, cache is invalidated. |
| `hash_value` | `TEXT` | `NOT NULL` | Cryptographic hex digest (SHA-256 / MD5). |
| `algorithm` | `TEXT` | `NOT NULL` | Algorithm name (`sha256`, `md5`, `blake2b`). |
| `cached_at` | `TIMESTAMP` | `DEFAULT CURRENT_TIMESTAMP` | Timestamp when hash was recorded. |

---

## 3. Desktop Quarantine Manifest Format (`manifest.json`)

Stored locally inside each quarantine batch folder `~/.duplicate_bin/archive/<batch_timestamp>/manifest.json`.

```json
{
  "batch_id": "20261003_140522",
  "created_at": "2026-10-03T14:05:22.182Z",
  "total_files": 3,
  "total_bytes_archived": 104857600,
  "items": [
    {
      "original_path": "C:\\Users\\User\\Pictures\\Project\\shot_copy.raw",
      "archive_relative_path": "Pictures\\Project\\shot_copy.raw",
      "file_size": 52428800,
      "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    }
  ]
}
```
