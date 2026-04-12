import axiosClient from './axiosInstance';

// Tạo đơn hàng từ giỏ hàng hiện tại
export const checkoutOrder = (userId) => {
    return axiosClient.post(`/api/orders/checkout/${userId}`);
};

// Lấy danh sách đơn hàng của user
export const getOrdersByUser = (userId) => {
    return axiosClient.get(`/api/orders/user/${userId}`);
};
