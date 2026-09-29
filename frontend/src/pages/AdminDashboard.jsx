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
  Globe,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Server,
  UserCheck
} from 'lucide-react';
import apiClient, { ENDPOINTS, API_BASE_URL } from '../api/config';

const INITIAL_USERS = [
  { _id: 'usr_admin_01', name: 'Praveen', email: 'praveen@geopolicy.gov.in', role: 'Super Admin', organization: 'Ministry of Rural Development & DoLR', state: 'National' },
  { _id: 'usr_researcher_02', name: 'Dr. Aruna Swaminathan', email: 'aruna.swaminathan@iitd.ac.in', role: 'Researcher', organization: 'IIT Delhi', state: 'Delhi' },
  { _id: 'usr_policy_03', name: 'Vikramaditya Rao', email: 'v.rao@karnataka.gov.in', role: 'Policymaker', organization: 'State Land Policy Board', state: 'Karnataka' },
  { _id: 'usr_official_04', name: 'Rajesh Kumar Verma, IAS', email: 'rajesh.verma@nic.in', role: 'Government Official', organization: 'Department of Land Resources', state: 'National' },
  { _id: 'usr_citizen_05', name: 'Sunita Deshmukh', email: 'sunita.deshmukh@gmail.com', role: 'Citizen', organization: 'Gujarat Kisan Parishad', state: 'Gujarat' }
];

