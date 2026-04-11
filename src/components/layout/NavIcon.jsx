import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const NavIcons = ({ onOpenCart }) => {
    const { isLoggedIn, user, logout } = useAuth();
    const { cartItems } = useCart();
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

    // Xử lý mở giỏ hàng
    const handleCartOpen = (e) => {
        e.preventDefault();
        onOpenCart();
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
                        <i className="fas fa-random" style={{ fontSize: '20px' }}></i>
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
                        <i className="far fa-heart" style={{ fontSize: '20px' }}></i>
                    </b>
                    <span>5</span>
                </a>
            </li>

            {/* Giỏ hàng */}
            <li>
                <a
                    href="#!"
                    title="Giỏ hàng"
                    onClick={(e) => {
                        if (!isLoggedIn) {
                            requireLogin(e, '/cart');
                        } else {
                            handleCartOpen(e);
                        }
                    }}
                >
                    <b>
                        <i className="fas fa-shopping-bag" style={{ fontSize: '20px' }}></i>
                    </b>
                    {cartItems.length > 0 && <span>{cartItems.length}</span>}
                </a>
            </li>

            {/* Tài khoản người dùng */}
            <li>
                {isLoggedIn ? (
<<<<<<< HEAD
                    // Đã đăng nhập → hiển thị tên và đi đến trang hồ sơ
                    <Link className="user" to="/dashboard-profile" title="Hồ sơ của tôi">
                        <b>
                            <img src="assets/images/user_icon_black.svg" alt="Tài khoản" className="img-fluid" />
                        </b>
                        <h5>{user?.full_name?.split(' ').slice(-1)[0] || 'Tài khoản'}</h5>
                    </Link>
=======
                    // Đã đăng nhập → hiển thị tên với dropdown Đăng xuất thay vì vào dashboard
                    <>
                        <a className="user" href="#!" onClick={(e) => e.preventDefault()} title="Hồ sơ của tôi">
                            <b>
                                <i className="far fa-user" style={{ fontSize: '20px' }}></i>
                            </b>
                            <h5>{user?.full_name?.split(' ').slice(-1)[0] || 'Tài khoản'}</h5>
                        </a>
                        <ul className="user_dropdown">
                            <li>
                                <a href="#!" onClick={(e) => {
                                    e.preventDefault();
                                    logout();
                                    navigate('/');
                                }}>
                                    <i className="fas fa-sign-out-alt"></i> Đăng xuất
                                </a>
                            </li>
                        </ul>
                    </>
>>>>>>> origin/main
                ) : (
                    // Chưa đăng nhập → hiển thị "Đăng nhập" với dropdown
                    <>
                        <a className="user" href="#!" onClick={(e) => e.preventDefault()} title="Tài khoản">
                            <b>
                                <i className="far fa-user" style={{ fontSize: '20px' }}></i>
                            </b>
                            <h5>Tài khoản</h5>
                        </a>
                        <ul className="user_dropdown">
                            <li><Link to="/sign-in"><i className="fas fa-sign-in-alt"></i> Đăng nhập</Link></li>
                            <li><Link to="/sign-up"><i className="far fa-user-plus"></i> Đăng ký</Link></li>
                        </ul>
                    </>
                )}
            </li>
        </ul>
    );
};

export default NavIcons;