# Business Process Flows & Operational Workflows — WariMitra

> **Document Identifier:** WM-PF-011  
> **Classification:** End-to-End Operational Workflows & BPMN Visualizations  
> **Standard:** BPMN 2.0 / Mermaid Diagrams  
> **Target Audience:** Solution Architects, Operations Leads, Business Analysts, Interview Panels  
> **Source Evidence:** `functions/src/index.ts`, `ARCHITECTURE.md`, `frontend/src/app/`, `mobile/lib/screens/`  

---

## 1. High-Level Operational Architecture Workflow

```mermaid
flowchart TB
    subgraph PilgrimGroundLayer [Pilgrim & Field Volunteer Mobile Operations]
        A[Devotee Opens App] --> B{Action Selected}
        B -->|Emergency| C[Hold SOS 3 Seconds]
        B -->|Medical Need| D[Search Nearby Camps]
        B -->|Separation| E[Family Locator Circle]
        B -->|Missing Person| F[Submit Photo & Report]
        B -->|Temple Darshan| G[Check Queue & Book Slot]
    end

    subgraph ServerlessCoordinationEngine [Firebase Cloud Infrastructure: asia-south1]
        C --> H[createSOS Cloud Function]
        H -->|Validation| I{Auth / Geofence / Rate Limit / Idempotency}
        I -->|Pass| J[(Firestore: sosAlerts)]
        I -->|Fail| K[Return HttpsError]
        J --> L[Trigger: onSOSCreate]
        L --> M[FCM Multicast Broadcast]
        L --> N[Compute Canonical SHA-256 Hash]
        N --> O[(Firestore: blockchainProofs)]
        N -.->|Async 0-ETH Tx| P[[Ethereum Sepolia Testnet]]
    end

    subgraph CommandControlLayer [Government & Emergency Command Center]
        J -->|Real-Time Snapshot Sync| Q[Web Command Center]
        M -->|Push Alert| R[Police & Medical Mobile Terminals]
        Q --> S[GIS Heatmap & Virtualized Incident Queue]
        S --> T[Dispatcher Triage & Field Assignment]
        T --> U[Update Status: Dispatched -> Resolved]
        U --> V[Trigger: onSOSUpdate -> Immutable Audit Proof]
    end
```

---

## 2. Detailed Workflow 1: End-to-End SOS Incident Lifecycle

### 2.1 Purpose & Scope
Governs the capture, validation, persistent recording, multicast alerting, tactical dispatch, and cryptographically verified resolution of life-threatening emergencies.

### 2.2 Operational Flow Diagram
```mermaid
sequenceDiagram
    autonumber
    actor Devotee as 📱 Distressed Pilgrim
    participant App as 📲 Mobile App (Flutter)
    participant Func as ⚡ Cloud Function (createSOS)
    participant DB as 🗄️ Firestore DB
    participant FCM as 📢 Cloud Messaging (FCM)
    actor Officer as 👮 Police / Medical Officer
    participant Trust as ⛓️ Web3 Trust Layer (Sepolia)

    Devotee->>App: Hold SOS button (3.0s continuous)
    App->>App: Acquire GPS & Generate UUID (idempotencyKey)
    App->>Func: HTTPS Call: createSOS(lat, lon, severity, idempotencyKey)
    
    rect rgb(240, 248, 255)
        Note over Func: Backend Validation Pipeline
        Func->>Func: 1. Validate Auth Token
        Func->>Func: 2. Check duplicate idempotencyKey in sosAlerts
        Func->>Func: 3. Verify user has < 5 alerts in last 60s
        Func->>Func: 4. Verify coordinates within India bounds
    end

    Func->>DB: Add alert doc (status: "pending", geohash)
    Func->>DB: Add audit log (EVENT: SOS_CREATED)
    Func-->>App: Return { alertId, status: "pending" }
    
    par Async Multicast & Live Sync
        DB-->>Officer: Firestore real-time listener pushes alert to Web Feed
    and Cloud Function Trigger: onSOSCreate
        DB->>Func: onSOSCreate trigger
        Func->>FCM: Multicast push notification to all responders
        FCM-->>Officer: Push alert rings on officer smartphone
        Func->>Trust: Anchor canonical SHA-256 snapshot to Sepolia
        Trust-->>DB: Save txHash to blockchainProofs
    end

    Officer->>DB: Update alert status to "dispatched"
    DB->>Func: onSOSUpdate trigger -> Anchor state transition hash
    Officer->>Devotee: Unit arrives at GPS coordinates & administers aid
    Officer->>DB: Update alert status to "resolved"
    DB->>Func: onSOSUpdate trigger -> Final resolution anchor
```

