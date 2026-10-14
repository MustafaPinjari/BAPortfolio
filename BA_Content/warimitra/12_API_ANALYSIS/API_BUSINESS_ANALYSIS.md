# API Business Analysis & Service Contracts — WariMitra

> **Document Identifier:** WM-API-012  
> **Classification:** Technical BA Service Catalog & Interface Specifications  
> **Architecture Pattern:** Serverless Microservices (Firebase Cloud Functions v2)  
> **Runtime Environment:** Node.js 20 / TypeScript 5.3 (`asia-south1` Mumbai)  
> **Target Audience:** Technical Business Analysts, Integration Engineers, Solution Architects, API Evaluators  
> **Source Evidence:** `functions/src/index.ts`, `ARCHITECTURE.md`, `mobile/lib/services/`  

---

## 1. Architectural Interface Paradigm

WariMitra implements a **hybrid serverless integration model**:
1. **HTTPS Callable Cloud Functions:** Structured RPC endpoints handling mission-critical business validations (idempotency, rate limiting, geospatial calculations) requiring elevated administrative privileges.
2. **Firestore Real-Time Event Triggers:** Asynchronous event-driven background workers responding to database document lifecycle events (`onCreate`, `onUpdate`) to handle push notifications, metrics aggregation, and cryptographic blockchain anchoring.
3. **Scheduled Cron Workers:** Cloud Pub/Sub workers executing periodic rollups for operational telemetry.

```
Mobile / Web Clients ──> HTTPS Callable Functions ──> Firestore Document Mutation
                                                            │
                                                            ▼ (Event-Driven Trigger)
                                                  Cloud Function Background Worker
                                                            │
                                              ┌─────────────┴─────────────┐
                                              ▼                           ▼
                                     FCM Multicast Push           Web3 0-ETH Anchor
```

---

## 2. API Service Catalog

### API 1: `createSOS` (Emergency Distress Ingestion)

#### 2.1 Business Meaning & Operational Intent
* **Business Purpose:** Allows a distressed pilgrim or bystander to instantly signal a critical emergency to state police and medical responders.
* **Business Function:** Establishes the official opening of an emergency incident ticket, capturing the exact spatial coordinates of the victim, filtering out accidental duplicate submissions, and preventing Denial-of-Service spam.
* **Primary Actor:** Devotee / Pilgrim (`pilgrim`)
* **Stakeholder Impact:** Direct determinant of golden-hour medical intervention; triggers simultaneous alerts across police dispatchers and nearby ambulance drivers.

#### 2.2 Technical Implementation Specification
* **Callable Identifier:** `createSOS` (`functions/src/index.ts:20-116`)
* **Invocation Method:** HTTPS Callable Function (`functions.https.onCall`)
* **Region:** `asia-south1` (Mumbai)
* **Authentication:** Mandatory (`context.auth != null`)
* **Input Schema:**
  ```json
  {
    "latitude": 18.52043,
    "longitude": 73.85674,
    "severity": "critical",
    "idempotencyKey": "e4b3c9a0-4f81-42e1-9311-285b7964b4c2",
    "description": "Severe chest pain and difficulty breathing near rest camp",
    "extraDetails": {
      "bloodGroup": "O+",
      "batteryLevel": 42
    },
    "createdAtClient": 1723368400000
  }
  ```
* **Output Schema (Success):**
  ```json
  {
    "alertId": "sos_7894aBcDeFg123",
    "status": "pending",
    "message": "SOS created successfully"
  }
  ```
* **Output Schema (Idempotent Duplicate Match):**
  ```json
  {
    "alertId": "sos_7894aBcDeFg123",
    "status": "pending",
    "message": "SOS already exists (duplicate prevented)"
  }
  ```

#### 2.3 Business Rules Enforced in API
1. **BR-API-01 (Idempotency):** The engine queries `sosAlerts` for matching `idempotencyKey`. If present, returns the existing record without executing a database write.
2. **BR-API-02 (Rate Limiting):** A device/user is constrained to a maximum of 5 alerts per 60-second sliding window. Exceeding this returns HTTP 429 equivalent (`resource-exhausted`).
3. **BR-API-03 (Geofence Validation):** Coordinates must fall within sovereign Indian bounds ($8.0 \le \text{lat} \le 35.0, 68.0 \le \text{lon} \le 97.5$).

#### 2.4 Error Codes & Exception Contracts
| Error Code | HTTP Equivalent | Trigger Condition | Client User Impact |
| :--- | :--- | :--- | :--- |
| `unauthenticated` | 401 Unauthorized | Missing or expired Firebase Auth token. | Forces client to refresh token or re-authenticate. |
| `invalid-argument` | 400 Bad Request | Missing `latitude`, `longitude`, or `idempotencyKey`. | Client displays parameter error dialog. |
| `resource-exhausted` | 429 Too Many Requests | User exceeded 5 SOS calls within 60 seconds. | Displays rate-limit cooldown timer in Marathi. |
| `failed-precondition` | 412 Precondition Failed | Location falls outside Indian geographical boundaries. | Aborts request and flags potential location spoofing. |

---

### API 2: `getMedicalCamps` (Geospatial Healthcare Camp Radar)

#### 2.1 Business Meaning & Operational Intent
* **Business Purpose:** Allows pilgrims, field volunteers, and paramedics to locate the closest operational medical camps and inspect available bed capacity.
* **Business Function:** Executes a spatial bounding-box query to convert GPS coordinates into an ordered list of healthcare facilities ranked by physical proximity.
* **Primary Actor:** Pilgrim, Volunteer, EMT Paramedic
* **Stakeholder Impact:** Balances patient intake across rural primary health centers; prevents camp overcrowding during acute heatwave conditions.

