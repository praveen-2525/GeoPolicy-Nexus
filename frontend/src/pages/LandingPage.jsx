import React from 'react';
import { 
  Globe, 
  BookOpen, 
  FileText, 
  Database, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  BarChart3, 
  Layers, 
  MapPin, 
  Users, 
  Award, 
  CheckCircle2, 
  Compass, 
  Building2,
  FileCheck
} from 'lucide-react';
import { Footer } from '../components/Footer';

export const LandingPage = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
      
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-b border-slate-800">
        
        {/* Background Ambient Glow & Grid Pattern */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-600/15 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-10 w-[400px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            
            {/* National Emblem Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs font-semibold text-emerald-400 shadow-xl">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>National Governance Standard &bull; Ministry of Land Policy Innovation</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Evidence-Based <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400 bg-clip-text text-transparent">Land Governance</span> &amp; Policy Innovation
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-light">
              GeoPolicy Nexus unifies spatial research, state legislative frameworks, open cadastral datasets, and drone-surveyed vector layers into a unified national governance ecosystem.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => setCurrentPage('research')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-950/60 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explore Research Repository</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentPage('policies')}
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-300 font-bold text-sm shadow-lg flex items-center gap-2 transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>Access Policy Registry</span>
              </button>

              <button
                onClick={() => setCurrentPage('datasets')}
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-blue-300 font-bold text-sm shadow-lg flex items-center gap-2 transition-all"
              >
                <Database className="w-4 h-4" />
                <span>Geo Datasets (GeoJSON)</span>
              </button>
            </div>

            {/* Governance Pillar Badges */}
            <div className="pt-8 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 14-Digit ULPIN Parcel Tracking</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Multi-Role Access Control (RBAC)</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Open Geospatial Vector Infrastructure</span>
            </div>

          </div>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/60 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">Platform Overview</h2>
            <p className="text-3xl font-extrabold text-white">Bridging Spatial Data and Public Policy</p>
            <p className="text-sm text-slate-400 max-w-2xl mx-auto">
              Empowering decision-makers with empirical spatial intelligence, peer-reviewed research, and standardized legal frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-6 bg-slate-950/80 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Peer-Reviewed Research</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Repository of academic studies, spatial impact assessments, and empirical surveys on land tenure, agricultural zoning, and property titling equity.
              </p>
            </div>

            <div className="p-6 bg-slate-950/80 rounded-2xl border border-slate-800 hover:border-amber-500/50 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-950 text-amber-400 border border-amber-800 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">State Policy Innovation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Comprehensive database of state-level gazetted acts, zoning ordinances, digital land registry mandates, and efficiency impact indicators.
              </p>
            </div>

            <div className="p-6 bg-slate-950/80 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-950 text-blue-400 border border-blue-800 flex items-center justify-center">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Open Spatial Datasets</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                High-resolution GeoJSON, Shapefile, and raster layers providing cadastral boundaries, land use classifications, and climate vulnerability vectors.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">Platform Capabilities</h2>
              <p className="text-3xl font-extrabold text-white mt-1">Core Modular Architecture</p>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              Built for seamless collaboration across government ministries, research institutions, local revenue offices, and citizens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-5 bg-slate-900/60 rounded-xl border border-slate-800 space-y-3">
              <BarChart3 className="w-6 h-6 text-emerald-400" />
              <h4 className="font-bold text-white text-sm">Dispute &amp; Audit Analytics</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Track land title dispute reduction, encumbrance verification speeds, and digital revenue court resolutions.
              </p>
            </div>

            <div className="p-5 bg-slate-900/60 rounded-xl border border-slate-800 space-y-3">
              <Layers className="w-6 h-6 text-amber-400" />
              <h4 className="font-bold text-white text-sm">Multi-Layer Vector GIS</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Overlay agricultural plot boundaries with satellite moisture maps and transit corridor expansion plans.
              </p>
            </div>

            <div className="p-5 bg-slate-900/60 rounded-xl border border-slate-800 space-y-3">
              <Users className="w-6 h-6 text-blue-400" />
              <h4 className="font-bold text-white text-sm">Role-Based Collaboration</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tailored workflows for Admins, Researchers, Policymakers, Citizens, and Partner Institutions.
              </p>
            </div>

            <div className="p-5 bg-slate-900/60 rounded-xl border border-slate-800 space-y-3">
              <FileCheck className="w-6 h-6 text-purple-400" />
              <h4 className="font-bold text-white text-sm">Gazette Policy Verifier</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Verify authentic state notifications, legal citations, and executive orders with digital timestamps.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Live Statistics Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center space-y-2 mb-12">
            <h2 className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono">Platform Metrics</h2>
            <p className="text-3xl font-extrabold text-white">National Impact Dashboard</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            
            <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-2">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">34.2 M+</div>
              <div className="text-xs font-semibold text-slate-300">ULPIN Parcels Mapped</div>
              <div className="text-[10px] text-slate-500">Drone Survey Verification</div>
            </div>

            <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-2">
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-400 font-mono">1,240+</div>
              <div className="text-xs font-semibold text-slate-300">Research Papers</div>
              <div className="text-[10px] text-slate-500">Indexed Peer Studies</div>
            </div>

            <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-2">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono">85+</div>
              <div className="text-xs font-semibold text-slate-300">Active State Policies</div>
              <div className="text-[10px] text-slate-500">28 States &amp; UTs</div>
            </div>

            <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-2">
              <div className="text-3xl sm:text-4xl font-extrabold text-purple-400 font-mono">450+</div>
              <div className="text-xs font-semibold text-slate-300">Open GIS Datasets</div>
              <div className="text-[10px] text-slate-500">GeoJSON Vector Layers</div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer Component */}
      <Footer setCurrentPage={setCurrentPage} />

    </div>
  );
};
