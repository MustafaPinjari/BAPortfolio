# Comprehensive Requirements Catalog — WariMitra

> **Document ID:** WM-REQ-005  
> **Classification:** Full Lifecycle Requirements Specification & Taxonomy  
> **Standard:** IEEE Std 830-1998 / BABOK v3 Chapter 6 (Requirements Lifecycle Management)  
> **Target Audience:** Lead Business Analysts, Technical Architects, QA Leads, Interview Evaluation Panels  
> **Evidence Sources:** `functions/src/index.ts`, `ARCHITECTURE.md`, `docs/BRD.md`, `docs/FRD.md`, `mobile/lib/`, `frontend/src/`  

---

## 1. Requirements Taxonomy & ID Nomenclature

| Prefix | Requirement Category | Business Scope |
| :--- | :--- | :--- |
| **BR-xxx** | Business Requirements | High-level organizational goals, legal mandates, and operational objectives. |
| **FR-xxx** | Functional Requirements | Specific system behaviors, capabilities, inputs, outputs, and user interactions. |
| **NFR-xxx** | Non-Functional Requirements | Performance, latency, scalability, reliability, and accessibility benchmarks. |
| **DR-xxx** | Data Requirements | Entity structures, schema constraints, retention rules, and indexing. |
| **INT-xxx** | Integration Requirements | External third-party integrations (Google Maps, FCM, Web3 testnet, Telco). |
| **SEC-xxx** | Security Requirements | Authentication, RBAC, encryption, geofencing, rate limiting, and audit trails. |
| **REP-xxx** | Reporting & Analytics Requirements | Dashboards, singleton aggregators, telemetry, and administrative metrics. |

---

## 2. Business Requirements (BR)

| Req ID | Requirement Statement | Business Objective | Evidence in Repo | Module | Priority | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **BR-001** | The system shall provide an instantaneous, zero-confusion emergency distress channel for pilgrims walking along the pilgrimage route. | Reduce fatal response times during medical crises and stampedes. | `docs/BRD.md:16`, `README.md:26` | Emergency SOS | Must Have | **Implemented** |
| **BR-002** | The system shall enable geospatial discovery of active medical camps and available beds within a walking radius. | Prevent overloading civil hospitals and reduce distance to first aid. | `docs/BRD.md:18`, `functions/src/index.ts:122` | Healthcare | Must Have | **Implemented** |
| **BR-003** | The system shall provide government and police authorities with real-time situational visibility over crowd density and queue wait times. | Eliminate stampedes and mitigate extreme crowd crush risks. | `docs/BRD.md:19`, `docs/FRD.md:42` | Crowd Control | Must Have | **Implemented** |
| **BR-004** | The system shall establish an unalterable, non-repudiable audit log of emergency responses for judicial and administrative transparency. | Protect administration from false liability claims and prove response diligence. | `docs/WEB3_ARCHITECTURE.md:3`, `functions/src/index.ts:237` | Trust Layer | Should Have | **Implemented** |
| **BR-005** | The system shall maintain operational stability at zero recurring blockchain gas cost. | Satisfy state public finance constraints prohibiting cryptocurrency expenditure. | `docs/WEB3_ARCHITECTURE.md:26-31` | Trust Layer | Must Have | **Implemented** |

---

## 3. Functional Requirements (FR)

