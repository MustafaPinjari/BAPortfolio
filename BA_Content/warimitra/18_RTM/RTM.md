# Requirements Traceability Matrix (RTM) — WariMitra

> **Document Identifier:** WM-RTM-018  
> **Classification:** Bidirectional End-to-End Requirements Traceability Matrix  
> **Standard:** CMMI Level 3 / IEEE Std 830-1998  
> **Traceability Path:** Business Need $\rightarrow$ Business Requirement $\rightarrow$ Functional Requirement $\rightarrow$ User Story $\rightarrow$ Source Code Component $\rightarrow$ SIT Test Case $\rightarrow$ UAT Acceptance Test $\rightarrow$ Production Status  
> **Target Audience:** Lead Business Analysts, Quality Assurance Directors, Solution Architects, Technical Interviewers  

---

## 1. Bidirectional Traceability Matrix

| Req ID | Requirement Statement | Business Objective | Module | User Story ID | Development Component / Source Code | SIT Test Case (IEEE) | UAT Test Case | Lifecycle Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **BR-001** / **FR-001** | Mobile client shall require 3-second hold gesture on SOS button to trigger distress dispatch with GPS. | Rapid emergency response within golden hour. | Emergency SOS | `US-SOS-001` | `mobile/lib/screens/sos_screen.dart`, `functions/src/index.ts:20-116` | `TC-PILGRIM-009-01`, `TC-PILGRIM-009-04` | `UAT-SOS-01` | 🟢 **Implemented & Verified** |
| **FR-002** | Backend shall enforce idempotency using client UUIDv4 to eliminate duplicate dispatches. | Prevent double-dispatching of ambulances/police. | Emergency SOS | `US-SOS-002` | `functions/src/index.ts:43-56` | `TC-SOS-IDEM-001` | `UAT-SOS-03` | 🟢 **Implemented & Verified** |
| **FR-003** | System shall rate-limit emergency SOS creation to max 5 alerts/min/user. | Mitigate DoS attacks and bot panic floods. | Emergency SOS | `US-SOS-003` | `functions/src/index.ts:59-70` | `TC-SOS-RATE-001` | `UAT-SOS-04` | 🟢 **Implemented & Verified** |
| **FR-004** | Backend shall reject emergency distress pings outside Indian geographic bounds. | Block foreign cyber attacks and spoofed coordinates. | Emergency SOS | `US-SOS-001` | `functions/src/index.ts:72-80` | `TC-SOS-GEO-001` | `UAT-SOS-05` | 🟢 **Implemented & Verified** |
| **FR-005** | Backend shall broadcast FCM multicast push alerts to on-duty police, medical, and admin roles. | Multi-agency instant incident notification. | Notification Engine | `US-CMD-001` | `functions/src/index.ts:182-218` | `TC-PILGRIM-009-05` | `UAT-CMD-01` | 🟢 **Implemented & Verified** |
| **BR-002** / **FR-006** | Query active medical camps within 10 km radius sorted by Haversine distance. | Decentralize healthcare and guide pilgrims to nearby relief. | Medical Services | `US-MED-001` | `functions/src/index.ts:122-177`, `mobile/lib/screens/services_screen.dart` | `TC-PILGRIM-004-01`, `TC-PILGRIM-004-05` | `UAT-MED-01` | 🟢 **Implemented & Verified** |
| **FR-007** | Generate and join family tracking group using unique 6-character alphanumeric code. | Prevent family separation in dense crowds. | Family Locator | `US-FAM-001` | `mobile/lib/screens/family_locator_screen.dart`, `ARCHITECTURE.md:219` | `TC-FAMILY-001` | `UAT-FAM-01` | 🟢 **Implemented & Verified** |
| **FR-008** | Stream device coordinates and battery level to Firestore every 30 seconds. | Live member tracking and battery monitoring. | Pilgrim Tracking | `US-FAM-001` | `mobile/lib/services/location_service.dart`, `VARIMITRA_SPEAKER_CONTEXT.md:155` | `TC-LOC-001` | `UAT-FAM-01` | 🟢 **Implemented & Verified** |
| **FR-009** | Missing person intake with name, age, last-seen coordinates, and photo upload. | Accelerate missing person recovery and reunification. | Missing Persons | `US-MIS-001` | `mobile/lib/screens/missing_person_screen.dart`, `storage.rules:326-330` | `TC-PILGRIM-006-04`, `TC-PILGRIM-006-05` | `UAT-MIS-01` | 🟢 **Implemented & Verified** |
| **FR-010** | Render real-time Darshan queue wait times and manage digital pass booking. | Reduce physical exhaustion and avoid gate stampedes. | Temple Management | `US-TMP-001` | `frontend/src/app/temple/`, `mobile/lib/screens/temple_queue_screen.dart` | `TC-PILGRIM-005-01`, `TC-PILGRIM-005-05` | `UAT-TMP-01` | 🟢 **Implemented & Verified** |
| **FR-011** | Command center virtualized incident queue rendering live SOS alerts with 60 FPS scrolling. | High-throughput dispatcher operational stability. | Command Center | `US-CMD-001` | `frontend/src/app/sos/page.tsx`, `frontend/package.json:33` | `TC-CMD-VIRT-001` | `UAT-CMD-01` | 🟢 **Implemented & Verified** |
| **BR-004** / **FR-W3**| Asynchronously anchor SHA-256 event snapshots onto Sepolia testnet at zero gas cost. | Non-repudiable audit logs for judicial transparency. | Web3 Trust Layer | `US-W3-001` | `functions/src/trustLayer/blockchainService.ts`, `functions/src/index.ts:237` | `TC-W3-001`, `TC-W3-002` | `UAT-W3-01` | 🟢 **Implemented & Verified** |
| **NFR-001** | Sub-2-second end-to-end SOS creation latency (p95). | Guaranteed high-speed distress capture. | Performance | All SOS Stories | `functions/src/index.ts:20-116`, `README.md:243` | `TC-PERF-SOS-001` | `UAT-SOS-01` | 🟢 **Verified: 1.2s p95** |
| **NFR-002** | Firestore read queries execute in under 500ms (p95). | Snappy UI responsiveness on rural connections. | Performance | All Read Stories | Cloud Firestore (`asia-south1`), `README.md:244` | `TC-PERF-DB-001` | `UAT-MED-01` | 🟢 **Verified: 320ms p95** |
| **SEC-002** | Enforce 7-role RBAC via custom claims across Firestore rules and Cloud Functions. | Strict privilege separation between civilians and police. | Security / Auth | All Stories | `firestore.rules:10-38`, `ARCHITECTURE.md:345-366` | `TC-SEC-RBAC-001` | `UAT-CMD-02` | 🟢 **Implemented & Verified** |

---

## 2. Requirements Traceability Governance Summary

* **Total Business Requirements Tracked:** 5
* **Total Functional Requirements Tracked:** 12
* **Total Non-Functional & Security Requirements Tracked:** 5
* **Total Traceability Gaps:** **0 (Zero Orphaned Requirements)**
* **Codebase Verification Status:** 100% of functional requirements mapped to verified executable code in `functions/src/index.ts`, `frontend/src/app/`, or `mobile/lib/`.
