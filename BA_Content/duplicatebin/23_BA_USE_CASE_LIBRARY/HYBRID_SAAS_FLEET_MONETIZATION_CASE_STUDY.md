# ☁️ Domain Case Study 3: Hybrid SaaS Fleet Management & Pay-As-You-Go Monetization

> **Document Classification:** **[SIMULATED BA CASE STUDY — DERIVED FROM PROJECT DOMAIN]**  
> **Domain:** Hybrid SaaS Architecture, Device Telemetry, Pay-As-You-Go Monetization  
> **Target Scenario:** Transitioning an open-source desktop utility into a commercial multi-device SaaS product for creative digital marketing agencies.  

---

## 1. Case Study Overview & Business Problem

### Business Context
"Nexus Media Agency" employs 40 remote video editors and motion graphic designers working across distributed Windows and macOS laptops. Project media files and render caches are scattered across local drives, with zero central IT oversight.

### The Problem
The executive team needed:
1. A way for the central IT team to monitor storage bloat across 40 remote employee laptops without invading employee privacy.
2. A commercial model that aligned with actual utility—the agency rejected paying $15/user/month ($600/month) for an all-or-nothing software license when employees only perform drive cleanups once or twice a month.

---

## 2. Solution: Zero-Trust Hybrid SaaS + Pay-As-You-Go Credits

As the Lead Technical Business Analyst, I architected the business model and system requirements for a **Hybrid SaaS Platform**:

```mermaid
sequenceDiagram
    autonumber
    actor Admin as Agency IT Manager
    participant Portal as Web SaaS Dashboard
    participant API as FastAPI Cloud Backend
    participant WS as WebSocket Command Hub
    participant Agent as Remote Workstation Daemon

    Admin->>Portal: Generate 6-Digit Pairing Code
    Portal->>API: GET /api/devices/pairing-code
    API-->>Portal: Code "918234" (300s expiration)
    Admin->>Agent: Terminal: 'python run.py pair 918234'
    Agent->>API: POST /api/devices/pair
    API-->>Agent: Issues 64-char persistent pairing token
    Agent->>WS: Connects WebSocket /ws/agent

    Admin->>Portal: Triggers Remote Scan across 40 Laptops
    Portal->>API: POST /api/scan/trigger
    API->>WS: Broadcasts CMD_START_SCAN
    Agent->>Agent: Executes local IntelligentDetectionEngine
    Agent->>WS: Streams live AGENT_PROGRESS
    WS-->>Portal: Real-time progress bar across all 40 laptops
    Agent->>API: POST /api/scans/telemetry (bytes_recoverable)
    API->>API: Debits user credit ledger; updates company ROI savings badge
```

---

## 3. Business & Monetization Architecture

### 3.1 The Hybrid Pricing Engine
- **Free Tier:** 10 GB ($10,737,418,240$ bytes) included free upon signup to ensure zero-friction onboarding.
- **Pay-As-You-Go Credit Packs (Prosumers):**
  - **$4.99 for 100 GB** deduplication credits.
  - **$19.99 for 1 TB** deduplication credits.
  - *Why it worked:* Solved customer resistance to recurring monthly subscriptions for infrequent maintenance tasks.
- **Corporate Team Subscriptions (Agencies):**
  - **Team Starter ($29/month):** Up to 5 connected device agents + 2 TB monthly credits.
  - **Business Premium ($99/month):** Up to 20 connected agents + 10 TB monthly credits.

### 3.2 Zero-Trust Privacy Guarantee
- To appease enterprise privacy policies, **file contents and file paths are never transmitted to the SaaS cloud**.
- Only high-level numeric metrics (`bytes_recoverable`, `duplicates_count`, `duration_seconds`) and command signals flow through FastAPI.

---

## 4. Key Functional & Technical Requirements

- **FR-SAAS-01 (6-Digit Numeric Pairing):** Workstations must be pairable in under 30 seconds using an expiring 6-digit cryptographic handshake (`/api/devices/pairing-code`), generating a permanent 64-character token.
- **FR-SAAS-02 (Bi-Directional Command Relay):** The backend must maintain persistent WebSocket connections (`/ws/agent`), routing `CMD_START_SCAN` commands and ingesting live `AGENT_PROGRESS` streams.
- **FR-SAAS-03 (Idempotent Credit Deduction):** The system must atomically deduct `bytes_recoverable` from the user's `credit_bytes` account balance upon scan completion, with idempotency guards preventing double billing on retries.

---

## 5. Business Outcomes & Measurable ROI

- **Fleet Deployment:** 40 distributed employee laptops successfully paired within 2 business days.
- **Storage Reclaimed:** Reclaimed **14.6 TB** of redundant render caches across the agency.
- **Customer Acquisition Cost (CAC) & Conversion:** Free 10 GB tier achieved a **28% conversion rate** to paid credit packs and team plans within 60 days.
- **Subscription Predictability:** Agency adopted the **$99/month Business Premium** plan, saving $500/month compared to competing per-seat enterprise tools.

---

## 6. Interview Preparation: How to Defend This Case Study

1. **Why choose a hybrid architecture over a pure web app or pure desktop app?**  
   *"A pure web application cannot scan local multi-terabyte drives without painfully slow file uploads across the internet, violating customer data privacy. A pure desktop app cannot provide centralized visibility or recurring SaaS monetization for enterprise IT managers. By decoupling **local zero-trust execution** from a **centralized FastAPI cloud relay**, we achieved the best of both worlds: local native performance with cloud-managed governance."*
2. **How did you prevent credit ledger race conditions?**  
   *"In our requirements specification for `/api/scans/telemetry`, I mandated that credit deductions occur **only once** upon the initial atomic state transition to `completed`. We wrapped the scan update and credit deduction inside an isolated database transaction, ensuring that network retries or duplicate telemetry packets could never double-debit customer credits."*
