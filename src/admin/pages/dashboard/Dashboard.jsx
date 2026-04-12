import { useEffect, useState } from "react";
import { getDashboardData } from "../../services/dashboardService";

const statCards = [
  { key: "totalProducts",    label: "Tổng sản phẩm",   icon: "bi-box-seam",       color: "primary" },
  { key: "totalCategories",  label: "Danh mục",         icon: "bi-tags",           color: "info"    },
  { key: "totalOrders",      label: "Tổng đơn hàng",   icon: "bi-receipt",        color: "success" },
  { key: "pendingOrders",    label: "Chờ xử lý",        icon: "bi-hourglass-split",color: "warning" },
  { key: "deliveredOrders",  label: "Đã giao",          icon: "bi-check-circle",   color: "success" },
  { key: "flashSaleCount",   label: "Flash Sale",       icon: "bi-lightning-charge",color: "danger" },
  { key: "newArrivalsCount", label: "Hàng mới về",      icon: "bi-stars",          color: "info"    },
  { key: "revenue",          label: "Doanh thu (đã giao)", icon: "bi-currency-dollar", color: "dark", prefix: "$" },
];

const DashboardPage = () => {
  const [data, setData]       = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardData().then((d) => { setData(d); setLoading(false); });
  }, []);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h4 className="fw-bold mb-0">Trang tổng quan</h4>
        <span className="text-muted small">
          {new Date().toLocaleDateString("vi-VN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </span>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2 text-muted">Đang tải dữ liệu...</p>
        </div>
      ) : (
        <div className="row g-3">
          {statCards.map(({ key, label, icon, color, prefix }) => (
            <div key={key} className="col-6 col-md-3">
              <div className={`card border-0 shadow-sm h-100`}>
                <div className="card-body d-flex align-items-center gap-3 p-3">
                  <div
                    className={`rounded-3 d-flex align-items-center justify-content-center bg-${color} bg-opacity-10`}
                    style={{ width: 52, height: 52, flexShrink: 0 }}
                  >
                    <i className={`bi ${icon} fs-4 text-${color}`} />
                  </div>
                  <div>
                    <div className="text-muted small">{label}</div>
                    <div className="fw-bold fs-5">
                      {prefix ?? ""}{data[key] ?? 0}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;