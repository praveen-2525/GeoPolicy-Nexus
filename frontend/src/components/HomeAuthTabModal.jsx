import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { 
  LogIn, 
  UserPlus, 
  Lock, 
  Mail, 
  User, 
  Building2, 
  Shield, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  X,
  ArrowRight
} from 'lucide-react';

export const HomeAuthTabModal = ({ setCurrentPage, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const { login, register, switchDemoRole, DEMO_ACCOUNTS } = useContext(AuthContext);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState('Researcher');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        setSuccessMsg('Authentication successful! Redirecting to Workspace...');
        setTimeout(() => {
          if (onClose) onClose();
          setCurrentPage('dashboard');
        }, 800);
      } else {
        setError(res.message || 'Invalid email or password.');
      }
    } catch (err) {
      setError('Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userData = {
        name,
        email,
        password,
        role,
        designation: designation || 'Delegate Researcher',
        organization: organization || 'Spatial Governance Research Institute'
      };
      const res = await register(userData);
      if (res.success) {
        setSuccessMsg('Registration complete! Delegate session activated.');
        setTimeout(() => {
          if (onClose) onClose();
          setCurrentPage('dashboard');
        }, 800);
      } else {
        setError(res.message || 'Registration failed. Check your inputs.');
      }
    } catch (err) {
      setError('Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 max-w-xl mx-auto space-y-6 text-slate-800 relative">
      
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Header & Tab Switcher */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0A3678] text-xs font-bold font-mono">
          <Shield className="w-3.5 h-3.5" />
          <span>Government Portal Access</span>
        </div>

        <h3 className="text-2xl font-black text-[#002244]">
          {activeTab === 'login' ? 'Sign In to Workspace' : 'Register New Delegate'}
        </h3>
        <p className="text-xs text-slate-500">
          Access spatial datasets, policy simulation sandboxes, and research repositories.
        </p>

        {/* Tab Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 max-w-xs mx-auto">
          <button
            type="button"
            onClick={() => { setActiveTab('login'); setError(''); setSuccessMsg(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'login' ? 'bg-[#0A3678] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Login Tab</span>
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('register'); setError(''); setSuccessMsg(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'register' ? 'bg-[#0A3678] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>New Register</span>
          </button>
        </div>
      </div>

      {/* Feedback Alerts */}
      {error && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 font-medium">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 font-bold">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* 1-Click Evaluation Quick Access */}
      <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-extrabold text-amber-900 uppercase tracking-wider font-mono flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>1-Click Live Quick Evaluation Access</span>
          </span>
          <span className="text-[10px] text-amber-700 font-semibold">No Password Needed</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs">
          {Object.keys(DEMO_ACCOUNTS).map((roleKey) => (
            <button
              key={roleKey}
              type="button"
              onClick={() => {
                switchDemoRole(roleKey);
                if (onClose) onClose();
                setCurrentPage('dashboard');
              }}
              className="px-2.5 py-1.5 bg-white hover:bg-amber-100 text-slate-800 rounded-lg border border-amber-200 font-bold text-[11px] text-left transition-colors cursor-pointer truncate shadow-2xs"
            >
              ⚡ {roleKey}
            </button>
          ))}
        </div>
      </div>

      {/* Form Area */}
      {activeTab === 'login' ? (
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 block">Official Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="praveen@geopolicy.gov.in"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0A3678] font-medium"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-700">Account Password</label>
              <button
                type="button"
                onClick={() => setCurrentPage('forgot-password')}
                className="text-[11px] text-[#0A3678] hover:underline font-bold"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0A3678]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#0A3678] hover:bg-[#002244] text-white font-bold rounded-xl text-xs transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? 'Authenticating...' : 'Sign In Now'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      ) : (
        <form onSubmit={handleRegisterSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Praveen Kumar"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="praveen@research.in"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">Role Clearance</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none font-medium"
              >
                <option value="Researcher">Researcher</option>
                <option value="Government Official">Government Official</option>
                <option value="Policy Analyst">Policy Analyst</option>
                <option value="GIS Specialist">GIS Specialist</option>
                <option value="Citizen">Citizen User</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">Designation</label>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                placeholder="Senior Policy Researcher"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">Organization</label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="IIT Delhi / NIRDPR"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#0A3678] hover:bg-[#002244] text-white font-bold rounded-xl text-xs transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 mt-2"
          >
            {loading ? 'Creating Account...' : 'Complete Registration'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}

    </div>
  );
};
