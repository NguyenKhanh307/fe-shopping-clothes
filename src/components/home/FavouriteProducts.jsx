import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import productService from '../../services/productService';
import ProductCard from '../common/ProductCard';

const FavouriteProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading]   = useState(true);
    const [error, setError]       = useState(null);

    useEffect(() => {
        productService.getFavouriteProducts()
            .then(data => setProducts(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 2 } },
            { breakpoint: 768,  settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <section className="favourite_product_2 mt_100">
            <div className="container">
                <div className="row">
                    {/* Banner bên trái */}
                    <div className="col-xl-3 col-lg-4 wow fadeInLeft">
                        <div className="bundle_product_banner">
                            <img src="/assets/images/favourite_pro_2_banner_img.png" alt="bundle" className="img-fluid" />
                            <div className="text">
                                <h4>Mùa Xuân Này <span>Giảm Đến 50%</span></h4>
                                <p>Ưu Đãi Thời Hạn</p>
                                <Link className="common_btn" to="/shop">
                                    mua ngay <i className="fas fa-long-arrow-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Slider bên phải */}
                    <div className="col-xl-9 col-lg-8">
                        <div className="row">
                            <div className="col-xl-8">
                                <div className="section_heading_2 section_heading">
                                    <h3>Phong Cách <span>Yêu Thích</span> Của Chúng Tôi</h3>
                                </div>
                            </div>
                            <div className="col-12 mt_40">
                                {loading && <p className="text-center py-4">Đang tải...</p>}
                                {error   && <p className="text-center py-4 text-danger">Không thể tải dữ liệu.</p>}
                                {!loading && !error && products.length > 0 && (
                                    <Slider {...sliderSettings} className="favourite_product_2_slider">
                                        {products.map(prod => (
                                            <div key={prod.id} className="px-2">
                                                <ProductCard product={prod} />
                                            </div>
                                        ))}
                                    </Slider>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FavouriteProducts;