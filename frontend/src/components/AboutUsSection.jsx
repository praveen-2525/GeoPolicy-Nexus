import React from 'react';
import { 
  Building2, 
  Globe, 
  ShieldCheck, 
  BookOpen, 
  FileText, 
  Database, 
  MapPin, 
  Cpu, 
  Bot, 
  MonitorPlay, 
  Network, 
  Rocket, 
  Users, 
  BarChart3, 
  ShieldAlert, 
  Code, 
  CheckCircle2, 
  ArrowRight,
  Landmark,
  Scale
} from 'lucide-react';

export const AboutUsSection = ({ setCurrentPage }) => {
  const PLATFORM_FEATURES = [
    {
      icon: MapPin,
      title: 'National GIS Cadastral Engine',
      description: 'Zero API-key dependency OpenStreetMap + Leaflet + ISRO Bhuvan satellite layer engine mapping cadastral boundaries across 28 states & 800+ districts with site number search.'
    },
    {
      icon: ShieldCheck,
      title: 'ULPIN Bhu-Aadhaar & Identity Verification',
      description: '14-digit unique land parcel identification with integrated UIDAI Aadhaar e-KYC and NSDL/ITD PAN verification for conclusive titling fraud prevention.'
    },
    {
      icon: Scale,
      title: 'Land Dispute Analytics & Resolution',
      description: 'Real-time tracking of civil pendency, boundary incongruities, and post-ULPIN dispute reduction drop rates with tribunal mediation support.'
    },
    {
      icon: Bot,
      title: 'GeoGPT Multilingual AI Copilot',
      description: 'Google Gemini API-powered AI assistant answering complex land laws, policy gazettes, statutory acts, and research queries across 12 Indian languages.'
    },
    {
      icon: Cpu,
      title: 'Policy Impact Simulation Sandbox',
      description: 'Algorithmic simulator allowing policymakers to model land reform policies before implementation with economic, environmental, and social impact scoring.'
    },
    {
      icon: MonitorPlay,
      title: 'Digital Twin of India (2020–2050)',
      description: 'Interactive spatio-temporal modeling simulating urban expansion, climate resilience, desertification risks, and flood vulnerability through 2050.'
    },
    {
      icon: Network,
      title: 'Knowledge Graph Ontology Engine',
      description: 'Interactive force-directed graph connecting 12,500+ research papers, state policy gazettes, spatial datasets, universities, and revenue authors.'
    },
    {
      icon: Code,
      title: 'Government Integration Hub & Open API',
      description: 'REST and GeoJSON API gateway providing secure developer keys for DILRMP, Bhuvan, Survey of India, PM Gati Shakti, and Census systems.'
    }
  ];

  return (
    <section id="about-us" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 via-[#0A3678] to-slate-900 text-white rounded-3xl my-8 shadow-2xl relative overflow-hidden">
      
      {/* Background Ashoka Chakra Overlay */}
      <div className="absolute -right-20 -top-20 opacity-5 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-96 h-96 text-white" fill="currentColor">
          <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="4" />
          {[...Array(24)].map((_, i) => (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={50 + 44 * Math.cos((i * 15 * Math.PI) / 180)}
              y2={50 + 44 * Math.sin((i * 15 * Math.PI) / 180)}
              stroke="currentColor"
              strokeWidth="2"
            />
          ))}
        </svg>
      </div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Header Badge & Title */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider font-mono">
            <Landmark className="w-4 h-4" />
            <span>Official Government Portal Overview</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            About GeoPolicy Nexus
          </h2>
          
          <p className="text-sm sm:text-base text-blue-100 leading-relaxed font-sans">
            GeoPolicy Nexus is India’s apex National Digital Platform for Spatial Research, Policy Innovation, and Evidence-Based Land Governance, operated under the Department of Land Resources (DoLR), Ministry of Rural Development, Government of India.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 font-bold flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-lg text-white">What Our Platform Is About</h3>
            <p className="text-xs text-blue-100 leading-relaxed">
              Unifying 12,500+ peer-reviewed spatial studies, state policy gazettes, cadastral vector layers, drone survey orthophotos, and revenue court records into one transparent national ecosystem.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-400 text-slate-950 font-bold flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-lg text-white">Conclusive Land Titling</h3>
            <p className="text-xs text-blue-100 leading-relaxed">
              Accelerating India’s transition from presumptive deed registration to state-backed conclusive land titling through ULPIN (Bhu-Aadhaar) digital parcel identification and SVAMITVA drone surveys.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-400 text-slate-950 font-bold flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-lg text-white">Evidence-Based Governance</h3>
            <p className="text-xs text-blue-100 leading-relaxed">
              Empowering central ministries, state revenue boards, researchers, and citizens with honest, verified analytics, flood vulnerability zoning, water scarcity indicators, and policy impact sandboxes.
            </p>
          </div>

        </div>

        {/* What We Provide Grid */}
        <div className="space-y-6">
          <div className="text-center">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-widest font-mono">
              Core Capabilities &amp; Services
            </span>
            <h3 className="text-2xl font-extrabold text-white mt-1">What We Provide</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PLATFORM_FEATURES.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="bg-slate-900/60 p-5 rounded-2xl border border-slate-700/80 space-y-2 hover:border-amber-400/50 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-amber-300 flex items-center justify-center font-bold">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm text-white">{feature.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Official Social Media Channels Banner */}
        <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-700/80 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">Public Outreach &amp; Community Connect</span>
              <h4 className="text-xl font-black text-white">Official Social Media Pages</h4>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-800">
              Verified DoLR Handles
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Facebook */}
            <a
              href="https://facebook.com/GeoPolicyNexus"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-slate-900 rounded-xl border border-slate-700 hover:border-blue-500 flex items-center gap-3 transition-all hover:scale-105 shadow-md group"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <div className="text-xs">
                <div className="font-bold text-white group-hover:text-blue-400">Facebook Page</div>
                <div className="text-slate-400 text-[11px]">@GeoPolicyNexus</div>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/918022253761?text=Hello%20GeoPolicy%20Nexus%20Helpdesk"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-slate-900 rounded-xl border border-slate-700 hover:border-emerald-500 flex items-center gap-3 transition-all hover:scale-105 shadow-md group"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </div>
              <div className="text-xs">
                <div className="font-bold text-white group-hover:text-emerald-400">WhatsApp Helpdesk</div>
                <div className="text-slate-400 text-[11px]">+91 80-22253761</div>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/geopolicy_nexus"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-slate-900 rounded-xl border border-slate-700 hover:border-pink-500 flex items-center gap-3 transition-all hover:scale-105 shadow-md group"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <div className="text-xs">
                <div className="font-bold text-white group-hover:text-pink-400">Instagram Handle</div>
                <div className="text-slate-400 text-[11px]">@geopolicy_nexus</div>
              </div>
            </a>

            {/* Twitter / X */}
            <a
              href="https://x.com/GeoPolicyNexus"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-slate-900 rounded-xl border border-slate-700 hover:border-slate-400 flex items-center gap-3 transition-all hover:scale-105 shadow-md group"
            >
              <div className="w-10 h-10 rounded-lg bg-black text-white border border-slate-700 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
              <div className="text-xs">
                <div className="font-bold text-white group-hover:text-amber-300">Twitter / X</div>
                <div className="text-slate-400 text-[11px]">@GeoPolicyNexus</div>
              </div>
            </a>

          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-amber-400 text-slate-950 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 font-sans shadow-lg">
          <div className="space-y-1">
            <h4 className="font-extrabold text-lg">Ready to Explore Official Spatial Datasets?</h4>
            <p className="text-xs text-slate-900 font-medium">Access public land parcel search, GIS maps, or consult our AI Copilot instantly.</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setCurrentPage('gis')}
              className="px-4 py-2 bg-[#002244] hover:bg-[#0A3678] text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
            >
              <span>Explore GIS Engine</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
