import axios from 'axios';

const API = '/api/users';

export const authService = {
  signup: (data) => axios.post(`${API}/signup`, data),
  login: (data) => axios.post(`${API}/login`, data),
  getProfile: () => axios.get(`${API}/profile`),
  updateProfile: (data) => axios.put(`${API}/profile`, data),
};
