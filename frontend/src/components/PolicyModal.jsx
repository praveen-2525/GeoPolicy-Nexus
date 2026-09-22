import React, { useState } from 'react';
import { X, FileText, CheckCircle } from 'lucide-react';

export const PolicyModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    state: initialData?.state || 'Maharashtra',
    jurisdiction: initialData?.jurisdiction || 'State',
    category: initialData?.category || 'Digital Land Titling',
    status: initialData?.status || 'Active',
    documentUrl: initialData?.documentUrl || 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    citizensAffected: initialData?.impactMetrics?.citizensAffected || '500,000+',
    efficiencyGain: initialData?.impactMetrics?.efficiencyGain || '35%',
    transparencyScore: initialData?.impactMetrics?.transparencyScore || '95%'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: formData.title,
      description: formData.description,
      state: formData.state,
      jurisdiction: formData.jurisdiction,
      category: formData.category,
      status: formData.status,
      documentUrl: formData.documentUrl,
      impactMetrics: {
        citizensAffected: formData.citizensAffected,
        efficiencyGain: formData.efficiencyGain,
        transparencyScore: formData.transparencyScore
      }
    };
    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-8">
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-lg">
            <FileText className="w-5 h-5" />
            <span>{initialData ? 'Edit Policy Document' : 'Draft Policy Document'}</span>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm text-slate-200">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Policy Document Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Maharashtra Digital Land Titling and Encumbrance Framework"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                State / Territory *
              </label>
              <select
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
              >
                <option value="National">National</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Delhi">Delhi</option>
                <option value="Telangana">Telangana</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Jurisdiction
              </label>
              <select
                value={formData.jurisdiction}
                onChange={(e) => setFormData({ ...formData, jurisdiction: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
              >
                <option value="National">National</option>
                <option value="State">State</option>
                <option value="Municipal">Municipal</option>
                <option value="Regional">Regional</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
              >
                <option value="Digital Land Titling">Digital Land Titling</option>
                <option value="Zoning & Master Planning">Zoning &amp; Master Planning</option>
                <option value="Tenure Security">Tenure Security</option>
                <option value="Environmental Protection">Environmental Protection</option>
                <option value="Taxation & Valuation">Taxation &amp; Valuation</option>
                <option value="Rehabilitation">Rehabilitation</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Executive Policy Directives &amp; Clauses *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Outline specific legal clauses, spatial mandate boundaries, title verification procedures..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Impact Metrics Inputs */}
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Estimated Policy Impact Metrics</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Citizens Impacted</label>
                <input
                  type="text"
                  value={formData.citizensAffected}
                  onChange={(e) => setFormData({ ...formData, citizensAffected: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Efficiency Gain</label>
                <input
                  type="text"
                  value={formData.efficiencyGain}
                  onChange={(e) => setFormData({ ...formData, efficiencyGain: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Transparency Score</label>
                <input
                  type="text"
                  value={formData.transparencyScore}
                  onChange={(e) => setFormData({ ...formData, transparencyScore: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
              </div>
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
              className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-amber-950/50"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{initialData ? 'Save Changes' : 'Publish Policy Document'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
