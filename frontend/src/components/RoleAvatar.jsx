import React from 'react';
import { ShieldCheck, GraduationCap, Award, Building2, User } from 'lucide-react';

export const RoleAvatar = ({ role, name, className = '', size = 'md' }) => {
  const getRoleConfig = (roleName) => {
    switch (roleName) {
      case 'Super Admin':
        return {
          icon: ShieldCheck,
          bg: 'bg-gradient-to-br from-purple-700 via-purple-900 to-indigo-950 text-purple-200 border-purple-400',
        };
      case 'Researcher':
        return {
          icon: GraduationCap,
          bg: 'bg-gradient-to-br from-blue-700 via-indigo-900 to-slate-950 text-blue-200 border-blue-400',
        };
      case 'Policymaker':
        return {
          icon: Award,
          bg: 'bg-gradient-to-br from-amber-600 via-amber-800 to-slate-950 text-amber-200 border-amber-400',
        };
      case 'Government Official':
        return {
          icon: Building2,
          bg: 'bg-gradient-to-br from-emerald-700 via-emerald-900 to-slate-950 text-emerald-200 border-emerald-400',
        };
      case 'Citizen':
      default:
        return {
          icon: User,
          bg: 'bg-gradient-to-br from-teal-600 via-cyan-800 to-slate-950 text-cyan-200 border-teal-400',
        };
    }
  };

  const config = getRoleConfig(role);
  const IconComponent = config.icon;

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-16 h-16',
  };

  const iconSizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-8 h-8',
  };

  return (
    <div
      className={`rounded-full flex items-center justify-center font-bold border shrink-0 shadow-md ${config.bg} ${sizeClasses[size] || sizeClasses.md} ${className}`}
      title={`${name || 'User'} (${role || 'Role'})`}
    >
      <IconComponent className={iconSizeClasses[size] || iconSizeClasses.md} />
    </div>
  );
};

export default RoleAvatar;
