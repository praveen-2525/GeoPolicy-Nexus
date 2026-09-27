import React, { useRef, useEffect, useState } from 'react';
import { 
  Network, 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  AlertCircle, 
  Info, 
  X, 
  ExternalLink, 
  BookOpen, 
  Building2, 
  FileText, 
  ShieldCheck, 
  Search,
  Filter,
  Layers,
  ArrowRight
} from 'lucide-react';
import ForceGraph2D from 'react-force-graph-2d';

// Rich Knowledge Graph Nodes Data with complete detailed metadata
const KNOWLEDGE_GRAPH_DATA = {
  nodes: [
    {
      id: 'Govt_of_India',
      group: 1,
      name: 'Department of Land Resources (DoLR)',
      type: 'Central Government Body',
      description: 'Nodal central department under Ministry of Rural Development responsible for land reforms, DILRMP 2.0, and national ULPIN standards.',
      jurisdiction: 'National (28 States & 8 UTs)',
      impactScore: '98/100',
      val: 24,
      details: {
        established: '1999',
        headquarters: 'New Delhi',
        keySchemes: ['DILRMP 2.0', 'SVAMITVA', 'ULPIN Bhu-Aadhaar', 'Conclusive Titling Framework'],
        connectedCount: 6
      }
    },
    {
      id: 'NITI_Aayog',
      group: 1,
      name: 'NITI Aayog Land Governance Division',
      type: 'Central Policy Think Tank',
      description: 'Apex policy advisory body drafting Model Conclusive Titling Acts and land leasing frameworks for Indian states.',
      jurisdiction: 'National',
      impactScore: '95/100',
      val: 20,
      details: {
        established: '2015',
        headquarters: 'New Delhi',
        keySchemes: ['Model Land Leasing Act', 'Conclusive Titling Taskforce'],
        connectedCount: 4
      }
    },
    {
      id: 'Maharashtra',
      group: 2,
      name: 'State: Maharashtra (Mahabhulekh)',
      type: 'State Jurisdiction',
      description: 'Pioneered digital e-Ferfar mutation workflows, CORS drone surveying in rural villages, and 7/12 extract digitization.',
      jurisdiction: 'State Jurisdiction (36 Districts)',
      impactScore: '89.5%',
      val: 16,
      details: {
        portal: 'Mahabhulekh Portal',
        titlingScore: '89.5%',
        disputeDrop: '-58%',
        connectedCount: 4
      }
    },
    {
      id: 'Karnataka',
      group: 2,
      name: 'State: Karnataka (Bhoomi 2.0)',
      type: 'State Jurisdiction',
      description: 'First state to fully digitalize 20 million Record of Rights (RTC) titles and integrate sub-registrar deeds with real-time vector Patta entries.',
      jurisdiction: 'State Jurisdiction (31 Districts)',
      impactScore: '94.2%',
      val: 18,
      details: {
        portal: 'Bhoomi Portal',
        titlingScore: '94.2%',
        disputeDrop: '-64%',
        connectedCount: 5
      }
    },
    {
      id: 'TamilNadu',
      group: 2,
      name: 'State: Tamil Nadu (e-Patta / AnyROR)',
      type: 'State Jurisdiction',
      description: 'Automated digital Chitta/Adangal issuance, Natham village house site mapping, and CORS spatial reference alignment.',
      jurisdiction: 'State Jurisdiction (38 Districts)',
      impactScore: '86.4%',
      val: 16,
      details: {
        portal: 'e-Services Tamil Nadu',
        titlingScore: '86.4%',
        disputeDrop: '-49%',
        connectedCount: 3
      }
    },
    {
      id: 'Policy_ULPIN',
      group: 3,
      name: 'ULPIN 14-Digit Bhu-Aadhaar Protocol',
      type: 'Policy & Technical Directive',
      description: 'Mandates a unique 14-digit alphanumeric georeferenced ID for every land parcel based on longitude-latitude boundary coordinates.',
      jurisdiction: 'National Mandate',
      impactScore: '99/100',
      val: 14,
      details: {
        gazetteNo: 'GoI No. LRM/2024/01',
        parcelsTagged: '14 Crore+ Parcels',
        accuracy: 'Sub-meter Spatial Accuracy',
        connectedCount: 5
      }
    },
    {
      id: 'Policy_SVAMITVA',
      group: 3,
      name: 'SVAMITVA Scheme Phase III',
      type: 'Policy & Drone Survey Mandate',
      description: 'High-resolution drone mapping of Abadi (inhabited village) land, issuing official Svamitva Property Cards to rural household owners.',
      jurisdiction: 'National Rural Coverage',
      impactScore: '92/100',
      val: 14,
      details: {
        villagesCovered: '50,000+ Villages',
        cardsIssued: '1.5 Crore Households',
        techUsed: 'Survey of India Drone Photogrammetry',
        connectedCount: 4
      }
    },
    {
      id: 'Policy_FRA',
      group: 3,
      name: 'Forest Rights Act (FRA 2006) Digital Titles',
      type: 'Statutory Land Rights Directive',
      description: 'Secures individual and community forest rights (IFR/CFR) for scheduled tribes using GPS spatial boundary verification.',
      jurisdiction: 'Tribal Belts (200+ Districts)',
      impactScore: '88/100',
      val: 12,
      details: {
        beneficiaries: '3.5 Crore Tribal Citizens',
        authority: 'Ministry of Tribal Affairs & MoEFCC',
        connectedCount: 3
      }
    },
    {
      id: 'Paper_01',
      group: 4,
      name: 'Research: Conclusive Titling Economics in India',
      type: 'Peer-Reviewed Research Paper',
      description: 'Empirical analysis proving state-backed conclusive titling increases agricultural formal credit liquidity by 44%.',
      jurisdiction: 'Academic Literature',
      impactScore: 'High Citation',
      val: 8,
      details: {
        author: 'Dr. Ramesh Sundaram et al.',
        journal: 'Journal of Land Use Policy 2024',
        doi: '10.1016/j.landuse.2024.01',
        connectedCount: 3
      }
    },
    {
      id: 'Paper_02',
      group: 4,
      name: 'Research: Spatial Cadastral CORS Accuracy Models',
      type: 'Peer-Reviewed Research Paper',
      description: 'Quantifies boundary dispute reduction when integrating CORS RTK geodetic stations with rural revenue village Patta boundaries.',
      jurisdiction: 'Academic Literature',
      impactScore: 'High Impact',
      val: 8,
      details: {
        author: 'Dr. Aruna Swaminathan',
        journal: 'Spatial Governance Review 2025',
        doi: '10.1016/j.spatialgov.2025.04',
        connectedCount: 2
      }
    },
    {
      id: 'Paper_03',
      group: 4,
      name: 'Research: Peri-Urban Land Pooling & Equity',
      type: 'Peer-Reviewed Research Paper',
      description: 'Evaluates land pooling compensation algorithms across Bengaluru Outer Ring and Mumbai Suburban transit corridors.',
      jurisdiction: 'Academic Literature',
      impactScore: 'Policy Cited',
      val: 8,
      details: {
        author: 'Dr. Vikramaditya Rao',
        journal: 'Urban Land Economics 2025',
        connectedCount: 2
      }
    },
    {
      id: 'IIT_Delhi',
      group: 5,
      name: 'IIT Delhi Geodesy & Remote Sensing Lab',
      type: 'Academic & Research Institution',
      description: 'Leading research university partnering with Survey of India for CORS satellite network validation and drone AI cadastral extraction.',
      jurisdiction: 'New Delhi (National)',
      impactScore: 'Tier-1 Partner',
      val: 12,
      details: {
        department: 'Department of Civil & Geoinformatics',
        activeProjects: 4,
        connectedCount: 3
      }
    },
    {
      id: 'IIM_Ahmedabad',
      group: 5,
      name: 'IIM Ahmedabad Center for Land Governance',
      type: 'Academic & Research Institution',
      description: 'Specializes in econometrics of land titles, dispute litigation cost modeling, and sub-registrar digital transaction audits.',
      jurisdiction: 'Gujarat (National)',
      impactScore: 'Tier-1 Partner',
      val: 12,
      details: {
        department: 'Public Policy Center',
        activeProjects: 3,
        connectedCount: 3
      }
    }
  ],
  links: [
    { source: 'Govt_of_India', target: 'NITI_Aayog', value: 3, label: 'Policy Alignment' },
    { source: 'Govt_of_India', target: 'Maharashtra', value: 4, label: 'DILRMP Implementation' },
    { source: 'Govt_of_India', target: 'Karnataka', value: 4, label: 'DILRMP Implementation' },
    { source: 'Govt_of_India', target: 'TamilNadu', value: 3, label: 'DILRMP Implementation' },
    { source: 'Govt_of_India', target: 'Policy_ULPIN', value: 5, label: 'National Rollout' },
    { source: 'Govt_of_India', target: 'Policy_SVAMITVA', value: 5, label: 'National Rollout' },
    { source: 'NITI_Aayog', target: 'Policy_ULPIN', value: 4, label: 'Drafted Mandate' },
    { source: 'Maharashtra', target: 'Policy_ULPIN', value: 4, label: 'Integrated Portal' },
    { source: 'Karnataka', target: 'Policy_ULPIN', value: 5, label: 'Bhoomi 2.0 Integration' },
    { source: 'TamilNadu', target: 'Policy_SVAMITVA', value: 3, label: 'Village Drone Survey' },
    { source: 'Maharashtra', target: 'Policy_FRA', value: 3, label: 'Tribal Title Grants' },
    { source: 'IIT_Delhi', target: 'Paper_02', value: 3, label: 'Authored Study' },
    { source: 'IIM_Ahmedabad', target: 'Paper_01', value: 3, label: 'Authored Study' },
    { source: 'Paper_01', target: 'Policy_ULPIN', value: 4, label: 'Empirical Evidence' },
    { source: 'Paper_02', target: 'Policy_SVAMITVA', value: 4, label: 'Drone Model Verification' },
    { source: 'Paper_03', target: 'Karnataka', value: 3, label: 'Bengaluru Case Study' },
    { source: 'IIT_Delhi', target: 'Policy_SVAMITVA', value: 2, label: 'Technical Audit' },
    { source: 'IIM_Ahmedabad', target: 'NITI_Aayog', value: 2, label: 'Advisory Panel' }
  ]
};

