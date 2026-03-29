import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  withCredentials: true,
});

const API = '/api/users';

export const authService = {
  signup: (data) => api.post(`${API}/signup`, data),
  login: (data) => api.post(`${API}/login`, data),
  getProfile: () => api.get(`${API}/profile`),
  updateProfile: (data) => api.put(`${API}/profile`, data),
};
