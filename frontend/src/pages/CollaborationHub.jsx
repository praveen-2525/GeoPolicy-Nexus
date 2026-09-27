import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  FolderGit2, 
  Share2, 
  PlusCircle, 
  ArrowRight, 
  CheckCircle2, 
  Tag, 
  ThumbsUp, 
  Clock, 
  User, 
  Building2, 
  FileText, 
  Layers, 
  Sparkles,
  Send
} from 'lucide-react';

const RESEARCH_GROUPS = [
  {
    id: 'grp-1',
    name: 'Himalayan Landslide & Cadastral Risk Working Group',
    lead: 'Srinithi',
    institution: 'IIT Delhi & Wadia Institute of Himalayan Geology',
    membersCount: 42,
    activeProjects: 3,
    description: 'Investigating high-altitude slope instability, cadastral boundary displacement in Himachal and Uttarakhand, and drone vector mapping.'
  },
  {
    id: 'grp-2',
    name: 'SVAMITVA Drone Survey National Evaluation Taskforce',
    lead: 'Santhosh Ram, IAS',
    institution: 'Department of Land Resources & Survey of India',
    membersCount: 128,
    activeProjects: 6,
    description: 'Monitoring drone survey orthophoto accuracy, Gram Panchayat spatial boundaries, and ULPIN issuance across rural UP, MP, and Maharashtra.'
  },
  {
    id: 'grp-3',
    name: 'Urban Land Value Capture & Transit Corridor Zoning',
    lead: 'Yuvarani',
    institution: 'NIUA & Karnataka Land Policy Board',
    membersCount: 56,
    activeProjects: 4,
    description: 'Formulating betterment levies, commercial zoning land pooling algorithms, and peri-urban corridor titling mechanisms.'
  },
  {
    id: 'grp-4',
    name: 'Forest Rights Act (FRA) & Community Land Tenure Board',
    lead: 'Udaya Keerthi',
    institution: 'Tata Institute of Social Sciences (TISS)',
    membersCount: 38,
    activeProjects: 2,
    description: 'Empirical assessment of IFR and CFR claim titling using handheld differential GPS and open cadastral verification.'
  },
  {
    id: 'grp-5',
    name: 'Conclusive Land Titling Legislative Drafting Committee',
    lead: 'Praveen',
    institution: 'NITI Aayog & Ministry of Law & Justice',
    membersCount: 64,
    activeProjects: 5,
    description: 'Drafting state-level Model Conclusive Titling Acts, title guarantee fund mechanisms, and 60-day digital land dispute tribunal rules.'
  },
  {
    id: 'grp-6',
    name: 'Coastal Regulation Zone (CRZ) & Marine Spatial Planning Unit',
    lead: 'Dr. V. K. Sundar',
    institution: 'National Centre for Sustainable Coastal Management (NCSCM)',
    membersCount: 45,
    activeProjects: 3,
    description: 'Mapping 68 Ecologically Sensitive Areas (ESAs), tsunami buffer zones, and fisherman community land tenure along the 7,516 km coastline.'
  },
  {
    id: 'grp-7',
    name: 'Blockchain Land Record Provenance & Smart Contracts Sandbox',
    lead: 'Prof. Ananthakrishnan',
    institution: 'National Informatics Centre (NIC) & IISc Bengaluru',
    membersCount: 82,
    activeProjects: 4,
    description: 'Developing immutable title history ledgers, cryptographic deed hashes, and sub-registrar auto-mutation smart contract triggers.'
  },
  {
    id: 'grp-8',
    name: 'Agricultural Tenancy & Smallholder Credit Liquidity Study Group',
    lead: 'Dr. Meenakshi Sundaram',
    institution: 'NABARD & Indian Institute of Management (IIM) Ahmedabad',
    membersCount: 51,
    activeProjects: 3,
    description: 'Quantifying institutional credit flow increases following ULPIN-linked electronic Record of Rights (RTC) issuance in rural sectors.'
  },
  {
    id: 'grp-9',
    name: 'CORS Geodesy Signal Optimization & High-Precision Demarcation',
    lead: 'Brig. S. K. Sharma',
    institution: 'Survey of India Geodetic & Research Branch',
    membersCount: 73,
    activeProjects: 5,
    description: 'Standardizing sub-5cm RTK geodetic baseline corrections for continuous operating reference station networks nationwide.'
  },
  {
    id: 'grp-10',
    name: 'Tribal Land Alienation & Schedule V Area Rights Commission',
    lead: 'Dr. Birsa Munda Fellow Taskforce',
    institution: 'Ministry of Tribal Affairs & TISS Guwahati',
    membersCount: 39,
    activeProjects: 2,
    description: 'Investigating ancestral tribal land restoration petitions, Gram Sabha consent audits, and Schedule V constitutional protections.'
  },
  {
    id: 'grp-11',
    name: 'Peri-Urban Land Pooling & Industrial Corridor Land Bank Cell',
    lead: 'Rajiv Malhotra',
    institution: 'National Industrial Corridor Development Corporation (NICDC)',
    membersCount: 94,
    activeProjects: 6,
    description: 'Managing industrial land allotment GIS master plans, plug-and-play manufacturing zone polygons, and expressway land acquisition status.'
  },
  {
    id: 'grp-12',
    name: 'Climate Resilience & Soil Salinization Vector Monitoring Group',
    lead: 'Dr. S. Radhakrishnan',
    institution: 'ISRO Space Applications Centre & ICAR-CSSRI Karnal',
    membersCount: 68,
    activeProjects: 4,
    description: 'Integrating multi-spectral Sentinel imagery to monitor coastal salinization, topsoil erosion, and agricultural drought risk vectors.'
  }
];

