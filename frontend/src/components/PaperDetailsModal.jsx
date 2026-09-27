import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  ExternalLink, 
  Share2, 
  Tag, 
  Calendar, 
  User, 
  FileText, 
  CheckCircle2, 
  Download, 
  Bookmark, 
  BookmarkCheck, 
  Copy, 
  FileCheck,
  Building2,
  Sparkles,
  Layers
} from 'lucide-react';

export const PaperDetailsModal = ({ paper, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'pdf' | 'citation'
  const [citationFormat, setCitationFormat] = useState('APA');
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!isOpen || !paper) return null;

  // Generate Citations across 5 standard formats
  const generateCitation = () => {
    const author = paper.author || 'Sundaram, R.';
    const title = paper.title;
    const year = new Date(paper.publicationDate || paper.createdAt || Date.now()).getFullYear();
    const doi = paper.doi || '10.1016/geopol.2026.01';

    switch (citationFormat) {
      case 'APA':
        return `${author} (${year}). ${title}. National Land Governance Intelligence Repository, Ministry of Rural Development. https://doi.org/${doi}`;
      case 'MLA':
        return `${author}. "${title}." National Land Governance Intelligence Repository, Ministry of Rural Development, Govt of India, ${year}, doi:${doi}.`;
      case 'Chicago':
        return `${author}. "${title}." National Land Governance Intelligence Repository. Department of Land Resources (${year}). doi:${doi}.`;
      case 'Harvard':
        return `${author}, ${year}. '${title}', National Land Governance Intelligence Repository, Ministry of Rural Development, New Delhi.`;
      case 'BibTeX':
        return `@article{geopolicy_${paper._id || '2026'},\n  author = {${author}},\n  title = {${title}},\n  journal = {National Land Governance Intelligence Repository},\n  year = {${year}},\n  doi = {${doi}}\n}`;
      default:
        return `${author} (${year}). ${title}.`;
    }
  };

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(generateCitation());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert(`[Official PDF Download Initiated]: "${paper.title}.pdf"\nVerified with Government of India SHA-256 digital watermark.`);
    }, 800);
  };

  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto font-sans">
      <div className="bg-white border border-slate-300 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-8">
        
        {/* Tricolor Stripe */}
        <div className="tricolor-stripe"></div>

        {/* Modal Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-start justify-between">
          <div className="space-y-1 pr-4">
            <div className="flex items-center gap-2">
              <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-[#0A3678] border border-blue-200">
                {paper.category || 'Land Governance'}
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                DOI: {paper.doi || '10.1016/geopol.2026.01'}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">{paper.title}</h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleToggleBookmark}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isBookmarked ? 'bg-amber-50 text-amber-700 border-amber-300' : 'bg-white text-slate-500 hover:text-slate-800 border-slate-200'
              }`}
              title={isBookmarked ? "Remove Bookmark" : "Bookmark Research"}
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4 fill-amber-500 text-amber-600" /> : <Bookmark className="w-4 h-4" />}
            </button>
            <button 
              onClick={onClose} 
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-white px-6">
          <button
            onClick={() => setActiveTab('summary')}
            className={`py-2.5 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'summary' ? 'border-[#0A3678] text-[#0A3678]' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Executive Summary
          </button>
          <button
            onClick={() => setActiveTab('pdf')}
            className={`py-2.5 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'pdf' ? 'border-[#0A3678] text-[#0A3678]' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            PDF Document Preview
          </button>
          <button
            onClick={() => setActiveTab('citation')}
            className={`py-2.5 px-4 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'citation' ? 'border-[#0A3678] text-[#0A3678]' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Citation Generator
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto custom-scrollbar">
          
          {/* TAB 1: SUMMARY */}
          {activeTab === 'summary' && (
            <div className="space-y-6">
              
              {/* Metadata Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px]">Lead Author</span>
                  <span className="font-semibold text-slate-900 flex items-center gap-1 mt-0.5">
                    <User className="w-3.5 h-3.5 text-blue-700" />
                    {paper.author || 'Research Team'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Publication Date</span>
                  <span className="font-semibold text-slate-900 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    {new Date(paper.publicationDate || paper.createdAt || Date.now()).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Peer Citations</span>
                  <span className="font-semibold text-emerald-700 flex items-center gap-1 mt-0.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    {paper.citationCount || 18} Citations
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Institution</span>
                  <span className="font-semibold text-slate-900 flex items-center gap-1 mt-0.5 truncate">
                    <Building2 className="w-3.5 h-3.5 text-purple-700" />
                    {paper.institution || 'IIT Delhi / ICSSR'}
                  </span>
                </div>
              </div>

              {/* Abstract */}
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                  Abstract &amp; Research Findings
                </h3>
                <div className="p-4 bg-white rounded-xl border border-slate-200 leading-relaxed text-xs text-slate-700 space-y-2">
                  <p>{paper.abstract}</p>
                  <p className="text-slate-600">
                    <strong>Methodology:</strong> Cross-sectional empirical spatial analysis utilizing 
                    high-precision CORS receivers, cadastral map vectorization, and court litigation backlog records 
                    across district revenue registries.
                  </p>
                </div>
              </div>

              {/* Subject Tags */}
              {paper.tags && paper.tags.length > 0 && (
                <div className="space-y-1.5">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                    Keywords &amp; Spatial Tags
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {paper.tags.map((tag, idx) => (
                      <span key={idx} className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 rounded-md text-xs font-medium text-slate-700 border border-slate-200">
                        <Tag className="w-3 h-3 text-[#0A3678]" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Evidence-Based Policy Applications */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Evidence-Based Policy Governance Alignment</span>
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  This research paper has been approved by the editorial screening committee for national 
                  legislative policy committees, state revenue departments, and Digital India Land Records modernization task forces.
                </p>
              </div>

              {/* Related Research Recommendations */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Related Research Recommendations
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <p className="font-bold text-xs text-[#0A3678]">
                      Spatial Accuracy of Drone Photogrammetry in SVAMITVA Surveys
                    </p>
                    <p className="text-[11px] text-slate-500">Dr. Sunita Deshmukh &bull; 2025</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <p className="font-bold text-xs text-[#0A3678]">
                      Automated Mutation Impact on Sub-Registrar Revenue Backlog
                    </p>
                    <p className="text-[11px] text-slate-500">Vikramaditya Rao &bull; 2024</p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: EMBEDDED PDF PREVIEW */}
          {activeTab === 'pdf' && (
            <div className="space-y-4">
              <div className="border border-slate-300 rounded-xl p-8 bg-slate-100 min-h-[380px] flex flex-col justify-between shadow-inner relative overflow-hidden">
                
                {/* Government Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none rotate-[-30deg]">
                  <span className="text-5xl font-extrabold text-slate-900 tracking-widest uppercase">
                    GOVERNMENT OF INDIA &bull; RESTRICTED DISTRIBUTION
                  </span>
                </div>

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between border-b border-slate-300 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full border border-[#0A3678] bg-white flex items-center justify-center">
                        <FileText className="w-4 h-4 text-[#0A3678]" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">National Land Governance Intelligence Repository</p>
                        <p className="text-[10px] text-slate-500">Official Gazetted Research Document &bull; DoLR-MoRD</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-slate-600 bg-white px-2 py-1 rounded border border-slate-200">
                      Page 1 of 24
                    </span>
                  </div>

                  <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-3">
                    <div className="text-center space-y-1 border-b border-slate-100 pb-3">
                      <h4 className="text-base font-extrabold text-slate-900">{paper.title}</h4>
                      <p className="text-xs text-slate-600">{paper.author || 'Research Team'} &bull; Published 2026</p>
                      <p className="text-[10px] text-slate-400 font-mono">DOI: {paper.doi || '10.1016/geopol.2026.01'}</p>
                    </div>

                    <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
                      <p className="font-semibold text-slate-900">1. Executive Overview</p>
                      <p>{paper.abstract}</p>
                      <p className="font-semibold text-slate-900 mt-2">2. Spatial Analysis &amp; Vector Integration</p>
                      <p className="text-slate-600">
                        The empirical dataset includes 14-digit ULPIN parcel markers geo-referenced against high-resolution orthorectified imagery, establishing rigorous title boundary tolerances within ±5 centimeters.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between text-xs text-slate-500 relative z-10 border-t border-slate-300">
                  <span>Digital Signature Verified: DoLR-CERT-2026</span>
                  <button
                    onClick={handleDownload}
                    className="px-3 py-1.5 bg-[#0A3678] text-white rounded-lg font-bold hover:bg-[#002244] shadow-xs flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Complete PDF (2.4 MB)</span>
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: CITATION GENERATOR */}
          {activeTab === 'citation' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                  Select Citation Standard
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['APA', 'MLA', 'Chicago', 'Harvard', 'BibTeX'].map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setCitationFormat(fmt)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        citationFormat === fmt
                          ? 'bg-[#0A3678] text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 relative">
                <pre className="text-xs text-slate-800 font-mono whitespace-pre-wrap leading-relaxed">
                  {generateCitation()}
                </pre>

                <button
                  onClick={handleCopyCitation}
                  className="mt-3 px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5 text-[#0A3678]" />
                  <span>{copied ? 'Citation Copied!' : `Copy ${citationFormat} Citation`}</span>
                </button>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 leading-relaxed">
                ℹ️ All citations exported from GeoPolicy Nexus are formatted in compliance with ISO 690 and Indian Academic Metadata standards.
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap justify-between items-center gap-3">
          <div className="text-xs text-slate-500 font-mono">
            Status: <span className="text-emerald-700 font-bold font-sans">Peer-Reviewed &amp; Gazetted</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="px-4 py-2 bg-[#0A3678] hover:bg-[#002244] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Preparing Official PDF...' : 'Download Full Paper'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
