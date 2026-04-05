import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

const CategorySlider = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 5 } },
            { breakpoint: 992, settings: { slidesToShow: 4 } },
            { breakpoint: 768, settings: { slidesToShow: 3 } },
            { breakpoint: 576, settings: { slidesToShow: 2 } }
        ]
    };

    const categories = [
        { id: 1, name: "Men's Fashion", img: "assets/images/category_img_2.png" },
        { id: 2, name: "Women's Fashion", img: "assets/images/category_img_3.png" },
        { id: 3, name: "Kids Fashion", img: "assets/images/category_img_1.png" },
        { id: 4, name: "Accessories", img: "assets/images/category_img_4.png" },
        { id: 5, name: "Footwear", img: "assets/images/category_img_5.png" },
        { id: 6, name: "Jewellery", img: "assets/images/category_img_6.png" }
    ];

    return (
        <section className="category category_2 mt_55">
            <div className="container">
                <Slider {...settings} className="row category_2_slider_react">
                    {categories.map(cat => (
                        <div key={cat.id} className="col-12 px-2 wow fadeInUp">
                            <Link to="/shop" className="category_item">
                                <div className="img">
                                    <img src={cat.img} alt={cat.name} className="img-fluid w-100" />
                                </div>
                                <h3>{cat.name}</h3>
                            </Link>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default CategorySlider;