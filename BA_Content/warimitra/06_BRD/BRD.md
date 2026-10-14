# Business Requirements Document (BRD) — WariMitra

> **Document Identifier:** WM-BRD-2026-V2.0  
> **Project Title:** WariMitra — Digital Wari Ecosystem  
> **Domain:** GovTech, Public Safety & Mass Gathering Emergency Response  
> **Author:** Senior Technical Business Analyst / Product Owner  
> **Document Status:** Baseline Approved (v2.0 Serverless Production Cutover)  
> **Traceability Anchor:** `docs/BRD.md`, `ARCHITECTURE.md`, `functions/src/index.ts`  

---

## 1. Document Control & Version History

### 1.1 Document History
| Version | Date | Author / Role | Summary of Changes | Approval Status |
| :--- | :--- | :--- | :--- | :--- |
| **v1.0** | 2026-06-15 | Lead Product Analyst | Initial baseline derived from Varithon hackathon Stage 1 requirements (Django monolith). | Archived |
| **v1.5** | 2026-07-28 | Senior Technical BA | Architectural pivot to Firebase Serverless v2.0; added Geohash proximity medical queries. | Approved |
| **v2.0** | 2026-08-11 | Senior Business Analyst | Integrated Web3 Trust Layer specifications, IEEE 829 test alignment, and 7 RBAC roles. | **Signed Off** |

### 1.2 Sign-off & Approvals
| Stakeholder Role | Name / Title | Organization | Approval Date | Signature Status |
| :--- | :--- | :--- | :--- | :--- |
| **Project Sponsor** | Divisional Commissioner | Pune Division, Govt of Maharashtra | 2026-08-12 | *Digital Sign-off* |
| **Lead Law Enforcement** | Superintendent of Police | Solapur Rural District Police | 2026-08-12 | *Digital Sign-off* |
| **Public Health Director** | Chief Medical Officer | Dept of Public Health, Maharashtra | 2026-08-13 | *Digital Sign-off* |
| **Lead Solution Architect** | Cloud Systems Architect | WariMitra Core Engineering | 2026-08-13 | *Verified Architecture* |

---

## 2. Executive Summary & Business Background

### 2.1 The Tradition of the Pandharpur Wari
The Pandharpur Wari is an annual pilgrimage honoring Lord Vitthal, celebrated continuously for over seven centuries across Maharashtra. During the month of *Ashadh*, over **500,000 to 1,000,000+ devotees (*Varkaris*)** assemble in Alandi and Dehu, marching 250+ kilometers on foot over 21 days organized into community contingents (*Dindis*) to reach the temple town of Pandharpur (`VARIMITRA_SPEAKER_CONTEXT.md:58-68`).

### 2.2 Business Need
Despite its cultural grandeur, the pilgrimage poses an immense logistical and human safety challenge. The transit corridor crosses state highways, rural ghats, and small municipal townships whose local emergency and civic infrastructure is overwhelmed by a 1000% surge in transient population. In previous years, emergency medical responses were severely delayed, crowd bottlenecks formed at narrow temple gates without warning, and thousands of separated elderly pilgrims and children swamped temporary police outposts (`docs/BRD.md:6-13`).

### 2.3 System Purpose
**WariMitra** provides a unified, zero-latency digital public infrastructure connecting pilgrims on the ground directly with district collectors, police superintendents, medical officers, municipal engineers, and charitable NGOs.

---

## 3. Business Problem & Opportunity Statement

### 3.1 Problem Statement
> *"The lack of a unified real-time coordination platform during the 21-day Pandharpur Wari causes severe delays in emergency healthcare dispatch (frequently exceeding 45 minutes), unmonitored crowd surges at high-density chokepoints, inefficient deployment of civic amenities (water/sanitation), and multi-day delays in missing persons reunification."*

### 3.2 Expected Business Value & Outcomes
1. **Human Safety & Golden-Hour Care:** Cut critical medical dispatch time to $< 10$ minutes by routing exact GPS coordinates to the nearest active mobile responder or medical camp (`docs/BRD.md:34`).
2. **Operational Transparency & Trust:** Provide an unalterable, non-repudiable record of state emergency actions using cryptographic proofs, eliminating administrative disputes during judicial inquiries (`docs/WEB3_ARCHITECTURE.md:3`).
3. **Decentralized Municipal Efficiency:** Empower relief NGOs and sanitation contractors to position water tankers, bio-toilets, and community kitchens where crowd telemetry indicates urgent demand.

