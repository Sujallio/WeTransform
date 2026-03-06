import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    if (user) {
      const userData = JSON.parse(user);
      if (userData.id) {
        config.headers['X-User-ID'] = userData.id;
      }
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
};

export const userAPI = {
  createProfile: (data) => api.post('/user/profile', data),
  getProfile: () => api.get('/user/profile'),
  updateSelectedAreas: (data) => api.put('/user/selected-areas', data),
  uploadPhoto: (data) => api.post('/user/upload-photo', data),
  deletePhoto: () => api.delete('/user/delete-photo'),
};

export const analysisAPI = {
  analyzePhoto: (data) => api.post('/analysis/analyze', data),
  getLatestAnalysis: () => api.get('/analysis/latest'),
  skipAnalysis: () => api.post('/analysis/skip'),
};

export const guidanceAPI = {
  generateGuidance: (data) => api.post('/guidance/generate', data),
  getGuidance: () => api.get('/guidance/my-guidance'),
  getSubscriptionStatus: () => api.get('/guidance/subscription-status'),
  upgradeSubscription: (data) => api.post('/guidance/upgrade-subscription', data),
};

export default api;
