import axios from 'axios';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
  });

// Thêm interceptors để xử lý token hoặc lỗi chung (nếu cần)
// axiosClient.interceptors.response.use(
//     (response) => {
//         if (response && response.data) {
//             return response.data; // Trả về data luôn cho tiện
//         }
//         return response;
//     },
//     (error) => {
//         // Xử lý lỗi toàn cục (ví dụ: show toast error)
//         console.error('API Error:', error);
//         throw error;
//     }
// );

export default axiosClient;

// import axios from 'axios';

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });

// export const getUsers = () => api.get('/users');
// export const getUserById = (id) => api.get(`/users/${id}`);
// export const createUser = (data) => api.post('/users', data);
// export const updateUser = (id, data) => api.patch(`/users/${id}`, data);
// export const deleteUser = (id) => api.delete(`/users/${id}`);