import axiosClient from './axiosInstance';

export const getCart = (userId) => {
    return axiosClient.get(`/api/cart/${userId}`);
};

export const addToCart = (userId, productId, quantity, color) => {
    return axiosClient.post('/api/cart/add', {
        userId,
        productId,
        quantity,
        color
    });
};

export const updateQuantity = (itemId, quantity) => {
    return axiosClient.put(`/api/cart/update?itemId=${itemId}&quantity=${quantity}`);
};

export const removeItem = (itemId) => {
    return axiosClient.delete(`/api/cart/${itemId}`);
};

export const clearCart = (userId) => {
    return axiosClient.delete(`/api/cart/clear/${userId}`);
};
