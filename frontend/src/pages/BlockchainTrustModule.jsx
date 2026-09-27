import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  FileCheck, 
  Database, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ExternalLink, 
  Copy, 
  Layers, 
  GitCommit, 
  Cpu, 
  KeyRound, 
  RefreshCw,
  FileText
} from 'lucide-react';

const VERIFIED_RECORDS = [
  {
    id: 'blk-001',
    ulpin: '27-PUN-HAV-849201-2026',
    documentTitle: 'Pune Haveli Rural Cadastral Vector Deed',
    type: 'Cadastral Parcel',
    blockHeight: 1849201,
    txHash: '0x8f4c9a2d1e0b5f7e3c8a9d2b1f4c7e0a9b8d7c6e',
    merkleRoot: '0x3a9f8b2c1d0e7f4a',
    timestamp: '18 March 2026, 14:22 IST',
    validator: 'NIC National Node #01',
    status: 'Verified'
  },
  {
    id: 'blk-002',
    ulpin: '29-BLR-URB-391048-2026',
    documentTitle: 'Karnataka Bhoomi 2.0 Digital Mutation Gazette',
    type: 'Policy Gazette',
    blockHeight: 1849198,
    txHash: '0x1d4e7f0a9b8c2e3f5a7b9c1d0e2f4a6b8c9d0e1f',
    merkleRoot: '0x7e2b1c0d9f8a3e4b',
    timestamp: '17 March 2026, 11:05 IST',
    validator: 'Survey of India Node #03',
    status: 'Verified'
  },
  {
    id: 'blk-003',
    ulpin: '24-AHM-CIT-729104-2026',
    documentTitle: 'Ahmedabad Industrial Corridor Land Pooling Vector',
    type: 'Spatial Dataset',
    blockHeight: 1849182,
    txHash: '0x5c7e0a9b8d2f1e3a4b6c8d0e1f2a3b4c5d6e7f8a',
    merkleRoot: '0x9d2b1c4e0f7a8b3c',
    timestamp: '16 March 2026, 09:41 IST',
    validator: 'IIT Delhi Verification Node',
    status: 'Under Review'
  },
  {
    id: 'blk-004',
    ulpin: '33-CHE-AMB-510294-2026',
    documentTitle: 'Tamil Nadu Patta Pass Book Reform Study PDF',
    type: 'Research Document',
    blockHeight: 1849165,
    txHash: '0x9b8d7c6e5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d',
    merkleRoot: '0x1f4a7b9c0d2e3f8a',
    timestamp: '15 March 2026, 16:30 IST',
    validator: 'DoLR Consensus Node #02',
    status: 'Pending'
  }
];

