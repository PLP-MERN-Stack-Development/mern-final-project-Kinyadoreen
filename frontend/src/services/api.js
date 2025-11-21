import axios from 'axios';
import { useAuthStore } from '../store/authStore.js';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  (config) => {
    const { token } = useAuthStore.getState();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const api = {
  // Auth
  async login(email, password) {
    const { data } = await apiClient.post('/auth/login', { email, password });
    return data;
  },

  async register(userData) {
    const { data } = await apiClient.post('/auth/register', userData);
    return data;
  },

  // Courses
  async getCourses(params) {
    const { data } = await apiClient.get('/courses', { params });
    return data;
  },

  async getCourse(id) {
    const { data } = await apiClient.get(`/courses/${id}`);
    return data;
  },

  async createCourse(courseData) {
    const { data } = await apiClient.post('/courses', courseData);
    return data;
  },

  async updateCourse(id, courseData) {
    const { data } = await apiClient.put(`/courses/${id}`, courseData);
    return data;
  },

  async deleteCourse(id) {
    const { data } = await apiClient.delete(`/courses/${id}`);
    return data;
  },

  async enrollCourse(id) {
    const { data } = await apiClient.post(`/courses/${id}/enroll`);
    return data;
  },

  // Dashboard
  async getDashboard() {
    const { data } = await apiClient.get('/dashboard');
    return data;
  },
};

export default apiClient;
