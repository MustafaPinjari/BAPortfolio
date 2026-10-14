# Domain Case Study: Crowd Surge & Temple Queue Telemetry — WariMitra

> **Classification:** Domain Interview Case Study (Actual Project Process)  
> **Business Domain:** GovTech / Smart Crowd Control & Queue Dynamics  
> **Focus Area:** Queue Wait-Time Estimation (Little's Law), Gate Control & Darshan Passes  
> **Target Audience:** Business Analyst / Technical BA Interview Preparation  

---

## 1. Business Problem & Operational Reality
At the culmination of the Wari pilgrimage in Pandharpur, over 500,000 devotees converge at the Vitthal-Rukmini Temple complex. Historically, unregulated physical queuing in narrow, serpentine barricades forced devotees to stand in unshaded queues for 18 to 36 hours. Extreme physical fatigue, heat exhaustion, gate-crashing, and fatal stampede risks were persistent threats.

---

## 2. Requirements & Heuristic Engineering

### Functional Requirements Formulated:
* **FR-CRD-01:** Real-time telemetry monitoring for all temple gates (`gateId`, `queueType`, `currentCount`, `waitTimeMinutes`, `status: open|closed|paused`) (`ARCHITECTURE.md:225-230`).
* **FR-CRD-02:** Algorithmic wait-time computation utilizing Little's Law heuristics ($L = \lambda W$) based on gate throughput velocity (`VARIMITRA_SPEAKER_CONTEXT.md:161`).
* **FR-CRD-03:** Digital Darshan slot pass booking system with capacity quotas per time window to distribute crowd arrivals (`IEEE_TEST_CASES.md:57-69`, `firestore.rules:132-135`).
* **FR-CRD-04:** Mobile UI color-coded queue status indicator (Green: $< 2$ hrs, Yellow: $2-6$ hrs, Red: $> 6$ hrs) with Marathi copy (`frontend/src/app/temple/`).

---

## 3. Measurable Outcomes & Verified Metrics
* **Queue Ingestion Latency:** Sub-second Firestore updates across all temple gates.
* **Overcrowding Mitigation:** Real-time gate status enables police to divert incoming crowds from congested gates to secondary holding enclosures.
* **Pass Issuance Rate:** Zero double-booking ensured by Firestore transaction counters on `darshanSlots`.

---

## 4. Key Interview Discussion Points
* **Question:** *"Did you implement deep learning machine learning for crowd predictions?"*
* **Answer:** *"No. We specifically avoided deploying complex neural networks during initial release. In our analysis, we established that training deep learning models would introduce unnecessary cloud compute expenses and latency risks. Instead, we implemented proven mathematical heuristics—specifically Little’s Law for queue wait times and the NOAA Heat Index for environmental risk. This delivered 90% of the operational value at near-zero compute cost."*
