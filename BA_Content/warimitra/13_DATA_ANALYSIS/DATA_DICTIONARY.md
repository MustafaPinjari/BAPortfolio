# Comprehensive Data Dictionary — WariMitra

> **Document Identifier:** WM-DD-013  
> **Classification:** Physical & Logical Data Element Specifications  
> **Target Database:** Google Cloud Firestore NoSQL Database  
> **Standard:** ISO/IEC 11179 Metadata Registry Standard  
> **Target Audience:** Database Engineers, QA Data Testers, Technical BAs, Integration Architects  

---

## 1. Collection: `users`
*Path:* `/users/{userId}`  
*Description:* User accounts, profile references, custom claims, and FCM tokens.

| Field Name | Data Type | Nullable? | Validation / Constraints | Default Value | Business Definition & Description |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `userId` | `String` | No | Firebase Auth UID (alphanumeric) | Auth UID | Primary identifier matching authentication record. |
| `email` | `String` | Yes | Valid email format (RFC 5322) | None | Administrative email address. |
| `phoneNumber`| `String` | Yes | E.164 format (e.g., `+919876543210`) | None | Mobile phone number used for SMS OTP authentication. |
| `firstName` | `String` | No | Length: 1–50 characters | `""` | User's given first name. |
| `lastName` | `String` | Yes | Length: 0–50 characters | `""` | User's surname/family name. |
| `userType` | `String` | No | Enum: `pilgrim`, `volunteer`, `dindi_leader`, `medical_officer`, `police_officer`, `ngo`, `admin` | `'pilgrim'` | Role-based authorization claim determining app permissions. |
| `fcmToken` | `String` | Yes | Valid Firebase Cloud Messaging token | `null` | Device push notification token for emergency broadcast. |
| `createdAt` | `Timestamp`| No | Server-generated timestamp | `serverTimestamp()`| Account creation date and time. |

---

## 2. Collection: `sosAlerts`
*Path:* `/sosAlerts/{alertId}`  
*Description:* Emergency incident logs and spatial coordinates.

| Field Name | Data Type | Nullable? | Validation / Constraints | Default Value | Business Definition & Description |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `alertId` | `String` | No | Auto-generated document ID | Auto ID | Unique system identifier for the emergency ticket. |
| `userId` | `String` | No | Valid `users.userId` foreign reference | None | User account who triggered the panic alert. |
| `status` | `String` | No | Enum: `pending`, `acknowledged`, `dispatched`, `resolved` | `'pending'` | Current operational lifecycle stage of the incident. |
| `latitude` | `Float` | No | Range: $8.0$ to $35.0$ (India bounds) | None | GPS latitude coordinate captured at button trigger. |
| `longitude` | `Float` | No | Range: $68.0$ to $97.5$ (India bounds) | None | GPS longitude coordinate captured at button trigger. |
| `geohash` | `String` | No | 9-character Geohash string | None | Spatial index hash used for proximity bounding queries. |
| `severity` | `String` | No | Enum: `low`, `medium`, `high`, `critical` | `'medium'` | Clinical/tactical urgency level of the emergency. |
| `description`| `String` | Yes | Max length: 500 characters | `""` | Optional situational or medical symptom notes. |
| `idempotencyKey`| `String` | No | UUIDv4 (36 characters) | None | Unique client-generated key preventing duplicate writes. |
| `extraDetails`| `Map` | Yes | JSON key-value map | `{}` | Extensible metadata (blood group, battery percentage). |
| `createdAtClient`| `Timestamp`| No | Client-supplied timestamp | `Timestamp.now()`| Device clock time when SOS gesture completed. |
| `createdAt` | `Timestamp`| No | Server-generated timestamp | `serverTimestamp()`| Official server ingestion timestamp for SLA audit. |

---

## 3. Collection: `medicalCamps`
*Path:* `/medicalCamps/{campId}`  
*Description:* Physical medical relief posts, clinics, and trauma tents.

| Field Name | Data Type | Nullable? | Validation / Constraints | Default Value | Business Definition & Description |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `campId` | `String` | No | Auto-generated document ID | Auto ID | Unique identifier of the medical camp facility. |
| `name` | `String` | No | Length: 3–100 characters | None | Display name of the medical clinic or relief tent. |
| `latitude` | `Float` | No | Valid geographic latitude | None | Precise physical latitude of the clinic entrance. |
| `longitude` | `Float` | No | Valid geographic longitude | None | Precise physical longitude of the clinic entrance. |
| `geohash` | `String` | No | 9-character Geohash string | None | Spatial index hash for `getMedicalCamps` query. |
| `capacity` | `Integer` | No | Value $\ge 0$ | `0` | Total bed capacity of the medical camp. |
| `currentPatients`| `Integer`| No | Value $\ge 0$ | `0` | Number of beds currently occupied by patients. |
| `staffCount` | `Integer` | No | Value $\ge 0$ | `1` | Number of doctors and paramedics currently on duty. |
| `status` | `String` | No | Enum: `active`, `inactive`, `relocating` | `'active'` | Facility availability status. |

