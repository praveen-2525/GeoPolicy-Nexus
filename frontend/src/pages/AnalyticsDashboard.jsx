import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Download, 
  Filter, 
  Layers, 
  Activity, 
  ShieldCheck, 
  Flame, 
  Wheat, 
  Building2,
  TreePine,
  Droplets,
  BookOpen,
  Award,
  ChevronRight,
  Sparkles,
  Search,
  Scale
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area,
  PieChart as RePieChart,
  Pie,
  Cell
} from 'recharts';

const STATE_LEADERBOARD = [
  { rank: 1, state: 'Karnataka', titlingScore: 94.2, disputeDrop: '-64%', corsCoverage: '98%', status: 'Pioneer', capital: 'Bengaluru' },
  { rank: 2, state: 'Maharashtra', titlingScore: 89.5, disputeDrop: '-58%', corsCoverage: '94%', status: 'Advanced', capital: 'Mumbai' },
  { rank: 3, state: 'Gujarat', titlingScore: 88.1, disputeDrop: '-52%', corsCoverage: '92%', status: 'Advanced', capital: 'Gandhinagar' },
  { rank: 4, state: 'Tamil Nadu', titlingScore: 86.4, disputeDrop: '-49%', corsCoverage: '90%', status: 'Advanced', capital: 'Chennai' },
  { rank: 5, state: 'Telangana', titlingScore: 83.7, disputeDrop: '-44%', corsCoverage: '88%', status: 'Progressive', capital: 'Hyderabad' },
  { rank: 6, state: 'Madhya Pradesh', titlingScore: 81.9, disputeDrop: '-42%', corsCoverage: '86%', status: 'Progressive', capital: 'Bhopal' },
  { rank: 7, state: 'Kerala', titlingScore: 80.4, disputeDrop: '-39%', corsCoverage: '84%', status: 'Progressive', capital: 'Thiruvananthapuram' },
  { rank: 8, state: 'Uttar Pradesh', titlingScore: 78.6, disputeDrop: '-35%', corsCoverage: '81%', status: 'Developing', capital: 'Lucknow' }
];

const DISPUTE_CAUSES_DATA = [
  { name: 'Boundary Overlaps (FMS)', value: 42.5, fill: '#0A3678' },
  { name: 'Hereditary Partition', value: 28.4, fill: '#D97706' },
  { name: 'Peri-Urban Expansion', value: 18.2, fill: '#2563EB' },
  { name: 'Forest/Tribal (FRA)', value: 10.9, fill: '#059669' }
];

const RESEARCH_TRENDS_DATA = [
  { year: '2020', papers: 1420, citations: 4200 },
  { year: '2021', papers: 2100, citations: 7800 },
  { year: '2022', papers: 3850, citations: 15400 },
  { year: '2023', papers: 5120, citations: 24100 },
  { year: '2024', papers: 7920, citations: 41200 },
  { year: '2025', papers: 9800, citations: 58900 },
  { year: '2026', papers: 12500, citations: 82400 }
];

const LAND_USE_DATA = [
  { year: '2020', agriculture: 142.1, forest: 70.2, urban: 14.2 },
  { year: '2022', agriculture: 141.5, forest: 70.8, urban: 15.8 },
  { year: '2024', agriculture: 140.8, forest: 71.4, urban: 17.1 },
  { year: '2026', agriculture: 140.2, forest: 71.8, urban: 18.6 }
];

const CLIMATE_RISK_DISTRIBUTION = [
  { name: 'Coastal Erosion Zones', value: 35, color: '#2563EB' },
  { name: 'Flood-Plain Inundation', value: 40, color: '#0A3678' },
  { name: 'Drought Soil Stress', value: 25, color: '#D97706' }
];

