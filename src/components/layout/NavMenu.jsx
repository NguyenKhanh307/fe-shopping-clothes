import React from 'react';
import { Link } from 'react-router-dom';

const NavMenu = () => {
    return (
        <ul className="menu_item">
            <li>
                <Link className="active" to="/">home <i className="fas fa-chevron-down"></i></Link>
                <ul className="menu_droapdown">
                    <li><Link className="active" to="/">Clothing Fashion 01</Link></li>
                    <li><Link to="/">Clothing Fashion 02</Link></li>
                    <li><Link to="/">Grocery Store</Link></li>
                    <li><Link to="/">Beauty & Cosmetics</Link></li>
                </ul>
            </li>
            <li>
                <Link to="/shop">shop <i className="fas fa-chevron-down"></i></Link>
                <ul className="menu_droapdown">
                    <li><Link to="/shop">Shop</Link></li>
                    <li><Link to="/shop/1">Shop Details</Link></li>
                </ul>
            </li>
            <li>
                <Link to="/stores">Stores <i className="fas fa-chevron-down"></i></Link>
                <ul className="menu_droapdown">
                    <li><Link to="/stores">Store</Link></li>
                    <li><Link to="/stores/1">Store Details</Link></li>
                    <li><Link to="/vendor-register">Become a Vendor</Link></li>
                </ul>
            </li>
            <li><Link to="/flash-deals">Flash Deals</Link></li>
            <li>
            <li>
    <Link to="#">pages <i className="fas fa-chevron-down"></i></Link>
    <ul className="menu_droapdown">
        <li><Link to="/about">about us</Link></li>
        <li><Link to="/category">Category</Link></li>
        <li><Link to="/brand">Brand</Link></li>
        <li><Link to="/cart">cart view</Link></li>
        <li><Link to="/wishlist">wishlist</Link></li>
        <li><Link to="/compare">compare</Link></li>
        <li><Link to="/checkout">checkout</Link></li>
        <li><Link to="/payment-success">payment success</Link></li>
        <li><Link to="/track-order">track order</Link></li>
        <li><Link to="/404">error/404</Link></li>
        <li><Link to="/faq">FAQ's</Link></li>
        <li><Link to="/privacy-policy">privacy Policy</Link></li>
        <li><Link to="/terms-condition">terms and condition</Link></li>
        <li><Link to="/return-policy">return policy</Link></li>
        <li><Link to="/sign-in">sign in</Link></li>
        <li><Link to="/sign-up">sign up</Link></li>
        <li><Link to="/forgot-password">forgot password</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
    </ul>
</li>
            </li>
            <li>
                <Link to="/blog">blog <i className="fas fa-chevron-down"></i></Link>
                <ul className="menu_droapdown">
                    <li><Link to="/blog">blog classic</Link></li>
                    <li><Link to="/blog/1">blog details</Link></li>
                </ul>
            </li>
            <li><Link to="/contact">contact</Link></li>
        </ul>
    );
};

export default NavMenu;