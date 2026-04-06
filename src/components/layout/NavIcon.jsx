import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NavIcons = ({ onOpenCart }) => {
    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate();

    // Hàm xử lý khi click vào các thao tác yêu cầu đăng nhập
    const requireLogin = (e, path) => {
        e.preventDefault();
        if (!isLoggedIn) {
            // Lưu trang muốn đến, sau khi đăng nhập sẽ quay lại
            navigate('/sign-in', { state: { from: path } });
        } else {
            navigate(path);
        }
    };

    // Xử lý mở giỏ hàng (cũng cần đăng nhập)
    const handleCartOpen = (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            navigate('/sign-in', { state: { from: '/' } });
        } else {
            onOpenCart();
        }
    };

    return (
        <ul className="menu_icon">
            {/* So sánh — yêu cầu đăng nhập */}
            <li>
                <a
                    href="/compare"
                    title="So sánh sản phẩm"
                    onClick={(e) => requireLogin(e, '/compare')}
                >
                    <b>
                        <img src="assets/images/compare_black.svg" alt="So sánh" className="img-fluid" />
                    </b>
                    <span>2</span>
                </a>
            </li>

            {/* Yêu thích — yêu cầu đăng nhập */}
            <li>
                <a
                    href="/wishlist"
                    title="Sản phẩm yêu thích"
                    onClick={(e) => requireLogin(e, '/wishlist')}
                >
                    <b>
                        <img src="assets/images/love_black.svg" alt="Yêu thích" className="img-fluid" />
                    </b>
                    <span>5</span>
                </a>
            </li>

            {/* Giỏ hàng — yêu cầu đăng nhập */}
            <li>
                <a
                    href="#!"
                    title="Giỏ hàng"
                    onClick={handleCartOpen}
                >
                    <b>
                        <img src="assets/images/cart_black.svg" alt="Giỏ hàng" className="img-fluid" />
                    </b>
                    <span>2</span>
                </a>
            </li>

            {/* Tài khoản người dùng */}
            <li>
                {isLoggedIn ? (
                    // Đã đăng nhập → hiển thị tên và đi đến dashboard
                    <Link className="user" to="/dashboard" title="Tài khoản của tôi">
                        <b>
                            <img src="assets/images/user_icon_black.svg" alt="Tài khoản" className="img-fluid" />
                        </b>
                        <h5>{user?.full_name?.split(' ').slice(-1)[0] || 'Tài khoản'}</h5>
                    </Link>
                ) : (
                    // Chưa đăng nhập → hiển thị "Đăng nhập"
                    <Link className="user" to="/sign-in" title="Đăng nhập">
                        <b>
                            <img src="assets/images/user_icon_black.svg" alt="Đăng nhập" className="img-fluid" />
                        </b>
                        <h5>Đăng nhập</h5>
                    </Link>
                )}
            </li>
        </ul>
    );
};

export default NavIcons;