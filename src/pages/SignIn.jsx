import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PageBanner from '../components/common/PageBanner';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../api/userApi';

const SignIn = () => {
    // ─── Dữ liệu Breadcrumb ───────────────────────────────────────────────
    const breadcrumbData = [
        { label: 'Trang chủ', link: '/' },
        { label: 'Đăng nhập', link: null }
    ];

    // ─── State form ───────────────────────────────────────────────────────
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // ─── Auth & Navigation ────────────────────────────────────────────────
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Nếu có trang cần quay lại sau khi đăng nhập thành công
    const from = location.state?.from || '/';

    // ─── Xử lý thay đổi input ────────────────────────────────────────────
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        // Xóa lỗi khi user bắt đầu nhập lại
        if (error) setError('');
    };

    // ─── Validate phía client ─────────────────────────────────────────────
    const validate = () => {
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            return 'Địa chỉ email không hợp lệ.';
        }
        if (!formData.password || formData.password.length < 6) {
            return 'Mật khẩu phải có ít nhất 6 ký tự.';
        }
        // Kiểm tra mật khẩu không chứa ký tự khoảng trắng đầu/cuối
        if (formData.password !== formData.password.trim()) {
            return 'Mật khẩu không được chứa khoảng trắng ở đầu hoặc cuối.';
        }
        return null;
    };

    // ─── Xử lý Submit ────────────────────────────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate phía client trước
        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Gọi API đăng nhập — gửi plain-text password, backend BCrypt.matches() tự xử lý
            const response = await loginUser(
                formData.email.trim().toLowerCase(),
                formData.password
            );
            const data = response.data;

            // Lưu JWT token nếu backend trả về
            if (data.token) {
                localStorage.setItem('zenis_token', data.token);
            }

            // Lưu thông tin user: { id, full_name, email, role, avatar_url }
            login(data.user || data);

            // Quay lại trang trước đó hoặc về trang chủ
            navigate(from, { replace: true });

        } catch (err) {
            setError(err.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* KHỐI 1: BANNER */}
            <PageBanner title="Đăng Nhập" breadcrumb={breadcrumbData} />

            {/* KHỐI 2: FORM ĐĂNG NHẬP */}
            <section className="sign_in mt_100 mb_100">
                <div className="container">
                    <div className="row justify-content-center">

                        <div className="col-xxl-5 col-xl-6 col-lg-7 col-md-9 wow fadeInUp">
                            <div className="sign_in_form">
                                <h3>Chào mừng trở lại!</h3>
                                <p style={{ color: '#777', marginBottom: '24px', fontSize: '15px' }}>
                                    Đăng nhập để tiếp tục mua sắm và theo dõi đơn hàng.
                                </p>

                                {/* Thông báo lỗi */}
                                {error && (
                                    <div
                                        className="alert alert-danger d-flex align-items-center gap-2 mb-3"
                                        role="alert"
                                        style={{ borderRadius: '8px', fontSize: '14px' }}
                                    >
                                        <i className="fa-solid fa-circle-exclamation"></i>
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="row">

                                        {/* Email */}
                                        <div className="col-xl-12">
                                            <div className="single_input">
                                                <label htmlFor="signin_email">
                                                    Địa chỉ email <span style={{ color: 'red' }}>*</span>
                                                </label>
                                                <input
                                                    id="signin_email"
                                                    type="email"
                                                    name="email"
                                                    placeholder="example@zenis.com"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    autoComplete="email"
                                                    disabled={loading}
                                                />
                                            </div>
                                        </div>

                                        {/* Mật khẩu */}
                                        <div className="col-xl-12">
                                            <div className="single_input">
                                                <label htmlFor="signin_password">
                                                    Mật khẩu <span style={{ color: 'red' }}>*</span>
                                                </label>
                                                <input
                                                    id="signin_password"
                                                    type="password"
                                                    name="password"
                                                    placeholder="••••••••"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    required
                                                    autoComplete="current-password"
                                                    minLength={6}
                                                    disabled={loading}
                                                />
                                            </div>
                                        </div>

                                        {/* Nhớ tôi + Quên mật khẩu */}
                                        <div className="col-12">
                                            <div className="forgot">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="rememberMe"
                                                        name="rememberMe"
                                                        checked={formData.rememberMe}
                                                        onChange={handleChange}
                                                        disabled={loading}
                                                    />
                                                    <label className="form-check-label" htmlFor="rememberMe">
                                                        Nhớ đăng nhập
                                                    </label>
                                                </div>
                                                <Link to="/quen-mat-khau">Quên mật khẩu?</Link>
                                            </div>
                                        </div>

                                        {/* Nút đăng nhập */}
                                        <div className="col-xl-12">
                                            <button
                                                type="submit"
                                                id="btn_dang_nhap"
                                                className="common_btn w-100 text-center"
                                                disabled={loading}
                                                style={{ opacity: loading ? 0.7 : 1 }}
                                            >
                                                {loading ? (
                                                    <>
                                                        <span
                                                            className="spinner-border spinner-border-sm me-2"
                                                            role="status"
                                                            aria-hidden="true"
                                                        ></span>
                                                        Đang xử lý...
                                                    </>
                                                ) : (
                                                    <>
                                                        Đăng Nhập <i className="fa-solid fa-arrow-right ms-2"></i>
                                                    </>
                                                )}
                                            </button>
                                        </div>

                                    </div>
                                </form>

                                <p className="dont_account">
                                    Chưa có tài khoản?{' '}
                                    <Link to="/sign-up" state={location.state}>Đăng ký ngay</Link>
                                </p>

                                <p className="or">hoặc</p>

                                {/* Đăng nhập bằng mạng xã hội */}
                                <ul>
                                    <li>
                                        <Link to="#" aria-label="Đăng nhập bằng Google">
                                            <span>
                                                <img src="/assets/images/google_logo.png" alt="Google" className="img-fluid w-100" />
                                            </span>
                                            Google
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" aria-label="Đăng nhập bằng Facebook">
                                            <span>
                                                <img src="/assets/images/fb_logo.png" alt="Facebook" className="img-fluid w-100" />
                                            </span>
                                            Facebook
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" aria-label="Đăng nhập bằng Twitter">
                                            <span>
                                                <img src="/assets/images/twitter_logo.png" alt="Twitter" className="img-fluid w-100" />
                                            </span>
                                            Twitter
                                        </Link>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SignIn;