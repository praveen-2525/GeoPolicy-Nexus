import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { RoleBadge } from '../components/RoleBadge';
import { 
  LogIn, 
  Lock, 
  Mail, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  ArrowRight,
  UserCheck
} from 'lucide-react';

export const LoginPage = ({ setCurrentPage }) => {
  const { login, switchDemoRole, DEMO_ACCOUNTS } = useContext(AuthContext);
  const [email, setEmail] = useState('admin@geopolicy.gov.in');
  const [password, setPassword] = useState('password123');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');
    try {
      await login(email, password);
      setSubmitting(false);
      setCurrentPage('dashboard');
    } catch (err) {
      setSubmitting(false);
      setErrorMsg(err.message || 'Login failed');
    }
  };

  const handleQuickRoleSelect = (roleName) => {
    switchDemoRole(roleName);
    setCurrentPage('dashboard');
  };

  return (
    <div className="min-h-[85vh] bg-slate-950 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Left Branding Side */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/40 p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 via-emerald-600 to-amber-500 flex items-center justify-center text-white shadow-xl">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-white">GeoPolicy Nexus</h2>
              <p className="text-xs text-slate-400 font-mono uppercase tracking-wider mt-1">National Land Governance Portal</p>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed pt-2">
              Secure single sign-on access to evidence-based policy repositories, cadastral vector databases, and peer-reviewed research.
            </p>
          </div>

          {/* Quick Demo Switcher Panel */}
          <div className="mt-8 pt-6 border-t border-slate-800 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>1-Click Live Role Access</span>
            </div>
            <p className="text-[11px] text-slate-400">Instantly launch session as any of the 5 system roles:</p>

            <div className="space-y-1.5">
              {Object.keys(DEMO_ACCOUNTS).map((roleName) => (
                <button
                  key={roleName}
                  onClick={() => handleQuickRoleSelect(roleName)}
                  className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 transition-all text-xs text-left"
                >
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-semibold text-slate-200">{DEMO_ACCOUNTS[roleName].name}</span>
                  </div>
                  <RoleBadge role={roleName} size="small" showIcon={false} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Form Side */}
        <div className="p-8 flex flex-col justify-center space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white">Sign In to Government Workspace</h3>
            <p className="text-xs text-slate-400 mt-1">Enter your registered credentials or select a role on the left</p>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-950/80 border border-rose-800 rounded-xl text-xs text-rose-300">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs text-slate-200">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Official Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@geopolicy.gov.in"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none focus:border-emerald-500 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-white focus:outline-none focus:border-emerald-500 text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2 transition-all mt-2"
            >
              {submitting ? (
                <span>Authenticating Credentials...</span>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Enter Portal Workspace</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
            <span>Don't have an official account? </span>
            <button
              onClick={() => setCurrentPage('register')}
              className="text-emerald-400 font-bold hover:underline"
            >
              Register New Delegate Account
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
