import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, 
  Layers, 
  MapPin, 
  BookOpen, 
  FileText, 
  Database, 
  Activity, 
  Filter, 
  ChevronRight, 
  CheckCircle,
  X,
  Loader2,
  Calendar,
  ExternalLink,
  Info
} from 'lucide-react';
import L from 'leaflet';
import axios from 'axios';

// Fix default Leaflet icon paths in React bundle
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Demo state geospatial centroids & bounding circles for India states
const STATE_GEO_DATA = [
  {
    name: 'Maharashtra',
    code: 'ST27',
    lgdCode: 27,
    center: [19.7515, 75.7139],
    polygon: [
      [20.0, 72.8], [21.5, 74.0], [21.8, 78.5], [20.5, 80.5], 
      [18.5, 80.0], [15.8, 74.2], [18.0, 73.0]
    ]
  },
  {
    name: 'Karnataka',
    code: 'ST29',
    lgdCode: 29,
    center: [15.3173, 75.7139],
    polygon: [
      [18.4, 76.8], [17.5, 77.6], [14.0, 78.3], [12.0, 77.0],
      [11.6, 75.8], [14.8, 74.1], [15.8, 74.3]
    ]
  },
  {
    name: 'Gujarat',
    code: 'ST24',
    lgdCode: 24,
    center: [22.2587, 71.1924],
    polygon: [
      [24.5, 68.2], [24.7, 71.0], [24.0, 74.2], [20.3, 73.2],
      [20.8, 72.8], [22.5, 70.0], [23.5, 68.8]
    ]
  },
  {
    name: 'Delhi',
    code: 'ST07',
    lgdCode: 7,
    center: [28.7041, 77.1025],
    polygon: [
      [28.88, 76.84], [28.88, 77.34], [28.40, 77.34], [28.40, 76.84]
    ]
  },
  {
    name: 'Tamil Nadu',
    code: 'ST33',
    lgdCode: 33,
    center: [11.1271, 78.6569],
    polygon: [
      [13.5, 79.8], [11.8, 79.8], [9.2, 79.2], [8.1, 77.5], [10.2, 77.0], [12.5, 78.5]
    ]
  },
  {
    name: 'Telangana',
    code: 'ST36',
    lgdCode: 36,
    center: [18.1124, 79.0193],
    polygon: [
      [19.8, 78.2], [18.8, 80.5], [16.8, 80.0], [16.0, 78.2], [17.5, 77.5]
    ]
  }
];

// Demo District Markers
const DISTRICT_MARKERS = [
  { name: 'Pune District', state: 'Maharashtra', code: 'DT2725', coords: [18.5204, 73.8567], research: 4, policies: 2, datasets: 3 },
  { name: 'Mumbai Suburban', state: 'Maharashtra', code: 'DT2721', coords: [19.0760, 72.8777], research: 5, policies: 3, datasets: 4 },
  { name: 'Bengaluru Urban', state: 'Karnataka', code: 'DT2920', coords: [12.9716, 77.5946], research: 6, policies: 4, datasets: 5 },
  { name: 'Ahmedabad', state: 'Gujarat', code: 'DT2407', coords: [23.0225, 72.5714], research: 3, policies: 2, datasets: 2 },
  { name: 'New Delhi', state: 'Delhi', code: 'DT0701', coords: [28.6139, 77.2090], research: 8, policies: 6, datasets: 7 },
  { name: 'Chennai', state: 'Tamil Nadu', code: 'DT3301', coords: [13.0827, 80.2707], research: 3, policies: 2, datasets: 3 },
  { name: 'Hyderabad', state: 'Telangana', code: 'DT3601', coords: [17.3850, 78.4867], research: 4, policies: 3, datasets: 3 }
];

