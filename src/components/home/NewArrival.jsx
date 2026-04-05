import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../common/ProductCard';

const NewArrival = () => {
    // Mock data nhanh
    const products = [
        { id: 1, name: "Full Sleeve Hoodie Jacket", salePrice: 88, isNew: true, reviewsCount: 20, image: "assets/images/product_18.png", colors: ["#DB4437", "#638C34"] },
        { id: 2, name: "Men's premium formal shirt", salePrice: 46, isNew: true, reviewsCount: 17, image: "assets/images/product_19.png", colors: ["#DB4437"] },
        { id: 3, name: "Comfortable Sports Sneakers", salePrice: 75, isNew: true, reviewsCount: 58, image: "assets/images/product_4.png", colors: [] }
    ];

    return (
        <section className="new_arrival_2 mt_95">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-sm-9">
                        <div className="section_heading_2 section_heading">
                            <h3>Our <span>New</span> arrival Products</h3>
                        </div>
                    </div>
                    <div className="col-xl-6 col-sm-3">
                        <div className="view_all_btn_area">
                            <Link className="view_all_btn" to="/shop">View all</Link>
                        </div>
                    </div>
                </div>
                <div className="row mt_15">
                    {products.map(p => (
                        <div key={p.id} className="col-xl-1-5 col-lg-3 col-md-4 col-sm-6 mb-4 wow fadeInUp">
                            <ProductCard product={p} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewArrival;