# Resume Claim & Quantitative Evidence Audit — WariMitra

> **Document Identifier:** WM-RCA-015  
> **Classification:** Resume Credibility Review & Truthful Phrasing Framework  
> **Standard:** Professional BA Credibility & Evidence-Based Verification  
> **Target Audience:** Job Candidates, Interview Coaches, Technical Recruiters  
> **Color Code:** 🟢 **GREEN** (Strongly Supported) | 🟡 **YELLOW** (Partially Supported / Context Needed) | 🔴 **RED** (Unsupported / Rewrite Mandated)  

---

## 1. Executive Audit Philosophy

When presenting technical projects in Business Analyst and Product Owner interviews, candidates frequently make numerical claims on their resumes (e.g., *"Improved response time by 50%"* or *"Scaled to 1 million users"*). A skilled senior interviewer will immediately drill into these numbers with 5 levels of follow-up questions:
* *Where was this measured?*
* *What was the exact baseline?*
* *What formula was used?*
* *Who signed off on the data?*
* *What sample size was evaluated?*

This document audits common resume claims against the **actual repository evidence** of WariMitra, assigning a credibility status and providing bullet-proof, truthful alternative wording.

---

## 2. Comprehensive Resume Claim Audit Table

| Resume Claim / Statement | Codebase Evidence Path | Can Be Mathematically Calculated? | Formula / Calculation | Status | Recommended Truthful Wording for Resume / Interview |
| :--- | :--- | :---: | :--- | :---: | :--- |
| **"Engineered emergency SOS system achieving sub-2s response time (1.2s p95)."** | `README.md:243`, `ARCHITECTURE.md:428`, `functions/src/index.ts:20-116` | **Yes** | Direct p95 load benchmark of Cloud Function execution and Firestore persistence. | 🟢 **GREEN** | *"Architected a serverless emergency SOS pipeline on Firebase Cloud Functions (asia-south1) achieving 1.2s p95 creation latency under load testing with built-in idempotency and rate limiting."* |
| **"Reduced emergency medical response time by 50% across 500,000+ pilgrims."** | `docs/BRD.md:34`, `VARIMITRA_SPEAKER_CONTEXT.md:60` | **No** (Historical dispatch data absent) | Assumed baseline (45m) vs modeled dispatch (20m) yields ~55%, but repo has no field logs. | 🟡 **YELLOW** | *"Formulated functional requirements and target KPIs for GovTech emergency dispatch, targeting a 50% reduction in response time through automated GPS routing to nearest responders and medical camps."* |
| **"Architected a Web3 blockchain trust layer anchoring emergency incident logs at ₹0 cost."** | `docs/WEB3_ARCHITECTURE.md`, `functions/src/trustLayer/` | **Yes** | Employs 0-ETH transactions on Sepolia testnet embedding SHA-256 event snapshots in tx hex data. | 🟢 **GREEN** | *"Designed a zero-gas-cost Web3 Trust Layer utilizing asynchronous 0-ETH transactions on Ethereum Sepolia to cryptographically anchor SHA-256 snapshots of critical emergency state transitions for tamper-evident auditing."* |
| **"Designed geospatial search querying medical relief camps within 10 km in under 500ms."** | `functions/src/index.ts:122-177`, `ARCHITECTURE.md:429` | **Yes** | Evaluates Geohash bounding boxes with Haversine distance pruning; p95 read is 320ms. | 🟢 **GREEN** | *"Defined specifications for Geohash-based proximity medical discovery, allowing field teams to query active relief clinics and available bed capacity within 10 km at 320ms p95 read latency."* |
| **"Implemented an AI-powered computer vision engine achieving 95% accuracy in matching missing persons."** | `VARIMITRA_SPEAKER_CONTEXT.md:164` explicitly states: *"No ML model in codebase - FUTURE ROADMAP"* | **No** (Feature not implemented) | N/A (Codebase only contains basic photo upload form to Firebase Storage). | 🔴 **RED** | **DO NOT CLAIM THIS.** Replace with: *"Authored functional specifications and intake workflows for a missing person intake module with photo upload and police verification, defining the future roadmap for ML-based facial matching."* |
| **"Deployed a deep learning neural network to forecast crowd stampedes and surges."** | `VARIMITRA_SPEAKER_CONTEXT.md:160,171` states: *"Mathematical heuristics (Little's Law, NOAA Index), NOT trained ML"* | **No** (Deterministic heuristics only) | Code implements deterministic mathematical formulas, not neural networks. | 🔴 **RED** | **DO NOT CLAIM THIS.** Replace with: *"Designed operational crowd telemetry workflows utilizing mathematical heuristics (Little's Law for queue wait times and NOAA Heat Index) to identify crowd bottlenecks on GIS dashboards."* |
| **"Optimized cloud operational costs to ~$185/month for 1M active users."** | `ARCHITECTURE.md:452-463` | **Yes** (Cost model projection) | Capacity model based on 100M Firestore reads ($60) + 50M writes ($90) + compute/storage ($35.25). | 🟢 **GREEN** | *"Developed a serverless cloud capacity and cost-optimization model projecting monthly infrastructure expenditure of ~$185 per 1M active users on Firebase Blaze pay-as-you-go tiers."* |
| **"Managed a team of 15 developers and delivered the project on an enterprise Oracle DB."** | Entire repo is built on Firebase / NoSQL and originated in an agile hackathon team. | **No** | Contradicts architecture evidence in `README.md` and `firestore.rules`. | 🔴 **RED** | **DO NOT CLAIM THIS.** Replace with: *"Collaborated in a cross-functional agile squad (Team Chaos) reverse-engineering requirements and validating technical architecture across Flutter, Next.js, and Cloud Firestore."* |

---

## 3. Resume Bullet Point Optimization Guide

### Weak / Vulnerable Bullet Point:
> ❌ *"Built an AI app for Wari pilgrimage that reduced response times by 50% and tracked 1 million users on blockchain."*  
> **Interviewer Trap:** The interviewer will ask: *"Which AI model did you train? What were the training datasets? How did you pay for gas fees on 1 million transactions?"* When you can't answer, your credibility collapses.

### Strong / Bullet-Proof Bullet Point:
> 🟢 *"Reverse-engineered business requirements and technical specifications for **WariMitra**, a GovTech mass-gathering platform engineered on Firebase (asia-south1) and Next.js 15, delivering sub-2s emergency SOS ingestion with Geohash-based medical camp radar, 7-role RBAC, and an innovative zero-gas-cost Web3 cryptographic audit ledger."*  
> **Interviewer Response:** The interviewer will be impressed by your precise understanding of latency benchmarks, geospatial queries, security rules, and architectural trade-offs.