export const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('users'); // 'users' | 'hierarchy' | 'moderation' | 'health'
  const [usersList, setUsersList] = useState(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState('');

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    apiClient.get(ENDPOINTS.USERS)
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
    if (window.confirm('Are you sure you want to revoke this user account?')) {
      setUsersList(usersList.filter(u => u._id !== id));
      apiClient.delete(`${ENDPOINTS.USERS}/${id}`).catch(() => {});
    }
  };

  const filteredUsers = usersList.filter(u => 
    u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.organization?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-6 lg:p-8 space-y-6 font-sans">
      
      {/* Super Admin Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-purple-700 font-mono text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>National Super Administrator Console &bull; Praveen</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002244]">
            Super Admin Platform Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Full platform administration, user access management, dataset moderation, and national spatial infrastructure control.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-purple-100 text-purple-900 border border-purple-300 rounded-lg text-xs font-bold font-mono flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Super Admin: Praveen</span>
          </span>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-xs flex flex-wrap gap-2 text-xs">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
            activeTab === 'users' ? 'bg-[#0A3678] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          User Management ({usersList.length})
        </button>
        <button
          onClick={() => setActiveTab('hierarchy')}
          className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
            activeTab === 'hierarchy' ? 'bg-[#0A3678] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Administrative Boundaries &amp; LGD Hierarchy
        </button>
        <button
          onClick={() => setActiveTab('moderation')}
          className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
            activeTab === 'moderation' ? 'bg-[#0A3678] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Dataset Moderation &amp; Approval
        </button>
        <button
          onClick={() => setActiveTab('health')}
          className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
            activeTab === 'health' ? 'bg-[#0A3678] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          System Health &amp; Analytics Overview
        </button>
      </div>

      {/* TAB 1: USER MANAGEMENT */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search registered delegates by name, email, role..."
                className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>

            <button
              onClick={() => {
                setSelectedUser(null);
                setIsUserModalOpen(true);
              }}
              className="px-4 py-2 bg-[#0A3678] hover:bg-[#002244] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer w-full sm:w-auto justify-center"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Enroll New User</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-mono text-[11px]">
                  <th className="py-2.5 px-3">Full Legal Name</th>
                  <th className="py-2.5 px-3">Official Email</th>
                  <th className="py-2.5 px-3">Platform Role</th>
                  <th className="py-2.5 px-3">Organization / Department</th>
                  <th className="py-2.5 px-3">State Jurisdiction</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((u) => (
                  <tr key={u._id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-bold text-slate-900">{u.name}</td>
                    <td className="py-3 px-3 font-mono text-slate-500">{u.email}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        u.role === 'Super Admin' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                        u.role === 'Researcher' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                        u.role === 'Policymaker' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                        u.role === 'Government Official' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                        'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-700">{u.organization}</td>
                    <td className="py-3 px-3 text-slate-600 font-medium">{u.state}</td>
                    <td className="py-3 px-3 text-right space-x-1">
                      <button
                        onClick={() => {
                          setSelectedUser(u);
                          setIsUserModalOpen(true);
                        }}
                        className="p-1.5 bg-slate-100 hover:bg-slate-200 text-[#0A3678] rounded cursor-pointer"
                        title="Edit User"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(u._id)}
                        className="p-1.5 bg-slate-100 hover:bg-red-50 text-red-600 rounded cursor-pointer"
                        title="Delete User"
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
      )}

      {/* TAB 2: ADMINISTRATIVE HIERARCHY */}
      {activeTab === 'hierarchy' && (
        <div className="space-y-6">
          <AdminHierarchySelector />
          <AdminBoundaryManager />
        </div>
      )}

      {/* TAB 3: DATASET MODERATION */}
      {activeTab === 'moderation' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Spatial Dataset &amp; Publication Approval Queue</h3>
              <p className="text-xs text-slate-500">Review pending cadastral submissions before national publication.</p>
            </div>
            <span className="text-xs font-mono bg-amber-50 text-amber-800 px-2 py-1 rounded font-bold border border-amber-200">
              2 Submissions Pending
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-[#0A3678]">
                    Spatial Vector Layer
                  </span>
                  <span className="font-bold text-slate-900">
                    Pune Peri-Urban Land Pooling Vector (GeoJSON)
                  </span>
                </div>
                <p className="text-slate-600">Submitted by: IIT Delhi Geomatics Lab &bull; 14-Digit ULPIN Verified</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert('[Approved]: Dataset published to Open Data Repository under OGDL License.')}
                  className="px-3 py-1.5 bg-[#0D7E3A] hover:bg-[#085426] text-white rounded-lg font-bold shadow-xs cursor-pointer"
                >
                  Approve &amp; Publish
                </button>
                <button
                  onClick={() => alert('[Revision Requested]: Editorial comments dispatched to submitting author.')}
                  className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-bold cursor-pointer"
                >
                  Request Revision
                </button>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                    Policy Gazette Draft
                  </span>
                  <span className="font-bold text-slate-900">
                    Tamil Nadu Coastal CRZ Tenurial Rights Regulation 2026
                  </span>
                </div>
                <p className="text-slate-600">Submitted by: State Land Policy Board &bull; Awaiting Legal Verification</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert('[Approved]: Policy published to official State Gazette Registry.')}
                  className="px-3 py-1.5 bg-[#0D7E3A] hover:bg-[#085426] text-white rounded-lg font-bold shadow-xs cursor-pointer"
                >
                  Approve &amp; Publish
                </button>
                <button
                  onClick={() => alert('[Revision Requested]: Legal revision guidelines dispatched.')}
                  className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-bold cursor-pointer"
                >
                  Request Revision
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SYSTEM HEALTH */}
      {activeTab === 'health' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold uppercase font-mono">MongoDB Status</span>
              <Database className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-extrabold text-emerald-700 font-mono">ONLINE / CONNECTED</div>
            <p className="text-xs text-slate-500">Port 27017 &bull; geopolicy_nexus database healthy</p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold uppercase font-mono">Backend API Server</span>
              <Server className="w-4 h-4 text-[#0A3678]" />
            </div>
            <div className="text-xl font-extrabold text-[#0A3678] font-mono uppercase tracking-tight">RENDER API ACTIVE</div>
            <p className="text-xs text-slate-500 truncate" title={API_BASE_URL}>{API_BASE_URL} &bull; Deployed</p>
          </div>

          <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold uppercase font-mono">System Uptime</span>
              <Activity className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-extrabold text-purple-800 font-mono">99.98%</div>
            <p className="text-xs text-slate-500">National Sovereign Cloud Tier-4 Certified</p>
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
