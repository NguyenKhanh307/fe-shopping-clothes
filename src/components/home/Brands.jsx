import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import brandService from '../../services/brandService';

const Brands = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        brandService.getAllBrands()
            .then(data => setBrands(data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 4 } },
            { breakpoint: 992,  settings: { slidesToShow: 3 } },
            { breakpoint: 576,  settings: { slidesToShow: 2 } },
        ],
    };

    if (loading) return null;

    return (
        <section className="brand_2 mt_85">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-sm-9">
                        <div className="section_heading_2 section_heading">
                            <h3>Thương Hiệu <span>Hàng Đầu</span></h3>
                        </div>
                    </div>
                    <div className="col-xl-6 col-sm-3">
                        <div className="view_all_btn_area">
                            <Link className="view_all_btn" to="/brand">Xem tất cả</Link>
                        </div>
                    </div>
                </div>
                <div className="row mt_40">
                    <div className="col-12">
                        <Slider {...settings}>
                            {brands.map((brand, index) => (
                                <div key={brand.id ?? index} className="px-3 wow fadeInUp">
                                    <Link to={brand.link}>
                                        <img
                                            src={brand.image}
                                            alt={brand.name ?? `Brand ${index + 1}`}
                                            className="img-fluid"
                                        />
                                    </Link>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Brands;