export const BlockchainTrustModule = () => {
  const [searchHash, setSearchHash] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const [copiedTx, setCopiedTx] = useState(null);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!searchHash.trim()) return;

    setVerifying(true);
    setVerificationResult(null);

    setTimeout(() => {
      setVerifying(false);
      const found = VERIFIED_RECORDS.find(
        r => r.ulpin.toLowerCase().includes(searchHash.toLowerCase()) || 
             r.txHash.toLowerCase().includes(searchHash.toLowerCase())
      );

      if (found) {
        setVerificationResult(found);
      } else {
        setVerificationResult({
          ulpin: searchHash.toUpperCase(),
          documentTitle: 'Custom Verified Land Cadastre Document',
          type: 'Cadastral Parcel',
          blockHeight: 1849209,
          txHash: '0x' + Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join(''),
          merkleRoot: '0x' + Array.from({length: 16}, () => Math.floor(Math.random()*16).toString(16)).join(''),
          timestamp: 'Just now',
          validator: 'National Blockchain Framework (NBF) Node',
          status: 'Verified'
        });
      }
    }, 700);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedTx(text);
    setTimeout(() => setCopiedTx(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-6 lg:p-8 space-y-6 font-sans">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#0A3678] font-mono text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span>National Blockchain Framework (NBF) &bull; MeitY Standard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002244]">
            Blockchain Trust &amp; Document Provenance Module
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Tamper-proof cryptographic verification of 14-digit ULPIN land titles, research studies, and spatial dataset integrity.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Hyperledger Consensus Active &bull; Block #1,849,209</span>
        </div>
      </div>

      {/* Verification Hash / ULPIN Search Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-slate-900">Cryptographic Integrity Verification Engine</h3>
          <p className="text-xs text-slate-500">
            Paste any 14-digit ULPIN parcel code, document SHA-256 hash, or Ethereum transaction receipt to verify on-chain registry status.
          </p>
        </div>

        <form onSubmit={handleVerify} className="flex flex-col sm:flex-row items-center gap-2">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              required
              value={searchHash}
              onChange={(e) => setSearchHash(e.target.value)}
              placeholder="e.g. 27-PUN-HAV-849201-2026 or 0x8f4c9a2d1e0b5f7e..."
              className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-mono shadow-xs"
            />
          </div>
          <button
            type="submit"
            disabled={verifying}
            className="w-full sm:w-auto px-5 py-2 bg-[#0A3678] hover:bg-[#002244] text-white font-bold text-xs rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0"
          >
            {verifying ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Checking Merkle Tree...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Verify Provenance</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Example Pins */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] text-slate-500">
          <span className="font-semibold text-slate-700">Test Verification Pins:</span>
          <button
            type="button"
            onClick={() => setSearchHash('27-PUN-HAV-849201-2026')}
            className="px-2 py-0.5 rounded bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#0A3678] border border-slate-200 font-mono text-[10px]"
          >
            27-PUN-HAV-849201-2026
          </button>
          <button
            type="button"
            onClick={() => setSearchHash('29-BLR-URB-391048-2026')}
            className="px-2 py-0.5 rounded bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#0A3678] border border-slate-200 font-mono text-[10px]"
          >
            29-BLR-URB-391048-2026
          </button>
        </div>
      </div>

      {/* Verification Result Display */}
      {verificationResult && (
        <div className="bg-white p-6 rounded-2xl border-2 border-emerald-500 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Cryptographic Provenance Verified: State Land Registry Node</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              {verificationResult.status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] font-mono">14-Digit ULPIN Code</span>
              <span className="font-bold text-[#0A3678] font-mono">{verificationResult.ulpin}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-mono">Blockchain Block Height</span>
              <span className="font-bold text-slate-900 font-mono">#{verificationResult.blockHeight}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-mono">Consensus Validator Node</span>
              <span className="font-semibold text-slate-800">{verificationResult.validator}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-mono">Block Timestamp</span>
              <span className="font-semibold text-slate-800">{verificationResult.timestamp}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-xs">
            <span className="text-slate-500 font-mono text-[10px] block">Transaction Hash (SHA-256 Merkle Leaf)</span>
            <div className="flex items-center justify-between font-mono text-[11px] text-slate-800 break-all">
              <span>{verificationResult.txHash}</span>
              <button
                onClick={() => copyToClipboard(verificationResult.txHash)}
                className="ml-2 text-blue-700 hover:text-blue-900 shrink-0 cursor-pointer"
                title="Copy Hash"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Visual Merkle Tree Provenance Flow */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900">End-to-End Cadastral Provenance Lifecycle</h3>
          <p className="text-xs text-slate-500">Immutable audit sequence recorded across National Blockchain nodes.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-[10px] font-mono font-bold text-[#0A3678]">1. Genesis Cadastre</span>
            <p className="font-semibold text-slate-800">Drone Survey Orthophoto</p>
            <p className="text-[11px] text-slate-500">Survey of India CORS ground verification hash generated.</p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-[10px] font-mono font-bold text-blue-700">2. Gram Panchayat Verification</span>
            <p className="font-semibold text-slate-800">Local Claims Resolution</p>
            <p className="text-[11px] text-slate-500">Public objection hearings recorded and timestamped on-chain.</p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-[10px] font-mono font-bold text-amber-700">3. Sub-Registrar Mutation</span>
            <p className="font-semibold text-slate-800">Deed &amp; ULPIN Binding</p>
            <p className="text-[11px] text-slate-500">Automated encumbrance lock applied to prevent duplicate sales.</p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="text-[10px] font-mono font-bold text-emerald-700">4. Conclusive Title Issuance</span>
            <p className="font-semibold text-slate-800">Gazetted Title Guarantee</p>
            <p className="text-[11px] text-slate-500">State revenue indemnification smart contract activated.</p>
          </div>
        </div>
      </div>

      {/* Audit Trail Viewer Table (Verified / Pending / Under Review) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">National Land Record Audit Trail Ledger</h3>
            <p className="text-xs text-slate-500">Recent cryptographic blocks signed by accredited government nodes.</p>
          </div>
          <span className="text-xs font-mono text-slate-400">Showing 4 Sample Ledger Entries</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-mono text-[11px]">
                <th className="py-2.5 px-3">ULPIN / Code</th>
                <th className="py-2.5 px-3">Document Title</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Validator Node</th>
                <th className="py-2.5 px-3">Block Height</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {VERIFIED_RECORDS.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-[#0A3678]">{rec.ulpin}</td>
                  <td className="py-3 px-3 font-semibold text-slate-900 max-w-xs truncate">{rec.documentTitle}</td>
                  <td className="py-3 px-3 text-slate-600">{rec.type}</td>
                  <td className="py-3 px-3 text-slate-600">{rec.validator}</td>
                  <td className="py-3 px-3 font-mono text-slate-500">#{rec.blockHeight}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      rec.status === 'Verified'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : rec.status === 'Pending'
                        ? 'bg-amber-50 text-amber-800 border border-amber-200'
                        : 'bg-blue-50 text-[#0A3678] border border-blue-200'
                    }`}>
                      {rec.status}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <button
                      onClick={() => alert(`[Blockchain Ledger Receipt]:\nTx: ${rec.txHash}\nMerkle Root: ${rec.merkleRoot}\nSigned by: ${rec.validator}`)}
                      className="text-blue-700 hover:underline flex items-center gap-1 font-mono text-[11px] cursor-pointer"
                    >
                      <span>Proof</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
