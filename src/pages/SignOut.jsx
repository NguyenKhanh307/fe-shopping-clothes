import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageBanner from '../components/common/PageBanner';

const SignOut = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // 1. Xóa dữ liệu phiên (Token Zenis)
        localStorage.removeItem('zenis_token');
        localStorage.removeItem('userData'); // Xóa thêm nếu có lưu thông tin user

        // 2. Chuyển hướng về trang chủ sau 1 giây
        const timer = setTimeout(() => {
            navigate('/', { replace: true });
        }, 1200);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh' }}>
            <PageBanner title="Đăng Xuất" breadcrumb={[{ label: 'Trang chủ', link: '/' }, { label: 'Đăng xuất', link: null }]} />
            <div className="container mt_100 mb_100 text-center">
                <div className="card border-0 shadow-sm p-5 rounded-4 d-inline-block">
                    <div className="spinner-border text-warning mb-3" role="status"></div>
                    <h3 className="fw-bold">Đang đăng xuất...</h3>
                    <p className="text-muted">Hẹn gặp lại bạn tại Zenis!</p>
                </div>
            </div>
        </div>
    );
};

export default SignOut;