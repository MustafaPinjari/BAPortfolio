# Enterprise Business Rules Catalog — WariMitra

> **Document Identifier:** WM-BRULE-016  
> **Classification:** Operational Business Rules & Policy Logic  
> **Standard:** Business Rules Group (BRG) / Semantics of Business Vocabulary and Business Rules (SBVR)  
> **Target Audience:** Solution Analysts, Backend Engineers, QA Automation Testers, Interview Panels  
> **Source Evidence:** `functions/src/index.ts`, `firestore.rules`, `storage.rules`, `mobile/lib/screens/`  

---

## 1. Business Rules Catalog

### Category A: Life Safety & Emergency Dispatch Rules

#### BRULE-001: Mandatory Idempotent Emergency Ingestion
* **Rule Statement:** Every incoming emergency SOS payload MUST contain a valid client-generated UUIDv4 `idempotencyKey`. If a document containing this key already exists within `sosAlerts`, the system MUST immediately return the existing document without creating a new record or triggering new notifications.
* **Business Reason:** Prevents duplicate panic alerts, double-dispatching of ambulances/police, and responder alert fatigue caused by mobile network retries over patchy rural 3G/4G connectivity.
* **Source:** `functions/src/index.ts:35-56`
* **Affected Module:** Emergency SOS (`createSOS` Cloud Function)
* **Exception:** None. Ingestion without an `idempotencyKey` throws HTTP 400 (`invalid-argument`).

#### BRULE-002: Sliding Window Distress Rate Limiting
* **Rule Statement:** A single authenticated user account or device MUST NOT exceed five (5) emergency SOS alert creations within any continuous 60,000-millisecond (1-minute) sliding window.
* **Business Reason:** Protects police dispatch queues and serverless database write quotas from Denial-of-Service (DoS) attacks, bot flooding, or panicking individuals repeatedly hammering the UI.
* **Source:** `functions/src/index.ts:59-70`
* **Affected Module:** Emergency SOS (`createSOS` Cloud Function)
* **Exception:** None. Requests exceeding the cap are terminated with HTTP 429 (`resource-exhausted`).

#### BRULE-003: Sovereign Territorial Geofencing
* **Rule Statement:** All emergency distress GPS coordinates MUST satisfy the geographical bounding box of India: $8.0 \le \text{Latitude} \le 35.0$ and $68.0 \le \text{Longitude} \le 97.5$.
* **Business Reason:** Prevents malicious remote attacks originating from foreign coordinates, simulated bot traffic, and corrupted GPS hardware pings (e.g., Lat: 0.0, Lon: 0.0) from polluting police dashboards.
* **Source:** `functions/src/index.ts:72-80`
* **Affected Module:** Emergency SOS (`createSOS` Cloud Function)
* **Exception:** None. Pings outside these bounds throw HTTP 412 (`failed-precondition`).

#### BRULE-004: Hold-to-Activate Physics Gesture
* **Rule Statement:** The mobile emergency SOS panic trigger MUST require a continuous physical press of at least 3.0 seconds, accompanied by haptic feedback and a visual circular progress ring. Releasing before 3.0s MUST immediately reset progress.
* **Business Reason:** Eliminates accidental triggers caused by phones in pilgrims' pockets, bags, or accidental screen taps while devotees are walking or clapping.
* **Source:** `mobile/lib/screens/sos_screen.dart`, `VARIMITRA_SPEAKER_CONTEXT.md:141`
* **Affected Module:** Mobile Pilgrim App (`sos_screen.dart`)
* **Exception:** Authorized administrative dispatchers on the Web Command Center can log an incident manually without a hold gesture.

---

### Category B: Security, Governance & Audit Rules

#### BRULE-005: Authority-Restricted Incident Status Mutation
* **Rule Statement:** Only authenticated users holding custom claims `admin`, `police_officer`, or `medical_officer` are permitted to update the status of an emergency alert from `pending` to `acknowledged`, `dispatched`, or `resolved`.
* **Business Reason:** Ensures that civilian pilgrims or malicious bad actors cannot prematurely dismiss or falsify the resolution of active emergencies.
* **Source:** `firestore.rules:26-28,54-56`, `ARCHITECTURE.md:295-305`
* **Affected Module:** Incident Management / Firestore Security Rules
* **Exception:** None. Any write attempt by unauthorized roles is rejected at the database engine level.

#### BRULE-006: Serverless Exclusivity for System Audit Logs
* **Rule Statement:** Documents within the `/auditLogs/` collection are strictly append-only and MUST ONLY be written by verified Firebase Cloud Functions. Client applications (mobile or web) are denied direct write/delete permissions (`allow write: if false;`).
* **Business Reason:** Prevents tampering, deletion, or modification of official incident history by compromised client devices or internal bad actors.
* **Source:** `firestore.rules:174-177`
* **Affected Module:** Compliance & Audit Subsystem
* **Exception:** None. Absolutely no client-side write access is permitted.

#### BRULE-007: Mandatory Blockchain State Anchoring
* **Rule Statement:** Any successful creation or status transition of an emergency alert MUST trigger an asynchronous event snapshot, canonical SHA-256 hash calculation, and public blockchain anchoring attempt. If blockchain RPC is degraded, it MUST record `LOCAL_PROOF_ONLY` without aborting the operational incident.
* **Business Reason:** Guarantees non-repudiation and transparency during post-pilgrimage judicial inquiries while upholding the zero-interruption life safety principle.
* **Source:** `functions/src/index.ts:237-312`, `docs/WEB3_ARCHITECTURE.md:32-41`
* **Affected Module:** Web3 Trust Layer
* **Exception:** When `BLOCKCHAIN_ENABLED=false` or RPC node times out, system gracefully downgrades to local Firestore proof logging.

---

### Category C: Healthcare & Civic Facility Rules

#### BRULE-008: Active Medical Camp Query Filter
* **Rule Statement:** The geospatial camp discovery engine MUST exclusively return medical relief facilities where `status == 'active'`. Decommissioned, night-closed, or relocating camps MUST be excluded from proximity searches.
* **Business Reason:** Prevents critical patients and ambulance drivers from being routed to closed, unstaffed, or dismantled medical tents.
* **Source:** `functions/src/index.ts:145`
* **Affected Module:** Healthcare Services (`getMedicalCamps`)
* **Exception:** Command center administrators can view inactive camps on the master map for redeployment planning.

#### BRULE-009: Missing Person Photo Ownership Isolation
* **Rule Statement:** Users uploading photographs for missing person reports to Firebase Storage may only write to paths matching `/missing-persons/{userId}/{fileName}` where `{userId}` strictly equals `request.auth.uid`.
* **Business Reason:** Prevents cross-user overwriting, malicious photo replacement, or unauthorized deletion of sensitive biometric evidence.
* **Source:** `storage.rules:326-330`
* **Affected Module:** Firebase Storage Security Rules
* **Exception:** System administrators holding custom claim `admin == true` can delete illicit or offensive uploads.
