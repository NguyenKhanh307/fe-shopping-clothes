import { useEffect, useState } from "react";
import { getOrdersAdmin } from "../../services/orderService";

const STATUS_CONFIG = {
  pending:    { label: "Chờ xử lý",  color: "warning",   text: "dark"  },
  processing: { label: "Đang xử lý", color: "primary",   text: "white" },
  shipped:    { label: "Đang giao",  color: "info",      text: "dark"  },
  delivered:  { label: "Đã giao",    color: "success",   text: "white" },
  cancelled:  { label: "Đã hủy",    color: "danger",    text: "white" },
};

const OrdersPage = () => {
  const [orders, setOrders]         = useState([]);
  const [loading, setLoading]       = useState(true);
  const [statusFilter, setStatus]   = useState("all");
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    getOrdersAdmin().then((data) => { setOrders(data); setLoading(false); });
  }, []);

  const filtered =
    statusFilter === "all"
      ? orders
      : orders.filter((o) => o.status === statusFilter);

  const totalRevenue = orders
    .filter((o) => o.status === "delivered")
    .reduce((sum, o) => sum + (parseFloat(o.totalAmount) || 0), 0);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h4 className="fw-bold mb-0">Quản lý đơn hàng</h4>
        <span className="text-muted small">
          Doanh thu đã giao: <strong className="text-success">${totalRevenue.toFixed(2)}</strong>
        </span>
      </div>

      {/* Filter tabs */}
      <div className="mb-3 d-flex flex-wrap gap-2">
        {[{ val: "all", label: "Tất cả" }, ...Object.entries(STATUS_CONFIG).map(([val, cfg]) => ({ val, label: cfg.label }))].map(
          ({ val, label }) => (
            <button
              key={val}
              onClick={() => setStatus(val)}
              className={`btn btn-sm ${statusFilter === val ? "btn-dark" : "btn-outline-secondary"}`}
            >
              {label}
              {val !== "all" && (
                <span className="ms-1 badge bg-light text-dark">
                  {orders.filter((o) => o.status === val).length}
                </span>
              )}
            </button>
          )
        )}
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
                <th style={{ width: 30 }}></th>
                <th>Mã đơn hàng</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Địa chỉ giao</th>
                <th>Ngày đặt</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-muted py-4">
                    Không có đơn hàng nào
                  </td>
                </tr>
              ) : (
                filtered.map((o) => {
                  const cfg = STATUS_CONFIG[o.status] ?? { label: o.status, color: "secondary", text: "white" };
                  const isExpanded = expandedId === o.id;

                  return (
                    <>
                      <tr key={o.id}>
                        <td>
                          <button
                            className="btn btn-sm btn-light border-0 p-0 px-1"
                            onClick={() => setExpandedId(isExpanded ? null : o.id)}
                            title={isExpanded ? "Thu gọn" : "Xem chi tiết"}
                          >
                            <i className={`bi bi-chevron-${isExpanded ? "up" : "down"}`} />
                          </button>
                        </td>
                        <td className="fw-semibold">{o.orderNumber}</td>
                        <td className="text-success fw-semibold">${o.totalAmount}</td>
                        <td>
                          <span className={`badge bg-${cfg.color} text-${cfg.text}`}>
                            {cfg.label}
                          </span>
                        </td>
                        <td className="text-muted small" style={{ maxWidth: 200 }}>
                          <span
                            title={o.shippingAddress}
                            style={{
                              display: "block",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {o.shippingAddress ?? "—"}
                          </span>
                        </td>
                        <td className="text-muted small">
                          {o.createdAt ? new Date(o.createdAt).toLocaleDateString("vi-VN") : "—"}
                        </td>
                      </tr>

                      {/* Expanded row */}
                      {isExpanded && (
                        <tr key={`${o.id}-detail`} className="table-light">
                          <td colSpan={6} className="px-4 py-3">
                            <div className="row g-2 small">
                              <div className="col-md-4">
                                <strong>Địa chỉ đầy đủ:</strong>
                                <p className="mb-0 text-muted">{o.shippingAddress ?? "—"}</p>
                              </div>
                              {o.note && (
                                <div className="col-md-4">
                                  <strong>Ghi chú:</strong>
                                  <p className="mb-0 text-muted">{o.note}</p>
                                </div>
                              )}
                              <div className="col-md-4">
                                <strong>ID đơn hàng:</strong>
                                <p className="mb-0 text-muted">#{o.id}</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;