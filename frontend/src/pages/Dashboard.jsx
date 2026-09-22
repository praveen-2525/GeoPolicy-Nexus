import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { RoleBadge } from '../components/RoleBadge';
import { 
  BookOpen, 
  FileText, 
  Database, 
  Bell, 
  PlusCircle, 
  Activity, 
  ArrowUpRight, 
  ShieldCheck, 
  CheckCircle
} from 'lucide-react';
import axios from 'axios';

export const Dashboard = ({ setCurrentPage, onOpenModal }) => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    papersCount: 0,
    policiesCount: 0,
    datasetsCount: 0,
    disputeIndex: '14.2%'
  });

  const [notifications, setNotifications] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Fetch live backend metrics from MongoDB
    const fetchDashboardData = async () => {
      try {
        const [papersRes, policiesRes, datasetsRes, notifRes] = await Promise.allSettled([
          axios.get('/api/research'),
          axios.get('/api/policies'),
          axios.get('/api/datasets'),
          axios.get('/api/notifications')
        ]);

        const papersData = papersRes.status === 'fulfilled' ? papersRes.value.data : [];
        const policiesData = policiesRes.status === 'fulfilled' ? policiesRes.value.data : [];
        const datasetsData = datasetsRes.status === 'fulfilled' ? datasetsRes.value.data : [];
        const notifData = notifRes.status === 'fulfilled' ? notifRes.value.data : [];

        setStats({
          papersCount: papersData.length,
          policiesCount: policiesData.length,
          datasetsCount: datasetsData.length,
          disputeIndex: '14.2%'
        });

        // Set live notifications
        setNotifications(notifData.map((n, idx) => ({
          id: n._id || idx,
          title: n.title,
          message: n.message,
          type: n.type,
          isRead: false,
          date: new Date(n.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        })));

        // Combine recent activity stream from real MongoDB papers, policies, and datasets
        const recentActivities = [
          ...papersData.map(p => ({
            id: p._id,
            action: 'Published Research Paper',
            item: p.title,
            user: p.author || 'Researcher',
            time: new Date(p.createdAt || Date.now()).toLocaleDateString(),
            icon: BookOpen,
            color: 'text-emerald-400'
          })),
          ...policiesData.map(p => ({
            id: p._id,
            action: 'Gazetted State Policy',
            item: p.title,
            user: p.state + ' Revenue Board',
            time: new Date(p.createdAt || Date.now()).toLocaleDateString(),
            icon: FileText,
            color: 'text-amber-400'
          })),
          ...datasetsData.map(d => ({
            id: d._id,
            action: 'Uploaded Vector Layer',
            item: d.title,
            user: d.provider || 'Spatial NSDI',
            time: new Date(d.createdAt || Date.now()).toLocaleDateString(),
            icon: Database,
            color: 'text-blue-400'
          }))
        ].slice(0, 5);

        setActivities(recentActivities);
      } catch (err) {
        console.error('Error fetching dashboard live data:', err);
      }
    };

    fetchDashboardData();
  }, []);

  const toggleReadNotification = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: !n.isRead } : n));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-6 lg:p-8 space-y-8 font-sans">
      
      {/* Welcome Banner */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/60 border border-slate-800 shadow-2xl overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'}
              alt={user?.name || 'User'}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500/60 shadow-lg"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-white">Welcome back, {user?.name || 'Delegate'}</h1>
                <RoleBadge role={user?.role || 'Citizen'} />
              </div>
              <p className="text-xs text-slate-300 font-medium">
                {user?.organization || 'National Land Governance Board'} &bull; <span className="text-emerald-400">{user?.state || 'National'} Jurisdiction</span>
              </p>
              <p className="text-[11px] text-slate-400 line-clamp-1 italic">"{user?.bio || 'Active National Delegate'}"</p>
            </div>
          </div>

          {/* Quick Action Buttons according to Role */}
          <div className="flex flex-wrap items-center gap-2">
            {(user?.role === 'Researcher' || user?.role === 'Admin' || user?.role === 'Platform Administrator') && (
              <button
                onClick={() => onOpenModal && onOpenModal('research')}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-950/60 transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Submit Research</span>
              </button>
            )}

            {(user?.role === 'Policymaker' || user?.role === 'Admin' || user?.role === 'Platform Administrator') && (
              <button
                onClick={() => onOpenModal && onOpenModal('policy')}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-amber-950/60 transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Draft Policy</span>
              </button>
            )}

            {(user?.role === 'Institution' || user?.role === 'Admin' || user?.role === 'Researcher' || user?.role === 'Platform Administrator') && (
              <button
                onClick={() => onOpenModal && onOpenModal('dataset')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-blue-950/60 transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Upload Dataset</span>
              </button>
            )}

            {(user?.role === 'Admin' || user?.role === 'Platform Administrator') && (
              <button
                onClick={() => setCurrentPage('admin')}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-purple-950/60 transition-all cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Console</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Analytics Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div 
          onClick={() => setCurrentPage('research')}
          className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Research Papers</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{stats.papersCount}</div>
          <div className="flex items-center text-[11px] text-emerald-400 gap-1 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Fetched dynamically from MongoDB</span>
          </div>
        </div>

        <div 
          onClick={() => setCurrentPage('policies')}
          className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Active Policies</span>
            <div className="w-9 h-9 rounded-xl bg-amber-950 text-amber-400 border border-amber-800 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{stats.policiesCount}</div>
          <div className="flex items-center text-[11px] text-amber-400 gap-1 font-medium">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Gazette State Acts Enforced</span>
          </div>
        </div>

        <div 
          onClick={() => setCurrentPage('datasets')}
          className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Geo Datasets</span>
            <div className="w-9 h-9 rounded-xl bg-blue-950 text-blue-400 border border-blue-800 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Database className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{stats.datasetsCount}</div>
          <div className="flex items-center text-[11px] text-blue-400 gap-1 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Open Spatial Layers Bank</span>
          </div>
        </div>

        <div 
          onClick={() => user?.role === 'Admin' && setCurrentPage('admin')}
          className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-purple-500/50 transition-all cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Title Dispute Index</span>
            <div className="w-9 h-9 rounded-xl bg-purple-950 text-purple-400 border border-purple-800 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-emerald-400 font-mono">{stats.disputeIndex}</div>
          <div className="flex items-center text-[11px] text-emerald-400 gap-1 font-medium">
            <span>-5.4% dispute drop post ULPIN</span>
          </div>
        </div>

      </div>

      {/* Main Grid: Recent Activity & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Activity Feed (2 Cols) */}
        <div className="lg:col-span-2 bg-slate-900/80 rounded-3xl border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-white text-base">Recent Platform Activity Stream</h3>
            </div>
            <span className="text-xs font-mono text-slate-400">Live MongoDB Stream</span>
          </div>

          <div className="space-y-3">
            {activities.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">No recent activities recorded.</p>
            ) : (
              activities.map((act) => {
                const Icon = act.icon;
                return (
                  <div key={act.id} className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-start gap-4">
                    <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 shrink-0">
                      <Icon className={`w-5 h-5 ${act.color}`} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-200">{act.action}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{act.time}</span>
                      </div>
                      <p className="text-xs text-emerald-400 font-medium">{act.item}</p>
                      <p className="text-[11px] text-slate-400">By: {act.user}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* System Notifications Feed (1 Col) */}
        <div className="bg-slate-900/80 rounded-3xl border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-white text-base">Notifications Feed</h3>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 text-amber-400 border border-amber-800">
              {notifications.filter(n => !n.isRead).length} New
            </span>
          </div>

          <div className="space-y-3">
            {notifications.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">No unread notifications.</p>
            ) : (
              notifications.map((n) => (
                <div 
                  key={n.id}
                  onClick={() => toggleReadNotification(n.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    n.isRead 
                      ? 'bg-slate-950/40 border-slate-800/60 opacity-60' 
                      : 'bg-slate-950 border-amber-800/60 shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-200">{n.title}</span>
                    <span className="text-[10px] text-slate-500">{n.date}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{n.message}</p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
