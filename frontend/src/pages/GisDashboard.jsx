import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  MapPin, 
  Filter, 
  Loader2,
  Maximize2,
  Minimize2,
  Search,
  FileCheck,
  CheckCircle,
  AlertTriangle,
  Layers,
  FileText,
  Download,
  Eye,
  ShieldCheck,
  Droplets,
  CloudRain,
  RefreshCw,
  Building2,
  Navigation,
  Compass
} from 'lucide-react';
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Circle, Tooltip, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { STATE_GEO_DATA, DISTRICT_DATA } from '../data/gisData';
import { PUBLIC_LAND_RECORDS } from '../data/publicLandData';
import { STATE_REVENUE_DEPARTMENTS } from '../data/revenueDeptData';
import { LandRecordReceiptModal } from '../components/LandRecordReceiptModal';
import { LandInspectorModal } from '../components/LandInspectorModal';
import { RevenueDeptModal } from '../components/RevenueDeptModal';

// Fix default Leaflet icon paths in React bundle
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Mock GeoJSON generation for states based on available coordinates
const INDIA_MOCK_GEOJSON = {
  type: "FeatureCollection",
  features: STATE_GEO_DATA.map(st => ({
    type: "Feature",
    properties: { name: st.name, lgdCode: st.lgdCode, ...st },
    geometry: {
      type: "Polygon",
      coordinates: [st.polygon.map(coord => [coord[1], coord[0]])] // [lng, lat] for GeoJSON
    }
  }))
};

// Map controller to handle flyTo without breaking react-leaflet paradigm
function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, { duration: 1.2 });
    }
  }, [center, zoom, map]);
  return null;
}

