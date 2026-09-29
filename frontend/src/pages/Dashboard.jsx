import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { RoleBadge } from '../components/RoleBadge';
import RoleAvatar from '../components/RoleAvatar';
import { 
  BookOpen, 
  FileText, 
  Database, 
  Bell, 
  PlusCircle, 
  Activity, 
  ArrowUpRight, 
  ShieldCheck, 
  CheckCircle,
  Cpu,
  Bot,
  MapPin,
  Users,
  Shield,
  FileCheck,
  Building,
  UserCheck
} from 'lucide-react';
import apiClient, { ENDPOINTS } from '../api/config';

export const Dashboard = ({ setCurrentPage, onOpenModal }) => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    papersCount: 4,
    policiesCount: 4,
    datasetsCount: 3,
    disputeIndex: '14.2%'
  });

  const [notifications, setNotifications] = useState([]);
  const [activities, setActivities] = useState([]);

  // Hardcoded GOI Alerts - always visible regardless of backend data
  const GOV_ALERTS = [
    {
      id: 'goi-1',
      title: '🔴 SVAMITVA Scheme Phase-III Launched',
      message: 'Ministry of Rural Development has notified Phase-III of SVAMITVA covering 50,000 villages with drone cadastral mapping under PM Gati Shakti. Deadline: 31 March 2027.',
      type: 'critical',
      date: '23 Sep 2026',
      isRead: false
    },
    {
      id: 'goi-2',
      title: '🟠 ULPIN Mandatory for All Property Reg.',
      message: 'DoLR Circular No. 2026-LR-44: All state land registrations must carry 14-digit ULPIN from 01 October 2026 onwards. Non-compliance penalties apply.',
      type: 'warning',
      date: '22 Sep 2026',
      isRead: false
    },
    {
      id: 'goi-3',
      title: '🟡 NIC GIS Portal Integration Deadline',
      message: 'All state revenue boards must sync cadastral GIS layers with National Spatial Data Infrastructure (NSDI) via NIC API before 15 October 2026.',
      type: 'warning',
      date: '21 Sep 2026',
      isRead: false
    },
    {
      id: 'goi-4',
      title: '🟢 DILRMP Phase-II Funds Released',
      message: 'Rs. 4,500 crore sanctioned under Digital India Land Records Modernisation Programme Phase-II for 14 states. States must submit Utilisation Certificates by Dec 2026.',
      type: 'info',
      date: '20 Sep 2026',
      isRead: false
    },
    {
      id: 'goi-5',
      title: '🔵 DLC Rate Revision – 6 States Notified',
      message: 'District Level Committee (DLC) circle rates revised upward in Maharashtra, Karnataka, AP, Telangana, TN, and Kerala effective 01 October 2026 per MoRD notification.',
      type: 'info',
      date: '19 Sep 2026',
      isRead: false
    },
    {
      id: 'goi-6',
      title: '🟣 Conclusive Titling Policy Draft – Open for Comments',
      message: 'Draft National Conclusive Land Titling Act 2026 open for public consultation till 15 October 2026. Submit inputs via pgportal.gov.in/dolr.',
      type: 'info',
      date: '18 Sep 2026',
      isRead: true
    }
  ];

  const [alertReadState, setAlertReadState] = useState({});
  const toggleAlert = (id) => setAlertReadState(prev => ({ ...prev, [id]: !prev[id] }));

  const fetchDashboardData = async () => {
    try {
      const [papersRes, policiesRes, datasetsRes] = await Promise.allSettled([
        apiClient.get(ENDPOINTS.RESEARCH),
        apiClient.get(ENDPOINTS.POLICIES),
        apiClient.get(ENDPOINTS.DATASETS)
      ]);

      const papersData = papersRes.status === 'fulfilled' ? papersRes.value.data : [];
      const policiesData = policiesRes.status === 'fulfilled' ? policiesRes.value.data : [];
      const datasetsData = datasetsRes.status === 'fulfilled' ? datasetsRes.value.data : [];

      setStats({
        papersCount: papersData.length || 4,
        policiesCount: policiesData.length || 4,
        datasetsCount: datasetsData.length || 3,
        disputeIndex: '14.2%'
      });

      const recentActivities = [
        ...papersData.map(p => ({
          id: p._id,
          action: 'Published Research Paper',
          item: p.title,
          user: p.author || 'Dr. Aruna Swaminathan',
          time: new Date(p.createdAt || Date.now()).toLocaleDateString(),
          icon: BookOpen,
          color: 'text-emerald-700'
        })),
        ...policiesData.map(p => ({
          id: p._id,
          action: 'Gazetted State Policy',
          item: p.title,
          user: (p.state || 'Karnataka') + ' Revenue Board',
          time: new Date(p.createdAt || Date.now()).toLocaleDateString(),
          icon: FileText,
          color: 'text-amber-700'
        })),
        ...datasetsData.map(d => ({
          id: d._id,
          action: 'Uploaded Vector Layer',
          item: d.title,
          user: d.provider || 'Survey of India / NSDI',
          time: new Date(d.createdAt || Date.now()).toLocaleDateString(),
          icon: Database,
          color: 'text-[#0A3678]'
        }))
      ].slice(0, 5);

      setActivities(recentActivities);
    } catch (err) {
      console.error('Error fetching dashboard live data:', err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const toggleReadNotification = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: !n.isRead } : n));
  };

  const userRole = user?.role || 'Citizen';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-6 lg:p-8 space-y-6 font-sans">
      
      {/* Official Government Greeting & Role Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        
        {/* Tricolor Accent Strip */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F58220] via-white to-[#0D7E3A]"></div>

        <div className="flex items-center gap-4">
          <RoleAvatar role={userRole} name={user?.name} size="xl" className="rounded-2xl shadow-sm" />
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#002244]">
                Official Workspace: {user?.name || 'Delegate'}
              </h1>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                userRole === 'Super Admin' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                userRole === 'Researcher' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                userRole === 'Policymaker' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                userRole === 'Government Official' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                'bg-slate-100 text-slate-800 border border-slate-200'
              }`}>
                {userRole}
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              {user?.designation || 'Accredited Representative'} &bull; <strong>{user?.organization || 'National Land Governance Board'}</strong>
            </p>
            <p className="text-[11px] text-slate-500 font-mono">
              Jurisdiction: <span className="text-[#0A3678] font-bold">{user?.state || 'National'}</span>
            </p>
          </div>
        </div>

        {/* Dynamic Action Buttons Tailored by User Role */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* RESEARCHER ACTIONS */}
          {(userRole === 'Researcher' || userRole === 'Super Admin') && (
            <>
              <button
                onClick={() => onOpenModal && onOpenModal('research')}
                className="px-3.5 py-2 bg-[#0A3678] hover:bg-[#002244] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Upload Paper</span>
              </button>
              <button
                onClick={() => setCurrentPage('collaboration')}
                className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
              >
                <Users className="w-4 h-4 text-blue-600" />
                <span>Collaborative Projects</span>
              </button>
              <button
                onClick={() => setCurrentPage('ai')}
                className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
              >
                <Bot className="w-4 h-4 text-amber-700" />
                <span>AI Research Copilot</span>
              </button>
            </>
          )}

          {/* POLICYMAKER ACTIONS */}
          {(userRole === 'Policymaker') && (
            <>
              <button
                onClick={() => setCurrentPage('simulator')}
                className="px-3.5 py-2 bg-[#0A3678] hover:bg-[#002244] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
              >
                <Cpu className="w-4 h-4" />
                <span>Launch Policy Simulator</span>
              </button>
              <button
                onClick={() => setCurrentPage('analytics')}
                className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
              >
                <Activity className="w-4 h-4 text-amber-600" />
                <span>Policy Impact Analytics</span>
              </button>
              <button
                onClick={() => onOpenModal && onOpenModal('policy')}
                className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Draft Policy</span>
              </button>
            </>
          )}

          {/* GOVERNMENT OFFICIAL ACTIONS */}
          {(userRole === 'Government Official') && (
            <>
              <button
                onClick={() => setCurrentPage('datasets')}
                className="px-3.5 py-2 bg-[#0A3678] hover:bg-[#002244] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
              >
                <Database className="w-4 h-4" />
                <span>Access Datasets Bank</span>
              </button>
              <button
                onClick={() => setCurrentPage('analytics')}
                className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
              >
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                <span>Administrative Analytics</span>
              </button>
              <button
                onClick={() => alert('[Publication Approval Queue]: 2 submissions pending your review clearance.')}
                className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Approve Publications (2)</span>
              </button>
            </>
          )}

          {/* CITIZEN ACTIONS */}
          {(userRole === 'Citizen') && (
            <>
              <button
                onClick={() => setCurrentPage('gis')}
                className="px-3.5 py-2 bg-[#0A3678] hover:bg-[#002244] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
              >
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Explore District GIS Maps</span>
              </button>
              <button
                onClick={() => setCurrentPage('research')}
                className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
              >
                <BookOpen className="w-4 h-4 text-[#0A3678]" />
                <span>View Public Research</span>
              </button>
              <button
                onClick={() => setCurrentPage('blockchain')}
                className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Verify Property ULPIN</span>
              </button>
            </>
          )}

          {/* SUPER ADMIN PRAVEEN ACTIONS */}
          {(userRole === 'Super Admin') && (
            <button
              onClick={() => setCurrentPage('admin')}
              className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Super Admin Console</span>
            </button>
          )}

        </div>
      </div>

      {/* Analytics Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div 
          onClick={() => setCurrentPage('research')}
          className="p-5 bg-white rounded-xl border border-slate-200 hover:border-blue-400 shadow-xs transition-all cursor-pointer space-y-2 group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold uppercase font-mono">Research Papers</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#002244] font-mono">{stats.papersCount}</div>
          <div className="flex items-center text-[11px] text-emerald-700 gap-1 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Indexed in MongoDB Repository</span>
          </div>
        </div>

        <div 
          onClick={() => setCurrentPage('policies')}
          className="p-5 bg-white rounded-xl border border-slate-200 hover:border-amber-400 shadow-xs transition-all cursor-pointer space-y-2 group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold uppercase font-mono">Gazetted Policies</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-amber-800 font-mono">{stats.policiesCount}</div>
          <div className="flex items-center text-[11px] text-amber-700 gap-1 font-semibold">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Enforced State Legislative Acts</span>
          </div>
        </div>

        <div 
          onClick={() => setCurrentPage('datasets')}
          className="p-5 bg-white rounded-xl border border-slate-200 hover:border-blue-400 shadow-xs transition-all cursor-pointer space-y-2 group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold uppercase font-mono">Spatial Datasets</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-[#0A3678] font-mono">{stats.datasetsCount}</div>
          <div className="flex items-center text-[11px] text-blue-700 gap-1 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Open Vector Layers (OGDL)</span>
          </div>
        </div>

        <div 
          onClick={() => setCurrentPage('analytics')}
          className="p-5 bg-white rounded-xl border border-slate-200 hover:border-purple-400 shadow-xs transition-all cursor-pointer space-y-2 group"
        >
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold uppercase font-mono">Title Dispute Index</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-emerald-700 font-mono">{stats.disputeIndex}</div>
          <div className="flex items-center text-[11px] text-emerald-700 gap-1 font-semibold">
            <span>-5.4% dispute drop post ULPIN</span>
          </div>
        </div>

      </div>

      {/* Main Grid: Activity Stream & System Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recent Activity Feed (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#0A3678]" />
              <h3 className="font-bold text-slate-900 text-sm">Recent Platform Activity Stream</h3>
            </div>
            <span className="text-xs font-mono text-slate-400">Live MongoDB Feed</span>
          </div>

          <div className="space-y-3">
            {activities.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No recent activities recorded.</p>
            ) : (
              activities.map((act) => {
                const Icon = act.icon;
                return (
                  <div key={act.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                    <div className="p-2 bg-white rounded-lg border border-slate-200 shrink-0">
                      <Icon className={`w-4 h-4 ${act.color}`} />
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900">{act.action}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{act.time}</span>
                      </div>
                      <p className="text-xs text-[#0A3678] font-semibold">{act.item}</p>
                      <p className="text-[11px] text-slate-500">By: {act.user}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Official Government Alerts (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-600" />
              <h3 className="font-bold text-slate-900 text-sm">Government Alerts</h3>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
              {GOV_ALERTS.filter(a => !alertReadState[a.id] && !a.isRead).length} Critical
            </span>
          </div>

          <div className="space-y-2.5 max-h-[480px] overflow-y-auto custom-scrollbar pr-1">
            {GOV_ALERTS.map((alert) => {
              const isRead = alertReadState[alert.id] || alert.isRead;
              const borderColor = alert.type === 'critical' ? 'border-red-300 bg-red-50/60' :
                alert.type === 'warning' ? 'border-amber-300 bg-amber-50/60' :
                'border-blue-200 bg-blue-50/40';
              return (
                <div
                  key={alert.id}
                  onClick={() => toggleAlert(alert.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${isRead ? 'opacity-50 bg-slate-50 border-slate-200' : borderColor}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-900 leading-snug">{alert.title}</span>
                    <span className="text-[10px] text-slate-400 shrink-0">{alert.date}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{alert.message}</p>
                  {!isRead && (
                    <span className="mt-1.5 inline-block text-[10px] font-bold text-[#0A3678] hover:underline">Mark as Read →</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
