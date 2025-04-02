import axios from 'axios';

const API_BASE_URL = import.meta?.env?.VITE_API_BASE_URL || 'http://ara-hovsepyan.com/api';

const baseConfig = {
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
};
export const api = axios.create({
  ...baseConfig,
  baseURL: API_BASE_URL,
});

export const admin = axios.create({
  ...baseConfig,
  baseURL: API_BASE_URL + '/admin',
});

const errorInterceptor = (error) => {
  if (error.response) {
    return Promise.reject(
      error.response.data || {
        error: 'Unknown server error',
      },
    );
  }
  return Promise.reject({
    error: 'Network error or no response from server',
  });
};

[api, admin, axios].forEach((instance) => {
  instance.interceptors.response.use((response) => response, errorInterceptor);
});

// Add authentication token dynamically for admin requests
// admin.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token'); // Get token
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`; // Attach token
//   }
//   return config;
// });

export default { api, admin };
