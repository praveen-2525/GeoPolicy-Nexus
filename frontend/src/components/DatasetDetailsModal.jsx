import React, { useState } from 'react';
import { X, Database, Download, HardDrive, Shield, Check, Globe, Layers } from 'lucide-react';

export const DatasetDetailsModal = ({ dataset, isOpen, onClose, onDownload }) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen || !dataset) return null;

  const handleDownloadClick = () => {
    setDownloading(true);
    if (onDownload) {
      onDownload(dataset._id || dataset.id);
    }

    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);

      // Trigger standard sample file download window
      const link = document.createElement('a');
      link.href = dataset.downloadUrl || 'https://geojson.org/';
      link.target = '_blank';
      link.setAttribute('download', `${dataset.title.replace(/\s+/g, '_')}.${dataset.format?.toLowerCase() || 'geojson'}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-slate-950 px-6 py-5 border-b border-slate-800 flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-blue-950 text-blue-400 border border-blue-800 uppercase">
                {dataset.format || 'GeoJSON'}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {dataset.category}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white leading-snug">{dataset.title}</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 text-slate-300 text-sm max-h-[70vh] overflow-y-auto custom-scrollbar">
          
          {/* Spatial Grid specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs">
            <div>
              <span className="text-slate-500 block">File Package Size</span>
              <span className="font-semibold text-slate-200 flex items-center gap-1 mt-0.5">
                <HardDrive className="w-3.5 h-3.5 text-indigo-400" />
                {dataset.fileSize || '25 MB'}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Spatial Coverage</span>
              <span className="font-semibold text-slate-200 flex items-center gap-1 mt-0.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                {dataset.spatialCoverage || 'National'}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Total Downloads</span>
              <span className="font-semibold text-blue-400 flex items-center gap-1 mt-0.5">
                <Download className="w-3.5 h-3.5" />
                {dataset.downloadCount || 0} Downloads
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Data Agency</span>
              <span className="font-semibold text-slate-200 truncate block mt-0.5">
                {dataset.provider || 'Spatial Data Infrastructure'}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Dataset Abstract &amp; GIS Attributes</h3>
            <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-800 leading-relaxed text-slate-200">
              {dataset.description}
            </div>
          </div>

          {/* Geo JSON Mock Schema Preview */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">GeoJSON Feature Schema Preview</h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-[11px] text-emerald-400 overflow-x-auto">
              <pre>{`{
  "type": "FeatureCollection",
  "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
  "features": [
    {
      "type": "Feature",
      "geometry": { "type": "Polygon", "coordinates": [[[72.877, 19.076], [72.880, 19.078], [72.882, 19.074], [72.877, 19.076]]] },
      "properties": { "ULPIN": "IN-MH-450912", "zone": "R1-Residential", "area_sqm": 4520 }
    }
  ]
}`}</pre>
            </div>
          </div>

          {/* Open Data License */}
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center gap-3 text-xs">
            <Shield className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="font-bold text-white block">Government Open Data License</span>
              <span className="text-slate-400">{dataset.license || 'Open Government Data License (OGDL India)'}</span>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex justify-between items-center gap-3">
          <span className="text-xs font-mono text-slate-500">Verified Spatial Vector Layer</span>
          <button
            onClick={handleDownloadClick}
            disabled={downloading}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg ${
              downloadSuccess 
                ? 'bg-emerald-600 text-white' 
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-950/50'
            }`}
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Download Initialized!</span>
              </>
            ) : downloading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Preparing GIS Download...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Full Dataset ({dataset.format})</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
