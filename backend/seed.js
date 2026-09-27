const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const ResearchPaper = require('./models/ResearchPaper');
const Policy = require('./models/Policy');
const Dataset = require('./models/Dataset');
const Notification = require('./models/Notification');

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    console.log('[Seed]: Cleaning existing database records...');
    await User.deleteMany({});
    await ResearchPaper.deleteMany({});
    await Policy.deleteMany({});
    await Dataset.deleteMany({});
    await Notification.deleteMany({});

    console.log('[Seed]: Creating official government accounts...');
    
    // 1. Create Users
    const users = await User.create([
      {
        name: 'Praveen',
        email: 'praveen@geopolicy.gov.in',
        password: 'password123',
        role: 'Super Admin',
        designation: 'Super Administrator & Chief Technology Director',
        organization: 'Ministry of Rural Development & Department of Land Resources',
        state: 'National Jurisdiction',
        bio: 'Full platform management, user administration, dataset moderation, and national spatial analytics.'
      },
      {
        name: 'Srinithi',
        email: 'srinithi@iitd.ac.in',
        password: 'password123',
        role: 'Researcher',
        designation: 'Lead Spatial Analyst & ICSSR Research Fellow',
        organization: 'Indian Institute of Technology (IIT) Delhi',
        state: 'Delhi (National)',
        bio: 'Conducting empirical research on cadastral modernization, drone photogrammetry, and agricultural tenure equity.'
      },
      {
        name: 'Yuvarani',
        email: 'yuvarani@karnataka.gov.in',
        password: 'password123',
        role: 'Policymaker',
        designation: 'Principal Policy Advisor, Land Governance Board',
        organization: 'Department of Revenue & Land Reforms, Govt of Karnataka',
        state: 'Karnataka',
        bio: 'Drafting conclusive titling frameworks, legislative ordinances, and digital registry automation policies.'
      },
      {
        name: 'Santhosh Ram',
        email: 'santhosh.ram@nic.in',
        password: 'password123',
        role: 'Government Official',
        designation: 'Joint Secretary, IAS - Land Digitization Board',
        organization: 'Department of Land Resources, Ministry of Rural Development',
        state: 'National',
        bio: 'Overseeing DILRMP rollout, ULPIN parcel allocations, and publication clearances across 28 states.'
      },
      {
        name: 'Udaya Keerthi',
        email: 'udayakeerthi@gmail.com',
        password: 'password123',
        role: 'Citizen',
        designation: 'Agricultural Landholder & Citizen Advocate',
        organization: 'Self / Kisan Land Rights Council',
        state: 'Tamil Nadu / Gujarat',
        bio: 'Accessing public land records, exploring district GIS layers, and tracking ULPIN property verification.'
      }
    ]);

    const adminUser = users[0];
    const researcherUser = users[1];
    const policyUser = users[2];

    console.log('[Seed]: Creating Rich Case Studies and Research Papers across 5 Core Domains...');
    const curatedPapers = [
      // ─── GIS & REMOTE SENSING ──────────────────────────────────────────────────
      {
        title: 'Case Study: CORS-Enabled Drone Photogrammetry in SVAMITVA Village Resurvey',
        abstract: 'Comprehensive evaluation of high-resolution drone orthophotos mapped at 1:1,000 spatial accuracy across 50,000 Gram Panchayat villages under SVAMITVA. Demonstrates a 44% reduction in boundary disputes and sub-5cm spatial precision for rural abadi property cards.',
        author: 'Dr. Aruna Swaminathan & Survey of India Team',
        authorId: researcherUser._id,
        category: 'GIS & Remote Sensing',
        institution: 'IIT Delhi',
        tags: ['GIS & Remote Sensing', 'Drone', 'CORS', 'SVAMITVA', 'Survey of India', 'Cadastre'],
        doi: '10.1016/j.spatialgov.2025.04',
        publicationDate: new Date('2025-04-15'),
        status: 'Published'
      },
      {
        title: 'Case Study: ISRO Bhuvan Satellite LULC Classification for Urban Expansion Tracking',
        abstract: '10-meter Sentinel & IRS multi-spectral satellite imagery classification tracking built-up expansion across tier-1 and tier-2 Indian metropolitan corridors. Evaluates land cover shifts between agricultural cropland, forest canopy, and urban footprints.',
        author: 'Dr. K. Radhakrishnan & SAC Research Team',
        authorId: researcherUser._id,
        category: 'GIS & Remote Sensing',
        institution: 'Survey of India',
        tags: ['GIS & Remote Sensing', 'Bhuvan', 'ISRO', 'LULC', 'Remote Sensing', 'Satellite'],
        doi: '10.1016/j.isro.bhuvan.2025.11',
        publicationDate: new Date('2025-11-20'),
        status: 'Published'
      },

      // ─── AGRICULTURAL POLICY ────────────────────────────────────────────────────
      {
        title: 'Case Study: Institutional Credit Acceleration via Digital PATTA-RoR Linking under PM-KISAN',
        abstract: 'Empirical evaluation of 1.2 million agricultural landholders demonstrating a 38% increase in formal bank credit access following digital 14-digit ULPIN-Patta synchronization across revenue districts.',
        author: 'Dr. Ramesh Sundaram & Prof. Meera Nair',
        authorId: researcherUser._id,
        category: 'Agricultural Policy',
        institution: 'ICSSR',
        tags: ['Agricultural Policy', 'Patta', 'RoR', 'PM-KISAN', 'Credit Liquidity', 'ULPIN'],
        doi: '10.1016/j.landuse.2024.01',
        publicationDate: new Date('2024-01-10'),
        status: 'Published'
      },
      {
        title: 'Case Study: Tenant Farmer Security & Digital Tenancy Passbook Reforms in Telangana Dharani',
        abstract: 'Investigates digital tenant registration passbooks granting institutional micro-credit and crop insurance eligibility without altering underlying title ownership in Telangana revenue courts.',
        author: 'Dr. Srinivas Rao & NIRDPR Taskforce',
        authorId: researcherUser._id,
        category: 'Agricultural Policy',
        institution: 'NIRDPR Hyderabad',
        tags: ['Agricultural Policy', 'Dharani', 'Tenancy', 'Passbook', 'Land Rights', 'Telangana'],
        doi: '10.1016/j.agripolicy.2026.02',
        publicationDate: new Date('2026-02-18'),
        status: 'Published'
      },
      // ─── LAND GOVERNANCE ─────────────────────────────────────────────────────
      {
        title: 'National Evaluation of Digital Land Governance Reforms: Single-Window Sub-Registrar API Auto-Mutation',
        abstract: 'Comprehensive policy evaluation across Karnataka (Bhoomi 2.0 & Kaveri 2.0), Maharashtra (Mahabhulekh), Tamil Nadu (Tamil Nilam), and Telangana (Dharani). Evaluates real-time API triggers between Sub-Registrar Offices (SROs) and Revenue Tahsildar offices, achieving a 92.4% reduction in manual mutation backlogs.',
        author: 'Dr. Praveen Kumar, IAS & NIRDPR Research Board',
        authorId: adminUser._id,
        category: 'Land Governance',
        institution: 'LBSNAA Mussoorie',
        tags: ['Land Governance', 'Auto-Mutation', 'SRO Integration', 'Bhoomi', 'Kaveri 2.0', 'Revenue Board'],
        doi: '10.1016/j.landgov.2026.01',
        publicationDate: new Date('2026-01-15'),
        status: 'Published'
      },
      {
        title: 'State-Wide Patta, Chitta & RoR Digital Signature Verification & QR Code Checksum Protocols',
        abstract: 'Evaluates cryptographic 256-bit SHA e-Sign digital signatures and QR code verification protocols on Patta, Chitta, 7/12 Extracts, and RTC land records. Demonstrates 99.8% detection accuracy against forged/fake land documents in public land transactions.',
        author: 'Dr. Aruna Swaminathan & DoLR Advisory Cell',
        authorId: researcherUser._id,
        category: 'Land Governance',
        institution: 'IIT Delhi',
        tags: ['Land Governance', 'Patta', 'Chitta', 'Document Verification', 'Original vs Fake', 'e-Sign'],
        doi: '10.1016/j.landauth.2025.10',
        publicationDate: new Date('2025-10-18'),
        status: 'Published'
      },
      {
        title: 'Governance of Fallow Agricultural Land: Transfer Chain Auditability & Revenue Tribunal Litigation Reduction',
        abstract: 'Empirical audit of 85,000 fallow land parcels examining ownership transfer chains, uncultivated land conversion permits, and partition dispute litigation reduction across rural revenue divisions.',
        author: 'Prof. Ramesh Sundaram & ICSSR Taskforce',
        authorId: researcherUser._id,
        category: 'Land Governance',
        institution: 'ICSSR',
        tags: ['Land Governance', 'Fallow Land', 'Transfer Chain', 'Dispute Hotspot', 'Revenue Court', 'Litigation'],
        doi: '10.1016/j.fallowgov.2025.07',
        publicationDate: new Date('2025-07-22'),
        status: 'Published'
      },

      // ─── CLIMATE RESILIENCE ────────────────────────────────────────────────────
      {
        title: 'Case Study: Climate-Resilient Floodplain Zoning & Tenancy Rights in the Cauvery Delta',
        abstract: 'GIS mapping of 200m high-water mark inundation zones and flood-vulnerable agricultural tenancy parcels along the Cauvery river basin, establishing statutory construction restrictions.',
        author: 'Dr. Ananya Sen & TISS Climate Cell',
        authorId: researcherUser._id,
        category: 'Climate Resilience',
        institution: 'ICSSR',
        tags: ['Climate Resilience', 'Floodplain', 'Cauvery', 'Riparian', 'Hazard', 'Tenancy'],
        doi: '10.1016/j.climate.land.2025.08',
        publicationDate: new Date('2025-08-05'),
        status: 'Published'
      },
      {
        title: 'Case Study: Himalayan Landslide Vulnerability & High-Altitude Cadastral Relocation',
        abstract: 'High-altitude slope stability modeling in Himachal Pradesh and Uttarakhand identifying 428,000 sq km of vulnerable cadastral plots and formulating resettlement guidelines.',
        author: 'Dr. Himanshu Joshi & Wadia Institute',
        authorId: researcherUser._id,
        category: 'Climate Resilience',
        institution: 'IIT Delhi',
        tags: ['Climate Resilience', 'Himalayan', 'Landslide', 'Geodesy', 'Relocation', 'Slope'],
        doi: '10.1016/j.himalaya.geo.2024.12',
        publicationDate: new Date('2024-12-01'),
        status: 'Published'
      },

      // ─── URBAN PLANNING ─────────────────────────────────────────────────────────
      {
        title: 'Case Study: Value Capture Finance & Peri-Urban Land Pooling along Bengaluru-Chennai Corridor',
        abstract: 'Evaluates land pooling algorithms, commercial zoning betterment levies, and Transit-Oriented Development (TOD) land assembly along national highway corridors.',
        author: 'Yuvarani & NIUA Urban Research Group',
        authorId: policyUser._id,
        category: 'Urban Planning',
        institution: 'NIUA',
        tags: ['Urban Planning', 'Land Pooling', 'TOD', 'Betterment Levy', 'Corridor', 'Karnataka'],
        doi: '10.1016/j.urbanplan.2025.09',
        publicationDate: new Date('2025-09-14'),
        status: 'Published'
      },
      {
        title: 'Case Study: Transit Corridor Zoning & TOD Land Assembly in Mumbai Metropolitan Region',
        abstract: 'Spatial zoning models evaluating commercial FAR incentives and developer land assembly around suburban transit hubs in MMRDA.',
        author: 'Dr. Vikramaditya Rao',
        authorId: researcherUser._id,
        category: 'Urban Planning',
        institution: 'NIUA',
        tags: ['Urban Planning', 'Mumbai', 'Transit', 'FAR', 'Master Plan', 'Maharashtra'],
        doi: '10.1016/j.mmrda.plan.2026.01',
        publicationDate: new Date('2026-01-22'),
        status: 'Published'
      },

      // ─── PROPERTY RIGHTS & CONCLUSIVE TITLING ──────────────────────────────────
      {
        title: 'Case Study: Transitioning from Presumptive to Conclusive Titling: Empirical Evidence from Bhoomi 2.0',
        abstract: 'Comparative assessment of legal title guarantees, indemnity funds, and title dispute reduction across 31 districts of Karnataka under Bhoomi 2.0.',
        author: 'Praveen & Govt of Karnataka Land Board',
        authorId: adminUser._id,
        category: 'Property Rights',
        institution: 'LBSNAA Mussoorie',
        tags: ['Property Rights', 'Conclusive Titling', 'Bhoomi', 'RoR', 'Indemnity', 'Karnataka'],
        doi: '10.1016/j.titling.2024.06',
        publicationDate: new Date('2024-06-30'),
        status: 'Published'
      },
      {
        title: 'Case Study: ULPIN 14-Digit Parcel Locking & Encumbrance Fraud Eradication in Gujarat AnyROR',
        abstract: 'Analyzes how mandatory 14-digit Bhu-Aadhaar parcel geo-tagging eliminated 78.6% of duplicate land deed pledges in sub-registrar offices across Gujarat.',
        author: 'Santhosh Ram, IAS & DoLR Cell',
        authorId: adminUser._id,
        category: 'Property Rights',
        institution: 'LBSNAA Mussoorie',
        tags: ['Property Rights', 'ULPIN', 'Bhu-Aadhaar', 'Encumbrance', 'AnyROR', 'Gujarat'],
        doi: '10.1016/j.ulpin.anyror.2025.03',
        publicationDate: new Date('2025-03-12'),
        status: 'Published'
      },
      {
        title: 'Case Study: Forest Rights Act (FRA 2006) Community Land Titling & Tribal Governance in Odisha',
        abstract: 'Field survey evaluating 18,000 IFR and CFR titles granted to tribal forest dwellers using handheld Differential GPS (DGPS) and Gram Sabha verification.',
        author: 'Udaya Keerthi & TISS Tribal Rights Cell',
        authorId: researcherUser._id,
        category: 'Property Rights',
        institution: 'ICSSR',
        tags: ['Property Rights', 'Forest Rights', 'FRA 2006', 'Community Title', 'Tribal', 'Odisha'],
        doi: '10.1016/j.fra.tribal.2024.11',
        publicationDate: new Date('2024-11-05'),
        status: 'Published'
      }
    ];

    // Expand with additional 500 generated records for pagination scale
    for (let i = 1; i <= 500; i++) {
      curatedPapers.push({
        title: `Empirical Spatial Study on Regional Cadastral Systems (Phase ${i})`,
        abstract: `Longitudinal analysis of cadastral survey modernization, ULPIN parcel identification, and civil dispute resolution in district ${i}.`,
        author: `Dr. Analyst ${i}`,
        authorId: researcherUser._id,
        category: i % 5 === 0 ? 'GIS & Remote Sensing' : i % 5 === 1 ? 'Agricultural Policy' : i % 5 === 2 ? 'Climate Resilience' : i % 5 === 3 ? 'Urban Planning' : 'Property Rights',
        institution: i % 2 === 0 ? 'IIT Delhi' : 'NIRDPR Hyderabad',
        tags: ['Land Governance', 'Empirical Study', 'Cadastre'],
        status: 'Published'
      });
    }

    await ResearchPaper.insertMany(curatedPapers);

    console.log('[Seed]: Creating Policy Documents...');
    const bulkPolicies = [];
    for(let i=0; i<4000; i++) {
      bulkPolicies.push({
        title: `State Land Policy Directive ${i}`,
        description: `Regulatory framework ${i} for digitized land parcel management and zoning reform.`,
        state: 'National',
        jurisdiction: 'State',
        category: 'Zoning & Master Planning',
        status: 'Active',
        authorId: policyUser._id
      });
    }
    await Policy.insertMany(bulkPolicies);

    console.log('[Seed]: Creating 25 Comprehensive Spatial Datasets...');
    const datasetsList = [
      {
        title: 'High-Resolution National Cadastral Boundary Vectors (ULPIN Layer)',
        description: 'Vector polygon dataset containing 34 million verified land parcel boundaries mapped at 1:1,000 spatial accuracy using high-altitude drone photogrammetry under the Bhu-Aadhaar ULPIN program.',
        format: 'GeoJSON', category: 'Cadastral Maps', spatialCoverage: 'Pan-India Coverage', fileSize: '1.2 GB', provider: 'National Spatial Data Infrastructure & DoLR', downloadCount: 1420, license: 'Open Government Data License (OGDL)', authorId: adminUser._id
      },
      {
        title: 'Sentinel-2 Multi-Spectral Land Cover & Agricultural Seasonality Matrix',
        description: '10-meter raster dataset capturing cropping intensity, seasonal fallow land shifts, and surface moisture levels for climate resilience and policy modeling.',
        format: 'GeoTIFF', category: 'Land Use & Cover', spatialCoverage: 'Western & Southern Belts', fileSize: '4.8 GB', provider: 'ISRO Bhuvan Geoportal', downloadCount: 980, license: 'OGDL-India Public Domain', authorId: adminUser._id
      },
      {
        title: 'District Land Dispute Civil Pendency & Encumbrance Heatmap (2020-2026)',
        description: 'Tabular econometric dataset mapping district-level title litigation counts, average resolution turnaround days, and encumbrance dispute drop rates across 800+ districts.',
        format: 'CSV', category: 'Legal & Disputes', spatialCoverage: '28 States & 8 UTs', fileSize: '45 MB', provider: 'Department of Justice & DoLR', downloadCount: 2310, license: 'Government Open Data', authorId: adminUser._id
      },
      {
        title: 'SVAMITVA Rural Abadi Village Parcel Orthophotos & Spatial Polygons',
        description: 'Sub-5cm precision drone orthophotos and property card vector boundaries covering 2,50,000 rural villages mapped under SVAMITVA.',
        format: 'Shapefile', category: 'Drone Photogrammetry', spatialCoverage: 'UP, MP, Maharashtra, Haryana', fileSize: '8.5 GB', provider: 'Survey of India & Ministry of Panchayati Raj', downloadCount: 3120, license: 'Government Restricted Research License', authorId: adminUser._id
      },
      {
        title: 'CORS Geodesy Station Network Reference Grid for India',
        description: 'Spatial point coordinates and real-time kinematic (RTK) geodetic reference vectors for Continuous Operating Reference Stations across India.',
        format: 'GeoJSON', category: 'Geodesy & Survey', spatialCoverage: 'National CORS Grid', fileSize: '12 MB', provider: 'Survey of India', downloadCount: 1890, license: 'OGDL', authorId: adminUser._id
      },
      {
        title: 'Tamil Nadu Patta Pass Book & Revenue Village Boundary Vectors',
        description: 'High-resolution FMS vector sketches synchronized with Tamil Nilam digital database covering 38 districts of Tamil Nadu.',
        format: 'GeoJSON', category: 'Cadastral Maps', spatialCoverage: 'Tamil Nadu State', fileSize: '650 MB', provider: 'Tamil Nadu Revenue & Disaster Management Dept', downloadCount: 2450, license: 'State Open Data', authorId: adminUser._id
      },
      {
        title: 'Karnataka Bhoomi 2.0 Auto-Mutation Parcels & RTC Database',
        description: 'Spatial vector boundaries mapped with electronic Record of Rights, Tenancy and Crops (RTC) identifiers across 31 districts of Karnataka.',
        format: 'Shapefile', category: 'Land Records', spatialCoverage: 'Karnataka State', fileSize: '1.8 GB', provider: 'Department of Revenue, Govt of Karnataka', downloadCount: 3100, license: 'OGDL', authorId: adminUser._id
      },
      {
        title: 'Himalayan Landslide & High-Altitude Slope Cadastral Vulnerability',
        description: 'Geospatial hazard vector layer combining slope instability, cadastral parcel displacement, and high-altitude soil erosion metrics.',
        format: 'KML', category: 'Climate & Hazard', spatialCoverage: 'Himachal Pradesh & Uttarakhand', fileSize: '340 MB', provider: 'Wadia Institute of Himalayan Geology & ISRO', downloadCount: 1120, license: 'Academic Research License', authorId: adminUser._id
      },
      {
        title: 'Cauvery River Basin Floodplain Zoning & Riparian Tenancy Vector Layer',
        description: 'Multi-temporal floodplain high-water mark polygons and agricultural tenancy tenure boundaries along the Cauvery delta.',
        format: 'GeoJSON', category: 'Water & Tenancy', spatialCoverage: 'Cauvery Delta Region', fileSize: '520 MB', provider: 'Central Water Commission & TN PWD', downloadCount: 870, license: 'OGDL', authorId: adminUser._id
      },
      {
        title: 'Forest Rights Act (FRA) Individual & Community Forest Title Polygons',
        description: 'Spatial GIS layer demarcating IFR and CFR claim boundaries granted under the Scheduled Tribes & Other Traditional Forest Dwellers Act.',
        format: 'Shapefile', category: 'Forest Rights', spatialCoverage: 'Tribal Belts (Odisha, Jharkhand, Chhattisgarh)', fileSize: '780 MB', provider: 'Ministry of Tribal Affairs', downloadCount: 1650, license: 'OGDL', authorId: adminUser._id
      },
      {
        title: 'Peri-Urban Land Pooling & Transit Corridor Zoning (Bengaluru-Chennai)',
        description: 'High-density commercial zoning corridors, betterment levy boundaries, and land pooling layout vectors along national transit highways.',
        format: 'KML', category: 'Urban Planning', spatialCoverage: 'Bengaluru-Chennai Industrial Corridor', fileSize: '410 MB', provider: 'National Industrial Corridor Development Trust (NICDC)', downloadCount: 1430, license: 'Government Restricted', authorId: adminUser._id
      },
      {
        title: 'Coastal Regulation Zone (CRZ-I/II/III) Hazard Line & ESA Vectors',
        description: 'Ecologically Sensitive Areas (ESAs), mangrove buffers, and coastal hazard lines mapped under CRZ 2019 notification.',
        format: 'GeoJSON', category: 'Coastal Regulation', spatialCoverage: '7,516 km Indian Coastline', fileSize: '950 MB', provider: 'National Centre for Sustainable Coastal Management (NCSCM)', downloadCount: 1980, license: 'OGDL', authorId: adminUser._id
      },
      {
        title: 'Gujarat AnyRoR Revenue Land Survey Numbers & Block Parcel Geometries',
        description: 'Vector polygons of village land survey numbers linked with AnyRoR digital mutation status and encumbrance logs.',
        format: 'GeoJSON', category: 'Cadastral Maps', spatialCoverage: 'Gujarat State', fileSize: '1.4 GB', provider: 'Gujarat Revenue Department & NIC', downloadCount: 2890, license: 'State Open Data', authorId: adminUser._id
      },
      {
        title: 'Uttar Pradesh Gram Sabha Commons & Gaon Sabha Encroachment Vectors',
        description: 'Public common land parcels (pasture, pond, playground) mapped against revenue court eviction orders across UP districts.',
        format: 'CSV', category: 'Common Lands', spatialCoverage: 'Uttar Pradesh State', fileSize: '180 MB', provider: 'Board of Revenue, Uttar Pradesh', downloadCount: 1760, license: 'Government Open Data', authorId: adminUser._id
      },
      {
        title: 'PM Gati Shakti Infrastructure Corridor & Multi-Modal Freight Zones',
        description: 'GIS master plan vector layer integrating railway corridors, expressways, logistics parks, and industrial land bank parcels.',
        format: 'Shapefile', category: 'Infrastructure', spatialCoverage: 'Pan-India Master Plan', fileSize: '3.2 GB', provider: 'PM Gati Shakti NMP Portal & BISAG-N', downloadCount: 4210, license: 'Government Inter-Agency License', authorId: adminUser._id
      },
      {
        title: 'Soil Health & Desertification Degradation Risk Vectors (ISRO Bhuvan)',
        description: 'Raster and vector classification of salinization, waterlogging, topsoil loss, and desertification vulnerability.',
        format: 'GeoTIFF', category: 'Soil & Climate', spatialCoverage: 'Arid & Semi-Arid Zones', fileSize: '2.6 GB', provider: 'Space Applications Centre (SAC / ISRO)', downloadCount: 1340, license: 'OGDL', authorId: adminUser._id
      },
      {
        title: 'Sub-Registrar Office Encumbrance Certificate Transaction Log (2022-2026)',
        description: 'Anonymized transaction logs recording sale deeds, mortgage pledges, and lease registrations across major sub-registrar offices.',
        format: 'CSV', category: 'Land Transactions', spatialCoverage: 'Selected Tier-1 & Tier-2 Cities', fileSize: '320 MB', provider: 'Inspector General of Registration & Stamp Depts', downloadCount: 2150, license: 'Open Data', authorId: adminUser._id
      },
      {
        title: 'Telangana Dharani Portal Agri Land Survey Parcel Coordinates',
        description: 'Survey parcel polygons and auto-mutation passbook linkages covering agricultural holdings across Telangana.',
        format: 'GeoJSON', category: 'Cadastral Maps', spatialCoverage: 'Telangana State', fileSize: '890 MB', provider: 'Chief Commissioner of Land Administration, Telangana', downloadCount: 2670, license: 'OGDL', authorId: adminUser._id
      },
      {
        title: 'West Bengal Banglarbhumi Plot Khatian Boundary Geometries',
        description: 'Digital plot polygons linked with Khatian ownership records across 23 districts of West Bengal.',
        format: 'KML', category: 'Land Records', spatialCoverage: 'West Bengal State', fileSize: '1.1 GB', provider: 'Land & Land Reforms Dept, Govt of West Bengal', downloadCount: 1940, license: 'OGDL', authorId: adminUser._id
      },
      {
        title: 'Kerala Land Revenue Resurvey High-Accuracy DGPS Polygons',
        description: 'Differential GPS resurveyed cadastral parcel vectors generated under the Ente Bhoomi digital land resurvey project.',
        format: 'GeoJSON', category: 'Survey & Geodesy', spatialCoverage: 'Kerala State', fileSize: '740 MB', provider: 'Survey & Land Records Dept, Govt of Kerala', downloadCount: 2280, license: 'State Open Data', authorId: adminUser._id
      },
      {
        title: 'All-India Revenue Taluk & Village Administrative Boundary Hierarchy',
        description: 'Standardized OGC vector boundary collection covering State → District → Taluk → Revenue Village administrative limits.',
        format: 'Shapefile', category: 'Administrative Boundaries', spatialCoverage: 'Pan-India', fileSize: '1.5 GB', provider: 'Survey of India & Census of India', downloadCount: 5120, license: 'OGDL', authorId: adminUser._id
      },
      {
        title: 'Urban Land Value Capture & Commercial Betterment Levy Zoning Layer',
        description: 'Zoning polygons mapped with land valuation benchmark rates, stamp duty tiers, and transit value capture zones.',
        format: 'GeoJSON', category: 'Urban Finance', spatialCoverage: 'Metropolitan Development Authorities', fileSize: '480 MB', provider: 'National Institute of Urban Affairs (NIUA)', downloadCount: 1390, license: 'OGDL', authorId: adminUser._id
      },
      {
        title: 'Drought Stress Vulnerability & Groundwater Depletion Satellite Index',
        description: 'GRACE satellite & Sentinel-3 derived groundwater drawdown vectors and agricultural drought severity classifications.',
        format: 'GeoTIFF', category: 'Climate & Hydrology', spatialCoverage: 'Rainfed Agricultural Districts', fileSize: '3.1 GB', provider: 'Central Ground Water Board (CGWB) & ISRO', downloadCount: 1560, license: 'OGDL', authorId: adminUser._id
      },
      {
        title: 'National Highway Authority Corridor Land Acquisition Parcel Status',
        description: 'Linear corridor land acquisition polygons, compensation disbursement logs, and Section 3A/3D notification spatial vectors.',
        format: 'KML', category: 'Infrastructure & Acquisition', spatialCoverage: 'Bharatmala Expressway Corridors', fileSize: '620 MB', provider: 'National Highways Authority of India (NHAI)', downloadCount: 2840, license: 'Government Restricted', authorId: adminUser._id
      },
      {
        title: 'Special Economic Zone (SEZ) & Industrial Park Land Allotment Matrix',
        description: 'Industrial land bank parcel geometries, vacant plot availability, and manufacturing zone environmental clearances.',
        format: 'Shapefile', category: 'Industrial Land', spatialCoverage: 'Major State Industrial Development Corporations (SIDCs)', fileSize: '810 MB', provider: 'Department for Promotion of Industry and Internal Trade (DPIIT)', downloadCount: 1930, license: 'OGDL', authorId: adminUser._id
      }
    ];

    await Dataset.create(datasetsList);

    console.log('[Seed]: Successfully created 25 Spatial Datasets in MongoDB!');

    // 5. Create Notifications
    await Notification.create([
      {
        title: 'New Policy Reform Published',
        message: 'SVAMITVA 2.0 National Cadastral Titling Framework is now active across all state land revenue portals.',
        type: 'policy'
      },
      {
        title: 'Dataset Update Available',
        message: 'National Spatial Data Infrastructure released Q3 updated GeoJSON vector boundaries for Maharashtra.',
        type: 'dataset'
      },
      {
        title: 'Research Call for Proposals',
        message: 'Ministry of Land Resources invites evidence-based papers on AI in automated boundary adjudication.',
        type: 'paper'
      }
    ]);

    console.log('=======================================================');
    console.log(' GeoPolicy Nexus Seeding Completed Cleanly!');
    console.log('=======================================================');
    process.exit(0);

  } catch (err) {
    console.error('[Seed Error]:', err);
    process.exit(1);
  }
};

seedData();
