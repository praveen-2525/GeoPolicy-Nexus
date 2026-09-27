import React, { useRef } from 'react';
import { X, Printer, Download, ShieldCheck, CheckCircle2, QrCode, FileText } from 'lucide-react';

export const LandRecordReceiptModal = ({ isOpen, onClose, landRecord }) => {
  if (!isOpen) return null;

  const record = landRecord || {
    receiptNo: "GOI/DILRMP/2026/89421",
    ulpin: "IN-29-8472-9104-5821",
    ownerName: "Udaya Keerthi",
    state: "Karnataka",
    district: "Bengaluru Urban",
    taluk: "Bengaluru South",
    village: "Sarjapura",
    surveyNo: "142/3A",
    areaExtent: "2.45 Acres",
    propertyCardNo: "SVAMITVA-KA-88910",
    mutationStatus: "Approved & Certified",
    issueDate: "24 September 2026",
    digitalSignature: "SHA256: 8aef-9102-bc34-771a-e902-55fa"
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const receiptContent = `
================================================================================
                    GOVERNMENT OF INDIA / भारत सरकार
           MINISTRY OF RURAL DEVELOPMENT • DEPARTMENT OF LAND RESOURCES
                        GEOPOLICY NEXUS NATIONAL PORTAL
================================================================================
OFFICIAL CADASTRAL LAND RECORD RECEIPT & SVAMITVA PROPERTY CARD CERTIFICATE

Receipt No        : ${record.receiptNo}
Issue Date        : ${record.issueDate}
14-Digit ULPIN    : ${record.ulpin}
Property Card No  : ${record.propertyCardNo}

--------------------------------------------------------------------------------
PARCEL & OWNER DETAILS
--------------------------------------------------------------------------------
Registered Owner  : ${record.ownerName}
State             : ${record.state}
District          : ${record.district}
Taluk / Hobli     : ${record.taluk}
Village / Grama   : ${record.village}
Survey / Plot No  : ${record.surveyNo}
Total Land Extent : ${record.areaExtent}
Mutation Status   : ${record.mutationStatus}

--------------------------------------------------------------------------------
VERIFICATION & BLOCKCHAIN DISPATCH
--------------------------------------------------------------------------------
Digital Signature : ${record.digitalSignature}
Encryption Hash   : SHA256-GOI-DILRMP-CORS-2026-ENCRYPTED
Authority         : Additional District Magistrate (Revenue) & DoLR Officer

This is a computer-generated Land Governance Certificate issued under ULPIN /
Bhu-Aadhaar National Standard. Valid across all financial institutions & courts.
================================================================================
`;
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Land_Record_Receipt_${record.receiptNo.replace(/\//g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[100] flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Modal Top Bar */}
        <div className="bg-[#002244] text-white p-4 flex items-center justify-between border-b border-amber-400/50">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300 uppercase">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Official Government Receipt &amp; Land Certificate</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Certificate Body */}
        <div id="printable-receipt" className="p-6 space-y-6 text-slate-900 bg-white">
          
          {/* Header Seal & Title */}
          <div className="text-center border-b-2 border-slate-900 pb-4 space-y-2">
            <div className="flex justify-center items-center gap-3">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                alt="Satyameva Jayate"
                className="w-8 h-12 object-contain"
              />
              <img 
                src="/logo.jpg" 
                alt="GeoPolicy Nexus Logo"
                className="w-10 h-10 rounded-full object-cover border-2 border-[#0A3678]"
              />
            </div>
            <div>
              <h2 className="text-lg font-black text-[#002244] tracking-tight uppercase">
                Government of India • भारत सरकार
              </h2>
              <p className="text-xs font-semibold text-slate-700">
                Department of Land Resources &bull; Ministry of Rural Development
              </p>
              <p className="text-[11px] font-mono font-bold text-[#0A3678] mt-1">
                NATIONAL CADASTRAL LAND RECORD &amp; SVAMITVA PROPERTY CARD RECEIPT
              </p>
            </div>
          </div>

          {/* Key Reference Table */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs font-sans">
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Receipt No</span>
              <span className="font-extrabold text-[#0A3678] font-mono">{record.receiptNo}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Issue Date</span>
              <span className="font-bold text-slate-800">{record.issueDate}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase block">14-Digit ULPIN</span>
              <span className="font-extrabold text-emerald-800 font-mono text-[11px]">{record.ulpin}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Property Card</span>
              <span className="font-bold text-purple-900 font-mono">{record.propertyCardNo}</span>
            </div>
          </div>

          {/* Parcel Owner & Location Details Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider border-b border-slate-200 pb-1 flex items-center justify-between">
              <span>Land Parcel &amp; Ownership Verification</span>
              <span className="text-emerald-700 flex items-center gap-1 font-bold text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" /> {record.mutationStatus}
              </span>
            </h3>

            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span className="text-slate-500">Registered Owner:</span>
                <span className="font-extrabold text-slate-900">{record.ownerName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span className="text-slate-500">State Jurisdiction:</span>
                <span className="font-bold text-slate-800">{record.state}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span className="text-slate-500">District:</span>
                <span className="font-bold text-slate-800">{record.district}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span className="text-slate-500">Taluk / Tehsil:</span>
                <span className="font-bold text-slate-800">{record.taluk}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span className="text-slate-500">Revenue Village:</span>
                <span className="font-bold text-slate-800">{record.village}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span className="text-slate-500">Survey / Plot No:</span>
                <span className="font-extrabold text-[#0A3678]">{record.surveyNo}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span className="text-slate-500">Total Area Extent:</span>
                <span className="font-bold text-emerald-800">{record.areaExtent}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span className="text-slate-500">Encumbrance Status:</span>
                <span className="font-bold text-emerald-700">Nil / Clean Title</span>
              </div>
            </div>
          </div>

          {/* Digital QR Code & Stamp */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-200 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-slate-900 text-white rounded-lg flex items-center justify-center p-1">
                <QrCode className="w-12 h-12" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-mono">Digital Signature Hash:</span>
                <span className="text-[10px] font-mono text-slate-700 font-bold block">{record.digitalSignature}</span>
                <span className="text-[9px] text-emerald-700 font-bold mt-0.5 block">Verified by CORS National Grid</span>
              </div>
            </div>

            <div className="text-right">
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#0A3678] text-[#0A3678] flex flex-col items-center justify-center p-1 text-center font-bold text-[8px] uppercase tracking-tighter opacity-80">
                <span>Govt of India</span>
                <span className="text-[7px]">Certified</span>
                <span>DoLR Seal</span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Actions Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[10px] text-slate-500 font-mono">
            Valid for Revenue Courts &amp; Bank Loans
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Receipt</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              className="px-4 py-2 bg-[#0A3678] hover:bg-[#002244] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Official Receipt</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
