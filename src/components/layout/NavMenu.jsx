import React from 'react';
import { Link } from 'react-router-dom';

const NavMenu = () => {
    return (
        <ul className="menu_item">
            <li>
                <Link className="active" to="/">trang chủ</Link>
            </li>
            <li><Link to="/flash-deals">Flash Sales</Link></li>
            <li>
                <Link to="#">Trang <i className="fas fa-chevron-down"></i></Link>
                <ul className="menu_droapdown">
                    <li><Link to="/about">Giới Thiệu</Link></li>
                    <li><Link to="/category">Danh Mục</Link></li>
                    <li><Link to="/brand">Thương Hiệu</Link></li>
                    <li><Link to="/cart">Giỏ Hàng</Link></li>
                    <li><Link to="/wishlist">Danh Sách Yêu Thích</Link></li>
                    <li><Link to="/compare">So Sánh</Link></li>
                    <li><Link to="/checkout">Thanh Toán</Link></li>
                    <li><Link to="/payment-success">Thanh Toán Thành Công</Link></li>
                    <li><Link to="/track-order">Theo Dõi Đơn Hàng</Link></li>
                    <li><Link to="/faq">Câu Hỏi Thường Gặp</Link></li>
                    <li><Link to="/privacy-policy">Chính Sách Bảo Mật</Link></li>
                    <li><Link to="/terms-condition">Điều Khoản & Điều Kiện</Link></li>
                    <li><Link to="/return-policy">Chính Sách Đổi Trả</Link></li>
                    <li><Link to="/sign-in">Đăng Nhập</Link></li>
                    <li><Link to="/sign-up">Đăng Ký</Link></li>
                    <li><Link to="/forgot-password">Quên Mật Khẩu</Link></li>
                    <li><Link to="/dashboard">Bảng Điều Khiển</Link></li>
                </ul>
            </li>
            <li>
                <Link to="/blog">Blog</Link>
            </li>
            <li><Link to="/contact">liên hệ</Link></li>
        </ul>
    );
};

export default NavMenu;