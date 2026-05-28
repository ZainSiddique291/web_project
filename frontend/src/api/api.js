import axios from 'axios';

// const API_BASE = import.meta.env.VITE_API_URL ;
// || 'http://localhost:5000/api'
const API_BASE="https://web-project-4u08.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

export const workersApi = {
  list: (params) => api.get('/workers', { params }),
  getById: (id) => api.get(`/workers/${id}`),
};

export const statsApi = {
  getPlatform: () => api.get('/stats'),
  getSettings: () => api.get('/stats/settings'),
};

export const contactApi = {
  submit: (data) => api.post('/contact', data),
};

export const adminApi = {
  overview: () => api.get('/admin/overview'),
  users: (role) => api.get('/admin/users', { params: { role } }),
  bookings: () => api.get('/admin/bookings'),
  contacts: () => api.get('/admin/contacts'),
  settings: () => api.get('/admin/settings'),
  updateSettings: (data) => api.put('/admin/settings', data),
  updateContactStatus: (id, status) => api.patch(`/admin/contacts/${id}`, { status }),
  deleteWorker: (id) => api.delete(`/admin/workers/${id}`),
};

export const bookingsApi = {
  createRequest: (data) => api.post('/bookings', data),
  myOrders: () => api.get('/bookings/my-orders'),
  workerPanel: () => api.get('/bookings/worker'),
  workerDecision: (id, data) => api.patch(`/bookings/${id}/decision`, data),
};

export default api;
