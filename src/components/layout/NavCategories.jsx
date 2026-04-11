import React from 'react';
import { Link } from 'react-router-dom';

const NavCategories = () => {
    return (
        <div className="menu_category_area">
            <Link to="/" className="menu_logo d-none">
                <img src="/assets/images/logo_2.png" alt="Zenis" className="img-fluid w-100" />
            </Link>
            <div className="menu_category_bar">
                <p>
                    <span>
                        <img src="/assets/images/bar_icon_white.svg" alt="category icon" />
                    </span>
                    Danh mục sản phẩm
                </p>
                <i className="fas fa-chevron-down"></i>
            </div>

            <ul className="menu_cat_item">
                <li>
                    <Link to="/shop">
                        <span><img src="/assets/images/category_list_icon_1.png" alt="category" /></span>
                        Men’s Fashion
                    </Link>
                    <ul className="menu_cat_droapdown">
                        <li>
                            <Link to="/shop">shirts <i className="fas fa-angle-right"></i></Link>
                            <ul className="sub_category">
                                <li><Link to="/shop">Casual Shirts</Link> </li>
                                <li><Link to="/shop">Formal Shirts</Link></li>
                                <li><Link to="/shop">Denim Shirts</Link></li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/shop">pant <i className="fas fa-angle-right"></i></Link>
                            <ul className="sub_category">
                                <li><Link to="/shop">Casual Pants</Link></li>
                                <li><Link to="/shop">Formal Trousers</Link> </li>
                                <li><Link to="/shop">Jeans & Denim</Link></li>
                            </ul>
                        </li>
                        <li><Link to="/shop">Casual Wear</Link></li>
                        <li><Link to="/shop">Formal Attire</Link></li>
                    </ul>
                </li>
                <li>
                    <Link to="/shop">
                        <span><img src="/assets/images/category_list_icon_2.png" alt="category" /></span>
                        Women's Fashion
                    </Link>
                    <ul className="menu_cat_droapdown">
                        <li><Link to="/shop">sharee</Link></li>
                        <li>
                            <Link to="/shop">Shirts <i className="fas fa-angle-right"></i></Link>
                            <ul className="sub_category">
                                <li><Link to="/shop">Full Sleeves</Link> </li>
                                <li><Link to="/shop">Half Sleeves</Link></li>
                            </ul>
                        </li>
                        <li><Link to="/shop">Nightie Set</Link></li>
                    </ul>
                </li>
                <li>
                    <Link to="/shop">
                        <span><img src="/assets/images/category_list_icon_3.png" alt="category" /></span>
                        Kid's Fashion
                    </Link>
                </li>
                <li>
                    <Link to="/shop">
                        <span><img src="/assets/images/category_list_icon_4.png" alt="category" /></span>
                        Denim Collection
                    </Link>
                </li>
                <li>
                    <Link to="/shop">
                        <span><img src="/assets/images/category_list_icon_5.png" alt="category" /></span>
                        Western Wear
                    </Link>
                </li>
                <li className="all_category">
                    <Link to="/categories">View All Categories <i className="far fa-arrow-right"></i></Link>
                </li>
            </ul>
        </div>
    );
};

export default NavCategories;