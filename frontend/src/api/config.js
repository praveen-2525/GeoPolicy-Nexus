import axios from 'axios';

/**
 * Central API Configuration for GeoPolicy Nexus
 * Deployed Backend: https://geopolicy-nexus-backend.onrender.com
 */

// Retrieve backend URL from environment variables, defaulting to the production Render deployment
export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'https://geopolicy-nexus-backend.onrender.com'
).replace(/\/+$/, '');

// Set default baseURL on global axios instance as well
axios.defaults.baseURL = API_BASE_URL;

/**
 * Production-ready Axios instance configured with CORS headers, timeouts, and auth interceptors
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 20000 // 20s timeout to accommodate Render free tier spin-up delays
});

// Request interceptor: Attach JWT token from localStorage if present
apiClient.interceptors.request.use(
  (config) => {
    try {
      const savedUser = localStorage.getItem('geopolicy_gov_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed && parsed.token) {
          config.headers['Authorization'] = `Bearer ${parsed.token}`;
          axios.defaults.headers.common['Authorization'] = `Bearer ${parsed.token}`;
        }
      }
    } catch (e) {
      console.warn('[API Interceptor] Token retrieval warning:', e);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Global response processing and error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('[API Interceptor] 401 Unauthorized - Authentication required');
    }
    return Promise.reject(error);
  }
);

// Central API Endpoints registry
export const ENDPOINTS = {
  // Auth
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  GENERATE_OTP: '/api/auth/generate-otp',
  VERIFY_OTP: '/api/auth/verify-otp',
  LOGOUT: '/api/auth/logout',
  PROFILE: '/api/auth/profile',

  // Modules
  RESEARCH: '/api/research',
  POLICIES: '/api/policies',
  POLICY_SIMULATE: '/api/policies/simulate',
  DATASETS: '/api/datasets',
  USERS: '/api/users',
  CHAT: '/api/chat',
  AI_CONSULT: '/api/ai/consult',

  // Administrative Boundaries
  BOUNDARIES_STATES: '/api/boundaries/states',
  BOUNDARIES_DISTRICTS: '/api/boundaries/districts',
  BOUNDARIES_SUBDISTRICTS: '/api/boundaries/subdistricts',
  BOUNDARIES_VILLAGES: '/api/boundaries/villages',
  BOUNDARIES_CITIES: '/api/boundaries/cities',
  BOUNDARIES_VILLAGES_BY_DISTRICT: '/api/boundaries/villages-by-district'
};

export default apiClient;
