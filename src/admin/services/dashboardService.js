import axios from "axios";

const BASE = import.meta.env.VITE_API_URL;

export const getDashboardData = async () => {
  try {
    const [bestSelling, flashSale, newArrivals, favourite, special, categories, orders] =
      await Promise.allSettled([
        axios.get(`${BASE}/products/best-selling`),
        axios.get(`${BASE}/products/flash-sale`),
        axios.get(`${BASE}/products/new-arrivals`),
        axios.get(`${BASE}/products/favourite`),
        axios.get(`${BASE}/products/special`),
        axios.get(`${BASE}/categories`),
        axios.get(`${BASE}/api/orders`),
      ]);

    const safeLen = (result) =>
      result.status === "fulfilled" ? (result.value.data?.length ?? 0) : 0;

    const allProducts = [
      ...(bestSelling.status === "fulfilled" ? bestSelling.value.data : []),
      ...(flashSale.status   === "fulfilled" ? flashSale.value.data   : []),
      ...(newArrivals.status === "fulfilled" ? newArrivals.value.data : []),
      ...(favourite.status   === "fulfilled" ? favourite.value.data   : []),
      ...(special.status     === "fulfilled" ? special.value.data     : []),
    ];
    const uniqueProducts = [...new Map(allProducts.map((p) => [p.id, p])).values()];

    const orderList =
      orders.status === "fulfilled"
        ? orders.value.data?.content ?? orders.value.data ?? []
        : [];

    const pendingOrders   = orderList.filter((o) => o.status === "pending").length;
    const deliveredOrders = orderList.filter((o) => o.status === "delivered").length;
    const revenue         = orderList
      .filter((o) => o.status === "delivered")
      .reduce((sum, o) => sum + (parseFloat(o.total_amount) || 0), 0);

    return {
      totalProducts:    uniqueProducts.length,
      totalCategories:  safeLen(categories),
      totalOrders:      orderList.length,
      pendingOrders,
      deliveredOrders,
      flashSaleCount:   safeLen(flashSale),
      newArrivalsCount: safeLen(newArrivals),
      revenue:          revenue.toFixed(2),
    };
  } catch (error) {
    console.error("Dashboard error:", error);
    return {
      totalProducts: 0, totalCategories: 0, totalOrders: 0,
      pendingOrders: 0, deliveredOrders: 0,
      flashSaleCount: 0, newArrivalsCount: 0, revenue: "0.00",
    };
  }
};