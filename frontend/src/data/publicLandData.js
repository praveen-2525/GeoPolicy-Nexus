// Comprehensive Public Land Cadastral & Ownership Records Repository across Indian States
// Compliant with DILRMP, ULPIN (Bhu-Aadhaar), SVAMITVA, and Survey of India CORS standards

export const PUBLIC_LAND_RECORDS = [
  {
    id: "LAND-KA-001",
    siteNumber: "SITE-KA-BLR-0089",
    ulpin: "ULPIN-14-29-089-2026-9812",
    pattaNumber: "PATTA-KA-88192/2024",
    chittaSittaNumber: "CHITTA-KA-BLR-4410",
    state: "Karnataka",
    district: "Bengaluru Urban",
    taluk: "Bengaluru North",
    village: "Yelahanka Hobli",
    locality: "Sector 4, Yelahanka New Town",
    coordinates: [13.1007, 77.5963],
    areaSqFt: 12500,
    areaAcres: 0.28,
    extentCents: 28.6,
    extentGunthas: 11.2,
    landType: "Private Land",
    legalStatus: "Authorized Land",
    ownerCount: 1,
    coOwnersList: ["Praveen Kumar R. (Sole Owner)"],
    ownerDetails: {
      name: "Praveen Kumar R.",
      contactEmail: "praveen.k@karnataka.gov.in",
      contactPhone: "+91 98450 12389",
      ownerCategory: "Individual Title Holder",
      aadhaarStatus: "Verified",
      aadhaarMasked: "XXXX-XXXX-8912",
      aadhaarVerificationDate: "14-Jan-2025 (UIDAI e-KYC API)",
      panStatus: "Verified",
      panMasked: "ABCPK****R",
      panVerificationDate: "15-Jan-2025 (NSDL ITD API)",
      verificationBadge: "✓ UIDAI & NSDL Government Verified"
    },
    fallowLandDetails: {
      isFallow: false,
      fallowStatus: "Active Developed Urban Infrastructure",
      fallowHistoryChain: "Agricultural Fallow (1998) -> Converted under Sec 95 KLR Act (2012) -> Transferred from Founder Devappa Gowda to Son Suresh Gowda (2018) -> Purchased by Praveen Kumar R. under Deed 8891/2023"
    },
    documentAuthenticity: {
      status: "✓ 100% Genuine & Verified Document",
      forgeryCheck: "Passed Sub-Registrar Digital Signature Match & SVAMITVA Drone Survey Audit",
      blockchainHash: "0x7f8a91b2c3d4e5f6a7b8c9d0e1f2a3b4",
      subRegistrarVerification: "Verified at SRO Yelahanka (Code: SRO-BLR-04)"
    },
    environmentalData: {
      floodRisk: "Low / Safe Zone",
      waterScarcity: "Water Secure",
      soilType: "Red Loamy Soil",
      elevationMeters: 915
    },
    disputeInfo: {
      isDisputed: false,
      disputeStatus: "Clean Title - No Active Case",
      disputeType: "None",
      caseReference: "N/A",
      courtJurisdiction: "District Revenue Tribunal, Bengaluru Urban",
      activeCaseDetails: "No litigation or boundary contestation filed in civil or revenue courts."
    },
    documentVerification: {
      khatoniStatus: "Mutated & Digitally Signed (Bhoomi 2.0)",
      encumbranceCertificate: "30-Year Clear Encumbrance (Kaveri 2.0)",
      surveySettlement: "SVAMITVA High-Precision Drone Survey Completed",
      blockchainHash: "0x7f8a91b2c3d4e5f6a7b8c9d0e1f2a3b4"
    },
    exchangedLandDetails: {
      isExchanged: true,
      exchangeHistory: "Exchanged parcel with KIADB for Bengaluru IT Corridor Access in Feb 2024 under Land Swap Deed 889/2024",
      previousOwner: "Karnataka Industrial Areas Development Board (KIADB)",
      exchangeReferenceNo: "EXCH-2024-KA-88912"
    },
    linkedResearchPaper: "Conclusive Land Titling in India: Legal, Economic, and Spatial Feasibility Analysis (Dr. Ramesh Sundaram, 2025)",
    linkedAgencyPolicy: "Karnataka Digital Bhoomi 2.0 Land Titling & Auto-Mutation Ordinance 2024"
  },
  {
    id: "LAND-KA-002",
    siteNumber: "SITE-KA-MYS-0412",
    ulpin: "ULPIN-14-29-041-2026-4410",
    pattaNumber: "PATTA-KA-44102/2023",
    chittaSittaNumber: "CHITTA-KA-MYS-1102",
    state: "Karnataka",
    district: "Mysuru",
    taluk: "Mysuru Taluk",
    village: "Hebbal Village",
    locality: "Hebbal Industrial Area",
    coordinates: [12.3364, 76.6189],
    areaSqFt: 43560,
    areaAcres: 1.0,
    extentCents: 100.0,
    extentGunthas: 40.0,
    landType: "Government Land",
    legalStatus: "Authorized Land",
    ownerCount: 1,
    coOwnersList: ["State of Karnataka (Dept of Revenue)"],
    ownerDetails: {
      name: "Department of Revenue, Govt of Karnataka",
      contactEmail: "revenue.sec@karnataka.gov.in",
      contactPhone: "0821-2422100",
      ownerCategory: "State Government Reserve",
      aadhaarStatus: "Verified",
      aadhaarMasked: "Govt Institution ID",
      aadhaarVerificationDate: "Official State Entity",
      panStatus: "Verified",
      panMasked: "BLRG0****D",
      panVerificationDate: "Verified State Treasury ID",
      verificationBadge: "✓ Government Institution Ownership"
    },
    fallowLandDetails: {
      isFallow: true,
      fallowStatus: "Permanent Fallow (State Reserve Land Bank)",
      fallowHistoryChain: "Original State Grant (1975) -> Designated Industrial Buffer Zone (2005) -> Reserved for Mysore Eco-Park under Dept Notice 441/2022"
    },
    documentAuthenticity: {
      status: "✓ 100% Genuine & Verified Document",
      forgeryCheck: "Government Gazette Notification Authenticated",
      blockchainHash: "0x3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f",
      subRegistrarVerification: "Verified at SRO Mysuru (Code: SRO-MYS-01)"
    },
    environmentalData: {
      floodRisk: "Moderate Flood Risk",
      waterScarcity: "Moderate Water Stress",
      soilType: "Black Cotton Soil",
      elevationMeters: 770
    },
    disputeInfo: {
      isDisputed: true,
      disputeStatus: "Active Mediation - Boundary Incongruity Notice",
      disputeType: "Encroachment Notice",
      caseReference: "REV-COURT-MYS-2025/1102",
      courtJurisdiction: "Assistant Commissioner Revenue Court, Mysuru",
      activeCaseDetails: "Notice issued to adjacent private plot regarding 4.2 meter fence encroachment into state buffer zone."
    },
    documentVerification: {
      khatoniStatus: "Government Land Khata Registered",
      encumbranceCertificate: "Government Sanctioned Parcel",
      surveySettlement: "Survey of India Geodetic Resurvey Done",
      blockchainHash: "0x3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f"
    },
    exchangedLandDetails: {
      isExchanged: false,
      exchangeHistory: "No Exchange History Recorded",
      previousOwner: "Original State Grant",
      exchangeReferenceNo: "N/A"
    },
    linkedResearchPaper: "Econometric Evaluation of SVAMITVA Rural Property Cards on Institutional Credit Access (2024)",
    linkedAgencyPolicy: "Karnataka Industrial Infrastructure Land Bank Allocation Framework 2023"
  },
  {
    id: "LAND-MH-001",
    siteNumber: "SITE-MH-MUM-1042",
    ulpin: "ULPIN-14-27-104-2026-1190",
    pattaNumber: "7/12-MH-AND-8891",
    chittaSittaNumber: "SITTA-MH-MUM-3321",
    state: "Maharashtra",
    district: "Mumbai Suburban",
    taluk: "Andheri",
    village: "Marol",
    locality: "MIDC Industrial Zone",
    coordinates: [19.1176, 72.8794],
    areaSqFt: 21780,
    areaAcres: 0.5,
    extentCents: 50.0,
    extentGunthas: 20.0,
    landType: "Private Land",
    legalStatus: "Authorized Land",
    ownerCount: 3,
    coOwnersList: ["Sunita Deshmukh (40%)", "Rahul Deshmukh (30%)", "Vikram Deshmukh (30%)"],
    ownerDetails: {
      name: "Sunita Deshmukh & Sons",
      contactEmail: "sunita.deshmukh@mumbai.org",
      contactPhone: "+91 98201 44102",
      ownerCategory: "Joint Private Ownership",
      aadhaarStatus: "Verified",
      aadhaarMasked: "XXXX-XXXX-4401",
      aadhaarVerificationDate: "10-Dec-2024 (UIDAI)",
      panStatus: "Verified",
      panMasked: "ABCSD****M",
      panVerificationDate: "12-Dec-2024 (NSDL)",
      verificationBadge: "✓ UIDAI & NSDL Government Verified"
    },
    fallowLandDetails: {
      isFallow: false,
      fallowStatus: "Commercial Industrial Plot (MIDC)",
      fallowHistoryChain: "Ancestral Agricultural Holding -> Industrial Acquisition by MIDC (1985) -> Allotted to Deshmukh Family under 99-year Lease Deed 4402/1992"
    },
    documentAuthenticity: {
      status: "✓ 100% Genuine & Verified Document",
      forgeryCheck: "Mahabhulekh Digital Signature Matches State Sub-Registrar Database",
      blockchainHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d",
      subRegistrarVerification: "Verified at SRO Andheri (Code: SRO-MUM-12)"
    },
    environmentalData: {
      floodRisk: "High Flood Risk (Mithi River Basin)",
      waterScarcity: "Water Secure",
      soilType: "Alluvial Coastal Soil",
      elevationMeters: 14
    },
    disputeInfo: {
      isDisputed: false,
      disputeStatus: "Clean Title - No Case Pending",
      disputeType: "None",
      caseReference: "N/A",
      courtJurisdiction: "High Court of Judicature at Bombay",
      activeCaseDetails: "Clear Search Certificate issued by Advocate General office."
    },
    documentVerification: {
      khatoniStatus: "7/12 Extract Digitally Authenticated (Mahabhulekh)",
      encumbranceCertificate: "Clear Search Report 1995-2026",
      surveySettlement: "City Survey Plan Verified (CTSO Andheri)",
      blockchainHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d"
    },
    exchangedLandDetails: {
      isExchanged: true,
      exchangeHistory: "Exchanged parcel buffer with Mumbai Metropolitan Region Development Authority (MMRDA) for Metro Line 3 depot in 2023",
      previousOwner: "Maharashtra Industrial Development Corporation (MIDC)",
      exchangeReferenceNo: "EXCH-2023-MH-44102"
    },
    linkedResearchPaper: "Urban Peri-Urban Spatial Dynamics and Agricultural Conversion in Western India (2024)",
    linkedAgencyPolicy: "Maharashtra e-Ferfar & Digital 7/12 Auto-Mutation Policy 2023"
  },
  {
    id: "LAND-MH-002",
    siteNumber: "SITE-MH-PUN-3310",
    ulpin: "ULPIN-14-27-331-2026-8812",
    pattaNumber: "7/12-MH-PUN-9912",
    chittaSittaNumber: "SITTA-MH-PUN-4401",
    state: "Maharashtra",
    district: "Pune",
    taluk: "Haveli",
    village: "Hinjawadi",
    locality: "Phase 3 Tech Park",
    coordinates: [18.5912, 73.7389],
    areaSqFt: 87120,
    areaAcres: 2.0,
    extentCents: 200.0,
    extentGunthas: 80.0,
    landType: "Private Land",
    legalStatus: "Unauthorized / Encroached Land",
    ownerCount: 2,
    coOwnersList: ["Anandrao Patil (50%)", "Disputed Claimant (50%)"],
    ownerDetails: {
      name: "Anandrao Patil",
      contactEmail: "anand.patil@pune.co.in",
      contactPhone: "+91 97640 88219",
      ownerCategory: "Individual Claimant",
      aadhaarStatus: "Pending Verification",
      aadhaarMasked: "XXXX-XXXX-9901",
      aadhaarVerificationDate: "Pending UIDAI Re-validation",
      panStatus: "Verified",
      panMasked: "ABCAP****P",
      panVerificationDate: "04-Feb-2025 (NSDL)",
      verificationBadge: "⚠️ Aadhaar Re-validation Required"
    },
    fallowLandDetails: {
      isFallow: true,
      fallowStatus: "Current Fallow (Uncultivated under Litigation)",
      fallowHistoryChain: "Transferred from Patil Ancestral Estate (2001) -> Disputed Sale Deed 991/2019 under legal challenge -> Stay Order issued by Civil Court"
    },
    documentAuthenticity: {
      status: "⚠️ Flagged Document (Discrepancy Detected)",
      forgeryCheck: "Discrepancy in Mutation Entry Date vs Revenue Sub-Registrar Ledger Index",
      blockchainHash: "0x8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b",
      subRegistrarVerification: "Under Audit at SRO Haveli (Code: SRO-PUN-08)"
    },
    environmentalData: {
      floodRisk: "Moderate Flood Risk",
      waterScarcity: "Severe Water Scarcity",
      soilType: "Black Deccan Basalt",
      elevationMeters: 560
    },
    disputeInfo: {
      isDisputed: true,
      disputeStatus: "Active Litigation - Civil Court Pune",
      disputeType: "Presumptive Titling & Encroachment Claim",
      caseReference: "CS-PUNE-2024/9912",
      courtJurisdiction: "District Civil Court, Pune",
      activeCaseDetails: "Injunction suit filed regarding disputed boundary mutation and unverified sale deed."
    },
    documentVerification: {
      khatoniStatus: "7/12 Extract Under Legal Challenge",
      encumbranceCertificate: "Encumbrance Notice Issued",
      surveySettlement: "DLR Resurvey Ordered",
      blockchainHash: "0x8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b"
    },
    exchangedLandDetails: {
      isExchanged: false,
      exchangeHistory: "No Exchange Recorded",
      previousOwner: "N/A",
      exchangeReferenceNo: "N/A"
    },
    linkedResearchPaper: "Legal Friction in Agricultural Land Partition Litigation across Fast-Growing Indian Cities (2024)",
    linkedAgencyPolicy: "Maharashtra Urban Peri-Urban Zoning and Encroachment Prevention Guidelines 2024"
  },
  {
    id: "LAND-DL-001",
    siteNumber: "SITE-DL-NDL-3301",
    ulpin: "ULPIN-14-07-330-2026-1029",
    pattaNumber: "PATTA-DL-LDO-1029",
    chittaSittaNumber: "CHITTA-DL-NDL-8821",
    state: "Delhi",
    district: "New Delhi",
    taluk: "Chanakyapuri",
    village: "Kautilya Marg",
    locality: "Diplomatic Enclave",
    coordinates: [28.5983, 77.1925],
    areaSqFt: 35000,
    areaAcres: 0.8,
    extentCents: 80.0,
    extentGunthas: 32.0,
    landType: "Government Land",
    legalStatus: "Authorized Land",
    ownerCount: 1,
    coOwnersList: ["Union of India (MoHUA L&DO)"],
    ownerDetails: {
      name: "Land and Development Office (L&DO), MoHUA",
      contactEmail: "ldo@nic.in",
      contactPhone: "011-23061324",
      ownerCategory: "Central Government Asset",
      aadhaarStatus: "Verified",
      aadhaarMasked: "Central Gov Agency",
      aadhaarVerificationDate: "Central Registry Validated",
      panStatus: "Verified",
      panMasked: "DELG0****L",
      panVerificationDate: "ITD Ministry Exempt",
      verificationBadge: "✓ Ministry Authenticated Government Land"
    },
    fallowLandDetails: {
      isFallow: false,
      fallowStatus: "Government Diplomatic Infrastructure Zone",
      fallowHistoryChain: "Imperial Delhi Land Acquisition Act (1911) -> Vested in L&DO Ministry of Urban Affairs -> Allocated for Diplomatic Enclave Master Plan"
    },
    documentAuthenticity: {
      status: "✓ 100% Genuine & Verified Document",
      forgeryCheck: "Union Government L&DO Master Gazette Registered",
      blockchainHash: "0x9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c",
      subRegistrarVerification: "Verified at SRO New Delhi (Code: SRO-DL-01)"
    },
    environmentalData: {
      floodRisk: "Low / Safe Zone",
      waterScarcity: "Moderate Water Stress",
      soilType: "Alluvial Plain",
      elevationMeters: 216
    },
    disputeInfo: {
      isDisputed: false,
      disputeStatus: "Clean Title - No Case",
      disputeType: "None",
      caseReference: "N/A",
      courtJurisdiction: "High Court of Delhi",
      activeCaseDetails: "State owned non-encroached diplomatic property with zero legal disputes."
    },
    documentVerification: {
      khatoniStatus: "L&DO Master Lease Deed Registered",
      encumbranceCertificate: "Union Government Ownership Title",
      surveySettlement: "Survey of India National Grid Mapped",
      blockchainHash: "0x9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c"
    },
    exchangedLandDetails: {
      isExchanged: true,
      exchangeHistory: "Inter-departmental land transfer between Ministry of Urban Development & Ministry of External Affairs in 2022",
      previousOwner: "Delhi Development Authority (DDA)",
      exchangeReferenceNo: "EXCH-2022-DL-1002"
    },
    linkedResearchPaper: "National Geospatial Data Infrastructure Framework and CORS Reference Network Standards (2024)",
    linkedAgencyPolicy: "Delhi Master Plan 2041 Spatial & Land Use Cadastral Policy"
  },
  {
    id: "LAND-TN-001",
    siteNumber: "SITE-TN-CHE-8821",
    ulpin: "ULPIN-14-33-882-2026-7711",
    pattaNumber: "PATTA-TN-77120/2024",
    chittaSittaNumber: "CHITTA-TN-CHE-8821",
    state: "Tamil Nadu",
    district: "Chennai",
    taluk: "Velachery",
    village: "Taramani",
    locality: "IT Expressway (OMR)",
    coordinates: [12.9863, 80.2432],
    areaSqFt: 65340,
    areaAcres: 1.5,
    extentCents: 150.0,
    extentGunthas: 60.0,
    landType: "Private Land",
    legalStatus: "Authorized Land",
    ownerCount: 1,
    coOwnersList: ["M/s Rajalakshmi Infrastructure Pvt Ltd"],
    ownerDetails: {
      name: "M/s Rajalakshmi Infrastructure Pvt Ltd",
      contactEmail: "contact@rajalakshmi-infra.com",
      contactPhone: "+91 44 2433 9900",
      ownerCategory: "Corporate Registered Developer",
      aadhaarStatus: "Verified",
      aadhaarMasked: "Director Aadhaar Verified",
      aadhaarVerificationDate: "08-Jan-2025 (UIDAI Corporate)",
      panStatus: "Verified",
      panMasked: "AAACR****K",
      panVerificationDate: "08-Jan-2025 (NSDL Corporate)",
      verificationBadge: "✓ Corporate & Director Verified"
    },
    fallowLandDetails: {
      isFallow: false,
      fallowStatus: "IT Park Commercial Complex",
      fallowHistoryChain: "Transferred from TIDCO Industrial Grant (1998) -> Private Sale Deed 7712/2014 -> Converted for IT Infrastructure under Tamil Nilam Entry 8821/2022"
    },
    documentAuthenticity: {
      status: "✓ 100% Genuine & Verified Document",
      forgeryCheck: "Tamil Nilam Digital Signature Authenticated with State EC Database",
      blockchainHash: "0x4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e",
      subRegistrarVerification: "Verified at SRO Velachery (Code: SRO-CHE-09)"
    },
    environmentalData: {
      floodRisk: "High Flood Risk (Velachery Lake Overflow Zone)",
      waterScarcity: "Water Secure",
      soilType: "Coastal Sandy Clay",
      elevationMeters: 7
    },
    disputeInfo: {
      isDisputed: false,
      disputeStatus: "Clean Title - No Case",
      disputeType: "None",
      caseReference: "N/A",
      courtJurisdiction: "Madras High Court",
      activeCaseDetails: "All environmental clearances and CMDA building permits verified without title suit."
    },
    documentVerification: {
      khatoniStatus: "Tamil Nilam E-Patta Authenticated",
      encumbranceCertificate: "30-Year Encumbrance Clear (EC Portal)",
      surveySettlement: "FMS Sketch Vector Integrated",
      blockchainHash: "0x4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e"
    },
    exchangedLandDetails: {
      isExchanged: true,
      exchangeHistory: "Exchanged land buffer with TIDCO for OMR Road Widening in 2021",
      previousOwner: "Tamil Nadu Industrial Development Corp (TIDCO)",
      exchangeReferenceNo: "EXCH-2021-TN-7711"
    },
    linkedResearchPaper: "Empirical Assessment of Digital Patta Chitta Modernization in Tamil Nadu (2024)",
    linkedAgencyPolicy: "Tamil Nadu IT Expressway Land Value Capture & Spatial Policy 2023"
  }
];

