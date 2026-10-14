# Stakeholder Analysis & Engagement Matrix — WariMitra

> **Document ID:** WM-STK-003  
> **Classification:** Stakeholder Identification, Mapping & RACI Matrix  
> **Standard:** BABOK v3 Chapter 3 (Business Analysis Planning & Monitoring)  
> **Target Audience:** Lead Business Analysts, Program Managers, Agile Product Owners, Interview Evaluators  
> **Source Evidence:** `docs/BRD.md:22-30`, `docs/FRD.md:6-15`, `firestore.rules:10-29`, `VARIMITRA_SPEAKER_CONTEXT.md:176-200`  

---

## 1. Stakeholder Identification & Categorization

In mass-gathering GovTech initiatives, stakeholder groups diverge sharply across operational priorities, digital capabilities, and authority levels. WariMitra encompasses seven primary ground and administrative stakeholders:

```
                                  GOVERNMENT EXECUTIVE
                                (District Collector / SP)
                                           │
                    ┌──────────────────────┴──────────────────────┐
                    │                                             │
          OPERATIONAL AUTHORITIES                         CIVIL & COMMUNITY
                    │                                             │
      ┌─────────────┼─────────────┐                 ┌─────────────┼─────────────┐
      │             │             │                 │             │             │
POLICE/TRAFFIC   MEDICAL      MUNICIPAL         PILGRIMS      GROUND       DINDI
  OFFICERS       OFFICERS    SANITATION        (WARKARIS)   VOLUNTEERS    LEADERS
                                   & NGO
```

---

## 2. Power vs. Interest Grid (Mendelow’s Matrix)

```
High Power │ [Keep Satisfied]                    │ [Manage Closely]
           │ • District Collectors / Magistrates │ • Police & Law Enforcement
           │ • Pandharpur Temple Trustees        │ • Chief Medical Officers
           │ • Telecom Infrastructure Providers  │ • State Disaster Management (SDMA)
           ├─────────────────────────────────────┼───────────────────────────────────
           │ [Monitor (Minimum Effort)]          │ [Keep Informed]
           │ • General Public Non-Participants   │ • Pilgrims (Varkaris)
           │ • Transit Merchants & Local Shops   │ • Dindi Procession Leaders
           │ • Regional Media & Press            │ • NGOs & Charitable Food Camps
Low Power  │                                     │ • Youth Ground Volunteers
           └─────────────────────────────────────┴───────────────────────────────────
                         Low Interest                          High Interest
```

---

## 3. Comprehensive Stakeholder Profiles

### 3.1 Pilgrim / Devotee (*Warkari*)
* **Role & Demographics:** Direct beneficiary and mobile app end-user. Spans all ages (8–85), predominantly rural agrarian background with varying literacy levels.
* **Responsibilities:** Adhere to route guidelines, report personal emergencies or missing relatives, utilize amenities conscientiously.
* **Goals:** Complete the pilgrimage safely, maintain physical well-being, stay in contact with traveling family, have a smooth temple darshan.
* **Pain Points:** Lack of real-time route guidance; getting separated in dense crowds; inability to communicate emergencies quickly; exhaustion from 20+ hour queue lines.
* **Key Requirements:**
  - High-contrast, single-tap/hold emergency SOS with zero typing.
  - Native Marathi interface with large fonts and simple icons.
  - Offline-first map of drinking water, medical tents, and toilets.
  - Real-time Darshan queue wait-time visibility.
* **Influence:** High (Collective public voice) | **Interest:** High (Personal safety & devotion)
* **System Interaction:** Flutter Mobile App (`mobile/lib/screens/home_screen.dart`, `sos_screen.dart`).
* **Expected Business Outcome:** Zero unassisted distress situations; rapid family reunification; reduced physical fatigue.

---

### 3.2 Ground Volunteer
* **Role & Demographics:** Tech-literate local youth, scouts, or NGO volunteers positioned along the pilgrimage route.
* **Responsibilities:** Assist elderly pilgrims, verify crowdsourced incident reports, provide first-responder guidance during localized congestion.
* **Goals:** Efficiently triage field requests, minimize false alarms, direct medical/police units to exact spots.
* **Pain Points:** Overwhelmed by frantic bystanders; no direct communication line to command center; duplicate work across volunteer squads.
* **Key Requirements:**
  - Incident verification dashboard to validate or dismiss citizen reports.
  - Task assignment queue showing nearby distress alerts.
  - Secure check-in to confirm active on-duty status.
* **Influence:** Medium | **Interest:** High
* **System Interaction:** Flutter Mobile App with Volunteer privilege toggle (`docs/FRD.md:26-30`).
* **Expected Business Outcome:** 80% reduction in unverified/spurious crowd panic calls reaching police dispatch.

---

### 3.3 Dindi Leader (*Dindi Pramukh*)
* **Role & Demographics:** Hereditary or elected head of a traditional marching contingent (50 to 500 members). Respected community figure with moderate tech literacy.
* **Responsibilities:** Keep the contingent grouped, ensure morning/evening headcounts, coordinate baggage and tent trucks, oversee member welfare.
* **Goals:** Zero lost members; timely arrival at scheduled camps; rapid notification of emergency within the dindi.
* **Pain Points:** Inability to locate members who drop out of the marching column due to illness or fatigue; chaos during meal times.
* **Key Requirements:**
  - Contingent roster management with unique 6-character group invite code.
  - Live map overlay displaying current GPS locations and battery levels of group members.
  - Broadcast notification tool to blast Marathi announcements to their group.
