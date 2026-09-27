import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { RoleBadge } from '../components/RoleBadge';
import { 
  LogIn, 
  Lock, 
  Mail, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  UserCheck,
  Building,
  KeyRound,
  FileCheck2,
  HelpCircle
} from 'lucide-react';

export const LoginPage = ({ setCurrentPage }) => {
  const { login, generateOtp, verifyOtp, switchDemoRole, DEMO_ACCOUNTS } = useContext(AuthContext);
  const [email, setEmail] = useState('praveen@geopolicy.gov.in');
  const [password, setPassword] = useState('password123');
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');
    try {
      if (!otpStep) {
        // Step 1: Verify credentials and send OTP
        await login(email, password); // This will authenticate and if successful we can proceed to OTP
        await generateOtp(email);
        setOtpStep(true);
        setSuccessMsg('Authentication successful. Please verify the OTP sent to your email or SMS.');
        setSubmitting(false);
      } else {
        // Step 2: Verify OTP
        await verifyOtp(email, otpCode);
        setSubmitting(false);
        setCurrentPage('dashboard');
      }
    } catch (err) {
      setSubmitting(false);
      setErrorMsg(err.message || 'Authentication failed. Please verify credentials.');
    }
  };

  const handleQuickRoleSelect = (roleKey) => {
    switchDemoRole(roleKey);
    setCurrentPage('dashboard');
  };

  return (
    <div className="min-h-[85vh] bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
        
        {/* Left Side: National Portal Information & 1-Click Role Access (5 Cols) */}
        <div className="md:col-span-5 bg-gradient-to-b from-[#0A3678] to-[#002244] text-white p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              {/* Ashoka Chakra SVG motif */}
              <div className="w-12 h-12 rounded-full border-2 border-amber-400 flex items-center justify-center bg-slate-900 shadow-md">
                <svg viewBox="0 0 100 100" className="w-8 h-8 text-amber-400 chakra-spin-subtle" fill="currentColor">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4" />
                  <circle cx="50" cy="50" r="8" fill="currentColor" />
                  {[...Array(24)].map((_, i) => (
                    <line
                      key={i}
                      x1="50"
                      y1="50"
                      x2={50 + 42 * Math.cos((i * 15 * Math.PI) / 180)}
                      y2={50 + 42 * Math.sin((i * 15 * Math.PI) / 180)}
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  ))}
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-extrabold tracking-tight">GeoPolicy Nexus</h2>
                <p className="text-[11px] text-amber-300 font-mono">Government of India Portal</p>
              </div>
            </div>

            <div className="pt-2 border-t border-blue-800/80 space-y-1">
              <p className="text-xs font-semibold text-slate-200">
                Department of Land Resources &bull; MoRD
              </p>
              <p className="text-[11px] text-slate-300 leading-relaxed font-light">
                Secure Single Sign-On (SSO) gateway for researchers, policy analysts, state land administrators, and Indian citizens.
              </p>
            </div>
          </div>

          {/* 1-Click Role Access Quick Switcher */}
          <div className="mt-6 pt-4 border-t border-blue-800/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider font-mono flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Live Evaluation Role Access
              </span>
            </div>
            <p className="text-[11px] text-slate-300">
              Instantly authenticate as any of the 5 Government of India user roles:
            </p>

            <div className="space-y-1.5">
              {Object.keys(DEMO_ACCOUNTS).map((roleKey) => {
                const acc = DEMO_ACCOUNTS[roleKey];
                return (
                  <button
                    key={roleKey}
                    type="button"
                    onClick={() => handleQuickRoleSelect(roleKey)}
                    className="w-full flex items-center justify-between p-2 rounded-lg bg-blue-950/60 hover:bg-blue-900/80 border border-blue-700/60 transition-all text-xs text-left cursor-pointer group"
                  >
                    <div className="flex items-center gap-2 min-w-0 pr-1">
                      <UserCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <div className="truncate">
                        <span className="font-semibold text-white block text-xs">{acc.name}</span>
                        <span className="text-[10px] text-slate-300 truncate block">{acc.designation.split(',')[0]}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-800 text-blue-200 border border-blue-600 shrink-0">
                      {roleKey}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Sign-In Form (7 Cols) */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-center space-y-6">
          
          <div className="space-y-1 border-b border-slate-100 pb-4">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>National Single Sign-On (Parichay Standard)</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Sign In to Official Workspace</h3>
            <p className="text-xs text-slate-500">
              Enter your official government email or select a role on the left to enter.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-xs text-green-800 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              {successMsg}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {!otpStep ? (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Official Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="praveen@geopolicy.gov.in"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700">Password</label>
                    <button
                      type="button"
                      onClick={() => setCurrentPage('forgot-password')}
                      className="text-[11px] text-blue-700 font-semibold hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600" />
                    <span>Remember this terminal session</span>
                  </label>
                  <span className="text-[11px] text-slate-400">NIC Secured SSO</span>
                </div>
              </>
            ) : (
              <div className="space-y-4 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <div>
                  <label className="block text-xs font-bold text-[#0A3678] mb-1">
                    Enter One-Time Password (OTP)
                  </label>
                  <p className="text-[10px] text-slate-500 mb-3">For this SIH demo, please use the mock OTP: <b>123456</b></p>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-blue-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="123456"
                      className="w-full bg-white border border-blue-300 rounded-lg pl-9 pr-3 py-2.5 text-sm font-mono tracking-widest font-bold text-blue-900 focus:outline-none focus:border-blue-600 shadow-inner"
                      maxLength={6}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setOtpStep(false);
                    setSuccessMsg('');
                    setErrorMsg('');
                  }}
                  className="text-[11px] text-slate-500 hover:text-[#0A3678] hover:underline"
                >
                  &larr; Back to Email/Password
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 rounded-lg bg-[#0A3678] hover:bg-[#002244] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {submitting ? (
                <span>{otpStep ? 'Verifying OTP...' : 'Verifying Official Session...'}</span>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>{otpStep ? 'Verify OTP & Enter Portal' : 'Generate Secure OTP'}</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <span>New delegate or researcher?</span>
            <button
              type="button"
              onClick={() => setCurrentPage('register')}
              className="text-[#0A3678] font-bold hover:underline"
            >
              Register New Government Account
            </button>
          </div>

          {/* Compliance notice */}
          <div className="text-[10px] text-slate-400 text-center leading-tight">
            Protected under the Digital Personal Data Protection (DPDP) Act, 2023. Unauthorized access is prohibited under the IT Act, 2000.
          </div>

        </div>

      </div>
    </div>
  );
};
