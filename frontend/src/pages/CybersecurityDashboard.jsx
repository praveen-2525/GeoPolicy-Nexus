import React, { useState } from 'react';
import { 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  Activity, 
  Lock, 
  UserCheck, 
  KeyRound, 
  FileText, 
  Terminal, 
  Globe, 
  CheckCircle2, 
  Clock, 
  Eye
} from 'lucide-react';

const SECURITY_ALERTS = [
  {
    id: 'alt-01',
    severity: 'Medium',
    title: 'Anomalous Export Rate Exceeded',
    detail: 'IP 194.26.29.112 attempted bulk download of 4,000 Cadastral GeoJSON vectors within 60s. Rate limit enforced.',
    timestamp: '14 mins ago',
    status: 'Mitigated'
  },
  {
    id: 'alt-02',
    severity: 'Low',
    title: 'Failed Administrative Login Attempt',
    detail: '3 consecutive invalid password attempts on account sub-registrar-pune@gov.in. Account temporarily locked for 15 mins.',
    timestamp: '1 hour ago',
    status: 'Resolved'
  },
  {
    id: 'alt-03',
    severity: 'High',
    title: 'Geofencing Violation Blocked',
    detail: 'Unauthorized API query originating outside Indian national IP block without VPN clearance. Connection dropped.',
    timestamp: '3 hours ago',
    status: 'Blocked'
  }
];

const AUDIT_LOGS = [
  {
    id: 'aud-001',
    user: 'Praveen',
    role: 'Super Admin',
    action: 'Approved State Cadastral Vector Publication',
    ip: '10.24.18.91 (NIC Secure GovNet)',
    timestamp: '22 Sept 2026, 21:40 IST',
    status: 'Success'
  },
  {
    id: 'aud-002',
    user: 'Rajesh Kumar Verma, IAS',
    role: 'Government Official',
    action: 'Issued Gazette Review Clearance #KA-2024-81',
    ip: '10.24.18.42 (DoLR Ministry)',
    timestamp: '22 Sept 2026, 19:15 IST',
    status: 'Success'
  },
  {
    id: 'aud-003',
    user: 'Dr. Aruna Swaminathan',
    role: 'Researcher',
    action: 'Uploaded Peer-Reviewed Research Document (DOI: 10.1016/spatialgov)',
    ip: '14.139.45.12 (IIT Delhi Campus Network)',
    timestamp: '22 Sept 2026, 17:30 IST',
    status: 'Success'
  },
  {
    id: 'aud-004',
    user: 'System Bot',
    role: 'System Daemon',
    action: 'Daily Cryptographic Merkle Root Signed on Hyperledger Node',
    ip: '127.0.0.1 (Local Consensus Loop)',
    timestamp: '22 Sept 2026, 00:00 IST',
    status: 'Success'
  }
];

const RBAC_MATRIX = [
  { module: 'Public Research & GIS Map Exploration', researcher: true, policymaker: true, official: true, citizen: true, superadmin: true },
  { module: 'Submit Research & Field Studies', researcher: true, policymaker: false, official: false, citizen: false, superadmin: true },
  { module: 'Policy Scenario Simulation & Modeling', researcher: true, policymaker: true, official: true, citizen: false, superadmin: true },
  { module: 'Publication Clearance & Editorial Approval', researcher: false, policymaker: false, official: true, citizen: false, superadmin: true },
  { module: 'Cadastral Vector Layer Upload (GeoJSON)', researcher: true, policymaker: false, official: true, citizen: false, superadmin: true },
  { module: 'User Management & Security Audit Logs', researcher: false, policymaker: false, official: false, citizen: false, superadmin: true },
  { module: 'Full Platform Management & Root Config', researcher: false, policymaker: false, official: false, citizen: false, superadmin: true }
];

