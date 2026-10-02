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
  AlertTriangle,
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
  
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Real-time Registration Validation Engine
  const validateRegister = () => {
    const errs = {};

    if (!name.trim()) {
      errs.name = 'Full Name is required.';
    } else if (name.trim().length < 3) {
      errs.name = 'Name must be at least 3 characters long.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errs.email = 'Official email address is required.';
    } else if (!emailRegex.test(email.trim())) {
      errs.email = 'Enter a valid government/organization email.';
    }

    if (!password) {
      errs.password = 'Password is required.';
    } else if (password.length < 8) {
      errs.password = 'Password must contain at least 8 characters.';
    }

    if (!role) {
      errs.role = 'Select an official platform role.';
    }

    if (!designation.trim()) {
      errs.designation = 'Designation / title is required.';
    }

    if (!organization.trim()) {
      errs.organization = 'Organization / department is required.';
    }

    return errs;
  };

  const registerErrors = validateRegister();
  const isRegisterValid = Object.keys(registerErrors).length === 0;

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success || res.token || res._id) {
        setSuccessMsg('Authentication successful! Redirecting to Workspace...');
        setTimeout(() => {
          if (onClose) onClose();
          setCurrentPage('dashboard');
        }, 800);
      } else {
        setError(res.message || 'Invalid email or password.');
      }
    } catch (err) {
      setError(err.message || 'Connection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      password: true,
      role: true,
      designation: true,
      organization: true
    });

    if (!isRegisterValid) return;

    setError('');
    setLoading(true);

    try {
      const userData = {
        name: name.trim(),
        email: email.trim(),
        password,
        role,
        designation: designation.trim(),
        organization: organization.trim(),
        state: 'National'
      };
      console.log('[HomeAuthTabModal] Submitting Registration Request Payload:', userData);
      const res = await register(userData);
      if (res && (res.token || res._id || res.success)) {
        setSuccessMsg('Registration complete! Delegate session activated.');
        setTimeout(() => {
          if (onClose) onClose();
          setCurrentPage('dashboard');
        }, 800);
      } else {
        setError(res?.message || 'Registration failed. Please check your inputs.');
      }
    } catch (err) {
      console.error('[HomeAuthTabModal] Registration Error from Backend API:', err.message);
      setError(err.message || 'Registration failed. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  const getRegisterInputClasses = (fieldName) => {
    const isTouched = touched[fieldName];
    const hasError = registerErrors[fieldName];

    if (isTouched && hasError) {
      return 'w-full bg-red-50/40 border border-red-500 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-500';
    }
    if (isTouched && !hasError) {
      return 'w-full bg-emerald-50/30 border border-emerald-500 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-600';
    }
    return 'w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600';
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
            onClick={() => {
              setActiveTab('login');
              setError('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'login' ? 'bg-white text-[#0A3678] shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('register');
              setError('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'register' ? 'bg-white text-[#0A3678] shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Register</span>
          </button>
        </div>
      </div>

      {/* Backend Alert Messages */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div>
            <strong className="block text-red-800 font-bold mb-0.5">Authentication Error:</strong>
            <span>{error}</span>
          </div>
        </div>
      )}

      {successMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Demo Quick Role Switcher */}
      <div className="p-3 bg-blue-50/60 rounded-2xl border border-blue-100 text-xs space-y-2">
        <div className="flex items-center justify-between text-[#0A3678]">
          <span className="font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            1-Click Official Demo Accounts
          </span>
          <span className="text-[10px] bg-blue-100 px-2 py-0.5 rounded font-mono font-bold">5 Mandated Roles</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
          {Object.keys(DEMO_ACCOUNTS).map((rKey) => (
            <button
              key={rKey}
              type="button"
              onClick={() => {
                switchDemoRole(rKey);
                if (onClose) onClose();
                setCurrentPage('dashboard');
              }}
              className="py-1 px-2 rounded-lg bg-white hover:bg-blue-600 hover:text-white border border-blue-200 text-slate-700 font-medium text-[11px] truncate text-left transition-colors cursor-pointer"
            >
              {rKey}
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
        <form onSubmit={handleRegisterSubmit} className="space-y-3" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!touched.name) setTouched((prev) => ({ ...prev, name: true }));
                }}
                onBlur={() => handleBlur('name')}
                placeholder="Praveen Kumar"
                className={getRegisterInputClasses('name')}
              />
              {touched.name && registerErrors.name && (
                <p className="text-[10px] text-red-600 font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-red-500 shrink-0" />
                  <span>{registerErrors.name}</span>
                </p>
              )}
            </div>

            {/* Email Address */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (!touched.email) setTouched((prev) => ({ ...prev, email: true }));
                }}
                onBlur={() => handleBlur('email')}
                placeholder="praveen@research.in"
                className={getRegisterInputClasses('email')}
              />
              {touched.email && registerErrors.email && (
                <p className="text-[10px] text-red-600 font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-red-500 shrink-0" />
                  <span>{registerErrors.email}</span>
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Password */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (!touched.password) setTouched((prev) => ({ ...prev, password: true }));
                }}
                onBlur={() => handleBlur('password')}
                placeholder="At least 8 characters"
                className={getRegisterInputClasses('password')}
              />
              {touched.password && registerErrors.password ? (
                <p className="text-[10px] text-red-600 font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-red-500 shrink-0" />
                  <span>{registerErrors.password}</span>
                </p>
              ) : (
                <p className="text-[10px] text-slate-400">At least 8 characters required</p>
              )}
            </div>

            {/* Role Clearance */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                Role Clearance <span className="text-red-500">*</span>
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                onBlur={() => handleBlur('role')}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none font-medium"
              >
                <option value="Researcher">Researcher</option>
                <option value="Government Official">Government Official</option>
                <option value="Policymaker">Policymaker</option>
                <option value="Citizen">Citizen User</option>
              </select>
              {touched.role && registerErrors.role && (
                <p className="text-[10px] text-red-600 font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-red-500 shrink-0" />
                  <span>{registerErrors.role}</span>
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Designation */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                Designation <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={designation}
                onChange={(e) => {
                  setDesignation(e.target.value);
                  if (!touched.designation) setTouched((prev) => ({ ...prev, designation: true }));
                }}
                onBlur={() => handleBlur('designation')}
                placeholder="Senior Policy Researcher"
                className={getRegisterInputClasses('designation')}
              />
              {touched.designation && registerErrors.designation && (
                <p className="text-[10px] text-red-600 font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-red-500 shrink-0" />
                  <span>{registerErrors.designation}</span>
                </p>
              )}
            </div>

            {/* Organization */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 block">
                Organization <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={organization}
                onChange={(e) => {
                  setOrganization(e.target.value);
                  if (!touched.organization) setTouched((prev) => ({ ...prev, organization: true }));
                }}
                onBlur={() => handleBlur('organization')}
                placeholder="IIT Delhi / NIRDPR"
                className={getRegisterInputClasses('organization')}
              />
              {touched.organization && registerErrors.organization && (
                <p className="text-[10px] text-red-600 font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-red-500 shrink-0" />
                  <span>{registerErrors.organization}</span>
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={!isRegisterValid || loading}
            className={`w-full py-2.5 font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 mt-2 ${
              !isRegisterValid || loading
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed opacity-80'
                : 'bg-[#0A3678] hover:bg-[#002244] text-white cursor-pointer'
            }`}
          >
            {loading ? 'Creating Account...' : 'Complete Registration'}
            <ArrowRight className="w-4 h-4" />
          </button>

          {!isRegisterValid && (
            <p className="text-[10px] text-slate-400 text-center font-mono">
              Fill all required fields with valid inputs to enable registration.
            </p>
          )}
        </form>
      )}

    </div>
  );
};
