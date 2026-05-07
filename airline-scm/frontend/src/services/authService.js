import axios from 'axios';
import { storage } from '../utils/localStorage';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:9000/api',
});

// Attach token from correct storage key
api.interceptors.request.use((config) => {
  const token = storage.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth services
export const authService = {
  login: (data) => api.post('/auth/login', data).then(r => r.data),
  register: (data) => api.post('/auth/register', data).then(r => r.data),
  getCurrentUser: () => api.get('/auth/me').then(r => r.data),
};

// Inventory services
export const inventoryService = {
  getAll: () => api.get('/inventory').then(r => r.data),
  getOne: (id) => api.get(`/inventory/${id}`).then(r => r.data),
  create: (data) => api.post('/inventory', data).then(r => r.data),
  update: (id, data) => api.put(`/inventory/${id}`, data).then(r => r.data),
  remove: (id) => api.delete(`/inventory/${id}`).then(r => r.data),
};

// Supplier services
export const supplierService = {
  getAll: () => api.get('/suppliers').then(r => r.data),
  getOne: (id) => api.get(`/suppliers/${id}`).then(r => r.data),
  create: (data) => api.post('/suppliers', data).then(r => r.data),
  update: (id, data) => api.put(`/suppliers/${id}`, data).then(r => r.data),
  remove: (id) => api.delete(`/suppliers/${id}`).then(r => r.data),
};

// Order services
export const orderService = {
  getAll: () => api.get('/orders').then(r => r.data),
  getOne: (id) => api.get(`/orders/${id}`).then(r => r.data),
  create: (data) => api.post('/orders', data).then(r => r.data),
  update: (id, data) => api.put(`/orders/${id}`, data).then(r => r.data),
  remove: (id) => api.delete(`/orders/${id}`).then(r => r.data),
};

// Dashboard services
export const dashboardService = {
  getStats: () => api.get('/dashboard').then(r => r.data),
};

// User management (admin only)
export const userService = {
  getAll: () => api.get('/users').then(r => r.data),
  update: (id, data) => api.put(`/users/${id}`, data).then(r => r.data),
  remove: (id) => api.delete(`/users/${id}`).then(r => r.data),
};

export default api;