| Req ID | Requirement Statement | Module | Priority | Dependencies | Evidence Path | Acceptance Criteria | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **FR-001** | The mobile client shall require a continuous 3-second hold gesture on the SOS button to initiate distress dispatch, providing visual progress and haptic vibration. | Emergency SOS | Must Have | Device Sensors | `mobile/lib/screens/sos_screen.dart`, `VARIMITRA_SPEAKER_CONTEXT.md:141` | Given user is on SOS screen, When button is held for 3.0s, Then circular progress completes and API is invoked; if released early, trigger cancels. | **Implemented** |
| **FR-002** | The backend shall enforce idempotency on SOS creation using a client-generated UUID, returning the existing record if retransmitted. | Emergency SOS | Must Have | FR-001 | `functions/src/index.ts:43-56` | Given an identical `idempotencyKey`, When submitted within 60s, Then system returns existing `alertId` with no duplicate database write. | **Implemented** |
| **FR-003** | The system shall rate-limit emergency SOS creation to a maximum of 5 alerts per minute per user account. | Emergency SOS | Must Have | Auth | `functions/src/index.ts:59-70` | Given a user has created 5 alerts in the last 60s, When 6th alert is attempted, Then function aborts with `resource-exhausted`. | **Implemented** |
| **FR-004** | The system shall validate that SOS coordinates fall within the geographical bounding box of India (Lat: 8.0–35.0, Lon: 68.0–97.5). | Emergency SOS | Must Have | GPS Telemetry | `functions/src/index.ts:72-80` | Given coordinates outside India bounds, When SOS is submitted, Then function rejects request with `failed-precondition`. | **Implemented** |
| **FR-005** | The system shall broadcast FCM push notifications to all authenticated users with roles `police_officer`, `medical_officer`, and `admin` upon SOS creation. | Notification Engine | Must Have | FR-001, RBAC | `functions/src/index.ts:182-218` | Given a new document in `/sosAlerts/`, When `onSOSCreate` fires, Then multicast notification is dispatched to all active responder tokens. | **Implemented** |
| **FR-006** | The system shall calculate Geohash bounding boxes to query active medical camps within a user-specified radius (default 10 km) sorted by Haversine distance. | Medical Services | Must Have | Location Services | `functions/src/index.ts:122-177` | Given valid lat/lon, When `getMedicalCamps` is invoked, Then returns active camps sorted ascending by `distanceKm`. | **Implemented** |
| **FR-007** | The mobile client shall allow users to generate or join a family tracking group using a unique 6-character alphanumeric invite code. | Family Locator | Should Have | Auth, GPS | `ARCHITECTURE.md:219-224`, `mobile/lib/screens/family_locator_screen.dart` | Given a valid 6-char code, When user enters code, Then user's UID is appended to `memberIds` array in `familyGroups/{groupId}`. | **Implemented** |
| **FR-008** | The mobile app shall stream device GPS coordinates and battery percentage to `users/{userId}/liveLocation/current` every 30 seconds. | Pilgrim Tracking | Should Have | Location Services | `mobile/lib/services/location_service.dart`, `VARIMITRA_SPEAKER_CONTEXT.md:155` | Given active pilgrimage mode, When 30s timer elapses, Then current coordinates and battery level are written to Firestore. | **Implemented** |
| **FR-009** | The system shall allow pilgrims and authorities to submit missing person reports including name, age, physical description, last-seen GPS, and photo upload. | Missing Persons | Must Have | Firebase Storage | `firestore.rules:111-117`, `mobile/lib/screens/missing_person_screen.dart` | Given report data and image, When submitted, Then photo is saved to Cloud Storage and metadata document created in `missingPersons`. | **Implemented** |
| **FR-010** | The command center shall render real-time Darshan queue status for temple gates, showing queue headcount and estimated wait times. | Temple Ops | Must Have | Firestore Listeners | `frontend/src/app/temple/`, `ARCHITECTURE.md:225-230` | Given active temple queues, When Firestore listener receives snapshot, Then UI displays wait time in minutes and gate status. | **Implemented** |
| **FR-011** | The command center shall provide a virtualized incident feed rendering live SOS alerts with audio-visual indicators for high/critical severity. | Command Center | Must Have | React-Window | `frontend/src/app/sos/`, `frontend/package.json:33` | Given >100 concurrent alerts, When rendered in SOS feed, Then `react-window` ensures zero frame drops or DOM memory leaks. | **Implemented** |
| **FR-012** | The system shall display civic sanitation facilities and allow crowdsourced reporting of accumulated solid waste with photo proof. | Sanitation | Could Have | Firebase Storage | `firestore.rules:97-110`, `frontend/src/app/sanitation/` | Given citizen waste report with photo, When created, Then report appears in municipal dashboard for sanitation crew dispatch. | **Implemented** |

---

## 4. Non-Functional Requirements (NFR)

