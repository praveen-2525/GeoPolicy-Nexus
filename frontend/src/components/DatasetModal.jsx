import React, { useState } from 'react';
import { X, Database, CheckCircle } from 'lucide-react';

export const DatasetModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    format: initialData?.format || 'GeoJSON',
    category: initialData?.category || 'Cadastral Maps',
    spatialCoverage: initialData?.spatialCoverage || 'Pan-India Coverage',
    fileSize: initialData?.fileSize || '45 MB',
    downloadUrl: initialData?.downloadUrl || 'https://geojson.org/',
    provider: initialData?.provider || 'National Spatial Data Infrastructure',
    license: initialData?.license || 'Open Government Data License (OGDL)'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-8">
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-lg">
            <Database className="w-5 h-5" />
            <span>{initialData ? 'Edit Geo Dataset' : 'Publish Geo Dataset'}</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm text-slate-200">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Dataset Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. High-Resolution Vector Cadastral Boundaries (ULPIN Layer)"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Data Format *
              </label>
              <select
                value={formData.format}
                onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="GeoJSON">GeoJSON</option>
                <option value="Shapefile">Shapefile</option>
                <option value="GeoTIFF">GeoTIFF</option>
                <option value="CSV">CSV</option>
                <option value="KML">KML</option>
                <option value="Raster">Raster</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Cadastral Maps">Cadastral Maps</option>
                <option value="Land Use & Cover">Land Use &amp; Cover</option>
                <option value="Satellite Imagery">Satellite Imagery</option>
                <option value="Soil Classification">Soil Classification</option>
                <option value="Water Resources">Water Resources</option>
                <option value="Urban Density">Urban Density</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                File Size
              </label>
              <input
                type="text"
                value={formData.fileSize}
                onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                placeholder="45 MB"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Dataset Description &amp; Coordinate Reference System *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe bounding box, coordinate reference system (EPSG:4326/WGS84), resolution..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Spatial Coverage Scope
              </label>
              <input
                type="text"
                value={formData.spatialCoverage}
                onChange={(e) => setFormData({ ...formData, spatialCoverage: e.target.value })}
                placeholder="Pan-India / State Level"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Provider / Agency Name
              </label>
              <input
                type="text"
                value={formData.provider}
                onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                placeholder="National Spatial Data Infrastructure"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-950/50"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{initialData ? 'Save Changes' : 'Publish Dataset'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
