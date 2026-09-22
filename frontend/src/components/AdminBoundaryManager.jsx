import React, { useState } from 'react';
import { PlusCircle, Save, Globe, MapPin, Database, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

export const AdminBoundaryManager = ({ onUnitCreated }) => {
  const [unitType, setUnitType] = useState('State');
  const [formData, setFormData] = useState({
    stateName: '',
    stateCode: '',
    districtName: '',
    districtCode: '',
    subDistrictName: '',
    subDistrictCode: '',
    villageName: '',
    villageCode: '',
    cityName: '',
    cityCode: '',
    lgdCode: '',
    censusCode: '',
    ulpinPrefix: '',
    latitude: '',
    longitude: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    setError('');

    let endpoint = '';
    let payload = {
      lgdCode: Number(formData.lgdCode),
      censusCode: formData.censusCode,
      latitude: parseFloat(formData.latitude || '19.0'),
      longitude: parseFloat(formData.longitude || '75.0'),
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [parseFloat(formData.longitude || '75.0') - 0.05, parseFloat(formData.latitude || '19.0') - 0.05],
            [parseFloat(formData.longitude || '75.0') + 0.05, parseFloat(formData.latitude || '19.0') - 0.05],
            [parseFloat(formData.longitude || '75.0') + 0.05, parseFloat(formData.latitude || '19.0') + 0.05],
            [parseFloat(formData.longitude || '75.0') - 0.05, parseFloat(formData.latitude || '19.0') + 0.05],
            [parseFloat(formData.longitude || '75.0') - 0.05, parseFloat(formData.latitude || '19.0') - 0.05]
          ]
        ]
      }
    };

    if (unitType === 'State') {
      endpoint = '/api/boundaries/states';
      payload = {
        ...payload,
        stateName: formData.stateName,
        stateCode: formData.stateCode || `ST${Math.floor(10 + Math.random() * 89)}`
      };
    } else if (unitType === 'District') {
      endpoint = '/api/boundaries/districts';
      payload = {
        ...payload,
        districtName: formData.districtName,
        districtCode: formData.districtCode || `DT${Math.floor(1000 + Math.random() * 8999)}`,
        stateCode: formData.stateCode || 'ST27',
        stateName: formData.stateName || 'Maharashtra'
      };
    } else if (unitType === 'Taluk') {
      endpoint = '/api/boundaries/subdistricts';
      payload = {
        ...payload,
        subDistrictName: formData.subDistrictName,
        subDistrictCode: formData.subDistrictCode || `SD${Math.floor(10000 + Math.random() * 89999)}`,
        districtCode: formData.districtCode || 'DT2725',
        districtName: formData.districtName || 'Pune',
        stateCode: formData.stateCode || 'ST27',
        stateName: formData.stateName || 'Maharashtra'
      };
    } else if (unitType === 'Village') {
      endpoint = '/api/boundaries/villages';
      payload = {
        ...payload,
        villageName: formData.villageName,
        villageCode: formData.villageCode || `VIL${Math.floor(100000 + Math.random() * 899999)}`,
        ulpinPrefix: formData.ulpinPrefix || `IN-MH-${Math.floor(100000 + Math.random() * 899999)}`,
        subDistrictCode: formData.subDistrictCode || 'SD272501',
        subDistrictName: formData.subDistrictName || 'Haveli',
        districtCode: formData.districtCode || 'DT2725',
        districtName: formData.districtName || 'Pune',
        stateCode: formData.stateCode || 'ST27',
        stateName: formData.stateName || 'Maharashtra'
      };
    } else if (unitType === 'City') {
      endpoint = '/api/boundaries/cities';
      payload = {
        ...payload,
        cityName: formData.cityName,
        cityCode: formData.cityCode || `CT${Math.floor(100000 + Math.random() * 899999)}`,
        districtCode: formData.districtCode || 'DT2725',
        districtName: formData.districtName || 'Pune',
        stateCode: formData.stateCode || 'ST27',
        stateName: formData.stateName || 'Maharashtra'
      };
    }

    try {
      const res = await axios.post(endpoint, payload);
      setMessage(`Successfully created ${unitType} administrative boundary entity in MongoDB!`);
      if (onUnitCreated) onUnitCreated(res.data);
    } catch (err) {
      console.error('Error creating boundary unit:', err);
      setError(err.response?.data?.message || `Failed to create ${unitType} in MongoDB database.`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <PlusCircle className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-bold text-white">Create Administrative Boundary Unit</h2>
        </div>
        <span className="text-xs font-mono text-slate-400">G2G Census &amp; LGD Registrar</span>
      </div>

      {message && (
        <div className="p-4 bg-emerald-950/60 border border-emerald-800 rounded-xl flex items-center gap-2 text-xs text-emerald-300 font-medium">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-950/60 border border-red-800 rounded-xl flex items-center gap-2 text-xs text-red-300 font-medium">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="space-y-1">
            <label className="text-xs font-mono font-bold text-slate-300">Unit Level</label>
            <select
              value={unitType}
              onChange={(e) => setUnitType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            >
              <option value="State">State / UT</option>
              <option value="District">District</option>
              <option value="Taluk">SubDistrict / Taluk</option>
              <option value="Village">Village / Settlement</option>
              <option value="City">City Municipal Corporation</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono font-bold text-slate-300">LGD Code</label>
            <input
              type="number"
              required
              value={formData.lgdCode}
              onChange={(e) => setFormData({ ...formData, lgdCode: e.target.value })}
              placeholder="e.g., 521"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono font-bold text-slate-300">Census 2011 Code</label>
            <input
              type="text"
              required
              value={formData.censusCode}
              onChange={(e) => setFormData({ ...formData, censusCode: e.target.value })}
              placeholder="e.g., 52109"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          {unitType === 'Village' && (
            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-slate-300">ULPIN Prefix</label>
              <input
                type="text"
                value={formData.ulpinPrefix}
                onChange={(e) => setFormData({ ...formData, ulpinPrefix: e.target.value })}
                placeholder="e.g., IN-MH-272501-HIN"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
              />
            </div>
          )}

        </div>

        {/* Dynamic Name Inputs based on Unit Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {unitType === 'State' && (
            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-slate-300">State Name</label>
              <input
                type="text"
                required
                value={formData.stateName}
                onChange={(e) => setFormData({ ...formData, stateName: e.target.value })}
                placeholder="e.g., Telangana"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          )}

          {unitType === 'District' && (
            <>
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-300">District Name</label>
                <input
                  type="text"
                  required
                  value={formData.districtName}
                  onChange={(e) => setFormData({ ...formData, districtName: e.target.value })}
                  placeholder="e.g., Hyderabad"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-300">State Name</label>
                <input
                  type="text"
                  value={formData.stateName}
                  onChange={(e) => setFormData({ ...formData, stateName: e.target.value })}
                  placeholder="e.g., Telangana"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </>
          )}

          {unitType === 'Taluk' && (
            <>
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-300">Taluk / Tehsil Name</label>
                <input
                  type="text"
                  required
                  value={formData.subDistrictName}
                  onChange={(e) => setFormData({ ...formData, subDistrictName: e.target.value })}
                  placeholder="e.g., Charminar Tehsil"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-300">District Name</label>
                <input
                  type="text"
                  value={formData.districtName}
                  onChange={(e) => setFormData({ ...formData, districtName: e.target.value })}
                  placeholder="e.g., Hyderabad"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </>
          )}

          {unitType === 'Village' && (
            <>
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-300">Village / Settlement Name</label>
                <input
                  type="text"
                  required
                  value={formData.villageName}
                  onChange={(e) => setFormData({ ...formData, villageName: e.target.value })}
                  placeholder="e.g., Madhapur Village"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-mono font-bold text-slate-300">Taluk / SubDistrict Name</label>
                <input
                  type="text"
                  value={formData.subDistrictName}
                  onChange={(e) => setFormData({ ...formData, subDistrictName: e.target.value })}
                  placeholder="e.g., Serilingampally"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>
            </>
          )}

          {unitType === 'City' && (
            <div className="space-y-1">
              <label className="text-xs font-mono font-bold text-slate-300">City Municipal Name</label>
              <input
                type="text"
                required
                value={formData.cityName}
                onChange={(e) => setFormData({ ...formData, cityName: e.target.value })}
                placeholder="e.g., Greater Hyderabad Municipal Corporation"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-mono font-bold text-slate-300">Latitude (°N)</label>
            <input
              type="number"
              step="any"
              required
              value={formData.latitude}
              onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
              placeholder="e.g., 17.3850"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono font-bold text-slate-300">Longitude (°E)</label>
            <input
              type="number"
              step="any"
              required
              value={formData.longitude}
              onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
              placeholder="e.g., 78.4867"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-950/50 flex items-center gap-2 transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{submitting ? 'Persisting to MongoDB...' : `Save ${unitType} to MongoDB`}</span>
        </button>
      </form>
    </div>
  );
};
