import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/categories`;

export const getCategoriesAdmin = async () => {
  try {
    const res = await axios.get(API);

    return res.data.map((c) => ({
      id:     c.id,
      name:   c.name,
      slug:   c.slug,
      image:  c.image_url,
      active: c.is_active,
      sort:   c.sort_order,
    }));
  } catch (error) {
    console.error("Lỗi categories:", error);
    return [];
  }
};