const FORUM_TOPICS = [
  {
    id: 'th-1',
    title: 'How should presumptive patta discrepancies be reconciled during digital auto-mutation?',
    author: 'Vikramaditya Rao',
    role: 'Policymaker',
    category: 'Land Titling',
    replies: 14,
    upvotes: 28,
    timestamp: '2 hours ago',
    tags: ['Patta', 'AutoMutation', 'Karnataka']
  },
  {
    id: 'th-2',
    title: 'Standardizing CORS station base distances for sub-5cm cadastral parcel accuracy',
    author: 'Dr. Aruna Swaminathan',
    role: 'Researcher',
    category: 'GIS & Geodesy',
    replies: 9,
    upvotes: 35,
    timestamp: 'Yesterday',
    tags: ['CORS', 'SurveyOfIndia', 'Geodesy']
  },
  {
    id: 'th-3',
    title: 'Model legislative clauses for 60-day digital land dispute tribunals',
    author: 'Adv. Meenakshi Sundaram',
    role: 'Legal Scholar',
    category: 'Dispute Resolution',
    replies: 21,
    upvotes: 46,
    timestamp: '3 days ago',
    tags: ['Tribunals', 'Legislation', 'CivilLitigation']
  }
];

const COLLABORATIVE_PROJECTS = [
  {
    id: 'proj-1',
    title: 'Inter-State Conclusive Titling Feasibility Framework',
    lead: 'IIT Delhi & DoLR Taskforce',
    progress: 75,
    phase: 'Legislative Draft Phase',
    deadline: 'December 2026',
    deliverables: ['Model State Act', 'ULPIN Linking Protocol', 'Court Litigation Simulation']
  },
  {
    id: 'proj-2',
    title: 'Floodplain Cadastral Vector Zoning in Cauvery Basin',
    lead: 'Tamil Nadu Revenue Board & Survey of India',
    progress: 45,
    phase: 'Field Orthophoto Survey',
    deadline: 'August 2026',
    deliverables: ['High-Water Mark Spatial Layer', 'Riparian Tenancy Registry', 'Compensation Framework']
  },
  {
    id: 'proj-3',
    title: 'National Land Record Blockchain Provenance Architecture',
    lead: 'NIC & GeoPolicy Nexus Core Team',
    progress: 90,
    phase: 'Pilot Testing & Audit',
    deadline: 'May 2026',
    deliverables: ['Hyperledger Smart Contracts', 'Hash Verification API', 'State Registry Node SDK']
  }
];

