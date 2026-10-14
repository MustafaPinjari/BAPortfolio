# Comprehensive Risk Register & Threat Matrix — WariMitra

> **Document Identifier:** WM-RSK-020  
> **Classification:** Project Risk Assessment & Threat Mitigation Strategy  
> **Standard:** ISO 31000 / BABOK v3 Section 6.3  
> **Target Audience:** Program Managers, Solution Architects, Lead Business Analysts, Interview Panels  
> **Evidence Sources:** `Reference files/backend_audit.md:54-63`, `ARCHITECTURE.md:474-484`, `docs/SECURITY.md`  

---

## 1. Risk Analysis Methodology

Risks are quantified using a $5 \times 5$ Risk Severity Matrix:
$$\text{Risk Severity} = \text{Probability (1–5)} \times \text{Impact (1–5)}$$

* **Critical (16–25):** Severe threat to life safety, complete system outage, or statutory breach.
* **High (10–15):** Impaired operational capability; significant delay in emergency response.
* **Medium (5–9):** Moderate operational friction; acceptable workaround available.
* **Low (1–4):** Cosmetic or minor administrative inconvenience.

---

## 2. Risk Register

### Category A: Risks Identified Directly from Project Codebase & Audits

| Risk ID | Risk Classification | Risk Description & Cause | Operational Impact | Prob (1–5) | Imp (1–5) | Severity Score | Mitigation Implemented in Codebase | Risk Owner | Current Status |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :--- | :--- | :---: |
| **RSK-001** | `IDENTIFIED FROM PROJECT` | **Database Lockups from Concurrent GPS Pings:** Monolithic relational database locks up when 100k+ pilgrims send periodic location updates simultaneously (`backend_audit.md:58`). | Total system freeze; emergency SOS alerts blocked. | 5 | 5 | **25 (Critical)** | Pivoted backend to Firebase Cloud Firestore and serverless Cloud Functions, auto-scaling to 10k+ writes/sec (`ARCHITECTURE.md:553`). | Solution Architect | 🟢 **Mitigated** |
| **RSK-002** | `IDENTIFIED FROM PROJECT` | **Fake SOS Flooding / Denial-of-Service:** Malicious actors or bots flood emergency API with fake panic requests (`backend_audit.md:59`, `functions/src/index.ts:59`). | Responders overwhelmed; genuine life-threatening emergencies delayed. | 4 | 5 | **20 (Critical)** | Implemented 3-second hold physics gesture, device idempotency UUIDs, 5 req/min rate limiting, and India-only geofence bounds. | Lead Backend Dev | 🟢 **Mitigated** |
| **RSK-003** | `IDENTIFIED FROM PROJECT` | **Blockchain RPC Node Congestion / Outage:** Public Ethereum testnet RPC times out or is rate-limited during high-frequency emergency events (`docs/WEB3_ARCHITECTURE.md:32`). | Failure to record cryptographic proof of emergency events. | 4 | 3 | **12 (High)** | Implemented automated fail-safe fallback: Cloud Function catches RPC failure, stores hash in local Firestore with status `LOCAL_PROOF_ONLY`. | Web3 Lead | 🟢 **Mitigated** |
| **RSK-004** | `IDENTIFIED FROM PROJECT` | **Open Test Security Rules in Firestore:** Firestore security rules for `sosAlerts` and `blockchainProofs` temporarily open with `allow read, write: if true;` for rapid testing (`firestore.rules:55,180`). | Data tampering or unauthorized read of sensitive incident coordinates. | 4 | 4 | **16 (Critical)** | Must reinstate strict role check `canManageEmergencies()` prior to official production pilgrimage deployment. | Security Analyst | 🟡 **Open / In Progress** |

---

### Category B: BA-Recommended Operational & Environmental Risks

| Risk ID | Risk Classification | Risk Description & Cause | Operational Impact | Prob (1–5) | Imp (1–5) | Severity Score | Recommended Mitigation Strategy | Risk Owner | Current Status |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :--- | :--- | :---: |
| **RSK-005** | `BA-RECOMMENDED RISK` | **Cellular Blackouts in Rural Ghat Corridors:** Pilgrimage passes through remote valleys (e.g., Dive Ghat) where cellular towers experience 100% capacity saturation. | Mobile apps cannot reach Cloud Functions or Firestore. | 4 | 4 | **16 (Critical)** | Pre-cache regional maps and static clinic directories on device; implement background SQLite retry queue syncing upon signal re-acquisition. | Mobile Lead | 🟡 **Planned** |
| **RSK-006** | `BA-RECOMMENDED RISK` | **Device Battery Depletion on Long Marches:** Pilgrims walk 10–12 hours daily without charging points; continuous GPS polling exhausts phone batteries. | Devotee phones die, leaving them untraceable and unable to call for help. | 4 | 3 | **12 (High)** | Implement adaptive location throttling: reduce location ping frequency to every 5 minutes when device battery drops below 20%. | Product Owner | 🟡 **Recommended** |
| **RSK-007** | `BA-RECOMMENDED RISK` | **Demographic Digital Literacy Hesitation:** Elderly rural pilgrims (70+ years) mistrust smartphone apps and rely strictly on physical inquiries. | Low mobile adoption in the most vulnerable demographic. | 4 | 3 | **12 (High)** | Empower youth Ground Volunteers with the app to act as digital proxies and intermediaries on behalf of elderly devotees. | Community Lead | 🟢 **Operationalized** |
