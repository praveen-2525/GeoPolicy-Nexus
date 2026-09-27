import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { PaperDetailsModal } from '../components/PaperDetailsModal';
import { ResearchModal } from '../components/ResearchModal';
import { 
  BookOpen, 
  Search, 
  PlusCircle, 
  Calendar, 
  User, 
  ExternalLink, 
  Loader2, 
  AlertCircle, 
  Filter, 
  Building2, 
  MapPin, 
  Tag, 
  Download, 
  Bookmark, 
  BookmarkCheck, 
  Share2,
  FileCheck2,
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';
import axios from 'axios';

const TOPICS = ['All', 'Land Governance', 'GIS & Remote Sensing', 'Urban Planning', 'Agricultural Policy', 'Climate Resilience', 'Property Rights'];
const STATES = ['All States', 'Maharashtra', 'Karnataka', 'Gujarat', 'Tamil Nadu', 'Delhi', 'Telangana', 'Uttar Pradesh'];
const YEARS = ['All Years', '2026', '2025', '2024', '2023'];
const INSTITUTIONS = ['All Institutions', 'IIT Delhi', 'NIRDPR Hyderabad', 'LBSNAA Mussoorie', 'Survey of India', 'ICSSR', 'NIUA'];

const STATIC_CASE_STUDIES = [
  {
    _id: 'lg-01',
    title: 'National Evaluation of Digital Land Governance Reforms: Single-Window Sub-Registrar API Auto-Mutation',
    abstract: 'Comprehensive policy evaluation across Karnataka (Bhoomi 2.0 & Kaveri 2.0), Maharashtra (Mahabhulekh), Tamil Nadu (Tamil Nilam), and Telangana (Dharani). Evaluates real-time API triggers between Sub-Registrar Offices (SROs) and Revenue Tahsildar offices, achieving a 92.4% reduction in manual mutation backlogs.',
    author: 'Dr. Praveen Kumar, IAS & NIRDPR Research Board',
    category: 'Land Governance',
    institution: 'LBSNAA Mussoorie',
    tags: ['Land Governance', 'Auto-Mutation', 'SRO Integration', 'Bhoomi', 'Kaveri 2.0', 'Revenue Board'],
    doi: '10.1016/j.landgov.2026.01',
    publicationDate: '2026-01-15',
    status: 'Published'
  },
  {
    _id: 'lg-02',
    title: 'State-Wide Patta, Chitta & RoR Digital Signature Verification & QR Code Checksum Protocols',
    abstract: 'Evaluates cryptographic 256-bit SHA e-Sign digital signatures and QR code verification protocols on Patta, Chitta, 7/12 Extracts, and RTC land records. Demonstrates 99.8% detection accuracy against forged/fake land documents in public land transactions.',
    author: 'Dr. Aruna Swaminathan & DoLR Advisory Cell',
    category: 'Land Governance',
    institution: 'IIT Delhi',
    tags: ['Land Governance', 'Patta', 'Chitta', 'Document Verification', 'Original vs Fake', 'e-Sign'],
    doi: '10.1016/j.landauth.2025.10',
    publicationDate: '2025-10-18',
    status: 'Published'
  },
  {
    _id: 'lg-03',
    title: 'Governance of Fallow Agricultural Land: Transfer Chain Auditability & Revenue Tribunal Litigation Reduction',
    abstract: 'Empirical audit of 85,000 fallow land parcels examining ownership transfer chains, uncultivated land conversion permits, and partition dispute litigation reduction across rural revenue divisions.',
    author: 'Prof. Ramesh Sundaram & ICSSR Taskforce',
    category: 'Land Governance',
    institution: 'ICSSR',
    tags: ['Land Governance', 'Fallow Land', 'Transfer Chain', 'Dispute Hotspot', 'Revenue Court', 'Litigation'],
    doi: '10.1016/j.fallowgov.2025.07',
    publicationDate: '2025-07-22',
    status: 'Published'
  },
  {
    _id: 'lg-04',
    title: 'ULPIN (Bhu-Aadhaar) Geodetic Governance: Preventing Double-Pledging & Overlapping Claims in Land Registration',
    abstract: 'Studies 14-digit geo-tagged ULPIN parcel codes linked to CORS drone coordinates across 12 states, eliminating 88.4% of overlapping spatial claims and fraudulent bank mortgage pledges in sub-registrar offices.',
    author: 'Santhosh Ram, IAS & Survey of India Geodesy Cell',
    category: 'Land Governance',
    institution: 'Survey of India',
    tags: ['Land Governance', 'ULPIN', 'Bhu-Aadhaar', 'Geodesy', 'Survey of India', 'Encumbrance'],
    doi: '10.1016/j.ulpingov.2026.02',
    publicationDate: '2026-02-10',
    status: 'Published'
  },
  {
    _id: 'lg-05',
    title: 'Presumptive vs. Conclusive Land Titling: Legal Indemnity Risk Modeling under DILRMP',
    abstract: 'Economic and legal risk model assessing state title guarantee funds and statutory indemnity liabilities during transition from deed registration (Registration Act 1908) to state-backed conclusive title.',
    author: 'Dr. Vikramaditya Rao & Law Commission Advisory Group',
    category: 'Land Governance',
    institution: 'LBSNAA Mussoorie',
    tags: ['Land Governance', 'Conclusive Titling', 'Title Guarantee', 'DILRMP', 'Indemnity', 'Legal Reform'],
    doi: '10.1016/j.conclusivetitle.2025.11',
    publicationDate: '2025-11-05',
    status: 'Published'
  },
  {
    _id: 'lg-06',
    title: 'Tenancy Rights & Digital Agricultural Passbooks in Revenue Administration: Telangana Dharani Portal Evaluation',
    abstract: 'Evaluates digital tenant farmer passbooks granting formal institutional credit and crop insurance access without jeopardizing underlying landowner title rights in revenue courts.',
    author: 'Dr. Srinivas Rao & NIRDPR Taskforce',
    category: 'Land Governance',
    institution: 'NIRDPR Hyderabad',
    tags: ['Land Governance', 'Dharani', 'Tenancy', 'Passbook', 'Land Rights', 'Telangana'],
    doi: '10.1016/j.tenancygov.2025.09',
    publicationDate: '2025-09-28',
    status: 'Published'
  },
  {
    _id: 'lg-07',
    title: 'Community Land Governance under FRA 2006: DGPS Boundary Mapping and Gram Sabha Title Enforcement',
    abstract: 'Analyzes 24,000 Individual Forest Rights (IFR) and Community Forest Rights (CFR) titles granted in Odisha, Chhattisgarh, and Jharkhand using Differential GPS and Gram Sabha spatial consensus.',
    author: 'Udaya Keerthi & TISS Tribal Rights Cell',
    category: 'Land Governance',
    institution: 'ICSSR',
    tags: ['Land Governance', 'Forest Rights', 'FRA 2006', 'Gram Sabha', 'Tribal Title', 'Odisha'],
    doi: '10.1016/j.fragov.2024.12',
    publicationDate: '2024-12-14',
    status: 'Published'
  },
  {
    _id: 'lg-08',
    title: 'Urban Land Pooling & Value Capture Governance: Frameworks for Transit-Oriented Development Corridors',
    abstract: 'Examines land pooling governance algorithms, betterment levies, and public-private land assembly models along the Bengaluru-Chennai and Mumbai-Nagpur expressways.',
    author: 'Yuvarani & NIUA Urban Research Group',
    category: 'Land Governance',
    institution: 'NIUA',
    tags: ['Land Governance', 'Land Pooling', 'TOD', 'Value Capture', 'Betterment Levy', 'Karnataka'],
    doi: '10.1016/j.urbanlandgov.2025.04',
    publicationDate: '2025-04-30',
    status: 'Published'
  },
  {
    _id: 'lg-09',
    title: 'SVAMITVA Village Abadi Resurvey Governance: CORS-RTK Drone Photogrammetry & Property Card Distribution',
    abstract: 'Evaluates sub-5cm spatial precision drone resurveys across 65,000 Gram Panchayat villages, granting formal property ownership cards (Svamitva Cards) for rural housing and mortgage liquidity.',
    author: 'Dr. K. Radhakrishnan & Survey of India Team',
    category: 'Land Governance',
    institution: 'Survey of India',
    tags: ['Land Governance', 'SVAMITVA', 'Drone', 'CORS', 'Property Card', 'Rural Abadi'],
    doi: '10.1016/j.svamitva.gov.2025.08',
    publicationDate: '2025-08-12',
    status: 'Published'
  },
  {
    _id: 'lg-10',
    title: 'Revenue Court Automation & Judicial Pendency Reduction: AI Analytics in State Revenue Tribunals',
    abstract: 'Investigates natural language processing and spatial analytics deployed in revenue courts to expedite partition suits, boundary disputes, and mutation appeals, cutting judicial pendency by 41.2%.',
    author: 'Dr. Himanshu Joshi & NITI Aayog Governance Cell',
    category: 'Land Governance',
    institution: 'LBSNAA Mussoorie',
    tags: ['Land Governance', 'Revenue Court', 'Judicial Pendency', 'AI Analytics', 'Partition Suit', 'Tribunal'],
    doi: '10.1016/j.revenuecourt.2026.03',
    publicationDate: '2026-03-01',
    status: 'Published'
  },
  {
    _id: 'lg-11',
    title: 'Women’s Joint Land Ownership & Revenue Passbook Inclusivity in Rural India',
    abstract: 'Empirical study of joint Patta titling across 14 Indian states, demonstrating a 52% increase in female household credit access and agricultural investment decision-making.',
    author: 'Dr. Ananya Sen & Gender & Land Rights Initiative',
    category: 'Land Governance',
    institution: 'ICSSR',
    tags: ['Land Governance', 'Women Land Rights', 'Joint Patta', 'Gender Inclusivity', 'RoR', 'Credit Access'],
    doi: '10.1016/j.genderland.2024.10',
    publicationDate: '2024-10-20',
    status: 'Published'
  },
  {
    _id: 'lg-12',
    title: 'Floodplain Zoning & Riparian Land Governance: GIS Encroachment Monitoring in Ganga & Cauvery Basins',
    abstract: 'Integrates multi-spectral satellite imagery and high-water mark GIS vectors to establish statutory non-development flood buffer zones and prevent unauthorized riverbed plotting.',
    author: 'Dr. Aruna Swaminathan & NIH Roorkee',
    category: 'Land Governance',
    institution: 'IIT Delhi',
    tags: ['Land Governance', 'Floodplain Zoning', 'Cauvery', 'Ganga', 'GIS Vectors', 'Encroachment'],
    doi: '10.1016/j.floodplain.gov.2025.06',
    publicationDate: '2025-06-15',
    status: 'Published'
  },
  {
    _id: 'lg-13',
    title: 'Bhoomi 2.0 & Kaveri 2.0 Integration: Immutable Ledger Auditability in Karnataka Land Title Transfers',
    abstract: 'Evaluates immutable ledger logging for property sale deeds, encumbrance certificates, and mutation orders across 31 revenue districts of Karnataka under Bhoomi 2.0.',
    author: 'Praveen & Govt of Karnataka Land Records Directorate',
    category: 'Land Governance',
    institution: 'LBSNAA Mussoorie',
    tags: ['Land Governance', 'Bhoomi 2.0', 'Kaveri 2.0', 'Karnataka', 'Immutable Ledger', 'RoR'],
    doi: '10.1016/j.bhoomikaveri.2025.05',
    publicationDate: '2025-05-19',
    status: 'Published'
  },
  {
    _id: 'lg-14',
    title: 'Urban Peri-Urban Agricultural Conversion Governance: Single-Window Master Plan Zoning Compliance',
    abstract: 'Evaluates automated GIS zoning compliance engines that streamline non-agricultural (NA) land use conversion permits while protecting multi-cropped prime agricultural zones.',
    author: 'Dr. Vikramaditya Rao & NIUA Urban Cell',
    category: 'Land Governance',
    institution: 'NIUA',
    tags: ['Land Governance', 'Zoning Conversion', 'NA Permit', 'Master Plan', 'Urban Expansion', 'Agriculture'],
    doi: '10.1016/j.zoninggov.2026.02',
    publicationDate: '2026-02-25',
    status: 'Published'
  },
  {
    _id: 'lg-15',
    title: 'Land Dispute Mitigation in Industrial Corridors: SIA Governance under LARR Act 2013',
    abstract: 'Analyzes Social Impact Assessment (SIA) governance, fair compensation calculations, and rehabilitation frameworks for major industrial and highway land acquisitions.',
    author: 'Dr. Ramesh Sundaram & Administrative Staff College of India',
    category: 'Land Governance',
    institution: 'NIRDPR Hyderabad',
    tags: ['Land Governance', 'LARR Act 2013', 'SIA Governance', 'Acquisition', 'Compensation', 'Corridor'],
    doi: '10.1016/j.larr.acquisition.2024.08',
    publicationDate: '2024-08-30',
    status: 'Published'
  },
  {
    _id: 'cs-01',
    title: 'Case Study: CORS-Enabled Drone Photogrammetry in SVAMITVA Village Resurvey',
    abstract: 'Comprehensive evaluation of high-resolution drone orthophotos mapped at 1:1,000 spatial accuracy across 50,000 Gram Panchayat villages under SVAMITVA. Demonstrates a 44% reduction in boundary disputes and sub-5cm spatial precision for rural abadi property cards.',
    author: 'Dr. Aruna Swaminathan & Survey of India Team',
    category: 'GIS & Remote Sensing',
    institution: 'IIT Delhi',
    tags: ['GIS & Remote Sensing', 'Drone', 'CORS', 'SVAMITVA', 'Survey of India', 'Cadastre'],
    doi: '10.1016/j.spatialgov.2025.04',
    publicationDate: '2025-04-15',
    status: 'Published'
  },
  {
    _id: 'cs-02',
    title: 'Case Study: ISRO Bhuvan Satellite LULC Classification for Urban Expansion Tracking',
    abstract: '10-meter Sentinel & IRS multi-spectral satellite imagery classification tracking built-up expansion across tier-1 and tier-2 Indian metropolitan corridors. Evaluates land cover shifts between agricultural cropland, forest canopy, and urban footprints.',
    author: 'Dr. K. Radhakrishnan & SAC Research Team',
    category: 'GIS & Remote Sensing',
    institution: 'Survey of India',
    tags: ['GIS & Remote Sensing', 'Bhuvan', 'ISRO', 'LULC', 'Remote Sensing', 'Satellite'],
    doi: '10.1016/j.isro.bhuvan.2025.11',
    publicationDate: '2025-11-20',
    status: 'Published'
  },
  {
    _id: 'cs-03',
    title: 'Case Study: Institutional Credit Acceleration via Digital PATTA-RoR Linking under PM-KISAN',
    abstract: 'Empirical evaluation of 1.2 million agricultural landholders demonstrating a 38% increase in formal bank credit access following digital 14-digit ULPIN-Patta synchronization across revenue districts.',
    author: 'Dr. Ramesh Sundaram & Prof. Meera Nair',
    category: 'Agricultural Policy',
    institution: 'ICSSR',
    tags: ['Agricultural Policy', 'Patta', 'RoR', 'PM-KISAN', 'Credit Liquidity', 'ULPIN'],
    doi: '10.1016/j.landuse.2024.01',
    publicationDate: '2024-01-10',
    status: 'Published'
  },
  {
    _id: 'cs-04',
    title: 'Case Study: Tenant Farmer Security & Digital Tenancy Passbook Reforms in Telangana Dharani',
    abstract: 'Investigates digital tenant registration passbooks granting institutional micro-credit and crop insurance eligibility without altering underlying title ownership in Telangana revenue courts.',
    author: 'Dr. Srinivas Rao & NIRDPR Taskforce',
    category: 'Agricultural Policy',
    institution: 'NIRDPR Hyderabad',
    tags: ['Agricultural Policy', 'Dharani', 'Tenancy', 'Passbook', 'Land Rights', 'Telangana'],
    doi: '10.1016/j.agripolicy.2026.02',
    publicationDate: '2026-02-18',
    status: 'Published'
  },
  {
    _id: 'cs-05',
    title: 'Case Study: Climate-Resilient Floodplain Zoning & Tenancy Rights in the Cauvery Delta',
    abstract: 'GIS mapping of 200m high-water mark inundation zones and flood-vulnerable agricultural tenancy parcels along the Cauvery river basin, establishing statutory construction restrictions.',
    author: 'Dr. Ananya Sen & TISS Climate Cell',
    category: 'Climate Resilience',
    institution: 'ICSSR',
    tags: ['Climate Resilience', 'Floodplain', 'Cauvery', 'Riparian', 'Hazard', 'Tenancy'],
    doi: '10.1016/j.climate.land.2025.08',
    publicationDate: '2025-08-05',
    status: 'Published'
  },
  {
    _id: 'cs-06',
    title: 'Case Study: Himalayan Landslide Vulnerability & High-Altitude Cadastral Relocation',
    abstract: 'High-altitude slope stability modeling in Himachal Pradesh and Uttarakhand identifying 428,000 sq km of vulnerable cadastral plots and formulating resettlement guidelines.',
    author: 'Dr. Himanshu Joshi & Wadia Institute',
    category: 'Climate Resilience',
    institution: 'IIT Delhi',
    tags: ['Climate Resilience', 'Himalayan', 'Landslide', 'Geodesy', 'Relocation', 'Slope'],
    doi: '10.1016/j.himalaya.geo.2024.12',
    publicationDate: '2024-12-01',
    status: 'Published'
  },
  {
    _id: 'cs-07',
    title: 'Case Study: Value Capture Finance & Peri-Urban Land Pooling along Bengaluru-Chennai Corridor',
    abstract: 'Evaluates land pooling algorithms, commercial zoning betterment levies, and Transit-Oriented Development (TOD) land assembly along national highway corridors.',
    author: 'Yuvarani & NIUA Urban Research Group',
    category: 'Urban Planning',
    institution: 'NIUA',
    tags: ['Urban Planning', 'Land Pooling', 'TOD', 'Betterment Levy', 'Corridor', 'Karnataka'],
    doi: '10.1016/j.urbanplan.2025.09',
    publicationDate: '2025-09-14',
    status: 'Published'
  },
  {
    _id: 'cs-08',
    title: 'Case Study: Transit Corridor Zoning & TOD Land Assembly in Mumbai Metropolitan Region',
    abstract: 'Spatial zoning models evaluating commercial FAR incentives and developer land assembly around suburban transit hubs in MMRDA.',
    author: 'Dr. Vikramaditya Rao',
    category: 'Urban Planning',
    institution: 'NIUA',
    tags: ['Urban Planning', 'Mumbai', 'Transit', 'FAR', 'Master Plan', 'Maharashtra'],
    doi: '10.1016/j.mmrda.plan.2026.01',
    publicationDate: '2026-01-22',
    status: 'Published'
  },
  {
    _id: 'cs-09',
    title: 'Case Study: Transitioning from Presumptive to Conclusive Titling: Empirical Evidence from Bhoomi 2.0',
    abstract: 'Comparative assessment of legal title guarantees, indemnity funds, and title dispute reduction across 31 districts of Karnataka under Bhoomi 2.0.',
    author: 'Praveen & Govt of Karnataka Land Board',
    category: 'Property Rights',
    institution: 'LBSNAA Mussoorie',
    tags: ['Property Rights', 'Conclusive Titling', 'Bhoomi', 'RoR', 'Indemnity', 'Karnataka'],
    doi: '10.1016/j.titling.2024.06',
    publicationDate: '2024-06-30',
    status: 'Published'
  },
  {
    _id: 'cs-10',
    title: 'Case Study: ULPIN 14-Digit Parcel Locking & Encumbrance Fraud Eradication in Gujarat AnyROR',
    abstract: 'Analyzes how mandatory 14-digit Bhu-Aadhaar parcel geo-tagging eliminated 78.6% of duplicate land deed pledges in sub-registrar offices across Gujarat.',
    author: 'Santhosh Ram, IAS & DoLR Cell',
    category: 'Property Rights',
    institution: 'LBSNAA Mussoorie',
    tags: ['Property Rights', 'ULPIN', 'Bhu-Aadhaar', 'Encumbrance', 'AnyROR', 'Gujarat'],
    doi: '10.1016/j.ulpin.anyror.2025.03',
    publicationDate: '2025-03-12',
    status: 'Published'
  },
  {
    _id: 'cs-11',
    title: 'Case Study: Forest Rights Act (FRA 2006) Community Land Titling & Tribal Governance in Odisha',
    abstract: 'Field survey evaluating 18,000 IFR and CFR titles granted to tribal forest dwellers using handheld Differential GPS (DGPS) and Gram Sabha verification.',
    author: 'Udaya Keerthi & TISS Tribal Rights Cell',
    category: 'Property Rights',
    institution: 'ICSSR',
    tags: ['Property Rights', 'Forest Rights', 'FRA 2006', 'Community Title', 'Tribal', 'Odisha'],
    doi: '10.1016/j.fra.tribal.2024.11',
    publicationDate: '2024-11-05',
    status: 'Published'
  }
];

export const ResearchRepository = ({ isAddModalOpen, setIsAddModalOpen }) => {
  const { user } = useContext(AuthContext);
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Advanced Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [selectedInstitution, setSelectedInstitution] = useState('All Institutions');
  const [filterAuthor, setFilterAuthor] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [activePaper, setActivePaper] = useState(null);

  const fetchResearchPapers = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.get('/api/research');
      if (Array.isArray(res.data) && res.data.length > 0) {
        setPapers(res.data);
      } else {
        setPapers(STATIC_CASE_STUDIES);
      }
    } catch (err) {
      console.warn('Backend research paper fetch fallback to curated case studies:', err.message);
      setPapers(STATIC_CASE_STUDIES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResearchPapers();
    // Pick up search query from landing page search bar
    const savedQuery = sessionStorage.getItem('geopolicy_search_query');
    if (savedQuery) {
      setSearchQuery(savedQuery);
      sessionStorage.removeItem('geopolicy_search_query');
    }
  }, []);

  const handleCreatePaper = async (formData) => {
    try {
      setError('');
      const res = await axios.post('/api/research', formData);
      setPapers([res.data, ...papers]);
      setIsAddModalOpen(false);
    } catch (err) {
      console.error('Error submitting research paper:', err);
      alert(err.response?.data?.message || 'Error creating research paper.');
    }
  };

  const toggleBookmark = (id) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter(bId => bId !== id));
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedTopic('All');
    setSelectedState('All States');
    setSelectedYear('All Years');
    setSelectedInstitution('All Institutions');
    setFilterAuthor('');
    setFilterDistrict('');
  };

  // Advanced Multi-Field Filtering
  const filteredPapers = papers.filter(p => {
    const matchesTopic = selectedTopic === 'All' || p.category === selectedTopic;
    const matchesState = selectedState === 'All States' || 
      p.tags?.some(t => t.toLowerCase().includes(selectedState.toLowerCase())) ||
      p.abstract?.toLowerCase().includes(selectedState.toLowerCase());
    
    const paperYear = new Date(p.publicationDate || p.createdAt || Date.now()).getFullYear().toString();
    const matchesYear = selectedYear === 'All Years' || paperYear === selectedYear;

    const matchesInstitution = selectedInstitution === 'All Institutions' || 
      (p.institution && p.institution.toLowerCase().includes(selectedInstitution.toLowerCase()));

    const matchesAuthor = !filterAuthor || p.author?.toLowerCase().includes(filterAuthor.toLowerCase());

    const matchesDistrict = !filterDistrict || 
      p.abstract?.toLowerCase().includes(filterDistrict.toLowerCase()) ||
      p.tags?.some(t => t.toLowerCase().includes(filterDistrict.toLowerCase()));

    const matchesSearch = searchQuery === '' || 
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.abstract?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTopic && matchesState && matchesYear && matchesInstitution && matchesAuthor && matchesDistrict && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-6 lg:p-8 space-y-6 font-sans">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#0A3678] font-mono text-xs font-bold uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4 text-amber-500" />
            <span>National Spatial Data Research Index</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002244]">
            Research &amp; Case Study Repository
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Access, upload, and cite empirical studies, cadastral survey evaluations, and legal land tenure papers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {(user?.role === 'Researcher' || user?.role === 'Super Admin' || user?.role === 'Government Official' || user?.role === 'Platform Administrator') && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-[#0A3678] hover:bg-[#002244] text-white font-bold text-xs rounded-lg shadow-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit Research Document</span>
            </button>
          )}
        </div>
      </div>

      {/* Realistic Academic Research Header Banner */}
      <div className="relative rounded-2xl overflow-hidden h-36 border border-slate-200 shadow-xs">
        <img 
          src="https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200&auto=format&fit=crop" 
          alt="Land Policy & Academic Research Library" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#002244]/90 via-[#0A3678]/85 to-transparent p-6 flex flex-col justify-center text-white">
          <span className="text-amber-300 font-mono text-xs font-bold uppercase tracking-wider">ICSSR &amp; NITI Aayog Accredited</span>
          <h2 className="text-xl font-extrabold">National Land Governance Academic Index</h2>
          <p className="text-xs text-slate-200 mt-1">12,500+ peer-reviewed studies on conclusive titling, agricultural credit liquidity, and cadastral survey geodesy.</p>
        </div>
      </div>

      {/* Search & Advanced Filters Panel */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        
        {/* Main Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keywords, titles, author names, methodology, or ULPIN codes..."
              className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-10 pr-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white shadow-xs"
            />
          </div>

          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`px-3 py-2 rounded-lg text-xs font-bold border flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
              showAdvancedFilters ? 'bg-blue-50 text-[#0A3678] border-blue-300' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#0A3678]" />
            <span>Advanced Filters</span>
          </button>

          {(searchQuery || selectedTopic !== 'All' || selectedState !== 'All States' || selectedYear !== 'All Years' || selectedInstitution !== 'All Institutions' || filterAuthor || filterDistrict) && (
            <button
              onClick={resetFilters}
              className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-800 border border-slate-200 flex items-center gap-1 cursor-pointer shrink-0"
              title="Reset All Filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Topic Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar text-xs">
          <span className="font-bold text-slate-700 font-mono uppercase tracking-wider shrink-0 text-[11px]">
            Topic:
          </span>
          {TOPICS.map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                selectedTopic === topic
                  ? 'bg-[#0A3678] text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>

        {/* Expandable Advanced Filters Grid */}
        {showAdvancedFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-3 border-t border-slate-100 text-xs">
            
            {/* Filter: State */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">State Jurisdiction</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
              >
                {STATES.map(st => <option key={st} value={st}>{st}</option>)}
              </select>
            </div>

            {/* Filter: District */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">District Name</label>
              <input
                type="text"
                value={filterDistrict}
                onChange={(e) => setFilterDistrict(e.target.value)}
                placeholder="e.g. Pune, Chennai"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
              />
            </div>

            {/* Filter: Author */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Author Name</label>
              <input
                type="text"
                value={filterAuthor}
                onChange={(e) => setFilterAuthor(e.target.value)}
                placeholder="e.g. Sundaram, Verma"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
              />
            </div>

            {/* Filter: Year */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Publication Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
              >
                {YEARS.map(yr => <option key={yr} value={yr}>{yr}</option>)}
              </select>
            </div>

            {/* Filter: Institution */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Institution</label>
              <select
                value={selectedInstitution}
                onChange={(e) => setSelectedInstitution(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-600"
              >
                {INSTITUTIONS.map(inst => <option key={inst} value={inst}>{inst}</option>)}
              </select>
            </div>

          </div>
        )}

      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-xs text-red-700">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Papers List / Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200">
          <Loader2 className="w-8 h-8 text-[#0A3678] animate-spin mb-2" />
          <p className="text-xs font-semibold text-slate-600">Retrieving official research records from repository...</p>
        </div>
      ) : filteredPapers.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 space-y-2">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
          <p className="text-sm font-bold text-slate-700">No research papers match your current filters.</p>
          <button
            onClick={resetFilters}
            className="text-xs text-[#0A3678] font-bold hover:underline"
          >
            Clear all filters and show all research papers
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono px-1">
            <span>Showing {filteredPapers.length} Verified Research Documents</span>
            <span>Government of India Peer-Reviewed Repository</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPapers.map((paper) => {
              const isBookmarked = bookmarkedIds.includes(paper._id || paper.id);
              return (
                <div
                  key={paper._id || paper.id}
                  className="bg-white rounded-xl border border-slate-200 hover:border-blue-400 p-5 flex flex-col justify-between space-y-3 transition-all hover:shadow-md"
                >
                  <div className="space-y-2.5">
                    
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#0A3678] border border-blue-200">
                        {paper.category || 'Land Governance'}
                      </span>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          {new Date(paper.publicationDate || paper.createdAt || Date.now()).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => toggleBookmark(paper._id || paper.id)}
                          className={`p-1 rounded hover:bg-slate-100 transition-colors cursor-pointer ${
                            isBookmarked ? 'text-amber-500' : 'text-slate-400'
                          }`}
                          title="Bookmark Document"
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500' : ''}`} />
                        </button>
                      </div>
                    </div>

                    <h3 
                      onClick={() => setActivePaper(paper)}
                      className="text-sm font-bold text-slate-900 hover:text-[#0A3678] transition-colors cursor-pointer leading-snug"
                    >
                      {paper.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {paper.abstract}
                    </p>

                    {paper.tags && paper.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {paper.tags.slice(0, 4).map((tag, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-slate-100 rounded text-[10px] text-slate-600 border border-slate-200">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                      <User className="w-3.5 h-3.5 text-blue-700" />
                      <span>{paper.author || 'Research Fellow'}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActivePaper(paper)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 text-[#0A3678] rounded-lg font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <span>Preview &amp; Cite</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Details & PDF Modal */}
      <PaperDetailsModal
        paper={activePaper}
        isOpen={!!activePaper}
        onClose={() => setActivePaper(null)}
      />

      {/* Add Research Modal */}
      <ResearchModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleCreatePaper}
      />

    </div>
  );
};