export const CybersecurityDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 sm:p-6 lg:p-8 space-y-6 font-sans">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#0A3678] font-mono text-xs font-bold uppercase tracking-wider mb-1">
            <Shield className="w-4 h-4 text-amber-500" />
            <span>National Cyber Threat Monitoring &bull; CERT-In Guidelines</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002244]">
            Cybersecurity, Access Monitoring &amp; Audit Logs
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time security surveillance protecting national cadastral records, user sessions, and ministerial data exchanges.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>DPDP Act 2023 Compliant</span>
          </span>
        </div>
      </div>

      {/* Security Health & Threat Level Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold uppercase font-mono">National Threat Level</span>
            <Activity className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-700 font-mono">
            DEFCON 5 / NORMAL
          </div>
          <p className="text-[11px] text-slate-500">Zero Critical Vulnerabilities Active</p>
        </div>

        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold uppercase font-mono">Mitigated Threat Queries</span>
            <ShieldCheck className="w-4 h-4 text-[#0A3678]" />
          </div>
          <div className="text-2xl font-extrabold text-[#0A3678] font-mono">
            3,412 Queries
          </div>
          <p className="text-[11px] text-slate-500">DDoS &amp; SQL Injection Scrubbed</p>
        </div>

        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold uppercase font-mono">Active Secure Sessions</span>
            <UserCheck className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-blue-700 font-mono">
            128 Sessions
          </div>
          <p className="text-[11px] text-slate-500">MFA &amp; Parichay SSO Authenticated</p>
        </div>

        <div className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold uppercase font-mono">Geofenced Data Traffic</span>
            <Globe className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-purple-800 font-mono">
            99.8% IN-NIC
          </div>
          <p className="text-[11px] text-slate-500">Indian Sovereign IP Blocks</p>
        </div>

      </div>

      {/* Security Alerts Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900">Real-Time Automated Security Alerts</h3>
          </div>
          <span className="text-xs font-mono text-slate-500">Scanned Every 10 Seconds</span>
        </div>

        <div className="space-y-3 text-xs">
          {SECURITY_ALERTS.map((alt) => (
            <div key={alt.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    alt.severity === 'High' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {alt.severity} Risk
                  </span>
                  <span className="font-bold text-slate-900">{alt.title}</span>
                  <span className="text-[11px] text-slate-400 font-mono">&bull; {alt.timestamp}</span>
                </div>
                <p className="text-slate-600">{alt.detail}</p>
              </div>

              <span className="px-2.5 py-1 rounded text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                {alt.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Immutable Audit Logs Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Immutable Administrative Audit Trail</h3>
            <p className="text-xs text-slate-500">Certified by NIC GovNet security daemon.</p>
          </div>
          <span className="text-xs font-mono text-slate-400">Cryptographically Signed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-mono text-[11px]">
                <th className="py-2.5 px-3">Delegate / User</th>
                <th className="py-2.5 px-3">Official Role</th>
                <th className="py-2.5 px-3">Administrative Action</th>
                <th className="py-2.5 px-3">IP Address / GovNet Gateway</th>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {AUDIT_LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 font-bold text-slate-900">{log.user}</td>
                  <td className="py-3 px-3 text-[#0A3678] font-semibold">{log.role}</td>
                  <td className="py-3 px-3 text-slate-700">{log.action}</td>
                  <td className="py-3 px-3 font-mono text-slate-500 text-[11px]">{log.ip}</td>
                  <td className="py-3 px-3 font-mono text-slate-500 text-[11px]">{log.timestamp}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role-Based Permissions (RBAC) Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900">Role-Based Access Control (RBAC) Permissions Matrix</h3>
          <p className="text-xs text-slate-500">Fine-grained security authorization rules enforced across all platform APIs.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-mono text-[11px]">
                <th className="py-2.5 px-3">Governance Module / Function</th>
                <th className="py-2.5 px-3 text-center">Citizen</th>
                <th className="py-2.5 px-3 text-center">Researcher</th>
                <th className="py-2.5 px-3 text-center">Policymaker</th>
                <th className="py-2.5 px-3 text-center">Gov Official</th>
                <th className="py-2.5 px-3 text-center">Super Admin (Praveen)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {RBAC_MATRIX.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 font-semibold text-slate-800">{row.module}</td>
                  <td className="py-3 px-3 text-center">{row.citizen ? <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" /> : <span className="text-slate-300">&mdash;</span>}</td>
                  <td className="py-3 px-3 text-center">{row.researcher ? <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" /> : <span className="text-slate-300">&mdash;</span>}</td>
                  <td className="py-3 px-3 text-center">{row.policymaker ? <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" /> : <span className="text-slate-300">&mdash;</span>}</td>
                  <td className="py-3 px-3 text-center">{row.official ? <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" /> : <span className="text-slate-300">&mdash;</span>}</td>
                  <td className="py-3 px-3 text-center">{row.superadmin ? <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" /> : <span className="text-slate-300">&mdash;</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
