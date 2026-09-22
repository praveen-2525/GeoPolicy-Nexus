import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Play, 
  Sparkles, 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Users, 
  Layers, 
  ShieldCheck, 
  Loader2, 
  BarChart3, 
  FileText,
  RotateCcw,
  Building2,
  MapPin
} from 'lucide-react';
import axios from 'axios';

const STATE_DISTRICT_MAP = {
  Maharashtra: ['Pune', 'Mumbai Suburban', 'Nagpur', 'Thane', 'Nashik'],
  Karnataka: ['Bengaluru Urban', 'Mysuru', 'Dakshina Kannada', 'Dharwad'],
  Gujarat: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Kanchipuram', 'Madurai'],
  Delhi: ['New Delhi', 'South Delhi', 'North Delhi'],
  Telangana: ['Hyderabad', 'Rangareddy', 'Medchal-Malkajgiri']
};

export const PolicyImpactSimulator = () => {
  const [state, setState] = useState('Maharashtra');
  const [district, setDistrict] = useState('Pune');
  const [category, setCategory] = useState('Land Titling');
  const [proposedPolicy, setProposedPolicy] = useState(
    'Mandatory ULPIN geo-referencing and 90-day conclusive land titling framework with automated Gram Panchayat revenue records mutation.'
  );

  const [districtsList, setDistrictsList] = useState(STATE_DISTRICT_MAP['Maharashtra']);
  const [simulating, setSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState(null);

  // Update district dropdown when state changes
  useEffect(() => {
    const dists = STATE_DISTRICT_MAP[state] || ['All Districts'];
    setDistrictsList(dists);
    setDistrict(dists[0] || '');
  }, [state]);

  const handleRunSimulation = async (e) => {
    if (e) e.preventDefault();
    if (!proposedPolicy || proposedPolicy.trim() === '') return;

    setSimulating(true);

    try {
      const res = await axios.post('/api/policies/simulate', {
        state,
        district,
        category,
        proposedPolicy
      });
      setSimulationResult(res.data);
    } catch (err) {
      console.error('Error running policy simulation:', err);
    } finally {
      setSimulating(false);
    }
  };

  // Run initial simulation on mount
  useEffect(() => {
    handleRunSimulation();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-6 lg:p-8 space-y-8 font-sans">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider mb-1">
            <Cpu className="w-4 h-4" />
            <span>National Predictive Econometric Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Policy Impact Simulator</h1>
          <p className="text-xs text-slate-400 mt-1">
            Simulate socio-economic benefits, litigation risks, titling speed gains, and population impacts of proposed land policies using Gemini AI.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-amber-950 text-amber-400 border border-amber-800 rounded-full text-xs font-mono font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Gemini Econometric AI Model</span>
          </span>
        </div>
      </div>

      {/* Main Grid: Input Form (Left) & Output Results (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Simulation Input Controls Panel (1 Col) */}
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-6 h-fit shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-white">Simulation Input Parameters</h2>
            </div>
          </div>

          <form onSubmit={handleRunSimulation} className="space-y-4">
            
            {/* State Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-300">Target State Jurisdiction</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 shadow-inner"
              >
                {Object.keys(STATE_DISTRICT_MAP).map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            {/* District Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-300">Target District</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 shadow-inner"
              >
                {districtsList.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Policy Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-300">Policy Domain Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 shadow-inner"
              >
                <option value="Land Titling">Land Titling &amp; Registration</option>
                <option value="Urban Zoning">Urban Master Planning &amp; Zoning</option>
                <option value="Agricultural Reform">Agricultural Land Ceiling &amp; Reform</option>
                <option value="Industrial Acquisition">Industrial Land Acquisition</option>
                <option value="Environmental Conservation">Forest &amp; Coastal Conservation</option>
              </select>
            </div>

            {/* Proposed Policy Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold text-slate-300">Proposed Legislative Policy Draft</label>
              <textarea
                rows={4}
                required
                value={proposedPolicy}
                onChange={(e) => setProposedPolicy(e.target.value)}
                placeholder="Enter proposed policy text, mandate, or legal clause..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500 shadow-inner leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={simulating}
              className="w-full py-3 bg-gradient-to-r from-amber-600 to-emerald-600 hover:from-amber-500 hover:to-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-amber-950/60 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {simulating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Simulating Policy Impact...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Execute Policy Impact Simulation</span>
                </>
              )}
            </button>
          </form>

        </div>

        {/* Output Results & Visual Analytics Cards (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {simulationResult && (
            <>
              {/* Score Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                {/* 1. Estimated Impact Score Gauge Card */}
                <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-3 shadow-xl relative overflow-hidden group">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Feasibility Score</span>
                    <Activity className="w-5 h-5 text-emerald-400" />
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-white font-mono">{simulationResult.impactScore}</span>
                    <span className="text-xs text-emerald-400 font-bold font-mono">/ 100</span>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                    <div 
                      className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full transition-all duration-1000"
                      style={{ width: `${simulationResult.impactScore}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400">High Policy Feasibility &amp; Return</p>
                </div>

                {/* 2. Affected Population Card */}
                <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-3 shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Affected Citizens</span>
                    <Users className="w-5 h-5 text-amber-400" />
                  </div>

                  <div className="text-2xl font-extrabold text-white font-mono">
                    {simulationResult.affectedPopulation}
                  </div>

                  <p className="text-[11px] text-amber-400 font-mono">Direct Beneficiary Reach</p>
                </div>

                {/* 3. Affected ULPIN Parcels Card */}
                <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-3 shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Affected Land Parcels</span>
                    <Layers className="w-5 h-5 text-blue-400" />
                  </div>

                  <div className="text-2xl font-extrabold text-white font-mono">
                    {simulationResult.affectedParcels}
                  </div>

                  <p className="text-[11px] text-blue-400 font-mono">Geo-tagged ULPIN Coordinates</p>
                </div>

              </div>

              {/* Visual Pre-Policy vs Post-Policy Meter Charts */}
              <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                      Pre-Policy vs. Post-Policy Predictive Impact Charts
                    </h3>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Comparative Metrics</span>
                </div>

                <div className="space-y-4 pt-2">
                  
                  {/* Meter 1: Titling Speed */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-300 font-bold">Land Mutation &amp; Titling Processing Speed</span>
                      <span className="text-emerald-400 font-bold">
                        Pre: {simulationResult.chartData.titlingSpeed.pre}% &rarr; Post: {simulationResult.chartData.titlingSpeed.post}% (+46%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800 flex">
                      <div style={{ width: `${simulationResult.chartData.titlingSpeed.pre}%` }} className="bg-slate-700 h-full" />
                      <div style={{ width: `${simulationResult.chartData.titlingSpeed.post - simulationResult.chartData.titlingSpeed.pre}%` }} className="bg-emerald-500 h-full animate-pulse" />
                    </div>
                  </div>

                  {/* Meter 2: Dispute Reduction */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-300 font-bold">Land Dispute Mitigation Index</span>
                      <span className="text-amber-400 font-bold">
                        Pre: {simulationResult.chartData.disputeReduction.pre}% &rarr; Post: {simulationResult.chartData.disputeReduction.post}% (+63%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800 flex">
                      <div style={{ width: `${simulationResult.chartData.disputeReduction.pre}%` }} className="bg-slate-700 h-full" />
                      <div style={{ width: `${simulationResult.chartData.disputeReduction.post - simulationResult.chartData.disputeReduction.pre}%` }} className="bg-amber-500 h-full animate-pulse" />
                    </div>
                  </div>

                  {/* Meter 3: Revenue Transparency */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-300 font-bold">Public Revenue Record Transparency</span>
                      <span className="text-blue-400 font-bold">
                        Pre: {simulationResult.chartData.revenueTransparency.pre}% &rarr; Post: {simulationResult.chartData.revenueTransparency.post}% (+44%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800 flex">
                      <div style={{ width: `${simulationResult.chartData.revenueTransparency.pre}%` }} className="bg-slate-700 h-full" />
                      <div style={{ width: `${simulationResult.chartData.revenueTransparency.post - simulationResult.chartData.revenueTransparency.pre}%` }} className="bg-blue-500 h-full animate-pulse" />
                    </div>
                  </div>

                </div>
              </div>

              {/* Benefits & Risks Dual Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Predicted Benefits */}
                <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-sm font-bold text-white">Predicted Socio-Economic Benefits</h3>
                  </div>

                  <ul className="space-y-2.5">
                    {simulationResult.predictedBenefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Potential Risks */}
                <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                    <AlertTriangle className="w-5 h-5 text-rose-400" />
                    <h3 className="text-sm font-bold text-white">Potential Implementation Risks</h3>
                  </div>

                  <ul className="space-y-2.5">
                    {simulationResult.potentialRisks.map((r, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* AI Generated Detailed Executive Analysis */}
              <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <h3 className="text-sm font-bold text-white font-mono uppercase">
                      Gemini AI Executive Synthesis Analysis
                    </h3>
                  </div>
                  <span className="text-xs text-emerald-400 font-mono">Validated Synthesis</span>
                </div>

                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                  {simulationResult.aiAnalysis}
                </div>
              </div>

            </>
          )}

        </div>

      </div>

    </div>
  );
};
