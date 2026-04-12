import { useEffect, useState } from "react";
import { getCategoriesAdmin } from "../../services/categoryService";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    getCategoriesAdmin().then((data) => { setCategories(data); setLoading(false); });
  }, []);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h4 className="fw-bold mb-0">Quản lý danh mục</h4>
        <span className="badge bg-secondary">{categories.length} danh mục</span>
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
                <th>Tên danh mục</th>
                <th>Slug</th>
                <th>Thứ tự</th>
                <th>Trạng thái</th>
                <th style={{ width: 100 }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-muted py-4">
                    Không có danh mục nào
                  </td>
                </tr>
              ) : (
                categories.map((c) => (
                  <tr key={c.id}>
                    <td className="text-muted small">{c.id}</td>
                    <td>
                      {c.image ? (
                        <img
                          src={c.image}
                          alt={c.name}
                          width={50}
                          height={50}
                          style={{ objectFit: "cover", borderRadius: 6 }}
                          onError={(e) => { e.target.style.display = "none"; }}
                        />
                      ) : (
                        <div
                          className="bg-light rounded d-flex align-items-center justify-content-center text-muted"
                          style={{ width: 50, height: 50, fontSize: 18 }}
                        >
                          <i className="bi bi-image" />
                        </div>
                      )}
                    </td>
                    <td className="fw-semibold">{c.name}</td>
                    <td>
                      <code className="text-muted small">{c.slug ?? "—"}</code>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border">{c.sort}</span>
                    </td>
                    <td>
                      <span className={`badge ${c.active ? "bg-success" : "bg-secondary"}`}>
                        {c.active ? "Hiển thị" : "Ẩn"}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        <button className="btn btn-sm btn-outline-primary" title="Sửa">
                          <i className="bi bi-pencil" />
                        </button>
                        <button className="btn btn-sm btn-outline-danger" title="Xóa">
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

export default CategoriesPage;