import React, { useState } from 'react';
import { Offcanvas, Tab, Tabs, Collapse } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const MobileMenu = ({ show, handleClose }) => {
    const [openMenu, setOpenMenu] = useState(null);
    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate();

    const toggleMenu = (menuId) => {
        setOpenMenu(openMenu === menuId ? null : menuId);
    };

    // Xử lý các thao tác yêu cầu đăng nhập
    const requireLogin = (e, path) => {
        e.preventDefault();
        handleClose(); // Đóng menu mobile trước
        if (!isLoggedIn) {
            navigate('/sign-in', { state: { from: path } });
        } else {
            navigate(path);
        }
    };

    // Dữ liệu mẫu cho Mobile Menu
    const mobileCategories = [
        { id: 'cat1', title: 'Thời Trang Nam', links: ['Quần Jeans', 'Áo Sơ Mi', 'Áo Thun'] },
        { id: 'cat2', title: 'Thời Trang Nữ', links: ['Váy/Đầm', 'Áo Dài', 'Áo Tops'] },
        { id: 'cat3', title: 'Thời Trang Trẻ Em', links: ['Áo Thun', 'Váy Tiệc'] },
    ];

    return (
        <Offcanvas show={show} onHide={handleClose} placement="start" className="mobile_menu_area" id="offcanvasWithBothOptions">
            <Offcanvas.Header closeButton className="pb-0">
                <Offcanvas.Title></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {/* Phần cấu hình Ngôn ngữ / Tiền tệ */}
                <ul className="mobile_currency">
                    <li>
                        <select className="select_js language">
                            <option>Tiếng Việt</option>
                            <option>English</option>
                        </select>
                    </li>
                    <li>
                        <select className="select_js">
                            <option>₫VND</option>
                            <option>$USD</option>
                        </select>
                    </li>
                </ul>

                {/* Các icon thao tác nhanh — yêu cầu đăng nhập */}
                <ul className="mobile_menu_header d-flex flex-wrap">
                    <li>
                        <a href="/compare" onClick={(e) => requireLogin(e, '/compare')} title="So sánh">
                            <b><img src="assets/images/compare_black.svg" alt="So sánh" /></b>
                            <span>2</span>
                        </a>
                    </li>
                    <li>
                        <a href="/wishlist" onClick={(e) => requireLogin(e, '/wishlist')} title="Yêu thích">
                            <b><img src="assets/images/love_black.svg" alt="Yêu thích" /></b>
                            <span>4</span>
                        </a>
                    </li>
                    <li>
                        <a href="/cart" onClick={(e) => requireLogin(e, '/cart')} title="Giỏ hàng">
                            <b><img src="assets/images/cart_black.svg" alt="Giỏ hàng" /></b>
                            <span>5</span>
                        </a>
                    </li>
                    <li>
                        {isLoggedIn ? (
                            <Link to="/dashboard" onClick={handleClose} title="Tài khoản">
                                <b><img src="assets/images/user_icon_black.svg" alt="Tài khoản" /></b>
                            </Link>
                        ) : (
                            <Link to="/sign-in" onClick={handleClose} title="Đăng nhập">
                                <b><img src="assets/images/user_icon_black.svg" alt="Đăng nhập" /></b>
                            </Link>
                        )}
                    </li>
                </ul>

                {/* Hiển thị thông tin user nếu đã đăng nhập */}
                {isLoggedIn && (
                    <div className="d-flex align-items-center gap-2 mb-3 p-2" style={{ background: '#f8f9fa', borderRadius: '8px' }}>
                        <img src="assets/images/user_icon_black.svg" alt="user" style={{ width: 28 }} />
                        <div>
                            <div style={{ fontWeight: 600, fontSize: '14px' }}>{user?.full_name || 'Người dùng'}</div>
                            <div style={{ fontSize: '12px', color: '#888' }}>{user?.email}</div>
                        </div>
                    </div>
                )}

                {/* Form tìm kiếm */}
                <form className="mobile_menu_search" onSubmit={(e) => e.preventDefault()}>
                    <input type="text" placeholder="Tìm kiếm sản phẩm..." />
                    <button type="submit"><i className="far fa-search"></i></button>
                </form>

                {/* Khu vực Tab Menu */}
                <div className="mobile_menu_item_area mt-4 custom-mobile-tabs">
                    <Tabs defaultActiveKey="categories" id="mobile-menu-tabs" className="nav-pills mb-3">
                        <Tab eventKey="categories" title="Danh mục">
                            <ul className="main_mobile_menu">
                                {mobileCategories.map((cat) => (
                                    <li key={cat.id} className="mobile_dropdown">
                                        <a href="#!" onClick={(e) => { e.preventDefault(); toggleMenu(cat.id); }}>
                                            {cat.title}{' '}
                                            <i className={`fas fa-chevron-${openMenu === cat.id ? 'up' : 'down'} float-end mt-1`}></i>
                                        </a>
                                        <Collapse in={openMenu === cat.id}>
                                            <ul className="inner_menu mt-2 ms-3">
                                                {cat.links.map((link, idx) => (
                                                    <li key={idx}><Link to="/shop" onClick={handleClose}>{link}</Link></li>
                                                ))}
                                            </ul>
                                        </Collapse>
                                    </li>
                                ))}
                            </ul>
                        </Tab>
                        <Tab eventKey="menu" title="Menu">
                            <ul className="main_mobile_menu">
                                <li><Link to="/" onClick={handleClose}>Trang Chủ</Link></li>
                                <li><Link to="/shop" onClick={handleClose}>Cửa Hàng</Link></li>
                                <li><Link to="/about" onClick={handleClose}>Về Chúng Tôi</Link></li>
                                <li><Link to="/contact" onClick={handleClose}>Liên Hệ</Link></li>
                                {isLoggedIn ? (
                                    <li><Link to="/dashboard" onClick={handleClose}>Tài Khoản</Link></li>
                                ) : (
                                    <li><Link to="/sign-in" onClick={handleClose}>Đăng Nhập</Link></li>
                                )}
                            </ul>
                        </Tab>
                    </Tabs>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default MobileMenu;