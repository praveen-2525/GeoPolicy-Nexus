import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { RoleBadge } from '../components/RoleBadge';
import { UserModal } from '../components/UserModal';
import { AdminHierarchySelector } from '../components/AdminHierarchySelector';
import { AdminBoundaryManager } from '../components/AdminBoundaryManager';
import { 
  ShieldAlert, 
  Users, 
  BookOpen, 
  FileText, 
  Database, 
  PlusCircle, 
  Trash2, 
  Edit, 
  Search,
  Globe
} from 'lucide-react';
import axios from 'axios';

// Initial preloaded users list for admin testing
const INITIAL_USERS = [
  { _id: 'usr_admin_01', name: 'Dr. Rajesh Sharma', email: 'admin@geopolicy.gov.in', role: 'Admin', organization: 'Ministry of Land Resources', state: 'National' },
  { _id: 'usr_researcher_02', name: 'Praveen', email: 'praveen@geopolicy.gov.in', role: 'Platform Administrator', organization: 'National Institute of Urban Affairs', state: 'Maharashtra' },
  { _id: 'usr_policy_03', name: 'Vikramaditya Rao', email: 'policy@geopolicy.gov.in', role: 'Policymaker', organization: 'State Land Policy Board', state: 'Karnataka' },
  { _id: 'usr_citizen_04', name: 'Sunita Deshmukh', email: 'citizen@geopolicy.gov.in', role: 'Citizen', organization: 'Civil Rights & Land Owner', state: 'Gujarat' },
  { _id: 'usr_inst_05', name: 'GeoSpatial Innovation Lab', email: 'institution@geopolicy.gov.in', role: 'Institution', organization: 'Indian Council of Social Science Research', state: 'Delhi' }
];

export const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('hierarchy');
  const [usersList, setUsersList] = useState(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Attempt fetching live users from backend API
    axios.get('/api/users')
      .then(res => {
        if (res.data && res.data.length > 0) {
          setUsersList(res.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleSaveUser = (formData) => {
    if (selectedUser) {
      setUsersList(usersList.map(u => u._id === selectedUser._id ? { ...u, ...formData } : u));
    } else {
      const newUser = {
        _id: 'usr_' + Date.now(),
        ...formData
      };
      setUsersList([newUser, ...usersList]);
    }
    setIsUserModalOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to remove this user from the platform?')) {
      setUsersList(usersList.filter(u => u._id !== id));
      axios.delete(`/api/users/${id}`).catch(() => {});
    }
  };

  const filteredUsers = usersList.filter(u => 
    u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.organization?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-6 lg:p-8 space-y-8 font-sans">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>National Platform Governance &amp; Administration</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Admin Management Console</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage Indian administrative boundaries, user roles, gazette policies, research approvals, and spatial datasets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">Logged in as Admin:</span>
          <RoleBadge role={user?.role || 'Admin'} />
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-4">
        <button
          onClick={() => setActiveTab('hierarchy')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'hierarchy' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/60' : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>India Administrative Hierarchy</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'users' ? 'bg-purple-600 text-white shadow-lg' : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>User Management ({usersList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('research')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'research' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span>Research Management</span>
        </button>

        <button
          onClick={() => setActiveTab('policies')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'policies' ? 'bg-amber-600 text-white shadow-lg' : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <FileText className="w-4 h-4 text-amber-400" />
          <span>Policy Management</span>
        </button>

        <button
          onClick={() => setActiveTab('datasets')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'datasets' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
          }`}
        >
          <Database className="w-4 h-4 text-blue-400" />
          <span>Dataset Management</span>
        </button>
      </div>

      {/* TAB 0: INDIA ADMINISTRATIVE HIERARCHY MODULE */}
      {activeTab === 'hierarchy' && (
        <div className="space-y-8">
          <AdminHierarchySelector />
          <AdminBoundaryManager />
        </div>
      )}

      {/* TAB 1: USER MANAGEMENT */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users by name, email, role..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <button
              onClick={() => {
                setSelectedUser(null);
                setIsUserModalOpen(true);
              }}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-950/50 w-full sm:w-auto justify-center cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create User Account</span>
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
                  <tr>
                    <th className="p-4">User Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Organization</th>
                    <th className="p-4">Jurisdiction</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredUsers.map((u) => (
                    <tr key={u._id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-4 font-bold text-white flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center font-bold text-purple-400">
                          {u.name?.charAt(0)}
                        </div>
                        <span>{u.name}</span>
                      </td>
                      <td className="p-4 font-mono text-slate-400">{u.email}</td>
                      <td className="p-4">
                        <RoleBadge role={u.role} size="small" />
                      </td>
                      <td className="p-4 text-slate-300">{u.organization}</td>
                      <td className="p-4 text-slate-400">{u.state}</td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => {
                            setSelectedUser(u);
                            setIsUserModalOpen(true);
                          }}
                          className="p-1.5 bg-slate-800 hover:bg-slate-700 text-purple-400 rounded-lg cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(u._id)}
                          className="p-1.5 bg-slate-800 hover:bg-rose-950 text-rose-400 rounded-lg cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2, 3, 4 Overview place-holders for instant audit */}
      {activeTab === 'research' && (
        <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <span>Research Paper Catalog Control</span>
          </h3>
          <p className="text-xs text-slate-400">Manage peer-review approvals, DOI assignments, and citation indexing across all 4 indexed research papers.</p>
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-emerald-400 font-mono">
            Status: All research papers active and verified against National Spatial Standards.
          </div>
        </div>
      )}

      {activeTab === 'policies' && (
        <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <span>State Policy Gazette Administration</span>
          </h3>
          <p className="text-xs text-slate-400">Regulate state legislative submissions, digital land titling mandates, and urban zoning directives.</p>
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-amber-400 font-mono">
            Status: 4 Active State &amp; National Gazette policies currently published.
          </div>
        </div>
      )}

      {activeTab === 'datasets' && (
        <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
          <h3 className="font-bold text-white text-lg flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-400" />
            <span>Geospatial Layer Registry</span>
          </h3>
          <p className="text-xs text-slate-400">Regulate spatial vector and raster layer access, OGDL licenses, and download throughput.</p>
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-blue-400 font-mono">
            Status: Open Government Data License (OGDL) compliance active.
          </div>
        </div>
      )}

      {/* User Modal */}
      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => {
          setIsUserModalOpen(false);
          setSelectedUser(null);
        }}
        onSubmit={handleSaveUser}
        initialData={selectedUser}
      />

    </div>
  );
};
