import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productService from '../../services/productService';

const SpecialProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading]   = useState(true);
    const [error, setError]       = useState(null);

    useEffect(() => {
        productService.getSpecialProducts()
            .then(data => setProducts(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className="special_product_2 pt_85">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-sm-9">
                        <div className="section_heading_2 section_heading">
                            <h3>Sản Phẩm <span>Đặc Biệt</span></h3>
                        </div>
                    </div>
                    <div className="col-xl-6 col-sm-3">
                        <div className="view_all_btn_area">
                            <Link className="view_all_btn" to="/shop">Xem tất cả</Link>
                        </div>
                    </div>
                </div>

                <div className="row pt_15">
                    {/* Banner tĩnh bên trái */}
                    <div className="col-xl-4 wow fadeInLeft">
                        <div className="special_product_banner">
                            <img
                                src="assets/images/home2_special_banner.jpg"
                                alt="special product"
                                className="img-fluid w-100"
                            />
                            <div className="text">
                                <h3>Làm Mới Phong Cách Của Bạn</h3>
                                <p>Giảm 50% Các Mặt Hàng Thời Trang</p>
                                <Link className="common_btn" to="/shop">
                                    mua ngay <i className="fas fa-long-arrow-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Grid sản phẩm bên phải */}
                    <div className="col-xl-8">
                        <div className="row">
                            {loading && <p className="text-center py-5">Đang tải sản phẩm...</p>}
                            {error   && <p className="text-center py-5 text-danger">Không thể tải dữ liệu.</p>}
                            {!loading && !error && products.map(product => (
                                <div key={product.id} className="col-md-6 wow fadeInUp">
                                    <div className="special_product_item mb-4">
                                        <div className="special_product_img">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="img-fluid w-100"
                                            />
                                            {product.originalPrice && product.salePrice && (
                                                <span className="discount">
                                                    tiết kiệm {(product.originalPrice - product.salePrice).toLocaleString('vi-VN')}₫
                                                </span>
                                            )}
                                        </div>
                                        <div className="special_product_text">
                                            <Link className="title" to={`/shop/${product.id}`}>
                                                {product.name}
                                            </Link>
                                            <span>
                                                {[1,2,3,4,5].map(i => (
                                                    <i key={i} className={
                                                        i <= Math.floor(product.rating ?? 4)
                                                            ? 'fas fa-star'
                                                            : i - 0.5 <= (product.rating ?? 4)
                                                                ? 'fas fa-star-half-alt'
                                                                : 'far fa-star'
                                                    }></i>
                                                ))}
                                            </span>
                                            <p>
                                                {product.salePrice?.toLocaleString('vi-VN')}₫
                                                {product.originalPrice && (
                                                    <del> {product.originalPrice?.toLocaleString('vi-VN')}₫</del>
                                                )}
                                            </p>
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