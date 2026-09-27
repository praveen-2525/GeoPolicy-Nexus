import React from 'react';
import { 
  Building2, 
  MapPin, 
  Globe, 
  Phone, 
  User, 
  FileCheck, 
  Layers, 
  ShieldCheck, 
  X, 
  ExternalLink,
  Award,
  Scale,
  Database
} from 'lucide-react';

export const RevenueDeptModal = ({ deptData, onClose }) => {
  if (!deptData) return null;

  const {
    state,
    departmentName,
    portalName,
    portalUrl,
    headquarters,
    contactOfficer,
    helpline,
    totalDistricts,
    digitizedRorCount,
    svamitvaPropertyCards,
    sroOfficeCount,
    subRegistrarCode,
    districts = []
  } = deptData;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-fadeIn text-slate-800">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#002244] via-[#0A3678] to-[#002244] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-extrabold shadow-md shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold tracking-tight">
                  {state} Revenue Department
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-400 text-slate-950">
                  State Land Authority
                </span>
              </div>
              <p className="text-xs text-blue-200 font-medium mt-0.5">
                {departmentName} &bull; Code: <span className="font-mono text-white">{subRegistrarCode}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar">
          
          {/* Top Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            
            <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-200 text-center space-y-0.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Digitized RoRs / Pattas</span>
              <span className="text-lg font-black text-[#0A3678] font-mono block">{digitizedRorCount}</span>
            </div>

            <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-0.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">SVAMITVA Property Cards</span>
              <span className="text-lg font-black text-emerald-800 font-mono block">{svamitvaPropertyCards}</span>
            </div>

            <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-200 text-center space-y-0.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Sub-Registrar Offices</span>
              <span className="text-lg font-black text-purple-900 font-mono block">{sroOfficeCount} SROs</span>
            </div>

            <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-center space-y-0.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Total Districts</span>
              <span className="text-lg font-black text-amber-900 font-mono block">{totalDistricts} Districts</span>
            </div>

          </div>

          {/* Department Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. Official Headquarters & Contact Head */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                <MapPin className="w-5 h-5 text-[#0A3678]" />
                <h3 className="font-extrabold text-sm text-[#002244] uppercase tracking-wide">
                  Headquarters &amp; Administration
                </h3>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex flex-col gap-1.5 py-1 border-b border-slate-200">
                  <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Official Web Portals:</span>
                  <div className="flex flex-wrap gap-2">
                    <a 
                      href={portalUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-[#0A3678] hover:bg-[#002244] text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                    >
                      <span>{portalName || 'Primary Revenue Portal'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    {deptData.kaveriUrl && (
                      <a 
                        href={deptData.kaveriUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                      >
                        <span>Kaveri 2.0 Registration</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {deptData.mojiniUrl && (
                      <a 
                        href={deptData.mojiniUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                      >
                        <span>Bhoomi RTC / Mojini GIS</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-start py-1 border-b border-slate-100">
                  <span className="text-slate-500">Headquarters Address:</span>
                  <span className="font-semibold text-slate-800 text-right">{headquarters}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-slate-500">Head Official:</span>
                  <span className="font-bold text-slate-900">{contactOfficer}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500">State Helpline:</span>
                  <span className="font-mono font-bold text-slate-800">{helpline}</span>
                </div>
              </div>
            </div>

            {/* 2. DILRMP & Digital Mutation Compliance */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <h3 className="font-extrabold text-sm text-[#002244] uppercase tracking-wide">
                  DILRMP &amp; Cadastral Compliance
                </h3>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-slate-500">RoR Computerization:</span>
                  <span className="font-bold text-emerald-700">100% Computerized &amp; Signed</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-slate-500">Sub-Registrar Integration:</span>
                  <span className="font-bold text-blue-700">API Auto-Mutation Linked</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-slate-500">ULPIN 14-Digit Standard:</span>
                  <span className="font-bold text-purple-700">Pan-State Bhu-Aadhaar Active</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500">CORS Survey Network:</span>
                  <span className="font-bold text-slate-900">Survey of India Validated</span>
                </div>
              </div>
            </div>

          </div>

          {/* District Revenue Offices List */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-sm text-[#002244] uppercase tracking-wide flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-600" />
              <span>District Collectorates &amp; Revenue Divisions ({districts.length})</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {districts.map((dist, idx) => (
                <div key={idx} className="p-3.5 bg-white rounded-2xl border border-slate-200 space-y-2 shadow-2xs hover:border-[#0A3678] transition-colors">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                    <span className="font-bold text-xs text-[#002244]">{dist.districtName} District</span>
                    <span className="text-[10px] font-mono font-bold bg-blue-50 text-[#0A3678] px-1.5 py-0.5 rounded">
                      {dist.sroCount} SROs
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600 space-y-1">
                    <div><strong>Collector:</strong> {dist.dcName}</div>
                    <div><strong>Collectorate:</strong> {dist.collectorate}</div>
                    <div className="flex justify-between text-[10px] pt-1 border-t border-slate-100">
                      <span className="text-slate-500">Digitized Parcels: {dist.digitizedParcels}</span>
                      <span className="text-amber-700 font-bold">Disputes: {dist.disputePendencyRate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-medium">
            Verified State Revenue Department Record &bull; Department of Land Resources (DoLR)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#0A3678] hover:bg-[#002244] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Close Details
          </button>
        </div>

      </div>
    </div>
  );
};
