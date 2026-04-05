import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
    // Dữ liệu Slider (Nên đưa vào file data tĩnh hoặc lấy từ API)
    const slidesData = [
        {
            id: 1,
            bgImage: 'assets/images/slider_1.jpg',
            subTitle: 'New arrivals of 2025',
            title: 'Where Fashion Meets Individuality',
            link: '/shop/1'
        },
        {
            id: 2,
            bgImage: 'assets/images/slider_2.jpg',
            subTitle: 'Trending of this month',
            title: 'Make your fashion look more changing',
            link: '/shop/2'
        },
        {
            id: 3,
            bgImage: 'assets/images/slider_3.jpg',
            subTitle: 'Best selling of 2025',
            title: 'Discover your Best fitting Clothes',
            link: '/shop/3'
        }
    ];

    // Cấu hình cho react-slick (Thay thế cho file custom.js của jQuery)
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false // Tắt nút Next/Prev nếu muốn giống template gốc
    };

    return (
        <section className="banner_2">
            <div className="container">
                <div className="row">
                    {/* Cột 1: Danh mục bên trái (Dành cho Desktop lớn) */}
                    <div className="col-xl-2 d-none d-xxl-block">
                        {/* Gợi ý: Bạn có thể tái sử dụng component NavCategories 
                            mà chúng ta đã nhắc đến ở phần Navbar vào đây.
                        */}
                        <div className="bg-light h-100 p-3">
                            <p className="text-muted text-center pt-5">Category Menu Component</p>
                        </div>
                    </div>

                    {/* Cột 2: Slider Chính */}
                    <div className="col-xxl-7 col-lg-8">
                        <div className="banner_content">
                            <Slider {...sliderSettings} className="banner_2_slider">
                                {slidesData.map((slide) => (
                                    <div key={slide.id} className="col-xl-12">
                                        <div 
                                            className="banner_slider_2" 
                                            style={{ background: `url(${slide.bgImage}) center/cover no-repeat` }}
                                        >
                                            <div className="banner_slider_2_text">
                                                <h3>{slide.subTitle}</h3>
                                                <h1>{slide.title}</h1>
                                                <Link className="common_btn" to={slide.link}>
                                                    shop now <i className="fas fa-long-arrow-right"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>

                    {/* Cột 3: Banner Quảng Cáo Bên Phải */}
                    <div className="col-xxl-3 col-lg-4 col-sm-12 col-md-12 mt-4 mt-lg-0">
                        <div className="row h-100">
                            <div className="col-xl-12 h-100">
                                <div 
                                    className="banner_2_add h-100 d-flex align-items-center" 
                                    style={{ background: 'url(assets/images/banner_3_add_bg_1.jpg) center/cover no-repeat' }}
                                >
                                    <div className="text px-4">
                                        <h4>Summer Offer</h4>
                                        <h2 className="fs-3">Make Your Fashion Story Unique Every Day</h2>
                                        <Link className="common_btn mt-3" to="/shop">
                                            shop now <i className="fas fa-long-arrow-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroBanner;