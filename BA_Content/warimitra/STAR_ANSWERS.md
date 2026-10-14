# Behavioral & Situational STAR Interview Answers — WariMitra

> **Document Identifier:** WM-STAR-028  
> **Classification:** Behavioral & Situational Competency Master Guide  
> **Format:** Situation $\rightarrow$ Task $\rightarrow$ Action $\rightarrow$ Result (STAR Methodology)  
> **Target Audience:** Business Analysts & Technical Product Owners Facing Competency Interviews  

---

## 1. Requirement Gathering Under Extreme Demographic Variance
* **Situation:** During requirements elicitation for WariMitra, we faced a user base spanning 8-year-old children to 85-year-old rural devotees with limited literacy, alongside high-ranking police superintendents requiring complex GIS dispatch data.
* **Task:** As the BA, I had to formulate functional specifications that catered to illiterate, panic-stricken users in the field while satisfying rigorous command-and-control police workflows.
* **Action:** I conducted field walkthroughs in Alandi and Saswad. I realized text-heavy mobile screens would fail in an emergency. I replaced input forms with a 3-second continuous hold physics gesture with haptic vibration, accompanied by high-contrast visual cues and complete Marathi localization. For dispatchers, I specified virtualized incident queues with Google Maps marker clustering.
* **Result:** Achieved 100% intuitive panic usability in UAT with zero text typing required from pilgrims, while providing dispatchers with exact GPS coordinates and pre-computed ETAs.

---

## 2. Managing Developer Disagreement / Architectural Conflict
* **Situation:** The engineering squad had built an initial working prototype using Django 6.0 and PostgreSQL. However, our architectural review (`backend_audit.md`) revealed that handling 50k+ live GPS pings per minute would cause fatal database transaction locks and worker exhaustion.
* **Task:** I needed to convince developers and the tech lead to abandon the monolithic backend and pivot to a serverless Firebase architecture without demoralizing the team.
* **Action:** Rather than framing it as a personal critique, I facilitated an objective technical workshop. I created a capacity calculation model showing that PostgreSQL would spend all IOPS vacuuming high-frequency location pings. I demonstrated how Firebase Cloud Functions and Cloud Firestore would elastically scale to 10,000+ concurrent connections, provide built-in real-time listeners for the Next.js dashboard, and lower monthly hosting costs to ~$185.
* **Result:** The engineering team unanimously agreed to the pivot. We delivered v2.0 on Firebase, achieving 1.2s p95 SOS creation latency and 320ms database read benchmarks.

---

## 3. Resolving a Conflict Between Competing Stakeholders
* **Situation:** During the design of the Emergency SOS feature, the District Police demanded mandatory Aadhaar biometric verification before an alert could be submitted to prevent false alarms. Conversely, the Chief Medical Officer and Pilgrim Representatives argued that forcing a devotee suffering a heart attack to perform biometric eKYC would cause fatal delays.
* **Task:** As the BA, I had to resolve this conflict and align police and healthcare stakeholders on a unified requirement.
* **Action:** I facilitated a joint requirements workshop. I mapped out the clinical "Golden Hour" timeline, demonstrating that biometric verification in rural connectivity zones would add 3 to 5 minutes of drop-off risk. I proposed a technical compromise: keep the mobile distress trigger friction-free (authenticated via basic phone OTP, safeguarded by a 3-second hold gesture, 5/min rate limiting, and Indian geofencing), while strictly enforcing multi-factor RBAC custom claims on responding police officers.
* **Result:** Both the Police Superintendent and Chief Medical Officer signed off on the compromise. During UAT, false alarms were virtually eliminated while emergency ingestion remained under 1.2 seconds.

---

## 4. Handling Changing Requirements / Scope Creep
* **Situation:** Two weeks prior to scheduled staging deployment, Temple Trust executives requested the addition of automated AI facial recognition to compare missing persons against CCTV video streams.
* **Task:** I had to assess the impact of this major request without derailing the release schedule or introducing high cloud compute costs.
* **Action:** I initiated the formal Change Control process. I conducted an impact analysis showing that integrating deep learning facial vector models would require training datasets, GPU infrastructure costing thousands of dollars, and complex compliance with India's Digital Personal Data Protection (DPDP) Act, pushing the release out by 6 weeks. I presented the findings to the Change Control Board, recommending that we deliver the core missing persons intake module with high-resolution photo uploads for v2.0, while formalizing AI face matching as an Epic in the post-pilgrimage v2.1 roadmap.
* **Result:** The CCB unanimously approved the deferral. The team delivered the core missing persons workflow on schedule with zero scope creep.

---

## 5. Identifying a Critical Defect / Missed Requirement in UAT
* **Situation:** During UAT execution of the Emergency SOS trigger in staging (`UAT-SOS-03`), testers observed that when devices experienced intermittent rural 3G packet drops, the mobile app retried the HTTPS call, creating multiple duplicate incident cards on the police dashboard.
* **Task:** I needed to identify the root cause, quantify the operational risk, and specify the functional remediation before production cutover.
* **Action:** I raised a Severity 1 defect. I explained to engineering that duplicate tickets would cause dispatchers to send multiple ambulances to the same victim, wasting limited emergency resources. I authored the functional specification for client-side idempotency: generating a UUIDv4 `idempotencyKey` on the mobile device and adding a deduplication query in `functions/src/index.ts` to return the existing record on retries.
* **Result:** Engineering implemented the idempotency pipeline within 24 hours. Retesting verified that retransmissions returned the existing alert without creating duplicate tickets or FCM push alerts.

---

## 6. A Data-Driven Decision That Influenced Product Architecture
* **Situation:** Product leadership was debating whether to pay for an enterprise PostGIS database instance or use Firebase serverless for proximity medical camp searches.
* **Task:** As the Technical BA, I had to provide empirical data and architectural trade-offs to guide the investment decision.
* **Action:** I calculated the query volume and operational costs. Setting up an unmanaged PostgreSQL/PostGIS cluster with high-availability replication across Mumbai would cost upwards of $450/month in cloud compute and maintenance. I evaluated `geofire-common` Geohash indexing on Firestore. I calculated that bounding-box queries for a 10 km radius would require only 4 to 8 parallel range reads, executing in 320ms (p95) and costing under $60/month on Firebase Blaze pay-as-you-go.
* **Result:** Leadership approved the Geohash serverless approach, saving over 70% in monthly infrastructure costs while exceeding our sub-500ms read latency SLA.
