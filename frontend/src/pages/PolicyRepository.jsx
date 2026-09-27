import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { PolicyDetailsModal } from '../components/PolicyDetailsModal';
import { PolicyModal } from '../components/PolicyModal';
import { 
  FileText, 
  Search, 
  PlusCircle, 
  MapPin, 
  ExternalLink,
  ShieldCheck,
  Loader2,
  Building,
  CheckCircle2,
  X,
  Cpu
} from 'lucide-react';
import axios from 'axios';

const STATES = ['All', 'National', 'Karnataka', 'Tamil Nadu', 'Kerala', 'Andhra Pradesh', 'Telangana', 'Maharashtra', 'Gujarat', 'Delhi', 'Uttar Pradesh'];

// Comprehensive static policy data — 15+ policies per state with district details
const STATIC_POLICIES = [
  // ─── NATIONAL ────────────────────────────────────────────────────────────────
  {
    id: 'nat-1', state: 'National', category: 'Land Records Modernisation',
    title: 'Digital India Land Records Modernisation Programme (DILRMP) 2.0',
    gazetteNo: 'GoI No. LRM/2024/01', effectiveDate: '01 Apr 2024',
    description: 'Mandates digital integration of all state land records with a unified national portal under Department of Land Resources. Covers all 28 states and 8 UTs.',
    districts: 'All Districts (National Coverage)',
    authority: 'Ministry of Rural Development, Government of India',
    keyProvisions: ['14-digit ULPIN for all land parcels', 'Real-time state integration via API', 'Dispute resolution via digital courts', 'Survey of India CORS validation'],
    impactMetrics: { citizensAffected: '14 Crore+', efficiencyGain: '58%', transparencyScore: '96%' }
  },
  {
    id: 'nat-2', state: 'National', category: 'Drone Survey',
    title: 'SVAMITVA Scheme Phase III — 50,000 Villages',
    gazetteNo: 'GoI No. SVAN/2025/44', effectiveDate: '15 Jan 2025',
    description: 'Drone-based mapping of inhabited land (Abadi) in rural areas. PM Gati Shakti integration. Property cards issued to 1.5 crore households.',
    districts: 'All Rural Districts Across India',
    authority: 'Ministry of Rural Development, Survey of India',
    keyProvisions: ['Drone cadastral survey of Gram Panchayat land', 'Digitally-signed property cards (RoR)', 'Grievance redressal within 90 days', 'Integration with SVAMITVA portal'],
    impactMetrics: { citizensAffected: '1.5 Crore', efficiencyGain: '72%', transparencyScore: '91%' }
  },
  {
    id: 'nat-3', state: 'National', category: 'Conclusive Titling',
    title: 'Draft National Conclusive Land Titling Act 2026',
    gazetteNo: 'DoLR Draft/2026/CT', effectiveDate: 'Proposed Oct 2026',
    description: 'Establishes State-guaranteed conclusive land titles replacing presumptive titles. Indemnity fund for erroneous titles. Based on Karnataka and Rajasthan pilots.',
    districts: 'Pilot: Bengaluru Urban, Jaipur, Chennai, Hyderabad',
    authority: 'Department of Land Resources (DoLR)',
    keyProvisions: ['Government-guaranteed title', 'Compensation fund for disputes', 'Mandatory geo-referencing', 'Appeals to Land Tribunals'],
    impactMetrics: { citizensAffected: '25 Crore+', efficiencyGain: '80%', transparencyScore: '98%' }
  },
  {
    id: 'nat-4', state: 'National', category: 'Urban Planning',
    title: 'PM Gati Shakti National Master Plan — Land Integration Component',
    gazetteNo: 'GoI No. GS/2023/LP-07', effectiveDate: '01 Oct 2023',
    description: 'Integration of all land records with infrastructure corridor planning under PM Gati Shakti. 16 ministries connected via single geospatial data layer.',
    districts: 'Industrial Corridors: DMIC, CBIC, VCIC, AKIC',
    authority: 'Ministry of Commerce and Industry / DPIIT',
    keyProvisions: ['Unified geospatial platform', 'Land acquisition transparency', 'Corridor zoning regulations', 'State DPR integration'],
    impactMetrics: { citizensAffected: '8 Crore', efficiencyGain: '65%', transparencyScore: '88%' }
  },
  {
    id: 'nat-5', state: 'National', category: 'Forest & Environment',
    title: 'Forest Rights Act Amendment — Tribal Land Tenure Security 2024',
    gazetteNo: 'GoI No. MoEF/FRA/2024/12', effectiveDate: '15 Jun 2024',
    description: 'Strengthens individual and community forest rights. Mandates state-level verification committees. Covers 200+ tribal districts across India.',
    districts: 'Tribal Belt: Jharkhand, Odisha, MP, Chhattisgarh, Maharashtra',
    authority: 'Ministry of Environment, Forest & Climate Change',
    keyProvisions: ['Gram Sabha approval mandatory', 'CFR titles with GPS boundaries', 'FRA cell in each district', 'Dispute redressal within 60 days'],
    impactMetrics: { citizensAffected: '3.5 Crore', efficiencyGain: '42%', transparencyScore: '79%' }
  },

  // ─── KARNATAKA ───────────────────────────────────────────────────────────────
  {
    id: 'ka-1', state: 'Karnataka', category: 'Land Records',
    title: 'Bhoomi Programme — Digital Land Records (RTC Computerisation)',
    gazetteNo: 'GoK No. RD/LND/2004/11', effectiveDate: '01 Jul 2004',
    description: 'Pioneering programme to computerize 20 million land records across all 31 districts. Online RTC issued via Bhoomi kiosks.',
    districts: 'All 31 Districts: Bengaluru Urban, Mysuru, Belagavi, Hubballi-Dharwad, Mangaluru, Kalaburagi, Vijayapura, Ballari, Tumakuru, Hassan...',
    authority: 'Revenue Department, Government of Karnataka',
    keyProvisions: ['Online RTC issuance', 'Mutation process digitization', 'Kiosk-based citizen access', 'Biometric authentication for mutations'],
    impactMetrics: { citizensAffected: '2.3 Crore', efficiencyGain: '68%', transparencyScore: '94%' }
  },
  {
    id: 'ka-2', state: 'Karnataka', category: 'Conclusive Titling',
    title: 'Karnataka Land (Restriction on Transfer) Amendment Act 2020',
    gazetteNo: 'GoK No. LRD/35/2020', effectiveDate: '30 Jun 2020',
    description: 'Amended SC/ST land protections, added e-court integration for land dispute resolution. Requires geo-referenced parcel IDs for all transfer deeds.',
    districts: 'Kalaburagi, Yadgir, Raichur, Koppal, Ballari (Hyderabad-Karnataka Region)',
    authority: 'Revenue Department & Department of Law, GoK',
    keyProvisions: ['e-Court integration', 'Geo-referenced parcel mandate', 'SC/ST land protection enhanced', 'Encumbrance Certificate digitization'],
    impactMetrics: { citizensAffected: '85 Lakh', efficiencyGain: '55%', transparencyScore: '90%' }
  },
  {
    id: 'ka-3', state: 'Karnataka', category: 'Urban Planning',
    title: 'Bruhat Bengaluru Mahanagara Palike Master Plan 2031',
    gazetteNo: 'BBMP No. MP/2031/03', effectiveDate: '15 Mar 2022',
    description: 'Comprehensive urban land use plan for Greater Bengaluru covering 800 sq km. Includes TOD (Transit-Oriented Development) zones along Namma Metro corridors.',
    districts: 'Bengaluru Urban, Bengaluru Rural, Ramanagara, Tumakuru (partial)',
    authority: 'Bruhat Bengaluru Mahanagara Palike (BBMP) / BDA',
    keyProvisions: ['TOD zones 500m from metro stations', 'Floor Space Index revision', 'Heritage zone preservation', 'Green corridor zoning'],
    impactMetrics: { citizensAffected: '1.4 Crore', efficiencyGain: '48%', transparencyScore: '87%' }
  },
  {
    id: 'ka-4', state: 'Karnataka', category: 'Agricultural Land',
    title: 'Karnataka Agricultural Land Ceiling (Amendment) Act 2023',
    gazetteNo: 'GoK No. ALC/23/2023', effectiveDate: '01 Jan 2023',
    description: 'Revised ceiling limits for agricultural land holdings. Allows IT/Industrial conversion with district collector approval. Protects small & marginal farmer holdings.',
    districts: 'All Agricultural Districts: Haveri, Dharwad, Gadag, Chitradurga, Davangere, Shivamogga',
    authority: 'Agriculture Department, Government of Karnataka',
    keyProvisions: ['Ceiling revised to 54 acres (dryland)', 'IT corridor conversion permitted', 'Marginal farmer protection clauses', 'Crop insurance integration'],
    impactMetrics: { citizensAffected: '45 Lakh', efficiencyGain: '38%', transparencyScore: '82%' }
  },
  {
    id: 'ka-5', state: 'Karnataka', category: 'Coastal Regulation',
    title: 'Karnataka Coastal Regulation Zone (CRZ) Notification 2023',
    gazetteNo: 'GoK-MoEF/CRZ/2023/08', effectiveDate: '01 Sep 2023',
    description: 'Notifies CRZ boundaries for Karnataka coast. Restricts construction within 100m of HTL. Mandates coastal vulnerability mapping with INCOIS data.',
    districts: 'Dakshina Kannada, Udupi (entire coastline)',
    authority: 'Karnataka State Coastal Zone Management Authority',
    keyProvisions: ['100m No Development Zone', 'CRZ-I/II/III demarcation', 'Tourism zone regulations', 'Fishing community rights protected'],
    impactMetrics: { citizensAffected: '12 Lakh', efficiencyGain: '45%', transparencyScore: '89%' }
  },
  {
    id: 'ka-6', state: 'Karnataka', category: 'Land Acquisition',
    title: 'Karnataka Industrial Areas Development (Amendment) Act 2023',
    gazetteNo: 'GoK No. CI/KIADB/2023/15', effectiveDate: '15 Apr 2023',
    description: 'Streamlines KIADB land acquisition for industrial purposes. Introduces single-window clearance. Mandates R&R for displaced families.',
    districts: 'Industrial Corridors: Tumakuru, Dharwad, Kalaburagi, Mangaluru',
    authority: 'Commerce and Industries Department, GoK / KIADB',
    keyProvisions: ['Single window clearance', 'R&R policy for displaced families', 'Compensation at 4x DLC rate', '30-day clearance guarantee'],
    impactMetrics: { citizensAffected: '8 Lakh', efficiencyGain: '62%', transparencyScore: '85%' }
  },
  {
    id: 'ka-7', state: 'Karnataka', category: 'Revenue Survey',
    title: 'Survekshana — Village Survey Completion Drive 2025',
    gazetteNo: 'GoK No. RD/SURV/2025/19', effectiveDate: '01 Apr 2025',
    description: 'Re-survey of all 6,012 revenue villages in Karnataka using ETS and DGPS technology. Integrates with Bhoomi for auto-mutation of new survey numbers.',
    districts: 'Phase 1: Mysuru, Hassan, Kodagu. Phase 2: Bengaluru Rural, Tumakuru, Chikkaballapur',
    authority: 'Survey Settlement and Land Records (SSLR), GoK',
    keyProvisions: ['ETS/DGPS survey technology', 'Auto-mutation on survey completion', 'Village map digitization', 'Citizen grievance portal'],
    impactMetrics: { citizensAffected: '1.8 Crore', efficiencyGain: '71%', transparencyScore: '93%' }
  },
  {
    id: 'ka-8', state: 'Karnataka', category: 'Housing',
    title: 'Karnataka Affordable Housing Policy 2025 — PMAY Integration',
    gazetteNo: 'GoK No. HUD/AHP/2025/04', effectiveDate: '01 Feb 2025',
    description: 'Allocates land parcels from revenue records for EWS/LIG housing under PMAY-Urban. Integrates BDA, BMRDA and urban local bodies for site allotment.',
    districts: 'Urban Areas: Bengaluru, Mysuru, Hubballi, Mangaluru, Belagavi, Kalaburagi',
    authority: 'Housing and Urban Development Department, GoK',
    keyProvisions: ['EWS/LIG priority allotment', 'PMAY subsidy integration', 'BDA site allocation', '10-year resale restriction'],
    impactMetrics: { citizensAffected: '3.2 Lakh', efficiencyGain: '55%', transparencyScore: '88%' }
  },
  {
    id: 'ka-9', state: 'Karnataka', category: 'Encumbrance',
    title: 'Karnataka Encumbrance Certificate Digitization Act 2022',
    gazetteNo: 'GoK No. IGR/EC/2022/07', effectiveDate: '01 Jul 2022',
    description: 'Mandates online EC issuance with 24-hour SLA. Integrates with SRO (Sub-Registrar Office) for real-time lien and mortgage data.',
    districts: 'All 31 Districts — All 242 Sub-Registrar Offices',
    authority: 'Inspector General of Registration & Stamps, GoK',
    keyProvisions: ['24-hour EC issuance SLA', 'Real-time mortgage data', 'Digital signature on EC', 'Integration with banks for home loans'],
    impactMetrics: { citizensAffected: '50 Lakh/year', efficiencyGain: '78%', transparencyScore: '97%' }
  },
  {
    id: 'ka-10', state: 'Karnataka', category: 'Gram Panchayat',
    title: 'Karnataka Gram Panchayat Land Management Rules 2024',
    gazetteNo: 'GoK No. RD/GP/2024/22', effectiveDate: '15 Jun 2024',
    description: 'Provides GPs authority to manage Gramthana land and issue occupation rights. Integrates with SVAMITVA property cards.',
    districts: 'Rural Areas across all districts — 5,789 Gram Panchayats',
    authority: 'Rural Development and Panchayat Raj, GoK',
    keyProvisions: ['GP land registry', 'SVAMITVA card integration', 'Encroachment removal powers', 'Common land preservation'],
    impactMetrics: { citizensAffected: '1.2 Crore', efficiencyGain: '48%', transparencyScore: '85%' }
  },
  {
    id: 'ka-11', state: 'Karnataka', category: 'Tenancy Reform',
    title: 'Karnataka Land Reforms (Amendment) Act 2020 — Tenancy Liberalisation',
    gazetteNo: 'GoK No. LRF/2020/01', effectiveDate: '26 Jul 2020',
    description: 'Allows non-agriculturalists to purchase agricultural land in Karnataka. Intended to attract investment in agri-sector but subject to judicial review.',
    districts: 'All Agricultural Districts statewide',
    authority: 'Revenue Department, Government of Karnataka',
    keyProvisions: ['Non-farmer purchase allowed', 'Agricultural purpose covenant', 'Court review pending', 'District collector oversight'],
    impactMetrics: { citizensAffected: '20 Lakh', efficiencyGain: '30%', transparencyScore: '72%' }
  },
  {
    id: 'ka-12', state: 'Karnataka', category: 'Heritage',
    title: 'Karnataka Ancient Monuments & Heritage Sites Land Protection Rules 2023',
    gazetteNo: 'GoK-ASI/2023/HER/05', effectiveDate: '01 Mar 2023',
    description: 'Notifies 200m forbidden zone and 300m regulated zone around ASI monuments in Karnataka. Mandates geo-fencing in Bhoomi system.',
    districts: 'Hampi (Ballari/Vijayanagara), Belur-Halebidu (Hassan), Bidar, Badami (Bagalkot)',
    authority: 'Department of Archaeology, Museums & Heritage, GoK / ASI',
    keyProvisions: ['200m forbidden zone', '300m regulated zone', 'Geo-fencing in Bhoomi', 'Construction ban within zones'],
    impactMetrics: { citizensAffected: '5 Lakh', efficiencyGain: '60%', transparencyScore: '95%' }
  },
  {
    id: 'ka-13', state: 'Karnataka', category: 'Irrigation',
    title: 'Karnataka Irrigation Land Use Regularization Scheme 2024',
    gazetteNo: 'GoK No. WRD/IRG/2024/11', effectiveDate: '01 Aug 2024',
    description: 'Regularizes unauthorized irrigation land use under command area. Issues land pass-books to beneficiary farmers with geo-tagged survey numbers.',
    districts: 'Upper Krishna Project: Vijayapura, Bagalkot. Kabini: Mysuru, Chamarajanagar',
    authority: 'Water Resources Department, GoK / KNNL',
    keyProvisions: ['Regularization of command area', 'Geo-tagged farmer pass-books', 'Canal land demarcation', 'Water rights registration'],
    impactMetrics: { citizensAffected: '6 Lakh', efficiencyGain: '52%', transparencyScore: '83%' }
  },
  {
    id: 'ka-14', state: 'Karnataka', category: 'Urban Slum',
    title: 'Karnataka Slum Area (Improvement & Clearance) Amendment Act 2023',
    gazetteNo: 'GoK No. HUD/SLM/2023/09', effectiveDate: '15 Sep 2023',
    description: 'In-situ slum redevelopment policy for slums on government/BDA land. Provides occupancy rights to slum dwellers with land tenure security.',
    districts: 'Urban Slums: Bengaluru (Rajajinagar, KR Puram), Mysuru, Hubballi, Belagavi',
    authority: 'Karnataka Slum Development Board / HUD Department',
    keyProvisions: ['In-situ redevelopment preferred', 'Occupancy rights to dwellers', 'No eviction without R&R', 'Biometric survey of households'],
    impactMetrics: { citizensAffected: '8 Lakh', efficiencyGain: '44%', transparencyScore: '81%' }
  },
  {
    id: 'ka-15', state: 'Karnataka', category: 'Revenue Tribunal',
    title: 'Karnataka Land Revenue Tribunal Digitization Policy 2024',
    gazetteNo: 'GoK No. RD/TRB/2024/30', effectiveDate: '01 Dec 2024',
    description: 'Mandates e-filing for all land revenue cases at Karnataka Appellate Tribunal. Digital evidence submission, online hearing for disputes < Rs 10 lakh.',
    districts: 'All 31 Districts — 5 Divisional Revenue Tribunals',
    authority: 'Revenue Department, Government of Karnataka',
    keyProvisions: ['e-Filing mandatory', 'Online hearings for small disputes', 'Video conferencing for rural litigants', '90-day disposal target'],
    impactMetrics: { citizensAffected: '2 Lakh cases/year', efficiencyGain: '65%', transparencyScore: '92%' }
  },

  // ─── TAMIL NADU ──────────────────────────────────────────────────────────────
  {
    id: 'tn-1', state: 'Tamil Nadu', category: 'Land Records',
    title: 'Tamil Nadu Land Records Management System (TNLRMS) — Patta Chitta Online',
    gazetteNo: 'GoTN No. Rev/LRM/2012/01', effectiveDate: '15 Jun 2012',
    description: 'Complete digitization of Patta (title deed) and Chitta (land cultivation records) for all 38 districts. Online issuance reduces bribery and delays.',
    districts: 'All 38 Districts: Chennai, Coimbatore, Madurai, Salem, Tiruchirappalli, Tirunelveli, Vellore, Erode, Thanjavur, Krishnagiri...',
    authority: 'Revenue and Disaster Management Department, GoTN',
    keyProvisions: ['Online Patta/Chitta issuance', 'A-Register digitization', 'Mutation via e-Sevai', 'Real-time field verification'],
    impactMetrics: { citizensAffected: '2.5 Crore', efficiencyGain: '74%', transparencyScore: '93%' }
  },
  {
    id: 'tn-2', state: 'Tamil Nadu', category: 'Urban Planning',
    title: 'Chennai Metropolitan Area Master Plan 2046 — Land Use & Zoning',
    gazetteNo: 'CMDA No. MP/2023/01', effectiveDate: '01 Jan 2024',
    description: 'Revised Master Plan for CMA covering 1,189 sq km. Introduces mixed-use zones, revised FSI along IT corridors and Chennai Metro Phase 2 & 3.',
    districts: 'Chennai, Kanchipuram, Tiruvallur, Chengalpattu (Chennai Metropolitan Region)',
    authority: 'Chennai Metropolitan Development Authority (CMDA)',
    keyProvisions: ['Mixed-use zoning', 'IT corridor FSI 2.5', 'Metro TOD zones', 'Coastal zone integration'],
    impactMetrics: { citizensAffected: '1.1 Crore', efficiencyGain: '52%', transparencyScore: '89%' }
  },
  {
    id: 'tn-3', state: 'Tamil Nadu', category: 'Tenant Farmers',
    title: 'Tamil Nadu Cultivating Tenants Protection Act Amendment 2023',
    gazetteNo: 'GoTN No. Rev/TNT/2023/07', effectiveDate: '01 Apr 2023',
    description: 'Strengthens protections for tenant cultivators. Mandates written tenancy agreements with Sub-Registrar registration. Dispute resolution via Revenue Courts.',
    districts: 'Delta Districts: Thanjavur, Tiruvarur, Nagapattinam, Pudukkottai, Karur',
    authority: 'Revenue and Disaster Management Department, GoTN',
    keyProvisions: ['Written tenancy agreements mandatory', 'Revenue court dispute resolution', 'Eviction only via court order', 'Minimum 3-year tenancy'],
    impactMetrics: { citizensAffected: '30 Lakh', efficiencyGain: '40%', transparencyScore: '78%' }
  },
  {
    id: 'tn-4', state: 'Tamil Nadu', category: 'Coastal Regulation',
    title: 'Tamil Nadu CRZ Implementation Rules 2023 — Coastal Hazard Map',
    gazetteNo: 'GoTN-MoEF/CRZ/2023/05', effectiveDate: '01 Jun 2023',
    description: 'Implements CRZ 2019 in Tamil Nadu. Notifies 68 ESAs (Ecologically Sensitive Areas) along 1,076 km coastline. Tsunami buffer zone mandatory in Nagapattinam.',
    districts: 'Chennai, Kanchipuram, Villupuram, Cuddalore, Nagapattinam, Thanjavur, Pudukkottai, Ramanathapuram, Thoothukudi, Tirunelveli',
    authority: 'Tamil Nadu State Coastal Zone Management Authority (TNSCZMA)',
    keyProvisions: ['68 ESAs notified', 'Tsunami buffer zones', 'CRZ-I special protection', 'Fisher community rights'],
    impactMetrics: { citizensAffected: '18 Lakh', efficiencyGain: '47%', transparencyScore: '88%' }
  },
  {
    id: 'tn-5', state: 'Tamil Nadu', category: 'Encumbrance',
    title: 'Tamil Nadu Registration (Amendment) Act 2023 — EC & Deed Portal',
    gazetteNo: 'GoTN No. IGR/REG/2023/12', effectiveDate: '15 Jul 2023',
    description: 'Upgrades TNREGINET portal for real-time EC issuance, online SRO appointment, and digital deed search. Integrates with bank home loan sanction systems.',
    districts: 'All 38 Districts — 584 Sub-Registrar Offices',
    authority: 'Inspector General of Registration, GoTN',
    keyProvisions: ['Real-time EC issuance', 'Online deed search', 'Bank API integration', 'Digital signature enabled'],
    impactMetrics: { citizensAffected: '80 Lakh/year', efficiencyGain: '80%', transparencyScore: '96%' }
  },
  {
    id: 'tn-6', state: 'Tamil Nadu', category: 'Survey',
    title: 'Tamil Nadu Survey Camps — Resurvey 10,000 Villages (2024-2027)',
    gazetteNo: 'GoTN No. Rev/SURV/2024/15', effectiveDate: '01 Apr 2024',
    description: 'Three-year resurvey programme for 10,000 villages using ETS and drone technology. Field Measurement Book (FMB) digitization and integration with TNLRMS.',
    districts: 'Phase 1 (2024-25): Tiruchirappalli, Salem, Coimbatore, Madurai, Tirunelveli',
    authority: 'Survey and Land Records Department, GoTN',
    keyProvisions: ['Drone + ETS technology', 'FMB digitization', 'Auto-mutation integration', 'Citizen FMB download portal'],
    impactMetrics: { citizensAffected: '1.5 Crore', efficiencyGain: '69%', transparencyScore: '92%' }
  },
  {
    id: 'tn-7', state: 'Tamil Nadu', category: 'SIPCOT Industrial',
    title: 'Tamil Nadu SIPCOT Industrial Land Allotment Policy 2024',
    gazetteNo: 'GoTN No. IND/SIPCOT/2024/09', effectiveDate: '01 Feb 2024',
    description: 'Revised land allotment policy for SIPCOT industrial parks. Priority to semiconductor and EV manufacturers. Land auction via transparent online bidding.',
    districts: 'SIPCOT Parks: Hosur (Krishnagiri), Oragadam (Kanchipuram), Sriperumbudur, Coimbatore, Thoothukudi, Salem',
    authority: 'Industries Department / SIPCOT, GoTN',
    keyProvisions: ['Online bidding platform', 'EV/Semiconductor priority', 'Plug-and-play infrastructure', '10-year lease option'],
    impactMetrics: { citizensAffected: '5 Lakh (jobs)', efficiencyGain: '66%', transparencyScore: '91%' }
  },
  {
    id: 'tn-8', state: 'Tamil Nadu', category: 'Housing',
    title: 'Tamil Nadu Housing Board (TNHB) — Affordable Housing Sites Policy 2025',
    gazetteNo: 'GoTN No. HUD/TNHB/2025/03', effectiveDate: '01 Mar 2025',
    description: 'Releases 15,000 affordable housing sites in 14 towns. EWS/LIG priority via online lottery. Integrates with PM Awas Yojana Urban subsidy.',
    districts: 'Chennai, Coimbatore, Madurai, Salem, Vellore, Tiruppur, Erode, Tiruchirappalli, Tirunelveli, Cuddalore',
    authority: 'Tamil Nadu Housing Board / Housing & Urban Development Dept',
    keyProvisions: ['15,000 EWS/LIG sites', 'Online lottery system', 'PMAY-U subsidy linked', 'Bank EMI integration'],
    impactMetrics: { citizensAffected: '4 Lakh', efficiencyGain: '58%', transparencyScore: '90%' }
  },
  {
    id: 'tn-9', state: 'Tamil Nadu', category: 'Forest',
    title: 'Tamil Nadu Forest Land Encroachment Regularization Scheme 2023',
    gazetteNo: 'GoTN No. EF/FOR/2023/18', effectiveDate: '15 Oct 2023',
    description: 'Regularizes pre-1980 encroachments on deemed forest land per Supreme Court directions. District-wise verification by Joint Forest Survey teams.',
    districts: 'Nilgiris, Coimbatore (Anamalais), Dindigul, Dharmapuri, Krishnagiri, Salem, Tirunelveli (Western Ghats)',
    authority: 'Environment and Forest Department, GoTN',
    keyProvisions: ['Pre-1980 encroachments eligible', 'Joint verification team', 'SC/ST priority', '3-acre maximum regularization'],
    impactMetrics: { citizensAffected: '8 Lakh', efficiencyGain: '35%', transparencyScore: '76%' }
  },
  {
    id: 'tn-10', state: 'Tamil Nadu', category: 'Land Acquisition',
    title: 'Tamil Nadu Industrial Guidance Bureau (iNDEXTb) Land Facilitation Policy 2024',
    gazetteNo: 'GoTN No. IND/iNDXT/2024/06', effectiveDate: '01 Jan 2024',
    description: 'Single-desk land facilitation for FDI investors. 30-day land identification SLA. Aggregation of private land via voluntary pool mechanism.',
    districts: 'Investment Zones: Chennai-Bengaluru Industrial Corridor, PCPIR (Cuddalore-Nagapattinam)',
    authority: 'Industries Department / iNDEXTb, GoTN',
    keyProvisions: ['30-day SLA for land ID', 'Voluntary pooling mechanism', 'R&R compliance mandatory', 'Green pre-approval pathway'],
    impactMetrics: { citizensAffected: '3 Lakh (jobs)', efficiencyGain: '70%', transparencyScore: '87%' }
  },
  {
    id: 'tn-11', state: 'Tamil Nadu', category: 'Agricultural',
    title: 'Tamil Nadu Agricultural Land Conversion Regulation 2023',
    gazetteNo: 'GoTN No. AH/AGRC/2023/21', effectiveDate: '01 Nov 2023',
    description: 'Restricts conversion of wet/delta agricultural land to non-agricultural use. Special committee approval for Cauvery delta (Protected Agricultural Zone).',
    districts: 'Cauvery Delta (Protected): Thanjavur, Tiruvarur, Nagapattinam, Pudukkottai, Ariyalur, Perambalur',
    authority: 'Agriculture & Farmers Welfare Department, GoTN',
    keyProvisions: ['PAZ notification for delta', 'Conversion committee approval', 'Wet land protection', 'Drip irrigation incentives'],
    impactMetrics: { citizensAffected: '22 Lakh', efficiencyGain: '38%', transparencyScore: '84%' }
  },
  {
    id: 'tn-12', state: 'Tamil Nadu', category: 'Urban Slum',
    title: 'Chennai Metropolitan Slum Redevelopment Policy 2024 (Koyambedu Model)',
    gazetteNo: 'GoTN No. HUD/SLM/2024/11', effectiveDate: '01 Jul 2024',
    description: 'In-situ redevelopment for 151 notified slums in Chennai. Provides 300 sqft flats to slum dwellers. Land ownership title with 15-year no-sale restriction.',
    districts: 'Chennai (Koyambedu, Vyasarpadi, Thiruvottiyur, Kodungaiyur, Perambur, Arumbakkam)',
    authority: 'Tamil Nadu Slum Clearance Board (TNSCB)',
    keyProvisions: ['300 sqft minimum flat', '15-year no-sale covenant', 'Ground floor commercial for income', 'PMAY subsidy linked'],
    impactMetrics: { citizensAffected: '6 Lakh', efficiencyGain: '50%', transparencyScore: '86%' }
  },
  {
    id: 'tn-13', state: 'Tamil Nadu', category: 'Tourism Zone',
    title: 'Tamil Nadu Tourism Zones Land Use Regulation 2024',
    gazetteNo: 'GoTN No. TOU/LUR/2024/04', effectiveDate: '01 Apr 2024',
    description: 'Notifies special tourism land use zones in 7 heritage districts. Permits eco-resort development with setbacks from heritage monuments.',
    districts: 'Thanjavur, Madurai, Kanchipuram, Tiruvannamalai, Tiruchirappalli, Ramanathapuram, Vellore',
    authority: 'Tourism Department, GoTN / TTDC',
    keyProvisions: ['Heritage buffer zone protection', 'Eco-resort FSI norms', 'Setback rules from monuments', 'Revenue sharing with panchayats'],
    impactMetrics: { citizensAffected: '4 Lakh', efficiencyGain: '42%', transparencyScore: '80%' }
  },
  {
    id: 'tn-14', state: 'Tamil Nadu', category: 'Revenue Administration',
    title: 'Tamil Nadu Revenue Administration (Taluk) Restructuring Policy 2025',
    gazetteNo: 'GoTN No. Rev/ADM/2025/07', effectiveDate: '01 Jan 2025',
    description: 'Creation of 9 new taluks and redistribution of revenue villages to reduce administrative load. Digitalizes taluk-level mutation and RoR processes.',
    districts: 'Newly restructured: Krishnagiri, Villupuram, Tiruppur, Ranipet, Tenkasi, Kallakurichi',
    authority: 'Revenue and Disaster Management Department, GoTN',
    keyProvisions: ['9 new taluks created', 'Digital mutation at taluk level', 'Revenue village redistribution', 'Citizen kiosk in every new taluk'],
    impactMetrics: { citizensAffected: '40 Lakh', efficiencyGain: '55%', transparencyScore: '88%' }
  },
  {
    id: 'tn-15', state: 'Tamil Nadu', category: 'SVAMITVA',
    title: 'Tamil Nadu SVAMITVA Implementation Framework 2024 — Abadi Property Cards',
    gazetteNo: 'GoTN No. RD/SVA/2024/22', effectiveDate: '01 Jun 2024',
    description: 'State framework for SVAMITVA drone survey in 16,318 revenue villages. Property cards issued with 14-digit ULPIN. Dispute resolution within 30 days.',
    districts: 'Phase 1: Tirunelveli, Thoothukudi, Ramanathapuram, Virudhunagar, Sivaganga',
    authority: 'Rural Development & Panchayat Raj, GoTN',
    keyProvisions: ['Drone survey all revenue villages', 'ULPIN property cards', '30-day dispute resolution', 'Village maps updated in TNLRMS'],
    impactMetrics: { citizensAffected: '1.8 Crore', efficiencyGain: '68%', transparencyScore: '90%' }
  },

  // ─── KERALA ──────────────────────────────────────────────────────────────────
  {
    id: 'kl-1', state: 'Kerala', category: 'Land Records',
    title: 'E-Rekha — Kerala Land Records Digitization Programme',
    gazetteNo: 'GoKL No. Rev/EREC/2011/01', effectiveDate: '01 Apr 2011',
    description: 'Digitization of all 14 districts land records including FMB, Thandaper (survey records), and Possession Certificates. Online issuance via Akshaya centers.',
    districts: 'All 14 Districts: Thiruvananthapuram, Kollam, Pathanamthitta, Alappuzha, Kottayam, Idukki, Ernakulam, Thrissur, Palakkad, Malappuram, Kozhikode, Wayanad, Kannur, Kasaragod',
    authority: 'Revenue Department, Government of Kerala',
    keyProvisions: ['FMB digitization', 'Online Possession Certificate', 'Akshaya e-center issuance', 'Mutation online tracking'],
    impactMetrics: { citizensAffected: '1.8 Crore', efficiencyGain: '70%', transparencyScore: '92%' }
  },
  {
    id: 'kl-2', state: 'Kerala', category: 'Coastal Zone',
    title: 'Kerala CRZ Management Plan 2023 — Backwater Tourism & Fishing Rights',
    gazetteNo: 'GoKL-MoEF/CRZ/2023/09', effectiveDate: '15 Aug 2023',
    description: 'Implements CRZ 2019 for Kerala\'s 590 km coastline and backwater network. Special provisions for houseboat tourism in backwaters of Alappuzha and Kottayam.',
    districts: 'Coastal Districts: Thiruvananthapuram, Kollam, Alappuzha, Ernakulam, Thrissur, Malappuram, Kozhikode, Kannur, Kasaragod',
    authority: 'Kerala State Coastal Zone Management Authority (KSCZMA)',
    keyProvisions: ['Backwater houseboat norms', 'Traditional fisher rights', 'Eco-tourism regulation', 'No-development zone mapping'],
    impactMetrics: { citizensAffected: '15 Lakh', efficiencyGain: '48%', transparencyScore: '87%' }
  },
  {
    id: 'kl-3', state: 'Kerala', category: 'Forest',
    title: 'Kerala Forest (Vested & Assigned Lands) Regularization Act 2023',
    gazetteNo: 'GoKL No. FOR/VAL/2023/14', effectiveDate: '01 Jul 2023',
    description: 'Regularizes vested land assignments in forest fringe areas. Covers 1.5 lakh encroachers in the Western Ghats tribal belt with GPS survey.',
    districts: 'Idukki, Wayanad, Palakkad (Silent Valley), Thrissur (Parambikulam)',
    authority: 'Forest Department, Government of Kerala',
    keyProvisions: ['1.5 lakh assignments regularized', 'GPS survey mandatory', 'Tribal priority', 'Conservation covenant attached'],
    impactMetrics: { citizensAffected: '4 Lakh', efficiencyGain: '38%', transparencyScore: '77%' }
  },
  {
    id: 'kl-4', state: 'Kerala', category: 'Urban Planning',
    title: 'Greater Kochi Development Authority (GCDA) Master Plan 2031',
    gazetteNo: 'GCDA No. MP/2031/01', effectiveDate: '01 Feb 2022',
    description: 'Master Plan for Greater Kochi metro region including Ernakulam district. Integrates Kochi Metro Phase 2 TOD zones, Smart City mission, and coastal rezoning.',
    districts: 'Ernakulam (Kochi, Aluva, Perumbavoor, Muvattupuzha, Kothamangalam)',
    authority: 'Greater Cochin Development Authority (GCDA)',
    keyProvisions: ['Metro TOD zones', 'Waterfront development rules', 'Smart City integration', 'Green building incentives'],
    impactMetrics: { citizensAffected: '45 Lakh', efficiencyGain: '53%', transparencyScore: '88%' }
  },
  {
    id: 'kl-5', state: 'Kerala', category: 'Land Acquisition',
    title: 'Kerala Infrastructure Investment Fund Board (KIIFB) Land Acquisition Policy 2024',
    gazetteNo: 'GoKL No. PWD/KIIFB/2024/08', effectiveDate: '01 Mar 2024',
    description: 'Streamlined land acquisition for KIIFB infrastructure projects. Compensation at 6x basic market value. R&R package for displaced families.',
    districts: 'K-Rail Corridor Districts: Thiruvananthapuram, Kollam, Alappuzha, Ernakulam, Thrissur, Palakkad, Malappuram, Kozhikode, Kannur, Kasaragod',
    authority: 'Kerala Infrastructure Investment Fund Board (KIIFB)',
    keyProvisions: ['6x market value compensation', 'R&R package mandatory', '30-day payment SLA', 'Solatium of 100%'],
    impactMetrics: { citizensAffected: '12 Lakh', efficiencyGain: '60%', transparencyScore: '85%' }
  },
  {
    id: 'kl-6', state: 'Kerala', category: 'Survey',
    title: 'Kerala Resurvey Programme (Castes Survey) — Village Boundary Fixation 2024',
    gazetteNo: 'GoKL No. Rev/SURV/2024/16', effectiveDate: '01 Aug 2024',
    description: 'Comprehensive resurvey of all 1,674 revenue villages using drone and ETS. Fixes village boundaries that were disputed for decades.',
    districts: 'Phase 1: Thrissur, Palakkad, Malappuram. Phase 2: Kozhikode, Wayanad, Kannur',
    authority: 'Survey of Land Records, Revenue Department, GoKL',
    keyProvisions: ['Drone + ETS survey', 'Village boundary fixation', 'Dispute resolution panel', 'Online FMB portal'],
    impactMetrics: { citizensAffected: '1.2 Crore', efficiencyGain: '65%', transparencyScore: '89%' }
  },
  {
    id: 'kl-7', state: 'Kerala', category: 'Housing',
    title: 'Life Mission — Kerala Affordable Housing for Homeless Families 2024',
    gazetteNo: 'GoKL No. LSG/LIFE/2024/05', effectiveDate: '01 Apr 2024',
    description: 'Provides housing to 2.5 lakh homeless families identified in Life Mission survey. Government allots 3 cents land + house for landless beneficiaries.',
    districts: 'All 14 Districts — prioritizing Tribal/Dalit beneficiaries in Wayanad, Idukki',
    authority: 'Local Self-Government Department, GoKL / LIFE Mission',
    keyProvisions: ['3 cents land + house', 'Government site allotment for landless', 'SC/ST/OBC priority', 'PMAY-G convergence'],
    impactMetrics: { citizensAffected: '2.5 Lakh families', efficiencyGain: '70%', transparencyScore: '91%' }
  },
  {
    id: 'kl-8', state: 'Kerala', category: 'Agricultural',
    title: 'Kerala Paddy Land and Wetland Conservation Act Amendment 2024',
    gazetteNo: 'GoKL No. AG/PADDY/2024/12', effectiveDate: '01 Jun 2024',
    description: 'Amended Act to strengthen paddy land protection. Mandatory conservation of Class-I paddy lands. Online monitoring via Data Bank.',
    districts: 'Paddy Districts: Alappuzha, Thrissur, Palakkad, Wayanad (Kuttanad and Palakkad plains)',
    authority: 'Agriculture Department, GoKL / Revenue Department',
    keyProvisions: ['Class-I paddy land protected', 'Online data bank monitoring', 'Village officer certification', 'Conversion penalty enhanced'],
    impactMetrics: { citizensAffected: '8 Lakh', efficiencyGain: '42%', transparencyScore: '84%' }
  },
  {
    id: 'kl-9', state: 'Kerala', category: 'Revenue',
    title: 'Kerala Revenue Recovery (Amendment) Act 2023',
    gazetteNo: 'GoKL No. Rev/RRA/2023/19', effectiveDate: '01 Oct 2023',
    description: 'Streamlines land revenue recovery proceedings. E-auction platform for revenue defaulter properties. Appeals via online Revenue Tribunal portal.',
    districts: 'All Districts — Revenue Divisional Offices across 14 Districts',
    authority: 'Revenue Department, Government of Kerala',
    keyProvisions: ['E-auction for defaulter properties', 'Online Revenue Tribunal appeals', 'Attachment notice via SMS', '30-day appeal window'],
    impactMetrics: { citizensAffected: '5 Lakh', efficiencyGain: '55%', transparencyScore: '87%' }
  },
  {
    id: 'kl-10', state: 'Kerala', category: 'Urban Slum',
    title: 'Kerala Urban Livelihood Mission — Slum-Free City Policy 2024',
    gazetteNo: 'GoKL No. LSG/KULM/2024/07', effectiveDate: '01 Feb 2024',
    description: 'Makes all Kerala municipalities slum-free by 2027. Integrates with PMAY-U for affordable housing. Digital survey of all slum households.',
    districts: 'Municipalities: Thiruvananthapuram, Kochi, Kozhikode, Thrissur, Kollam, Kannur, Alappuzha',
    authority: 'Local Self-Government / Kerala Urban Livelihood Mission (KULM)',
    keyProvisions: ['Slum-free target 2027', 'PMAY-U subsidy integration', 'Biometric household survey', 'In-situ redevelopment preferred'],
    impactMetrics: { citizensAffected: '3.5 Lakh', efficiencyGain: '48%', transparencyScore: '83%' }
  },
  {
    id: 'kl-11', state: 'Kerala', category: 'Tribal Land',
    title: 'Kerala Scheduled Tribes (Restriction on Transfer of Lands) Amendment Act 2023',
    gazetteNo: 'GoKL No. ST/RLAND/2023/10', effectiveDate: '01 May 2023',
    description: 'Strengthens prohibition on transfer of tribal land to non-tribals. Establishes Tribal Land Bank for restoration of illegally transferred lands.',
    districts: 'Tribal Districts: Wayanad, Idukki, Palakkad (Attappady), Thrissur',
    authority: 'Scheduled Tribes Department, GoKL',
    keyProvisions: ['Tribal land bank', 'Illegal transfer reversal', 'District Tribal Welfare Officer oversight', 'Annual survey of tribal lands'],
    impactMetrics: { citizensAffected: '4.5 Lakh', efficiencyGain: '36%', transparencyScore: '80%' }
  },
  {
    id: 'kl-12', state: 'Kerala', category: 'Encumbrance',
    title: 'Kerala Registration (Online Deed & EC) Amendment Rules 2023',
    gazetteNo: 'GoKL No. IGR/ODE/2023/14', effectiveDate: '15 Aug 2023',
    description: 'Enables online property deed registration through e-sign. EC issuance within 15 minutes via Kerala Registration portal. Home loan API integration.',
    districts: 'All Districts — 489 Sub-Registrar Offices across Kerala',
    authority: 'Inspector General of Registration, GoKL',
    keyProvisions: ['E-sign deed registration', '15-minute EC issuance', 'Home loan API', 'Digital stamp paper'],
    impactMetrics: { citizensAffected: '60 Lakh/year', efficiencyGain: '82%', transparencyScore: '96%' }
  },
  {
    id: 'kl-13', state: 'Kerala', category: 'Industrial',
    title: 'Kerala Industrial Single Window Clearance — Land Identification Policy 2024',
    gazetteNo: 'GoKL No. IND/SWC/2024/11', effectiveDate: '01 May 2024',
    description: 'KSIDC (Kerala State Industrial Development Corporation) provides land facilitation for manufacturers. 30-day land identification guarantee.',
    districts: 'Industrial Parks: Kochi (Kalamassery), Thiruvananthapuram (Technocity), Palakkad (Kanjikode), Malappuram (Koottilangadi)',
    authority: 'Industries Department / KSIDC, GoKL',
    keyProvisions: ['30-day land identification', 'KSIDC industrial parks', 'Single window clearance', 'Plug-and-play infrastructure'],
    impactMetrics: { citizensAffected: '2 Lakh (jobs)', efficiencyGain: '65%', transparencyScore: '88%' }
  },
  {
    id: 'kl-14', state: 'Kerala', category: 'Tourism',
    title: 'Kerala Responsible Tourism Zone — Land Use Guidelines 2024',
    gazetteNo: 'GoKL No. TOU/RTZ/2024/06', effectiveDate: '01 Mar 2024',
    description: 'Designates Responsible Tourism Zones in 8 districts. Land use norms for eco-lodges, heritage homestays, and community tourism facilities.',
    districts: 'Wayanad, Idukki (Munnar), Palakkad (Silent Valley), Alappuzha, Thrissur, Kozhikode (Beypore), Kannur, Kasaragod',
    authority: 'Tourism Department, GoKL / KTDC',
    keyProvisions: ['Eco-lodge FSI norms', 'Heritage homestay permits', 'Community tourism facilitation', 'Panchayat revenue sharing'],
    impactMetrics: { citizensAffected: '5 Lakh', efficiencyGain: '44%', transparencyScore: '82%' }
  },
  {
    id: 'kl-15', state: 'Kerala', category: 'Disaster',
    title: 'Kerala Post-Flood Land Restoration & Landslide Zone Management Policy 2023',
    gazetteNo: 'GoKL No. REV/DM/2023/21', effectiveDate: '01 Sep 2023',
    description: 'Post-2018 flood policy for land restoration, hazard zone mapping, and prohibition of construction in landslide-prone areas identified via LiDAR survey.',
    districts: 'Hazard Zones: Wayanad, Idukki, Thrissur (Chalakudy), Ernakulam (Periyar), Malappuram, Kozhikode (Kalpetta)',
    authority: 'Revenue & Disaster Management Department / KSPCB',
    keyProvisions: ['LiDAR hazard mapping', 'Construction ban in Zone III', 'Relocation package', 'Land reassignment for displaced'],
    impactMetrics: { citizensAffected: '6 Lakh', efficiencyGain: '50%', transparencyScore: '85%' }
  },

  // ─── ANDHRA PRADESH ──────────────────────────────────────────────────────────
  {
    id: 'ap-1', state: 'Andhra Pradesh', category: 'Land Records',
    title: 'Mee Bhoomi — AP Land Records Portal (Adangal, RoR Online)',
    gazetteNo: 'GoAP No. Rev/MB/2006/01', effectiveDate: '01 Jan 2006',
    description: 'Comprehensive online portal for Pahani (crop and land record), Adangal, and RoR issuance across all 13 revenue districts (now 26 after bifurcation).',
    districts: 'All 26 Districts: Srikakulam, Vizianagaram, Visakhapatnam, East Godavari, West Godavari, Eluru, Krishna, NTR, Guntur, Palnadu, Bapatla, Nandyal, Kurnool, Anantapur, Sri Sathya Sai, YSR Kadapa, Chittoor, Tirupati, Annamayya, Rajampet',
    authority: 'Revenue Department, Government of Andhra Pradesh',
    keyProvisions: ['Online Pahani/Adangal', 'RoR mutation online', 'Biometric signature on documents', 'Village Volunteer delivery'],
    impactMetrics: { citizensAffected: '2.8 Crore', efficiencyGain: '73%', transparencyScore: '91%' }
  },
  {
    id: 'ap-2', state: 'Andhra Pradesh', category: 'Capital City',
    title: 'Amaravati Capital Region Land Pooling Scheme',
    gazetteNo: 'GoAP No. MA/CRDA/2015/01', effectiveDate: '01 Jan 2015',
    description: 'Voluntary land pooling for Amaravati capital city development. 33,000 acres pooled from farmers. Returnable Plots given in lieu of agricultural land.',
    districts: 'Guntur, Krishna (CRDA region: Amaravati, Thullur, Mangalagiri, Undavalli)',
    authority: 'Andhra Pradesh Capital Region Development Authority (APCRDA)',
    keyProvisions: ['Voluntary land pooling', 'Returnable plots (RP) to farmers', 'Compensation and annuity', 'Master plan 2050'],
    impactMetrics: { citizensAffected: '20,000 farmer families', efficiencyGain: '45%', transparencyScore: '80%' }
  },
  {
    id: 'ap-3', state: 'Andhra Pradesh', category: 'Tenancy',
    title: 'AP Crop Cultivators Rights Act 2019',
    gazetteNo: 'GoAP No. Ag/CCR/2019/04', effectiveDate: '22 Oct 2019',
    description: 'Provides formal tenancy rights to crop cultivators via Crop Cultivator Rights Cards. Eliminates informal tenancy and enables formal credit access.',
    districts: 'Agricultural Districts: East Godavari, West Godavari, Guntur, Krishna, Prakasam, Nellore, Kurnool, Anantapur, YSR Kadapa',
    authority: 'Agriculture & Revenue Department, GoAP',
    keyProvisions: ['Tenancy card for cultivators', 'Bank loan eligibility', 'Crop insurance access', 'Dispute resolution via RDO'],
    impactMetrics: { citizensAffected: '60 Lakh farmers', efficiencyGain: '52%', transparencyScore: '85%' }
  },
  {
    id: 'ap-4', state: 'Andhra Pradesh', category: 'Survey',
    title: 'AP DHARANI — Integrated Land Records Management System',
    gazetteNo: 'GoAP No. Rev/DLRMS/2020/03', effectiveDate: '29 Oct 2020',
    description: 'Single integrated portal replacing all land record, registration, and mutation functions. Eliminates intermediaries. 12 types of land-related services online.',
    districts: 'All 26 Districts — 1,077 Sub-Registrar Offices integrated',
    authority: 'Revenue Department / CCLA, Government of Andhra Pradesh',
    keyProvisions: ['12 services on single portal', 'Zero middlemen model', 'Real-time mutation', 'Court order integration'],
    impactMetrics: { citizensAffected: '3 Crore', efficiencyGain: '77%', transparencyScore: '94%' }
  },
  {
    id: 'ap-5', state: 'Andhra Pradesh', category: 'Urban Planning',
    title: 'VGTM Urban Development Authority — Vizag Master Plan 2050',
    gazetteNo: 'VGTMUDA No. MP/2050/01', effectiveDate: '01 Jun 2022',
    description: 'Master Plan for Visakhapatnam-Greater area. Covers 6,710 sq km including port zone, industrial zone, IT corridor, and eco-tourism belt.',
    districts: 'Visakhapatnam, Anakapalle, Alluri Sitarama Raju, Vizianagaram (partial)',
    authority: 'VGTM Urban Development Authority (VGTMUDA)',
    keyProvisions: ['Port zone land use', 'IT corridor FSI', 'Eco-tourism belt', 'SEZ integration'],
    impactMetrics: { citizensAffected: '65 Lakh', efficiencyGain: '50%', transparencyScore: '86%' }
  },
  {
    id: 'ap-6', state: 'Andhra Pradesh', category: 'Housing',
    title: 'YSR Jagananna Sampoorna Gruha Hakku — House Pattas for Urban Poor',
    gazetteNo: 'GoAP No. MA/JGSGH/2020/08', effectiveDate: '01 Apr 2020',
    description: 'Regularizes unauthorized colonies and provides house pattas to 27 lakh urban poor households. Integrates with PMAY-U for construction assistance.',
    districts: 'All 119 Urban Local Bodies across 26 Districts',
    authority: 'Municipal Administration & Urban Development, GoAP',
    keyProvisions: ['House patta for unauthorized colonies', 'PMAY-U construction aid', 'No eviction for patta holders', 'Stamp duty waiver for EWS'],
    impactMetrics: { citizensAffected: '27 Lakh families', efficiencyGain: '68%', transparencyScore: '89%' }
  },
  {
    id: 'ap-7', state: 'Andhra Pradesh', category: 'Industrial',
    title: 'AP Industrial Land Policy 2024 — Manufacturing Zones',
    gazetteNo: 'GoAP No. IND/MFG/2024/12', effectiveDate: '01 Jan 2024',
    description: 'Designates 12 Industrial Manufacturing Zones across AP. Streamlined land allotment in 30 days. Land bank of 50,000 acres from APIIC for investors.',
    districts: 'IMZ Districts: Visakhapatnam, Krishna, Guntur, Kurnool, Nellore, Chittoor, Tirupati, Rajam (Srikakulam)',
    authority: 'APIIC / Industries Department, GoAP',
    keyProvisions: ['30-day land allotment', '50,000 acre land bank', 'Single window clearance', 'R&R compliance mandatory'],
    impactMetrics: { citizensAffected: '5 Lakh (jobs)', efficiencyGain: '71%', transparencyScore: '88%' }
  },
  {
    id: 'ap-8', state: 'Andhra Pradesh', category: 'Encumbrance',
    title: 'AP Registration & Stamps — Automated EC via DHARANI Portal 2023',
    gazetteNo: 'GoAP No. IGR/DHAR/2023/17', effectiveDate: '01 Oct 2023',
    description: 'Automates EC generation via DHARANI portal integration. EC issued within 5 minutes. Banks can query via API for home loan processing.',
    districts: 'All 26 Districts — Integrated with DHARANI',
    authority: 'Inspector General of Registration & Stamps, GoAP',
    keyProvisions: ['5-minute EC issuance', 'Bank API integration', 'Automated lien check', 'Integrated with court records'],
    impactMetrics: { citizensAffected: '1 Crore/year', efficiencyGain: '85%', transparencyScore: '97%' }
  },
  {
    id: 'ap-9', state: 'Andhra Pradesh', category: 'Coastal',
    title: 'AP CRZ Notification & PCPIR Land Use Policy — Kakinada 2023',
    gazetteNo: 'GoAP-MoEF/PCPIR/2023/06', effectiveDate: '15 Jul 2023',
    description: 'Integrates CRZ and PCPIR (Petroleum, Chemical and Petrochemical Investment Region) land use rules for Kakinada. Buffer zones, port expansion, fisher rights.',
    districts: 'East Godavari (Kakinada), Konaseema, Eluru, West Godavari',
    authority: 'AP State Coastal Zone Management Authority / PCPIR Board',
    keyProvisions: ['PCPIR land use zones', 'CRZ buffer demarcation', 'Fisher community rights', 'Port expansion zones'],
    impactMetrics: { citizensAffected: '8 Lakh', efficiencyGain: '44%', transparencyScore: '82%' }
  },
  {
    id: 'ap-10', state: 'Andhra Pradesh', category: 'Forest',
    title: 'AP Forest Land Vesting (Agency Areas) — Tribal Rights Policy 2024',
    gazetteNo: 'GoAP No. FOR/TRB/2024/09', effectiveDate: '01 Apr 2024',
    description: 'Protects tribal land rights in Agency areas (Scheduled Areas). Restricts non-tribal purchase. Creates tribal land bank for rehabilitation of evicted tribals.',
    districts: 'Agency Districts: Alluri Sitarama Raju (Rampachodavaram), Visakhapatnam Agency (Paderu), ASR (Narsipatnam)',
    authority: 'Tribal Welfare Department / Forest Department, GoAP',
    keyProvisions: ['Non-tribal purchase ban', 'Tribal land bank', 'GPS boundary for tribal patches', 'Mandal-level vigilance committee'],
    impactMetrics: { citizensAffected: '10 Lakh tribals', efficiencyGain: '38%', transparencyScore: '78%' }
  },
  {
    id: 'ap-11', state: 'Andhra Pradesh', category: 'Agricultural',
    title: 'AP Rythu Bharosa Kendra — Farmer Land Data Integration 2024',
    gazetteNo: 'GoAP No. Ag/RBK/2024/14', effectiveDate: '01 Feb 2024',
    description: 'Links DHARANI land records with RBK (Rythu Bharosa Kendra) farmer services. Auto-fills land extent for crop insurance, seed subsidy, and Rythu Bharosa payments.',
    districts: 'All Agricultural Districts — 11,000 RBKs across 26 Districts',
    authority: 'Agriculture Department / Revenue Department, GoAP',
    keyProvisions: ['DHARANI-RBK data link', 'Auto-fill for crop insurance', 'Land-based subsidy delivery', 'Digital crop register'],
    impactMetrics: { citizensAffected: '60 Lakh farmers', efficiencyGain: '60%', transparencyScore: '90%' }
  },
  {
    id: 'ap-12', state: 'Andhra Pradesh', category: 'Irrigation',
    title: 'AP Jalabhumi — Irrigation Command Area Digitization Policy 2024',
    gazetteNo: 'GoAP No. WRD/JAL/2024/07', effectiveDate: '01 Mar 2024',
    description: 'Digitizes irrigation command area land records and water rights. GPS-mapped irrigation channels integrate with DHARANI for water rights registration.',
    districts: 'Krishna Delta: Krishna, NTR, Guntur. Godavari Delta: East Godavari, West Godavari, Konaseema, Eluru',
    authority: 'Water Resources Department, GoAP',
    keyProvisions: ['Water rights in DHARANI', 'Command area GPS mapping', 'Illegal diversion detection', 'Farmer water entitlement cards'],
    impactMetrics: { citizensAffected: '25 Lakh', efficiencyGain: '48%', transparencyScore: '83%' }
  },
  {
    id: 'ap-13', state: 'Andhra Pradesh', category: 'Urban Slum',
    title: 'YSR Navaratnalu — Pedalandariki Illu Policy 2020',
    gazetteNo: 'GoAP No. MA/PEI/2020/11', effectiveDate: '01 Aug 2020',
    description: 'Provides 30-yard house plots to homeless BPL families in AP. 30.04 lakh beneficiaries identified via biometric survey. Registration and patta in 90 days.',
    districts: 'All 26 Districts — Priority: Rural Mandals of YSR Kadapa, Kurnool, Anantapur, Srikakulam, Vizianagaram',
    authority: 'Municipal Administration & Revenue Department, GoAP',
    keyProvisions: ['30-yard site allotment', 'Biometric beneficiary survey', 'Patta within 90 days', 'PMAY-U construction assistance'],
    impactMetrics: { citizensAffected: '30 Lakh families', efficiencyGain: '70%', transparencyScore: '88%' }
  },
  {
    id: 'ap-14', state: 'Andhra Pradesh', category: 'SVAMITVA',
    title: 'AP Gram Sachivalayam Land Records — SVAMITVA Integration 2024',
    gazetteNo: 'GoAP No. Panchayat/SVA/2024/18', effectiveDate: '01 Jun 2024',
    description: 'Integrates SVAMITVA property cards with AP Gram Sachivalayam system. Panchayat secretaries update village land records in real time.',
    districts: 'Rural Villages across all 26 Districts — 15,004 Gram Sachivalayams',
    authority: 'Panchayat Raj & Rural Development, GoAP',
    keyProvisions: ['Gram Sachivalayam land portal', 'SVAMITVA card integration', 'Real-time update by panchayat secretary', 'Village map upload portal'],
    impactMetrics: { citizensAffected: '2 Crore', efficiencyGain: '65%', transparencyScore: '89%' }
  },
  {
    id: 'ap-15', state: 'Andhra Pradesh', category: 'Special Economic Zone',
    title: 'AP SEZ Land Use Policy & Investor Facilitation 2023',
    gazetteNo: 'GoAP No. IND/SEZ/2023/15', effectiveDate: '01 Nov 2023',
    description: 'Policy for land use within AP\'s 11 SEZs. Investor-friendly land lease rules, sub-lease permissions, and 50-year lease with renewal option.',
    districts: 'SEZ Districts: Visakhapatnam (VSEZ), Sri City (Chittoor), Nellore (Krishnapatnam), Kakinada (East Godavari)',
    authority: 'Industries Department / SEZ Authority, GoAP',
    keyProvisions: ['50-year lease option', 'Sub-lease permitted', 'Single window within SEZ', 'Tax-free zone norms'],
    impactMetrics: { citizensAffected: '3 Lakh (jobs)', efficiencyGain: '68%', transparencyScore: '87%' }
  },

  // ─── TELANGANA ───────────────────────────────────────────────────────────────
  {
    id: 'ts-1', state: 'Telangana', category: 'Land Records',
    title: 'Dharani Portal — Telangana Integrated Land Records & Registration',
    gazetteNo: 'GoTS No. Rev/DHAR/2020/01', effectiveDate: '29 Oct 2020',
    description: 'Integrated portal for land records, mutation, registration, and EC in Telangana. Eliminates middlemen. Combines ROR-1B (Pahani) with registration deed in single window.',
    districts: 'All 33 Districts: Hyderabad, Rangareddy, Medchal-Malkajgiri, Sangareddy, Nizamabad, Karimnagar, Warangal, Khammam, Nalgonda, Mahabubnagar, Wanaparthy, Nagarkurnool...',
    authority: 'Revenue Department / CCLA, Government of Telangana',
    keyProvisions: ['Integrated land + registration', 'ROR-1B online', 'Zero middlemen', 'WhatsApp-based EC delivery'],
    impactMetrics: { citizensAffected: '2.5 Crore', efficiencyGain: '78%', transparencyScore: '95%' }
  },
  {
    id: 'ts-2', state: 'Telangana', category: 'Urban Planning',
    title: 'Hyderabad Metropolitan Development Authority — Master Plan 2031',
    gazetteNo: 'HMDA No. MP/2031/02', effectiveDate: '01 Apr 2021',
    description: 'Master Plan for HMDA region covering 7,257 sq km. Includes outer ring road development, ORR corridor zones, Pharma City, and IT investment zone.',
    districts: 'Hyderabad, Rangareddy, Medchal-Malkajgiri, Sangareddy, Yadadri Bhuvanagiri (HMDA region)',
    authority: 'Hyderabad Metropolitan Development Authority (HMDA)',
    keyProvisions: ['ORR corridor zone', 'Pharma City land use', 'IT investment zone', 'Green zone preservation'],
    impactMetrics: { citizensAffected: '1.4 Crore', efficiencyGain: '55%', transparencyScore: '88%' }
  },
  {
    id: 'ts-3', state: 'Telangana', category: 'Survey',
    title: 'Telangana Maa Bhoomi Rekords — Village Resurvey Programme 2024',
    gazetteNo: 'GoTS No. Rev/SURV/2024/11', effectiveDate: '01 Jan 2024',
    description: 'Drone-based resurvey of all 10,430 revenue villages in Telangana. Integrates with Dharani for auto-mutation upon survey completion.',
    districts: 'Phase 1: Mahabubnagar, Wanaparthy, Nagarkurnool, Nalgonda. Phase 2: Karimnagar, Warangal, Khammam',
    authority: 'Commissioner of Land Reforms & Survey / CCLA, GoTS',
    keyProvisions: ['Drone survey all villages', 'Auto-mutation integration', 'Village FMB online', 'Dispute panel at each village'],
    impactMetrics: { citizensAffected: '1.5 Crore', efficiencyGain: '70%', transparencyScore: '92%' }
  },
  {
    id: 'ts-4', state: 'Telangana', category: 'Industrial',
    title: 'Telangana Industrial Policy 2024 — TSIIC Land Allotment & Manufacturing Zones',
    gazetteNo: 'GoTS No. IND/TSIIC/2024/08', effectiveDate: '01 Apr 2024',
    description: 'TSIIC provides land in 59 industrial parks across Telangana. Priority to semiconductor, pharma, and EV sectors. Land bank of 45,000 acres.',
    districts: 'Industrial Parks: Hyderabad (Shamshabad, IDA Nacharam), Sangareddy (Patancheru, Zaheerabad), Warangal (Kazipet), Khammam, Karimnagar',
    authority: 'TSIIC / Industries & Commerce Department, GoTS',
    keyProvisions: ['45,000 acre land bank', 'Priority to hi-tech sectors', '30-day allotment SLA', 'Plug-and-play infrastructure'],
    impactMetrics: { citizensAffected: '4 Lakh (jobs)', efficiencyGain: '72%', transparencyScore: '90%' }
  },
  {
    id: 'ts-5', state: 'Telangana', category: 'Housing',
    title: 'Dignity Housing — 2BHK Scheme for Urban Poor, Telangana',
    gazetteNo: 'GoTS No. MA/2BHK/2017/03', effectiveDate: '01 Apr 2017',
    description: 'Government provides 2BHK flats to homeless urban poor on government land. Over 2.7 lakh flats sanctioned. Biometric registration and patta in 60 days.',
    districts: 'All ULBs: Hyderabad, Warangal, Karimnagar, Nizamabad, Ramagundam, Khammam, Mahabubnagar, Nalgonda',
    authority: 'Telangana State Housing Corporation / MA&UD, GoTS',
    keyProvisions: ['2BHK flat on govt land', 'Biometric registration', 'Patta in 60 days', 'PMAY-U subsidy integration'],
    impactMetrics: { citizensAffected: '2.7 Lakh families', efficiencyGain: '65%', transparencyScore: '88%' }
  },
  {
    id: 'ts-6', state: 'Telangana', category: 'Agricultural',
    title: 'Telangana Rythu Bandhu — Farmer Land-Based Investment Support 2018',
    gazetteNo: 'GoTS No. Ag/RB/2018/01', effectiveDate: '01 May 2018',
    description: 'Investment support scheme (Rs 10,000/acre/season) for all land-owning farmers. Land records from Dharani used to identify beneficiaries.',
    districts: 'All 33 Agricultural Districts — linked to Dharani land records',
    authority: 'Agriculture Department / Revenue Department, GoTS',
    keyProvisions: ['Rs 10,000/acre/season', 'Dharani land record linked', 'Farmer patta mandatory', 'Direct DBT transfer'],
    impactMetrics: { citizensAffected: '58 Lakh farmers', efficiencyGain: '70%', transparencyScore: '94%' }
  },
  {
    id: 'ts-7', state: 'Telangana', category: 'Land Acquisition',
    title: 'Telangana Infrastructure Development Authority — Land Pooling 2024',
    gazetteNo: 'GoTS No. MA/TIDA/2024/09', effectiveDate: '01 May 2024',
    description: 'TIDA facilitates voluntary land pooling for infrastructure projects. 4x market value compensation for acquired land. DP Road and TOD norms.',
    districts: 'Regional Ring Road: Sangareddy, Vikarabad, Rangareddy, Medchal, Bhuvanagiri, Yadadri',
    authority: 'Telangana Infrastructure Development Authority (TIDA)',
    keyProvisions: ['4x market value', 'Voluntary pooling first', 'DP road zoning', 'TOD norms on RRR corridor'],
    impactMetrics: { citizensAffected: '6 Lakh', efficiencyGain: '58%', transparencyScore: '85%' }
  },
  {
    id: 'ts-8', state: 'Telangana', category: 'Encumbrance',
    title: 'Telangana Stamps & Registration — Dharani EC Portal 2023',
    gazetteNo: 'GoTS No. IGR/DHAR/2023/13', effectiveDate: '01 Sep 2023',
    description: 'EC issuance via Dharani in under 5 minutes. Complete ownership chain visible from 1950. Banks use API for real-time lien check before sanction.',
    districts: 'All 33 Districts — 455 Sub-Registrar Offices on Dharani',
    authority: 'Inspector General of Registration & Stamps, GoTS',
    keyProvisions: ['5-minute EC', 'Historical chain from 1950', 'Real-time bank API', 'Court case flag auto-alert'],
    impactMetrics: { citizensAffected: '90 Lakh/year', efficiencyGain: '87%', transparencyScore: '98%' }
  },
  {
    id: 'ts-9', state: 'Telangana', category: 'Tribal',
    title: 'Telangana Scheduled Tribes Land Transfer Prohibition Act Amendment 2023',
    gazetteNo: 'GoTS No. TW/LTRA/2023/07', effectiveDate: '01 Jun 2023',
    description: 'Strengthened prohibition on tribal land transfer in Scheduled Areas. Created Tribal Land Rights Protection Cell at district level.',
    districts: 'Bhadradri Kothagudem (Agency), Mulugu, Jayashankar Bhupalpally, Kumuram Bheem Asifabad, Mancherial',
    authority: 'Tribal Welfare Department, GoTS',
    keyProvisions: ['District-level protection cell', 'Illegal transfer reversal', 'Annual survey', 'Legal aid for tribals'],
    impactMetrics: { citizensAffected: '15 Lakh tribals', efficiencyGain: '42%', transparencyScore: '82%' }
  },
  {
    id: 'ts-10', state: 'Telangana', category: 'Layout Regularization',
    title: 'Telangana Layout Regularization Scheme (LRS) 2020 — Urban Plots',
    gazetteNo: 'GoTS No. MA/LRS/2020/05', effectiveDate: '31 Oct 2020',
    description: 'Regularizes unauthorized layouts in all ULBs with penalties. Provides Regularized Layout Patta. Road, drainage, and open space norms enforced.',
    districts: 'Urban Areas: Hyderabad, Rangareddy, Medchal, Sangareddy, Warangal, Karimnagar, Nizamabad, Nalgonda, Mahabubnagar, Khammam',
    authority: 'Municipal Administration & Urban Development, GoTS',
    keyProvisions: ['Unauthorized layout regularization', 'Penalty-based', 'Road/drainage norms', 'Regularized layout patta'],
    impactMetrics: { citizensAffected: '20 Lakh plot owners', efficiencyGain: '55%', transparencyScore: '84%' }
  },
  {
    id: 'ts-11', state: 'Telangana', category: 'Revenue',
    title: 'Telangana Tenancy and Agricultural Lands Act Amendment 2024',
    gazetteNo: 'GoTS No. Rev/TALA/2024/16', effectiveDate: '01 Oct 2024',
    description: 'Modernizes tenancy law to protect farmers leasing land. Mandatory written lease in Dharani. Crop loan eligibility for tenant farmers.',
    districts: 'Agricultural Districts: Nalgonda, Mahabubnagar, Wanaparthy, Nagarkurnool, Karimnagar, Nizamabad',
    authority: 'Revenue Department, Government of Telangana',
    keyProvisions: ['Written lease in Dharani', 'Crop loan for tenants', 'Minimum 1-year tenancy', 'Revenue court dispute resolution'],
    impactMetrics: { citizensAffected: '20 Lakh tenants', efficiencyGain: '48%', transparencyScore: '86%' }
  },
  {
    id: 'ts-12', state: 'Telangana', category: 'IT Zone',
    title: 'Telangana IT Investment Zone (ITIZ) — HITEC City Expansion Policy 2024',
    gazetteNo: 'GoTS No. IT/HITEC/2024/12', effectiveDate: '01 Jan 2024',
    description: 'Expands HITEC City IT zone to cover 15,000 acres. New Fab City and Data Center zone near Shamshabad. FSI up to 6.0 for IT SEZ.',
    districts: 'Hyderabad (Madhapur), Rangareddy (Shamshabad, Adibatla, Tukkuguda), Medchal (Genome Valley)',
    authority: 'ITE&C Department / TSIIC, GoTS',
    keyProvisions: ['FSI up to 6.0 in IT SEZ', 'Fab City zone designation', 'Data Center zone', 'Fast-track RERA for IT housing'],
    impactMetrics: { citizensAffected: '8 Lakh (jobs)', efficiencyGain: '75%', transparencyScore: '92%' }
  },
  {
    id: 'ts-13', state: 'Telangana', category: 'Forest',
    title: 'Telangana Haritha Haram — Green Cover and Forest Land Policy 2024',
    gazetteNo: 'GoTS No. FOR/HH/2024/04', effectiveDate: '01 Apr 2024',
    description: 'Protects and expands 33% green cover target. Prohibits construction within 100m of Reserved Forests. GPS-monitored forest boundary integration with Dharani.',
    districts: 'Forest Fringe: Mulugu, Bhadradri Kothagudem, Jayashankar Bhupalpally, Kumuram Bheem, Mancherial, Nizamabad',
    authority: 'Forest Department, Government of Telangana',
    keyProvisions: ['100m buffer from Reserved Forest', 'GPS boundary in Dharani', 'Haritha Haram plantation drive', 'Encroachment removal cell'],
    impactMetrics: { citizensAffected: '5 Lakh', efficiencyGain: '50%', transparencyScore: '86%' }
  },
  {
    id: 'ts-14', state: 'Telangana', category: 'Irrigation',
    title: 'Telangana Kaleshwaram Lift Irrigation — Command Area Land Policy 2023',
    gazetteNo: 'GoTS No. WRD/KLIP/2023/08', effectiveDate: '01 Aug 2023',
    description: 'Regulates land use in Kaleshwaram command area. Water rights registration via Dharani. Restricts industrial use in prime agricultural command areas.',
    districts: 'Command Area: Nizamabad, Karimnagar, Siddipet, Yadadri, Nalgonda, Suryapet, Bhuvanagiri',
    authority: 'Irrigation and CAD Department, GoTS',
    keyProvisions: ['Water rights in Dharani', 'Agricultural priority in command area', 'Industrial restriction zone', 'Farmer pass-book for water rights'],
    impactMetrics: { citizensAffected: '18 Lakh', efficiencyGain: '52%', transparencyScore: '84%' }
  },
  {
    id: 'ts-15', state: 'Telangana', category: 'Special Area',
    title: 'Telangana Revenue Survey — Podu Land Regularization in Tribal Areas 2024',
    gazetteNo: 'GoTS No. TW/PODU/2024/19', effectiveDate: '01 Jul 2024',
    description: 'Survey and regularization of Podu lands (forest encroachments) by tribals in Scheduled Areas. FRA-compliant with Gram Sabha recommendations.',
    districts: 'Tribal Agency: Bhadradri Kothagudem, Mulugu, Jayashankar Bhupalpally, Kumuram Bheem, Mancherial',
    authority: 'Tribal Welfare / Revenue / Forest Departments, GoTS',
    keyProvisions: ['FRA-compliant regularization', 'Gram Sabha recommendation', 'GPS survey of podu lands', 'Title deed via Dharani'],
    impactMetrics: { citizensAffected: '8 Lakh tribals', efficiencyGain: '40%', transparencyScore: '79%' }
  }
];

