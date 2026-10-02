import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { 
  UserPlus, 
  Lock, 
  Mail, 
  User, 
  Building, 
  MapPin, 
  ShieldCheck, 
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  AlertTriangle
} from 'lucide-react';

const GOI_ROLES = [
  {
    id: 'Researcher',
    title: 'Researcher',
    desc: 'Publish papers, upload cadastral case studies, collaborate with GIS labs, and utilize AI Research Copilot.'
  },
  {
    id: 'Policymaker',
    title: 'Policymaker',
    desc: 'Simulate land policy reforms, review academic recommendations, and evaluate socio-economic impacts.'
  },
  {
    id: 'Government Official',
    title: 'Government Official',
    desc: 'Review and approve publications, verify spatial datasets, and track state administrative metrics.'
  },
  {
    id: 'Citizen',
    title: 'Citizen / Landowner',
    desc: 'Explore public land research, view state GIS vectors, track ULPIN status, and submit governance feedback.'
  }
];

const STATES_LIST = [
  'National Jurisdiction', 'Maharashtra', 'Karnataka', 'Gujarat', 'Tamil Nadu', 
  'Delhi', 'Telangana', 'Uttar Pradesh', 'Rajasthan', 'Madhya Pradesh', 
  'Kerala', 'Andhra Pradesh', 'West Bengal', 'Bihar', 'Odisha', 'Punjab', 
  'Haryana', 'Assam', 'Himachal Pradesh', 'Uttarakhand', 'Jharkhand'
];

