import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // 10-second timeout safety guard
});

// Request Interceptor: Automatically inject auth tokens if your client needs them later
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Centralized global error handler fallback
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Catch common api fallback issues instantly
    if (error.response) {
      console.error(`API Error (${error.response.status}):`, error.response.data);
    } else if (error.request) {
      console.error('Network Error: No response received from Laravel engine.', error.request);
    } else {
      console.error('Configuration Request Setup Fault:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;