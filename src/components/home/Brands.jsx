import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

const Brands = () => {
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
            { breakpoint: 992, settings: { slidesToShow: 3 } },
            { breakpoint: 576, settings: { slidesToShow: 2 } }
        ]
    };

    // Mảng lưu tên file ảnh logo (có thể lên tới hàng chục cái)
    const brandImages = [
        "brand1.png", "brand2.png", "brand3.png", "brand4.png", "brand5.png",
        "brand6.png", "brand7.png", "brand8.png", "brand9.png", "brand10.png"
    ];

    return (
        <section className="brand_2 mt_85">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-sm-9">
                        <div class="section_heading_2 section_heading">
                            <h3>Our Top <span>Brands</span></h3>
                        </div>
                    </div>
                    <div className="col-xl-6 col-sm-3">
                        <div className="view_all_btn_area">
                            <Link className="view_all_btn" to="/brand">View all</Link>
                        </div>
                    </div>
                </div>
                <div className="row mt_40">
                    <div className="col-12">
                        <Slider {...settings}>
                            {brandImages.map((img, index) => (
                                <div key={index} className="px-3 wow fadeInUp">
                                    <Link to="/shop">
                                        <img src={`/assets/images/${img}`} alt={`Brand ${index}`} className="img-fluid" />
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