export const RegisterPage = ({ setCurrentPage }) => {
  const { register } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Researcher',
    designation: '',
    organization: '',
    state: 'Maharashtra',
    bio: ''
  });

  const [touched, setTouched] = useState({});
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [backendError, setBackendError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Real-time Validation Engine
  const validate = () => {
    const errs = {};

    // 1. Full Name (min 3 characters)
    if (!formData.name.trim()) {
      errs.name = 'Full Name is required.';
    } else if (formData.name.trim().length < 3) {
      errs.name = 'Name must be at least 3 characters long.';
    }

    // 2. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Official email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Enter a valid government/organization email.';
    }

    // 3. Password (min 8 characters)
    if (!formData.password) {
      errs.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      errs.password = 'Password must contain at least 8 characters.';
    }

    // 4. Role
    if (!formData.role) {
      errs.role = 'Select an official platform role.';
    }

    // 5. Designation
    if (!formData.designation.trim()) {
      errs.designation = 'Designation / title is required.';
    }

    // 6. Organization
    if (!formData.organization.trim()) {
      errs.organization = 'Organization / department is required.';
    }

    // 7. Declaration
    if (!agreed) {
      errs.agreed = 'Please accept the official Government of India portal declaration.';
    }

    return errs;
  };

  const errors = validate();
  const isFormValid = Object.keys(errors).length === 0;

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (!touched[e.target.name]) {
      setTouched((prev) => ({ ...prev, [e.target.name]: true }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      password: true,
      role: true,
      designation: true,
      organization: true,
      agreed: true
    });

    if (!isFormValid) {
      return;
    }

    setSubmitting(true);
    setBackendError('');
    setSuccessMsg('');

    try {
      console.log('[RegisterPage] Submitting Registration Payload:', formData);
      await register(formData);
      setSubmitting(false);
      setSuccessMsg('Registration complete! Digital credentials issued successfully.');
      setTimeout(() => {
        setCurrentPage('dashboard');
      }, 1000);
    } catch (err) {
      console.error('[RegisterPage] Registration Error from Backend:', err.message);
      setSubmitting(false);
      setBackendError(err.message || 'Registration failed. Please check your inputs.');
    }
  };

  // Helper function to resolve input border classes based on real-time validation
  const getInputClasses = (fieldName) => {
    const isFieldTouched = touched[fieldName];
    const hasFieldError = errors[fieldName];

    if (isFieldTouched && hasFieldError) {
      return 'w-full bg-red-50/40 border border-red-500 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-500';
    }
    if (isFieldTouched && !hasFieldError) {
      return 'w-full bg-emerald-50/30 border border-emerald-500 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-600';
    }
    return 'w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white';
  };

  return (
    <div className="min-h-[85vh] bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
        
        {/* Tricolor Ribbon */}
        <div className="tricolor-stripe"></div>

        {/* Top Header */}
        <div className="bg-[#0A3678] text-white p-6 sm:p-8 flex items-center justify-between border-b border-blue-900">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-400 text-slate-900">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Official Government Portal Enrolment</span>
            </div>
            <h2 className="text-xl font-extrabold tracking-tight">Register Delegate Credentials</h2>
            <p className="text-xs text-blue-100">
              National Digital Platform for Land Governance &bull; Ministry of Rural Development
            </p>
          </div>

          <button
            type="button"
            onClick={() => setCurrentPage('login')}
            className="text-xs text-blue-200 hover:text-white flex items-center gap-1 border border-blue-400/40 rounded-lg px-3 py-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Already Registered? Sign In</span>
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">

          {/* Backend Error Alert Banner */}
          {backendError && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-red-800 font-bold mb-0.5">Registration Failed:</strong>
                <span>{backendError}</span>
              </div>
            </div>
          )}

          {/* Success Banner */}
          {successMsg && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium flex items-center gap-2.5">
              <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
              <span className="font-bold">{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            
            {/* Step 1: Role Selection Cards */}
            <div>
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 font-mono">
                1. Select Platform Role <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {GOI_ROLES.map((r) => {
                  const isSelected = formData.role === r.id;
                  return (
                    <div
                      key={r.id}
                      onClick={() => {
                        setFormData({ ...formData, role: r.id });
                        handleBlur('role');
                      }}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#0A3678] bg-blue-50/70 shadow-sm ring-1 ring-[#0A3678]'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-bold ${isSelected ? 'text-[#0A3678]' : 'text-slate-800'}`}>
                          {r.title}
                        </span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#0A3678]" />}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">{r.desc}</p>
                    </div>
                  );
                })}
              </div>
              {touched.role && errors.role && (
                <p className="text-[11px] text-red-600 font-semibold mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-red-500 shrink-0" />
                  <span>{errors.role}</span>
                </p>
              )}
            </div>

            {/* Step 2: Personal & Official Details */}
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                2. Delegate Identification &amp; Jurisdiction
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Legal Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={() => handleBlur('name')}
                      placeholder="e.g. Dr. Ramesh Sundaram"
                      className={getInputClasses('name')}
                    />
                  </div>
                  {touched.name && errors.name && (
                    <p className="text-[11px] text-red-600 font-semibold mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 text-red-500 shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Official Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur('email')}
                      placeholder="e.g. ramesh@iitd.ac.in"
                      className={getInputClasses('email')}
                    />
                  </div>
                  {touched.email && errors.email && (
                    <p className="text-[11px] text-red-600 font-semibold mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 text-red-500 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Designation */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Designation / Title <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      name="designation"
                      required
                      value={formData.designation}
                      onChange={handleChange}
                      onBlur={() => handleBlur('designation')}
                      placeholder="e.g. Associate Professor / Joint Secretary"
                      className={getInputClasses('designation')}
                    />
                  </div>
                  {touched.designation && errors.designation && (
                    <p className="text-[11px] text-red-600 font-semibold mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 text-red-500 shrink-0" />
                      <span>{errors.designation}</span>
                    </p>
                  )}
                </div>

                {/* Organization */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Organization / Department <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      name="organization"
                      required
                      value={formData.organization}
                      onChange={handleChange}
                      onBlur={() => handleBlur('organization')}
                      placeholder="e.g. IIT Delhi / State Revenue Board"
                      className={getInputClasses('organization')}
                    />
                  </div>
                  {touched.organization && errors.organization && (
                    <p className="text-[11px] text-red-600 font-semibold mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 text-red-500 shrink-0" />
                      <span>{errors.organization}</span>
                    </p>
                  )}
                </div>

                {/* State Jurisdiction */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">State Jurisdiction</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                    >
                      {STATES_LIST.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Create Secure Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={() => handleBlur('password')}
                      placeholder="At least 8 characters"
                      className={getInputClasses('password')}
                    />
                  </div>
                  {touched.password && errors.password ? (
                    <p className="text-[11px] text-red-600 font-semibold mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 text-red-500 shrink-0" />
                      <span>{errors.password}</span>
                    </p>
                  ) : (
                    <p className="text-[10px] text-slate-400 mt-1">
                      Password must contain at least 8 characters
                    </p>
                  )}
                </div>

              </div>
            </div>

            {/* Official Declaration Checkbox */}
            <div className={`p-3.5 border rounded-xl space-y-2 transition-all ${
              touched.agreed && errors.agreed ? 'bg-red-50/50 border-red-400' : 'bg-slate-50 border-slate-200'
            }`}>
              <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => {
                    setAgreed(e.target.checked);
                    setTouched((prev) => ({ ...prev, agreed: true }));
                  }}
                  className="mt-0.5 rounded border-slate-300 text-[#0A3678]"
                />
                <span className="leading-relaxed">
                  I hereby declare that the details provided are accurate and that all submissions will comply with the 
                  <strong> National Data Sharing and Accessibility Policy (NDSAP)</strong> and the 
                  <strong> Digital Personal Data Protection (DPDP) Act, 2023</strong>.
                </span>
              </label>
              {touched.agreed && errors.agreed && (
                <p className="text-[11px] text-red-600 font-semibold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-red-500 shrink-0" />
                  <span>{errors.agreed}</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid || submitting}
              className={`w-full py-3 rounded-lg font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all ${
                !isFormValid || submitting
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed opacity-80'
                  : 'bg-[#0A3678] hover:bg-[#002244] text-white cursor-pointer'
              }`}
            >
              {submitting ? (
                <span>Generating Digital Credentials...</span>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Submit Application &amp; Create Account</span>
                </>
              )}
            </button>

            {!isFormValid && (
              <p className="text-[11px] text-slate-400 text-center font-mono">
                Complete all required fields with valid inputs to enable registration.
              </p>
            )}

          </form>

        </div>

        {/* Security badge footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-[11px] text-slate-500">
          <span>Official National Land Governance Platform</span>
          <span className="font-semibold text-slate-600">NIC CERT-In Secured</span>
        </div>

      </div>
    </div>
  );
};
