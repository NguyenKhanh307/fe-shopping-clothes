import axiosInstance from './axiosConnect';

// ─── Auth API ────────────────────────────────────────────────────────────────
export const loginUser = (email, password) =>
  axiosInstance.post('/api/auth/login', { email, password });

export const registerUser = (data) =>
  axiosInstance.post('/api/auth/register', data);

// ─── Product API ──────────────────────────────────────────────────────────────
export const getProductById = (id) => axiosInstance.get(`/products/${id}`);
export const getFlashSaleProducts = () => axiosInstance.get('/products/flash-sale');
export const getTrendingProducts = (category = 'western') => axiosInstance.get(`/products/trending?category=${category}`);
export const getBestSellingProducts = () => axiosInstance.get('/products/best-selling');
export const getNewArrivalProducts = () => axiosInstance.get('/products/new-arrivals');
export const getFavouriteProducts = () => axiosInstance.get('/products/favourite');
export const getSpecialProducts = () => axiosInstance.get('/products/special');

// export const getUsers = () => api.get('/users');
// export const getUserById = (id) => api.get(`/users/${id}`);
// export const createUser = (data) => api.post('/users', data);
// export const updateUser = (id, data) => api.patch(`/users/${id}`, data);
// export const deleteUser = (id) => api.delete(`/users/${id}`);