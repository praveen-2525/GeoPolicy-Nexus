import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

// Preloaded Demo Accounts for quick testing across all 5 required roles
export const DEMO_ACCOUNTS = {
  Admin: {
    _id: 'usr_admin_01',
    name: 'Praveen',
    email: 'admin@geopolicy.gov.in',
    role: 'Platform Administrator',
    organization: 'Ministry of Land Resources & Rural Development',
    state: 'National',
    bio: 'Platform Administrator managing National Digital Governance.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    token: 'mock_jwt_token_admin_2026'
  },
  Researcher: {
    _id: 'usr_researcher_02',
    name: 'Praveen',
    email: 'praveen@geopolicy.gov.in',
    role: 'Platform Administrator',
    organization: 'National Institute of Urban Affairs',
    state: 'Maharashtra',
    bio: 'Platform Administrator and Lead Spatial Analyst.',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150',
    token: 'mock_jwt_token_researcher_2026'
  },
  Policymaker: {
    _id: 'usr_policy_03',
    name: 'Vikramaditya Rao',
    email: 'policy@geopolicy.gov.in',
    role: 'Policymaker',
    organization: 'State Land Policy Board',
    state: 'Karnataka',
    bio: 'Principal Policy Advisor drafting land tenure reforms and digitized titling laws.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    token: 'mock_jwt_token_policymaker_2026'
  },
  Citizen: {
    _id: 'usr_citizen_04',
    name: 'Sunita Deshmukh',
    email: 'citizen@geopolicy.gov.in',
    role: 'Citizen',
    organization: 'Civil Rights & Land Owner',
    state: 'Gujarat',
    bio: 'Property owner advocating for transparent digital record verifications.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    token: 'mock_jwt_token_citizen_2026'
  },
  Institution: {
    _id: 'usr_inst_05',
    name: 'GeoSpatial Innovation Lab',
    email: 'institution@geopolicy.gov.in',
    role: 'Institution',
    organization: 'Indian Council of Social Science Research',
    state: 'Delhi',
    bio: 'Institutional repository for drone-surveyed cadastral datasets and spatial policy simulations.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
    token: 'mock_jwt_token_institution_2026'
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // Check saved session in localStorage
    const savedUser = localStorage.getItem('geopolicy_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        if (parsed.token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${parsed.token}`;
        }
      } catch (e) {
        console.error('Failed to parse saved user credentials', e);
        localStorage.removeItem('geopolicy_user');
      }
    } else {
      // Default auto-login as Admin for seamless initial demo experience
      const defaultUser = DEMO_ACCOUNTS.Admin;
      setUser(defaultUser);
      localStorage.setItem('geopolicy_user', JSON.stringify(defaultUser));
    }
    setLoading(false);
  }, []);

  // Quick switch role helper for easy multi-role testing in demo
  const switchDemoRole = (roleName) => {
    if (DEMO_ACCOUNTS[roleName]) {
      const selected = DEMO_ACCOUNTS[roleName];
      setUser(selected);
      localStorage.setItem('geopolicy_user', JSON.stringify(selected));
      axios.defaults.headers.common['Authorization'] = `Bearer ${selected.token}`;
      return selected;
    }
  };

  const login = async (email, password) => {
    setAuthError(null);
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const userData = response.data;
      setUser(userData);
      localStorage.setItem('geopolicy_user', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
      return userData;
    } catch (err) {
      console.warn('Backend login fallback to demo matching or custom user:', err.message);
      // Fallback for pre-seeded emails if backend connection unavailable
      const matchedKey = Object.keys(DEMO_ACCOUNTS).find(
        key => DEMO_ACCOUNTS[key].email.toLowerCase() === email.toLowerCase()
      );

      if (matchedKey) {
        const demoUser = DEMO_ACCOUNTS[matchedKey];
        setUser(demoUser);
        localStorage.setItem('geopolicy_user', JSON.stringify(demoUser));
        return demoUser;
      }

      // Create a transient logged-in session for custom email
      const customUser = {
        _id: 'usr_' + Date.now(),
        name: email.split('@')[0].toUpperCase(),
        email: email,
        role: 'Citizen',
        organization: 'Independent Advocate',
        state: 'National',
        bio: 'Authenticated Platform Member.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        token: 'jwt_mock_' + Date.now()
      };
      setUser(customUser);
      localStorage.setItem('geopolicy_user', JSON.stringify(customUser));
      return customUser;
    }
  };

  const register = async (formData) => {
    setAuthError(null);
    try {
      const response = await axios.post('/api/auth/register', formData);
      const userData = response.data;
      setUser(userData);
      localStorage.setItem('geopolicy_user', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
      return userData;
    } catch (err) {
      console.warn('Backend register fallback:', err.message);
      const newUser = {
        _id: 'usr_' + Date.now(),
        name: formData.name,
        email: formData.email,
        role: formData.role || 'Citizen',
        organization: formData.organization || 'Independent Enterprise',
        state: formData.state || 'National',
        bio: formData.bio || 'Registered National Delegate.',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        token: 'jwt_mock_reg_' + Date.now()
      };
      setUser(newUser);
      localStorage.setItem('geopolicy_user', JSON.stringify(newUser));
      return newUser;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('geopolicy_user');
    delete axios.defaults.headers.common['Authorization'];
  };

  const updateProfile = (updatedFields) => {
    const updated = { ...user, ...updatedFields };
    setUser(updated);
    localStorage.setItem('geopolicy_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authError,
        login,
        register,
        logout,
        updateProfile,
        switchDemoRole,
        DEMO_ACCOUNTS
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
