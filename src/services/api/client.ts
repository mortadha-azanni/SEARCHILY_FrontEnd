import axios from 'axios';

const isDevelopment = import.meta.env.MODE === 'development';
const API_BASE_URL = isDevelopment ? '/api' : (import.meta.env.VITE_API_URL || 'http://localhost:8000');

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('searchily_auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for errors
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('searchily_auth_token');
      localStorage.removeItem('searchily_user_role');
      // Use BASE_URL so the redirect works on any deployment path
      window.location.href = `${import.meta.env.BASE_URL}auth`;
    }
    return Promise.reject(error);
  }
);

export const api = {
  login: async (credentials: any) => {
    const response = await client.post('/auth/login', credentials);
    return response.data;
  },

  search: async (query: string) => {
    const response = await client.post<{ task_id: string }>('/search', { query });
    return response.data;
  },

  getProfile: async () => {
    const response = await client.get('/user/profile');
    return response.data;
  }
};

export default client;
