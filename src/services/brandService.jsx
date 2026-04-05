import axiosClient from './axiosInstance';

// Mapper: chuẩn hoá field brand từ BE → UI
const mapBrand = (b) => ({
    ...b,
    // Brand.jsx & Brands.jsx dùng .image
    image: b.logoUrl ?? b.logo_url ?? b.image ?? '',
    // Link mặc định
    link: `/shop?brand=${b.id}`,
});

const brandService = {
    // Tất cả thương hiệu — dùng cho Brands slider (trang chủ) và Brand page
    getAllBrands: () =>
        axiosClient.get('/brands').then(res => res.data.map(mapBrand)),
};

export default brandService;