---

## 4. Project Scope

### 4.1 In-Scope Capabilities (v2.0)
* **Emergency Management:** Mobile 3-second hold SOS trigger, rate limiting, India-only geofence validation, backend idempotency, and multi-agency FCM multicast dispatch.
* **Geospatial Medical Services:** Real-time Geohash discovery of active medical camps within 10 km, tracking bed capacity and patient counts, with 108 ambulance direct dial.
* **Command Center Operations:** Real-time Next.js web portal displaying Google Maps GIS telemetry, live incident queues with virtualized lists, and multi-agency status triage.
* **Temple Darshan Telemetry:** Monitoring queue wait times and headcount across temple gates; digital darshan slot pass booking.
* **Family & Missing Persons:** 6-character group invite code for ad-hoc family tracking with 30s GPS pings; missing person photo intake and resolution tracking.
* **Sanitation & Relief Monitoring:** Mapping civic mobile toilets, logging community waste reports with photos, and directory of NGO food camps.
* **Web3 Trust Layer:** Automated SHA-256 hash generation of critical incident state changes anchored onto the Sepolia testnet ledger via zero-ETH self-transactions.

### 4.2 Out-of-Scope (Deferred to Future Releases)
* **Automated AI Face Matching:** Algorithmic facial recognition comparing missing persons against drone or CCTV video feeds (`VARIMITRA_SPEAKER_CONTEXT.md:164`).
* **Hardware Drone Telemetry:** Direct automated ingestion of police drone video feeds into the web command center.
* **Offline SMS/IVR Gateway:** Standalone voice response or two-way SMS communication for pilgrims lacking smartphones (`VARIMITRA_SPEAKER_CONTEXT.md:167-168`).
* **Direct Financial Donations / UPI Gateway:** Direct processing of monetary temple donations or NGO fundraising in-app.

---

## 5. Stakeholder Matrix & Core Operational Roles

| Role Key | Operational Group | Primary Interface | Primary Operational Responsibility |
| :--- | :--- | :--- | :--- |
| `pilgrim` | Varkaris & Families | Flutter Mobile App | Access routes, trigger SOS, check queue wait times, find water/camps. |
| `volunteer` | Ground Youth Volunteers | Mobile App | Ground verification of incidents, field-level elderly assistance. |
| `dindi_leader` | Marching Contingent Heads | Mobile App | Dindi group roster tracking, contingent emergency broadcasts. |
| `medical_officer` | Doctors & Paramedics | Web & Mobile | Triage medical alerts, update camp bed capacity, log patient check-ins. |
| `police_officer` | District Police & Traffic | Web Command Center | Triage SOS incidents, monitor crowd density, resolve missing persons. |
| `ngo` | Charitable Relief Trusts | Web Dashboard | Register free kitchens, update food and water inventory. |
| `admin` / `government` | District Magistrates & SPs | Web Command Center | District-wide oversight, executive KPI monitoring, audit inspections. |

---

## 6. Business Requirements Specification

### 6.1 Emergency Distress & Life Safety
* **BR-SOS-01 (Rapid Trigger):** The system must enable any registered pilgrim or bystander to trigger an emergency distress call within 3 seconds using intuitive, single-gesture controls requiring zero typed text (`functions/src/index.ts:20-40`).
* **BR-SOS-02 (Anti-Abuse & Rate Limiting):** The system must prevent denial-of-service floods or malicious false alarms by enforcing a strict cap of 5 SOS alerts per minute per user account (`functions/src/index.ts:59-70`).
* **BR-SOS-03 (Geographical Integrity):** The system must reject distress pings originating outside the sovereign boundaries of India to prevent spoofed remote attacks (`functions/src/index.ts:72-80`).
* **BR-SOS-04 (Multi-Agency Broadcasting):** An active emergency alert must be simultaneously delivered to on-duty police, medical officers, and district administrators within 2 seconds of creation (`functions/src/index.ts:182-218`).

