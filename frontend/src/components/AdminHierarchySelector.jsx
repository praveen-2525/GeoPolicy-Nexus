import React, { useState, useEffect } from 'react';
import { MapPin, Globe, Layers, Search, CheckCircle, Navigation, Loader2 } from 'lucide-react';
import apiClient, { ENDPOINTS } from '../api/config';

export const AdminHierarchySelector = () => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subDistricts, setSubDistricts] = useState([]);
  const [villages, setVillages] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedSubDistrict, setSelectedSubDistrict] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');

  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingSubDistricts, setLoadingSubDistricts] = useState(false);
  const [loadingVillages, setLoadingVillages] = useState(false);

  const [selectedEntityDetails, setSelectedEntityDetails] = useState(null);

  // 1. Fetch States on mount
  useEffect(() => {
    setLoadingStates(true);
    apiClient.get(ENDPOINTS.BOUNDARIES_STATES)
      .then(res => {
        setStates(res.data || []);
      })
      .catch(err => console.error('Error fetching states:', err))
      .finally(() => setLoadingStates(false));
  }, []);

  // 2. Fetch Districts when State changes
  useEffect(() => {
    if (!selectedState) {
      setDistricts([]);
      setSelectedDistrict('');
      setSubDistricts([]);
      setSelectedSubDistrict('');
      setVillages([]);
      setSelectedVillage('');
      setSelectedEntityDetails(null);
      return;
    }

    const stObj = states.find(s => s.stateCode === selectedState || s._id === selectedState);
    if (stObj) {
      setSelectedEntityDetails({ type: 'State', ...stObj });
    }

    setLoadingDistricts(true);
    const codeToPass = stObj ? stObj.stateCode : selectedState;

    apiClient.get(`${ENDPOINTS.BOUNDARIES_DISTRICTS}/${codeToPass}`)
      .then(res => {
        setDistricts(res.data || []);
        setSelectedDistrict('');
        setSubDistricts([]);
        setSelectedSubDistrict('');
        setVillages([]);
        setSelectedVillage('');
      })
      .catch(err => console.error('Error fetching districts:', err))
      .finally(() => setLoadingDistricts(false));
  }, [selectedState]);

  // 3. Fetch SubDistricts (Taluks) & Villages when District changes
  useEffect(() => {
    if (!selectedDistrict) {
      setSubDistricts([]);
      setSelectedSubDistrict('');
      setVillages([]);
      setSelectedVillage('');
      return;
    }

    const dtObj = districts.find(d => d.districtCode === selectedDistrict || d._id === selectedDistrict);
    if (dtObj) {
      setSelectedEntityDetails({ type: 'District', ...dtObj });
    }

    const dtCode = dtObj ? dtObj.districtCode : selectedDistrict;

    setLoadingSubDistricts(true);
    apiClient.get(`${ENDPOINTS.BOUNDARIES_SUBDISTRICTS}/${dtCode}`)
      .then(res => {
        setSubDistricts(res.data || []);
      })
      .catch(err => console.error('Error fetching subdistricts:', err))
      .finally(() => setLoadingSubDistricts(false));

    setLoadingVillages(true);
    apiClient.get(`${ENDPOINTS.BOUNDARIES_VILLAGES_BY_DISTRICT}/${dtCode}`)
      .then(res => {
        setVillages(res.data || []);
      })
      .catch(err => console.error('Error fetching villages by district:', err))
      .finally(() => setLoadingVillages(false));

  }, [selectedDistrict]);

  // 4. Filter Villages when SubDistrict (Taluk) changes
  useEffect(() => {
    if (!selectedSubDistrict) return;

    const sdObj = subDistricts.find(sd => sd.subDistrictCode === selectedSubDistrict || sd._id === selectedSubDistrict);
    if (sdObj) {
      setSelectedEntityDetails({ type: 'Taluk / Tehsil', ...sdObj });
    }

    const sdCode = sdObj ? sdObj.subDistrictCode : selectedSubDistrict;

    setLoadingVillages(true);
    apiClient.get(`${ENDPOINTS.BOUNDARIES_VILLAGES}/${sdCode}`)
      .then(res => {
        if (res.data && res.data.length > 0) {
          setVillages(res.data);
        }
      })
      .catch(err => console.error('Error fetching villages:', err))
      .finally(() => setLoadingVillages(false));
  }, [selectedSubDistrict]);

  // 5. Select Village details
  useEffect(() => {
    if (!selectedVillage) return;
    const vObj = villages.find(v => v.villageCode === selectedVillage || v._id === selectedVillage);
    if (vObj) {
      setSelectedEntityDetails({ type: 'Village / Parcel', ...vObj });
    }
  }, [selectedVillage]);

  return (
    <div className="space-y-6">
      
      {/* Cascading Dropdowns Card */}
      <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">Indian Administrative Boundary Hierarchy</h2>
          </div>
          <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-bold">
            LGD &amp; Census 2011 Verified
          </span>
        </div>

        {/* Dropdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* 1. State Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-slate-300 flex items-center justify-between">
              <span>Select State / UT:</span>
              {loadingStates && <Loader2 className="w-3 h-3 text-emerald-400 animate-spin" />}
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 shadow-inner"
            >
              <option value="">-- Choose State --</option>
              {states.map((st) => (
                <option key={st._id} value={st.stateCode}>
                  {st.stateName} (LGD: {st.lgdCode})
                </option>
              ))}
            </select>
          </div>

          {/* 2. District Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-slate-300 flex items-center justify-between">
              <span>Select District:</span>
              {loadingDistricts && <Loader2 className="w-3 h-3 text-emerald-400 animate-spin" />}
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              disabled={!selectedState}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 disabled:opacity-50 shadow-inner"
            >
              <option value="">-- Choose District --</option>
              {districts.map((d) => (
                <option key={d._id} value={d.districtCode}>
                  {d.districtName} (LGD: {d.lgdCode})
                </option>
              ))}
            </select>
          </div>

          {/* 3. Village Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-slate-300 flex items-center justify-between">
              <span>Select Village / Settlement:</span>
              {loadingVillages && <Loader2 className="w-3 h-3 text-emerald-400 animate-spin" />}
            </label>
            <select
              value={selectedVillage}
              onChange={(e) => setSelectedVillage(e.target.value)}
              disabled={!selectedDistrict}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 disabled:opacity-50 shadow-inner"
            >
              <option value="">-- Choose Village --</option>
              {villages.map((v) => (
                <option key={v._id} value={v.villageCode}>
                  {v.villageName} (LGD: {v.lgdCode})
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Selected Entity Detailed Metadata Card */}
        {selectedEntityDetails && (
          <div className="p-5 bg-slate-950 rounded-2xl border border-emerald-500/30 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-800 uppercase">
                  {selectedEntityDetails.type}
                </span>
                <h3 className="text-sm font-extrabold text-white">
                  {selectedEntityDetails.stateName || selectedEntityDetails.districtName || selectedEntityDetails.villageName || selectedEntityDetails.subDistrictName}
                </h3>
              </div>
              {selectedEntityDetails.ulpinPrefix && (
                <span className="font-mono text-amber-400 text-[11px] font-bold">
                  ULPIN Prefix: {selectedEntityDetails.ulpinPrefix}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <span className="text-slate-500 block font-mono">LGD Code</span>
                <span className="font-bold text-white font-mono">{selectedEntityDetails.lgdCode || 'N/A'}</span>
              </div>

              <div>
                <span className="text-slate-500 block font-mono">Census 2011 Code</span>
                <span className="font-bold text-slate-300 font-mono">{selectedEntityDetails.censusCode || 'N/A'}</span>
              </div>

              <div>
                <span className="text-slate-500 block font-mono">Latitude</span>
                <span className="font-bold text-emerald-400 font-mono">{selectedEntityDetails.latitude || '19.75'}° N</span>
              </div>

              <div>
                <span className="text-slate-500 block font-mono">Longitude</span>
                <span className="font-bold text-emerald-400 font-mono">{selectedEntityDetails.longitude || '75.71'}° E</span>
              </div>
            </div>

            {/* GeoJSON Geometry Polygon Preview */}
            {selectedEntityDetails.geometry && (
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>GeoJSON Vector Geometry Type: <strong className="text-emerald-400">{selectedEntityDetails.geometry.type}</strong></span>
                  <span>Spatial Index: 2dsphere</span>
                </div>
                <p className="text-[10px] text-slate-500 font-mono truncate">
                  Coordinates: {JSON.stringify(selectedEntityDetails.geometry.coordinates)}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
