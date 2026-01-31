import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authAPI = {
  signup: (name, email, password) =>
    api.post('/auth/signup', { name, email, password }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  requestPasswordReset: (email) =>
    api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) =>
    api.post('/auth/reset-password', { token, password }),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

// Chat endpoints
export const chatAPI = {
  createChat: (title) =>
    api.post('/chat/create', { title }),
  getChats: () =>
    api.get('/chat/list'),
  getChat: (chatId) =>
    api.get(`/chat/${chatId}`),
  deleteChat: (chatId) =>
    api.delete(`/chat/${chatId}`),
  updateChatTitle: (chatId, title) =>
    api.put(`/chat/${chatId}`, { title }),
  sendMessage: (chatId, content) =>
    api.post(`/chat/${chatId}/message`, { content }),
  regenerateMessage: (chatId, messageId) =>
    api.post(`/chat/${chatId}/regenerate/${messageId}`),
};

export default api;
