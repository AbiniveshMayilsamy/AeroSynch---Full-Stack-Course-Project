import axios from 'axios';

const API_URL = 'http://localhost:9000/api/auth';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('airline_scm_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  async login(credentials) {
    const response = await api.post('/login', credentials);
    return response.data;
  },

  async register(userData) {
    const response = await api.post('/register', userData);
    return response.data;
  },

  async getCurrentUser() {
    const response = await api.get('/me');
    return response.data;
  }
};