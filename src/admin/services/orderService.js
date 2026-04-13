import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/orders`;

const STATUS_LABEL = {
  pending:    "Chờ xử lý",
  processing: "Đang xử lý",
  shipped:    "Đang giao",
  delivered:  "Đã giao",
  cancelled:  "Đã hủy",
};

export const getOrdersAdmin = async () => {
  try {
    const res  = await axios.get(API);
    const data = res.data?.content ?? res.data ?? [];

    return data.map((o) => ({
      id:              o.id,
      orderNumber:     o.order_number,
      totalAmount:     o.total_amount,
      status:          o.status,
      statusLabel:     STATUS_LABEL[o.status] ?? o.status,
      shippingAddress: o.shipping_address,
      note:            o.note,
      createdAt:       o.created_at,
    }));
  } catch (error) {
    console.error("Lỗi orders:", error.response?.data || error);
    return [];
  }
};