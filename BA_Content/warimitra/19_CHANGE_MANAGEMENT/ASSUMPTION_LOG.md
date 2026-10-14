# Project Assumption Log — WariMitra

> **Document Identifier:** WM-ASM-019  
> **Classification:** Project Governance & Risk Premise Register  
> **Standard:** BABOK v3 Section 6.3 (Assess Risks) & PMBOK v7  

---

## 1. Assumption Log Table

| Assumption ID | Category | Assumption Statement | Rationale & Evidence | Risk / Impact if Invalid | Validation Mechanism | Current Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **ASM-001** | Technical / Hardware | Pilgrims or accompanying dindi group members carry at least one GPS-enabled Android smartphone. | Low-cost 4G smartphones (Redmi, Samsung Galaxy A-series) have widespread penetration across rural Maharashtra. | Devotees without devices must rely on ground volunteers or bystanders to trigger SOS. | Field observation at Alandi assemble point. | 🟢 **Validated** |
| **ASM-002** | Telecommunications | Cellular network operators (Jio, Airtel) deploy Mobile Cell on Wheels (COWs) along major camp stops. | Standard protocol deployed annually by Maharashtra telecom circle during the Pandharpur Wari. | Extreme network drops; offline caching must queue requests until reconnection. | Coordination meeting with Department of Telecommunications (DoT). | 🟢 **Validated** |
| **ASM-003** | Financial / Legal | State disaster management guidelines permit the usage of public blockchain testnets for non-financial audit logs. | Zero-ETH self-transactions on Sepolia incur no monetary gas fees and do not violate state public finance regulations. | If prohibited, system must fall back entirely to local Firestore proof logging. | Legal review with District Magistrate legal counsel. | 🟢 **Validated** |
| **ASM-004** | Operational | Medical officers and paramedics are willing to enter live bed availability counts on mobile/tablet screens. | Rural doctors are accustomed to paper notebooks; interface must require no more than 2 taps to update. | Outdated bed counts; users routed to full camps. | Usability testing with 10 medical officers in Saswad clinic. | 🟡 **Partially Validated** |
| **ASM-005** | Demographic | Marathi localization is sufficient for 90%+ of primary pilgrim users. | Pandharpur Wari is primarily rooted in Maharashtra cultural geography. | Deviations for pilgrims arriving from Karnataka and Goa (Kannada/Konkani). | Adding multi-lingual English and Hindi toggles. | 🟢 **Validated** |