// Query and Filter Utilities
export const searchPublicLandRecords = (query = '', filters = {}) => {
  const q = query.trim().toLowerCase();
  
  return PUBLIC_LAND_RECORDS.filter(record => {
    // Text search matching
    const matchesText = !q || (
      record.siteNumber.toLowerCase().includes(q) ||
      record.ulpin.toLowerCase().includes(q) ||
      record.pattaNumber.toLowerCase().includes(q) ||
      record.chittaSittaNumber.toLowerCase().includes(q) ||
      record.state.toLowerCase().includes(q) ||
      record.district.toLowerCase().includes(q) ||
      record.ownerDetails.name.toLowerCase().includes(q) ||
      record.locality.toLowerCase().includes(q)
    );

    // State filter
    const matchesState = !filters.state || filters.state === 'All' || record.state.toLowerCase() === filters.state.toLowerCase();

    // Land type filter (Private / Government)
    const matchesLandType = !filters.landType || filters.landType === 'All' || record.landType === filters.landType;

    // Legal status filter (Authorized / Unauthorized)
    const matchesLegalStatus = !filters.legalStatus || filters.legalStatus === 'All' || record.legalStatus === filters.legalStatus;

    // Dispute filter (Disputed / Clean)
    const matchesDispute = !filters.disputeStatus || filters.disputeStatus === 'All' || 
      (filters.disputeStatus === 'Disputed' && record.disputeInfo.isDisputed) ||
      (filters.disputeStatus === 'Clean' && !record.disputeInfo.isDisputed);

    // Flood Risk filter
    const matchesFlood = !filters.floodRisk || filters.floodRisk === 'All' || record.environmentalData.floodRisk.includes(filters.floodRisk);

    // Water Scarcity filter
    const matchesWater = !filters.waterScarcity || filters.waterScarcity === 'All' || record.environmentalData.waterScarcity.includes(filters.waterScarcity);

    return matchesText && matchesState && matchesLandType && matchesLegalStatus && matchesDispute && matchesFlood && matchesWater;
  });
};
