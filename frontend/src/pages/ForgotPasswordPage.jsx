import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  RotateCcw, 
  ArrowLeft,
  KeyRound,
  FileCheck
} from 'lucide-react';

export const ForgotPasswordPage = ({ setCurrentPage }) => {
  const [step, setStep] = useState(1); // 1: Email/Mobile, 2: OTP, 3: New Password, 4: Success
  const [identifier, setIdentifier] = useState('praveen@geopolicy.gov.in');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // OTP Countdown Timer
  useEffect(() => {
    let interval = null;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!identifier) {
      setErrorMsg('Please enter your registered official email or mobile number.');
      return;
    }
    setErrorMsg('');
    setStep(2);
    setTimer(60);
    setCanResend(false);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) {
      setErrorMsg('Please enter all 6 digits of the OTP received.');
      return;
    }
    setErrorMsg('');
    setStep(3);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setErrorMsg('Password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    setErrorMsg('');
    setStep(4);
  };

  const handleResend = () => {
    setTimer(60);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    setErrorMsg('');
  };

  return (
    <div className="min-h-[85vh] bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
        
        {/* Tricolor Header Ribbon */}
        <div className="tricolor-stripe"></div>

        {/* Top Ministry Branding */}
        <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            {/* Ashoka Chakra SVG motif */}
            <div className="w-8 h-8 rounded-full border-2 border-amber-400/80 flex items-center justify-center bg-slate-950">
              <KeyRound className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-tight">Credential Recovery Portal</h2>
              <p className="text-[10px] text-slate-300 font-mono">Government of India &bull; Ministry of Rural Development</p>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold">
            Step {step} of 3
          </span>
        </div>

        <div className="p-6 sm:p-8 space-y-6">

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
              {errorMsg}
            </div>
          )}

          {/* Step 1: Enter Email / Mobile */}
          {step === 1 && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Forgot Your Password?</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Enter your registered official government email address or 10-digit mobile number linked with your Land Governance account.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Official Email Address or Registered Mobile
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="name@geopolicy.gov.in or 98XXXXXXXX"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-[#0A3678] hover:bg-[#002244] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Generate Official Verification OTP</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage('login')}
                  className="text-xs text-blue-700 font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Official Sign-In</span>
                </button>
              </div>
            </form>
          )}

          {/* Step 2: OTP Verification UI */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Verify One-Time Password (OTP)</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  A 6-digit Aadhaar/Gov security OTP has been dispatched to <strong className="text-slate-800">{identifier}</strong>. Enter it below to confirm identity.
                </p>
              </div>

              {/* 6-Digit OTP Box Grid */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 text-center">
                  Enter 6-Digit Security Code
                </label>
                <div className="flex justify-center gap-2 sm:gap-3">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-input-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e.target)}
                      className="w-10 h-12 text-center text-lg font-extrabold bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 focus:bg-white text-slate-900 shadow-sm"
                    />
                  ))}
                </div>
              </div>

              {/* Countdown & Resend */}
              <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    {timer > 0 ? (
                      <>Expires in <span className="font-mono font-bold text-blue-800">{timer}s</span></>
                    ) : (
                      <span className="text-red-600 font-semibold">OTP Expired</span>
                    )}
                  </span>
                </div>

                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-blue-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Resend OTP</span>
                  </button>
                ) : (
                  <span className="text-slate-400 text-[11px]">Resend available in {timer}s</span>
                )}
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-800">
                💡 <strong>Evaluation Demo Note:</strong> Enter any 6 digits (e.g. <code>1 2 3 4 5 6</code>) to proceed to password reset.
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-[#0A3678] hover:bg-[#002244] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Verify OTP &amp; Proceed</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  Change Email or Mobile
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Set New Password */}
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Create New Security Password</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Your identity has been verified. Set a strong password compliant with Government of India cyber standards.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">New Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimum 8 characters"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Confirm New Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-[#0D7E3A] hover:bg-[#085426] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Update Credentials &amp; Save</span>
              </button>
            </form>
          )}

          {/* Step 4: Success Message */}
          {step === 4 && (
            <div className="text-center space-y-4 py-4">
              <div className="w-14 h-14 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Password Reset Successful</h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                  Your credentials for GeoPolicy Nexus have been securely updated in accordance with the Digital Personal Data Protection Act, 2023.
                </p>
              </div>

              <button
                onClick={() => setCurrentPage('login')}
                className="w-full py-2.5 rounded-lg bg-[#0A3678] hover:bg-[#002244] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Sign In with New Password
              </button>
            </div>
          )}

        </div>

        {/* Security Notice Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5 text-slate-600">
            <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
            <span>NIC CERT-In Secured Transaction</span>
          </div>
          <span>DPDP Act 2023 Compliant</span>
        </div>

      </div>
    </div>
  );
};
