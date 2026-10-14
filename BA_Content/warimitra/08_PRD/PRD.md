# Product Requirements Document (PRD) — WariMitra

> **Document Identifier:** WM-PRD-2026-V2.0  
> **Product Name:** WariMitra ("Digital Wari Ecosystem")  
> **Product Category:** GovTech / Smart Mass Gathering & Public Safety Management Platform  
> **Product Owner / Lead BA:** Senior Product Analyst & Solution Architect  
> **Release Target:** Version 2.0 (Annual Pandharpur Pilgrimage Cutover)  
> **Repository Context:** `c:\Users\mustafa\Desktop\WariMitra`  

---

## 1. Product Vision & Value Proposition

### 1.1 Product Vision Statement
> *"To establish WariMitra as India's premier digital public infrastructure for mass gatherings, transforming the 700-year-old Pandharpur Wari into a safe, connected, and dignified journey where every pilgrim is protected by sub-second emergency response, proactive crowd intelligence, and transparent public governance."*

### 1.2 Core Value Pillars
1. **Infallible Pilgrim Safety:** Sub-2-second panic dispatch with zero-text physical gesture triggers.
2. **Operational Decoupling:** Allowing healthcare, police, municipal sanitation, and temple trust teams to operate independently while synchronizing on a single shared operational picture.
3. **Radical Demographic Inclusivity:** Designing specifically for low-end Android smartphones, rural networks, and Marathi-speaking elderly users.
4. **Verifiable Governance:** Anchoring high-priority public safety records to tamper-evident public cryptographic ledgers at ₹0 recurring infrastructure cost.

---

## 2. Target Personas & User Archetypes

### Persona 1: Tukaram Patil (The Rural Pilgrim)
* **Age & Background:** 68 years old, sugarcane farmer from Satara district, walking his 12th Wari.
* **Device & Tech Literacy:** Entry-level 4G Android smartphone; struggles with small fonts and complex menus; reads Marathi fluently.
* **Key Needs:** Easily finding drinking water tankers, clean toilets, avoiding stampedes, and knowing when to enter temple queues.
* **Quote:** *"When my feet hurt or if I get separated from my village group in the evening crowd, I need help immediately without getting confused by English apps."*

### Persona 2: Inspector Vaishali Shinde (The Police Dispatcher)
* **Age & Background:** 38 years old, Maharashtra State Police officer stationed at Saswad Mobile Command Center.
* **Tech Literacy:** High; proficient with web applications, GIS maps, and VHF radio dispatch.
* **Key Needs:** Filtering false alarms, receiving precise GPS locations for emergency calls, monitoring crowd density heatmaps along highway bottlenecks.
* **Quote:** *"Radio descriptions like 'near the yellow tent' waste 30 minutes of our response team's time. Give me a pinpoint on a map with an ETA."*

### Persona 3: Dr. Ramesh Kadam (Medical Camp Officer)
* **Age & Background:** 45 years old, District Civil Surgeon overseeing a 20-bed emergency field clinic in Lonand.
* **Tech Literacy:** Moderate; uses hospital management software and tablets.
* **Key Needs:** Directing incoming ambulances away from already full camps, tracking bed occupancy in neighboring sectors, stocking adequate antivenom.
* **Quote:** *"We cannot have 50 heatstroke patients arriving at our clinic when the neighboring relief camp 2 km down the highway has 15 open beds."*

---

## 3. Product Goals & Non-Goals

### 3.1 Product Goals
* **G-01:** Deliver distress notification from mobile screen tap to command center display in $\le 2.0$ seconds.
* **G-02:** Achieve 100% localization in Marathi for all pilgrim-facing mobile screens.
* **G-03:** Provide proximity-sorted medical camp queries with $< 500$ ms response time.
* **G-04:** Provide non-repudiable audit logs of all SOS incidents via zero-cost Web3 cryptographic anchoring.

### 3.2 Product Non-Goals (Explicit Boundaries)
* **NG-01:** WariMitra is **not** a social media network or generic chat application; family messaging is restricted to administrative alerts and group location telemetry.
* **NG-02:** WariMitra does **not** process monetary transactions, temple donations, or commercial vendor payments.
* **NG-03:** WariMitra does **not** replace physical police presence or official 108 emergency telephony; it augments them with digital coordinates.

---

## 4. MoSCoW Feature Prioritization & Rationale

```
┌──────────────────────────────────────┬──────────────────────────────────────┐
│             MUST HAVE                │              SHOULD HAVE             │
│  • 3-Second Hold SOS Button          │  • Ad-hoc Family Group Tracking      │
│  • Idempotency & Rate Limiting       │  • 30-Second Location & Battery Ping │
│  • Proximity Medical Camp Radar      │  • Web3 0-ETH Audit Proof Anchoring  │
│  • Virtualized Command Incident Feed │  • Crowdsourced Waste/Sanitation Log │
│  • Native Marathi Localization       │  • Digital Darshan Slot Booking Pass │
├──────────────────────────────────────┼──────────────────────────────────────┐
│             COULD HAVE               │              WON'T HAVE              │
│  • Temple Queue Little's Law Calc    │  • Automated AI Facial Recognition   │
│  • NOAA Heatstroke Risk Calculation  │  • Deep Learning Crowd Surge Vision  │
│  • Cultural Saint & Abhang Library   │  • In-App Monetary Temple Donations  │
│  • Municipal Bio-Toilet Clean Status │  • Offline SMS/IVR Voice Gateway     │
└──────────────────────────────────────┴──────────────────────────────────────┘
```

### Detailed Rationale for Classification:
1. **Must Have:** Features directly tied to life safety, distress dispatch, and avoiding catastrophic stampedes. If the 3-second hold SOS or proximity medical radar fails, the platform fails its primary public mandate.
2. **Should Have:** High-value operational enhancements (family tracking circles, Web3 audit trails, sanitation logs) that significantly elevate user experience and governance accountability.
3. **Could Have:** Value-added cultural content (saints, devotional songs) and heuristic calculations that enhance user engagement without impacting core triage operations.
4. **Won't Have (v2.0):** Complex machine learning (facial recognition, deep video analytics) and telephony infrastructure (IVR/SMS) that would introduce prohibitive cloud hosting costs, technical debt, and privacy/DPDP compliance complexities.

---

## 5. High-Level Release Strategy & Phasing

* **Phase 1 (Alpha / Emulator Validation):** Local validation of Cloud Functions, Firestore Security Rules, and Flutter UI using Firebase Local Emulator Suite (`ARCHITECTURE.md:512`).
* **Phase 2 (Beta / Staging Pilot):** Deployed to Firebase staging project in `asia-south1`; field simulation with 200 volunteer devices in Pune district.
* **Phase 3 (Production Cutover):** Deployed to production Blaze plan; live operational rollout across the 21-day pilgrimage corridor (`ARCHITECTURE.md:525-535`).
* **Post-Event Review:** Evaluation of incident audit logs, serverless execution costs, and system performance benchmarks.
