import React from 'react';
import { Shield, Layers, FileCheck, ExternalLink, Globe, Lock } from 'lucide-react';

export const Footer = ({ setCurrentPage }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <Layers className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-white text-base tracking-tight">GeoPolicy Nexus</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              National Digital Platform for Research, Policy Innovation, and Evidence-Based Land Governance. Powered by National Spatial Data Infrastructure &amp; Ministry Governance Standards.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 w-fit">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>ISO 27001 &bull; Open Gov Compliance</span>
            </div>
          </div>

          {/* Core Repositories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Platform Repositories</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentPage('research')} className="hover:text-emerald-400 transition-colors">
                  Research Papers &amp; Journals
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('policies')} className="hover:text-emerald-400 transition-colors">
                  State &amp; National Policies
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('datasets')} className="hover:text-emerald-400 transition-colors">
                  Open GeoSpatial Vectors &amp; Rasters
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('dashboard')} className="hover:text-emerald-400 transition-colors">
                  Dispute &amp; Cadastral Analytics
                </button>
              </li>
            </ul>
          </div>

          {/* User Governance Roles */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Role Access Ecosystem</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span><span>Admin Management Console</span></li>
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span><span>Researcher Peer Review Portal</span></li>
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span><span>Policymaker Simulation Sandbox</span></li>
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span><span>Citizen Public Records Ledger</span></li>
              <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span><span>Institutional Spatial Data API</span></li>
            </ul>
          </div>

          {/* Official Standards & Security */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Government Standards</h4>
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-200 font-semibold">
                <Lock className="w-4 h-4 text-amber-400" />
                <span>JWT Encrypted RBAC Access</span>
              </div>
              <p className="text-[11px] text-slate-400">
                All cadastral data extractions comply with National Spatial Data Policies and G2C Transparency Directives.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>&copy; 2026 GeoPolicy Nexus Platform. All rights reserved. Government of India.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">API Guidelines</span>
            <span className="hover:text-white cursor-pointer">Helpdesk</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
