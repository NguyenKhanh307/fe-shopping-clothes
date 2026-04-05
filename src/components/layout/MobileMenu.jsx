import React, { useState } from 'react';
import { Offcanvas, Tab, Tabs, Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MobileMenu = ({ show, handleClose }) => {
    // Quản lý trạng thái mở rộng của các menu con (Accordion)
    const [openMenu, setOpenMenu] = useState(null);

    const toggleMenu = (menuId) => {
        setOpenMenu(openMenu === menuId ? null : menuId);
    };

    // Dữ liệu mẫu cho Mobile Menu (Nên tách ra file data riêng)
    const mobileCategories = [
        { id: 'cat1', title: "Men's Fashion", links: ['Jeans Pant', 'Formal Shirt', 'T-Shirt'] },
        { id: 'cat2', title: "Women's Fashion", links: ['Sharee', 'Kurti', 'Tops'] },
        { id: 'cat3', title: "Kids Fashion", links: ['T-Shirt', 'Party Dress'] },
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
                            <option>English</option>
                            <option>Arabic</option>
                        </select>
                    </li>
                    <li>
                        <select className="select_js">
                            <option>$USD</option>
                            <option>€EUR</option>
                        </select>
                    </li>
                </ul>

                {/* Các icon thao tác nhanh */}
                <ul className="mobile_menu_header d-flex flex-wrap">
                    <li><Link to="/compare"><b><img src="assets/images/compare_black.svg" alt="Compare" /></b><span>2</span></Link></li>
                    <li><Link to="/wishlist"><b><img src="assets/images/love_black.svg" alt="Wishlist" /></b><span>4</span></Link></li>
                    <li><Link to="/cart"><b><img src="assets/images/cart_black.svg" alt="Cart" /></b><span>5</span></Link></li>
                    <li><Link to="/dashboard"><b><img src="assets/images/user_icon_black.svg" alt="User" /></b></Link></li>
                </ul>

                {/* Form tìm kiếm */}
                <form className="mobile_menu_search" onSubmit={(e) => e.preventDefault()}>
                    <input type="text" placeholder="Search" />
                    <button type="submit"><i className="far fa-search"></i></button>
                </form>

                {/* Khu vực Tab Menu */}
                <div className="mobile_menu_item_area mt-4 custom-mobile-tabs">
                    <Tabs defaultActiveKey="categories" id="mobile-menu-tabs" className="nav-pills mb-3">
                        <Tab eventKey="categories" title="Categories">
                            <ul className="main_mobile_menu">
                                {mobileCategories.map((cat) => (
                                    <li key={cat.id} className="mobile_dropdown">
                                        {/* Nút bấm để xổ menu con */}
                                        <a href="#!" onClick={(e) => { e.preventDefault(); toggleMenu(cat.id); }}>
                                            {cat.title} <i className={`fas fa-chevron-${openMenu === cat.id ? 'up' : 'down'} float-end mt-1`}></i>
                                        </a>
                                        {/* react-bootstrap Collapse thay thế cho jQuery slideToggle */}
                                        <Collapse in={openMenu === cat.id}>
                                            <ul className="inner_menu mt-2 ms-3">
                                                {cat.links.map((link, idx) => (
                                                    <li key={idx}><Link to="/shop">{link}</Link></li>
                                                ))}
                                            </ul>
                                        </Collapse>
                                    </li>
                                ))}
                            </ul>
                        </Tab>
                        <Tab eventKey="menu" title="Menu">
                            <ul className="main_mobile_menu">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/shop">Shop</Link></li>
                                <li><Link to="/about">About Us</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                            </ul>
                        </Tab>
                    </Tabs>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default MobileMenu;