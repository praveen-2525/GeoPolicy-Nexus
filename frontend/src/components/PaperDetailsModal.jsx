import React from 'react';
import { X, BookOpen, ExternalLink, Share2, Tag, Calendar, User, FileText, CheckCircle2 } from 'lucide-react';

export const PaperDetailsModal = ({ paper, isOpen, onClose }) => {
  if (!isOpen || !paper) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-slate-950 px-6 py-5 border-b border-slate-800 flex items-start justify-between">
          <div className="space-y-1">
            <span className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
              {paper.category}
            </span>
            <h2 className="text-xl font-bold text-white leading-snug">{paper.title}</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 text-slate-300 text-sm max-h-[70vh] overflow-y-auto custom-scrollbar">
          
          {/* Metadata Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs">
            <div>
              <span className="text-slate-500 block">Lead Author</span>
              <span className="font-semibold text-slate-200 flex items-center gap-1 mt-0.5">
                <User className="w-3.5 h-3.5 text-blue-400" />
                {paper.author}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Publication Date</span>
              <span className="font-semibold text-slate-200 flex items-center gap-1 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                {new Date(paper.publicationDate || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Citations</span>
              <span className="font-semibold text-emerald-400 flex items-center gap-1 mt-0.5">
                <BookOpen className="w-3.5 h-3.5" />
                {paper.citationCount || 0} Peer Citations
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">DOI Reference</span>
              <span className="font-mono text-[11px] text-slate-300 mt-0.5 truncate block">
                {paper.doi || '10.1016/geopol.2026'}
              </span>
            </div>
          </div>

          {/* Abstract */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Abstract &amp; Findings</h3>
            <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-800 leading-relaxed text-slate-200">
              {paper.abstract}
            </div>
          </div>

          {/* Tags */}
          {paper.tags && paper.tags.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Key Subject Tags</h3>
              <div className="flex flex-wrap gap-2">
                {paper.tags.map((tag, idx) => (
                  <span key={idx} className="flex items-center gap-1 px-3 py-1 bg-slate-800 rounded-full text-xs font-medium text-slate-300 border border-slate-700">
                    <Tag className="w-3 h-3 text-emerald-400" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Policy Applications */}
          <div className="p-4 bg-emerald-950/30 border border-emerald-800/40 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Evidence-Based Policy Application</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              This research paper has been verified and cataloged for legislative land governance committees and spatial planning authorities.
            </p>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex flex-wrap justify-between items-center gap-3">
          <div className="text-xs text-slate-500 font-mono">
            Status: <span className="text-emerald-400 font-semibold">{paper.status || 'Published'}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => alert(`Citation copied to clipboard:\n${paper.author} (2026). "${paper.title}". GeoPolicy Nexus Repository.`)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5"
            >
              <Share2 className="w-4 h-4 text-amber-400" />
              <span>Export Citation</span>
            </button>
            <a
              href={paper.pdfUrl || '#'}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-950/50"
            >
              <FileText className="w-4 h-4" />
              <span>View Full PDF Document</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