| Req ID | Requirement Statement | Category | Target Metric | Measured / Verified | Evidence Path |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **NFR-001** | Emergency SOS end-to-end creation latency from client trigger to database persistence shall be under 2 seconds. | Performance / Latency | $< 2.0$ seconds | **1.2s (p95)** | `README.md:243`, `ARCHITECTURE.md:428` |
| **NFR-002** | Cloud Firestore database read queries for operational views shall execute in under 500 milliseconds. | Performance / Latency | $< 500$ ms | **320ms (p95)** | `README.md:244`, `ARCHITECTURE.md:429` |
| **NFR-003** | Real-time state synchronization via Firestore listeners shall propagate to active command clients in under 2 seconds. | Real-Time Sync | $< 2.0$ seconds | **1.5s (p95)** | `README.md:245`, `ARCHITECTURE.md:430` |
| **NFR-004** | Photo file uploads (up to 5MB) to Firebase Storage shall complete in under 5 seconds under standard 4G connectivity. | Throughput | $< 5.0$ seconds | **3.8s (p95)** | `README.md:246`, `ARCHITECTURE.md:431` |
| **NFR-005** | The backend architecture shall support at least 10,000 concurrent connected users and 100+ peak emergency SOS alerts per hour. | Scalability | 10,000+ CCU | Verified by Serverless Architecture | `README.md:249-250`, `ARCHITECTURE.md:437` |
| **NFR-006** | Mobile user interface shall support native Marathi (`mr`), Hindi (`hi`), and English (`en`), with default routing to Marathi. | Accessibility / Localization | 100% UI String Localization | Implemented via `language_provider.dart` | `ARCHITECTURE.md:115`, `mobile/lib/screens/home_screen.dart` |
| **NFR-007** | Client applications shall implement offline persistence to allow reading cached maps and queues during intermittent cellular disconnects. | Reliability / Fault Tolerance | Zero crash on connection loss | Local Firestore cache enabled | `ARCHITECTURE.md:111,468` |

---

## 5. Security & Access Control Requirements (SEC)

| Req ID | Requirement Statement | Enforcement Level | Evidence Path |
| :--- | :--- | :--- | :--- |
| **SEC-001** | User authentication shall support phone-based OTP (SMS) and email/password via Firebase Authentication. | Identity Provider | `ARCHITECTURE.md:341-344` |
| **SEC-002** | System authorization shall enforce Role-Based Access Control (RBAC) across 7 distinct roles using Firebase Custom Claims (`token.userType`). | Identity & Auth | `ARCHITECTURE.md:345-366`, `firestore.rules:10-29` |
| **SEC-003** | Database security rules shall prevent non-authorities from modifying or updating emergency alerts, medical camp records, or police patrols. | Database Level | `firestore.rules:59-85` |
| **SEC-004** | System audit logs stored in `auditLogs` shall be append-only and strictly restricted to Cloud Function writes (`allow write: if false;`). | Immutability / Compliance | `firestore.rules:174-177` |
| **SEC-005** | Cloud Storage file access shall enforce strict ownership boundaries for personal missing persons uploads. | Storage Rules | `storage.rules:318-335` |

---

## 6. Integration Requirements (INT)

| Req ID | External System / Interface | Interface Method | Protocol / Format | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **INT-001** | Google Maps Platform API | Client SDK / JS Loader | HTTPS / GeoJSON | Rendering spatial maps, cluster markers, and directions routing. |
| **INT-002** | Firebase Cloud Messaging (FCM) | Admin SDK (`sendEachForMulticast`) | HTTP/2 / JSON | Multicast dispatch of emergency alerts to responder devices. |
| **INT-003** | Ethereum Sepolia Testnet | Ethers.js v6 JSON-RPC | Web3 RPC / 0-ETH Tx | Anchoring SHA-256 canonical event hashes into blockchain block data. |
| **INT-004** | State 108 Emergency Medical Services | Hardware Telco Click-to-Dial | Telephony `tel:` URI | Direct dialing escalation to government ambulance dispatchers. |

---

## 7. Data & Reporting Requirements (DR / REP)

* **DR-001 (Spatial Indexing):** All geographic entities (`sosAlerts`, `medicalCamps`, `communityReports`) must store a 9-character Geohash alongside `latitude` and `longitude` (`functions/src/index.ts:89,147`).
* **DR-002 (Idempotency Key Uniqueness):** The `idempotencyKey` field in `sosAlerts` must be indexed and checked prior to document insertion (`functions/src/index.ts:43-56`).
* **REP-001 (Scheduled Aggregations):** A scheduled Cloud Function (`updateDashboardMetrics`) shall execute every 1 minute via Cloud Pub/Sub to aggregate pending SOS count, active medical camps, and registered pilgrims into `analytics/dashboardMetrics` (`functions/src/index.ts:318-335`).