* **Influence:** Medium-High (Key community influencer) | **Interest:** High
* **System Interaction:** Flutter Mobile App (`mobile/lib/screens/family_locator_screen.dart`, `docs/FRD.md:31-35`).
* **Expected Business Outcome:** Elimination of internal dindi separation; rapid localized search for lost contingent members.

---

### 3.4 Medical Officer & Emergency First Responder
* **Role & Demographics:** Government doctors, rural hospital paramedics, 108 emergency ambulance pilots stationed at medical relief camps.
* **Responsibilities:** Acute clinical triage, treating heatstroke/exhaustion/injuries, managing ambulance transport, recording patient intake.
* **Goals:** Immediate notification of medical emergencies; accurate patient count tracking; balanced patient loads across neighboring camps.
* **Pain Points:** Paper registers prevent visibility into surrounding camp occupancy; ambulances stuck in pedestrian congestion; lack of pre-arrival patient data.
* **Key Requirements:**
  - Real-time medical SOS feed with patient GPS and direct phone dialer.
  - Bed capacity and patient count management tool (`medicalCamps/{campId}`).
  - Proximity search capability for ambulance routing.
* **Influence:** High | **Interest:** High
* **System Interaction:** Web Command Center (`frontend/src/app/medical/`) and Mobile App.
* **Expected Business Outcome:** 50% faster ambulance dispatch-to-scene arrival; zero camp over-capacity surprises.

---

### 3.5 Police & Traffic Control Officer
* **Role & Demographics:** Sub-Inspectors, Deputy Superintendents, and Traffic Marshals overseeing law and order, security, and highway diversions.
* **Responsibilities:** Crowd density control, stampede prevention, vehicular diversion, VIP movement security, investigating lost/found and missing persons.
* **Goals:** Absolute prevention of stampedes; free-flowing pilgrimage routes; rapid de-escalation of public safety incidents.
* **Pain Points:** Blind spots along rural ghat roads; delayed notification of sudden crowd bottlenecks; public panic due to rumors.
* **Key Requirements:**
  - Live GIS heatmap integrating pilgrim GPS pings.
  - Incident queue with status lifecycle management (`pending` $\rightarrow$ `acknowledged` $\rightarrow$ `dispatched` $\rightarrow$ `resolved`).
  - Missing persons repository with searchable photo records.
* **Influence:** High | **Interest:** High
* **System Interaction:** Web Command Center (`frontend/src/app/police/`, `frontend/src/app/crowd/`).
* **Expected Business Outcome:** Proactive crowd diversion 30 minutes before critical density thresholds; verified incident closure.

---

### 3.6 NGO & Relief Coordinator
* **Role & Demographics:** Representatives of non-profit trusts, religious charities, and philanthropic kitchens (*Annachhatras*).
* **Responsibilities:** Preparing and serving free meals (*Mahaprasad*), distributing bottled water, dry rations, and blankets.
* **Goals:** Efficient food distribution; zero food wastage; reaching underserved trailing pilgrim columns.
* **Pain Points:** Food spoiling due to unexpected route delays; multiple NGOs setting up kitchens in the same 500m zone while other sectors starve.
* **Key Requirements:**
  - Facility registration interface to declare location, item type, and daily feeding capacity.
  - Demand heatmaps indicating where pilgrim concentrations are underserved.
* **Influence:** Medium | **Interest:** High
* **System Interaction:** Web Command Center (`frontend/src/app/ngo/`) & Mobile Directory.
* **Expected Business Outcome:** Optimal spatial distribution of relief camps along the 250 km highway corridor.

---

### 3.7 Government Administrator / District Magistrate
* **Role & Demographics:** District Collector, Superintendent of Police (SP), Municipal Commissioner, Temple Trust Chief Executive.
* **Responsibilities:** Overall administrative governance, inter-agency resource authorization, disaster response protocol sign-off, public accountability.
* **Goals:** Zero fatalities; positive public perception; transparent governance; budget compliance.
* **Pain Points:** Contradictory reports from disparate department heads; post-incident blame games during inquiry commissions.
* **Key Requirements:**
  - Executive KPI dashboard showing active SOS alerts, open camps, total active pilgrims, and temple queue velocity.
  - Non-repudiable audit logs backed by cryptographic blockchain proofs for incident investigation.
* **Influence:** Critical / Highest | **Interest:** High
* **System Interaction:** Web Command Center (`frontend/src/app/page.tsx`).
* **Expected Business Outcome:** Unified command-and-control; defensible, data-backed administrative audits.

---

## 4. Stakeholder RACI Matrix

| Project Activity / Capability | Pilgrim | Volunteer | Dindi Leader | Medical Officer | Police Officer | NGO Coord | Govt Admin |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Emergency SOS Trigger** | **R** | C | **R** | I | I | I | I |
| **SOS Triage & Dispatch** | I | C | I | **A / R** | **A / R** | I | I |
| **Missing Person Intake** | **R** | C | **R** | I | **A / R** | I | I |
| **Medical Camp Bed Updates** | I | I | I | **A / R** | I | I | I |
| **Crowd Diversion Decision** | I | I | C | I | **R** | I | **A** |
| **Relief Resource Logging** | I | I | I | I | I | **A / R** | C |
| **Temple Queue Gate Control** | I | I | I | I | C | I | **A / R** |
| **Audit Log & Proof Review** | I | I | I | I | C | I | **A / R** |

*(Legend: **R** = Responsible for doing; **A** = Accountable for outcome; **C** = Consulted; **I** = Informed)*
