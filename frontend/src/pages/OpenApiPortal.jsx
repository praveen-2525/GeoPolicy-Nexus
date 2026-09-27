import React, { useState } from 'react';
import { 
  Code, 
  KeyRound, 
  BookOpen, 
  Copy, 
  ExternalLink, 
  CheckCircle2, 
  Terminal, 
  ShieldCheck, 
  RefreshCw,
  Layers,
  FileText,
  Database,
  Lock
} from 'lucide-react';

const API_ENDPOINTS = [
  {
    id: 'cadastral',
    method: 'GET',
    path: '/api/v1/cadastral/parcels',
    title: 'Cadastral Boundaries & ULPIN Vector API',
    description: 'Retrieve verified sub-district village cadastral parcel polygons in GeoJSON format using state code or 14-digit ULPIN.',
    params: 'state_code (string, required), district_code (string), ulpin (string)',
    responseSample: `{
  "status": "success",
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": { "type": "Polygon", "coordinates": [[[73.85, 18.52], [73.86, 18.52], [73.86, 18.53], [73.85, 18.52]]] },
      "properties": {
        "ulpin": "27-PUN-HAV-849201-2026",
        "state": "Maharashtra",
        "district": "Pune",
        "tenure_status": "Conclusive_Verified"
      }
    }
  ]
}`
  },
  {
    id: 'policies',
    method: 'GET',
    path: '/api/v1/policies/gazette',
    title: 'State Policy Gazette Feed API',
    description: 'Query gazetted legislative ordinances, land tenure acts, and auto-mutation directives across 28 states.',
    params: 'state (string), category (string), status (string)',
    responseSample: `{
  "status": "success",
  "total": 4,
  "policies": [
    {
      "id": "pol_kar_2024",
      "title": "Karnataka Digital Bhoomi 2.0 Auto-Mutation Act",
      "state": "Karnataka",
      "enactment_year": 2024,
      "gazette_number": "KA-GOV-2024-81"
    }
  ]
}`
  },
  {
    id: 'disputes',
    method: 'GET',
    path: '/api/v1/analytics/disputes',
    title: 'Land Dispute Statistics & Resolution Metrics API',
    description: 'Aggregated district-level civil litigation counts, average resolution turnaround days, and encumbrance dispute drop rates.',
    params: 'district (string), year (integer)',
    responseSample: `{
  "district": "Pune",
  "state": "Maharashtra",
  "dispute_density": "High",
  "average_resolution_days": 48,
  "post_ulpin_dispute_drop_pct": 58.4
}`
  },
  {
    id: 'research',
    method: 'GET',
    path: '/api/v1/research/papers',
    title: 'Research Repository & Citations API',
    description: 'Programmatic access to 12,500+ indexed peer-reviewed studies, methodological abstracts, and BibTeX citations.',
    params: 'topic (string), author (string), limit (integer)',
    responseSample: `{
  "count": 1,
  "results": [
    {
      "title": "Conclusive Land Titling in India: Legal & Economic Analysis",
      "author": "Dr. Ramesh Sundaram",
      "doi": "10.1016/geopol.2026.01",
      "citation_count": 18
    }
  ]
}`
  }
];

