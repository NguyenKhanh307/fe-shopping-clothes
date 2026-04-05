import React from 'react';
import { Link } from 'react-router-dom';

const SpecialProducts = () => {
    return (
        <section className="special_product_2 pt_85">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-sm-9">
                        <div className="section_heading_2 section_heading">
                            <h3>Our <span>Spatial</span> Brand Products</h3>
                        </div>
                    </div>
                    <div className="col-xl-6 col-sm-3">
                        <div className="view_all_btn_area">
                            <Link className="view_all_btn" to="/shop">View all</Link>
                        </div>
                    </div>
                </div>

                <div className="row pt_15">
                    {/* Banner */}
                    <div className="col-xl-4 wow fadeInLeft">
                        <div className="special_product_banner">
                            <img src="assets/images/home2_special_banner.jpg" alt="special product" className="img-fluid w-100" />
                            <div className="text">
                                <h3>make your fashion look more changing</h3>
                                <p>Get 50% Off on Selected Clothing Items</p>
                                <Link className="common_btn" to="/shop">shop now <i className="fas fa-long-arrow-right"></i></Link>
                            </div>
                        </div>
                    </div>
                    
                    {/* Danh sách thẻ ngang (Tạm fix cứng 2 item để test, bạn nhân bản ra nhé) */}
                    <div className="col-xl-8">
                        <div className="row">
                            {[1, 2, 3, 4].map(item => (
                                <div key={item} className="col-md-6 wow fadeInUp">
                                    <div className="special_product_item mb-4">
                                        <div className="special_product_img">
                                            <img src={`assets/images/product_${item === 1 ? '30' : item}.png`} alt="product" className="img-fluid w-100" />
                                            <span className="discount">save $50</span>
                                        </div>
                                        <div className="special_product_text">
                                            <Link className="title" to="/shop/1">Men's premium formal pant</Link>
                                            <span>
                                                <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star-half-alt"></i><i className="far fa-star"></i>
                                            </span>
                                            <p>$29.00 <del>$32.00</del></p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SpecialProducts;