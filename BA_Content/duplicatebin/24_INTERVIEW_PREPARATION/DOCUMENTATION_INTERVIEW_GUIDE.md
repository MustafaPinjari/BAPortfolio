# 📄 Phase 30: BRD vs FRD vs PRD vs SRS — Documentation Interview Training Guide

> **Document Code:** DOC-TRN-001  
> **Project:** Duplicate Bin Ecosystem  
> **Purpose:** Master the Differences, Audiences & Life Cycles of Core BA Documentation  

---

## 1. Comparative Documentation Taxonomy

```
HIGHER LEVEL (Strategic / Business-Focused)
▲  [BRD] Business Requirements Document ────── Focus: Business Problem, ROI, Scope, Executive Sign-Off
│  [PRD] Product Requirements Document  ────── Focus: Product Vision, Personas, Roadmap, MoSCoW Backlog
│  [FRD] Functional Requirements Document ──── Focus: System Behavior, Logic, Flows, Gherkin Criteria
│  [SRS] Software Requirements Specification ─ Focus: Detailed Technical Constraints, Schemas, Interfaces
▼  [RTM] Requirement Traceability Matrix ──── Focus: End-to-End Lifecycle Verification
LOWER LEVEL (Technical / Implementation-Focused)
```

---

## 2. Exhaustive Document Deep-Dives

