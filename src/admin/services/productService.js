import axios from "axios";

const BASE = `${import.meta.env.VITE_API_URL}/products`;

// Lấy tất cả sản phẩm bằng cách gộp các endpoint hiện có
export const getProductsAdmin = async () => {
  try {
    const [bestSelling, flashSale, newArrivals, favourite, special] =
      await Promise.allSettled([
        axios.get(`${BASE}/best-selling`),
        axios.get(`${BASE}/flash-sale`),
        axios.get(`${BASE}/new-arrivals`),
        axios.get(`${BASE}/favourite`),
        axios.get(`${BASE}/special`),
      ]);

    const collect = (result) =>
      result.status === "fulfilled" ? result.value.data ?? [] : [];

    const all = [
      ...collect(bestSelling),
      ...collect(flashSale),
      ...collect(newArrivals),
      ...collect(favourite),
      ...collect(special),
    ];

    // Loại bỏ trùng lặp theo id
    const unique = [...new Map(all.map((p) => [p.id, p])).values()];

    return unique.map((p) => ({
      id:              p.id,
      name:            p.name,
      imageUrl:        p.image_url,
      salePrice:       p.sale_price,
      originalPrice:   p.original_price,
      discountPercent: p.discount_percent,
      stock:           p.stock,
      rating:          p.rating,
      reviewsCount:    p.reviews_count,
      isNew:           p.is_new,
      isActive:        p.is_active,
      createdAt:       p.created_at,
    }));
  } catch (error) {
    console.error("Lỗi product:", error);
    return [];
  }
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(`${BASE}/${id}`);
  return res.status === 204;
};