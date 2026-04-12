import { Link, useLocation } from "react-router-dom";

export default function AdminLayout({ children }) {
  const location = useLocation();

  const menu = [
    { name: "Trang tổng quan", path: "/admin", icon: "bi-speedometer2" },
    { name: "Sản phẩm", path: "/admin/products", icon: "bi-box-seam" },
    { name: "Danh mục", path: "/admin/categories", icon: "bi-tags" },
    { name: "Đơn hàng", path: "/admin/orders", icon: "bi-receipt" },
  ];

  return (
    <div className="d-flex">
      {/* SIDEBAR */}
      <div
        className="bg-dark text-white p-3"
        style={{ width: "260px", minHeight: "100vh" }}
      >
        <h4 className="text-center mb-4 fw-bold">ADMIN</h4>

        <ul className="nav flex-column gap-2">
          {menu.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link d-flex align-items-center gap-2 px-3 py-2 rounded ${
                    isActive ? "bg-primary text-white" : "text-white"
                  }`}
                  style={{
                    transition: "0.2s",
                  }}
                >
                  <i className={`bi ${item.icon}`}></i>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* MAIN */}
      <div className="flex-grow-1 bg-light">
        {/* HEADER */}
        <div className="bg-white shadow-sm p-3 d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Trang quản trị</h5>

          <div>
            <span className="me-3">Xin chào, Admin</span>
            <button className="btn btn-outline-danger btn-sm">
              Đăng xuất
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}