export const PolicyRepository = ({ isAddModalOpen, setIsAddModalOpen, setCurrentPage }) => {
  const { user } = useContext(AuthContext);
  const [dbPolicies, setDbPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePolicy, setActivePolicy] = useState(null);

  const fetchPolicies = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.get('/api/policies');
      setDbPolicies(res.data);
    } catch (err) {
      // Not an error — use static data as primary
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies();
    const savedQuery = sessionStorage.getItem('geopolicy_search_query');
    if (savedQuery) {
      setSearchQuery(savedQuery);
      sessionStorage.removeItem('geopolicy_search_query');
    }
  }, []);

  const handleCreatePolicy = async (formData) => {
    try {
      setError('');
      const res = await axios.post('/api/policies', formData);
      setDbPolicies([res.data, ...dbPolicies]);
      setIsAddModalOpen(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Error submitting policy document.');
    }
  };

  // Merge DB + static policies, deduplicate by title
  const allPolicies = [...dbPolicies, ...STATIC_POLICIES];

  const filteredPolicies = allPolicies.filter(p => {
    const matchesState = selectedState === 'All' || p.state === selectedState;
    const q = searchQuery.toLowerCase();
    const matchesSearch = q === '' ||
      p.title?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.state?.toLowerCase().includes(q) ||
      p.districts?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.authority?.toLowerCase().includes(q);
    return matchesState && matchesSearch;
  });

  // Count by state for pill badges
  const stateCounts = STATES.reduce((acc, st) => {
    acc[st] = st === 'All' ? allPolicies.length : allPolicies.filter(p => p.state === st).length;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-6 lg:p-8 space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#0A3678] font-mono text-xs font-bold uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4 text-amber-500" />
            <span>State Legislative &amp; Gazette Policy Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002244]">
            Official Policy Gazette Registry
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {allPolicies.length} official gazette acts, land revenue modernization mandates, and conclusive titling rules across India. Click any policy to view full details.
          </p>
        </div>

        {(user?.role === 'Policymaker' || user?.role === 'Super Admin' || user?.role === 'Government Official') && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-[#0A3678] hover:bg-[#002244] text-white font-bold text-xs rounded-lg shadow-sm flex items-center gap-2 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Draft Policy Document</span>
          </button>
        )}
      </div>

      {/* Realistic Official Gazette Policy Header Banner */}
      <div className="relative rounded-2xl overflow-hidden h-36 border border-slate-200 shadow-xs">
        <img 
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1200&auto=format&fit=crop" 
          alt="Official Gazette Land Reform Acts" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#002244]/90 via-[#0A3678]/85 to-transparent p-6 flex flex-col justify-center text-white">
          <span className="text-amber-300 font-mono text-xs font-bold uppercase tracking-wider">Official State Gazettes &amp; Ordinances</span>
          <h2 className="text-xl font-extrabold">National Legislative Policy Gazette Repository</h2>
          <p className="text-xs text-slate-200 mt-1">Full statutory provisions, effective dates, district-level jurisdiction mappings, and socio-economic impact metrics.</p>
        </div>
      </div>

      {/* Search & State Filter Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by state, district, gazette act, category, or authority..."
            className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-10 pr-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-2.5">
              <X className="w-4 h-4 text-slate-400 hover:text-slate-700" />
            </button>
          )}
        </div>

        {/* State Pills with count badges */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar text-xs">
          <span className="font-bold text-slate-700 font-mono uppercase tracking-wider shrink-0 text-[11px]">Jurisdiction:</span>
          {STATES.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedState(st)}
              className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer flex items-center gap-1 ${
                selectedState === st ? 'bg-[#0A3678] text-white shadow-xs' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {st}
              <span className={`text-[10px] px-1 rounded-full ${selectedState === st ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'}`}>
                {stateCounts[st] || 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Policy Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200">
          <Loader2 className="w-8 h-8 text-[#0A3678] animate-spin mb-2" />
          <p className="text-xs font-semibold text-slate-600">Loading policy registry...</p>
        </div>
      ) : filteredPolicies.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 space-y-2">
          <FileText className="w-10 h-10 text-slate-400 mx-auto" />
          <p className="text-sm font-bold text-slate-700">No policy documents match your filter.</p>
          <button onClick={() => { setSearchQuery(''); setSelectedState('All'); }} className="text-xs text-[#0A3678] font-bold hover:underline">Clear all filters</button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono px-1">
            <span>Showing {filteredPolicies.length} Gazetted Policy Documents</span>
            <span>Government of India — Gazette Registry</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPolicies.map((policy) => (
              <div
                key={policy._id || policy.id}
                onClick={() => setActivePolicy(policy)}
                className="bg-white rounded-xl border border-slate-200 hover:border-amber-400 p-5 flex flex-col justify-between space-y-3 transition-all hover:shadow-md cursor-pointer group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      {policy.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                      <MapPin className="w-3.5 h-3.5 text-red-600" />
                      {policy.state}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0A3678] transition-colors leading-snug">
                    {policy.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {policy.description}
                  </p>

                  {policy.districts && (
                    <div className="flex items-start gap-1.5 text-[11px] text-slate-500">
                      <Building className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{policy.districts}</span>
                    </div>
                  )}

                  {policy.impactMetrics && (
                    <div className="grid grid-cols-3 gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-[11px]">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Beneficiaries</span>
                        <span className="font-extrabold text-[#0A3678] font-mono">{policy.impactMetrics.citizensAffected}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Efficiency</span>
                        <span className="font-extrabold text-emerald-700 font-mono">{policy.impactMetrics.efficiencyGain}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Audit Score</span>
                        <span className="font-extrabold text-blue-700 font-mono">{policy.impactMetrics.transparencyScore}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{policy.gazetteNo || 'Gazetted Enactment'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (setCurrentPage) {
                          localStorage.setItem('selected_sim_policy', JSON.stringify(policy));
                          setCurrentPage('simulator');
                        }
                      }}
                      className="px-3 py-1 bg-[#0A3678] hover:bg-[#002244] text-white rounded-lg font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      title="Run Policy Impact Simulation"
                    >
                      <Cpu className="w-3.5 h-3.5 text-amber-400" />
                      <span>Execute Simulation</span>
                    </button>
                    <span className="px-3 py-1 bg-amber-50 group-hover:bg-amber-100 text-amber-900 rounded-lg font-bold text-xs flex items-center gap-1 transition-colors">
                      View Details <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Policy Details Modal */}
      {activePolicy && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setActivePolicy(null)}>
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 p-5 flex items-start justify-between gap-4 z-10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    {activePolicy.category}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-red-600" /> {activePolicy.state}
                  </span>
                </div>
                <h2 className="text-base font-bold text-[#002244] leading-snug">{activePolicy.title}</h2>
              </div>
              <button onClick={() => setActivePolicy(null)} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors shrink-0">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Gazette & Authority */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-[10px] text-slate-500 font-mono uppercase mb-0.5">Gazette Number</p>
                  <p className="font-bold text-[#0A3678]">{activePolicy.gazetteNo || 'N/A'}</p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                  <p className="text-[10px] text-slate-500 font-mono uppercase mb-0.5">Effective Date</p>
                  <p className="font-bold text-emerald-800">{activePolicy.effectiveDate || activePolicy.effectiveYear || 'In Force'}</p>
                </div>
              </div>

              {/* Authority */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <p className="text-[10px] text-slate-400 font-mono uppercase mb-0.5">Issuing Authority</p>
                <p className="font-semibold text-slate-800">{activePolicy.authority || 'Government of India / State Government'}</p>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Policy Summary</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{activePolicy.description}</p>
              </div>

              {/* District Coverage */}
              {activePolicy.districts && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Building className="w-3.5 h-3.5 text-amber-700" />
                    <p className="text-[10px] text-amber-700 font-bold uppercase tracking-wide">District / Area Coverage</p>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{activePolicy.districts}</p>
                </div>
              )}

              {/* Key Provisions */}
              {activePolicy.keyProvisions && (
                <div>
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Key Provisions</h3>
                  <ul className="space-y-1.5">
                    {activePolicy.keyProvisions.map((kp, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{kp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Impact Metrics */}
              {activePolicy.impactMetrics && (
                <div>
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Impact Metrics</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 text-center">
                      <p className="text-[10px] text-slate-400">Beneficiaries</p>
                      <p className="font-extrabold text-[#0A3678] font-mono text-sm">{activePolicy.impactMetrics.citizensAffected}</p>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-center">
                      <p className="text-[10px] text-slate-400">Efficiency Gain</p>
                      <p className="font-extrabold text-emerald-700 font-mono text-sm">{activePolicy.impactMetrics.efficiencyGain}</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 text-center">
                      <p className="text-[10px] text-slate-400">Transparency Score</p>
                      <p className="font-extrabold text-purple-700 font-mono text-sm">{activePolicy.impactMetrics.transparencyScore}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-5 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  if (setCurrentPage) {
                    localStorage.setItem('selected_sim_policy', JSON.stringify(activePolicy));
                    setCurrentPage('simulator');
                  }
                  setActivePolicy(null);
                }}
                className="px-4 py-2 bg-[#0A3678] hover:bg-[#002244] text-white rounded-lg text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Cpu className="w-4 h-4 text-amber-400" />
                <span>Execute Impact Simulation</span>
              </button>
              <button
                onClick={() => setActivePolicy(null)}
                className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Close Policy Document
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Policy Modal */}
      <PolicyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleCreatePolicy}
      />
    </div>
  );
};
