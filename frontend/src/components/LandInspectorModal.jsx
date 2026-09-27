import React from 'react';
import { 
  X, 
  MapPin, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  FileCheck, 
  Database, 
  User, 
  CreditCard, 
  Building2, 
  Droplets, 
  CloudRain, 
  RefreshCw, 
  ExternalLink,
  Printer,
  Scale,
  Award,
  BookOpen,
  FileText,
  HelpCircle,
  Shield
} from 'lucide-react';

export const LandInspectorModal = ({ record, onClose }) => {
  if (!record) return null;

  const {
    siteNumber,
    ulpin,
    pattaNumber,
    chittaSittaNumber,
    state,
    district,
    taluk,
    village,
    locality,
    coordinates,
    areaSqFt,
    areaAcres,
    extentCents,
    extentGunthas,
    landType,
    legalStatus,
    ownerCount,
    coOwnersList = [],
    ownerDetails,
    fallowLandDetails,
    documentAuthenticity,
    environmentalData,
    disputeInfo,
    documentVerification,
    exchangedLandDetails,
    linkedResearchPaper,
    linkedAgencyPolicy
  } = record;

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden animate-fadeIn text-slate-800">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#002244] via-[#0A3678] to-[#002244] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 font-bold flex items-center justify-center font-mono text-sm shadow-md shrink-0">
              SITE
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-black tracking-tight font-mono text-amber-300">
                  {siteNumber}
                </h2>
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                  landType === 'Government Land' ? 'bg-purple-500 text-white' : 'bg-blue-500 text-white'
                }`}>
                  {landType}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                  legalStatus === 'Authorized Land' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                }`}>
                  {legalStatus}
                </span>
              </div>
              <p className="text-xs text-blue-200 font-mono mt-0.5">
                Bhu-Aadhaar ULPIN: <strong className="text-white">{ulpin}</strong> &bull; Patta: <strong className="text-amber-200">{pattaNumber || 'N/A'}</strong> &bull; Chitta: <strong className="text-amber-200">{chittaSittaNumber || 'N/A'}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintCertificate}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Print Official Record"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Print Record</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 custom-scrollbar">
          
          {/* Document Authenticity Banner (Is Land Original or Fake Check!) */}
          <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
            documentAuthenticity?.status?.includes('100% Genuine') 
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950' 
              : 'bg-rose-50 border-rose-300 text-rose-950'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 font-extrabold ${
                documentAuthenticity?.status?.includes('100% Genuine') ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
              }`}>
                {documentAuthenticity?.status?.includes('100% Genuine') ? <ShieldCheck className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider block opacity-75">
                  Government Document Verification Audit
                </span>
                <h4 className="text-sm font-black tracking-tight leading-tight">
                  Document Authenticity: {documentAuthenticity?.status || '✓ 100% Genuine & Verified'}
                </h4>
                <p className="text-xs opacity-90 mt-0.5 font-medium">
                  {documentAuthenticity?.forgeryCheck || 'Passed Sub-Registrar Digital Signature Match & Drone Audit'}
                </p>
              </div>
            </div>

            <span className="text-[11px] font-mono font-bold px-3 py-1 bg-white/80 rounded-xl border border-current shrink-0 hidden md:block">
              {documentAuthenticity?.subRegistrarVerification || 'Verified at Sub-Registrar Office'}
            </span>
          </div>

          {/* Top Status Indicators Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            
            {/* Extent in Acres & Cents */}
            <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200">
              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">Land Amount / Extent</span>
              <span className="text-sm font-black text-blue-950 font-mono block">
                {areaAcres} Acres ({extentCents || (areaAcres * 100).toFixed(1)} Cents)
              </span>
              <span className="text-[10px] text-slate-500 font-mono">{areaSqFt.toLocaleString()} Sq Ft &bull; {extentGunthas || (areaAcres * 40).toFixed(1)} Gunthas</span>
            </div>

            {/* Owner Count */}
            <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200">
              <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block">Number of Owners</span>
              <span className="text-sm font-black text-purple-950 block">
                {ownerCount || 1} {ownerCount > 1 ? 'Joint Co-Owners' : 'Sole Owner'}
              </span>
              <span className="text-[10px] text-slate-500 truncate block">{ownerDetails.name}</span>
            </div>

            {/* Flood Vulnerability */}
            <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200">
              <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider block">Flood Hazard Risk</span>
              <span className="text-sm font-black text-teal-950 block">
                {environmentalData.floodRisk}
              </span>
              <span className="text-[10px] text-slate-500 block">Elevation: {environmentalData.elevationMeters}m</span>
            </div>

            {/* Water Scarcity */}
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">Water Stress Level</span>
              <span className="text-sm font-black text-amber-950 block">
                {environmentalData.waterScarcity}
              </span>
              <span className="text-[10px] text-slate-500 block">Soil: {environmentalData.soilType}</span>
            </div>

          </div>

          {/* Detailed Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. Registered Owner & Identity Verification */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                <User className="w-5 h-5 text-[#0A3678]" />
                <h3 className="font-extrabold text-sm text-[#002244] uppercase tracking-wide">
                  Registered Owner &amp; Aadhaar / PAN Verification
                </h3>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-slate-500">Primary Title Holder:</span>
                  <span className="font-bold text-slate-900">{ownerDetails.name}</span>
                </div>
                <div className="flex justify-between items-start py-1 border-b border-slate-100">
                  <span className="text-slate-500">All Registered Co-Owners:</span>
                  <div className="text-right font-medium text-slate-800">
                    {coOwnersList.map((co, i) => (
                      <span key={i} className="block">{co}</span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-slate-500">Official Contact:</span>
                  <span className="font-mono text-slate-800">{ownerDetails.contactEmail}</span>
                </div>

                {/* Aadhaar Row */}
                <div className="p-2.5 bg-white rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-700 flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-emerald-600" />
                      <span>Aadhaar Card (UIDAI):</span>
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {ownerDetails.aadhaarStatus}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-600">
                    <span>Number: {ownerDetails.aadhaarMasked}</span>
                    <span className="text-slate-400">{ownerDetails.aadhaarVerificationDate}</span>
                  </div>
                </div>

                {/* PAN Row */}
                <div className="p-2.5 bg-white rounded-xl border border-slate-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-700 flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-blue-600" />
                      <span>PAN Card (NSDL/ITD):</span>
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                      {ownerDetails.panStatus}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-600">
                    <span>Number: {ownerDetails.panMasked}</span>
                    <span className="text-slate-400">{ownerDetails.panVerificationDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Fallow Land Status & Ownership Chain */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                <RefreshCw className="w-5 h-5 text-amber-700" />
                <h3 className="font-extrabold text-sm text-[#002244] uppercase tracking-wide">
                  Fallow Land Status &amp; Ownership Transfer Chain
                </h3>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-slate-500">Fallow Land Status:</span>
                  <span className="font-bold text-amber-800">{fallowLandDetails?.fallowStatus || 'Active Developed Parcel'}</span>
                </div>
                <div className="py-1">
                  <span className="text-slate-500 block mb-1">Historical Transfer Chain (Whom to Whom):</span>
                  <div className="p-3 bg-white rounded-xl border border-slate-200 leading-relaxed font-mono text-[11px] text-slate-700">
                    {fallowLandDetails?.fallowHistoryChain || 'Direct Patta Title Record'}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Active Court Cases & Litigations */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                <Scale className="w-5 h-5 text-rose-700" />
                <h3 className="font-extrabold text-sm text-[#002244] uppercase tracking-wide">
                  Active Legal Cases &amp; Litigation Details
                </h3>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-slate-500">Dispute Status:</span>
                  <span className={`font-bold ${disputeInfo.isDisputed ? 'text-rose-700' : 'text-emerald-700'}`}>
                    {disputeInfo.disputeStatus}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-slate-500">Court Case Ref:</span>
                  <span className="font-mono font-bold text-slate-800">{disputeInfo.caseReference}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-100">
                  <span className="text-slate-500">Court Jurisdiction:</span>
                  <span className="font-semibold text-slate-800">{disputeInfo.courtJurisdiction}</span>
                </div>
                <div className="py-1">
                  <span className="text-slate-500 block mb-1">Litigation Summary:</span>
                  <p className="p-2.5 bg-white rounded-xl border border-slate-200 text-[11px] text-slate-700 leading-relaxed">
                    {disputeInfo.activeCaseDetails}
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Linked Academic Research & Agency Policies */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                <BookOpen className="w-5 h-5 text-blue-700" />
                <h3 className="font-extrabold text-sm text-[#002244] uppercase tracking-wide">
                  Linked Research Papers &amp; Agency Policies
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-blue-600 uppercase flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Peer-Reviewed Study:</span>
                  </span>
                  <p className="font-bold text-slate-900 leading-snug">{linkedResearchPaper || 'Conclusive Land Titling Spatial Analysis (2025)'}</p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold text-amber-600 uppercase flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" />
                    <span>State Agency Policy Gazette:</span>
                  </span>
                  <p className="font-bold text-slate-900 leading-snug">{linkedAgencyPolicy || 'State Auto-Mutation & Land Modernization Act'}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Document Ledger Hash Banner */}
          <div className="p-5 bg-gradient-to-r from-blue-900 via-[#0A3678] to-[#002244] text-white rounded-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-blue-700 pb-2">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-sm uppercase tracking-wide">
                  Government Electronic Document Verification
                </h3>
              </div>
              <span className="text-[10px] font-mono bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded">
                DILRMP Certified
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 bg-white/10 rounded-xl space-y-1">
                <span className="text-[10px] text-blue-200 uppercase font-bold block">Khatoni Mutation</span>
                <span className="font-semibold text-emerald-300 block">{documentVerification.khatoniStatus}</span>
              </div>

              <div className="p-2.5 bg-white/10 rounded-xl space-y-1">
                <span className="text-[10px] text-blue-200 uppercase font-bold block">Encumbrance Certificate</span>
                <span className="font-semibold text-emerald-300 block">{documentVerification.encumbranceCertificate}</span>
              </div>

              <div className="p-2.5 bg-white/10 rounded-xl space-y-1">
                <span className="text-[10px] text-blue-200 uppercase font-bold block">Drone Survey Settlement</span>
                <span className="font-semibold text-emerald-300 block">{documentVerification.surveySettlement}</span>
              </div>

              <div className="p-2.5 bg-white/10 rounded-xl space-y-1">
                <span className="text-[10px] text-blue-200 uppercase font-bold block">Blockchain Ledger Hash</span>
                <span className="font-mono text-[10px] text-amber-300 truncate block">{documentVerification.blockchainHash}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-medium">
            Official Land Certificate generated under National Land Governance Framework &bull; Department of Land Resources
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#0A3678] hover:bg-[#002244] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-sm"
          >
            Close Inspector
          </button>
        </div>

      </div>
    </div>
  );
};
