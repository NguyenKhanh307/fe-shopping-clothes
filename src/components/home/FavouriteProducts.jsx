import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import ProductCard from '../common/ProductCard'; // Tận dụng lại ProductCard siêu xịn của chúng ta

const FavouriteProducts = () => {
    // Cấu hình Slider cho dải sản phẩm bên phải
    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1 } }
        ]
    };

    // Dữ liệu giả lập
    const favProducts = [
        { id: 1, name: "cherry fabric western tops", salePrice: 54, isNew: true, reviewsCount: 98, image: "/assets/images/product_22.png" },
        { id: 2, name: "Women denim jacket", salePrice: 49, reviewsCount: 44, image: "/assets/images/product_24.png" },
        { id: 3, name: "Kid's Western Party Dress", salePrice: 40, originalPrice: 48, discountPercent: 20, reviewsCount: 20, image: "/assets/images/product_23.png" },
        { id: 4, name: "Half Sleeve Jachket for Women", salePrice: 60, reviewsCount: 57, image: "/assets/images/product_25.png" }
    ];

    return (
        <section className="favourite_product_2 mt_100">
            <div className="container">
                <div className="row">
                    {/* Banner bên trái */}
                    <div className="col-xl-3 col-lg-4 wow fadeInLeft">
                        <div className="bundle_product_banner">
                            <img src="/assets/images/favourite_pro_2_banner_img.png" alt="bundle" className="img-fluid" />
                            <div className="text">
                                <h4>This Spring On Apple <span>Up To 50K Off</span></h4>
                                <p>Limited Time Offer</p>
                                <Link className="common_btn" to="/shop">shop now <i className="fas fa-long-arrow-right"></i></Link>
                            </div>
                        </div>
                    </div>
                    
                    {/* Khu vực Slider bên phải */}
                    <div className="col-xl-9 col-lg-8">
                        <div className="row">
                            <div className="col-xl-8">
                                <div className="section_heading_2 section_heading">
                                    <h3>Our <span>Favorite</span> Style Product</h3>
                                </div>
                            </div>
                            <div className="col-12 mt_40">
                                <Slider {...sliderSettings} className="favourite_product_2_slider">
                                    {favProducts.map(prod => (
                                        <div key={prod.id} className="px-2"> {/* Thêm padding để tạo khoảng cách giữa các slide */}
                                            <ProductCard product={prod} />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FavouriteProducts;