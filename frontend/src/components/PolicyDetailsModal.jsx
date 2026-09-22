import React from 'react';
import { X, FileText, ExternalLink, ShieldCheck, MapPin, Users, TrendingUp, Award } from 'lucide-react';

export const PolicyDetailsModal = ({ policy, isOpen, onClose }) => {
  if (!isOpen || !policy) return null;

  const metrics = policy.impactMetrics || {
    citizensAffected: '250,000+',
    efficiencyGain: '28%',
    transparencyScore: '92%'
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-slate-950 px-6 py-5 border-b border-slate-800 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-amber-950 text-amber-400 border border-amber-800">
                {policy.jurisdiction || 'State'} Policy
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                {policy.state}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white leading-snug">{policy.title}</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 text-slate-300 text-sm max-h-[70vh] overflow-y-auto custom-scrollbar">
          
          {/* Key Impact Metrics Display */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/30 rounded-xl border border-amber-800/40">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-amber-400 font-extrabold text-lg">
                <Users className="w-4 h-4" />
                <span>{metrics.citizensAffected}</span>
              </div>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block mt-0.5">Citizens Benefited</span>
            </div>
            <div className="text-center border-x border-slate-800">
              <div className="flex items-center justify-center gap-1 text-emerald-400 font-extrabold text-lg">
                <TrendingUp className="w-4 h-4" />
                <span>{metrics.efficiencyGain}</span>
              </div>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block mt-0.5">Process Efficiency</span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-blue-400 font-extrabold text-lg">
                <Award className="w-4 h-4" />
                <span>{metrics.transparencyScore}</span>
              </div>
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block mt-0.5">Audit Transparency</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Policy Provisions &amp; Mandate</h3>
            <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-800 leading-relaxed text-slate-200">
              {policy.description}
            </div>
          </div>

          {/* Compliance Card */}
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <div>
                <p className="text-xs font-bold text-white">Government Gazetted Instrument</p>
                <p className="text-[11px] text-slate-400">Effective Date: {new Date(policy.effectiveDate || Date.now()).toLocaleDateString()}</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full text-xs font-bold">
              {policy.status || 'Active'}
            </span>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex justify-end items-center gap-3">
          <a
            href={policy.documentUrl || '#'}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-950/50"
          >
            <FileText className="w-4 h-4" />
            <span>Download Official Gazette Copy</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};
