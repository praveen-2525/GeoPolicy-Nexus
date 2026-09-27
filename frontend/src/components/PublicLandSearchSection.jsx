import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Database, 
  ExternalLink, 
  Eye, 
  Droplets, 
  CloudRain, 
  RefreshCw,
  Building2,
  FileCheck
} from 'lucide-react';
import { PUBLIC_LAND_RECORDS, searchPublicLandRecords } from '../data/publicLandData';
import { LandInspectorModal } from './LandInspectorModal';

export const PublicLandSearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [stateFilter, setStateFilter] = useState('All');
  const [landTypeFilter, setLandTypeFilter] = useState('All');
  const [legalStatusFilter, setLegalStatusFilter] = useState('All');
  const [disputeFilter, setDisputeFilter] = useState('All');
  const [floodFilter, setFloodFilter] = useState('All');
  const [selectedRecord, setSelectedRecord] = useState(null);

  const filteredRecords = searchPublicLandRecords(searchQuery, {
    state: stateFilter,
    landType: landTypeFilter,
    legalStatus: legalStatusFilter,
    disputeStatus: disputeFilter,
    floodRisk: floodFilter
  });

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
      
      {/* Title & Description */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-blue-100 text-[#0A3678] border border-blue-200">
              National Cadastral Registry
            </span>
            <span className="text-xs font-bold text-emerald-600 font-mono">
              ✓ All 28 States Connected
            </span>
          </div>
          <h2 className="text-2xl font-black text-[#002244] mt-1">
            Public Land Ownership &amp; Site Number Registry
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified land owner details, site numbers, Aadhaar &amp; PAN status, dispute litigation records, flood/water risk indicators, and exchanged land history.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-600 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 shrink-0">
          <Database className="w-4 h-4 text-[#0A3678]" />
          <span>{PUBLIC_LAND_RECORDS.length} Verified Site Records</span>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
        
        {/* Main Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Site Number (e.g. SITE-KA-BLR-0089), ULPIN, Owner Name, State, District..."
            className="w-full bg-white border border-slate-300 rounded-xl pl-11 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0A3678] shadow-xs font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-xs">
          
          {/* State Filter */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">State</label>
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-800 focus:outline-none font-medium"
            >
              <option value="All">All States</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Delhi">Delhi</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Telangana">Telangana</option>
              <option value="West Bengal">West Bengal</option>
            </select>
          </div>

          {/* Land Type Filter */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Land Ownership</label>
            <select
              value={landTypeFilter}
              onChange={(e) => setLandTypeFilter(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-800 focus:outline-none font-medium"
            >
              <option value="All">All Ownership Types</option>
              <option value="Private Land">Private Land</option>
              <option value="Government Land">Government Land</option>
            </select>
          </div>

          {/* Legal Status Filter */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Authorization</label>
            <select
              value={legalStatusFilter}
              onChange={(e) => setLegalStatusFilter(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-800 focus:outline-none font-medium"
            >
              <option value="All">All Legal Statuses</option>
              <option value="Authorized Land">Authorized Land</option>
              <option value="Unauthorized / Encroached Land">Unauthorized / Encroached</option>
            </select>
          </div>

          {/* Dispute Filter */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Dispute Record</label>
            <select
              value={disputeFilter}
              onChange={(e) => setDisputeFilter(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-800 focus:outline-none font-medium"
            >
              <option value="All">All Dispute Statuses</option>
              <option value="Clean">Clean Title Only</option>
              <option value="Disputed">Active Court Dispute</option>
            </select>
          </div>

          {/* Flood Risk Filter */}
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Flood Risk</label>
            <select
              value={floodFilter}
              onChange={(e) => setFloodFilter(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg p-2 text-xs text-slate-800 focus:outline-none font-medium"
            >
              <option value="All">All Risk Zones</option>
              <option value="Low">Low / Safe Zone</option>
              <option value="Moderate">Moderate Flood Risk</option>
              <option value="High">High Flood Risk</option>
            </select>
          </div>

        </div>

      </div>

      {/* Results Table / Grid */}
      {filteredRecords.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-2">
          <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto" />
          <h4 className="font-bold text-slate-800">No Matching Land Records Found</h4>
          <p className="text-xs text-slate-500">Try adjusting your search query or reset filter options.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setStateFilter('All');
              setLandTypeFilter('All');
              setLegalStatusFilter('All');
              setDisputeFilter('All');
              setFloodFilter('All');
            }}
            className="px-3 py-1.5 bg-blue-50 text-[#0A3678] text-xs font-bold rounded-lg hover:bg-blue-100 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-[#0A3678] text-white uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="p-3">Site No / ULPIN</th>
                <th className="p-3">State &amp; Location</th>
                <th className="p-3">Owner Details</th>
                <th className="p-3">Aadhaar &amp; PAN</th>
                <th className="p-3">Classification</th>
                <th className="p-3">Flood &amp; Water</th>
                <th className="p-3">Dispute &amp; Exchange</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white font-sans">
              {filteredRecords.map((record) => {
                const {
                  id,
                  siteNumber,
                  ulpin,
                  state,
                  district,
                  locality,
                  landType,
                  legalStatus,
                  ownerDetails,
                  environmentalData,
                  disputeInfo,
                  exchangedLandDetails
                } = record;

                return (
                  <tr key={id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Site No & ULPIN */}
                    <td className="p-3 font-mono">
                      <span className="font-bold text-[#0A3678] text-xs block">{siteNumber}</span>
                      <span className="text-[10px] text-slate-400 block">{ulpin}</span>
                    </td>

                    {/* Location */}
                    <td className="p-3">
                      <span className="font-bold text-slate-900 block">{state}</span>
                      <span className="text-[11px] text-slate-500 block truncate max-w-[150px]">{district} &bull; {locality}</span>
                    </td>

                    {/* Owner */}
                    <td className="p-3">
                      <span className="font-bold text-slate-900 block">{ownerDetails.name}</span>
                      <span className="text-[10px] text-slate-500 block">{ownerDetails.ownerCategory}</span>
                    </td>

                    {/* Aadhaar & PAN */}
                    <td className="p-3 space-y-1">
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 block">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>{ownerDetails.aadhaarStatus}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200 block">
                        <ShieldCheck className="w-3 h-3 text-blue-600" />
                        <span>PAN: {ownerDetails.panStatus}</span>
                      </span>
                    </td>

                    {/* Classification */}
                    <td className="p-3 space-y-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold block w-fit ${
                        landType === 'Government Land' ? 'bg-purple-100 text-purple-900 border border-purple-300' : 'bg-blue-100 text-blue-900 border border-blue-300'
                      }`}>
                        {landType}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold block w-fit ${
                        legalStatus === 'Authorized Land' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-rose-100 text-rose-900 border border-rose-300'
                      }`}>
                        {legalStatus}
                      </span>
                    </td>

                    {/* Flood & Water */}
                    <td className="p-3 space-y-1 text-[11px]">
                      <span className="flex items-center gap-1 text-slate-700">
                        <CloudRain className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{environmentalData.floodRisk}</span>
                      </span>
                      <span className="flex items-center gap-1 text-slate-700">
                        <Droplets className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{environmentalData.waterScarcity}</span>
                      </span>
                    </td>

                    {/* Dispute & Exchange */}
                    <td className="p-3 space-y-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold block w-fit ${
                        disputeInfo.isDisputed ? 'bg-rose-100 text-rose-800 border border-rose-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}>
                        {disputeInfo.isDisputed ? '⚠️ Active Dispute' : '✓ Clean Title'}
                      </span>
                      {exchangedLandDetails.isExchanged && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-800 border border-purple-200 block w-fit">
                          🔄 Exchanged Land
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="p-3 text-center">
                      <button
                        onClick={() => setSelectedRecord(record)}
                        className="px-3 py-1.5 bg-[#0A3678] hover:bg-[#002244] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 mx-auto shadow-xs cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Land</span>
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Render */}
      {selectedRecord && (
        <LandInspectorModal
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
        />
      )}

    </div>
  );
};
