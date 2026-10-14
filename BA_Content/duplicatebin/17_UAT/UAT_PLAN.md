# 🧪 Phase 17: User Acceptance Testing (UAT) Plan

> **Document Code:** UAT-PLN-001  
> **Project:** Duplicate Bin Ecosystem  
> **Target Release:** v0.2.0 Desktop + v1.0.0 SaaS Hybrid  
> **Lead Author:** Senior Technical Business Analyst / QA Analyst Lead  

---

## 1. The Role of the Business Analyst in UAT

In enterprise software delivery, the Business Analyst serves as the **custodian of business intent** during User Acceptance Testing. While Quality Assurance (QA) engineers test against technical specifications and system boundaries, the BA ensures the system solves the original business problem and satisfies real-world user workflows:

1. **UAT Test Scenario Authoring:** Translating business requirements (BRD/FRD) and user stories into realistic business scenarios.
2. **Business User Facilitation:** Guiding end-user stakeholders (photographers, IT admins, agency owners) through test scripts without technical jargon.
3. **Defect Triage & Impact Classification:** Determining whether an unexpected system behavior constitutes a critical business blocker, a minor defect, or an out-of-scope change request.
4. **Traceability Governance:** Ensuring all business acceptance criteria defined in the Requirements Catalog are explicitly exercised and signed off.
5. **Formal Acceptance Recommendation:** Delivering the final UAT Summary Report and recommending Go/No-Go release decisions to the Product Owner and Executive Sponsor.

---

## 2. UAT Scope & Boundaries

### In-Scope for UAT
- End-to-end directory scanning across mixed-media repositories (photos, videos, PDFs, code).
- Validation of two-pass size pre-filtering and cryptographic hash accuracy.
- Execution of all 8 automated selection heuristics (`Keep Best Quality`, `Keep Newest`, etc.).
- Non-destructive archiving to quarantine and 1-click restore verification (`Ctrl+Z`).
- Workstation pairing via 6-digit codes and remote scan triggering.
- Credit deduction ledger accuracy upon scan completion.
- Usability of drag-and-drop ingestion and keyboard shortcuts.

### Out-of-Scope for UAT
- Code-level unit testing and performance benchmarking (handled in internal QA sprint cycles).
- Direct cloud API crawling without local folder synchronization.
- Operating system stress testing under kernel failure conditions.

---

## 3. Test Environment & Prerequisites

| Environment Component | Specification |
|---|---|
| **Client OS Workstations** | Windows 11 Pro (64-bit), Ubuntu 22.04 LTS, macOS Sonoma (M-series / x86_64). |
| **SaaS Cloud Backend** | Local or staging Uvicorn/FastAPI server connected to SQLite/PostgreSQL staging instance. |
| **Test Data Repository** | Synthetic and real-world directory structures containing: <br>• 1,000 files with known duplicates.<br>• 10,000 files with mixed extensions (RAW, JPEG, MP4, PDF).<br>• Zero-byte files, symlinks, and read-only files. |
| **Network Configuration** | Active local network connection for WebSocket testing; offline mode validation toggle. |

---

## 4. UAT Entry & Exit Criteria

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ UAT ENTRY CRITERIA (Must be 100% satisfied before UAT begins)               │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. 100% of unit and integration tests passing in CI/CD pipeline.            │
│ 2. Zero Severity-1 (Blocker) or Severity-2 (Critical) defects open.         │
│ 3. Staging backend deployed and verified via healthcheck endpoints.         │
│ 4. Test datasets and seed directories staged across target workstations.    │
│ 5. UAT test scripts approved by Business Analyst and Product Owner.         │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ UAT EXIT CRITERIA (Must be satisfied for Go/No-Go release sign-off)         │
├─────────────────────────────────────────────────────────────────────────────┤
│ 1. 100% of Must-Have (P1) UAT test cases executed and passed.               │
│ 2. 0 open critical business-blocking defects.                               │
│ 3. 100% data recovery verified during quarantine rollback testing.          │
│ 4. Business Owner and IT Admin stakeholders have formally signed off.       │
│ 5. User documentation and quick-start guides match actual software behavior.│
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Defect Severity & Triage Protocol

| Severity Level | Definition | Business Impact | SLA for Resolution |
|---|---|---|---|
| **Sev-1 (Blocker)** | Permanent data loss, system crash, or complete scan freeze. | Halts all business operations; unacceptable release risk. | 4 Hours (Immediate hotfix) |
| **Sev-2 (Critical)** | Core feature failure (e.g., selection strategy selects all files; pairing fails). | Major workflow blocked; no viable business workaround. | 24 Hours |
| **Sev-3 (Major)** | Secondary feature failure (e.g., image thumbnail fails to render; shortcut fails). | Annoying to user, but viable manual workaround exists. | Within Current Sprint |
| **Sev-4 (Minor)** | Minor UI alignment, cosmetic dark-theme discrepancy, or typo. | Trivial cosmetic impact; does not hinder functionality. | Backlog Prioritization |
