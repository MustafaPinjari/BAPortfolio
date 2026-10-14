# 🎙️ Stakeholder Discovery & Elicitation Interview Guide

> **Document Code:** SIQ-001  
> **Project:** Duplicate Bin Ecosystem  
> **Document Purpose:** Elicitation Questionnaires for Cross-Functional Stakeholder Discovery  
> **Prepared By:** Senior Technical Business Analyst  

---

## 1. Discovery Guide: Content Creator / Prosumer (Elena)

### Primary Focus: Usability, Media Ingestion, Accidental Deletion Anxiety, Performance

1. **Current Workflow & Frustrations:**
   - *"When you finish a photoshoot or video project, how do you transfer and organize files from your camera memory cards to your computer and backup drives?"*
   - *"How often do you encounter 'Disk Full' notifications, and what is your immediate manual reaction?"*
2. **Visual Inspection & Confidence:**
   - *"What visual cues or file information (e.g., thumbnail preview, EXIF camera details, date taken, resolution) do you need to see before you feel 100% confident marking a duplicate for deletion?"*
   - *"If two photos look identical to your eye but one is 24 MB (RAW) and the other is 4 MB (JPEG export), what should the system automatically recommend keeping?"*
3. **Safety & Recovery:**
   - *"If a cleanup tool makes a mistake and archives a file you still needed, what is your tolerance for recovery? Is an instant single-click undo within the application sufficient?"*
4. **Interaction Preferences:**
   - *"Do you prefer dragging entire folders directly into the software window, or navigating through operating system folder trees?"*

---

## 2. Discovery Guide: Corporate IT Administrator (Marcus)

### Primary Focus: Automation, Resource Consumption, Security, Centralized Deployment

1. **Infrastructure & Network Constraints:**
   - *"What is the file storage topology across your office (e.g., local NVMe SSDs, Synology/QNAP NAS, mapped SMB network shares)?"*
   - *"How do you currently monitor disk utilization across your fleet of 50+ employee workstations?"*
2. **Headless Execution & CLI Requirements:**
   - *"When running background maintenance scripts across workstations, what command-line parameters and return exit codes are mandatory for your CI/CD or cron scripts?"*
   - *"What are your operational constraints regarding CPU and RAM consumption while an employee is actively working during a scan?"*
3. **Permissions & Security Guardrails:**
   - *"How should the application handle OS-protected folders (e.g., `C:\Windows`, `/System`, `/etc`) or permission-denied exceptions when scanning shared corporate directories?"*
   - *"Do corporate security policies permit desktop utilities to communicate telemetry outward to a central cloud server?"*

---

## 3. Discovery Guide: Business Owner / Agency Director (Sophia)

### Primary Focus: Cost Reduction, ROI Transparency, Commercial Model, Storage Governance

1. **Storage Economics & Cloud Spend:**
   - *"How much is the agency currently spending annually on commercial cloud storage tiers (Google Workspace, Dropbox Business, Microsoft OneDrive)?"*
   - *"What percentage of disk space recovery would justify the adoption of an enterprise-wide deduplication platform?"*
2. **SaaS Pricing & Credit Structure:**
   - *"Would you prefer a flat recurring monthly subscription per workstation ($29/month for up to 5 devices) or a pay-as-you-go credit model based strictly on gigabytes of storage cleaned ($4.99 per 100 GB)?"*
   - *"What executive dashboard metrics do you need to see to justify your software investment to your board or finance team?"*
3. **Compliance & Centralized Oversight:**
   - *"Do you require a centralized management portal where you can view storage savings across all project teams without exposing the private contents of their local client files?"*

---

## 4. Discovery Guide: Security & Compliance Auditor (David)

### Primary Focus: Data Privacy, Zero-Trust Architecture, Local Processing, Auditability

1. **Data Exfiltration & Privacy Verification:**
   - *"Our architecture performs cryptographic hashing entirely on the local client machine, transmitting only metadata and aggregate byte counts to the cloud. Does this satisfy your zero-trust data protection policies?"*
   - *"Are there strict regulatory frameworks (e.g., GDPR, SOC 2, HIPAA) that prevent file path names from being included in central telemetry reports?"*
2. **Path Traversal & System Hardening:**
   - *"How must the archive quarantine system safeguard against symlink attacks and path traversal vulnerabilities (e.g., `../../etc/passwd`)?"*
   - *"What are your requirements for persistent audit logging of file movement, quarantine, and deletion operations?"*

---

## 5. Discovery Guide: Product Owner (PO)

### Primary Focus: Feature Prioritization, Release Boundaries, Free vs. Paid Funnel

1. **Product Scope & MVP Definition:**
   - *"What is the minimum viable feature set (MVP) required to transition Duplicate Bin from an open-source desktop utility into a commercial hybrid SaaS product?"*
   - *"Where do we draw the strict boundary between features available in the free desktop edition versus capabilities locked behind the SaaS subscription?"*
2. **Roadmap & Trade-offs:**
   - *"Given engineering constraints, should we prioritize cloud connectors (scanning Google Drive without downloading files) or advanced perceptual image hashing (pHash) for photo studios first?"*
   - *"How should the system behave when a user exceeds their free 10 GB deduplication credit allowance mid-scan?"*

---

## 6. Discovery Guide: Lead Software Architect (SH-06)

### Primary Focus: Algorithmic Efficiency, Concurrency, State Management, Database Scaling

1. **Algorithmic Selection & Performance:**
   - *"Why did we choose a two-pass size pre-filter coupled with Union-Find disjoint sets rather than a simple hash map key collision approach?"*
   - *"How does the SQLite persistent cache handle concurrent read/write operations during multi-threaded scans without locking errors?"*
2. **Decoupling & State Synchronization:**
   - *"How are worker thread signals decoupled from the PySide6 Qt main GUI loop to ensure the UI remains 60fps responsive during heavy I/O scanning?"*
   - *"What is the fallback mechanism if the WebSocket connection drops during an active remote scan trigger?"*
