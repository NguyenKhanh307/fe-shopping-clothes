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
                    <div className="col-xxl-6 col-xl-5 col-lg-5 d-none d-lg-block">
                        <form action="#">
                            <select className="select_2" defaultValue="Tất cả danh mục">
                                <option value="Tất cả danh mục">Tất cả danh mục</option>
                                <option value="Thời trang">Thời trang</option>
                                <option value="Điện tử">Điện tử</option>
                                <option value="Thời trang & Làm đẹp">Thời trang & Làm đẹp</option>
                                <option value="Trang sức">Trang sức</option>
                            </select>
                            <div className="input">
                                <input type="text" placeholder="Tìm kiếm sản phẩm..." />
                                <button type="submit" aria-label="Search"><i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i></button>
                            </div>
                        </form>
                    </div>

                    {/* Hotline & Language/Currency */}
                    <div className="col-xxl-4 col-xl-5 col-lg-5 d-none d-lg-flex">
                        <div className="header_support_user d-flex flex-wrap">
                            <div className="header_support">
                                <span className="icon">
                                    <i className="fa-solid fa-phone" aria-hidden="true"></i>
                                </span>
                                <h3>
                                    Hotline:
                                    <a href="callto:1234567890">
                                        <span>+(84) 90 1234 567</span>
                                    </a>
                                </h3>
                            </div>
                        </div>
                        <div className="topbar_right d-flex flex-wrap align-items-center justify-content-end">
                            <select className="select_js language" defaultValue="Tiếng Việt">
                                <option value="Tiếng Việt">Tiếng Việt</option>
                                <option value="Tiếng Anh">Tiếng Anh</option>
                            </select>
                            <select className="select_js" defaultValue="VNĐ">
                                <option value="VNĐ">VNĐ</option>
                                <option value="$USD">$USD</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;