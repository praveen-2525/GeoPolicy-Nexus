import React from 'react';
import { 
  Building2, 
  ExternalLink, 
  ShieldCheck, 
  FileCheck2, 
  Mail, 
  Phone, 
  Globe, 
  HelpCircle,
  Award
} from 'lucide-react';

export const Footer = ({ setCurrentPage }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 font-sans border-t border-slate-800 text-xs">
      
      {/* Tricolor Ribbon on Top of Footer */}
      <div className="tricolor-stripe"></div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Government Identity & Seal */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-amber-400 bg-slate-950 flex items-center justify-center p-1 shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full text-amber-400" fill="currentColor">
                  <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="4" />
                  <circle cx="50" cy="50" r="7" fill="currentColor" />
                  {[...Array(24)].map((_, i) => (
                    <line
                      key={i}
                      x1="50"
                      y1="50"
                      x2={50 + 44 * Math.cos((i * 15 * Math.PI) / 180)}
                      y2={50 + 44 * Math.sin((i * 15 * Math.PI) / 180)}
                      stroke="currentColor"
                      strokeWidth="2.5"
                    />
                  ))}
                </svg>
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base tracking-tight">GeoPolicy Nexus</h3>
                <p className="text-[11px] text-amber-400 font-mono">National Land Governance Intelligence Platform</p>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-[11px] max-w-sm">
              An evidence-based initiative by the <strong>Department of Land Resources (DoLR)</strong>, 
              <strong> Ministry of Rural Development</strong>, Government of India, bridging spatial science, 
              cadastral vector intelligence, legislative policies, and citizen land tenure equity.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="px-2 py-1 rounded bg-slate-800 text-[10px] text-slate-300 border border-slate-700 font-mono">
                14-Digit ULPIN Standard
              </span>
              <span className="px-2 py-1 rounded bg-slate-800 text-[10px] text-slate-300 border border-slate-700 font-mono">
                DILRMP Compatible
              </span>
              <span className="px-2 py-1 rounded bg-slate-800 text-[10px] text-slate-300 border border-slate-700 font-mono">
                DPDP Act 2023
              </span>
            </div>
          </div>

          {/* Col 2: Core Platform Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider border-b border-slate-800 pb-1 font-mono text-amber-400">
              Platform Modules
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button onClick={() => setCurrentPage('gis')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  GIS Intelligence Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('research')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  National Research Repository
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('policies')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  State Policy Gazette Registry
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('datasets')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Open Spatial Datasets Bank
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('simulator')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Policy Innovation Lab
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('ai')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  AI Research Copilot
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Advanced Ecosystem Services */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider border-b border-slate-800 pb-1 font-mono text-amber-400">
              Governance &amp; Tech
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button onClick={() => setCurrentPage('collaboration')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Collaboration Hub &amp; Workspaces
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('analytics')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Executive Land Dispute Analytics
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('blockchain')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Blockchain Title &amp; Doc Trust
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('api-portal')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Open API Developer Portal
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('cybersecurity')} className="hover:text-amber-400 transition-colors cursor-pointer">
                  Cybersecurity &amp; CERT-In Status
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Compliance & Grievance Redressal */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider border-b border-slate-800 pb-1 font-mono text-amber-400">
              Government Support
            </h4>
            <div className="space-y-2 text-[11px] text-slate-400">
              <div className="flex items-start gap-2">
                <Building2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                <span>NBO Building, Nirman Bhawan, New Delhi - 110011</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>support-geopolicy@gov.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Toll-Free: 1800-11-2026 (DoLR Helpdesk)</span>
              </div>
              <div className="pt-2">
                <span className="text-[10px] text-slate-500 block">CPGRAMS Integrated Portal</span>
                <span className="text-[10px] text-slate-500 block">NIC Cloud Infrastructure Hosted</span>
              </div>

              {/* Official Social Media Channels */}
              <div className="pt-3 border-t border-slate-800/80 space-y-2">
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider font-mono block">
                  Connect on Official Social Handles:
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://facebook.com/GeoPolicyNexus"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-transform hover:scale-110 shadow-sm"
                    title="Official Facebook Page"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>

                  <a
                    href="https://wa.me/918022253761?text=Hello%20GeoPolicy%20Nexus%20Helpdesk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center transition-transform hover:scale-110 shadow-sm"
                    title="Official WhatsApp Community & Helpdesk"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                  </a>

                  <a
                    href="https://instagram.com/geopolicy_nexus"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center transition-transform hover:scale-110 shadow-sm"
                    title="Official Instagram Account"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>

                  <a
                    href="https://x.com/GeoPolicyNexus"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-slate-950 hover:bg-black text-white border border-slate-700 flex items-center justify-center transition-transform hover:scale-110 shadow-sm"
                    title="Official Twitter / X Account"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Mandatory Government of India Legal Policy Banner */}
      <div className="bg-slate-950 py-4 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 text-[11px] text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[11px]">
            <span className="hover:text-slate-300 cursor-pointer">Terms of Use</span>
            <span>&bull;</span>
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy (DPDP Act)</span>
            <span>&bull;</span>
            <span className="hover:text-slate-300 cursor-pointer">Copyright Policy</span>
            <span>&bull;</span>
            <span className="hover:text-slate-300 cursor-pointer">Hyperlinking Policy</span>
            <span>&bull;</span>
            <span className="hover:text-slate-300 cursor-pointer">Right to Information (RTI)</span>
            <span>&bull;</span>
            <span className="hover:text-slate-300 cursor-pointer">Web Accessibility Statement</span>
          </div>

          <div className="text-[10px] text-slate-400">
            &copy; 2026 Department of Land Resources, Ministry of Rural Development, Government of India. Designed and hosted with NIC standards.
          </div>

        </div>
      </div>

    </footer>
  );
};
