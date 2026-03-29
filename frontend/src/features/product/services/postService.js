import axios from 'axios';

const API = '/api/posts';

export const postService = {
  getPosts: () => axios.get(API),
  createPost: (data) => axios.post(API, data),
  likePost: (id) => axios.put(`${API}/${id}/like`),
  commentPost: (id, text) => axios.post(`${API}/${id}/comment`, { text }),
  deletePost: (id) => axios.delete(`${API}/${id}`),
};
