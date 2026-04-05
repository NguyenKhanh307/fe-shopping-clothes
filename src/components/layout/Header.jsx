import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header_2">
            <div className="container">
                <div className="row align-items-center">
                    {/* Logo Area */}
                    <div className="col-lg-2">
                        <div className="header_logo_area">
                            <Link to="/" className="header_logo">
                                <img src="/assets/images/logo_2.png" alt="Zenis" className="img-fluid w-100" />
                            </Link>
                            <div className="mobile_menu_icon d-block d-lg-none" data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
                                <span className="mobile_menu_icon"><i className="fa-solid fa-bars-staggered menu_icon_bar" aria-hidden="true"></i></span>
                            </div>
                        </div>
                    </div>

                    {/* Search Form */}
                    {/* ĐÃ SỬA LỖI: col-xXl thành col-xxl */}
                    <div className="col-xxl-6 col-xl-5 col-lg-5 d-none d-lg-block">
                        <form action="#">
                            <select className="select_2" defaultValue="All Categories">
                                <option value="All Categories">All Categories</option>
                                <option value="Fashion">Fashion</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Fashion & Beauty">Fashion & Beauty</option>
                                <option value="Jewelry">Jewelry</option>
                                <option value="Grocery">Grocery</option>
                            </select>
                            <div className="input">
                                <input type="text" placeholder="Search your product..." />
                                <button type="submit" aria-label="Search"><i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i></button>
                            </div>
                        </form>
                    </div>

                    {/* Hotline & Language/Currency */}
                    {/* ĐÃ SỬA LỖI: col-xXl thành col-xxl */}
                    <div className="col-xxl-4 col-xl-5 col-lg-5 d-none d-lg-flex">
                        <div className="header_support_user d-flex flex-wrap">
                            <div className="header_support">
                                <span className="icon">
                                    <i className="fa-solid fa-phone" aria-hidden="true"></i>
                                </span>
                                <h3>
                                    Hotline:
                                    <a href="callto:1234567890">
                                        <span>+(402) 763 282 46</span>
                                    </a>
                                </h3>
                            </div>
                        </div>
                        <div className="topbar_right d-flex flex-wrap align-items-center justify-content-end">
                            <select className="select_js language" defaultValue="English">
                                <option value="English">English</option>
                                <option value="Arabic">Arabic</option>
                            </select>
                            <select className="select_js" defaultValue="$USD">
                                <option value="$USD">$USD</option>
                                <option value="€EUR">€EUR</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;