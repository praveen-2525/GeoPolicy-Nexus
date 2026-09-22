import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { DatasetDetailsModal } from '../components/DatasetDetailsModal';
import { DatasetModal } from '../components/DatasetModal';
import { 
  Database, 
  Search, 
  PlusCircle, 
  Download, 
  HardDrive, 
  Globe, 
  Layers,
  Loader2,
  AlertCircle
} from 'lucide-react';
import axios from 'axios';

const FORMATS = ['All', 'GeoJSON', 'Shapefile', 'GeoTIFF', 'CSV', 'KML', 'Raster'];

export const DatasetRepository = ({ isAddModalOpen, setIsAddModalOpen }) => {
  const { user } = useContext(AuthContext);
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDataset, setActiveDataset] = useState(null);

  const fetchDatasets = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.get('/api/datasets');
      setDatasets(res.data);
    } catch (err) {
      console.error('Error fetching datasets:', err);
      setError(err.response?.data?.message || 'Failed to load geospatial datasets from MongoDB.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatasets();
  }, []);

  const handleCreateDataset = async (formData) => {
    try {
      setError('');
      const res = await axios.post('/api/datasets', formData);
      setDatasets([res.data, ...datasets]);
      setIsAddModalOpen(false);
    } catch (err) {
      console.error('Error creating dataset:', err);
      alert(err.response?.data?.message || 'Error publishing dataset.');
    }
  };

  const handleDownloadIncrement = async (datasetId) => {
    // Optimistic UI update
    setDatasets(datasets.map(d => {
      if ((d._id || d.id) === datasetId) {
        return { ...d, downloadCount: (d.downloadCount || 0) + 1 };
      }
      return d;
    }));

    try {
      await axios.post(`/api/datasets/${datasetId}/download`);
    } catch (e) {
      console.warn('Error recording download count in MongoDB', e);
    }
  };

  const filteredDatasets = datasets.filter(d => {
    const matchesFormat = selectedFormat === 'All' || d.format === selectedFormat;
    const matchesSearch = searchQuery === '' ||
      d.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.provider?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFormat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-6 lg:p-8 space-y-8 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-bold uppercase tracking-wider mb-1">
            <Database className="w-4 h-4" />
            <span>National Spatial Data Infrastructure Layer Bank</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Dataset Repository</h1>
          <p className="text-xs text-slate-400 mt-1">
            Open-access GeoJSON vector boundaries, high-resolution GeoTIFF satellite rasters, and cadastral datasets stored in MongoDB.
          </p>
        </div>

        {(user?.role === 'Institution' || user?.role === 'Admin' || user?.role === 'Researcher') && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-950/60 flex items-center gap-2 transition-all w-fit cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Publish Geo Dataset</span>
          </button>
        )}
      </div>

      {/* Search & Format Filter Toolbar */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search datasets by title, format (GeoJSON, GeoTIFF), agency provider, or coverage area..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 shadow-inner"
          />
        </div>

        {/* Format Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-wider shrink-0 mr-1">Data Format:</span>
          {FORMATS.map((fmt) => (
            <button
              key={fmt}
              onClick={() => setSelectedFormat(fmt)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition-all cursor-pointer ${
                selectedFormat === fmt
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-950/50'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {fmt}
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
          <Loader2 className="w-10 h-10 text-blue-400 animate-spin mb-3" />
          <p className="text-sm font-semibold text-slate-300">Connecting to MongoDB Database...</p>
          <p className="text-xs text-slate-500 mt-1">Retrieving cadastral layers and spatial raster datasets.</p>
        </div>
      ) : filteredDatasets.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
          <Database className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-300">No geospatial datasets match your search parameters.</p>
          <p className="text-xs text-slate-500 mt-1">Try selecting 'All' formats or adjusting search filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDatasets.map((ds) => (
            <div
              key={ds._id || ds.id}
              className="bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-blue-500/50 p-6 flex flex-col justify-between space-y-4 transition-all hover:shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-blue-950 text-blue-400 border border-blue-800 uppercase">
                    {ds.format || 'GeoJSON'}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                    <HardDrive className="w-3 h-3 text-indigo-400" />
                    {ds.fileSize || '25 MB'}
                  </span>
                </div>

                <h3 
                  onClick={() => setActiveDataset(ds)}
                  className="text-base font-bold text-white hover:text-blue-400 transition-colors cursor-pointer leading-snug"
                >
                  {ds.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {ds.description}
                </p>

                <div className="space-y-1 text-[11px] text-slate-400">
                  <p className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Coverage: <strong className="text-slate-200">{ds.spatialCoverage}</strong></span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    <span>Agency: <strong className="text-slate-200">{ds.provider}</strong></span>
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono text-[11px]">
                  {ds.downloadCount || 0} Downloads
                </span>

                <button
                  onClick={() => setActiveDataset(ds)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-950/50 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download / Preview</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Dataset Details Modal */}
      <DatasetDetailsModal
        dataset={activeDataset}
        isOpen={!!activeDataset}
        onClose={() => setActiveDataset(null)}
        onDownload={handleDownloadIncrement}
      />

      {/* Publish Dataset Modal */}
      <DatasetModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleCreateDataset}
      />

    </div>
  );
};
