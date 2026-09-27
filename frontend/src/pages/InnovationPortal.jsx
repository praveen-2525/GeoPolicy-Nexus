import React, { useState } from 'react';
import { 
  Trophy, 
  Lightbulb, 
  Award, 
  Rocket, 
  Send, 
  Users, 
  Calendar, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  FileCheck,
  Building,
  Target,
  Clock,
  ArrowUpRight
} from 'lucide-react';

const HACKATHONS = [
  {
    id: 'hack-1',
    title: 'National Land Governance Hackathon 2026',
    organizer: 'Ministry of Rural Development & NITI Aayog',
    prizePool: '₹25,00,000',
    deadline: 'October 30, 2026',
    teamsRegistered: 342,
    status: 'Applications Open',
    themes: ['AI Cadastral Boundary Extraction', 'ULPIN Smart Contracts', 'Dispute Risk Forecasting'],
    description: 'Solve India land titling, auto-mutation, and cadastral spatial vector challenges using high-res satellite orthophotos and AI microservices.'
  },
  {
    id: 'hack-2',
    title: 'Climate-Resilient Land Use Innovation Challenge',
    organizer: 'ISRO Bhuvan & MoEFCC',
    prizePool: '₹15,00,000',
    deadline: 'November 15, 2026',
    teamsRegistered: 189,
    status: 'Applications Open',
    themes: ['Coastal Floodplain Zoning', 'Drought Sentinel Analytics', 'Soil Health Vectors'],
    description: 'Build predictive geospatial models for agricultural protection zones and vulnerable coastal land parcels.'
  }
];

const RESEARCH_GRANTS = [
  {
    id: 'grant-1',
    title: 'Department of Land Resources (DoLR) National Research Fellowship',
    amount: '₹50,00,000 / Project',
    eligibility: 'IITs, NITs, IIMs, State Agricultural Universities',
    focusArea: 'Conclusive Titling Legislation & Economic Impact Assessment',
    deadline: 'December 15, 2026'
  },
  {
    id: 'grant-2',
    title: 'SVAMITVA Drone Cadastre Analytics Grant',
    amount: '₹20,00,000 / Team',
    eligibility: 'GIS Startups, University Research Labs, Policy Think Tanks',
    focusArea: 'Sub-5cm Vector Parcel Accuracy & Gram Panchayat Spatial Audits',
    deadline: 'January 10, 2027'
  }
];

const PILOT_PROJECTS = [
  {
    id: 'pilot-1',
    title: 'Auto-Mutation Registry Smart Contract Sandbox (Karnataka)',
    partner: 'Bhoomi 2.0 & NIC',
    stage: 'Pilot Active in 4 Taluks',
    impact: 'Reduced mutation verification timeframe from 45 days to 48 hours.'
  },
  {
    id: 'pilot-2',
    title: 'CORS Geodesy Network Parcel Demarcation (Telangana & AP)',
    partner: 'Survey of India',
    stage: 'Phase II Expansion',
    impact: 'Eliminated 44% boundary dispute litigations across 1,200 revenue villages.'
  }
];