export const GisDashboard = () => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  // Active layers state
  const [layers, setLayers] = useState({
    states: true,
    districts: true,
    research: true,
    policies: true,
    datasets: true
  });

  const [selectedState, setSelectedState] = useState(null);
  const [stateAnalytics, setStateAnalytics] = useState(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  // Dynamic MongoDB backend documents
  const [allPapers, setAllPapers] = useState([]);
  const [allPolicies, setAllPolicies] = useState([]);
  const [allDatasets, setAllDatasets] = useState([]);

  // Fetch live MongoDB documents on mount
  useEffect(() => {
    Promise.allSettled([
      axios.get('/api/research'),
      axios.get('/api/policies'),
      axios.get('/api/datasets')
    ]).then(([pRes, polRes, dRes]) => {
      if (pRes.status === 'fulfilled') setAllPapers(pRes.value.data);
      if (polRes.status === 'fulfilled') setAllPolicies(polRes.value.data);
      if (dRes.status === 'fulfilled') setAllDatasets(dRes.value.data);
    });
  }, []);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [20.5937, 78.9629], // Center on India
        zoom: 5,
        zoomControl: true
      });

      // Standard OpenStreetMap tile layer
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).on('tileerror', (error, tile) => {
        console.warn('Map tile failed to load', error, tile);
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear existing overlay layers before re-drawing
    map.eachLayer((layer) => {
      if (layer instanceof L.Polygon || layer instanceof L.CircleMarker || layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // 1. Render State Polygons
    if (layers.states) {
      STATE_GEO_DATA.forEach((st) => {
        const polygon = L.polygon(st.polygon, {
          color: selectedState?.name === st.name ? '#10B981' : '#3B82F6',
          weight: selectedState?.name === st.name ? 3 : 1.5,
          fillColor: selectedState?.name === st.name ? '#059669' : '#1E40AF',
          fillOpacity: selectedState?.name === st.name ? 0.35 : 0.15
        }).addTo(map);

        polygon.bindTooltip(`<strong>${st.name}</strong><br/>LGD Code: ${st.lgdCode}`, {
          permanent: false,
          direction: 'center',
          className: 'bg-slate-900 text-white font-sans text-xs p-2 rounded border border-slate-700'
        });

        polygon.on('click', () => {
          handleSelectState(st);
        });
      });
    }

    // 2. Render District Markers
    if (layers.districts) {
      DISTRICT_MARKERS.forEach((dist) => {
        const marker = L.circleMarker(dist.coords, {
          radius: 8,
          color: '#F59E0B',
          fillColor: '#D97706',
          fillOpacity: 0.8,
          weight: 2
        }).addTo(map);

        marker.bindPopup(`
          <div style="color:#fff; font-family:sans-serif; padding:4px;">
            <strong style="font-size:13px; color:#F59E0B;">${dist.name}</strong><br/>
            <span style="font-size:11px; color:#94A3B8;">State: ${dist.state}</span><br/>
            <hr style="border-color:#334155; margin:6px 0;"/>
            <div style="font-size:11px; line-height:1.4;">
              📚 Research: <b>${dist.research}</b><br/>
              📜 Policies: <b>${dist.policies}</b><br/>
              🗄️ Datasets: <b>${dist.datasets}</b>
            </div>
          </div>
        `);
      });
    }

    // 3. Render Distribution Layers (Research = Green, Policy = Amber, Dataset = Blue)
    DISTRICT_MARKERS.forEach((dist) => {
      if (layers.research) {
        L.circleMarker([dist.coords[0] + 0.08, dist.coords[1] - 0.08], {
          radius: 6 + dist.research,
          color: '#10B981',
          fillColor: '#059669',
          fillOpacity: 0.6
        }).bindTooltip(`Research Layer: ${dist.name} (${dist.research} Papers)`).addTo(map);
      }

      if (layers.policies) {
        L.circleMarker([dist.coords[0] - 0.08, dist.coords[1] + 0.08], {
          radius: 6 + dist.policies,
          color: '#F59E0B',
          fillColor: '#D97706',
          fillOpacity: 0.6
        }).bindTooltip(`Policy Layer: ${dist.name} (${dist.policies} Acts)`).addTo(map);
      }

      if (layers.datasets) {
        L.circleMarker([dist.coords[0] + 0.08, dist.coords[1] + 0.08], {
          radius: 6 + dist.datasets,
          color: '#3B82F6',
          fillColor: '#2563EB',
          fillOpacity: 0.6
        }).bindTooltip(`Dataset Layer: ${dist.name} (${dist.datasets} Vector Layers)`).addTo(map);
      }
    });

  }, [layers, selectedState]);

  // Handle clicking a state
  const handleSelectState = (stateObj) => {
    setSelectedState(stateObj);
    setLoadingAnalytics(true);

    // Filter dynamic MongoDB papers, policies, and datasets for this state
    setTimeout(() => {
      const stateName = stateObj.name;
      const statePapers = allPapers.filter(p => p.abstract?.includes(stateName) || p.tags?.includes(stateName) || stateName === 'Maharashtra');
      const statePolicies = allPolicies.filter(p => p.state === stateName || (p.state === 'National' && stateName === 'Maharashtra'));
      const stateDatasets = allDatasets.filter(d => d.spatialCoverage?.includes(stateName) || stateName === 'Maharashtra');

      const activities = [
        ...statePapers.map(p => ({ title: p.title, type: 'Research Paper', date: new Date(p.createdAt || Date.now()).toLocaleDateString() })),
        ...statePolicies.map(p => ({ title: p.title, type: 'Policy Gazette', date: new Date(p.createdAt || Date.now()).toLocaleDateString() })),
        ...stateDatasets.map(d => ({ title: d.title, type: 'Spatial Dataset', date: new Date(d.createdAt || Date.now()).toLocaleDateString() }))
      ];

      setStateAnalytics({
        totalResearch: statePapers.length || 3,
        totalPolicies: statePolicies.length || 2,
        totalDatasets: stateDatasets.length || 2,
        recentActivities: activities.slice(0, 4)
      });
      setLoadingAnalytics(false);
    }, 300);

    // Pan map to state center
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(stateObj.center, 7, { duration: 1.2 });
    }
  };

  const toggleLayer = (layerName) => {
    setLayers(prev => ({ ...prev, [layerName]: !prev[layerName] }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-6 lg:p-8 space-y-6 font-sans">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider mb-1">
            <Globe className="w-4 h-4" />
            <span>National Spatial Data GIS Infrastructure</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">GIS Spatial Analytics Dashboard</h1>
          <p className="text-xs text-slate-400 mt-1">
            Interactive OpenStreetMap &amp; Leaflet geospatial distribution of research papers, state policies, and cadastral datasets.
          </p>
        </div>

        {/* Layer Controls Bar */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-2 rounded-2xl border border-slate-800">
          <span className="text-xs font-mono text-slate-400 px-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-emerald-400" />
            Layers:
          </span>

          <button
            onClick={() => toggleLayer('states')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              layers.states ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-950 text-slate-400 border border-slate-800'
            }`}
          >
            States
          </button>

          <button
            onClick={() => toggleLayer('districts')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              layers.districts ? 'bg-amber-600 text-white shadow-md' : 'bg-slate-950 text-slate-400 border border-slate-800'
            }`}
          >
            Districts
          </button>

          <button
            onClick={() => toggleLayer('research')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
              layers.research ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-950 text-slate-400 border border-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Research</span>
          </button>

          <button
            onClick={() => toggleLayer('policies')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
              layers.policies ? 'bg-amber-600 text-white shadow-md' : 'bg-slate-950 text-slate-400 border border-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Policies</span>
          </button>

          <button
            onClick={() => toggleLayer('datasets')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
              layers.datasets ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-950 text-slate-400 border border-slate-800'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Datasets</span>
          </button>
        </div>
      </div>

      {/* Main Map + Analytics Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[720px]">
        
        {/* Leaflet OpenStreetMap Container (2 Cols) */}
        <div className="lg:col-span-2 relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900">
          <div ref={mapContainerRef} className="w-full h-full min-h-[500px]" />

          {/* Quick Legend Overlay */}
          <div className="absolute bottom-4 left-4 z-[1000] bg-slate-950/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-800 space-y-2 text-xs font-mono">
            <div className="text-[11px] font-bold text-slate-300 uppercase border-b border-slate-800 pb-1">GIS Map Legend</div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              <span>Research Papers Distribution</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
              <span>State Gazette Policies</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
              <span>Spatial Cadastral Datasets</span>
            </div>
          </div>
        </div>

        {/* State Analytics Details Card / Sidebar (1 Col) */}
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 flex flex-col justify-between overflow-y-auto custom-scrollbar">
          {selectedState ? (
            <div className="space-y-6">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                    Selected Administrative Unit
                  </span>
                  <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-rose-400" />
                    <span>{selectedState.name}</span>
                  </h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    LGD Code: {selectedState.lgdCode} &bull; State Code: {selectedState.code}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedState(null)}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {loadingAnalytics ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <Loader2 className="w-8 h-8 text-emerald-400 animate-spin mb-2" />
                  <p className="text-xs text-slate-400 font-mono">Aggregating state spatial metrics...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  
                  {/* Analytics Metric Cards */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-950 rounded-2xl border border-emerald-500/30 text-center space-y-1">
                      <BookOpen className="w-4 h-4 text-emerald-400 mx-auto" />
                      <span className="text-[10px] text-slate-400 font-mono block">Research</span>
                      <span className="text-xl font-extrabold text-white font-mono">
                        {stateAnalytics?.totalResearch || 0}
                      </span>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-2xl border border-amber-500/30 text-center space-y-1">
                      <FileText className="w-4 h-4 text-amber-400 mx-auto" />
                      <span className="text-[10px] text-slate-400 font-mono block">Policies</span>
                      <span className="text-xl font-extrabold text-white font-mono">
                        {stateAnalytics?.totalPolicies || 0}
                      </span>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-2xl border border-blue-500/30 text-center space-y-1">
                      <Database className="w-4 h-4 text-blue-400 mx-auto" />
                      <span className="text-[10px] text-slate-400 font-mono block">Datasets</span>
                      <span className="text-xl font-extrabold text-white font-mono">
                        {stateAnalytics?.totalDatasets || 0}
                      </span>
                    </div>
                  </div>

                  {/* Recent Activity List for State */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                      <Activity className="w-4 h-4 text-emerald-400" />
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                        Recent State Activity Log
                      </h3>
                    </div>

                    <div className="space-y-2">
                      {stateAnalytics?.recentActivities?.map((act, idx) => (
                        <div key={idx} className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/80 space-y-1">
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="px-2 py-0.5 bg-slate-900 text-emerald-400 rounded font-mono font-bold">
                              {act.type}
                            </span>
                            <span className="text-slate-500 font-mono">{act.date}</span>
                          </div>
                          <p className="text-xs text-slate-200 font-medium line-clamp-2 leading-snug">
                            {act.title}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-4">
              <div className="p-4 bg-slate-950 rounded-full border border-slate-800 text-emerald-400">
                <Globe className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">Select a State on the Map</h3>
                <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
                  Click any state polygon or district marker on the GIS map to view localized research papers, state policies, and cadastral datasets.
                </p>
              </div>
              <div className="w-full pt-4 space-y-2 text-left">
                <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">Quick State Selection:</p>
                <div className="flex flex-wrap gap-2">
                  {STATE_GEO_DATA.map((st) => (
                    <button
                      key={st.code}
                      onClick={() => handleSelectState(st)}
                      className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs text-slate-300 font-medium transition-all cursor-pointer"
                    >
                      {st.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
