import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { PaperDetailsModal } from '../components/PaperDetailsModal';
import { ResearchModal } from '../components/ResearchModal';
import { 
  BookOpen, 
  Search, 
  PlusCircle, 
  Calendar, 
  User, 
  ExternalLink,
  Loader2,
  AlertCircle
} from 'lucide-react';
import axios from 'axios';

const CATEGORIES = ['All', 'Land Governance', 'GIS & Remote Sensing', 'Urban Planning', 'Agricultural Policy', 'Climate Resilience', 'Property Rights'];

export const ResearchRepository = ({ isAddModalOpen, setIsAddModalOpen }) => {
  const { user } = useContext(AuthContext);
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePaper, setActivePaper] = useState(null);

  const fetchResearchPapers = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.get('/api/research');
      setPapers(res.data);
    } catch (err) {
      console.error('Error fetching research papers:', err);
      setError(err.response?.data?.message || 'Failed to fetch research papers from MongoDB server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResearchPapers();
  }, []);

  const handleCreatePaper = async (formData) => {
    try {
      setError('');
      const res = await axios.post('/api/research', formData);
      setPapers([res.data, ...papers]);
      setIsAddModalOpen(false);
    } catch (err) {
      console.error('Error submitting research paper:', err);
      alert(err.response?.data?.message || 'Error creating research paper.');
    }
  };

  const filteredPapers = papers.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.abstract?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.author?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-6 lg:p-8 space-y-8 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>National Spatial Data Research Index</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Research Repository</h1>
          <p className="text-xs text-slate-400 mt-1">
            Peer-reviewed empirical studies, cadastral GIS evaluations, and evidence-based governance papers stored in MongoDB.
          </p>
        </div>

        {(user?.role === 'Researcher' || user?.role === 'Admin' || user?.role === 'Institution') && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-950/60 flex items-center gap-2 transition-all w-fit cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Submit Research Paper</span>
          </button>
        )}
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search papers by title, abstract keywords, author, or spatial methodology..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 shadow-inner"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-wider shrink-0 mr-1">Categories:</span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-950/50'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
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
          <Loader2 className="w-10 h-10 text-emerald-400 animate-spin mb-3" />
          <p className="text-sm font-semibold text-slate-300">Connecting to MongoDB Database...</p>
          <p className="text-xs text-slate-500 mt-1">Retrieving verified research papers and spatial citations.</p>
        </div>
      ) : filteredPapers.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-300">No research papers match your current search query.</p>
          <p className="text-xs text-slate-500 mt-1">Try resetting the category filter or searching broader keywords.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPapers.map((paper) => (
            <div
              key={paper._id || paper.id}
              className="bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-emerald-500/50 p-6 flex flex-col justify-between space-y-4 transition-all hover:shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
                    {paper.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    {new Date(paper.createdAt || paper.publicationDate || Date.now()).toLocaleDateString()}
                  </span>
                </div>

                <h3 
                  onClick={() => setActivePaper(paper)}
                  className="text-base font-bold text-white hover:text-emerald-400 transition-colors cursor-pointer leading-snug"
                >
                  {paper.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {paper.abstract}
                </p>

                {paper.tags && paper.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {paper.tags.slice(0, 4).map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-slate-950 rounded text-[10px] text-slate-400 border border-slate-800">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <User className="w-3.5 h-3.5 text-blue-400" />
                  <span>{paper.author || 'Research Fellow'}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-slate-400 font-mono text-[11px]">
                    {paper.citationCount || 0} Citations
                  </span>
                  <button
                    onClick={() => setActivePaper(paper)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-lg font-bold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Details</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Details Modal */}
      <PaperDetailsModal
        paper={activePaper}
        isOpen={!!activePaper}
        onClose={() => setActivePaper(null)}
      />

      {/* Submit Research Modal */}
      <ResearchModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleCreatePaper}
      />

    </div>
  );
};
