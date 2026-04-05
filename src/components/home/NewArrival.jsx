import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productService from '../../services/productService';
import ProductCard from '../common/ProductCard';

const NewArrival = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading]   = useState(true);
    const [error, setError]       = useState(null);

    useEffect(() => {
        productService.getNewArrivalProducts()
            .then(data => setProducts(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className="new_arrival_2 mt_95">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-sm-9">
                        <div className="section_heading_2 section_heading">
                            <h3>Sản Phẩm <span>Mới</span> Nhất</h3>
                        </div>
                    </div>
                    <div className="col-xl-6 col-sm-3">
                        <div className="view_all_btn_area">
                            <Link className="view_all_btn" to="/shop">Xem tất cả</Link>
                        </div>
                    </div>
                </div>

                <div className="row mt_15">
                    {loading && <p className="text-center py-5">Đang tải sản phẩm...</p>}
                    {error   && <p className="text-center py-5 text-danger">Không thể tải dữ liệu.</p>}
                    {!loading && !error && products.length === 0 && (
                        <p className="text-center py-5">Chưa có sản phẩm mới.</p>
                    )}
                    {!loading && !error && products.map(p => (
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