### 2.1 BRD (Business Requirements Document)
- **Purpose:** Articulates the high-level business problem, financial justification, project scope, and organizational goals. Answers the question: *"Why are we building this, and what is the return on investment?"*
- **Audience:** Executive Sponsors, Business Owners, Product Directors, Financial Stakeholders.
- **When Created:** Project Initiation / Inception Phase (Pre-Sprint).
- **Who Contributes:** Lead Business Analyst, Executive Sponsor, Product Owner, Lead Architect.
- **Key Contents:** Executive Summary, Business Problem Statement, In-Scope / Out-of-Scope, Business Objectives (KPIs), High-Level Business Rules, Governance Matrix.
- **Duplicate Bin Project Example:** [06_BRD/BRD.md](file:///c:/Users/mustafa/Desktop/duplicate-bin/BA_INTERVIEW_PREPARATION/06_BRD/BRD.md) defining the goal of reducing unmanaged storage sprawl by 15-30% and justifying hybrid SaaS monetization.
- **Common Interview Question:** *"What happens if a developer asks to read the BRD to write code?"*
- **Strong Interview Answer:** *"I explain that while the BRD gives developers valuable business context and the 'Why' behind the system, it lacks the detailed input/output definitions and exception handling required for implementation. I direct them to the FRD or Agile User Stories, which break business requirements down into precise functional flows and acceptance criteria."*

---

### 2.2 FRD (Functional Requirements Document)
- **Purpose:** Specifies the exact functional behaviors, algorithmic steps, data transformations, and system interactions required to fulfill the business requirements. Answers: *"What must the software do?"*
- **Audience:** Software Engineers, Tech Leads, QA Automation Engineers, Solutions Architects.
- **When Created:** Discovery & Elaboration Phase (prior to sprint backlog grooming).
- **Who Contributes:** Technical Business Analyst, Solution Architect, Technical Leads.
- **Key Contents:** Feature Modules, Preconditions, Trigger, Main Success Flow, Alternative Flows, Exception Conditions, Input/Output Schemas, Gherkin Acceptance Criteria.
- **Duplicate Bin Project Example:** [07_FRD/FRD.md](file:///c:/Users/mustafa/Desktop/duplicate-bin/BA_INTERVIEW_PREPARATION/07_FRD/FRD.md) specifying the step-by-step logic for two-pass size pre-filtering and Union-Find duplicate clustering.
- **Common Interview Question:** *"How is an FRD different from an Agile User Story?"*
- **Strong Interview Answer:** *"An FRD is a structured, comprehensive specification document detailing system modules, data contracts, and all alternative/exception branches. A User Story is an iterative, lightweight Agile planning artifact capturing user value. In our team, user stories represent incremental vertical slices of functionality derived directly from the FRD."*

---

### 2.3 PRD (Product Requirements Document)
- **Purpose:** Guides the holistic product lifecycle from market strategy through release, focusing on user personas, user journeys, market differentiators, and feature prioritization. Answers: *"What is the product vision and release strategy?"*
- **Audience:** Product Managers, UI/UX Designers, Marketing, Engineering Leads.
- **When Created:** Product Discovery & Roadmapping Phase.
- **Who Contributes:** Product Manager / Product Analyst, UX Lead, Technical BA.
- **Key Contents:** Product Vision, User Personas ('Elena the Photographer'), User Pain Points, Product Goals vs. Non-Goals, MoSCoW Prioritization, Success Metrics, Go-to-Market Strategy.
- **Duplicate Bin Project Example:** [08_PRD/PRD.md](file:///c:/Users/mustafa/Desktop/duplicate-bin/BA_INTERVIEW_PREPARATION/08_PRD/PRD.md) establishing why Safe Archiving is a 'Must Have' while direct cloud API crawling is deferred to 'Won't Have'.
- **Common Interview Question:** *"Who owns the PRD versus the BRD in an organization?"*
- **Strong Interview Answer:** *"In modern software organizations, the Business Analyst typically authors and owns the BRD (focusing on business problem definition and operational impact), while the Product Manager or Product Owner owns the PRD (focusing on market viability, user personas, and release prioritization). However, in high-performing teams, the Senior Technical BA frequently co-authors or leads both."*

---

### 2.4 SRS (Software Requirements Specification)
- **Purpose:** Bridges functional specifications with low-level technical architecture and physical hardware constraints.
- **Audience:** Systems Engineers, Infrastructure Leads, Security Architects, Developers.
- **When Created:** Technical Design & Architecture Spikes.
- **Who Contributes:** Solution Architect, Lead Software Engineer, Technical BA.
- **Key Contents:** System Architecture Diagram, Database Schemas, API Endpoint Signatures, Hardware Requirements, Non-Functional Constraints (NFRs: Memory Bounding, Latency, Concurrency).
- **Duplicate Bin Project Example:** [docs/TECHNICAL_ARCHITECTURE.md](file:///c:/Users/mustafa/Desktop/duplicate-bin/docs/TECHNICAL_ARCHITECTURE.md) documenting SQLite WAL mode, streaming hash buffer sizes (4KB-1MB), and JSON checkpointing.
- **Common Interview Question:** *"What is the difference between an FRD and an SRS?"*
- **Strong Interview Answer:** *"The FRD focuses on functional behavior from a user and business logic perspective (e.g., how files are selected and archived), whereas the SRS specifies the underlying technical implementation constraints—such as Python threading pools, SQLite database pragmas, and POSIX path traversal safeguards."*

---

### 2.5 User Stories & Acceptance Criteria (Agile Deliverables)
- **Purpose:** Breaks down system requirements into vertical, testable units of business value deliverable within a 2-week sprint cycle.
- **Audience:** Scrum Team (Developers, Testers, Scrum Master, Product Owner).
- **When Created:** Backlog Grooming & Sprint Planning.
- **Who Contributes:** Product Owner, Business Analyst, Scrum Team.
- **Format:** `As a [Role], I want [Feature], So that [Benefit]` accompanied by Gherkin `Given-When-Then` criteria.
- **Duplicate Bin Project Example:** [09_USER_STORIES/USER_STORIES.md](file:///c:/Users/mustafa/Desktop/duplicate-bin/BA_INTERVIEW_PREPARATION/09_USER_STORIES/USER_STORIES.md) defining US-005 for safe quarantine archiving with Gherkin acceptance criteria.

---

### 2.6 RTM (Requirements Traceability Matrix)
- **Purpose:** Guarantees 100% bidirectional traceability from business objective down to code and test execution, ensuring zero scope creep and zero missed requirements.
- **Audience:** QA Leads, Project Managers, Auditors, Executive Stakeholders.
- **When Created:** Created during requirements baseline; maintained continuously through UAT and release.
- **Who Contributes:** Lead Business Analyst, QA Lead.
- **Key Contents:** Requirement ID, Business Objective, User Story, Functional Component, Unit Test, UAT Test Case, Sign-Off Status.
- **Duplicate Bin Project Example:** [18_RTM/RTM.md](file:///c:/Users/mustafa/Desktop/duplicate-bin/BA_INTERVIEW_PREPARATION/18_RTM/RTM.md) tracking 24 formal requirements through unit testing and user acceptance sign-off.
