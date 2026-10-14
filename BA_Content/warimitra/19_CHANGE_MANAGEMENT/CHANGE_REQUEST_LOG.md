# Change Request Log & Impact Assessment — WariMitra

> **Document Identifier:** WM-CR-019  
> **Classification:** Agile Change Control & Requirements Evolution  
> **Standard:** BABOK v3 Chapter 5 (Requirements Life Cycle Management - Assess Requirements Changes)  
> **Rule of Representation:** Every simulated scenario is explicitly tagged as `[SIMULATED INTERVIEW SCENARIO]` to distinguish it from the codebase baseline.  

---

## 1. Change Management Process & Governance

When a stakeholder requests a scope modification, the Business Analyst leads the Change Control process using a 5-step framework:
1. **Intake & Logging:** Capture proposed change in the Change Request Log.
2. **Impact Assessment:** Evaluate impact across Triple Constraints (Scope, Time/Schedule, Budget/Cost), plus Architecture, Security, and Compliance.
3. **Change Control Board (CCB) Review:** Present findings to Project Sponsor, Lead Architect, and District Police/Medical representatives.
4. **Disposition:** Formal outcome: `Approved`, `Rejected`, or `Deferred to Backlog`.
5. **Traceability Update:** If approved, update BRD, FRD, User Stories, and RTM.

---

## 2. Change Request Log

| CR ID | Title / Request Summary | Requesting Stakeholder | Business Justification | Architectural & Technical Impact | Estimated Effort | CCB Decision | Implementation Target |
| :--- | :--- | :--- | :--- | :--- | :---: | :---: | :---: |
| **CR-001** `[ACTUAL HISTORICAL EVOLUTION]` | **Pivot from Monolithic Django to Firebase Serverless v2.0** | Lead Solution Architect & Senior BA | Monolithic Django 6.0 with synchronous DB writes could not support real-time GPS pings from 500k+ pilgrims without fatal database lockups. | Complete rewrite of backend to Firebase Cloud Functions and Cloud Firestore (`asia-south1`). | 4 Weeks | **Approved** | v2.0 Production Cutover (`ARCHITECTURE.md:553`) |
| **CR-002** `[SIMULATED INTERVIEW SCENARIO]` | **Add Aadhaar-based Face Authentication for Darshan Slot Booking** | Temple Trust Executive | Reduce scalping and ensure only the registered devotee enters the VIP queue. | High technical complexity; requires integration with UIDAI Aadhaar biometric eKYC gateway; data privacy and DPDP Act compliance liabilities. | 6 Weeks | **Rejected** | Rejected due to privacy risk and network instability at rural gates. |
| **CR-003** `[SIMULATED INTERVIEW SCENARIO]` | **Automated Multi-lingual Voice Alert Dispatch (Marathi IVR)** | Rural Dindi Leaders Association | Many elderly devotees (75+ years) cannot read text notifications or hear phone pings in loud cymbal-playing processions. | Integration with an external Twilio / Exotel telephony gateway to trigger outbound automated phone calls with pre-recorded Marathi voice. | 2 Weeks | **Approved** | Deferred to Post-Wari v2.1 |
| **CR-004** `[SIMULATED INTERVIEW SCENARIO]` | **Dynamic Water Tanker Telemetry Integration (IoT Flow Meters)** | Pune Municipal Corporation Water Works | Ensure water tankers along the highway are refilled before running completely dry during midday heat. | Ingest ultrasonic liquid level sensor pings via MQTT into a new Firestore collection `waterTankers`. | 3 Weeks | **Approved** | Slated for Phase 3 Expansion |

---

## 3. Deep-Dive Change Impact Analysis: Example CR-001 (Django to Firebase Pivot)

### 3.1 Business Context
During Stage 1 (Varithon Hackathon), the initial backend was implemented as a Django 6.0 application backed by SQLite/PostgreSQL. An architectural pre-production review (`Reference files/backend_audit.md`) evaluated this architecture and issued a score of 6.2/10 (High Risk), warning that synchronous GPS updates and WebSocket broadcasting would exhaust database connections and CPU.

### 3.2 Impact Analysis Conducted by the Business Analyst:
1. **Scope Impact:** Removed relational migrations and Django Channels; adopted serverless NoSQL documents and native real-time listeners.
2. **Performance Impact:** Reduced SOS ingestion latency from projected 8–15s under peak queue congestion to an empirical 1.2s p95 on Cloud Functions.
3. **Cost Impact:** Eliminated fixed monthly EC2/RDS server costs ($400+/mo), moving to Firebase Blaze pay-as-you-go projected at ~$185/month for 1M users.
4. **Risk Mitigation:** Decoupled client operations from server maintenance windows; native offline persistence in Flutter app ensured field resilience.
