import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productService from '../../services/productService';

const BestSelling = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading]   = useState(true);
    const [error, setError]       = useState(null);

    useEffect(() => {
        productService.getBestSellingProducts()
            .then(data => setProducts(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    // 3 sản phẩm nhỏ bên trái, 1 sản phẩm lớn bên phải
    const leftItems  = products.slice(0, 3);
    const rightItem  = products[3] ?? products[0] ?? null;

    return (
        <section className="best_selling_product_2 mt_95">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-sm-9">
                        <div className="section_heading_2 section_heading">
                            <h3>Sản Phẩm <span>Bán Chạy</span> Nhất</h3>
                        </div>
                    </div>
                    <div className="col-xl-6 col-sm-3">
                        <div className="view_all_btn_area">
                            <Link className="view_all_btn" to="/shop">Xem tất cả</Link>
                        </div>
                    </div>
                </div>

                {loading && <p className="text-center py-5">Đang tải sản phẩm...</p>}
                {error   && <p className="text-center py-5 text-danger">Không thể tải dữ liệu.</p>}

                {!loading && !error && (
                    <div className="row mt_15">
                        {/* Cột trái: 3 sản phẩm nhỏ */}
                        <div className="col-xl-7">
                            <div className="row">
                                {leftItems.map(product => (
                                    <div key={product.id} className="col-xl-4 col-sm-6 col-md-4 wow fadeInUp">
                                        <div className="best_selling_product_item">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="img-fluid w-100"
                                            />
                                            <div className="text">
                                                <Link className="title" to={`/shop/${product.id}`}>
                                                    {product.name}
                                                </Link>
                                                <p className="price">
                                                    {product.salePrice?.toLocaleString('vi-VN')}₫
                                                    {product.originalPrice && (
                                                        <del> {product.originalPrice?.toLocaleString('vi-VN')}₫</del>
                                                    )}
                                                </p>
                                                <Link className="buy_btn" to={`/shop/${product.id}`}>
                                                    mua ngay <i className="far fa-arrow-up"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Cột phải: 1 sản phẩm lớn */}
                        {rightItem && (
                            <div className="col-xl-5 wow fadeInRight">
                                <div className="best_selling_product_item_large">
                                    <img
                                        src={rightItem.image}
                                        alt={rightItem.name}
                                        className="img-fluid w-100"
                                    />
                                    <div className="text">
                                        <Link className="title" to="/shop">{rightItem.name}</Link>
                                        <p className="price">
                                            {rightItem.salePrice?.toLocaleString('vi-VN')}₫
                                            {rightItem.originalPrice && (
                                                <del> {rightItem.originalPrice?.toLocaleString('vi-VN')}₫</del>
                                            )}
                                        </p>
                                        <Link className="common_btn" to="/shop">
                                            mua ngay <i className="fas fa-long-arrow-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default BestSelling;