import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageBanner from '../components/common/PageBanner';
import { useAuth } from '../context/AuthContext';
import { getOrdersByUser } from '../services/orderService';

const ZENIS_COLORS = {
    primary: '#FFB100',
    dark: '#1A1D23',
};

const STATUS_MAP = {
    pending:   { label: 'Chờ xử lý',     color: '#f59e0b', bg: '#fef3c7' },
    processing:{ label: 'Đang xử lý',     color: '#6366f1', bg: '#e0e7ff' },
    shipped:   { label: 'Đang giao hàng',  color: '#3b82f6', bg: '#dbeafe' },
    delivered: { label: 'Đã giao hàng',  color: '#10b981', bg: '#d1fae5' },
    cancelled: { label: 'Đã hủy',        color: '#ef4444', bg: '#fee2e2' },
};

const formatVND = (num) => {
    if (num == null) return '—';
    return Number(num).toLocaleString('vi-VN') + '₫';
};

const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

const DashboardOrder = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const breadcrumbData = [
        { label: 'Trang chủ', link: '/' },
        { label: 'Bảng điều khiển', link: '/dashboard' },
        { label: 'Đơn hàng', link: null },
    ];

    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedOrder, setExpandedOrder] = useState(null);

    // Redirect nếu chưa đăng nhập
    useEffect(() => {
        if (!user) navigate('/sign-in', { state: { from: '/dashboard-order' } });
    }, [user, navigate]);

    // Fetch danh sách đơn hàng
    useEffect(() => {
        if (!user?.id) return;
        setIsLoading(true);
        getOrdersByUser(user.id)
            .then(res => setOrders(res.data || []))
            .catch(err => console.error('Lỗi tải đơn hàng:', err))
            .finally(() => setIsLoading(false));
    }, [user]);

    const handleLogout = () => { logout(); navigate('/'); };

    return (
        <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', paddingBottom: '50px' }}>
            <PageBanner title="Đơn Hàng Của Tôi" breadcrumb={breadcrumbData} />

            <section className="dashboard mt_100">
                <div className="container">
                    <div className="row g-4">

                        {/* ===== CỘT TRÁI: MENU ===== */}
                        <div className="col-xl-3 col-lg-4">
                            <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
                                <div className="text-center p-4" style={{ backgroundColor: ZENIS_COLORS.dark, color: 'white' }}>
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.full_name || 'U')}&background=FFB100&color=fff&size=128`}
                                        className="rounded-circle border border-4 border-dark-subtle shadow-sm"
                                        alt="user" width="90"
                                    />
                                    <h5 className="mt-3 mb-1 fw-bold text-white">{user?.full_name || 'Người dùng'}</h5>
                                    <span className="badge" style={{ backgroundColor: ZENIS_COLORS.primary, color: ZENIS_COLORS.dark }}>
                                        {user?.role === 'admin' ? 'Quản trị viên' : 'Thành viên'}
                                    </span>
                                </div>
                                <div className="list-group list-group-flush p-2 bg-white">
                                    <MenuLink to="/dashboard" icon="fa-table-cells-large" label="Bảng Điều Khiển" />
                                    <MenuLink to="/dashboard-profile" icon="fa-user" label="Hồ Sơ Cá Nhân" />
                                    <MenuLink to="/dashboard-order" icon="fa-box" label="Đơn Hàng" active />
                                    <MenuLink to="/wishlist" icon="fa-heart" label="Yêu Thích" />
                                    <hr className="my-2 opacity-10" />
                                    <button
                                        onClick={handleLogout}
                                        className="list-group-item list-group-item-action d-flex align-items-center gap-3 px-3 py-3 border-0 rounded-2 mb-1 text-danger mt-2"
                                        style={{ background: 'none', cursor: 'pointer' }}
                                    >
                                        <i className="fa-solid fa-arrow-right-from-bracket" style={{ width: '20px' }}></i>
                                        <span style={{ fontSize: '0.95rem' }}>Đăng Xuất</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* ===== CỘT PHẢI: DANH SÁCH ĐƠN HÀNG ===== */}
                        <div className="col-xl-9 col-lg-8">
                            <div className="card border-0 shadow-sm rounded-3 p-4 bg-white">
                                <h5 className="fw-bold mb-4 border-start border-4 ps-3" style={{ borderColor: ZENIS_COLORS.primary }}>
                                    LỊCH SỬ ĐƠN HÀNG
                                    <span className="badge ms-2 rounded-pill" style={{ backgroundColor: ZENIS_COLORS.primary, color: ZENIS_COLORS.dark, fontSize: '0.75rem' }}>
                                        {orders.length}
                                    </span>
                                </h5>

                                {isLoading ? (
                                    <div className="text-center py-5">
                                        <div className="spinner-border" style={{ color: ZENIS_COLORS.primary, width: '2.5rem', height: '2.5rem' }} />
                                        <p className="mt-3 text-muted">Đang tải đơn hàng...</p>
                                    </div>
                                ) : orders.length === 0 ? (
                                    <div className="text-center py-5">
                                        <i className="fa-solid fa-box-open" style={{ fontSize: '60px', color: '#d1d5db' }}></i>
                                        <h5 className="mt-4 text-muted fw-semibold">Bạn chưa có đơn hàng nào</h5>
                                        <p className="text-muted small mb-4">Hãy mua sắm và trải nghiệm dịch vụ của chúng tôi!</p>
                                        <Link to="/shop" className="btn fw-bold px-4 py-2" style={{ backgroundColor: ZENIS_COLORS.primary, color: ZENIS_COLORS.dark }}>
                                            <i className="fa-solid fa-bag-shopping me-2"></i>Mua sắm ngay
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="d-flex flex-column gap-3">
                                        {orders.map(order => {
                                            const statusInfo = STATUS_MAP[order.status] || STATUS_MAP.PAID;
                                            const isExpanded = expandedOrder === order.id;
                                            return (
                                                <div key={order.id} className="order-card rounded-3 border overflow-hidden" style={{ borderColor: '#e5e7eb' }}>
                                                    {/* Header đơn hàng */}
                                                    <div
                                                        className="d-flex align-items-center justify-content-between px-4 py-3 cursor-pointer"
                                                        style={{ backgroundColor: '#f9fafb', cursor: 'pointer' }}
                                                        onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                                                    >
                                                        <div>
                                                            <div className="fw-bold" style={{ color: ZENIS_COLORS.dark }}>
                                                                #{order.orderNumber || String(order.id).padStart(6, '0')}
                                                            </div>
                                                            <div className="small text-muted mt-1">
                                                                <i className="fa-regular fa-clock me-1"></i>{formatDate(order.createdAt)}
                                                                &nbsp;·&nbsp;
                                                                <span>{order.items?.length || 0} sản phẩm</span>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex align-items-center gap-3">
                                                            <div>
                                                                <span
                                                                    className="badge rounded-pill px-3 py-2"
                                                                    style={{ backgroundColor: statusInfo.bg, color: statusInfo.color, fontWeight: 600 }}
                                                                >
                                                                    {statusInfo.label}
                                                                </span>
                                                            </div>
                                                            <div className="fw-bold" style={{ color: ZENIS_COLORS.primary, fontSize: '1.05rem', minWidth: '110px', textAlign: 'right' }}>
                                                                {formatVND(order.totalAmount)}
                                                            </div>
                                                            <i className={`fa-solid fa-chevron-${isExpanded ? 'up' : 'down'} text-muted`}></i>
                                                        </div>
                                                    </div>

                                                    {/* Chi tiết sản phẩm (expand) */}
                                                    {isExpanded && (
                                                        <div className="px-4 py-3 border-top" style={{ borderColor: '#e5e7eb' }}>
                                                            {(order.items || []).map(item => (
                                                                <div key={item.id} className="d-flex align-items-center gap-3 py-2 border-bottom" style={{ borderColor: '#f3f4f6' }}>
                                                                    <img
                                                                        src={item.imageUrl || 'assets/images/product_1.png'}
                                                                        alt={item.productName}
                                                                        style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e5e7eb' }}
                                                                    />
                                                                    <div className="flex-grow-1">
                                                                        <div className="fw-semibold small" style={{ color: ZENIS_COLORS.dark }}>
                                                                            {item.productName || 'Sản phẩm'}
                                                                        </div>
                                                                        {item.color && (
                                                                            <div className="small text-muted d-flex align-items-center gap-1 mt-1">
                                                                                Màu:
                                                                                <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', background: item.color, border: '1px solid #ddd' }}></span>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <div className="text-muted small text-center" style={{ minWidth: '80px' }}>
                                                                        x{item.quantity}
                                                                    </div>
                                                                    <div className="fw-bold small text-end" style={{ minWidth: '100px', color: ZENIS_COLORS.dark }}>
                                                                        {formatVND(item.unitPrice * item.quantity)}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            <div className="d-flex justify-content-end mt-3 pt-2">
                                                                <span className="fw-bold" style={{ color: ZENIS_COLORS.dark }}>
                                                                    Tổng cộng:&nbsp;
                                                                    <span style={{ color: ZENIS_COLORS.primary, fontSize: '1.1rem' }}>{formatVND(order.totalAmount)}</span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <style dangerouslySetInnerHTML={{ __html: `
                .active-menu { background-color: ${ZENIS_COLORS.primary} !important; color: ${ZENIS_COLORS.dark} !important; font-weight: 700 !important; }
                .list-group-item-action:hover:not(.active-menu) { background-color: ${ZENIS_COLORS.primary}15; color: ${ZENIS_COLORS.dark}; }
                .order-card { transition: box-shadow 0.2s; }
                .order-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.08) !important; }
            `}} />
        </div>
    );
};

const MenuLink = ({ to, icon, label, active }) => (
    <Link to={to} className={`list-group-item list-group-item-action d-flex align-items-center gap-3 px-3 py-3 border-0 rounded-2 mb-1 ${active ? 'active-menu' : ''}`}>
        <i className={`fa-solid ${icon}`} style={{ width: '20px' }}></i>
        <span style={{ fontSize: '0.95rem' }}>{label}</span>
    </Link>
);

export default DashboardOrder;
