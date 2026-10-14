# 🏛️ Phase 19: Architectural & Business Decision Log (ADR)

> **Document Code:** DEC-LOG-001  
> **Project:** Duplicate Bin Ecosystem  
> **Standard:** Architecture Decision Records (ADR) / Business Decision Records  

---

## 1. Architectural & Business Decision Ledger

| Decision ID | Decision Title | Decision Date | Decision Owner | Primary Rationale & Trade-offs | Status |
|---|---|---|---|---|---|
| **DEC-001** | Selection of Union-Find Disjoint Sets for Duplicate Clustering | Q2 2026 | Lead Architect / BA | **Chosen over Key-Based Dictionary.** Solves the transitive grouping bug ($A=B \land B=C \implies \{A,B,C\}$) in $O(n \alpha(n))$ near-linear time with zero group fragmentation. | **ADOPTED** |
| **DEC-002** | Adoption of 10 GB Free Deduplication Credit Baseline | Q4 2026 | Product Owner / BA | **Reconciled 5 GB vs 10 GB discrepancy.** Standardizing on 10 GB in `models.py` allows creators to complete at least one full real-world cleanup workflow before being prompted to purchase credit packs. | **ADOPTED** |
| **DEC-003** | Use of SQLite WAL Mode for Persistent Hash Cache | Q2 2026 | Lead Architect | **Chosen over in-memory or flat JSON files.** SQLite with Write-Ahead Logging allows concurrent thread reads and writes without database lock contention. | **ADOPTED** |
| **DEC-004** | Mandating JSON over Python `pickle` for Scan Checkpoints | Q3 2026 | Security Auditor / BA | **Security Hardening Decision.** Disallows arbitrary code execution vulnerabilities associated with untrusted deserialization of Python pickle binaries. | **ADOPTED** |
| **DEC-005** | Hybrid Cloud Relay Architecture (Local Engine + Web Dashboard) | Q4 2026 | Product Owner / BA | **Balances Privacy and Enterprise Governance.** File hashing executes locally (zero file exfiltration), while high-level telemetry and commands flow through FastAPI WebSockets. | **ADOPTED** |
| **DEC-006** | LRU In-Memory Cache Cap for GUI Previews (200 Pixmaps) | Q3 2026 | UI Lead / BA | **Memory Bounding Decision.** Prevents Out-Of-Memory (OOM) crashes in PySide6 when users scroll through thousands of high-resolution duplicate photo thumbnails. | **ADOPTED** |