### 6.2 Healthcare Delivery & Bed Management
* **BR-MED-01 (Proximity Discovery):** The system must provide pilgrims and field responders with an ordered directory of active medical relief camps within a 10 km radius sorted by walking proximity (`functions/src/index.ts:122-177`).
* **BR-MED-02 (Capacity Transparency):** Medical camps must maintain live visibility over their total bed capacity, currently admitted patients, and available staff to prevent overcrowding (`ARCHITECTURE.md:212-218`).

### 6.3 Public Order, Crowd Control & Temple Queues
* **BR-CRD-01 (Crowd Situational Awareness):** The command center must visualize live aggregate pilgrim locations via clustered Google Maps markers to detect dangerous crowd concentrations (`frontend/src/app/crowd/`).
* **BR-CRD-02 (Queue Wait-Time Telemetry):** The system must compute and display real-time wait times and headcount for each temple entry gate, enabling dynamic pilgrim distribution across gates (`frontend/src/app/temple/`).

### 6.4 Public Governance & Cryptographic Accountability
* **BR-GOV-01 (Immutable Audit Ledger):** The system must record every major emergency event (Creation, Acknowledgment, Dispatch, Resolution) as an immutable, cryptographically verifiable hash snapshot on a public blockchain ledger (`docs/WEB3_ARCHITECTURE.md`, `functions/src/trustLayer/`).
* **BR-GOV-02 (Zero-Cost Fiscal Compliance):** The cryptographic trust layer must operate strictly at ₹0 gas fee cost to the state exchequer, leveraging zero-value testnet transactions or self-addressed data envelopes (`docs/WEB3_ARCHITECTURE.md:26-31`).

---

## 7. Business Rules

* **BRULE-001 (Idempotent SOS Retries):** If an SOS request containing an identical client-generated `idempotencyKey` is received within 60 seconds, the system shall return the existing record without generating a duplicate dispatch (`functions/src/index.ts:43-56`).
* **BRULE-002 (Authority-Only Incident Closure):** Only authenticated users holding custom claims `police_officer`, `medical_officer`, or `admin` are authorized to update emergency status to `dispatched` or `resolved` (`firestore.rules:26-28,54`).
* **BRULE-003 (System-Generated Audit Logs):** Audit log entries in `auditLogs` are exclusively writable by server-side Cloud Functions; direct client insertion or deletion is strictly forbidden (`firestore.rules:174-177`).
* **BRULE-004 (Active Camp Query Constraint):** The medical camp discovery engine shall only return facilities whose administrative status is set to `active` (`functions/src/index.ts:145`).

---

## 8. Success Metrics & Key Performance Indicators (KPIs)

| Metric Code | Metric Name | Baseline (As-Is) | Target (To-Be) | Actual Repo Verification |
| :--- | :--- | :--- | :--- | :--- |
| **KPI-01** | Emergency SOS Creation Latency | 15–45 minutes | $< 2.0$ seconds | **1.2s (p95)** (`README.md:243`) |
| **KPI-02** | Command Center Sync Latency | No sync (radio only) | $< 2.0$ seconds | **1.5s (p95)** (`README.md:245`) |
| **KPI-03** | Medical Camp Proximity Discovery | 30–60 minutes | $< 5.0$ seconds | **320ms read (p95)** (`README.md:244`) |
| **KPI-04** | Photo Upload Latency (5MB) | Physical photos | $< 5.0$ seconds | **3.8s (p95)** (`README.md:246`) |
| **KPI-05** | Cloud Functions Rate Limit Cap | No rate limiting | 5 SOS / minute / user | **Enforced in code** (`functions/src/index.ts:68`) |

---

## 9. Assumptions, Constraints, and Risks

### 9.1 Assumptions
1. Pilgrims or at least one accompanying family/dindi member possess an Android smartphone with active cellular data along the national highway.
2. Field police units and medical camps are equipped with tablets or smartphones with internet access.

### 9.2 Constraints
1. **Network Fluctuations:** Mobile application must handle intermittent 2G/3G/4G connectivity via local caching.
2. **Language Barrier:** System must prioritize native Marathi UI text and high-contrast iconography for elderly users.

### 9.3 Critical Project Risks
1. **Spurious Alarm Flooding:** Panic button abuse mitigated via 3-second hold physics gesture and 5/min rate limiting.
2. **Blockchain RPC Degradation:** Addressed via fail-safe fallback writing SHA-256 hashes to local Firestore collection with status `LOCAL_PROOF_ONLY`.
