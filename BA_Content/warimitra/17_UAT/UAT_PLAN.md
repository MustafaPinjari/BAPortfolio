# User Acceptance Testing (UAT) Master Plan — WariMitra

> **Document Identifier:** WM-UAT-PLAN-017  
> **Classification:** UAT Strategy, Governance & Execution Framework  
> **Standard:** IEEE Std 829-2008 / BABOK v3 Chapter 8 (Solution Evaluation)  
> **UAT Lead:** Senior Technical Business Analyst / Product Owner  
> **Testing Environment:** Firebase Staging Project (`asia-south1`) with Flutter Mobile Staging Build  
> **Source Evidence:** `IEEE_TEST_CASES.md:1-694`, `TESTING_GUIDE.md`, `functions/src/index.ts:336-419`  

---

## 1. Role of the Business Analyst in UAT

In enterprise and GovTech software delivery, the Business Analyst serves as the **bridge between technical QA and real-world operational stakeholders**. While QA validates that code meets technical specifications without syntax crashes, the BA ensures that the software **delivers business value, satisfies statutory mandates, and functions under extreme field conditions**.

### Specific BA Responsibilities During UAT:
1. **Scenario Design & Day-in-the-Life Scripts:** Translating technical user stories into contextual field simulations (e.g., simulating a medical emergency during a 40°C afternoon halt).
2. **Business User Facilitation:** Guiding rural Dindi leaders, police inspectors, and medical officers who may have low digital literacy through test scenarios in Marathi.
3. **Defect Triage & Severity Classification:** Evaluating whether a reported bug is a cosmetic glitch, a functional defect, or a critical life-safety blocker.
4. **Acceptance Criteria Validation:** Verifying that actual system outputs match the BRD and FRD Given-When-Then definitions.
5. **Business Sign-Off Facilitation:** Securing formal sign-off from District Collectors, Police Superintendents, and Chief Medical Officers prior to production deployment.

---

## 2. UAT Scope & Test Strategy

### 2.1 In-Scope Test Tracks
* **Track 1: Pilgrim Field Usability:** Mobile app navigation in Marathi, 3-second hold SOS gesture, offline cached map reading, family circle invite code joining.
* **Track 2: Emergency Response Triage:** Web Command Center incident receipt, real-time alert updates without page refresh, status transitions (`pending` $\rightarrow$ `resolved`).
* **Track 3: Healthcare Camp Operations:** Geohash medical camp discovery, distance sorting, bed capacity updates.
* **Track 4: Missing Persons & Lost/Found:** Photo upload, case status updates, and public notification.
* **Track 5: Governance & Web3 Audit:** Verification of SHA-256 hash generation and transaction proof visibility on the dashboard.

### 2.2 Testing Environments & Infrastructure
* **Backend:** Firebase Project Staging (`warimitra-staging`), Cloud Functions deployed in `asia-south1`.
* **Mobile Clients:** Android APK builds distributed to 50 field test devices (Samsung Galaxy A03 / Redmi 9A entry-level hardware to simulate real pilgrim phones).
* **Web Command Center:** Next.js staging build accessed via Chrome/Firefox on police control room terminals.
* **Test Case Management:** Synchronized via the implemented test results Cloud Functions (`saveTestCaseResults` / `getTestCaseResults` writing to `testResults/shared`) (`functions/src/index.ts:342-419`).

---

## 3. Entry & Exit Criteria

### 3.1 UAT Entry Criteria (Must be met before UAT starts)
1. All System Integration Testing (SIT) test cases executed with $\ge 95\%$ pass rate.
2. Zero open Critical (Severity 1) or High (Severity 2) technical defects in Jira/Firestore.
3. Firebase Staging environment provisioned with realistic seed data (50 medical camps, 20 temple queues, 100 sample users).
4. Bilingual UI copy (Marathi / English) fully populated with zero placeholder strings.

### 3.2 UAT Exit Criteria (Required for Production Go-Live)
1. 100% of Critical Life-Safety UAT test cases (SOS trigger, rate limiting, geofencing) passed.
2. Minimum 90% pass rate across secondary operational workflows.
3. Formal digital sign-off obtained from Lead Police, Medical, and District Administrative stakeholders.
4. Comprehensive defect log signed off with all residual cosmetic issues deferred to Post-Wari v2.1.

---

## 4. Defect Severity Matrix & Triage Protocol

| Severity Level | Operational Impact | SLA for Fix | Example in WariMitra |
| :--- | :--- | :--- | :--- |
| **S1 — Critical Blocker** | Prevents emergency SOS dispatch; crashes web dashboard; drops patient records; database rules expose private data. | $\le 4$ Hours | Hold SOS button fails to invoke `createSOS`; rate limiter permanently locks out valid users. |
| **S2 — Major Business Defect** | Core workflow impaired; reasonable workaround exists but causes operational friction. | $\le 24$ Hours | Medical camp distance sorting returns incorrect kilometer values; Marathi text overlaps on small screens. |
| **S3 — Minor Defect** | Non-critical feature defect; cosmetic issue; minor formatting error. | Next Sprint / Post-Wari | Icon misalignment on Lost & Found card; minor delay in Web3 proof badge rendering. |
| **S4 — Enhancement Request** | User suggests improvement not defined in baseline BRD. | Backlog Review | Request to add Marathi voice reading of temple queue wait times. |