---

## 3. Detailed Workflow 2: Proximity Medical Radar & Camp Triage

### 3.1 Purpose & Scope
Enables patients and ground volunteers to query the nearest available medical relief camps within a dynamic walking radius, factoring in real-time bed capacity.

### 3.2 Operational Flow Diagram
```mermaid
flowchart TD
    A([User Taps 'Find Medical Camps']) --> B[Client requests current GPS latitude/longitude]
    B --> C[Client invokes HTTPS Callable: getMedicalCamps]
    C --> D[Backend initializes center point & radius default 10km]
    D --> E[Compute Geohash bounding boxes using geofire-common]
    E --> F[(Query Firestore: medicalCamps where status == 'active')]
    F --> G[Extract documents matching bounding box ranges]
    G --> H[Calculate Great-Circle Haversine distance from user GPS]
    H --> I{Is distance <= radiusKm?}
    I -->|No| J[Discard camp from results]
    I -->|Yes| K[Append camp to results array with distanceKm]
    K --> L[Sort results array ascending by distanceKm]
    L --> M[Return JSON array of sorted camps to client]
    M --> N[Client renders interactive Google Map & Camp Cards]
    N --> O{User Selection}
    O -->|Click Directions| P[Launch Google Maps Navigation to Camp]
    O -->|Click Emergency Call| Q[Trigger direct phone dialer to 108 Ambulance]
```

---

## 4. Detailed Workflow 3: Family Circle Tracking & Missing Persons Intake

### 4.1 Purpose & Scope
Prevents family dispersion during high-density evening halts and provides an accelerated photo-intake mechanism to locate lost relatives.

### 4.2 Operational Flow Diagram
```mermaid
flowchart TD
    subgraph FamilyCircleSetup [1. Ad-Hoc Family Circle Setup]
        FC1[Group Leader clicks 'Create Family Circle'] --> FC2[System generates unique 6-char code e.g. WARI07]
        FC2 --> FC3[Members enter code WARI07 in their app]
        FC3 --> FC4[(Firestore: Add userId to familyGroups.memberIds)]
        FC4 --> FC5[App initiates background location timer every 30s]
        FC5 --> FC6[(Write current lat, lon, battery to users/userId/liveLocation)]
        FC6 --> FC7[All circle members view live pins on shared map]
    end

    subgraph MissingPersonWorkflow [2. Missing Person Intake & Recovery]
        MP1[Family member notices relative missing] --> MP2[Open Missing Persons Screen]
        MP2 --> MP3[Fill Name, Age, Description, Last Seen Location]
        MP3 --> MP4[Upload Photo from Gallery/Camera]
        MP4 --> MP5[(Store image in Firebase Storage: /missing-persons/)]
        MP5 --> MP6[(Create document in Firestore: missingPersons with status 'missing')]
        MP6 --> MP7[Police Command Center reviews intake on Web Portal]
        MP7 --> MP8[Police update status to 'investigating']
        MP8 --> MP9[Field Volunteer spots person & contacts police]
        MP9 --> MP10[Police update status to 'found' & coordinate family reunion]
    end
```

---

## 5. Detailed Workflow 4: Temple Queue Monitoring & Slot Booking

### 5.1 Purpose & Scope
Monitors crowd queue length across Pandharpur temple gates to compute waiting time estimates and allow pilgrims to book digital Darshan passes.

### 5.2 Operational Flow Diagram
```mermaid
flowchart TD
    A([Pilgrim Navigates to Temple Darshan]) --> B[Query templeQueues for all active gates]
    B --> C[Compute estimated wait times using Little's Law heuristics]
    C --> D[Display live wait-time cards for Gate 1, Gate 2, VIP Gate]
    D --> E{User Choice}
    E -->|View Standby Queue| F[Display current physical queue length & entrance advice]
    E -->|Book Digital Darshan Pass| G[Query darshanSlots for available time windows]
    G --> H{Is selected slot occupied < capacity?}
    H -->|No: Full| I[Disable booking button & display 'Slot Full']
    H -->|Yes: Available| J[User enters Pilgrim Name & Aadhaar Number]
    J --> K[(Write to darshanSlots: increment booked quota & generate digital pass token)]
    K --> L[Display Digital QR Token on mobile screen for gate scanning]
```

---

## 6. Summary of Operational Traceability

The workflows modeled above represent the primary operational paths implemented in the codebase. By decoupling ground telemetry from backend event processing and frontend visualization, WariMitra guarantees continuous service availability even under intermittent field conditions.