---

## 4. Collection: `familyGroups`
*Path:* `/familyGroups/{groupId}`  
*Description:* Ad-hoc tracking circles formed by traveling pilgrim groups.

| Field Name | Data Type | Nullable? | Validation / Constraints | Default Value | Business Definition & Description |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `groupId` | `String` | No | Auto-generated document ID | Auto ID | Unique system identifier for the family circle. |
| `name` | `String` | No | Length: 2–50 characters | None | Group name chosen by the creator (e.g., "Patil Parivar"). |
| `ownerId` | `String` | No | Valid `users.userId` reference | None | User account who created the circle and holds admin rights. |
| `inviteCode` | `String` | No | Exact 6-character alphanumeric string | None | Unique joining token shared with family members. |
| `memberIds` | `Array<String>`| No | Array of valid user IDs | `[ownerId]` | List of all users currently active in the circle. |
| `createdAt` | `Timestamp`| No | Server-generated timestamp | `serverTimestamp()`| Timestamp when circle was established. |

---

## 5. Collection: `missingPersons`
*Path:* `/missingPersons/{reportId}`  
*Description:* Official missing, separated, or lost person intake records.

| Field Name | Data Type | Nullable? | Validation / Constraints | Default Value | Business Definition & Description |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `reportId` | `String` | No | Auto-generated document ID | Auto ID | Unique case number for the missing person record. |
| `reportedBy` | `String` | No | Valid `users.userId` reference | None | User ID of the relative or officer filing the report. |
| `name` | `String` | No | Length: 2–60 characters | None | Full legal name of the missing individual. |
| `age` | `Integer` | No | Range: $1$ to $120$ | None | Age in years of the missing individual. |
| `category` | `String` | No | Enum: `child`, `elderly`, `adult`, `differently_abled` | None | Vulnerability classification category. |
| `photoUrl` | `String` | Yes | Valid HTTPS URL pointing to Cloud Storage | `null` | URL of the photograph uploaded during intake. |
| `lastSeenLatitude`| `Float` | Yes | Valid latitude coordinates | `null` | Latitude where the person was last spotted. |
| `lastSeenLongitude`| `Float`| Yes | Valid longitude coordinates | `null` | Longitude where the person was last spotted. |
| `description`| `String` | No | Max length: 1,000 characters | None | Clothing, distinctive physical traits, or medical conditions. |
| `status` | `String` | No | Enum: `missing`, `investigating`, `found`, `closed` | `'missing'` | Case investigation status. |
| `createdAt` | `Timestamp`| No | Server-generated timestamp | `serverTimestamp()`| Date and time when report was lodged. |

---

## 6. Collection: `blockchainProofs`
*Path:* `/blockchainProofs/{proofId}`  
*Description:* Cryptographic proof documents anchoring incident history.

| Field Name | Data Type | Nullable? | Validation / Constraints | Default Value | Business Definition & Description |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `proofId` | `String` | No | Auto-generated document ID | Auto ID | Unique system identifier for the verification proof. |
| `entityId` | `String` | No | Foreign ID (e.g., `sosAlerts.alertId`) | None | Identifier of the operational record being certified. |
| `eventType` | `String` | No | Enum: `SOS_CREATED`, `SOS_ACKNOWLEDGED`, `SOS_DISPATCHED`, `SOS_RESOLVED` | None | Event name corresponding to the state transition. |
| `eventVersion`| `Integer`| No | Integer $\ge 1$ | `1` | Sequential version counter of proofs for this entity. |
| `canonicalHash`| `String`| No | 64-character hex string (SHA-256) | None | Cryptographic digest of the canonical event snapshot. |
| `transactionHash`| `String`| Yes | 66-character hex string (`0x...`) or `null` | `null` | Public Ethereum Sepolia transaction hash. |
| `network` | `String` | No | Enum: `sepolia`, `none` | `'none'` | Public blockchain ledger where proof was anchored. |
| `anchoringStatus`| `String`| No | Enum: `CONFIRMED`, `PENDING`, `LOCAL_PROOF_ONLY` | None | Status of the blockchain write operation. |
| `snapshot` | `Map` | No | Canonical JSON representation of state | None | Complete frozen payload used to verify hash integrity. |
| `createdAt` | `Timestamp`| No | Server-generated timestamp | `serverTimestamp()`| Timestamp when proof record was persisted. |
