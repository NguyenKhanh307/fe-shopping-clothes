import React, { useState, useEffect } from 'react';
import productService from '../../services/productService';
import ProductCard from '../common/ProductCard';
import { Tab, Nav } from 'react-bootstrap';

// Danh sách tab cố định (chỉ label, key dùng để gọi API)
const TABS = [
    { key: 'western', label: 'Western' },
    { key: 'tops',    label: 'Tops' },
    { key: 'bags',    label: 'Túi xách' },
    { key: 'shoes',   label: 'Giày dép' },
];

const TrendingProducts = () => {
    const [activeKey, setActiveKey] = useState('western');
    const [products, setProducts]   = useState([]);
    const [loading, setLoading]     = useState(true);
    const [error, setError]         = useState(null);

    // Gọi API mỗi khi đổi tab
    useEffect(() => {
        setLoading(true);
        setError(null);
        productService.getTrendingProducts(activeKey)
            .then(data => setProducts(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [activeKey]);

    return (
        <section className="trending_product_2 mt_90">
            <div className="container">
                <Tab.Container
                    id="trending-product-tabs"
                    activeKey={activeKey}
                    onSelect={(k) => setActiveKey(k)}
                >
                    {/* HEADER */}
                    <div className="row align-items-center mb_40 special_product_content">
                        <div className="col-xl-6 col-md-6">
                            <div className="section_heading_2 section_heading">
                                <h3><span>Sản Phẩm</span> Xu Hướng</h3>
                            </div>
                        </div>
                        <div className="col-xl-6 col-md-6">
                            <div className="special_product_menu d-flex justify-content-md-end mt-4 mt-md-0">
                                <Nav variant="pills" className="nav-pills">
                                    {TABS.map(tab => (
                                        <Nav.Item key={tab.key}>
                                            <Nav.Link eventKey={tab.key}>{tab.label}</Nav.Link>
                                        </Nav.Item>
                                    ))}
                                </Nav>
                            </div>
                        </div>
                    </div>

                    {/* NỘI DUNG */}
                    <div className="row wow fadeInUp">
                        <div className="col-12">
                            <Tab.Content>
                                {TABS.map(tab => (
                                    <Tab.Pane key={tab.key} eventKey={tab.key}>
                                        {loading && (
                                            <p className="text-center py-5">Đang tải sản phẩm...</p>
                                        )}
                                        {error && (
                                            <p className="text-center py-5 text-danger">
                                                Không thể tải dữ liệu.
                                            </p>
                                        )}
                                        {!loading && !error && products.length === 0 && (
                                            <p className="text-center py-5">Không có sản phẩm nào.</p>
                                        )}
                                        {!loading && !error && (
                                            <div className="row">
                                                {products.map(product => (
                                                    <div key={product.id} className="col-xl-3 col-lg-4 col-sm-6 mb-4">
                                                        <ProductCard product={product} />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </Tab.Pane>
                                ))}
                            </Tab.Content>
                        </div>
                    </div>
                </Tab.Container>
            </div>
        </section>
    );
};

export default TrendingProducts;