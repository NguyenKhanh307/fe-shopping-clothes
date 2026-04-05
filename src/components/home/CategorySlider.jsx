import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import categoryService from '../../services/categoryService';

const CategorySlider = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading]       = useState(true);

    useEffect(() => {
        categoryService.getAllCategories()
            .then(data => setCategories(data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 5 } },
            { breakpoint: 992,  settings: { slidesToShow: 4 } },
            { breakpoint: 768,  settings: { slidesToShow: 3 } },
            { breakpoint: 576,  settings: { slidesToShow: 2 } },
        ],
    };

    if (loading) return null; // Không hiển thị skeleton để tránh layout shift

    return (
        <section className="category category_2 mt_55">
            <div className="container">
                <Slider {...settings} className="row category_2_slider_react">
                    {categories.map(cat => (
                        <div key={cat.id} className="col-12 px-2 wow fadeInUp">
                            <Link to={cat.link} className="category_item">
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