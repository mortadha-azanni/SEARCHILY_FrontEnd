import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

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
  search: async (query: string) => {
    const response = await client.post<{ task_id: string }>('/search', { query });
    return response.data;
  },
  
  getTaskStatus: async (taskId: string) => {
    const response = await client.get(`/search/status/${taskId}`);
    return response.data;
  },

  getProfile: async () => {
    const response = await client.get('/user/profile');
    return response.data;
  }
};

export default client;
