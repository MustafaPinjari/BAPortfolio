# Domain Case Study: Pilgrim Emergency Triage & Life Safety — WariMitra

> **Classification:** Domain Interview Case Study (Actual Project Process)  
> **Business Domain:** GovTech / Mass Gathering Public Safety & Emergency Response  
> **Focus Area:** Sub-Second Distress Ingestion, Multicast Dispatch & Web3 Proof Anchoring  
> **Target Audience:** Business Analyst / Technical BA Interview Preparation  

---

## 1. Business Problem & Operational Reality
During the 250 km Pandharpur Wari, up to 1,000,000 pilgrims walk along rural highways in high summer heat. Acute cardiac episodes, severe heatstroke, and physical trauma occur daily. The As-Is response mechanism relied on bystanders shouting for help or walking up to 2 km to find a static police tent, resulting in response delays of 45 to 90 minutes.

---

## 2. Requirements & Process Engineering

### Functional Requirements Formulated:
* **FR-EMG-01:** 3-second continuous hold physics gesture on mobile UI to eliminate pocket/tap false alarms (`sos_screen.dart`).
* **FR-EMG-02:** Backend rate limiting capped at 5 alerts/min/user to block DoS bot attacks (`functions/src/index.ts:68`).
* **FR-EMG-03:** India geographic bounding box validation rejecting foreign or invalid GPS pings (`functions/src/index.ts:73`).
* **FR-EMG-04:** Multicast push notification dispatch to all active police and medical officers (`functions/src/index.ts:192`).
* **FR-EMG-05:** Asynchronous cryptographic SHA-256 snapshot anchoring to Sepolia blockchain ledger at zero gas cost (`functions/src/index.ts:237`).

### Process Flow Summary:
```
[Pilgrim Holds SOS (3s)] ──> [createSOS Cloud Function] ──> [Firestore: /sosAlerts/ (pending)]
                                       │
                         ┌─────────────┴─────────────┐
                         ▼ (Real-Time Listener)      ▼ (Background Trigger: onSOSCreate)
             [Web Command Center Feed]        [FCM Multicast to Responders]
                         │                                   │
                         ▼                                   ▼
             [Dispatcher Assigns Unit]               [Anchor SHA-256 to Sepolia]
```

---

## 3. Measurable Outcomes & Verified Metrics
* **SOS Creation Latency:** Target $< 2.0$s; **Measured 1.2s p95** (`README.md:243`).
* **Firestore Read Latency:** Target $< 500$ms; **Measured 320ms p95** (`README.md:244`).
* **Real-Time Client Propagation:** Target $< 2.0$s; **Measured 1.5s p95** (`README.md:245`).
* **Blockchain Transaction Gas Cost:** **₹0 (Zero Gas Cost)** via 0-ETH self-transactions on Sepolia (`docs/WEB3_ARCHITECTURE.md`).

---

## 4. Key Interview Discussion Points
* **Question:** *"Why did you design a 3-second hold button instead of a simple red 'Call 911' button?"*
* **Answer:** *"In a religious pilgrimage where devotees are walking, singing, and clapping with cymbals, accidental touches inside pockets or bags occur constantly. A simple tap would inundate police control rooms with thousands of false alarms, causing alert fatigue. The 3-second hold gesture with haptic vibration feedback provides an intentional, physics-based confirmation without requiring illiterate or panic-stricken users to fill out text forms."*
