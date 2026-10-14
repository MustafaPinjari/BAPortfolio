# User Acceptance Testing (UAT) Test Cases — WariMitra

> **Document Identifier:** WM-UAT-TC-017  
> **Classification:** Operational Acceptance Scripts & Test Execution Matrix  
> **Standard:** IEEE Std 829-2008 / Traceable to `IEEE_TEST_CASES.md`  
> **Target Audience:** Business Analysts, QA Test Leads, UAT Stakeholder Sign-Off Committees  
> **Execution Environment:** Staging Environment (`warimitra-staging` / `asia-south1`)  

---

## 1. Test Case Execution Matrix

| Test Case ID | Req ID | Scenario | Preconditions | Test Data | Test Steps | Expected Result | Actual Result | Status | Business Owner | Defect Ref |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :---: | :--- | :--- |
| **UAT-SOS-01** | `FR-SOS-001`, `BR-001` | Validate 3-second hold SOS emergency panic dispatch | User logged in on Android device with GPS enabled. | Lat: `18.5204`, Lon: `73.8567`, Severity: `critical` | 1. Open mobile app to SOS screen.<br>2. Press and hold red button for exactly 3.0 seconds.<br>3. Observe UI transition. | Radial progress completes; haptic buzz triggers; `createSOS` creates document in `sosAlerts`; screen displays help confirmed with 108 dial button. | Alert created in 1.2s; push received on control room screen. | 🟢 **PASS** | Lead Police Inspector | None |
| **UAT-SOS-02** | `FR-SOS-001` | Verify early release cancels emergency dispatch | User on SOS screen. | Release at 1.5 seconds | 1. Press red SOS button.<br>2. Release finger at 1.5 seconds. | Radial progress resets to zero; no network request is sent; no alert appears in control room. | Button reset immediately; zero database write. | 🟢 **PASS** | Lead Police Inspector | None |
| **UAT-SOS-03** | `FR-SOS-002`, `BRULE-001` | Verify duplicate dispatch prevention via idempotency | Flaky network simulation; identical idempotency key. | `idempotencyKey`: `uuid-uat-1001` | 1. Send first `createSOS` request.<br>2. Immediately re-send identical request with same key. | First call creates `sosAlerts` doc; second call returns existing doc ID without creating second ticket or second FCM alert. | Handled identically; no duplicate incident card created. | 🟢 **PASS** | Solution Architect | None |
| **UAT-SOS-04** | `FR-SOS-003`, `BRULE-002` | Validate rate limiting lockout at 6th alert | User account active. | 6 calls within 45 seconds | 1. Invoke `createSOS` 5 times in rapid succession.<br>2. Attempt 6th invocation within same minute. | First 5 succeed; 6th invocation fails with `resource-exhausted`; app displays Marathi cooldown dialog. | Cloud Function threw 429; user shown wait message. | 🟢 **PASS** | System Administrator | None |
| **UAT-SOS-05** | `FR-SOS-004`, `BRULE-003` | Verify rejection of coordinates outside India | Simulated mock GPS location. | Lat: `51.5074` (London), Lon: `-0.1278` | 1. Submit `createSOS` with London coordinates. | Cloud Function rejects with `failed-precondition`; request rejected. | Function returned error; no record in `sosAlerts`. | 🟢 **PASS** | Lead Police Inspector | None |
| **UAT-MED-01** | `FR-MED-002`, `BR-002` | Discover active medical camps within 10 km radius | User in Saswad area; 3 camps seeded (2km, 7km, 15km). | Lat: `18.3448`, Lon: `74.0298`, Radius: `10km` | 1. Open Medical tab in mobile app.<br>2. Tap "Nearby Medical Camps". | Returns 2 camps (2km and 7km) sorted by distance; 15km camp omitted; bed availability shown. | 2 camps displayed in 340ms; distance labels accurate. | 🟢 **PASS** | Chief Medical Officer | None |
| **UAT-MED-02** | `FR-MED-002`, `BRULE-008` | Verify inactive camps are excluded from search | 1 camp marked `status: 'inactive'` at 1.5 km. | Camp ID: `camp_inactive_01` | 1. Search medical camps within 10 km. | Inactive camp is completely excluded from results array. | Only active facilities returned; zero routing to closed camp. | 🟢 **PASS** | Chief Medical Officer | None |
| **UAT-CMD-01** | `FR-CMD-003`, `BR-003` | Real-time incident receipt without browser refresh | Police operator on Next.js Command Center feed. | New mobile SOS alert triggered in field | 1. Operator monitors SOS queue.<br>2. Field tester triggers SOS on mobile. | New incident card appears dynamically at top of queue in $< 2.0$ seconds with pulsing red border. | Incident card rendered in 1.4 seconds; audible chime fired. | 🟢 **PASS** | Police Control Room | None |
| **UAT-CMD-02** | `FR-CMD-003`, `BRULE-005` | Dispatcher acknowledges and resolves incident | Operator authenticated as `police_officer`. | Incident ID: `sos_uat_test_01` | 1. Click "Acknowledge".<br>2. Select "Dispatch Unit".<br>3. Enter notes and click "Resolve". | Incident transitions status: `pending` $\rightarrow$ `acknowledged` $\rightarrow$ `dispatched` $\rightarrow$ `resolved`; UI updates across all clients. | Status successfully updated; removed from active triage queue. | 🟢 **PASS** | Police Control Room | None |
| **UAT-W3-01** | `FR-W3-004`, `BR-004` | Verify cryptographic blockchain proof generation | Sepolia testnet configured; SOS incident resolved. | Incident ID: `sos_uat_test_01` | 1. Check `blockchainProofs` collection for `entityId`.<br>2. Inspect transaction hash and SHA-256 canonical hash. | Document exists containing valid 64-char SHA-256 hash and Sepolia transaction hash; status `CONFIRMED`. | Proof confirmed on Sepolia testnet; verified via block explorer. | 🟢 **PASS** | District Magistrate | None |
| **UAT-FAM-01** | `FR-007` | Create and join family group via 6-char code | 2 test phones running mobile app. | Code: `WARI26` | 1. Phone 1 creates family circle "Jadhav Family".<br>2. Phone 2 enters code `WARI26`. | Phone 2 joins circle; both devices appear on shared map with distance and battery level. | Both pins rendered accurately on map. | 🟢 **PASS** | Pilgrim Representative | None |
| **UAT-MIS-01** | `FR-009` | Missing person intake with photo upload | Test device with camera. | Name: "Anand Shinde", Age: 72, Photo: 3.5MB JPEG | 1. Fill missing person form.<br>2. Capture photograph.<br>3. Submit report. | Photo uploaded to Cloud Storage in $< 5$s; case document created in `missingPersons`; visible on police portal. | Upload took 3.2s; photo rendered in police dashboard. | 🟢 **PASS** | Police Crime Branch | None |

---

## 2. Summary of UAT Results

* **Total Test Cases Executed:** 12
* **Passed:** 12 (100%)
* **Failed:** 0 (0%)
* **Blocked:** 0 (0%)
* **UAT Sign-off Recommendation:** **APPROVED FOR PILGRIMAGE GO-LIVE**
