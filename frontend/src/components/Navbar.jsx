import React, { useContext, useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/AuthContext';
import RoleAvatar from './RoleAvatar';
import { SUPPORTED_LANGUAGES } from '../i18n';
import { 
  Globe, 
  BookOpen, 
  FileText, 
  Database, 
  LayoutDashboard, 
  ShieldAlert, 
  User as UserIcon, 
  LogOut, 
  LogIn, 
  UserPlus, 
  ChevronDown, 
  ChevronRight,
  Menu, 
  X,
  Sparkles,
  MapPin,
  Bot,
  Cpu,
  Languages,
  Users,
  BarChart3,
  ShieldCheck,
  Code,
  Shield,
  Eye,
  Type,
  MonitorPlay,
  Network,
  Rocket
} from 'lucide-react';

export const Navbar = ({ currentPage, setCurrentPage }) => {
  const { user, logout, switchDemoRole, DEMO_ACCOUNTS, textSize, setTextSize, highContrast, setHighContrast } = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const sidebarRef = useRef(null);

  // Close sidebar on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSidebarOpen(false);
        setUserDropdownOpen(false);
        setRoleSwitcherOpen(false);
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  // Primary navigation items grouped by category
  const navGroups = [
    {
      title: 'Main',
      items: [
        { id: 'landing', label: 'Home', icon: Globe },
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      ]
    },
    {
      title: 'Intelligence & Research',
      items: [
        { id: 'gis', label: 'GIS Intelligence', icon: MapPin },
        { id: 'research', label: 'Research Repository', icon: BookOpen },
        { id: 'policies', label: 'Policy Repository', icon: FileText },
        { id: 'datasets', label: 'Dataset Repository', icon: Database },
        { id: 'knowledge-graph', label: 'Knowledge Graph', icon: Network },
      ]
    },
    {
      title: 'Tools & Innovation',
      items: [
        { id: 'simulator', label: 'Policy Impact Lab', icon: Cpu },
        { id: 'digital-twin', label: 'Digital Twin Simulation', icon: MonitorPlay },
        { id: 'ai', label: 'AI Research Copilot', icon: Bot },
        { id: 'collaboration', label: 'Collaboration Hub', icon: Users },
        { id: 'innovation', label: 'Innovation Ecosystem', icon: Rocket },
      ]
    },
    {
      title: 'Analytics & Security',
      items: [
        { id: 'analytics', label: 'Analytics Dashboard', icon: BarChart3 },
        { id: 'blockchain', label: 'Blockchain Trust', icon: ShieldCheck },
        { id: 'api-portal', label: 'Open API Portal', icon: Code },
        { id: 'cybersecurity', label: 'Cybersecurity Centre', icon: Shield },
      ]
    },
  ];

  // Add admin item if authorized
  if (user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Platform Administrator') {
    navGroups.push({
      title: 'Administration',
      items: [
        { id: 'admin', label: 'Admin Console', icon: ShieldAlert },
      ]
    });
  }

  const handleNavClick = (id) => {
    setCurrentPage(id);
    setSidebarOpen(false);
    setUserDropdownOpen(false);
    setRoleSwitcherOpen(false);
    setLangDropdownOpen(false);
  };

  // Google Translate language code mapping
  const GOOGLE_TRANSLATE_CODES = {
    'en': 'en', 'hi': 'hi', 'ta': 'ta', 'te': 'te',
    'kn': 'kn', 'ml': 'ml', 'mr': 'mr', 'gu': 'gu',
    'bn': 'bn', 'pa': 'pa', 'or': 'or', 'as': 'as'
  };

  const triggerGoogleTranslate = (langCode) => {
    const gtCode = GOOGLE_TRANSLATE_CODES[langCode] || langCode;
    
    // Method 1: Set cookie and reload (most reliable)
    if (langCode === 'en') {
      // Reset to English - remove the Google Translate cookie
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.' + window.location.hostname;
      // Try to restore via the select element
      const selectEl = document.querySelector('.goog-te-combo');
      if (selectEl) {
        selectEl.value = 'en';
        selectEl.dispatchEvent(new Event('change'));
      } else {
        window.location.reload();
      }
      return;
    }

    // Method 2: Use the Google Translate select dropdown programmatically
    const selectEl = document.querySelector('.goog-te-combo');
    if (selectEl) {
      selectEl.value = gtCode;
      selectEl.dispatchEvent(new Event('change'));
    } else {
      // Method 3: Fallback - set cookie and reload
      document.cookie = `googtrans=/en/${gtCode}; path=/;`;
      document.cookie = `googtrans=/en/${gtCode}; path=/; domain=.${window.location.hostname};`;
      window.location.reload();
    }
  };

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    triggerGoogleTranslate(langCode);
    setLangDropdownOpen(false);
  };

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === i18n.language) || SUPPORTED_LANGUAGES[0];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white text-slate-900 border-b border-slate-200 shadow-sm font-sans">
        
        {/* 1. National Flag Tricolor Ribbon */}
        <div className="tricolor-stripe"></div>

        {/* 2. Top Utility & Accessibility Bar (Official GoI Style) */}
        <div className="bg-slate-900 text-white text-[11px] py-1 px-4 border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
            
            {/* Ministry & Government Identification with Emblem */}
            <div className="flex items-center gap-2 font-medium">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                alt="Satyameva Jayate"
                className="w-5 h-7 object-contain brightness-200 invert"
              />
              <span className="text-amber-400 font-bold">भारत सरकार</span>
              <span className="text-slate-500">|</span>
              <span>Government of India</span>
              <span className="hidden md:inline text-slate-500">&bull;</span>
              <span className="hidden md:inline text-slate-300">Ministry of Rural Development &bull; Department of Land Resources</span>
            </div>

            {/* Right Toolbar: Accessibility & Language & 1-Click Role Switcher */}
            <div className="flex items-center gap-3">
              
              {/* Font Size Accessibility Controls (A-, A, A+) */}
              <div className="flex items-center gap-1 border-r border-slate-700 pr-2">
                <button 
                  onClick={() => setTextSize('small')} 
                  title="A- Small Text Size (12px)"
                  aria-label="Decrease font size (A-)"
                  className={`px-2 py-0.5 rounded text-[11px] font-extrabold transition-all cursor-pointer ${
                    textSize === 'small' ? 'bg-amber-400 text-slate-950 shadow-xs' : 'hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  A-
                </button>
                <button 
                  onClick={() => setTextSize('normal')} 
                  title="A Standard Text Size (14px)"
                  aria-label="Standard font size (A)"
                  className={`px-2 py-0.5 rounded text-[11px] font-extrabold transition-all cursor-pointer ${
                    textSize === 'normal' ? 'bg-amber-400 text-slate-950 shadow-xs' : 'hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  A
                </button>
                <button 
                  onClick={() => setTextSize('large')} 
                  title="A+ Large Text Size (16.5px)"
                  aria-label="Increase font size (A+)"
                  className={`px-2 py-0.5 rounded text-[11px] font-extrabold transition-all cursor-pointer ${
                    textSize === 'large' ? 'bg-amber-400 text-slate-950 shadow-xs' : 'hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  A+
                </button>
              </div>

              {/* Contrast / Standard Appearance Toggle Button */}
              <button
                onClick={() => setHighContrast(!highContrast)}
                className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-extrabold border transition-all cursor-pointer border-slate-700 ${
                  highContrast 
                    ? 'bg-yellow-400 text-slate-950 font-black border-yellow-300 shadow-xs' 
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
                title={highContrast ? "Switch to Standard View Appearance" : "Switch to High Contrast View Appearance"}
                aria-label="Toggle High Contrast or Standard View"
              >
                <Eye className={`w-3.5 h-3.5 ${highContrast ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>{highContrast ? 'Standard' : 'Contrast'}</span>
              </button>

              {/* 12-Language Selector Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setLangDropdownOpen(!langDropdownOpen);
                    setRoleSwitcherOpen(false);
                  }}
                  className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded border border-slate-700 text-slate-200 text-xs transition-colors cursor-pointer"
                >
                  <Languages className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-medium">{currentLangObj.nativeName}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {langDropdownOpen && (
                  <div className="absolute right-0 top-7 w-48 bg-white border border-slate-200 rounded-lg shadow-xl z-50 py-1 text-slate-800 max-h-64 overflow-y-auto custom-scrollbar">
                    <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                      Official Languages (12)
                    </div>
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left transition-colors cursor-pointer ${
                          i18n.language === lang.code 
                            ? 'bg-blue-50 text-[#0A3678] font-bold' 
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span>{lang.nativeName}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 1-Click Role Switcher for Evaluation */}
              <div className="relative hidden md:block">
                <button 
                  onClick={() => {
                    setRoleSwitcherOpen(!roleSwitcherOpen);
                    setLangDropdownOpen(false);
                  }}
                  className="flex items-center gap-1.5 bg-blue-900/80 hover:bg-blue-800 px-2.5 py-0.5 rounded border border-blue-700 text-white text-xs font-medium cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Role: <strong>{user ? user.role : 'Guest'}</strong></span>
                  <ChevronDown className="w-3 h-3 text-blue-200" />
                </button>

                {roleSwitcherOpen && (
                  <div className="absolute right-0 top-7 w-72 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 p-2 text-slate-800">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-2 border-b border-slate-100 pb-1">
                      1-Click Live Role Switcher (5 Roles)
                    </div>
                    <div className="space-y-1">
                      {Object.keys(DEMO_ACCOUNTS).map((roleKey) => {
                        const acc = DEMO_ACCOUNTS[roleKey];
                        const isSelected = user?.role === roleKey;
                        return (
                          <button
                            key={roleKey}
                            onClick={() => {
                              switchDemoRole(roleKey);
                              setRoleSwitcherOpen(false);
                            }}
                            className={`w-full flex items-center justify-between p-2 rounded-lg text-xs text-left transition-colors cursor-pointer ${
                              isSelected 
                                ? 'bg-blue-50 text-[#0A3678] border border-blue-200 font-bold' 
                                : 'hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <div>
                              <div className="font-semibold">{acc.name}</div>
                              <div className="text-[10px] text-slate-500 font-normal">{acc.designation.split(',')[0]}</div>
                            </div>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                              roleKey === 'Super Admin' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-700'
                            }`}>
                              {roleKey}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* 3. Main Government Header (Title & National Emblems) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            
            {/* Left: Hamburger Menu Button + Logo & National Title */}
            <div className="flex items-center gap-3">

              {/* ☰ Hamburger Menu Icon — Government Portal Style */}
              <button
                id="hamburger-menu-btn"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="gov-hamburger-btn flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0A3678] hover:bg-[#002244] text-white transition-all cursor-pointer shadow-sm active:scale-95"
                aria-label="Open Navigation Menu"
                title="Navigation Menu"
              >
                <div className="flex flex-col gap-[4px] w-5">
                  <span className={`block h-[2.5px] bg-white rounded-full transition-all duration-300 ${sidebarOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`}></span>
                  <span className={`block h-[2.5px] bg-white rounded-full transition-all duration-300 ${sidebarOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block h-[2.5px] bg-white rounded-full transition-all duration-300 ${sidebarOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`}></span>
                </div>
                <span className="text-xs font-bold tracking-wide hidden sm:inline">MENU</span>
              </button>

              {/* Logo & National Title */}
              <div 
                className="flex items-center gap-3 cursor-pointer group" 
                onClick={() => handleNavClick('landing')}
              >
                {/* National Emblem of India */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* State Emblem of India */}
                  <div className="w-10 h-14 bg-transparent flex items-center justify-center p-0.5 shrink-0">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
                      alt="Satyameva Jayate - State Emblem of India"
                      className="h-full object-contain filter drop-shadow-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    {/* Attached Custom Logo near GeoPolicy Nexus */}
                    <img 
                      src="/logo.jpg" 
                      alt="GeoPolicy Nexus Logo"
                      className="h-9 w-9 rounded-full object-cover border-2 border-[#0A3678] shadow-sm shrink-0"
                    />
                    <span className="font-black text-xl sm:text-2xl lg:text-3xl tracking-tight text-[#0A3678] leading-none" style={{fontFamily: 'Arial, Helvetica, sans-serif', letterSpacing: '-0.02em'}}>
                      GeoPolicy Nexus
                    </span>
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                      राष्ट्रीय डिजिटल प्लेटफ़ॉर्म
                    </span>
                  </div>
                  <span className="text-xs text-slate-700 font-semibold leading-tight mt-0.5">
                    National Land Governance, Research &amp; Policy Innovation Platform
                  </span>
                  <span className="text-[11px] text-slate-500 hidden md:block mt-0.5">
                    भूमि संसाधन विभाग &bull; ग्रामीण विकास मंत्रालय, भारत सरकार
                  </span>
                </div>
              </div>
            </div>

            {/* User Sign-In / Profile Section */}
            <div className="flex items-center gap-3">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 p-1.5 pr-3 rounded-full border border-slate-200 transition-all text-left cursor-pointer"
                  >
                    <RoleAvatar role={user.role} name={user.name} size="md" />
                    <div className="text-xs hidden sm:block">
                      <p className="font-bold text-slate-900 leading-tight">{user.name}</p>
                      <p className="text-[10px] text-[#0A3678] font-semibold">{user.role}</p>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden sm:block" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 divide-y divide-slate-100 text-slate-800">
                      <div className="px-4 py-3">
                        <p className="text-xs font-bold text-slate-900">{user.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                        <p className="text-[10px] text-slate-600 font-medium mt-1">{user.designation}</p>
                        <div className="mt-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#0A3678] border border-blue-200">
                            {user.role}
                          </span>
                        </div>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={() => handleNavClick('profile')}
                          className="w-full flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 cursor-pointer"
                        >
                          <UserIcon className="w-4 h-4 text-[#0A3678]" />
                          <span>My Official Profile</span>
                        </button>
                        <button
                          onClick={() => handleNavClick('dashboard')}
                          className="w-full flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 cursor-pointer"
                        >
                          <LayoutDashboard className="w-4 h-4 text-blue-600" />
                          <span>Workspace Dashboard</span>
                        </button>
                        {user.role === 'Super Admin' && (
                          <button
                            onClick={() => handleNavClick('admin')}
                            className="w-full flex items-center gap-2 px-4 py-2 text-xs text-purple-700 font-bold hover:bg-purple-50 cursor-pointer"
                          >
                            <ShieldAlert className="w-4 h-4 text-purple-600" />
                            <span>Super Admin Console</span>
                          </button>
                        )}
                      </div>

                      <div className="py-1">
                        <button
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                            setCurrentPage('login');
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out Session</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleNavClick('login')}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#0A3678] hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <LogIn className="w-4 h-4" />
                    <span className="hidden sm:inline">Official Sign-In</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('register')}
                    className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold bg-[#0A3678] hover:bg-[#002244] text-white rounded-lg shadow-sm transition-all cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span className="hidden sm:inline">Register Delegate</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Active Page Indicator Bar */}
        <div className="bg-[#0A3678] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center gap-2 text-xs">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-300">You are here:</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="font-bold text-amber-300 capitalize">
              {currentPage === 'landing' ? 'Home' :
               currentPage === 'gis' ? 'GIS Intelligence' :
               currentPage === 'ai' ? 'AI Research Copilot' :
               currentPage === 'api-portal' ? 'Open API Portal' :
               currentPage === 'digital-twin' ? 'Digital Twin Simulation' :
               currentPage === 'knowledge-graph' ? 'Knowledge Graph' :
               currentPage === 'forgot-password' ? 'Password Recovery' :
               currentPage.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
            </span>
          </div>
        </div>

      </header>

      {/* ========== SIDEBAR NAVIGATION DRAWER ========== */}
      
      {/* Backdrop Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${
          sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar Panel */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="navigation"
        aria-label="Main Navigation Menu"
      >
        {/* Sidebar Header */}
        <div className="bg-[#0A3678] text-white px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Small Ashoka Chakra */}
              <div className="w-9 h-9 rounded-full border-2 border-amber-400 bg-[#002244] flex items-center justify-center p-0.5 shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full text-amber-400" fill="currentColor">
                  <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="4" />
                  <circle cx="50" cy="50" r="7" fill="currentColor" />
                  {[...Array(24)].map((_, i) => (
                    <line
                      key={i}
                      x1="50"
                      y1="50"
                      x2={50 + 44 * Math.cos((i * 15 * Math.PI) / 180)}
                      y2={50 + 44 * Math.sin((i * 15 * Math.PI) / 180)}
                      stroke="currentColor"
                      strokeWidth="2.5"
                    />
                  ))}
                </svg>
              </div>
              <div>
                <h2 className="font-bold text-sm leading-tight">Navigation Menu</h2>
                <p className="text-[10px] text-blue-200 font-medium">GeoPolicy Nexus Portal</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Close Navigation Menu"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Tricolor stripe in sidebar */}
        <div className="tricolor-stripe"></div>

        {/* User Info in Sidebar (if logged in) */}
        {user && (
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <RoleAvatar role={user.role} name={user.name} size="lg" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                <p className="text-[10px] text-slate-500 truncate">{user.designation?.split(',')[0]}</p>
                <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#0A3678] border border-blue-200">
                  {user.role}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <div className="overflow-y-auto custom-scrollbar" style={{ height: user ? 'calc(100vh - 220px)' : 'calc(100vh - 140px)' }}>
          <nav className="py-2">
            {navGroups.map((group, gi) => (
              <div key={gi} className="mb-1">
                {/* Group Title */}
                <div className="px-4 pt-3 pb-1">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {group.title}
                  </h3>
                </div>

                {/* Group Items */}
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`nav-${item.id}`}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all cursor-pointer group/navitem ${
                        isActive
                          ? 'bg-blue-50 text-[#0A3678] font-bold border-l-4 border-[#0A3678]'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-[#0A3678] border-l-4 border-transparent'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                        isActive 
                          ? 'bg-[#0A3678] text-white' 
                          : 'bg-slate-100 text-slate-500 group-hover/navitem:bg-blue-50 group-hover/navitem:text-[#0A3678]'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="flex-1 text-left">{item.label}</span>
                      {isActive && (
                        <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* Sidebar Auth Actions (when NOT logged in) */}
          {!user && (
            <div className="px-4 py-4 border-t border-slate-200 space-y-2">
              <button
                onClick={() => handleNavClick('login')}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#0A3678] hover:bg-[#002244] text-white font-bold rounded-lg text-sm transition-colors cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Official Sign-In</span>
              </button>
              <button
                onClick={() => handleNavClick('register')}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#0A3678] font-bold rounded-lg text-sm transition-colors cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Register as Delegate</span>
              </button>
            </div>
          )}

          {/* Sidebar Profile & Auth Actions (when logged in) */}
          {user && (
            <div className="px-4 py-3 border-t border-slate-200 space-y-1">
              <button
                onClick={() => handleNavClick('profile')}
                className="w-full flex items-center gap-3 px-2 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer"
              >
                <UserIcon className="w-4 h-4 text-[#0A3678]" />
                <span>My Official Profile</span>
              </button>
              <button
                onClick={() => {
                  logout();
                  setSidebarOpen(false);
                  setCurrentPage('login');
                }}
                className="w-full flex items-center gap-3 px-2 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg cursor-pointer font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out Session</span>
              </button>
            </div>
          )}

        </div>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 bg-slate-50 border-t border-slate-200 px-4 py-2">
          <p className="text-[9px] text-slate-400 text-center leading-tight">
            © 2026 GeoPolicy Nexus &bull; Government of India
            <br />
            Department of Land Resources, Ministry of Rural Development
          </p>
        </div>

      </aside>
    </>
  );
};
