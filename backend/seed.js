const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const ResearchPaper = require('./models/ResearchPaper');
const Policy = require('./models/Policy');
const Dataset = require('./models/Dataset');
const Notification = require('./models/Notification');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/geopolicy_nexus');
    console.log('[Seed]: Connected to MongoDB...');

    // Clear existing collection records
    await User.deleteMany({});
    await ResearchPaper.deleteMany({});
    await Policy.deleteMany({});
    await Dataset.deleteMany({});
    await Notification.deleteMany({});

    console.log('[Seed]: Cleared existing database records...');

    // 1. Create Demo Users for each Role
    const users = await User.create([
      {
        name: 'Dr. Rajesh Sharma',
        email: 'admin@geopolicy.gov.in',
        password: 'password123',
        role: 'Admin',
        organization: 'Ministry of Land Resources & Rural Development',
        state: 'National',
        bio: 'Senior Director of Governance Infrastructure & Spatial Data Standards.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
      },
      {
        name: 'Praveen',
        email: 'praveen@geopolicy.gov.in',
        password: 'password123',
        role: 'Platform Administrator',
        organization: 'National Institute of Urban Affairs',
        state: 'Maharashtra',
        bio: 'Platform Administrator and Lead Spatial Analyst.',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150'
      },
      {
        name: 'Vikramaditya Rao',
        email: 'policy@geopolicy.gov.in',
        password: 'password123',
        role: 'Policymaker',
        organization: 'State Land Policy Board',
        state: 'Karnataka',
        bio: 'Principal Policy Advisor drafting land tenure reforms and digitized titling laws.',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
      },
      {
        name: 'Sunita Deshmukh',
        email: 'citizen@geopolicy.gov.in',
        password: 'password123',
        role: 'Citizen',
        organization: 'Civil Rights & Land Owner',
        state: 'Gujarat',
        bio: 'Property owner advocating for transparent digital record verifications.',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150'
      },
      {
        name: 'GeoSpatial Innovation Lab',
        email: 'institution@geopolicy.gov.in',
        password: 'password123',
        role: 'Institution',
        organization: 'Indian Council of Social Science Research',
        state: 'Delhi',
        bio: 'Institutional repository for drone-surveyed cadastral datasets and spatial policy simulations.',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150'
      }
    ]);

    console.log(`[Seed]: Created ${users.length} default users with pre-configured role access credentials.`);

    // 2. Create Research Papers
    const adminUser = users[0];
    const researcherUser = users[1];
    const institutionUser = users[4];

    await ResearchPaper.create([
      {
        title: 'Evaluating Blockchain-Enabled Cadastral Registries for Rural Property Rights',
        abstract: 'This study investigates the deployment of decentralized ledger technologies (DLT) for immutable land title management across 450 rural panchayats. Results demonstrate a 78% reduction in property disputes and 92% faster verification speed.',
        author: 'Praveen',
        authorId: researcherUser._id,
        category: 'Land Governance',
        tags: ['Blockchain', 'Cadastral Mapping', 'Rural Governance', 'Title Deed Security'],
        doi: '10.1016/j.geopol.2026.01.104',
        pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        citationCount: 42,
        status: 'Published'
      },
      {
        title: 'High-Resolution Drone Imagery and AI Segmentation in Urban Zoning Disputes',
        abstract: 'Integrating Convolutional Neural Networks with high-resolution UAV aerial imagery to automate encroachment detection in metropolitan corridors. Achieved 94.6% precision compared to manual field surveys.',
        author: 'GeoSpatial Innovation Lab',
        authorId: institutionUser._id,
        category: 'GIS & Remote Sensing',
        tags: ['Drone Remote Sensing', 'AI Computer Vision', 'Zoning Compliance', 'Urban Planning'],
        doi: '10.1016/j.geopol.2026.02.088',
        pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        citationCount: 29,
        status: 'Published'
      },
      {
        title: 'Climate Vulnerability Indexing for Coastal Agricultural Land Conversion',
        abstract: 'Assessing sea-level rise and soil salinity impacts on agricultural tenure in coastal ecosystems. Provides policy framework for managed retreat and adaptive land usage incentives.',
        author: 'Dr. Rajesh Sharma',
        authorId: adminUser._id,
        category: 'Climate Resilience',
        tags: ['Climate Adaptation', 'Agricultural Policy', 'Coastal Ecosystems', 'Spatial Vulnerability'],
        doi: '10.1016/j.geopol.2026.03.012',
        pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        citationCount: 18,
        status: 'Published'
      },
      {
        title: 'Gender-Disaggregated Land Tenure Governance in Forest Buffer Zones',
        abstract: 'Empirical analysis of joint title deeds and inheritance policy enforcement in community forest rights areas across central tribal belts.',
        author: 'Praveen',
        authorId: researcherUser._id,
        category: 'Property Rights',
        tags: ['Gender Equity', 'Forest Tenure', 'Community Rights', 'Land Rights'],
        doi: '10.1016/j.geopol.2026.04.055',
        pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        citationCount: 15,
        status: 'Published'
      }
    ]);

    console.log('[Seed]: Created sample Research Papers...');

    // 3. Create Policies
    const policyUser = users[2];

    await Policy.create([
      {
        title: 'National Digital Land Titling and Unique Parcel Identity Framework (SVAMITVA 2.0)',
        description: 'Mandates 14-digit Unique Land Parcel Identification Number (ULPIN) for all rural and peri-urban land holdings, standardizing geospatial coordinates and ownership titles nationwide.',
        state: 'National',
        jurisdiction: 'National',
        category: 'Digital Land Titling',
        status: 'Active',
        authorId: policyUser._id,
        impactMetrics: {
          citizensAffected: '120 Million+',
          efficiencyGain: '65%',
          transparencyScore: '98%'
        }
      },
      {
        title: 'Maharashtra Peri-Urban Transit-Oriented Zoning & Floor Space Index (FSI) Reform',
        description: 'Updated land conversion norms allowing mixed-use residential development along metro corridors, with mandatory 15% allocation for public green spaces and affordable housing.',
        state: 'Maharashtra',
        jurisdiction: 'State',
        category: 'Zoning & Master Planning',
        status: 'Active',
        authorId: policyUser._id,
        impactMetrics: {
          citizensAffected: '14.5 Million',
          efficiencyGain: '40%',
          transparencyScore: '91%'
        }
      },
      {
        title: 'Karnataka Digital Mortgage Registry and Instant Encumbrance Verification',
        description: 'Integrates commercial bank loan origination systems with online revenue department land records to eliminate fraudulent double-mortgaging of agricultural parcels.',
        state: 'Karnataka',
        jurisdiction: 'State',
        category: 'Tenure Security',
        status: 'Active',
        authorId: policyUser._id,
        impactMetrics: {
          citizensAffected: '6.2 Million',
          efficiencyGain: '85%',
          transparencyScore: '96%'
        }
      },
      {
        title: 'Gujarat Industrial Land Bank & Online Allotment Single-Window Act',
        description: 'Framework for GIS-tagged industrial parks with pre-cleared environmental permissions, enabling 72-hour lease allotments for clean technology manufacturing.',
        state: 'Gujarat',
        jurisdiction: 'State',
        category: 'Taxation & Valuation',
        status: 'Under Review',
        authorId: policyUser._id,
        impactMetrics: {
          citizensAffected: '800,000',
          efficiencyGain: '50%',
          transparencyScore: '93%'
        }
      }
    ]);

    console.log('[Seed]: Created sample Policy documents...');

    // 4. Create Datasets
    await Dataset.create([
      {
        title: 'High-Resolution National Cadastral Boundary Vectors (ULPIN Layer)',
        description: 'Vector polygon dataset containing 34 million verified land parcel boundaries mapped at 1:1,000 spatial accuracy using high-altitude drone photogrammetry.',
        format: 'GeoJSON',
        category: 'Cadastral Maps',
        spatialCoverage: 'Pan-India Coverage',
        fileSize: '1.2 GB',
        downloadUrl: 'https://geojson.org/',
        provider: 'National Spatial Data Infrastructure',
        authorId: adminUser._id,
        downloadCount: 1420,
        license: 'Open Government Data License (OGDL)'
      },
      {
        title: 'Sentinel-2 Multi-Spectral Land Cover & Agricultural Seasonality Matrix',
        description: '10-meter raster dataset capturing cropping intensity, seasonal fallow land shifts, and surface moisture levels for climate policy modeling.',
        format: 'GeoTIFF',
        category: 'Land Use & Cover',
        spatialCoverage: 'Western & Southern Belts',
        fileSize: '4.8 GB',
        downloadUrl: 'https://geojson.org/',
        provider: 'National Remote Sensing Centre',
        authorId: institutionUser._id,
        downloadCount: 890,
        license: 'Open Government Data License (OGDL)'
      },
      {
        title: 'Urban Heat Island and Canopy Density Metrics for Top 50 Smart Cities',
        description: 'Thermal infrared satellite derivations merged with street-level lidar scans to quantify tree canopy loss vs surface temperature elevation in dense urban zones.',
        format: 'Shapefile',
        category: 'Urban Density',
        spatialCoverage: 'Tier-1 & Tier-2 Metros',
        fileSize: '350 MB',
        downloadUrl: 'https://geojson.org/',
        provider: 'National Institute of Urban Affairs',
        authorId: researcherUser._id,
        downloadCount: 654,
        license: 'Creative Commons Attribution 4.0'
      }
    ]);

    console.log('[Seed]: Created sample Datasets...');

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

    console.log('[Seed]: Created sample Notifications...');
    console.log('[Seed]: Database seeding successfully finished!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

seedData();
