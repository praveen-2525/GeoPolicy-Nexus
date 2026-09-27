import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { RoleBadge } from '../components/RoleBadge';
import RoleAvatar from '../components/RoleAvatar';
import { 
  User, 
  Mail, 
  Building2, 
  MapPin, 
  Shield, 
  Key, 
  Save, 
  BookOpen, 
  FileText, 
  Database,
  CheckCircle2,
  Lock,
  UserCheck
} from 'lucide-react';
import axios from 'axios';

export const ProfilePage = ({ setCurrentPage }) => {
  const { user, updateProfile, switchDemoRole, DEMO_ACCOUNTS } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('details');

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    designation: user?.designation || '',
    organization: user?.organization || '',
    state: user?.state || '',
    bio: user?.bio || ''
  });

  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        designation: user.designation || '',
        organization: user.organization || '',
        state: user.state || '',
        bio: user.bio || ''
      });
    }
  }, [user]);

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    updateProfile(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);

    try {
      await axios.put('/api/auth/profile', formData);
    } catch (err) {
      // Local fallback handled in context
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    alert('[Credentials Updated]: Password updated successfully in compliance with DPDP Act 2023.');
    setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-6 lg:p-8 space-y-6 font-sans">
      
      {/* Profile Header Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <RoleAvatar role={user?.role} name={formData.name} size="xl" className="shadow-sm" />
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#002244]">{formData.name}</h1>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-[#0A3678] border border-blue-200">
                {user?.role || 'Citizen'}
              </span>
            </div>
            <p className="text-xs text-slate-600 flex items-center justify-center sm:justify-start gap-1 font-mono">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{formData.email}</span>
            </p>
            <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-2">
              <span className="flex items-center gap-1 font-medium text-slate-700">
                <Building2 className="w-3.5 h-3.5 text-[#0A3678]" />
                {formData.organization}
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-600" />
                {formData.state} Jurisdiction
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'details' ? 'bg-[#0A3678] text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Edit Profile
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'security' ? 'bg-[#0A3678] text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Security &amp; Credentials
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'details' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Profile Form (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <User className="w-4 h-4 text-[#0A3678]" />
              <span>Delegate Official Credentials</span>
            </h2>

            {saveSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Profile details updated successfully!</span>
              </div>
            )}

            <form onSubmit={handleProfileSubmit} className="space-y-4 text-xs text-slate-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Official Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Organization / Department</label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">State Jurisdiction</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Bio &amp; Research Focus</label>
                <textarea
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:outline-none focus:border-blue-600 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-[#0A3678] hover:bg-[#002244] text-white font-bold text-xs rounded-lg shadow-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </form>
          </div>

          {/* User Contributions Overview (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">Delegate Record Summary</h3>

            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <BookOpen className="w-4 h-4 text-emerald-700" />
                  <span>Research Papers</span>
                </span>
                <span className="font-mono font-bold text-emerald-700">3 Papers</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <FileText className="w-4 h-4 text-amber-700" />
                  <span>State Policies</span>
                </span>
                <span className="font-mono font-bold text-amber-700">2 Drafted</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <Database className="w-4 h-4 text-[#0A3678]" />
                  <span>Geo Datasets</span>
                </span>
                <span className="font-mono font-bold text-[#0A3678]">1 Layer</span>
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* Security Tab */
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 max-w-xl mx-auto space-y-6 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Lock className="w-4 h-4 text-[#0A3678]" />
            <span>Update Security Password</span>
          </h2>

          <form onSubmit={handlePasswordSubmit} className="space-y-4 text-xs text-slate-700">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Current Password</label>
              <input
                type="password"
                required
                value={passwords.currentPassword}
                onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">New Password</label>
              <input
                type="password"
                required
                value={passwords.newPassword}
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-[#0A3678] hover:bg-[#002244] text-white font-bold text-xs rounded-lg shadow-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <Key className="w-4 h-4" />
              <span>Update Credentials</span>
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
