import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { PolicyDetailsModal } from '../components/PolicyDetailsModal';
import { PolicyModal } from '../components/PolicyModal';
import { 
  FileText, 
  Search, 
  PlusCircle, 
  MapPin, 
  ExternalLink,
  ShieldCheck,
  Loader2,
  AlertCircle
} from 'lucide-react';
import axios from 'axios';

const STATES = ['All', 'National', 'Maharashtra', 'Karnataka', 'Gujarat', 'Tamil Nadu', 'Delhi'];

export const PolicyRepository = ({ isAddModalOpen, setIsAddModalOpen }) => {
  const { user } = useContext(AuthContext);
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePolicy, setActivePolicy] = useState(null);

  const fetchPolicies = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.get('/api/policies');
      setPolicies(res.data);
    } catch (err) {
      console.error('Error fetching policies:', err);
      setError(err.response?.data?.message || 'Failed to load policy documents from MongoDB.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  const handleCreatePolicy = async (formData) => {
    try {
      setError('');
      const res = await axios.post('/api/policies', formData);
      setPolicies([res.data, ...policies]);
      setIsAddModalOpen(false);
    } catch (err) {
      console.error('Error creating policy:', err);
      alert(err.response?.data?.message || 'Error submitting policy document.');
    }
  };

  const filteredPolicies = policies.filter(p => {
    const matchesState = selectedState === 'All' || p.state === selectedState;
    const matchesSearch = searchQuery === '' ||
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.state?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-6 lg:p-8 space-y-8 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" />
            <span>State &amp; Legislative Reform Registry</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Policy Repository</h1>
          <p className="text-xs text-slate-400 mt-1">
            Official gazette mandates, digital land titling acts, transit-oriented zoning laws, and impact benchmarks stored in MongoDB.
          </p>
        </div>

        {(user?.role === 'Policymaker' || user?.role === 'Admin' || user?.role === 'Institution') && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-amber-950/60 flex items-center gap-2 transition-all w-fit cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Draft Policy Document</span>
          </button>
        )}
      </div>

      {/* Search & State Filter Toolbar */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search policies by state, act name, zoning directives, or encumbrance rules..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 shadow-inner"
          />
        </div>

        {/* State Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-wider shrink-0 mr-1">Filter State:</span>
          {STATES.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedState(st)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition-all cursor-pointer ${
                selectedState === st
                  ? 'bg-amber-600 text-white font-bold shadow-md shadow-amber-950/50'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 bg-red-950/50 border border-red-800 rounded-xl flex items-center gap-3 text-xs text-red-300">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-slate-900/40 rounded-2xl border border-slate-800">
          <Loader2 className="w-10 h-10 text-amber-400 animate-spin mb-3" />
          <p className="text-sm font-semibold text-slate-300">Connecting to MongoDB Database...</p>
          <p className="text-xs text-slate-500 mt-1">Retrieving official state policy acts and gazette documents.</p>
        </div>
      ) : filteredPolicies.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
          <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-300">No policy documents match your current filter criteria.</p>
          <p className="text-xs text-slate-500 mt-1">Try selecting 'All' states or modifying your search string.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPolicies.map((policy) => {
            const metrics = policy.impactMetrics || { citizensAffected: '500,000+', efficiencyGain: '35%', transparencyScore: '94%' };
            return (
              <div
                key={policy._id || policy.id}
                className="bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-amber-500/50 p-6 flex flex-col justify-between space-y-4 transition-all hover:shadow-xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-950 text-amber-400 border border-amber-800">
                      {policy.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      {policy.state}
                    </span>
                  </div>

                  <h3 
                    onClick={() => setActivePolicy(policy)}
                    className="text-base font-bold text-white hover:text-amber-400 transition-colors cursor-pointer leading-snug"
                  >
                    {policy.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {policy.description}
                  </p>

                  {/* Impact Summary Bar */}
                  <div className="grid grid-cols-3 gap-2 p-3 bg-slate-950/70 rounded-xl border border-slate-800/80 text-[11px]">
                    <div>
                      <span className="text-slate-500 block">Citizens</span>
                      <span className="font-extrabold text-amber-400">{metrics.citizensAffected}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Efficiency</span>
                      <span className="font-extrabold text-emerald-400">{metrics.efficiencyGain}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Audit Score</span>
                      <span className="font-extrabold text-blue-400">{metrics.transparencyScore}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Status: {policy.status || 'Active'}</span>
                  </div>

                  <button
                    onClick={() => setActivePolicy(policy)}
                    className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg font-bold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read Gazette Policy</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Policy Details Modal */}
      <PolicyDetailsModal
        policy={activePolicy}
        isOpen={!!activePolicy}
        onClose={() => setActivePolicy(null)}
      />

      {/* Draft Policy Modal */}
      <PolicyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleCreatePolicy}
      />

    </div>
  );
};
