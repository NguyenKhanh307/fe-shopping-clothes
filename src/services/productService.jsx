import axiosClient from './axiosInstance';

const productService = {
    // Lấy danh sách sản phẩm Flash Sale
    getFlashSaleProducts: () => {
        return axiosClient.get('/products/flash-sale');
    },
    // Lấy chi tiết 1 sản phẩm
    getProductById: (id) => {
        return axiosClient.get(`/products/${id}`);
    },
    // ... các hàm khác (lọc, tìm kiếm, phân trang)
};

export default productService;