#### 2.2 Technical Implementation Specification
* **Callable Identifier:** `getMedicalCamps` (`functions/src/index.ts:122-177`)
* **Invocation Method:** HTTPS Callable Function (`functions.https.onCall`)
* **Region:** `asia-south1`
* **Authentication:** Mandatory (`context.auth != null`)
* **Input Schema:**
  ```json
  {
    "latitude": 18.3448,
    "longitude": 74.0298,
    "radiusKm": 10
  }
  ```
* **Output Schema (Success):**
  ```json
  {
    "camps": [
      {
        "id": "camp_saswad_01",
        "name": "Saswad Rural Hospital Relief Post",
        "latitude": 18.3490,
        "longitude": 74.0320,
        "geohash": "tek3x8...",
        "capacity": 30,
        "currentPatients": 12,
        "staffCount": 6,
        "distanceKm": 0.52
      },
      {
        "id": "camp_dive_ghat_02",
        "name": "Dive Ghat Mobile Trauma Unit",
        "latitude": 18.3800,
        "longitude": 74.0100,
        "geohash": "tek3w2...",
        "capacity": 15,
        "currentPatients": 14,
        "staffCount": 4,
        "distanceKm": 4.31
      }
    ]
  }
  ```

#### 2.3 Business Rules Enforced in API
1. **BR-API-04 (Active Facilities Only):** Database queries strictly enforce `where('status', '==', 'active')` to prevent routing patients to decommissioned camps.
2. **BR-API-05 (Haversine Distance Pruning):** Any facility returned by the broad Geohash bounding-box query whose computed Great-Circle distance exceeds `radiusKm` is filtered out before sorting.

---

### API 3: `onSOSCreate` (Automated Multicast & Web3 Anchoring Trigger)

#### 3.1 Business Meaning & Operational Intent
* **Business Purpose:** Instantly alerts all on-duty emergency authorities the moment a new distress alert is recorded and anchors an unalterable proof to the blockchain.
* **Business Function:** Asynchronous event handler that queries responder push tokens, dispatches high-priority push notifications, increments live dashboard counters, and creates an immutable cryptographic event snapshot.
* **Primary Actor:** System Event Worker (Internal Cloud Event)
* **Stakeholder Impact:** Eliminates manual radio relay delays; creates an auditable record of the exact second authorities were notified.

#### 3.2 Technical Implementation Specification
* **Trigger Path:** `firestore.document('sosAlerts/{alertId}').onCreate` (`functions/src/index.ts:182-264`)
* **Trigger Event:** Creation of a new document in the `sosAlerts` collection.
* **Downstream Integrations:**
  1. **Firebase Cloud Messaging:** Queries `users` with `userType` $\in$ `['admin', 'police_officer', 'medical_officer']` and calls `admin.messaging().sendEachForMulticast()`.
  2. **Singleton Analytics:** Updates `analytics/dashboardMetrics` by executing atomic increment: `activeSOS: FieldValue.increment(1)`.
  3. **Web3 Trust Layer:** Computes canonical JSON snapshot, generates SHA-256 hash, and calls `anchorHash(canonicalHash)` to write to Ethereum Sepolia testnet.
  4. **Blockchain Proof Collection:** Appends verification record to `blockchainProofs` with `transactionHash`, `canonicalHash`, and `snapshot`.

---

### API 4: `onSOSUpdate` (State Transition Tracking & Proof Versioning)

#### 4.1 Business Meaning & Operational Intent
* **Business Purpose:** Tracks tactical progress as police or medical units respond to, reach, and resolve an emergency, preventing retroactive alteration of incident logs.
* **Business Function:** Detects meaningful status changes (`pending` $\rightarrow$ `acknowledged` $\rightarrow$ `dispatched` $\rightarrow$ `resolved`), increments the event version counter, and anchors an incremental cryptographic proof.
* **Implementation Source:** `functions/src/index.ts:269-312`

---

### API 5: `updateDashboardMetrics` (Scheduled Metric Aggregator)

#### 4.1 Business Meaning & Operational Intent
* **Business Purpose:** Maintains pre-computed, high-speed aggregate statistics for the executive command dashboard without requiring costly full-table scans.
* **Execution Interval:** Scheduled Pub/Sub cron firing every 1 minute (`functions/src/index.ts:318-335`).
* **Technical Operation:** Executes parallel Firestore `.count().get()` aggregations across pending SOS alerts, active medical camps, and registered pilgrims, writing totals to `analytics/dashboardMetrics`.

---

## 3. API Security & Secret Management Audit

* **No Hardcoded Secrets:** Review of `functions/src/index.ts` and `functions/src/trustLayer/` confirms that no private API keys, Ethereum private keys, or passwords are hardcoded.
* **Environment Configuration:** Sensitive parameters (Sepolia RPC URL, private key for signing 0-ETH transactions) are injected exclusively via environment variables (`process.env.BLOCKCHAIN_PRIVATE_KEY`, `process.env.SEPOLIA_RPC_URL`).
* **Fail-Safe RPC Handling:** If environment variables or the external RPC endpoint are unavailable, the trust layer gracefully downgrades to `LOCAL_PROOF_ONLY`, ensuring emergency dispatch is never blocked.
