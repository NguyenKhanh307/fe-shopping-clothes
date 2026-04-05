import axiosClient from './axiosInstance';

// Mapper: chuẩn hoá field category từ BE → UI
const mapCategory = (c) => ({
    ...c,
    // CategorySlider & Category.jsx dùng .image và .img
    image: c.imageUrl ?? c.image_url ?? c.image ?? '',
    img:   c.imageUrl ?? c.image_url ?? c.image ?? '',
    // Link mặc định dẫn đến shop lọc theo slug
    link: `/shop?category=${c.slug ?? c.id}`,
});

const categoryService = {
    // Tất cả danh mục — dùng cho CategorySlider (trang chủ) và Category page
    getAllCategories: () =>
        axiosClient.get('/categories').then(res => res.data.map(mapCategory)),
};

export default categoryService;