export const CollaborationHub = () => {
  const [activeTab, setActiveTab] = useState('groups'); // 'groups' | 'forum' | 'projects'
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicCategory, setNewTopicCategory] = useState('Land Titling');
  const [forumList, setForumList] = useState(FORUM_TOPICS);
  const [showNewTopicForm, setShowNewTopicForm] = useState(false);

  const handleCreateTopic = (e) => {
    e.preventDefault();
    if (!newTopicTitle.trim()) return;

    const topic = {
      id: 'th-' + Date.now(),
      title: newTopicTitle,
      author: 'Praveen',
      role: 'Super Admin',
      category: newTopicCategory,
      replies: 0,
      upvotes: 1,
      timestamp: 'Just now',
      tags: ['Discussion', 'DoLR']
    };

    setForumList([topic, ...forumList]);
    setNewTopicTitle('');
    setShowNewTopicForm(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-6 lg:p-8 space-y-6 font-sans relative overflow-hidden">
      {/* Workspace Collaboration Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1920&auto=format&fit=crop')` }}
      />

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-[#0A3678] font-mono text-xs font-bold uppercase tracking-wider mb-1">
            <Users className="w-4 h-4 text-amber-500" />
            <span>Multi-Stakeholder Innovation Network</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002244]">
            National Land Governance Collaboration Hub
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Shared workspaces connecting researchers, state revenue officers, policymakers, and technical institutes.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
          <button
            onClick={() => setActiveTab('groups')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'groups' ? 'bg-[#0A3678] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Research Groups (12)
          </button>
          <button
            onClick={() => setActiveTab('forum')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'forum' ? 'bg-[#0A3678] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Discussion Forum
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'projects' ? 'bg-[#0A3678] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Shared Projects
          </button>
        </div>
      </div>

      {/* TAB 1: RESEARCH GROUPS */}
      {activeTab === 'groups' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Official Taskforces &amp; Inter-Agency Working Groups</span>
            <span className="font-mono">Ministry of Rural Development Accredited</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RESEARCH_GROUPS.map((grp) => (
              <div
                key={grp.id}
                className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#0A3678] border border-blue-200">
                      Active Working Group
                    </span>
                    <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {grp.membersCount} Members
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">{grp.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{grp.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-mono">Lead Investigator:</span>
                    <span className="font-bold text-slate-800">{grp.lead}</span>
                    <span className="text-[10px] text-slate-500 block truncate">{grp.institution}</span>
                  </div>

                  <button
                    onClick={() => alert(`Joined working group: ${grp.name}. Workspace access credentials dispatched to your official email.`)}
                    className="px-3.5 py-1.5 bg-[#0A3678] hover:bg-[#002244] text-white rounded-lg text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
                  >
                    Join Workspace
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: DISCUSSION FORUM */}
      {activeTab === 'forum' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Peer Consultation &amp; Technical Policy Exchange Board
            </span>
            <button
              onClick={() => setShowNewTopicForm(!showNewTopicForm)}
              className="px-3 py-1.5 bg-[#0A3678] hover:bg-[#002244] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Start New Discussion Thread</span>
            </button>
          </div>

          {showNewTopicForm && (
            <form onSubmit={handleCreateTopic} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
                Start a New Policy Discussion
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    required
                    value={newTopicTitle}
                    onChange={(e) => setNewTopicTitle(e.target.value)}
                    placeholder="Enter discussion topic or technical inquiry..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <select
                    value={newTopicCategory}
                    onChange={(e) => setNewTopicCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  >
                    <option value="Land Titling">Land Titling</option>
                    <option value="GIS & Geodesy">GIS &amp; Geodesy</option>
                    <option value="Dispute Resolution">Dispute Resolution</option>
                    <option value="Agricultural Tenancy">Agricultural Tenancy</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewTopicForm(false)}
                  className="px-3 py-1 text-xs text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#0D7E3A] hover:bg-[#085426] text-white text-xs font-bold rounded-lg shadow-xs"
                >
                  Publish Thread
                </button>
              </div>
            </form>
          )}

          <div className="space-y-3">
            {forumList.map((th) => (
              <div key={th.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      {th.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">{th.timestamp}</span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 hover:text-[#0A3678] cursor-pointer">
                    {th.title}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-blue-700" />
                      <strong>{th.author}</strong> ({th.role})
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                      {th.replies} Replies
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Upvoted discussion thread: "${th.title}"`)}
                  className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200 text-[#0A3678] transition-colors cursor-pointer shrink-0"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-[11px] font-bold font-mono mt-0.5">{th.upvotes}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SHARED PROJECTS */}
      {activeTab === 'projects' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Multi-Agency Implementation Projects</span>
            <span className="font-mono">Milestone Tracking Engine</span>
          </div>

          <div className="space-y-4">
            {COLLABORATIVE_PROJECTS.map((proj) => (
              <div key={proj.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{proj.title}</h3>
                    <p className="text-xs text-slate-500">Lead: <strong>{proj.lead}</strong> &bull; Target: {proj.deadline}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#0A3678] border border-blue-200 self-start sm:self-auto">
                    {proj.phase}
                  </span>
                </div>

                {/* Progress Meter */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-600 font-bold">Milestone Completion:</span>
                    <span className="font-bold text-[#0A3678]">{proj.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#0A3678] h-full rounded-full transition-all duration-700"
                      style={{ width: `${proj.progress}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-2 text-xs">
                  <span className="font-semibold text-slate-700">Deliverables:</span>
                  {proj.deliverables.map((d, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 text-[11px]">
                      &bull; {d}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
