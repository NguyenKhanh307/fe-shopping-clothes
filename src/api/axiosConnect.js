import axios from 'axios';

// Kết nối API dùng chung cho toàn bộ app
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor request: thêm token nếu có
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('zenis_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor response: lấy message lỗi từ backend
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Đã xảy ra lỗi không xác định.';
    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;