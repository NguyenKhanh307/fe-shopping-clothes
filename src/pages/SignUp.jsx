import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PageBanner from '../components/common/PageBanner';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../api/userApi';

const SignUp = () => {
    // ─── Dữ liệu Breadcrumb ───────────────────────────────────────────────
    const breadcrumbData = [
        { label: 'Trang chủ', link: '/' },
        { label: 'Đăng ký', link: null }
    ];

    // ─── State form — khớp với bảng users trong DB ────────────────────────
    // Trường bắt buộc: full_name, email, password
    // Tùy chọn: phone (có thể bổ sung sau)
    const [formData, setFormData] = useState({
        full_name: '',        // VARCHAR(100) NOT NULL
        email: '',            // VARCHAR(150) UNIQUE NOT NULL
        password: '',         // VARCHAR(255) NOT NULL (BCrypt hash phía server)
        confirmPassword: '',  // Chỉ dùng ở client để xác nhận, không gửi lên server
        phone: '',            // VARCHAR(20) NULL
        agreeTerms: false,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Nếu có trang cần quay lại sau khi đăng ký thành công
    const from = location.state?.from || '/';

    // ─── Validate form phía client ────────────────────────────────────────
    const validate = () => {
        const errors = {};

        if (!formData.full_name.trim()) {
            errors.full_name = 'Vui lòng nhập họ và tên.';
        } else if (formData.full_name.trim().length < 2) {
            errors.full_name = 'Họ và tên phải có ít nhất 2 ký tự.';
        }

        if (!formData.email) {
            errors.email = 'Vui lòng nhập địa chỉ email.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'Địa chỉ email không hợp lệ.';
        }

        if (!formData.password) {
            errors.password = 'Vui lòng nhập mật khẩu.';
        } else if (formData.password.length < 6) {
            errors.password = 'Mật khẩu phải có ít nhất 6 ký tự.';
        }

        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Vui lòng xác nhận mật khẩu.';
        } else if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Mật khẩu xác nhận không khớp.';
        }

        if (formData.phone && !/^[0-9]{9,11}$/.test(formData.phone.replace(/\s/g, ''))) {
            errors.phone = 'Số điện thoại không hợp lệ (9–11 chữ số).';
        }

        if (!formData.agreeTerms) {
            errors.agreeTerms = 'Bạn phải đồng ý với Điều khoản & Điều kiện.';
        }

        return errors;
    };

    // ─── Xử lý thay đổi input ────────────────────────────────────────────
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        // Xóa lỗi của field đó khi user bắt đầu sửa
        if (fieldErrors[name]) {
            setFieldErrors(prev => ({ ...prev, [name]: '' }));
        }
        if (error) setError('');
    };

    // ─── Xử lý Submit ────────────────────────────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate phía client trước
        const errors = validate();
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Gửi plain-text password lên backend — backend sẽ tự BCrypt hash trước khi lưu DB
            const payload = {
                full_name: formData.full_name.trim(),
                email: formData.email.trim().toLowerCase(),
                password: formData.password,    // plain-text, backend tự hash
                phone: formData.phone.trim() || null,
            };

            const response = await registerUser(payload);
            const data = response.data;

            // Nếu server tự động đăng nhập sau khi đăng ký (trả về token + user)
            if (data.token) {
                localStorage.setItem('zenis_token', data.token);
                login(data.user || data);
                navigate(from, { replace: true });
            } else {
                // Server chỉ tạo tài khoản, chuyển sang trang đăng nhập
                navigate('/sign-in', {
                    state: { message: 'Đăng ký thành công! Vui lòng đăng nhập.' }
                });
            }

        } catch (err) {
            setError(err.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    // ─── Render lỗi field ─────────────────────────────────────────────────
    const FieldError = ({ name }) =>
        fieldErrors[name]
            ? <small className="text-danger d-block mt-1" style={{ fontSize: '13px' }}>
                <i className="fa-solid fa-triangle-exclamation me-1"></i>{fieldErrors[name]}
            </small>
            : null;

    return (
        <>
            {/* KHỐI 1: BANNER */}
            <PageBanner title="Đăng Ký" breadcrumb={breadcrumbData} />

            {/* KHỐI 2: FORM ĐĂNG KÝ */}
            <section className="sign_in sign_up mt_100 mb_100">
                <div className="container">
                    <div className="row justify-content-center">

                        <div className="col-xxl-5 col-xl-6 col-lg-7 col-md-9 wow fadeInUp">
                            <div className="sign_in_form">
                                <h3>Tạo tài khoản mới</h3>
                                <p style={{ color: '#777', marginBottom: '24px', fontSize: '15px' }}>
                                    Đăng ký miễn phí và bắt đầu mua sắm ngay hôm nay!
                                </p>

                                {/* Thông báo lỗi tổng quát */}
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

                                <form onSubmit={handleSubmit} noValidate>
                                    <div className="row">

                                        {/* Họ và Tên — full_name VARCHAR(100) */}
                                        <div className="col-xl-12">
                                            <div className="single_input">
                                                <label htmlFor="signup_fullname">
                                                    Họ và Tên <span style={{ color: 'red' }}>*</span>
                                                </label>
                                                <input
                                                    id="signup_fullname"
                                                    type="text"
                                                    name="full_name"
                                                    placeholder="Nguyễn Văn A"
                                                    value={formData.full_name}
                                                    onChange={handleChange}
                                                    maxLength={100}
                                                    autoComplete="name"
                                                    disabled={loading}
                                                    style={{ borderColor: fieldErrors.full_name ? '#dc3545' : '' }}
                                                />
                                                <FieldError name="full_name" />
                                            </div>
                                        </div>

                                        {/* Email — email VARCHAR(150) UNIQUE */}
                                        <div className="col-xl-12">
                                            <div className="single_input">
                                                <label htmlFor="signup_email">
                                                    Địa chỉ Email <span style={{ color: 'red' }}>*</span>
                                                </label>
                                                <input
                                                    id="signup_email"
                                                    type="email"
                                                    name="email"
                                                    placeholder="example@zenis.com"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    maxLength={150}
                                                    autoComplete="email"
                                                    disabled={loading}
                                                    style={{ borderColor: fieldErrors.email ? '#dc3545' : '' }}
                                                />
                                                <FieldError name="email" />
                                            </div>
                                        </div>

                                        {/* Số điện thoại — phone VARCHAR(20) NULL */}
                                        <div className="col-xl-12">
                                            <div className="single_input">
                                                <label htmlFor="signup_phone">
                                                    Số điện thoại{' '}
                                                    <span style={{ color: '#aaa', fontWeight: 400, fontSize: '13px' }}>(không bắt buộc)</span>
                                                </label>
                                                <input
                                                    id="signup_phone"
                                                    type="tel"
                                                    name="phone"
                                                    placeholder="0901 234 567"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    maxLength={20}
                                                    autoComplete="tel"
                                                    disabled={loading}
                                                    style={{ borderColor: fieldErrors.phone ? '#dc3545' : '' }}
                                                />
                                                <FieldError name="phone" />
                                            </div>
                                        </div>

                                        {/* Mật khẩu — password VARCHAR(255) (BCrypt server) */}
                                        <div className="col-xl-12">
                                            <div className="single_input">
                                                <label htmlFor="signup_password">
                                                    Mật khẩu <span style={{ color: 'red' }}>*</span>
                                                </label>
                                                <input
                                                    id="signup_password"
                                                    type="password"
                                                    name="password"
                                                    placeholder="Ít nhất 6 ký tự"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    minLength={6}
                                                    autoComplete="new-password"
                                                    disabled={loading}
                                                    style={{ borderColor: fieldErrors.password ? '#dc3545' : '' }}
                                                />
                                                <FieldError name="password" />
                                            </div>
                                        </div>

                                        {/* Xác nhận mật khẩu — chỉ dùng ở client */}
                                        <div className="col-xl-12">
                                            <div className="single_input">
                                                <label htmlFor="signup_confirm_password">
                                                    Xác nhận mật khẩu <span style={{ color: 'red' }}>*</span>
                                                </label>
                                                <input
                                                    id="signup_confirm_password"
                                                    type="password"
                                                    name="confirmPassword"
                                                    placeholder="Nhập lại mật khẩu"
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                    minLength={6}
                                                    autoComplete="new-password"
                                                    disabled={loading}
                                                    style={{ borderColor: fieldErrors.confirmPassword ? '#dc3545' : '' }}
                                                />
                                                <FieldError name="confirmPassword" />
                                            </div>
                                        </div>

                                        {/* Điều khoản sử dụng */}
                                        <div className="col-12">
                                            <div className="forgot">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="agreeTerms"
                                                        name="agreeTerms"
                                                        checked={formData.agreeTerms}
                                                        onChange={handleChange}
                                                        disabled={loading}
                                                        style={{ borderColor: fieldErrors.agreeTerms ? '#dc3545' : '' }}
                                                    />
                                                    <label className="form-check-label" htmlFor="agreeTerms">
                                                        Tôi đồng ý với{' '}
                                                        <Link to="/dieu-khoan" target="_blank" rel="noopener noreferrer">
                                                            Điều khoản &amp; Điều kiện
                                                        </Link>
                                                    </label>
                                                </div>
                                                <FieldError name="agreeTerms" />
                                            </div>
                                        </div>

                                        {/* Nút đăng ký */}
                                        <div className="col-xl-12">
                                            <button
                                                type="submit"
                                                id="btn_dang_ky"
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
                                                        Đăng Ký Ngay <i className="fa-solid fa-arrow-right ms-2"></i>
                                                    </>
                                                )}
                                            </button>
                                        </div>

                                    </div>
                                </form>

                                {/* Đã có tài khoản */}
                                <p className="dont_account">
                                    Bạn đã có tài khoản?{' '}
                                    <Link to="/sign-in">Đăng nhập</Link>
                                </p>

                                <p className="or">hoặc</p>

                                {/* Đăng ký bằng mạng xã hội */}
                                <ul>
                                    <li>
                                        <Link to="#" aria-label="Đăng ký bằng Google">
                                            <span>
                                                <img src="/assets/images/google_logo.png" alt="Google" className="img-fluid w-100" />
                                            </span>
                                            Google
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" aria-label="Đăng ký bằng Facebook">
                                            <span>
                                                <img src="/assets/images/fb_logo.png" alt="Facebook" className="img-fluid w-100" />
                                            </span>
                                            Facebook
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" aria-label="Đăng ký bằng Twitter">
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

export default SignUp;