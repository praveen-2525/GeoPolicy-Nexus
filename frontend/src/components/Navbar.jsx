import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { RoleBadge } from './RoleBadge';
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
  Bell, 
  ChevronDown, 
  Menu, 
  X,
  Layers,
  Sparkles,
  MapPin,
  Bot,
  Cpu,
  Languages
} from 'lucide-react';

export const Navbar = ({ currentPage, setCurrentPage }) => {
  const { user, logout, switchDemoRole, DEMO_ACCOUNTS } = useContext(AuthContext);
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  let navItems = [];

  if (user) {
    navItems = [
      { id: 'landing', label: 'Home', icon: Globe },
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'simulator', label: 'Policy Simulator', icon: Cpu },
      { id: 'ai', label: 'AI Assistant', icon: Bot },
      { id: 'gis', label: 'GIS Dashboard', icon: MapPin },
      { id: 'research', label: 'Research', icon: BookOpen },
      { id: 'policies', label: 'Policies', icon: FileText },
      { id: 'datasets', label: 'Datasets', icon: Database },
    ];
    if (user.role === 'Admin' || user.role === 'Platform Administrator') {
      navItems.push({ id: 'admin', label: 'Admin Portal', icon: ShieldAlert });
    }
  } else {
    navItems = [
      { id: 'landing', label: 'Home', icon: Globe }
    ];
  }

  const handleNavClick = (id) => {
    setCurrentPage(id);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-xl">
      {/* Top Ministry Banner */}
      <div className="bg-slate-950 py-1.5 px-4 text-xs font-mono text-slate-400 border-b border-slate-800/80 flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Government of India &bull; Ministry of Rural Development &amp; Land Policy Innovation</span>
        </div>

        <div className="flex items-center gap-4">
          
          {/* Native Google Translate Element container */}
          <div className="flex items-center gap-2 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
            <Languages className="w-3.5 h-3.5 text-blue-400" />
            <div id="google_translate_element" className="translate-widget-container h-5 overflow-hidden"></div>
          </div>

          {/* Quick Role Switcher for instant live testing */}
          <div className="relative flex items-center gap-2 hidden sm:flex">
            <span className="text-slate-500 font-sans font-medium text-[11px]">Active Testing Role:</span>
            <button 
              onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded border border-slate-700 text-slate-200 text-xs font-sans transition-colors cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Switch Role ({user ? user.role : 'Guest'})</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {roleSwitcherOpen && (
              <div className="absolute right-0 top-7 w-64 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl z-50 p-2 text-sans">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">
                  1-Click Role Switcher
                </div>
                <div className="space-y-1">
                  {Object.keys(DEMO_ACCOUNTS).map((roleName) => (
                    <button
                      key={roleName}
                      onClick={() => {
                        switchDemoRole(roleName);
                        setRoleSwitcherOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors cursor-pointer ${
                        user?.role === roleName 
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 font-semibold' 
                          : 'hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <span>{roleName}</span>
                      <RoleBadge role={roleName} size="small" showIcon={false} />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => handleNavClick('landing')}>
            <img 
              src="/logo.png" 
              alt="GeoPolicy Nexus Logo" 
              className="w-10 h-10 rounded-lg shadow-lg shadow-emerald-900/30 border border-emerald-400/30 object-cover shrink-0" 
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-emerald-400 bg-clip-text text-transparent whitespace-nowrap leading-tight">
                GeoPolicy Nexus
              </span>
              <span className="hidden xl:block text-[10px] text-slate-400 tracking-wider font-mono uppercase font-medium whitespace-nowrap">
                National Land Governance Platform
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-0.5 overflow-x-auto custom-scrollbar flex-nowrap">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-slate-800 text-emerald-400 font-semibold shadow-inner border border-slate-700/80'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Auth / User Section */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 bg-slate-800/80 hover:bg-slate-800 p-1.5 pr-3 rounded-full border border-slate-700 transition-all text-left cursor-pointer"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border border-emerald-500/50"
                  />
                  <div className="hidden lg:block text-xs">
                    <p className="font-semibold text-slate-200 leading-tight">{user.name}</p>
                    <p className="text-[10px] text-slate-400">{user.role}</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl py-2 z-50 divide-y divide-slate-800">
                    <div className="px-4 py-3">
                      <p className="text-sm font-semibold text-white">{user.name}</p>
                      <p className="text-xs text-slate-400 truncate">{user.email}</p>
                      <div className="mt-2">
                        <RoleBadge role={user.role} size="small" />
                      </div>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => handleNavClick('profile')}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer"
                      >
                        <UserIcon className="w-4 h-4 text-emerald-400" />
                        <span>My Government Profile</span>
                      </button>
                      <button
                        onClick={() => handleNavClick('simulator')}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer"
                      >
                        <Cpu className="w-4 h-4 text-amber-400" />
                        <span>Policy Impact Simulator</span>
                      </button>
                      <button
                        onClick={() => handleNavClick('ai')}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer"
                      >
                        <Bot className="w-4 h-4 text-purple-400" />
                        <span>AI Research Copilot</span>
                      </button>
                      <button
                        onClick={() => handleNavClick('dashboard')}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer"
                      >
                        <LayoutDashboard className="w-4 h-4 text-blue-400" />
                        <span>Platform Workspace</span>
                      </button>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => {
                          logout();
                          setUserDropdownOpen(false);
                          setCurrentPage('login');
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-400 hover:bg-rose-950/40 cursor-pointer"
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
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => handleNavClick('register')}
                  className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg shadow-md shadow-emerald-950/50 transition-all cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register Portal</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg bg-slate-800 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium cursor-pointer ${
                  isActive ? 'bg-slate-800 text-emerald-400 font-semibold' : 'text-slate-300 hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-4 border-t border-slate-800 space-y-2">
            {user ? (
              <>
                <button
                  onClick={() => handleNavClick('profile')}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-300 cursor-pointer"
                >
                  <UserIcon className="w-5 h-5 text-emerald-400" />
                  <span>Profile ({user.name})</span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                    setCurrentPage('login');
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-rose-400 cursor-pointer"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => handleNavClick('login')}
                  className="w-full text-center py-2 bg-slate-800 rounded-lg text-sm text-slate-200 cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavClick('register')}
                  className="w-full text-center py-2 bg-emerald-600 rounded-lg text-sm text-white font-semibold cursor-pointer"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
