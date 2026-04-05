import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productService from '../../services/productService';
import ProductCard from '../common/ProductCard';

const FlashSale = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading]   = useState(true);
    const [error, setError]       = useState(null);

    useEffect(() => {
        productService.getFlashSaleProducts()
            .then(data => setProducts(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className="flash_sell_2 flash_sell mt_95">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-xxl-6 col-md-3 col-xl-4">
                        <div className="section_heading_2 section_heading">
                            <h3><span>Flash</span> Sell</h3>
                        </div>
                    </div>
                    <div className="col-xxl-6 col-md-9 col-xl-8">
                        <div className="d-flex flex-wrap justify-content-end">
                            <div className="simply-countdown simply-countdown-one"></div>
                            <div className="view_all_btn_area">
                                <Link className="view_all_btn" to="/flash-deals">Xem tất cả</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt_25">
                    {loading && (
                        <p className="text-center py-5">Đang tải sản phẩm...</p>
                    )}
                    {error && (
                        <p className="text-center py-5 text-danger">
                            Không thể tải dữ liệu. Vui lòng thử lại sau.
                        </p>
                    )}
                    {!loading && !error && products.length === 0 && (
                        <p className="text-center py-5">Hiện chưa có sản phẩm Flash Sale.</p>
                    )}
                    {!loading && !error && products.map((product) => (
                        <div key={product.id} className="col-xl-1-5 col-lg-3 col-md-4 col-sm-6 mb-4 wow fadeInUp">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FlashSale;