export const OpenApiPortal = () => {
  const [activeEndpoint, setActiveEndpoint] = useState(API_ENDPOINTS[0]);
  const [codeLanguage, setCodeLanguage] = useState('curl'); // 'curl' | 'python' | 'javascript'
  const [apiKey, setApiKey] = useState('gp_live_sec_gov_in_9a8f2c1d0e7b');
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const generateApiKey = () => {
    const newKey = 'gp_live_sec_gov_in_' + Array.from({length: 12}, () => Math.floor(Math.random()*16).toString(16)).join('');
    setApiKey(newKey);
  };

  const getCodeSnippet = () => {
    if (codeLanguage === 'curl') {
      return `curl -X ${activeEndpoint.method} "https://geopolicy.gov.in${activeEndpoint.path}?state_code=ST27" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Accept: application/json"`;
    } else if (codeLanguage === 'python') {
      return `import requests

url = "https://geopolicy.gov.in${activeEndpoint.path}"
headers = {
    "Authorization": "Bearer ${apiKey}",
    "Accept": "application/json"
}
params = {"state_code": "ST27"}

response = requests.get(url, headers=headers, params=params)
data = response.json()
print("Total records:", len(data))`;
    } else {
      return `import axios from 'axios';

const fetchGeoPolicyData = async () => {
  const response = await axios.get('https://geopolicy.gov.in${activeEndpoint.path}', {
    headers: {
      'Authorization': 'Bearer ${apiKey}',
      'Accept': 'application/json'
    },
    params: { state_code: 'ST27' }
  });
  console.log(response.data);
};`;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-6 lg:p-8 space-y-6 font-sans">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#0A3678] font-mono text-xs font-bold uppercase tracking-wider mb-1">
            <Code className="w-4 h-4 text-amber-500" />
            <span>Open Government Data (data.gov.in Standard)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002244]">
            Open API &amp; Developer Integration Portal
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            REST &amp; GeoJSON APIs for academic researchers, GIS software developers, and state revenue integration systems.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>NDSAP Compliant &bull; OGC Vector Protocols</span>
        </div>
      </div>

      {/* API Key Management Box */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-[#0A3678]" />
              <span>Developer API Key Management</span>
            </h3>
            <p className="text-xs text-slate-500">
              Your evaluation API key grants 10,000 requests/day for academic and institutional research.
            </p>
          </div>

          <button
            onClick={generateApiKey}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Regenerate Key</span>
          </button>
        </div>

        <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs font-mono">
          <span className="text-slate-800 font-semibold">{apiKey}</span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(apiKey);
              setCopiedKey(true);
              setTimeout(() => setCopiedKey(false), 2000);
            }}
            className="text-blue-700 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copiedKey ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* API Catalog & Interactive Documentation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* API Endpoints Catalog (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3 h-fit">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
              API Catalog (v1)
            </span>
            <h3 className="text-sm font-bold text-slate-900 mt-0.5">Available Services</h3>
          </div>

          <div className="space-y-2">
            {API_ENDPOINTS.map((ep) => {
              const isSelected = activeEndpoint.id === ep.id;
              return (
                <button
                  key={ep.id}
                  onClick={() => setActiveEndpoint(ep)}
                  className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#0A3678] bg-blue-50/70 shadow-xs ring-1 ring-[#0A3678]'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#0A3678] text-white">
                      {ep.method}
                    </span>
                    <span className="font-mono text-xs text-slate-700 font-bold truncate">
                      {ep.path}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-900 leading-snug">{ep.title}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Endpoint Documentation & Code Samples (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          
          <div className="border-b border-slate-100 pb-4 space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#0A3678] text-white">
                {activeEndpoint.method}
              </span>
              <span className="font-mono text-sm font-bold text-slate-900">{activeEndpoint.path}</span>
            </div>
            <h3 className="text-base font-bold text-slate-900">{activeEndpoint.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{activeEndpoint.description}</p>
          </div>

          {/* Parameters Table */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-slate-800 uppercase font-mono text-[11px]">Request Parameters</h4>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-700">
              {activeEndpoint.params}
            </div>
          </div>

          {/* Code Samples Generator */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-800 uppercase font-mono text-[11px]">Sample Request</h4>
              
              <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
                {['curl', 'python', 'javascript'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setCodeLanguage(lang)}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold uppercase transition-all cursor-pointer ${
                      codeLanguage === lang ? 'bg-[#0A3678] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto relative">
              <pre>{getCodeSnippet()}</pre>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(getCodeSnippet());
                  setCopiedCode(true);
                  setTimeout(() => setCopiedCode(false), 2000);
                }}
                className="absolute top-3 right-3 text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
                title="Copy Request Code"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedCode ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Sample Response */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 uppercase font-mono text-[11px]">Sample Response (200 OK)</h4>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-xs text-slate-800 overflow-x-auto">
              <pre>{activeEndpoint.responseSample}</pre>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
