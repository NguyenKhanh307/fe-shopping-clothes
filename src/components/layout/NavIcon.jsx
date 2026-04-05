import React from 'react';
import { Link } from 'react-router-dom';

const NavIcons = ({ onOpenCart }) => {
    return (
        <ul className="menu_icon">
            <li>
                <Link to="/compare">
                    <b><img src="assets/images/compare_black.svg" alt="Compare" className="img-fluid" /></b>
                    <span>2</span>
                </Link>
            </li>
            <li>
                <Link to="/wishlist">
                    <b><img src="assets/images/love_black.svg" alt="Wishlist" className="img-fluid" /></b>
                    <span>5</span>
                </Link>
            </li>
            {/* Click vào giỏ hàng sẽ gọi hàm mở Offcanvas */}
            <li>
                <a href="#!" onClick={(e) => { e.preventDefault(); onOpenCart(); }}>
                    <b><img src="assets/images/cart_black.svg" alt="cart" className="img-fluid" /></b>
                    <span>2</span>
                </a>
            </li>
            <li>
                <Link className="user" to="/dashboard">
                    <b><img src="assets/images/user_icon_black.svg" alt="user" className="img-fluid" /></b>
                    <h5>Smith Jhon</h5>
                </Link>
            </li>
        </ul>
    );
};

export default NavIcons;