// Node Group Definitions for Color Legend
const NODE_GROUPS = [
  {
    group: 1,
    color: '#0A3678',
    label: 'Central Government Bodies',
    description: 'Nodal ministries and policy divisions creating national directives (e.g. DoLR, NITI Aayog).'
  },
  {
    group: 2,
    color: '#3B82F6',
    label: 'State Jurisdictions',
    description: 'Regional revenue departments and land record portals (e.g. Bhoomi, Mahabhulekh, AnyROR).'
  },
  {
    group: 3,
    color: '#D97706',
    label: 'Policy Directives & Mandates',
    description: 'Gazetted enactments and digital standards (e.g. ULPIN Bhu-Aadhaar, SVAMITVA, FRA 2006).'
  },
  {
    group: 4,
    color: '#059669',
    label: 'Research Papers & Literature',
    description: 'Peer-reviewed empirical studies and econometric evaluations of land titling.'
  },
  {
    group: 5,
    color: '#7C3AED',
    label: 'Academic & Research Institutes',
    description: 'Partner universities and research laboratories generating spatial evidence (e.g. IIT Delhi, IIM A).'
  }
];

export const KnowledgeGraphDashboard = () => {
  const fgRef = useRef();
  const [selectedNode, setSelectedNode] = useState(KNOWLEDGE_GRAPH_DATA.nodes[0]); // Default inspect central body
  const [filterGroup, setFilterGroup] = useState(null); // null = show all
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef();

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const filteredGraphData = React.useMemo(() => {
    if (!filterGroup) return KNOWLEDGE_GRAPH_DATA;
    const allowedNodeIds = new Set(
      KNOWLEDGE_GRAPH_DATA.nodes.filter(n => n.group === filterGroup).map(n => n.id)
    );
    return {
      nodes: KNOWLEDGE_GRAPH_DATA.nodes.filter(n => n.group === filterGroup),
      links: KNOWLEDGE_GRAPH_DATA.links.filter(l => 
        allowedNodeIds.has(typeof l.source === 'object' ? l.source.id : l.source) ||
        allowedNodeIds.has(typeof l.target === 'object' ? l.target.id : l.target)
      )
    };
  }, [filterGroup]);

  const handleZoomIn = () => {
    if (fgRef.current) {
      const currentZoom = fgRef.current.zoom();
      fgRef.current.zoom(currentZoom * 1.25, 400);
    }
  };

  const handleZoomOut = () => {
    if (fgRef.current) {
      const currentZoom = fgRef.current.zoom();
      fgRef.current.zoom(currentZoom / 1.25, 400);
    }
  };

  const handleFit = () => {
    if (fgRef.current) {
      fgRef.current.zoomToFit(400, 50);
    }
  };

  const getNodeColor = (node) => {
    const grp = NODE_GROUPS.find(g => g.group === node.group);
    return grp ? grp.color : '#94A3B8';
  };

  const handleNodeClick = (node) => {
    setSelectedNode(node);
    if (fgRef.current) {
      fgRef.current.centerAt(node.x, node.y, 400);
      fgRef.current.zoom(2.5, 400);
    }
  };

  // Find connected links and nodes for the selected inspector
  const connectedLinks = selectedNode ? KNOWLEDGE_GRAPH_DATA.links.filter(l => {
    const srcId = typeof l.source === 'object' ? l.source.id : l.source;
    const tgtId = typeof l.target === 'object' ? l.target.id : l.target;
    return srcId === selectedNode.id || tgtId === selectedNode.id;
  }) : [];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-6 lg:p-8 font-sans space-y-6 flex flex-col relative overflow-hidden">
      
      {/* Page Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-[#0A3678] font-mono text-xs font-bold uppercase tracking-wider mb-1">
            <Network className="w-4 h-4 text-amber-500" />
            <span>National Spatial Ontology &amp; Knowledge Graph Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002244] tracking-tight">
            National Land Governance Knowledge Graph
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 max-w-3xl">
            Interactive relational network mapping connections between Central Ministries, State Registries, Policy Directives, Academic Research Papers, and Universities. Click any node to inspect detailed governance metadata.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setFilterGroup(null)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterGroup === null ? 'bg-[#0A3678] text-white shadow-xs' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            Show All Nodes ({KNOWLEDGE_GRAPH_DATA.nodes.length})
          </button>
          {NODE_GROUPS.map(grp => (
            <button
              key={grp.group}
              onClick={() => setFilterGroup(grp.group === filterGroup ? null : grp.group)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                filterGroup === grp.group ? 'text-white shadow-xs' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
              style={{ backgroundColor: filterGroup === grp.group ? grp.color : undefined }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: grp.color }} />
              <span>Group {grp.group}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Color Legend Breakdown Section (Explaining every color in full detail) */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider flex items-center gap-1.5">
            <Info className="w-4 h-4 text-[#0A3678]" />
            <span>Ontology Node Color Legend &amp; Entity Classification</span>
          </span>
          <span className="text-[10px] text-slate-400 font-mono">Click legend item to filter graph view</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          {NODE_GROUPS.map(grp => {
            const isSelected = filterGroup === grp.group;
            return (
              <div
                key={grp.group}
                onClick={() => setFilterGroup(isSelected ? null : grp.group)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  isSelected ? 'border-[#0A3678] bg-blue-50/80 shadow-xs' : 'border-slate-200 bg-slate-50/70 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-3.5 h-3.5 rounded-full shrink-0 shadow-2xs" style={{ backgroundColor: grp.color }} />
                  <span className="font-bold text-slate-900 text-xs truncate">{grp.label}</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">{grp.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Canvas + Inspector Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[600px]">
        
        {/* Graph Visualization Container (8 Cols) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl relative overflow-hidden flex flex-col" ref={containerRef}>
          
          {/* Controls Bar */}
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <div className="bg-slate-800/90 backdrop-blur border border-slate-700 rounded-xl shadow-md flex items-center p-1 text-slate-200">
              <button onClick={handleZoomIn} className="p-2 hover:bg-slate-700 rounded-lg transition-colors" title="Zoom In"><ZoomIn className="w-4 h-4"/></button>
              <button onClick={handleZoomOut} className="p-2 hover:bg-slate-700 rounded-lg transition-colors" title="Zoom Out"><ZoomOut className="w-4 h-4"/></button>
              <button onClick={handleFit} className="p-2 hover:bg-slate-700 rounded-lg transition-colors" title="Fit to Screen"><Maximize className="w-4 h-4"/></button>
            </div>
          </div>

          {/* Graph Canvas */}
          <div className="flex-1 cursor-grab active:cursor-grabbing">
            {filteredGraphData.nodes.length > 0 && (
              <ForceGraph2D
                ref={fgRef}
                width={dimensions.width}
                height={dimensions.height}
                graphData={filteredGraphData}
                nodeLabel="name"
                nodeColor={getNodeColor}
                nodeRelSize={7}
                linkColor={() => '#475569'}
                linkWidth={1.8}
                linkDirectionalParticles={3}
                linkDirectionalParticleWidth={2}
                linkDirectionalParticleSpeed={0.005}
                d3VelocityDecay={0.1}
                onNodeClick={handleNodeClick}
                onNodeDragEnd={node => {
                  node.fx = node.x;
                  node.fy = node.y;
                }}
              />
            )}
          </div>
        </div>

        {/* Node Inspector Panel (4 Cols - Google Knowledge Graph style sidebar) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between overflow-y-auto custom-scrollbar shadow-xs">
          {selectedNode ? (
            <div className="space-y-4">
              
              {/* Header Badge & Title */}
              <div className="border-b border-slate-100 pb-3 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span 
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white uppercase font-mono shadow-2xs"
                    style={{ backgroundColor: getNodeColor(selectedNode) }}
                  >
                    {selectedNode.type}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">ID: {selectedNode.id}</span>
                </div>

                <h2 className="text-base font-extrabold text-slate-900 leading-snug">
                  {selectedNode.name}
                </h2>
              </div>

              {/* Bio / Description */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  Entity Overview
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {selectedNode.description}
                </p>
              </div>

              {/* Key Metadata Table */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between items-center border-b border-slate-200/60 pb-1.5">
                  <span className="text-slate-500">Jurisdiction / Scope:</span>
                  <span className="font-bold text-[#0A3678] font-mono">{selectedNode.jurisdiction}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Governance Index:</span>
                  <span className="font-extrabold text-emerald-700 font-mono">{selectedNode.impactScore}</span>
                </div>
              </div>

              {/* Specific Details */}
              {selectedNode.details && (
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                    Specific Parameters
                  </span>
                  <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-xs space-y-1 text-slate-700">
                    {Object.entries(selectedNode.details).map(([key, val]) => (
                      <div key={key} className="flex justify-between py-0.5">
                        <span className="capitalize text-slate-500 text-[11px]">{key.replace(/([A-Z])/g, ' $1')}:</span>
                        <span className="font-semibold text-slate-900 text-right max-w-[180px] truncate">
                          {Array.isArray(val) ? val.join(', ') : val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Connected Knowledge Links */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  Connected Graph Relational Edges ({connectedLinks.length})
                </span>

                <div className="space-y-1.5 max-h-36 overflow-y-auto custom-scrollbar">
                  {connectedLinks.map((link, idx) => {
                    const targetId = typeof link.target === 'object' ? link.target.id : link.target;
                    const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
                    const otherId = targetId === selectedNode.id ? sourceId : targetId;
                    const otherNode = KNOWLEDGE_GRAPH_DATA.nodes.find(n => n.id === otherId);

                    return (
                      <button
                        key={idx}
                        onClick={() => otherNode && handleNodeClick(otherNode)}
                        className="w-full text-left p-2 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200 text-xs flex items-center justify-between transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-1.5 truncate pr-1">
                          <span 
                            className="w-2 h-2 rounded-full shrink-0" 
                            style={{ backgroundColor: otherNode ? getNodeColor(otherNode) : '#94A3B8' }} 
                          />
                          <span className="truncate font-medium text-slate-800">{otherNode?.name || otherId}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono shrink-0 group-hover:text-[#0A3678]">
                          {link.label || 'Linked'} &rarr;
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-2 text-slate-400 py-10">
              <Info className="w-8 h-8 text-slate-300" />
              <p className="text-xs font-semibold">Click any node in the Knowledge Graph to inspect full entity details.</p>
            </div>
          )}

          <div className="pt-3 border-t border-slate-100 text-[10px] text-slate-400 font-mono flex items-center justify-between">
            <span>Force-Directed Ontology Engine</span>
            <span>2026 National Registry</span>
          </div>
        </div>

      </div>

    </div>
  );
};