export const GisDashboard = () => {
  const [layers, setLayers] = useState({
    stateBoundaries: true,
    districtBoundaries: true,
    siteParcels: true,
    governmentLands: true,
    unauthorizedLands: true,
    floodRiskZones: true,
    waterScarcityZones: true,
    disputeHotspots: true
  });

  const [selectedState, setSelectedState] = useState(STATE_GEO_DATA[0]);
  const [selectedDistrict, setSelectedDistrict] = useState(DISTRICT_DATA[0].name);
  const [stateSearch, setStateSearch] = useState('');
  const [districtSearch, setDistrictSearch] = useState('');
  const [siteSearch, setSiteSearch] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [stateAnalytics, setStateAnalytics] = useState(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [mapError, setMapError] = useState(false);
  
  // Map Provider View: 'googleHybrid' | 'googleRoads' | 'satellite' | 'street'
  const [mapProvider, setMapProvider] = useState('googleHybrid');
  
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [inspectedLandRecord, setInspectedLandRecord] = useState(null);
  const [inspectedRevenueDept, setInspectedRevenueDept] = useState(null);

  // Handle selecting a state
  const handleSelectState = (st) => {
    setSelectedState(st);
    setLoadingAnalytics(true);

    setTimeout(() => {
      setStateAnalytics({
        stateName: st.name,
        lgdCode: st.lgdCode,
        districtsCount: st.districts.length,
        disputeIndex: '12.4%',
        digitizedParcels: '1.42 M',
        surveyCoverage: '94.2%',
        activePolicies: 4,
        researchPapers: 5
      });
      setLoadingAnalytics(false);
    }, 200);
  };

  // State Search Filter
  const handleSearchStateSubmit = (e) => {
    e.preventDefault();
    const found = STATE_GEO_DATA.find(st => st.name.toLowerCase().includes(stateSearch.toLowerCase()));
    if (found) {
      handleSelectState(found);
      setStateSearch('');
    }
  };

  // District Search Filter
  const handleSearchDistrictSubmit = (e) => {
    e.preventDefault();
    const found = DISTRICT_DATA.find(d => d.name.toLowerCase().includes(districtSearch.toLowerCase()));
    if (found) {
      setSelectedDistrict(found.name);
      setDistrictSearch('');
    }
  };

  // Site Number Search Filter
  const handleSearchSiteSubmit = (e) => {
    e.preventDefault();
    if (!siteSearch.trim()) return;
    const found = PUBLIC_LAND_RECORDS.find(rec => 
      rec.siteNumber.toLowerCase().includes(siteSearch.toLowerCase()) ||
      rec.ulpin.toLowerCase().includes(siteSearch.toLowerCase()) ||
      (rec.pattaNumber && rec.pattaNumber.toLowerCase().includes(siteSearch.toLowerCase())) ||
      (rec.chittaSittaNumber && rec.chittaSittaNumber.toLowerCase().includes(siteSearch.toLowerCase()))
    );
    if (found) {
      setInspectedLandRecord(found);
      setSiteSearch('');
    }
  };

  const toggleLayer = (layerKey) => {
    setLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  // Map Tile Providers
  const TILE_PROVIDERS = {
    googleHybrid: {
      url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
      attribution: '&copy; Google Maps Hybrid &bull; Satellite + Roads + Buildings'
    },
    googleRoads: {
      url: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      attribution: '&copy; Google Maps Street View &bull; Roads + Traffic + Buildings'
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: '&copy; Esri World Imagery &bull; High Resolution Satellite'
    },
    street: {
      url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; OpenStreetMap contributors &bull; Survey of India NSDI'
    }
  };

  return (
    <div className={`bg-slate-50 text-slate-900 font-sans p-4 sm:p-6 lg:p-8 space-y-6 ${isFullScreen ? 'fixed inset-0 z-50 p-2 bg-white overflow-y-auto' : ''}`}>
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-[#0A3678] font-mono text-xs font-bold uppercase tracking-wider mb-1">
            <Globe className="w-4 h-4 text-amber-500" />
            <span>National Spatial Data Infrastructure (NSDI)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002244]">
            GIS Cadastral Map &amp; Revenue Department Engine
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Google Maps Hybrid, Roads, Traffic &amp; Building Footprints. Click any site parcel or Revenue Department to inspect full details ON TOP of the map.
          </p>
        </div>

        {/* Search Bars for Site No, State, and District */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Site Number Search */}
          <form onSubmit={handleSearchSiteSubmit} className="relative">
            <input
              type="text"
              value={siteSearch}
              onChange={(e) => setSiteSearch(e.target.value)}
              placeholder="Search Site/Patta No (e.g. SITE-KA-BLR-0089)..."
              className="bg-amber-50 border border-amber-300 rounded-lg pl-3 pr-8 py-1.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#0A3678] shadow-xs"
            />
            <button type="submit" className="absolute right-2 top-2 text-amber-700 hover:text-blue-900 font-bold">
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* State Search */}
          <form onSubmit={handleSearchStateSubmit} className="relative">
            <input
              type="text"
              value={stateSearch}
              onChange={(e) => setStateSearch(e.target.value)}
              placeholder="Search state (e.g. Karnataka)..."
              className="bg-white border border-slate-300 rounded-lg pl-3 pr-8 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 shadow-xs"
            />
            <button type="submit" className="absolute right-2 top-2 text-slate-400 hover:text-blue-700">
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>

          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 shadow-xs cursor-pointer"
            title={isFullScreen ? "Exit Fullscreen" : "Fullscreen View"}
          >
            {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Map Tile View Provider Selector & Revenue Dept Shortcuts */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        
        {/* Map Style Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-700 font-mono flex items-center gap-1.5 pr-2 border-r border-slate-200">
            <Navigation className="w-3.5 h-3.5 text-[#0A3678]" />
            Map View Style:
          </span>

          <button
            onClick={() => setMapProvider('googleHybrid')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
              mapProvider === 'googleHybrid' ? 'bg-[#002244] text-amber-300 border-[#002244] shadow-xs' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            Google Satellite + Roads
          </button>

          <button
            onClick={() => setMapProvider('googleRoads')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
              mapProvider === 'googleRoads' ? 'bg-[#0A3678] text-white border-[#0A3678] shadow-xs' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            Google Street &amp; Buildings
          </button>

          <button
            onClick={() => setMapProvider('satellite')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
              mapProvider === 'satellite' ? 'bg-purple-900 text-white border-purple-800 shadow-xs' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            Esri High-Res Satellite
          </button>

          <button
            onClick={() => setMapProvider('street')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
              mapProvider === 'street' ? 'bg-slate-800 text-white border-slate-800 shadow-xs' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            Standard OSM
          </button>
        </div>

        {/* State Revenue Department Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Revenue Dept Details:</span>
          {STATE_REVENUE_DEPARTMENTS.map((dept, i) => (
            <button
              key={i}
              onClick={() => setInspectedRevenueDept(dept)}
              className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-[#0A3678] border border-amber-300 rounded text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1"
            >
              <Building2 className="w-3 h-3 text-amber-600" />
              <span>{dept.state} Revenue</span>
            </button>
          ))}
        </div>

      </div>

      {/* Layer Toggles Bar */}
      <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center gap-2 text-xs">
        <span className="font-bold text-slate-700 font-mono flex items-center gap-1.5 pr-2 border-r border-slate-200">
          <Filter className="w-3.5 h-3.5 text-[#0A3678]" />
          Active Layers:
        </span>

        {Object.keys(layers).map((layerKey) => {
          const names = {
            stateBoundaries: 'State Boundaries',
            districtBoundaries: 'District Centroids',
            siteParcels: 'Site Number Parcels',
            governmentLands: 'Government Lands',
            unauthorizedLands: 'Unauthorized Lands',
            floodRiskZones: 'Flood Risk Zones',
            waterScarcityZones: 'Water Scarcity Zones',
            disputeHotspots: 'Dispute Hotspots'
          };
          const colors = {
            stateBoundaries: 'bg-[#0A3678]',
            districtBoundaries: 'bg-blue-600',
            siteParcels: 'bg-emerald-700',
            governmentLands: 'bg-purple-700',
            unauthorizedLands: 'bg-rose-700',
            floodRiskZones: 'bg-blue-800',
            waterScarcityZones: 'bg-amber-600',
            disputeHotspots: 'bg-red-600'
          };
          return (
            <button
              key={layerKey}
              onClick={() => toggleLayer(layerKey)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                layers[layerKey] ? `${colors[layerKey]} text-white shadow-xs` : 'bg-slate-100 text-slate-600'
              }`}
            >
              {names[layerKey]}
            </button>
          );
        })}
      </div>

      {/* Main Map + Analytics Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[720px]">
        
        {/* React Leaflet MapContainer (8 Cols) */}
        <div className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white">
          {!mapError ? (
            <MapContainer 
              center={[20.5937, 78.9629]} 
              zoom={5} 
              style={{ height: '100%', width: '100%', minHeight: '520px' }}
              zoomControl={true}
              scrollWheelZoom={true}
              whenReady={() => setMapError(false)}
            >
              <TileLayer
                attribution={TILE_PROVIDERS[mapProvider].attribution}
                url={TILE_PROVIDERS[mapProvider].url}
                maxZoom={19}
              />
              <MapController center={selectedState?.center || [20.5937, 78.9629]} zoom={selectedState ? 7 : 5} />
              
              {/* 1. State Boundaries (Mock GeoJSON) */}
              {layers.stateBoundaries && (
                <GeoJSON 
                  data={INDIA_MOCK_GEOJSON}
                  style={(feature) => {
                    const isSelected = selectedState?.name === feature.properties.name;
                    return {
                      color: isSelected ? '#0A3678' : '#3B82F6',
                      weight: isSelected ? 3 : 1.5,
                      fillColor: isSelected ? '#0A3678' : '#60A5FA',
                      fillOpacity: isSelected ? 0.25 : 0.08
                    };
                  }}
                  onEachFeature={(feature, layer) => {
                    layer.bindTooltip(`<strong>${feature.properties.name}</strong><br/>LGD Code: ${feature.properties.lgdCode}`, {
                      direction: 'center',
                      className: 'bg-white text-slate-800 font-sans text-xs p-1.5 rounded shadow border border-slate-200'
                    });
                    layer.on({
                      click: () => {
                        const st = STATE_GEO_DATA.find(s => s.name === feature.properties.name);
                        if (st) handleSelectState(st);
                      }
                    });
                  }}
                />
              )}

              {/* 2. District Centroids */}
              {layers.districtBoundaries && DISTRICT_DATA.map((dist, i) => (
                <CircleMarker 
                  key={`dist-${i}`}
                  center={dist.coords}
                  radius={5}
                  color="#1E40AF"
                  fillColor="#3B82F6"
                  fillOpacity={0.8}
                  weight={1.5}
                >
                  <Tooltip>{dist.name} District ({dist.state})</Tooltip>
                </CircleMarker>
              ))}

              {/* 3. Site Number Interactive Parcels Layer */}
              {layers.siteParcels && PUBLIC_LAND_RECORDS.map((rec) => {
                const isDisputed = rec.disputeInfo.isDisputed;
                const isGovt = rec.landType === 'Government Land';

                return (
                  <CircleMarker
                    key={rec.id}
                    center={rec.coordinates}
                    radius={11}
                    color={isGovt ? '#6B21A8' : isDisputed ? '#DC2626' : '#047857'}
                    fillColor={isGovt ? '#A855F7' : isDisputed ? '#EF4444' : '#10B981'}
                    fillOpacity={0.95}
                    weight={2.5}
                    eventHandlers={{
                      click: () => setInspectedLandRecord(rec)
                    }}
                  >
                    <Tooltip direction="top" offset={[0, -10]} className="font-sans text-xs p-2.5 bg-white rounded-xl shadow-xl border border-slate-200 z-[9999]">
                      <div>
                        <div className="font-black font-mono text-[#0A3678] text-xs">{rec.siteNumber}</div>
                        <div className="font-bold text-slate-900 text-[11px]">{rec.ownerDetails.name}</div>
                        <div className="text-[10px] text-slate-500">{rec.locality}, {rec.state}</div>
                        <div className="text-[10px] font-bold text-[#0A3678] mt-1 pt-1 border-t border-slate-100 flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>Click to inspect land details (Above Map) →</span>
                        </div>
                      </div>
                    </Tooltip>
                  </CircleMarker>
                );
              })}

              {/* 4. Flood Vulnerability Zones */}
              {layers.floodRiskZones && PUBLIC_LAND_RECORDS.filter(r => r.environmentalData.floodRisk.includes('High')).map((r, i) => (
                <Circle 
                  key={`flood-${i}`}
                  center={r.coordinates}
                  radius={25000}
                  color="#1D4ED8"
                  fillColor="#3B82F6"
                  fillOpacity={0.15}
                  weight={1.5}
                  dashArray="4, 4"
                >
                  <Tooltip>Flood Prone Hazard Zone: {r.district} ({r.state})</Tooltip>
                </Circle>
              ))}

              {/* 5. Water Scarcity Zones */}
              {layers.waterScarcityZones && PUBLIC_LAND_RECORDS.filter(r => r.environmentalData.waterScarcity.includes('Severe')).map((r, i) => (
                <Circle 
                  key={`water-${i}`}
                  center={[r.coordinates[0] - 0.08, r.coordinates[1] + 0.08]}
                  radius={20000}
                  color="#D97706"
                  fillColor="#F59E0B"
                  fillOpacity={0.15}
                  weight={1.5}
                >
                  <Tooltip>Severe Water Scarcity Zone: {r.district} ({r.state})</Tooltip>
                </Circle>
              ))}

            </MapContainer>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-3 bg-red-50">
              <AlertTriangle className="w-10 h-10 text-red-600" />
              <h3 className="text-sm font-bold text-red-900">GIS Engine Initialization Failed</h3>
              <p className="text-xs text-red-700 leading-relaxed max-w-md">
                The map engine could not load the vectors. Please check your network connection or verify that Leaflet dependencies are properly installed.
              </p>
            </div>
          )}

          {/* Quick Legend Overlay Box */}
          <div className="absolute bottom-4 left-4 z-[500] bg-white/95 backdrop-blur-sm p-3 rounded-xl border border-slate-200 shadow-lg text-[11px] font-sans space-y-1.5">
            <div className="font-bold text-slate-900 border-b border-slate-200 pb-1 flex items-center justify-between">
              <span>GIS Parcel Map Legend</span>
              <span className="text-[10px] text-slate-500 font-mono ml-2">Click Site for Details</span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-slate-700">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Authorized Site</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span> Government Land</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-600"></span> Active Court Case</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span> Flood Hazard Zone</span>
            </div>
          </div>
        </div>

        {/* State & Public Land Inspection Sidebar (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between overflow-y-auto shadow-md space-y-6 custom-scrollbar">
          
          {/* Site Inspection Quick List */}
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-mono font-bold text-[#0A3678] uppercase tracking-wider">
                Public Cadastral Site Registry
              </span>
              <h2 className="text-xl font-extrabold text-[#002244] flex items-center gap-2 mt-0.5">
                <MapPin className="w-5 h-5 text-red-600" />
                <span>Site Parcels in {selectedState.name}</span>
              </h2>
            </div>

            {/* List of Verified Site Parcels */}
            <div className="space-y-2">
              {PUBLIC_LAND_RECORDS.filter(r => r.state.toLowerCase() === selectedState.name.toLowerCase() || true).slice(0, 5).map((rec) => (
                <button
                  key={rec.id}
                  onClick={() => setInspectedLandRecord(rec)}
                  className="w-full p-3 rounded-xl bg-slate-50 hover:bg-blue-50/80 border border-slate-200 hover:border-blue-300 text-left transition-all cursor-pointer space-y-1 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[#0A3678] text-xs group-hover:underline">
                      {rec.siteNumber}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      rec.landType === 'Government Land' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {rec.landType}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900">{rec.ownerDetails.name}</div>
                  <div className="text-[11px] text-slate-500">{rec.locality}, {rec.district}</div>
                  <div className="flex items-center gap-2 text-[10px] pt-1">
                    <span className="text-emerald-700 font-bold">✓ Patta &amp; Aadhaar Verified</span>
                    {rec.disputeInfo.isDisputed && <span className="text-rose-700 font-bold">⚠️ Active Case</span>}
                  </div>
                </button>
              ))}
            </div>

          </div>

          {/* Quick State Switcher */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <span className="text-[10px] text-slate-400 uppercase font-mono font-bold block">
              Quick State Switch:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {STATE_GEO_DATA.map((st) => (
                <button
                  key={st.code}
                  onClick={() => handleSelectState(st)}
                  className={`px-2 py-1 rounded text-xs transition-colors cursor-pointer ${
                    selectedState.name === st.name
                      ? 'bg-[#0A3678] text-white font-bold'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {st.name}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Land Inspector Modal Overlay (POSITIONED ON TOP / ABOVE MAP - Z-INDEX 9999) */}
      {inspectedLandRecord && (
        <LandInspectorModal
          record={inspectedLandRecord}
          onClose={() => setInspectedLandRecord(null)}
        />
      )}

      {/* State Revenue Dept Modal Overlay (POSITIONED ON TOP / ABOVE MAP - Z-INDEX 9999) */}
      {inspectedRevenueDept && (
        <RevenueDeptModal
          deptData={inspectedRevenueDept}
          onClose={() => setInspectedRevenueDept(null)}
        />
      )}

      {/* Official Land Record Receipt Modal Overlay */}
      <LandRecordReceiptModal 
        isOpen={isReceiptModalOpen} 
        onClose={() => setIsReceiptModalOpen(false)}
        landRecord={{
          receiptNo: "GOI/DILRMP/2026/89421",
          ulpin: "IN-29-8472-9104-5821",
          ownerName: "Udaya Keerthi",
          state: selectedState ? selectedState.name : "Karnataka",
          district: selectedDistrict || "Bengaluru Urban",
          taluk: "Bengaluru South",
          village: "Sarjapura",
          surveyNo: "142/3A",
          areaExtent: "2.45 Acres",
          propertyCardNo: "SVAMITVA-KA-88910",
          mutationStatus: "Approved & Certified",
          issueDate: "24 September 2026",
          digitalSignature: "SHA256: 8aef-9102-bc34-771a-e902-55fa"
        }}
      />

    </div>
  );
};
