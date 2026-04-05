// import axios from 'axios';

// // Kết nối API dùng chung cho toàn bộ app
// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   timeout: 10000,
//   headers: { 'Content-Type': 'application/json' },
// });

// // Interceptor request thêm token nếu cần
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // const token = localStorage.getItem('token');
//     // if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Interceptor response xử lý lỗi tập trung
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Xử lý 401, 403, 500...
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;