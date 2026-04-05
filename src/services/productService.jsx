import axiosClient from './axiosInstance';

// ─────────────────────────────────────────────────────────────
// Mapper: chuẩn hoá field từ BE (snake_case / camelCase) → UI
// ─────────────────────────────────────────────────────────────
const mapProduct = (p) => ({
    ...p,
    // Ảnh: BE Spring trả camelCase (imageUrl), nhưng ProductCard dùng .image
    image:          p.imageUrl        ?? p.image_url        ?? p.image        ?? '',
    salePrice:      p.salePrice       ?? p.sale_price       ?? 0,
    originalPrice:  p.originalPrice   ?? p.original_price   ?? null,
    discountPercent:p.discountPercent ?? p.discount_percent ?? null,
    isNew:          p.isNew           ?? p.is_new           ?? false,
    reviewsCount:   p.reviewsCount    ?? p.reviews_count    ?? 0,
    // colors: BE có thể trả [{hexCode:"#DB4437",...}] hoặc ["#DB4437",...]
    colors: Array.isArray(p.colors)
        ? p.colors.map(c => (typeof c === 'string' ? c : c.hexCode ?? c.hex_code ?? ''))
        : [],
});

const productService = {
    // Flash Sale — trang chủ section FlashSale
    getFlashSaleProducts: () =>
        axiosClient.get('/products/flash-sale').then(res => res.data.map(mapProduct)),

    // Trending — tab: western | tops | bags | shoes
    getTrendingProducts: (category = 'western') =>
        axiosClient.get('/products/trending', { params: { category } }).then(res => res.data.map(mapProduct)),

    // Best Selling — section BestSelling
    getBestSellingProducts: () =>
        axiosClient.get('/products/best-selling').then(res => res.data.map(mapProduct)),

    // Favourite — section FavouriteProducts
    getFavouriteProducts: () =>
        axiosClient.get('/products/favourite').then(res => res.data.map(mapProduct)),

    // New Arrivals — section NewArrival
    getNewArrivalProducts: () =>
        axiosClient.get('/products/new-arrivals').then(res => res.data.map(mapProduct)),

    // Special — section SpecialProducts
    getSpecialProducts: () =>
        axiosClient.get('/products/special').then(res => res.data.map(mapProduct)),

    // Chi tiết 1 sản phẩm
    getProductById: (id) =>
        axiosClient.get(`/products/${id}`).then(res => mapProduct(res.data)),
};

export default productService;