export const AnalyticsDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('2024-2026');
  const [activeTab, setActiveTab] = useState('disputes'); // 'disputes' | 'landuse' | 'research' | 'climate' | 'leaderboard'
  const [leaderboardSearch, setLeaderboardSearch] = useState('');

  const handleExportReport = () => {
    alert('[Official Analytics Report Exported]: National_Land_Governance_Executive_Report_2026.csv generated with DoLR digital signature.');
  };

  const filteredLeaderboard = STATE_LEADERBOARD.filter(s =>
    s.state.toLowerCase().includes(leaderboardSearch.toLowerCase()) ||
    s.capital.toLowerCase().includes(leaderboardSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-6 lg:p-8 space-y-6 font-sans relative overflow-hidden">
      
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1920&auto=format&fit=crop')` }}
      />

      {/* Page Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-[#0A3678] font-mono text-xs font-bold uppercase tracking-wider mb-1">
            <BarChart3 className="w-4 h-4 text-amber-500" />
            <span>National Governance Intelligence Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002244] tracking-tight">
            Executive Land Governance Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Empirical metrics covering civil land litigation backlogs, LULC spatial transitions, research trajectories, and state compliance indices.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="bg-slate-100 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#0A3678] shadow-2xs"
          >
            <option value="2024-2026">2024 – 2026 Triennial</option>
            <option value="2020-2024">2020 – 2024 Baseline</option>
            <option value="all-time">Comprehensive History</option>
          </select>

          <button
            onClick={handleExportReport}
            className="px-4 py-2 bg-[#0A3678] hover:bg-[#002244] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Official CSV Report</span>
          </button>
        </div>
      </div>

      {/* Top National KPI Cards (Non-overlapping 4-column layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold uppercase font-mono text-[10px]">Dispute Resolution Speed</span>
            <Clock className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#002244] font-mono">48 Days</span>
            <span className="text-xs text-emerald-700 font-bold">-54% vs 2022</span>
          </div>
          <p className="text-[11px] text-slate-500">Fast-Track Digital Revenue Courts</p>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold uppercase font-mono text-[10px]">Conclusive Titling Index</span>
            <ShieldCheck className="w-4 h-4 text-[#0A3678]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#0A3678] font-mono">87.4%</span>
            <span className="text-xs text-blue-700 font-bold">+18.2% YoY</span>
          </div>
          <p className="text-[11px] text-slate-500">Verified ULPIN Geo-referenced Parcels</p>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold uppercase font-mono text-[10px]">Protected Forest Land</span>
            <TreePine className="w-4 h-4 text-green-700" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-green-800 font-mono">428,000</span>
            <span className="text-xs text-slate-500 font-mono">sq km</span>
          </div>
          <p className="text-[11px] text-slate-500">Satellite-Monitored Buffer Zones</p>
        </div>

        <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold uppercase font-mono text-[10px]">Encumbrance Fraud Drop</span>
            <CheckCircle2 className="w-4 h-4 text-amber-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-800 font-mono">-78.6%</span>
            <span className="text-xs text-amber-700 font-bold font-mono">Post-ULPIN</span>
          </div>
          <p className="text-[11px] text-slate-500">Zero Duplicate Title Registrations</p>
        </div>

      </div>

      {/* Main Tab Navigation Bar (Self-contained, non-overlapping horizontal ribbon) */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-2 overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveTab('disputes')}
          className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
            activeTab === 'disputes' ? 'bg-[#0A3678] text-white shadow-xs' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <AlertTriangle className={`w-3.5 h-3.5 ${activeTab === 'disputes' ? 'text-amber-400' : 'text-[#0A3678]'}`} />
          <span>Land Dispute Analytics</span>
        </button>

        <button
          onClick={() => setActiveTab('landuse')}
          className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
            activeTab === 'landuse' ? 'bg-[#0A3678] text-white shadow-xs' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <Layers className={`w-3.5 h-3.5 ${activeTab === 'landuse' ? 'text-amber-400' : 'text-[#0A3678]'}`} />
          <span>Land Use &amp; Urban Growth (LULC)</span>
        </button>

        <button
          onClick={() => setActiveTab('research')}
          className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
            activeTab === 'research' ? 'bg-[#0A3678] text-white shadow-xs' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <BookOpen className={`w-3.5 h-3.5 ${activeTab === 'research' ? 'text-amber-400' : 'text-[#0A3678]'}`} />
          <span>Research Publication Trends</span>
        </button>

        <button
          onClick={() => setActiveTab('climate')}
          className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
            activeTab === 'climate' ? 'bg-[#0A3678] text-white shadow-xs' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <Flame className={`w-3.5 h-3.5 ${activeTab === 'climate' ? 'text-amber-400' : 'text-[#0A3678]'}`} />
          <span>Climate &amp; Vulnerability</span>
        </button>

        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
            activeTab === 'leaderboard' ? 'bg-[#0A3678] text-white shadow-xs' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
          }`}
        >
          <Award className={`w-3.5 h-3.5 ${activeTab === 'leaderboard' ? 'text-amber-400' : 'text-[#0A3678]'}`} />
          <span>State Titling Leaderboard</span>
        </button>
      </div>

      {/* TAB CONTENT PANELS - Fully decoupled containers */}

      {/* TAB 1: LAND DISPUTE ANALYTICS */}
      {activeTab === 'disputes' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Dispute Causes Bar Breakdown (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Primary Etiology of Land Civil Disputes in India</h3>
                <p className="text-xs text-slate-500 mt-0.5">Empirical breakdown based on Department of Land Resources litigation audits.</p>
              </div>
              <span className="text-[10px] text-slate-400 font-mono bg-slate-100 px-2 py-1 rounded">DoLR Survey</span>
            </div>

            <div className="h-64 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DISPUTE_CAUSES_DATA} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                  <XAxis type="number" tick={{fontSize: 10}} hide />
                  <YAxis dataKey="name" type="category" width={150} tick={{fontSize: 11, fontWeight: 600, fill: '#334155'}} />
                  <RechartsTooltip cursor={{fill: '#F1F5F9'}} contentStyle={{borderRadius: '12px', fontSize: '12px'}} />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                    {DISPUTE_CAUSES_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center pt-2">
              {DISPUTE_CAUSES_DATA.map((item) => (
                <div key={item.name} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-mono block truncate">{item.name}</span>
                  <span className="text-sm font-extrabold font-mono" style={{ color: item.fill }}>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dispute Turnaround Trajectory (5 Cols) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Average Court Resolution Time (Days)</h3>
              <p className="text-xs text-slate-500">Impact of Digital Evidence Overlays &amp; ULPIN Geo-Tagging</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="font-medium text-slate-700">2020 (Paper Revenue Registers)</span>
                <span className="font-mono font-bold text-red-600 bg-red-50 px-2 py-1 rounded">840 Days (2.3 Yrs)</span>
              </div>
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="font-medium text-slate-700">2022 (DILRMP Digitization Phase 1)</span>
                <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded">410 Days (1.1 Yrs)</span>
              </div>
              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="font-medium text-slate-700">2024 (14-Digit ULPIN Rollout)</span>
                <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded">145 Days</span>
              </div>
              <div className="flex items-center justify-between p-3.5 bg-blue-50/80 rounded-xl border border-blue-200">
                <span className="font-bold text-[#0A3678]">2026 (Digital Revenue Tribunals)</span>
                <span className="font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded">48 Days Target</span>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
              <strong>Key Finding:</strong> ULPIN parcel locking reduces sub-registrar double-sale litigation by <strong>78.6%</strong> across early-adopting districts.
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: LAND USE (LULC) */}
      {activeTab === 'landuse' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-amber-800 text-xs font-bold">
                <Wheat className="w-4 h-4 text-amber-600" />
                <span>Agricultural Cropland</span>
              </div>
              <div className="text-3xl font-extrabold text-amber-700 font-mono">140.2 Million</div>
              <p className="text-xs text-slate-500">Hectares under PM-KISAN geo-referencing &amp; Patta verification.</p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold">
                <TreePine className="w-4 h-4 text-emerald-600" />
                <span>Forest Canopy Cover</span>
              </div>
              <div className="text-3xl font-extrabold text-emerald-700 font-mono">71.8 Million</div>
              <p className="text-xs text-slate-500">Hectares recorded via ISRO Bhuvan satellite radar observation.</p>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-blue-800 text-xs font-bold">
                <Building2 className="w-4 h-4 text-blue-600" />
                <span>Built-Up Urban Footprint</span>
              </div>
              <div className="text-3xl font-extrabold text-blue-700 font-mono">18.6 Million</div>
              <p className="text-xs text-slate-500">Hectares in peri-urban expansion corridors monitored under ULPIN.</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">LULC Transition Area Trends (Million Hectares)</h3>
                <p className="text-xs text-slate-500">Comparative multi-year satellite classification from 2020 to 2026.</p>
              </div>
              <span className="text-[10px] text-slate-400 font-mono bg-slate-100 px-2 py-1 rounded">ISRO Bhuvan Remote Sensing</span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={LAND_USE_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAgri" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D97706" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#D97706" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorForest" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorUrban" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" tick={{fontSize: 12}} />
                  <YAxis tick={{fontSize: 12}} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <RechartsTooltip contentStyle={{borderRadius: '12px', fontSize: '12px'}} />
                  <Legend iconType="circle" wrapperStyle={{fontSize: '12px'}} />
                  <Area type="monotone" dataKey="agriculture" stroke="#D97706" fillOpacity={1} fill="url(#colorAgri)" name="Agricultural Land" />
                  <Area type="monotone" dataKey="forest" stroke="#059669" fillOpacity={1} fill="url(#colorForest)" name="Forest Cover" />
                  <Area type="monotone" dataKey="urban" stroke="#2563EB" fillOpacity={1} fill="url(#colorUrban)" name="Urban Footprint" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: RESEARCH TRENDS */}
      {activeTab === 'research' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">National Research Publication Indexing Growth (2020–2026)</h3>
              <p className="text-xs text-slate-500">Indexed academic papers and citation trajectories across 150+ collaborating universities.</p>
            </div>
            <span className="text-[10px] text-emerald-800 font-mono bg-emerald-50 border border-emerald-200 px-2 py-1 rounded font-bold">
              12,500+ Papers Active
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={RESEARCH_TRENDS_DATA} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="year" tick={{fontSize: 12}} />
                <YAxis tick={{fontSize: 12}} />
                <RechartsTooltip contentStyle={{borderRadius: '12px', fontSize: '12px'}} />
                <Legend wrapperStyle={{fontSize: '12px'}} />
                <Line type="monotone" dataKey="papers" stroke="#0A3678" strokeWidth={3} activeDot={{ r: 8 }} name="Indexed Research Papers" />
                <Line type="monotone" dataKey="citations" stroke="#D97706" strokeWidth={2} name="Policy Citations" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 text-xs block">2020</span>
              <span className="text-xl font-bold font-mono text-slate-800">1,420 Papers</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 text-xs block">2022</span>
              <span className="text-xl font-bold font-mono text-slate-800">3,850 Papers</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 text-xs block">2024</span>
              <span className="text-xl font-bold font-mono text-slate-800">7,920 Papers</span>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <span className="text-[#0A3678] text-xs block font-bold">2026 (Current)</span>
              <span className="text-2xl font-extrabold font-mono text-[#0A3678]">12,500+ Papers</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CLIMATE VULNERABILITY */}
      {activeTab === 'climate' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Climate Vulnerability Distribution Across Land Zones</h3>
                <p className="text-xs text-slate-500">Spatial overlap analysis of environmental risk factors.</p>
              </div>
              <span className="text-xs font-mono text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200 font-bold">
                High Risk Buffer Active
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={CLIMATE_RISK_DISTRIBUTION}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {CLIMATE_RISK_DISTRIBUTION.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{borderRadius: '12px', fontSize: '12px'}} />
                </RePieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Statutory Climate Protection Protocols</h3>
              <p className="text-xs text-slate-500">Enforced GIS buffer restrictions.</p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-200 space-y-1">
                <span className="font-bold text-[#0A3678] block">Flood-Plain Inundation Zoning</span>
                <p className="text-slate-600">62 major river basins mapped with mandatory 200m zero-construction buffer strips.</p>
              </div>

              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
                <span className="font-bold text-amber-800 block">Soil Moisture &amp; Drought Stress</span>
                <p className="text-slate-600">84 drought-prone districts synced with satellite evapotranspiration data under PM-KISAN.</p>
              </div>

              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                <span className="font-bold text-emerald-800 block">Coastal CRZ High-Tide Regulation</span>
                <p className="text-slate-600">7,516 km coastline tagged with 500m high-tide regulatory lines and mangrove protection zones.</p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 5: STATE TITLING LEADERBOARD */}
      {activeTab === 'leaderboard' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">State Cadastral Digitization &amp; Titling Leaderboard</h3>
              <p className="text-xs text-slate-500">Comparative performance index across states and union territories.</p>
            </div>

            {/* Leaderboard Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={leaderboardSearch}
                onChange={(e) => setLeaderboardSearch(e.target.value)}
                placeholder="Filter state or capital..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-[#0A3678]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-mono text-[11px] bg-slate-50">
                  <th className="py-3 px-3 rounded-l-lg">Rank</th>
                  <th className="py-3 px-3">State Jurisdiction</th>
                  <th className="py-3 px-3">Capital City</th>
                  <th className="py-3 px-3">Conclusive Titling %</th>
                  <th className="py-3 px-3">Dispute Drop Rate</th>
                  <th className="py-3 px-3">CORS Coverage</th>
                  <th className="py-3 px-3 rounded-r-lg">Governance Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeaderboard.map((st) => (
                  <tr key={st.rank} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-bold font-mono text-[#0A3678]">#{st.rank}</td>
                    <td className="py-3 px-3 font-bold text-slate-900">{st.state}</td>
                    <td className="py-3 px-3 text-slate-500">{st.capital}</td>
                    <td className="py-3 px-3 font-mono font-semibold text-emerald-700">{st.titlingScore}%</td>
                    <td className="py-3 px-3 font-mono font-bold text-blue-700">{st.disputeDrop}</td>
                    <td className="py-3 px-3 font-mono text-slate-700">{st.corsCoverage}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        st.status === 'Pioneer' 
                          ? 'bg-purple-100 text-purple-900 border border-purple-200' 
                          : st.status === 'Advanced'
                          ? 'bg-blue-100 text-[#0A3678] border border-blue-200'
                          : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                      }`}>
                        {st.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
