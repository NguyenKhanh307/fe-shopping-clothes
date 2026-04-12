import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageBanner from '../components/common/PageBanner';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../api/axiosConnect';

// Định nghĩa bảng màu Zenis để sử dụng thống nhất
const ZENIS_COLORS = {
    primary: '#FFB100',
    dark: '#1A1D23',
    lightGray: '#F4F7F9',
    white: '#FFFFFF'
};

const DashboardProfile = () => {
    const { user, login, logout } = useAuth();
    const navigate = useNavigate();

    // Breadcrumb
    const breadcrumbData = [
        { label: 'Trang chủ', link: '/' },
        { label: 'Bảng điều khiển', link: '/dashboard' },
        { label: 'Hồ sơ cá nhân', link: null }
    ];

    // State form thông tin cá nhân
    const [profile, setProfile] = useState({
        full_name: '',
        email: '',
        phone: '',
        address: ''
    });

    // State form đổi mật khẩu
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [isLoading, setIsLoading] = useState(true);
    const [saveMsg, setSaveMsg] = useState('');
    const [pwdMsg, setPwdMsg] = useState('');
    const [saveError, setSaveError] = useState('');
    const [pwdError, setPwdError] = useState('');

    // Redirect nếu chưa đăng nhập
    useEffect(() => {
        if (!user) {
            navigate('/sign-in', { state: { from: '/dashboard-profile' } });
        }
    }, [user, navigate]);

    // Fetch dữ liệu user từ backend
    useEffect(() => {
        if (!user?.id) return;
        setIsLoading(true);
        axiosInstance.get(`/users/${user.id}`)
            .then(res => {
                const u = res.data;
                setProfile({
                    full_name: u.full_name || '',
                    email: u.email || '',
                    phone: u.phone || '',
                    address: u.address || ''
                });
            })
            .catch(() => {
                // Fallback: dùng dữ liệu từ localStorage nếu API fail
                setProfile({
                    full_name: user.full_name || '',
                    email: user.email || '',
                    phone: user.phone || '',
                    address: user.address || ''
                });
            })
            .finally(() => setIsLoading(false));
    }, [user]);

    // Cập nhật thông tin cá nhân
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setSaveMsg('');
        setSaveError('');
        try {
            const res = await axiosInstance.patch(`/users/${user.id}`, {
                full_name: profile.full_name,
                email: profile.email,
                phone: profile.phone,
                address: profile.address
            });
            // Cập nhật lại AuthContext + localStorage
            login({ ...user, ...res.data });
            setSaveMsg('✅ Thông tin đã được cập nhật thành công!');
        } catch (err) {
            setSaveError('❌ ' + (err.message || 'Cập nhật thất bại, vui lòng thử lại.'));
        }
    };

    // Đổi mật khẩu
    const handleChangePassword = async (e) => {
        e.preventDefault();
        setPwdMsg('');
        setPwdError('');
        if (passwords.newPassword !== passwords.confirmPassword) {
            setPwdError('❌ Mật khẩu xác nhận không khớp!');
            return;
        }
        if (passwords.newPassword.length < 6) {
            setPwdError('❌ Mật khẩu mới phải có ít nhất 6 ký tự!');
            return;
        }
        try {
            await axiosInstance.patch(`/users/${user.id}`, {
                password: passwords.newPassword
            });
            setPwdMsg('✅ Mật khẩu đã được cập nhật thành công!');
            setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (err) {
            setPwdError('❌ ' + (err.message || 'Đổi mật khẩu thất bại, vui lòng thử lại.'));
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (isLoading) {
        return (
            <>
                <PageBanner title="Hồ Sơ Cá Nhân" breadcrumb={breadcrumbData} />
                <section className="mt_100 mb_100 text-center">
                    <div className="spinner-border text-warning" style={{ width: '3rem', height: '3rem' }} />
                    <p className="mt-3">Đang tải thông tin...</p>
                </section>
            </>
        );
    }

    return (
        <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', paddingBottom: '50px' }}>
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
                                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(profile.full_name || 'U')}&background=FFB100&color=fff&size=128`}
                                            className="rounded-circle border border-4 border-dark-subtle shadow-sm"
                                            alt="user" width="90"
                                        />
                                    </div>
                                    <h5 className="mt-3 mb-1 fw-bold text-white">{profile.full_name || 'Người dùng'}</h5>
                                    <span className="badge" style={{ backgroundColor: ZENIS_COLORS.primary, color: ZENIS_COLORS.dark }}>
                                        {user?.role === 'ADMIN' ? 'Quản trị viên' : 'Thành viên'}
                                    </span>
                                </div>

                                <div className="list-group list-group-flush p-2 bg-white">
                                    <MenuLink to="/dashboard" icon="fa-table-cells-large" label="Bảng Điều Khiển" />
                                    <MenuLink to="/dashboard-profile" icon="fa-user" label="Hồ Sơ Cá Nhân" active />
                                    <MenuLink to="/dashboard-order" icon="fa-box" label="Đơn Hàng" />
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

                        {/* ================= CỘT PHẢI: NỘI DUNG HỒ SƠ ================= */}
                        <div className="col-xl-9 col-lg-8">
                            <div className="d-flex flex-column gap-4">

                                {/* 1. Khối Hiển Thị Thông Tin Tổng Quan */}
                                <div className="card border-0 shadow-sm rounded-3 p-4 bg-white">
                                    <div className="d-flex align-items-center gap-4 flex-wrap flex-md-nowrap">
                                        <div className="position-relative">
                                            <img
                                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(profile.full_name || 'U')}&background=1A1D23&color=FFB100&size=128`}
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
                                            <h3 className="fw-bold mb-3" style={{ color: ZENIS_COLORS.dark }}>{profile.full_name || 'Người dùng'}</h3>
                                            <div className="row g-2 text-muted">
                                                <div className="col-md-6 small">
                                                    <i className="fa-solid fa-envelope me-2" style={{ color: ZENIS_COLORS.primary }}></i>
                                                    <b>Email:</b> {profile.email || '—'}
                                                </div>
                                                <div className="col-md-6 small">
                                                    <i className="fa-solid fa-phone me-2" style={{ color: ZENIS_COLORS.primary }}></i>
                                                    <b>SĐT:</b> {profile.phone || '—'}
                                                </div>
                                                <div className="col-12 small mt-1">
                                                    <i className="fa-solid fa-location-dot me-2" style={{ color: ZENIS_COLORS.primary }}></i>
                                                    <b>Địa chỉ:</b> {profile.address || '—'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 2. Khối Form Cập Nhật */}
                                <div className="card border-0 shadow-sm rounded-3 p-4 bg-white">
                                    <h5 className="fw-bold mb-4 border-start border-4 ps-3" style={{ borderColor: ZENIS_COLORS.primary }}>CẬP NHẬT THÔNG TIN</h5>
                                    {saveMsg && <div className="alert alert-success py-2 mb-3">{saveMsg}</div>}
                                    {saveError && <div className="alert alert-danger py-2 mb-3">{saveError}</div>}
                                    <form onSubmit={handleUpdateProfile} className="row g-3">
                                        <div className="col-md-6">
                                            <label className="fw-bold small mb-1 text-uppercase">Họ và Tên</label>
                                            <input
                                                type="text"
                                                className="form-control bg-light border-0 py-2"
                                                value={profile.full_name}
                                                onChange={e => setProfile(p => ({ ...p, full_name: e.target.value }))}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="fw-bold small mb-1 text-uppercase">Email</label>
                                            <input
                                                type="email"
                                                className="form-control bg-light border-0 py-2"
                                                value={profile.email}
                                                onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="fw-bold small mb-1 text-uppercase">Số điện thoại</label>
                                            <input
                                                type="text"
                                                className="form-control bg-light border-0 py-2"
                                                value={profile.phone}
                                                onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="fw-bold small mb-1 text-uppercase">Địa chỉ</label>
                                            <input
                                                type="text"
                                                className="form-control bg-light border-0 py-2"
                                                value={profile.address}
                                                onChange={e => setProfile(p => ({ ...p, address: e.target.value }))}
                                            />
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
                                    {pwdMsg && <div className="alert alert-success py-2 mb-3">{pwdMsg}</div>}
                                    {pwdError && <div className="alert alert-danger py-2 mb-3">{pwdError}</div>}
                                    <form onSubmit={handleChangePassword} className="row g-3">
                                        <div className="col-12">
                                            <label className="fw-bold small mb-1 text-uppercase">Mật khẩu hiện tại</label>
                                            <input
                                                type="password"
                                                className="form-control bg-light border-0 py-2"
                                                placeholder="••••••••"
                                                value={passwords.currentPassword}
                                                onChange={e => setPasswords(p => ({ ...p, currentPassword: e.target.value }))}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="fw-bold small mb-1 text-uppercase">Mật khẩu mới</label>
                                            <input
                                                type="password"
                                                className="form-control bg-light border-0 py-2"
                                                placeholder="••••••••"
                                                value={passwords.newPassword}
                                                onChange={e => setPasswords(p => ({ ...p, newPassword: e.target.value }))}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="fw-bold small mb-1 text-uppercase">Xác nhận mật khẩu</label>
                                            <input
                                                type="password"
                                                className="form-control bg-light border-0 py-2"
                                                placeholder="••••••••"
                                                value={passwords.confirmPassword}
                                                onChange={e => setPasswords(p => ({ ...p, confirmPassword: e.target.value }))}
                                                required
                                            />
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

            {/* CSS nội bộ */}
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
const MenuLink = ({ to, icon, label, active }) => (
    <Link to={to} className={`list-group-item list-group-item-action d-flex align-items-center gap-3 px-3 py-3 border-0 rounded-2 mb-1 ${active ? 'active-menu' : ''}`}>
        <i className={`fa-solid ${icon}`} style={{ width: '20px' }}></i>
        <span style={{ fontSize: '0.95rem' }}>{label}</span>
    </Link>
);

export default DashboardProfile;