import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  withCredentials: true,
});

const API = '/api/posts';

export const postService = {
  getPosts: () => api.get(API),
  createPost: (data) => api.post(API, data),
  likePost: (id) => api.put(`${API}/${id}/like`),
  commentPost: (id, text) => api.post(`${API}/${id}/comment`, { text }),
  deletePost: (id) => api.delete(`${API}/${id}`),
};
