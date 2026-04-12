import { useEffect, useState } from "react";
import { getProductsAdmin, deleteProduct } from "../../services/productService";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");

  const load = () => {
    setLoading(true);
    getProductsAdmin().then((data) => { setProducts(data); setLoading(false); });
  };

  useEffect(load, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Xóa sản phẩm "${name}"?`)) return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Xóa thất bại. Vui lòng thử lại.");
    }
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h4 className="fw-bold mb-0">Quản lý sản phẩm</h4>
        <span className="badge bg-secondary">{filtered.length} sản phẩm</span>
      </div>

      {/* Search */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Tìm theo tên sản phẩm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: 360 }}
        />
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2 text-muted">Đang tải...</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle bg-white shadow-sm rounded">
            <thead className="table-dark">
              <tr>
                <th style={{ width: 50 }}>ID</th>
                <th style={{ width: 70 }}>Ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Giá bán</th>
                <th>Giá gốc</th>
                <th>Giảm</th>
                <th>Tồn kho</th>
                <th>Đánh giá</th>
                <th>Mới</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th style={{ width: 100 }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={12} className="text-center text-muted py-4">
                    Không có sản phẩm nào
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id}>
                    <td className="text-muted small">{p.id}</td>
                    <td>
                      {p.imageUrl ? (
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          width={55}
                          height={55}
                          style={{ objectFit: "cover", borderRadius: 6 }}
                          onError={(e) => { e.target.style.display = "none"; }}
                        />
                      ) : (
                        <div
                          className="bg-light rounded d-flex align-items-center justify-content-center text-muted"
                          style={{ width: 55, height: 55, fontSize: 20 }}
                        >
                          <i className="bi bi-image" />
                        </div>
                      )}
                    </td>
                    <td>
                      <span className="fw-semibold">{p.name}</span>
                    </td>
                    <td className="text-success fw-semibold">${p.salePrice}</td>
                    <td className="text-muted">
                      {p.originalPrice ? (
                        <s>${p.originalPrice}</s>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                    <td>
                      {p.discountPercent ? (
                        <span className="badge bg-danger">{p.discountPercent}%</span>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          p.stock === 0
                            ? "bg-danger"
                            : p.stock < 10
                            ? "bg-warning text-dark"
                            : "bg-success"
                        }`}
                      >
                        {p.stock}
                      </span>
                    </td>
                    <td>
                      <i className="bi bi-star-fill text-warning me-1" />
                      {p.rating ?? "—"}
                      <span className="text-muted small ms-1">({p.reviewsCount ?? 0})</span>
                    </td>
                    <td>
                      {p.isNew ? (
                        <span className="badge bg-info text-dark">Mới</span>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                    <td>
                      <span className={`badge ${p.isActive ? "bg-success" : "bg-secondary"}`}>
                        {p.isActive ? "Hiển thị" : "Ẩn"}
                      </span>
                    </td>
                    <td className="text-muted small">
                      {p.createdAt ? new Date(p.createdAt).toLocaleDateString("vi-VN") : "—"}
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        <button className="btn btn-sm btn-outline-primary" title="Sửa">
                          <i className="bi bi-pencil" />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          title="Xóa"
                          onClick={() => handleDelete(p.id, p.name)}
                        >
                          <i className="bi bi-trash" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;