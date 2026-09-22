import React from 'react';
import { ShieldCheck, GraduationCap, Gavel, User, Building2 } from 'lucide-react';

const roleConfig = {
  Admin: {
    color: 'bg-purple-100 text-purple-800 border-purple-300',
    icon: ShieldCheck,
    label: 'Platform Admin'
  },
  Researcher: {
    color: 'bg-blue-100 text-blue-800 border-blue-300',
    icon: GraduationCap,
    label: 'Research Fellow'
  },
  Policymaker: {
    color: 'bg-amber-100 text-amber-800 border-amber-300',
    icon: Gavel,
    label: 'Policymaker'
  },
  Citizen: {
    color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    icon: User,
    label: 'Citizen Delegate'
  },
  Institution: {
    color: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    icon: Building2,
    label: 'Institutional Partner'
  }
};

export const RoleBadge = ({ role = 'Citizen', showIcon = true, size = 'normal' }) => {
  const config = roleConfig[role] || roleConfig.Citizen;
  const IconComponent = config.icon;

  const sizeClasses = size === 'small' 
    ? 'px-2 py-0.5 text-xs' 
    : 'px-3 py-1 text-xs font-semibold';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${config.color} ${sizeClasses} shadow-xs`}>
      {showIcon && <IconComponent className="w-3.5 h-3.5" />}
      <span>{role}</span>
    </span>
  );
};
