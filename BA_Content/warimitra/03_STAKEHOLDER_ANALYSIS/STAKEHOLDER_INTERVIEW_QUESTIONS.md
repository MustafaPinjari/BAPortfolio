# Stakeholder Elicitation Guide & Interview Questions — WariMitra

> **Document ID:** WM-STK-ELICIT-003  
> **Classification:** Business Analysis Requirements Elicitation Framework  
> **Standard:** BABOK v3 Chapter 4 (Elicitation & Collaboration)  
> **Target Audience:** Business Analysts, Product Managers, Interview Preparation Candidates  
> **Project Context:** Reverse-Engineered Elicitation Protocols for Mass Gathering Management  

---

## 1. Overview of BA Elicitation Strategy

To design and reverse-engineer WariMitra, a Business Analyst cannot rely on generic user questionnaires. The diverse spectrum of users—from rural elderly pilgrims walking in 40°C heat to high-ranking police superintendents—mandates context-specific, empathetic, and operational elicitation techniques.

---

## 2. Stakeholder-Specific Interview Guides

### 2.1 Eliciting from Pilgrims (Varkaris)
*Context:* Field interviews conducted during halts at rest camps (*Palkhi Mukkam*). Conducted in Marathi. Focus on simplicity, physical constraints, and distress scenarios.

1. **Journey & Distress Experience:**  
   *"When you or someone walking beside you feels dizzy or suffers chest pain in the middle of a crowded highway, what are the first three things you currently do to get help?"*
2. **Device & Digital Literacy Realities:**  
   *"When you are walking with your hands holding cymbals (Taal) or baggage, how comfortable are you typing on a mobile screen? Would you prefer holding a button, or speaking in Marathi?"*
3. **Family Separation Scenarios:**  
   *"During the evening halt when tens of thousands gather in one village, how do you locate your family members if your mobile battery drops or cellular signals become weak?"*
4. **Information Prioritization:**  
   *"Between knowing the weather forecast, finding clean toilets, knowing the exact temple line wait time, or finding drinking water, which information do you urgently need within 30 seconds of checking your phone?"*

---

### 2.2 Eliciting from Ground Volunteers
*Context:* Structured focus group sessions with youth volunteer organizations (NSS, NCC, local Seva Mandals).

1. **Incident Triage & False Alarms:**  
   *"How many reports of 'crowd panic' or 'water shortage' that you receive from the public turn out to be exaggerated or completely false alarms? How do you currently verify them before escalating?"*
2. **Operational Coordination:**  
   *"When you arrive at a scene where an elderly pilgrim is dehydrated, how do you communicate the exact spot to the nearest ambulance driver without street addresses or landmarks?"*
3. **Incentivization & Task Load:**  
   *"What information must a task ticket show you (e.g., distance in meters, nature of injury, contact number) for you to immediately accept and resolve it?"*

---

### 2.3 Eliciting from Dindi Leaders (Dindi Pramukhs)
*Context:* Semi-structured interviews with senior hereditary dindi leaders managing 100–500 members.

1. **Contingent Accountability:**  
   *"How do you currently take roll call or track that all 250 members of your dindi reached the evening shelter safely?"*
2. **Emergency Protocol Within the Cohort:**  
   *"If a 70-year-old devotee from your dindi falls behind and gets separated, at what point do you notify the police, and what details do you provide?"*
3. **Onboarding & Group Formation:**  
   *"If we give you a simple 6-character code (like 'WARI07') to share with your members on WhatsApp to auto-group them on a map, would your members be able to enter it?"*

---

### 2.4 Eliciting from Medical Officers & EMT Responders
*Context:* Operational workflow walkthroughs at District Civil Hospitals and rural primary health centers (PHCs).

1. **Golden-Hour Response Bottlenecks:**  
   *"What is the primary factor causing ambulances to exceed the 15-minute response window during the pilgrimage—is it traffic gridlock, delayed call intake, or vague caller descriptions?"*
2. **Capacity & Bed Visibility:**  
   *"How do you currently prevent an emergency clinic from being overwhelmed with 100 heatstroke patients when a neighboring clinic 2 km away has 20 empty beds and available IV fluids?"*
3. **Patient Intake & Data Privacy:**  
   *"During mass triage, what is the absolute minimum patient data set required before treatment begins (e.g., Name, Age, Vital Signs, Emergency Contact)? Can detailed clinical notes wait until post-stabilization?"*

---

### 2.5 Eliciting from Police & Traffic Control Officers
*Context:* Strategic interviews with Additional Superintendents of Police (Addl. SP) and Traffic Division Inspectors.

1. **Stampede Precursor Indicators:**  
   *"What specific environmental cues (e.g., pedestrian movement speed dropping below 0.5 m/s, sudden directional convergence, crowd density exceeding 4 people/m²) trigger your decision to order a route diversion?"*
2. **Incident Dispatch & Unit Assignment:**  
   *"When an SOS panic alert appears on your terminal, what jurisdictional logic determines whether it routes to the Local Beat Marshal, Traffic Police, or Quick Response Team (QRT)?"*
3. **Missing Persons Investigation Lifecycle:**  
   *"Walk me through the lifecycle of a missing child report from initial registration at a police outpost to radio broadcast and final family reunification. Where are the primary data drop-offs?"*

---

### 2.6 Eliciting from Relief NGOs & Kitchen Coordinators
*Context:* Operational reviews with coordinators of community kitchens (*Annachhatras*) and water relief trusts.

1. **Supply-Demand Imbalances:**  
   *"How do you estimate how many thousands of meals to cook each morning, and how do you track which sections of the walking column have already received food?"*
2. **Resource Declaration:**  
   *"If an app allows you to register your food camp location and available food capacity, how often can your kitchen staff realistically update their remaining stock count?"*

---

### 2.7 Eliciting from District Magistrates & Government Administrators
*Context:* Executive alignment sessions with District Collectors and Municipal Commissioners.

1. **Governance & Legal Accountability:**  
   *"In the event of an unfortunate crowd crush or stampede, what documentation or audit trail is legally demanded by judicial inquiries to demonstrate that administrative response was timely and diligent?"*
2. **Inter-Agency Data Silos:**  
   *"Which departmental data sets (Police VHF logs, Health department admission registers, Temple Trust gate counters) do you currently lack in a single composite screen?"*
3. **Cost & Sustainability Constraints:**  
   *"What are the recurring software licensing, telecommunication, and infrastructure cost thresholds that the state administration is willing to sponsor under disaster management grants?"*

---

## 3. BA Technique Synthesis: How Requirements Were Derived

| Elicitation Technique | Practical Application in WariMitra |
| :--- | :--- |
| **Observation / Job Shadowing** | Shadowing police officers at traffic watchtowers and medical officers in triage tents to identify manual data entry bottlenecks. |
| **Document Analysis** | Reviewing historical disaster management guidelines, previous Wari commission reports, and IEEE 829 test specifications. |
| **Interface Analysis** | Analyzing touch target sizes, contrast ratios, and multilingual text expansion for non-English rural user interfaces. |
| **Prototyping & Usability Walkthroughs** | Testing the 3-second hold SOS trigger with elderly users to confirm physics animation prevents accidental panic pings. |
