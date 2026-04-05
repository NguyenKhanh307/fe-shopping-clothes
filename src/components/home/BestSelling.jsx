import React from 'react';
import { Link } from 'react-router-dom';

const BestSelling = () => {
    return (
        <section className="best_selling_product_2 mt_95">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-sm-9">
                        <div className="section_heading_2 section_heading">
                            <h3>Our <span>Best</span> Selling Products</h3>
                        </div>
                    </div>
                    <div className="col-xl-6 col-sm-3">
                        <div className="view_all_btn_area">
                            <Link className="view_all_btn" to="/shop">View all</Link>
                        </div>
                    </div>
                </div>
                <div className="row mt_15">
                    {/* Cột trái chứa 3 sản phẩm nhỏ */}
                    <div className="col-xl-7">
                        <div className="row">
                            <div className="col-xl-4 col-sm-6 col-md-4 wow fadeInUp">
                                <div className="best_selling_product_item">
                                    <img src="/assets/images/best_sell_pro_img_1.jpg" alt="best sell" className="img-fluid w-100" />
                                    <div className="text">
                                        <Link className="title" to="/shop/1">Men's trendy casual shoes</Link>
                                        <p className="price">$89.00 <del>$112.00</del></p>
                                        <Link className="buy_btn" to="/shop/1">buy now <i className="far fa-arrow-up"></i></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-sm-6 col-md-4 wow fadeInUp">
                                <div className="best_selling_product_item">
                                    <img src="/assets/images/best_sell_pro_img_2.jpg" alt="best sell" className="img-fluid w-100" />
                                    <div className="text">
                                        <Link className="title" to="/shop/2">Kid's Western Party Dress</Link>
                                        <p className="price">$75.00 <del>$99.00</del></p>
                                        <Link className="buy_btn" to="/shop/2">buy now <i className="far fa-arrow-up"></i></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-sm-6 col-md-4 wow fadeInUp">
                                <div className="best_selling_product_item">
                                    <img src="/assets/images/best_sell_pro_img_3.jpg" alt="best sell" className="img-fluid w-100" />
                                    <div className="text">
                                        <Link className="title" to="/shop/3">Men's Casual Winter Jacket</Link>
                                        <p className="price">$60.00 <del>$65.00</del></p>
                                        <Link className="buy_btn" to="/shop/3">buy now <i className="far fa-arrow-up"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Cột phải chứa 1 sản phẩm/banner lớn */}
                    <div className="col-xl-5 wow fadeInRight">
                        <div className="best_selling_product_item_large">
                            <img src="/assets/images/best_sell_pro_img_4.jpg" alt="best sell" className="img-fluid w-100" />
                            <div className="text">
                                <Link className="title" to="/shop">Best Sales Discount And Offers</Link>
                                <p className="price">$89.00 <del>$112.00</del></p>
                                <Link className="common_btn" to="/shop">buy now <i className="fas fa-long-arrow-right"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BestSelling;