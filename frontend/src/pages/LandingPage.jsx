import React, { useState, useContext } from 'react';
import { 
  Globe, 
  BookOpen, 
  FileText, 
  Database, 
  ShieldCheck, 
  Search, 
  ArrowRight, 
  BarChart3, 
  Layers, 
  MapPin, 
  Users, 
  Award, 
  CheckCircle2, 
  Compass, 
  Building2,
  FileCheck,
  Cpu,
  Bot,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Landmark,
  Shield,
  LogIn,
  UserPlus,
  HelpCircle,
  Scale
} from 'lucide-react';
import { Footer } from '../components/Footer';
import { AboutUsSection } from '../components/AboutUsSection';
import { PublicLandSearchSection } from '../components/PublicLandSearchSection';
import { HomeAuthTabModal } from '../components/HomeAuthTabModal';
import { HomeChatbotWidget } from '../components/HomeChatbotWidget';
import { RevenueDeptModal } from '../components/RevenueDeptModal';
import { STATE_REVENUE_DEPARTMENTS } from '../data/revenueDeptData';
import { AuthContext } from '../context/AuthContext';

export const LandingPage = ({ setCurrentPage }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isGeoGptOpen, setIsGeoGptOpen] = useState(false);
  const [selectedRevenueDept, setSelectedRevenueDept] = useState(null);
  const { user } = useContext(AuthContext);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    sessionStorage.setItem('geopolicy_search_query', searchQuery.trim());
    if (searchCategory === 'research') setCurrentPage('research');
    else if (searchCategory === 'policies') setCurrentPage('policies');
    else if (searchCategory === 'datasets') setCurrentPage('datasets');
    else setCurrentPage('research');
  };

  return (
    <div className="min-h-screen bg-[#05070E] text-slate-100 flex flex-col font-sans">
      
      {/* 1. National Land Governance Intelligence Platform Banner */}
      <section className="bg-gradient-to-r from-[#030712] via-[#0F172A] to-[#030712] text-white py-3 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="font-bold tracking-wide uppercase text-amber-300 font-mono text-[11px]">
              National Initiative
            </span>
            <span className="hidden sm:inline text-blue-200">|</span>
            <span className="text-slate-100 font-medium">
              National Land Governance Intelligence Platform &bull; Department of Land Resources
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-blue-200 font-mono">
            <span>DILRMP &amp; ULPIN Compliant</span>
            <span>&bull;</span>
            <span className="text-emerald-300 font-bold">28 States Connected</span>
          </div>
        </div>
      </section>

      {/* 2. Hero Section with Realistic Satellite Background & Login/Register CTA */}
      <section className="relative pt-10 pb-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200 overflow-hidden text-slate-900">
        
        {/* Satellite Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1920&auto=format&fit=crop')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-blue-50/50 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Government Badge & Portal Title */}
              <div className="space-y-3 relative">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#002244] border border-blue-900 text-xs font-bold text-white shadow-sm">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
                    alt="Emblem of India" 
                    className="w-5 h-7 object-contain invert brightness-200"
                  />
                  <div className="flex flex-col">
                    <span className="text-amber-300 font-bold text-[10px] leading-none">भारत सरकार | Government of India</span>
                    <span className="text-blue-200 text-[10px] leading-none">Ministry of Rural Development &bull; DoLR</span>
                  </div>
                </div>

                {/* Main GEOPOLICY NEXUS Title Card */}
                <div className="relative p-6 sm:p-8 rounded-3xl overflow-hidden border border-blue-100 shadow-lg bg-gradient-to-r from-blue-900 via-[#0A3678] to-[#002244]">
                  <img 
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop" 
                    alt="National Spatial Cadastral Map Satellite View" 
                    className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-overlay"
                  />
                  <div className="relative z-10 space-y-2">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white drop-shadow-md" style={{fontFamily: 'Arial, Helvetica, sans-serif'}}>
                      GEOPOLICY NEXUS
                    </h1>
                    <p className="text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-wider font-mono">
                      National Land Governance &amp; Policy Innovation Portal
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-slate-700 text-sm leading-relaxed max-w-2xl font-sans">
                Connecting India’s spatial research community, state revenue departments, and central ministries to unify peer-reviewed studies, legislative frameworks, open cadastral vectors, site numbers, and drone-surveyed spatial layers into one transparent governance ecosystem.
              </p>

              {/* Global Search Bar */}
              <div className="bg-white p-3 rounded-2xl border border-slate-300 shadow-md max-w-2xl space-y-2">
                <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-slate-400 ml-2 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search 12,500+ research papers, state policies, site numbers, ULPIN datasets..."
                    className="flex-1 bg-transparent text-xs text-slate-900 placeholder-slate-400 focus:outline-none font-medium"
                  />
                  <select
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                    className="bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-lg px-2 py-1.5 focus:outline-none hidden sm:block font-medium"
                  >
                    <option value="all">All Modules</option>
                    <option value="research">Research Papers</option>
                    <option value="policies">State Policies</option>
                    <option value="datasets">Spatial Datasets</option>
                  </select>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#0A3678] hover:bg-[#002244] text-white rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer shadow-sm"
                  >
                    Search Portal
                  </button>
                </form>
              </div>

              {/* Action & Login/Register Buttons Bar */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                
                {/* Login / Register Tab Button on Home Page */}
                <button
                  onClick={() => setIsAuthModalOpen(!isAuthModalOpen)}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs shadow-md flex items-center gap-2 transition-all cursor-pointer border border-amber-300 transform active:scale-95"
                >
                  <LogIn className="w-4 h-4 text-slate-950" />
                  <span>Login / Register Tab</span>
                </button>

                <button
                  onClick={() => setCurrentPage('gis')}
                  className="px-5 py-2.5 rounded-xl bg-[#0A3678] hover:bg-[#002244] text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Launch GIS Engine</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsGeoGptOpen(!isGeoGptOpen)}
                  className="px-5 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#0A3678] font-bold text-xs shadow-sm flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Bot className="w-4 h-4 text-blue-700 animate-bounce" />
                  <span>Ask GeoGPT AI</span>
                </button>
              </div>

            </div>

            {/* Right Side: GeoPolicy Showcase Card & Login Tab */}
            <div className="lg:col-span-5 relative flex flex-col gap-4 justify-center">
              
              {/* Login / Register Card Modal Embedded directly on Home page */}
              {isAuthModalOpen ? (
                <div className="animate-fadeIn">
                  <HomeAuthTabModal 
                    setCurrentPage={setCurrentPage} 
                    onClose={() => setIsAuthModalOpen(false)} 
                  />
                </div>
              ) : (
                /* Hero Spatial Intelligence Showcase Card */
                <div className="bg-gradient-to-br from-slate-900 via-[#0A3678] to-slate-950 p-6 rounded-3xl border border-slate-700 shadow-2xl text-white space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-md">
                        <Globe className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-sm text-white">National GeoPolicy Hub</h3>
                        <p className="text-[10px] text-blue-200">Department of Land Resources &bull; GoI</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-400 text-slate-950">
                      Live GIS &amp; ULPIN
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-white/10 rounded-2xl border border-white/10 space-y-1">
                      <span className="text-[10px] text-slate-300 font-mono block">Connected States</span>
                      <span className="text-base font-black text-amber-300 block">28 States &amp; UTs</span>
                    </div>
                    <div className="p-3 bg-white/10 rounded-2xl border border-white/10 space-y-1">
                      <span className="text-[10px] text-slate-300 font-mono block">Digitized Parcels</span>
                      <span className="text-base font-black text-emerald-300 block">14.2 Crore ULPINs</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-amber-300 font-bold">
                      <span className="flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4" />
                        <span>State Revenue Portals</span>
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400">100% Online</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      Instant access to <strong>Karnataka Bhoomi &amp; Kaveri 2.0</strong>, Maharashtra Mahabhulekh, Tamil Nilam, and Telangana Dharani for RoR, Patta/Chitta, and site document verification.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <button
                      onClick={() => setIsGeoGptOpen(true)}
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                    >
                      <Bot className="w-4 h-4 text-slate-950" />
                      <span>Launch GeoGPT AI Chatbot →</span>
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* 3. Dedicated STATE & DISTRICT REVENUE DEPARTMENTS REGISTRY */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider mb-1">
                <Building2 className="w-4 h-4" />
                <span>State &amp; District Revenue Administration</span>
              </div>
              <h2 className="text-2xl font-black text-white">
                Official Revenue Department Portals &amp; Sub-Registrar Offices
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Click any State Revenue Department below to inspect official portals, collectorate addresses, digitized RoR counts, and sub-registrar office networks.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STATE_REVENUE_DEPARTMENTS.map((dept, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedRevenueDept(dept)}
                className="p-5 rounded-2xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700 hover:border-amber-400 text-left transition-all cursor-pointer space-y-3 group shadow-md"
              >
                <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                  <span className="font-extrabold text-white text-base group-hover:text-amber-300">
                    {dept.state}
                  </span>
                  <span className="text-[10px] font-mono font-bold bg-blue-900/80 text-blue-200 px-2 py-0.5 rounded border border-blue-700">
                    {dept.sroOfficeCount} SROs
                  </span>
                </div>

                <div className="text-xs space-y-1 text-slate-300">
                  <div className="font-semibold text-slate-200 truncate">{dept.departmentName}</div>
                  <div className="text-amber-400 font-mono font-bold text-[11px]">{dept.portalName}</div>
                  <div className="text-[10px] text-slate-400">{dept.digitizedRorCount}</div>
                </div>

                <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px] font-bold text-blue-300 group-hover:text-amber-300">
                  <span>Inspect Department →</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Dedicated PUBLIC LAND OWNER & SITE NUMBER REGISTRY SECTION */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-100">
        <div className="max-w-7xl mx-auto">
          <PublicLandSearchSection />
        </div>
      </section>

      {/* 5. Dedicated ABOUT US SECTION */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AboutUsSection setCurrentPage={setCurrentPage} />
        </div>
      </section>

      {/* 6. Revenue Dept Inspection Modal */}
      {selectedRevenueDept && (
        <RevenueDeptModal
          deptData={selectedRevenueDept}
          onClose={() => setSelectedRevenueDept(null)}
        />
      )}

      {/* 7. Floating GeoGPT AI Chatbot Drawer on Right Side */}
      {isGeoGptOpen && (
        <div className="fixed bottom-24 right-6 w-[420px] max-w-[calc(100vw-2.5rem)] h-[620px] z-[9999] shadow-2xl rounded-3xl animate-fadeIn">
          <HomeChatbotWidget onClose={() => setIsGeoGptOpen(false)} />
        </div>
      )}

      {/* Floating Right-Side GeoGPT Icon Button */}
      <button
        onClick={() => setIsGeoGptOpen(!isGeoGptOpen)}
        className={`fixed bottom-6 right-6 z-[9999] p-4 rounded-full shadow-2xl flex items-center gap-3 transition-all transform hover:scale-105 active:scale-95 cursor-pointer font-extrabold text-xs ${
          isGeoGptOpen 
            ? 'bg-red-500 hover:bg-red-600 text-white ring-4 ring-red-400/40' 
            : 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 text-slate-950 ring-4 ring-amber-300/50 shadow-amber-500/30'
        }`}
        title="Toggle GeoGPT AI Assistant"
      >
        <div className="relative flex items-center justify-center">
          <Bot className="w-6 h-6 text-slate-950" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-950 animate-ping" />
        </div>
        <span className="hidden sm:inline font-black tracking-tight">
          {isGeoGptOpen ? 'Close AI Assistant' : 'GeoGPT AI Chatbot'}
        </span>
      </button>

      {/* Footer */}
      <Footer setCurrentPage={setCurrentPage} />

    </div>
  );
};