export const InnovationPortal = () => {
  const [activeCategory, setActiveCategory] = useState('hackathons'); // 'hackathons' | 'grants' | 'pilots' | 'submit'
  const [proposalTitle, setProposalTitle] = useState('');
  const [teamName, setTeamName] = useState('');
  const [organization, setOrganization] = useState('');
  const [category, setCategory] = useState('Hackathon Entry');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitProposal = (e) => {
    e.preventDefault();
    if (!proposalTitle || !teamName) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setProposalTitle('');
      setTeamName('');
      setOrganization('');
      setActiveCategory('hackathons');
      alert('Proposal successfully registered with National Innovation Gateway! Tracking ID: NIP-2026-' + Math.floor(1000 + Math.random() * 9000));
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-6 lg:p-8 space-y-6 font-sans relative overflow-hidden">
      {/* Drone Survey & Innovation Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1920&auto=format&fit=crop')` }}
      />

      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-[#0A3678] font-mono text-xs font-bold uppercase tracking-wider mb-1">
            <Rocket className="w-4 h-4 text-amber-500" />
            <span>National Governance Innovation Ecosystem</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002244]">
            Land Governance Innovation Portal &amp; Grants
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Empowering AI startups, university researchers, and policy fellows to build next-generation geospatial governance solutions for India.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
          <button
            onClick={() => setActiveCategory('hackathons')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'hackathons' ? 'bg-[#0A3678] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Hackathons &amp; Challenges
          </button>
          <button
            onClick={() => setActiveCategory('grants')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'grants' ? 'bg-[#0A3678] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Research Grants
          </button>
          <button
            onClick={() => setActiveCategory('pilots')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'pilots' ? 'bg-[#0A3678] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            State Pilots Showcase
          </button>
          <button
            onClick={() => setActiveCategory('submit')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'submit' ? 'bg-[#0D7E3A] text-white shadow-xs' : 'text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            Submit Proposal
          </button>
        </div>
      </div>

      {/* CATEGORY 1: HACKATHONS */}
      {activeCategory === 'hackathons' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Active National Competitions &amp; Hackathons</span>
            <span className="font-mono text-emerald-700 font-bold">Total Prize Pool: ₹40,00,000</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {HACKATHONS.map((h) => (
              <div key={h.id} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md transition-shadow">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                      {h.status}
                    </span>
                    <span className="text-xs font-bold text-[#0A3678] font-mono">
                      Prize Pool: {h.prizePool}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug">{h.title}</h3>
                  <p className="text-xs text-slate-500">Organizer: <strong>{h.organizer}</strong></p>
                  <p className="text-xs text-slate-600 leading-relaxed">{h.description}</p>

                  {/* Themes Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {h.themes.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-blue-50 text-[#0A3678] text-[10px] font-semibold border border-blue-100">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="space-y-0.5 text-slate-500 font-mono text-[11px]">
                    <p className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-blue-700" />
                      {h.teamsRegistered} Teams Registered
                    </p>
                    <p className="flex items-center gap-1 text-slate-700">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      Deadline: {h.deadline}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setActiveCategory('submit');
                      setCategory('Hackathon Entry');
                    }}
                    className="px-4 py-2 bg-[#0A3678] hover:bg-[#002244] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>Register Team</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CATEGORY 2: RESEARCH GRANTS */}
      {activeCategory === 'grants' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Government Research Fellowships &amp; Grants</span>
            <span className="font-mono">Ministry of Rural Development Funding</span>
          </div>

          <div className="space-y-4">
            {RESEARCH_GRANTS.map((g) => (
              <div key={g.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 font-mono">
                      Grant: {g.amount}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Deadline: {g.deadline}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">{g.title}</h3>
                  <p className="text-xs text-slate-600">Focus Area: <strong>{g.focusArea}</strong></p>
                  <p className="text-[11px] text-slate-500">Eligible Entities: {g.eligibility}</p>
                </div>

                <button
                  onClick={() => {
                    setActiveCategory('submit');
                    setCategory('Research Grant Proposal');
                  }}
                  className="px-4 py-2.5 bg-[#0D7E3A] hover:bg-[#085426] text-white font-bold text-xs rounded-xl shadow-xs transition-all shrink-0 cursor-pointer"
                >
                  Apply for Grant
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CATEGORY 3: PILOTS SHOWCASE */}
      {activeCategory === 'pilots' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>State Innovation Sandboxes &amp; Deployed Pilot Technologies</span>
            <span className="font-mono">Live Field Testing Results</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PILOT_PROJECTS.map((p) => (
              <div key={p.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-900 border border-purple-300">
                    {p.stage}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">{p.partner}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{p.title}</h3>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 font-medium">
                  <strong>Impact Metric:</strong> {p.impact}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CATEGORY 4: SUBMIT PROPOSAL FORM */}
      {activeCategory === 'submit' && (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4 space-y-1">
            <h2 className="text-xl font-extrabold text-[#002244] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>National Innovation Proposal Submission</span>
            </h2>
            <p className="text-xs text-slate-500">
              Submit your research proposal, hackathon solution, or pilot technology for evaluation by the Ministry of Rural Development panel.
            </p>
          </div>

          <form onSubmit={handleSubmitProposal} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                  Submission Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                >
                  <option value="Hackathon Entry">Hackathon Entry</option>
                  <option value="Research Grant Proposal">Research Grant Proposal</option>
                  <option value="State Pilot Partnership">State Pilot Partnership</option>
                  <option value="Startup Innovation Sandbox">Startup Innovation Sandbox</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                  Team / Lead Investigator Name
                </label>
                <input
                  type="text"
                  required
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="e.g. Dr. Ramesh Sundaram / Team GeoAI"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                Institution / Organization
              </label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="e.g. IIT Madras / Survey Innovation Lab / NITI Aayog Fellow"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                Proposal Title &amp; Abstract
              </label>
              <textarea
                rows={4}
                required
                value={proposalTitle}
                onChange={(e) => setProposalTitle(e.target.value)}
                placeholder="Detail your methodology, GIS vector layer usage, AI algorithms, and expected policy impact..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="pt-3 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                Evaluation Panel: DoLR + NITI Aayog + ISRO Bhuvan
              </span>
              <button
                type="submit"
                disabled={submitted}
                className="px-6 py-2.5 bg-[#0A3678] hover:bg-[#002244] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {submitted ? (
                  <>
                    <Clock className="w-4 h-4 animate-spin" />
                    <span>Registering Proposal...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Proposal</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
