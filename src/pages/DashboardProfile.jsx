import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageBanner from '../components/common/PageBanner';

// Định nghĩa bảng màu Zenis để sử dụng thống nhất
const ZENIS_COLORS = {
    primary: '#FFB100', // Vàng cam Zenis
    dark: '#1A1D23',    // Đen xám đậm
    lightGray: '#F4F7F9',
    white: '#FFFFFF'
};

const DashboardProfile = () => {
    // 1. Dữ liệu Breadcrumb
    const breadcrumbData = [
        { label: 'Trang chủ', link: '/' },
        { label: 'Bảng điều khiển', link: '/dashboard' },
        { label: 'Hồ sơ cá nhân', link: null }
    ];

    // 2. Quản lý State dữ liệu hồ sơ
    const [profile] = useState({
        name: 'Nguyễn Văn A',
        email: 'example@zenis.com',
        phone: '+84 90 1234 567',
        address: '180 Cao Lỗ, Phường 4, Quận 8, TP. HCM'
    });

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        alert("Thông tin cá nhân đã được lưu!");
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        alert("Mật khẩu đã được cập nhật thành công!");
    };

    return (
        <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', paddingBottom: '50px' }}>
            {/* Sử dụng PageBanner từ component chung theo yêu cầu của bạn */}
            <PageBanner title="Hồ Sơ Cá Nhân" breadcrumb={breadcrumbData} />

            <section className="dashboard mt_100">
                <div className="container">
                    <div className="row g-4">

                        {/* ================= CỘT TRÁI: MENU ĐIỀU KHIỂN ================= */}
                        <div className="col-xl-3 col-lg-4">
                            <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
                                <div className="text-center p-4" style={{ backgroundColor: ZENIS_COLORS.dark, color: 'white' }}>
                                    <div className="position-relative d-inline-block">
                                        <img 
                                            src={`https://ui-avatars.com/api/?name=${profile.name}&background=FFB100&color=fff&size=128`} 
                                            className="rounded-circle border border-4 border-dark-subtle shadow-sm" 
                                            alt="user" width="90" 
                                        />
                                    </div>
                                    <h5 className="mt-3 mb-1 fw-bold text-white">{profile.name}</h5>
                                    <span className="badge" style={{ backgroundColor: ZENIS_COLORS.primary, color: ZENIS_COLORS.dark }}>Thành viên VIP</span>
                                </div>
                                
                                <div className="list-group list-group-flush p-2 bg-white">
                                    <MenuLink to="/dashboard" icon="fa-table-cells-large" label="Bảng Điều Khiển" />
                                    <MenuLink to="/dashboard-profile" icon="fa-user" label="Hồ Sơ Cá Nhân" active />
                                    <MenuLink to="/dashboard-order" icon="fa-box" label="Đơn Hàng" />
                                    <MenuLink to="/wishlist" icon="fa-heart" label="Yêu Thích" />
                                    <hr className="my-2 opacity-10" />
                                    <MenuLink to="/sign-in" icon="fa-arrow-right-from-bracket" label="Đăng Xuất" logout />
                                </div>
                            </div>
                        </div>

                        {/* ================= CỘT PHẢI: NỘI DUNG HỒ SƠ ================= */}
                        <div className="col-xl-9 col-lg-8">
                            <div className="d-flex flex-column gap-4">
                                
                                {/* 1. Khối Hiển Thị Thông Tin Tổng Quan */}
                                <div className="card border-0 shadow-sm rounded-3 p-4 bg-white">
                                    <div className="d-flex align-items-center gap-4 flex-wrap flex-md-nowrap">
                                        <div className="position-relative">
                                            <img 
                                                src={`https://ui-avatars.com/api/?name=${profile.name}&background=1A1D23&color=FFB100&size=128`} 
                                                className="rounded-3 shadow-sm" alt="user" width="120" 
                                            />
                                            <label 
                                                className="position-absolute bottom-0 end-0 text-white rounded-circle d-flex align-items-center justify-content-center shadow" 
                                                style={{ width: '35px', height: '35px', cursor: 'pointer', backgroundColor: ZENIS_COLORS.primary, transform: 'translate(25%, 25%)' }}
                                            >
                                                <i className="fa-solid fa-camera text-dark"></i>
                                                <input type="file" className="d-none" />
                                            </label>
                                        </div>
                                        <div className="flex-grow-1">
                                            <h3 className="fw-bold mb-3" style={{ color: ZENIS_COLORS.dark }}>{profile.name}</h3>
                                            <div className="row g-2 text-muted">
                                                <div className="col-md-6 small"><i className="fa-solid fa-envelope me-2" style={{color: ZENIS_COLORS.primary}}></i><b>Email:</b> {profile.email}</div>
                                                <div className="col-md-6 small"><i className="fa-solid fa-phone me-2" style={{color: ZENIS_COLORS.primary}}></i><b>SĐT:</b> {profile.phone}</div>
                                                <div className="col-12 small mt-1"><i className="fa-solid fa-location-dot me-2" style={{color: ZENIS_COLORS.primary}}></i><b>Địa chỉ:</b> {profile.address}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 2. Khối Form Cập Nhật */}
                                <div className="card border-0 shadow-sm rounded-3 p-4 bg-white">
                                    <h5 className="fw-bold mb-4 border-start border-4 ps-3" style={{ borderColor: ZENIS_COLORS.primary }}>CẬP NHẬT THÔNG TIN</h5>
                                    <form onSubmit={handleUpdateProfile} className="row g-3">
                                        <div className="col-md-6">
                                            <label className="fw-bold small mb-1 text-uppercase">Họ và Tên</label>
                                            <input type="text" className="form-control bg-light border-0 py-2" defaultValue={profile.name} required />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="fw-bold small mb-1 text-uppercase">Email</label>
                                            <input type="email" className="form-control bg-light border-0 py-2" defaultValue={profile.email} required />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="fw-bold small mb-1 text-uppercase">Số điện thoại</label>
                                            <input type="text" className="form-control bg-light border-0 py-2" defaultValue={profile.phone} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="fw-bold small mb-1 text-uppercase">Địa chỉ</label>
                                            <input type="text" className="form-control bg-light border-0 py-2" defaultValue={profile.address} />
                                        </div>
                                        <div className="col-12 mt-4 text-end">
                                            <button type="submit" className="btn px-5 py-2 fw-bold shadow-sm" style={{ backgroundColor: ZENIS_COLORS.primary, color: ZENIS_COLORS.dark }}>
                                                LƯU THAY ĐỔI
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                {/* 3. Khối Đổi Mật Khẩu */}
                                <div className="card border-0 shadow-sm rounded-3 p-4 bg-white">
                                    <h5 className="fw-bold mb-4 border-start border-4 border-dark ps-3">ĐỔI MẬT KHẨU</h5>
                                    <form onSubmit={handleChangePassword} className="row g-3">
                                        <div className="col-12">
                                            <label className="fw-bold small mb-1 text-uppercase">Mật khẩu hiện tại</label>
                                            <input type="password" className="form-control bg-light border-0 py-2" placeholder="••••••••" required />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="fw-bold small mb-1 text-uppercase">Mật khẩu mới</label>
                                            <input type="password" className="form-control bg-light border-0 py-2" placeholder="••••••••" required />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="fw-bold small mb-1 text-uppercase">Xác nhận mật khẩu</label>
                                            <input type="password" className="form-control bg-light border-0 py-2" placeholder="••••••••" required />
                                        </div>
                                        <div className="col-12 mt-4 text-end">
                                            <button type="submit" className="btn btn-dark px-5 py-2 fw-bold shadow-sm">
                                                CẬP NHẬT MẬT KHẨU
                                            </button>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CSS nội bộ để đồng bộ hoàn toàn với Zenis */}
            <style dangerouslySetInnerHTML={{ __html: `
                .active-menu { background-color: ${ZENIS_COLORS.primary} !important; color: ${ZENIS_COLORS.dark} !important; font-weight: 700 !important; }
                .list-group-item-action:hover:not(.active-menu) { background-color: ${ZENIS_COLORS.primary}15; color: ${ZENIS_COLORS.dark}; }
                .form-control:focus { box-shadow: 0 0 0 3px ${ZENIS_COLORS.primary}30 !important; border-color: ${ZENIS_COLORS.primary} !important; background-color: #fff !important; }
                .btn:hover { opacity: 0.9; transform: translateY(-1px); transition: 0.2s; }
            `}} />
        </div>
    );
};

// Sub-component cho Menu Link
const MenuLink = ({ to, icon, label, active, logout }) => (
    <Link to={to} className={`list-group-item list-group-item-action d-flex align-items-center gap-3 px-3 py-3 border-0 rounded-2 mb-1 ${active ? 'active-menu' : ''} ${logout ? 'text-danger mt-2' : ''}`}>
        <i className={`fa-solid ${icon}`} style={{ width: '20px' }}></i>
        <span style={{ fontSize: '0.95rem' }}>{label}</span>
    </Link>
);

export default DashboardProfile;