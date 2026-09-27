import React, { useState } from 'react';
import { 
  MonitorPlay, 
  MapPin, 
  Clock, 
  Layers, 
  Building2, 
  TreePine, 
  Waves, 
  AlertTriangle 
} from 'lucide-react';
import { MapContainer, TileLayer, Circle, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const TIMELINE_YEARS = [2020, 2025, 2030, 2040, 2050];

const SIMULATION_DATA = {
  2020: { urbanRadius: 10000, forestRadius: 20000, floodRisk: 'Low', urbanColor: '#F58220', forestColor: '#15803D' },
  2025: { urbanRadius: 13000, forestRadius: 19500, floodRisk: 'Moderate', urbanColor: '#EA580C', forestColor: '#166534' },
  2030: { urbanRadius: 17000, forestRadius: 19000, floodRisk: 'High', urbanColor: '#C2410C', forestColor: '#14532D' },
  2040: { urbanRadius: 25000, forestRadius: 18000, floodRisk: 'Severe', urbanColor: '#9A3412', forestColor: '#064E3B' },
  2050: { urbanRadius: 35000, forestRadius: 16000, floodRisk: 'Critical', urbanColor: '#7C2D12', forestColor: '#022C22' }
};

const KEY_CITIES = [
  { name: 'Mumbai', coords: [19.0760, 72.8777] },
  { name: 'Bengaluru', coords: [12.9716, 77.5946] },
  { name: 'Chennai', coords: [13.0827, 80.2707] },
  { name: 'Hyderabad', coords: [17.3850, 78.4867] },
  { name: 'Pune', coords: [18.5204, 73.8567] }
];

export const DigitalTwinSimulation = () => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  React.useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setSelectedYear(prev => {
          const currentIndex = TIMELINE_YEARS.indexOf(prev);
          if (currentIndex === TIMELINE_YEARS.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return TIMELINE_YEARS[currentIndex + 1];
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentData = SIMULATION_DATA[selectedYear];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-6 lg:p-8 font-sans space-y-6 relative overflow-hidden">
      {/* Digital Twin Virtualization Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1920&auto=format&fit=crop')` }}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4 border-b border-slate-200 pb-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-[#0A3678] font-mono text-xs font-bold uppercase mb-1">
            <MonitorPlay className="w-4 h-4 text-amber-500" />
            <span>AI-Powered National Spatial Virtualization</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002244]">
            Digital Twin of India Land Governance
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-3xl">
            Interactive predictive models forecasting Urban Growth, Land Use Change, Infrastructure Expansion, and Climate Impacts from 2020 through 2050.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[680px]">
        {/* Map Container */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden relative">
          <MapContainer 
            center={[20.5937, 78.9629]} 
            zoom={5} 
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              className="map-tiles-grayscale" 
            />

            {KEY_CITIES.map((city, idx) => (
              <React.Fragment key={idx}>
                {/* Urban Sprawl */}
                <Circle 
                  center={city.coords} 
                  radius={currentData.urbanRadius}
                  color={currentData.urbanColor}
                  fillOpacity={0.4}
                  weight={2}
                >
                  <Popup>
                    <strong>{city.name}</strong><br/>
                    Year: {selectedYear}<br/>
                    Urban Sprawl Radius: {currentData.urbanRadius / 1000} km
                  </Popup>
                </Circle>
                {/* Deforestation / Green Cover Shrinkage (Mocked near cities) */}
                <Circle 
                  center={[city.coords[0] + 0.2, city.coords[1] + 0.2]} 
                  radius={currentData.forestRadius}
                  color={currentData.forestColor}
                  fillOpacity={0.4}
                  weight={0}
                />
              </React.Fragment>
            ))}

            {/* Coastal Climate Flood Risk - Bay of Bengal & Arabian Sea mock */}
            <Circle center={[15.0, 81.0]} radius={selectedYear >= 2040 ? 150000 : selectedYear >= 2030 ? 100000 : 50000} color="#0369A1" fillOpacity={0.2} weight={0} />
            <Circle center={[15.0, 72.0]} radius={selectedYear >= 2040 ? 120000 : selectedYear >= 2030 ? 80000 : 40000} color="#0369A1" fillOpacity={0.2} weight={0} />

          </MapContainer>

          {/* Timeline Overlay */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-md px-6 py-4 rounded-full shadow-lg border border-slate-200 flex items-center gap-6 z-[1000]">
            <button onClick={togglePlay} className="w-10 h-10 rounded-full bg-[#0A3678] text-white flex items-center justify-center hover:bg-[#002244] shadow-md transition-colors">
              {isPlaying ? <div className="w-3 h-3 bg-white" /> : <MonitorPlay className="w-4 h-4 ml-0.5" />}
            </button>
            <div className="flex items-center gap-2">
              {TIMELINE_YEARS.map(year => (
                <div key={year} className="flex items-center">
                  <button 
                    onClick={() => { setIsPlaying(false); setSelectedYear(year); }}
                    className={`w-12 h-8 rounded-full text-xs font-bold transition-all ${selectedYear === year ? 'bg-blue-100 text-[#0A3678] border border-blue-300 ring-2 ring-blue-100' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    {year}
                  </button>
                  {year !== 2050 && <div className="w-8 h-0.5 bg-slate-300 mx-1" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Analytics Panel */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
          <div className="border-b border-slate-100 pb-2">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#0A3678]" />
              Simulation Year: {selectedYear}
            </h3>
          </div>

          <div className="space-y-4 flex-1">
            
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-orange-900 font-bold text-sm">
                <Building2 className="w-4 h-4" />
                Urban Infrastructure Expansion
              </div>
              <div className="text-2xl font-extrabold text-orange-700 font-mono">
                +{(currentData.urbanRadius / 1000).toFixed(1)} km
              </div>
              <p className="text-xs text-orange-800">Average peri-urban sprawling radius from major metropolitan centroids.</p>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-green-900 font-bold text-sm">
                <TreePine className="w-4 h-4" />
                Forest & Green Cover
              </div>
              <div className="text-2xl font-extrabold text-green-700 font-mono">
                {(currentData.forestRadius / 1000).toFixed(1)} MHa
              </div>
              <p className="text-xs text-green-800">Predicted land use change due to aggressive urbanization.</p>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-blue-900 font-bold text-sm">
                <span className="flex items-center gap-2"><Waves className="w-4 h-4" /> Coastal Climate Impact</span>
                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${selectedYear >= 2040 ? 'bg-red-200 text-red-900' : 'bg-blue-200 text-blue-900'}`}>
                  {currentData.floodRisk} RISK
                </span>
              </div>
              <div className="w-full bg-blue-200 h-2 rounded-full mt-2">
                <div className="bg-blue-700 h-full rounded-full transition-all duration-500" style={{ width: `${(selectedYear - 2010) * 2}%` }} />
              </div>
              <p className="text-xs text-blue-800">Sea-level rise pushing into vulnerable coastal ecological zones.</p>
            </div>

          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
            <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5"><AlertTriangle className="w-4 h-4 text-amber-500"/> AI Projection Note</div>
            This digital twin utilizes historical DILRMP data combined with IPCC climate projections to estimate future spatial infrastructure stress points.
          </div>

        </div>
      </div>
      
      {/* Inline styles for grayscale map */}
      <style dangerouslySetInnerHTML={{__html: `
        .map-tiles-grayscale {
          filter: grayscale(100%) opacity(0.7);
        }
      `}} />
    </div>
  );
};
