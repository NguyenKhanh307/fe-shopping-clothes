import React, { useState, useEffect } from 'react';
import { Tab, Nav } from 'react-bootstrap'; // Chuyển sang dùng Tab và Nav
import ProductCard from '../common/ProductCard'; 
import productService from '../../services/productService'; 

const TrendingProducts = () => {
    const [products, setProducts] = useState({});
    const [loading, setLoading] = useState(true);
    const [key, setKey] = useState('western'); 

    useEffect(() => {
        const fetchTrendingProducts = async () => {
            try {
                const mockData = {
                    western: [
                        { id: 101, name: "Denim 2 Quarter Pant", salePrice: 40, isNew: true, image: "/assets/images/product_7.png", reviewsCount: 20 },
                        { id: 102, name: "Men's Denim combo set", salePrice: 47, originalPrice: 50, discountPercent: 45, image: "/assets/images/product_9.png", reviewsCount: 17 },
                    ],
                    tops: [
                        { id: 201, name: "Women's Western Party Dress", salePrice: 43, image: "/assets/images/product_10.png", reviewsCount: 22 },
                        { id: 202, name: "Kid's Western Party Dress", salePrice: 75, originalPrice: 69, discountPercent: 75, isNew: true, image: "/assets/images/product_11.png", reviewsCount: 58 },
                    ],
                    bags: [
                        { id: 301, name: "Classic Leather Bag", salePrice: 120, image: "/assets/images/product_12.png", reviewsCount: 45 },
                    ],
                    shoes: [
                        { id: 401, name: "Men's Trendy Sneakers", salePrice: 85, image: "/assets/images/product_21.png", reviewsCount: 10 },
                    ]
                };

                setTimeout(() => {
                    setProducts(mockData);
                    setLoading(false);
                }, 500);
            } catch (error) {
                console.error("Error fetching trending products:", error);
                setLoading(false);
            }
        };

        fetchTrendingProducts();
    }, []);

    const renderProductGrid = (categoryKey) => {
        if (loading) return <div className="text-center py-5">Đang tải sản phẩm...</div>;
        const categoryProducts = products[categoryKey] || [];
        if (categoryProducts.length === 0) return <p className="text-center py-5">Không có sản phẩm nào.</p>;

        return (
            <div className="row">
                {categoryProducts.map((product) => (
                    <div key={product.id} className="col-xl-3 col-lg-4 col-sm-6 mb-4">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        );
    };

    return (
        <section className="trending_product_2 mt_90">
            <div className="container">
                {/* Dùng Tab.Container để bọc toàn bộ khối */}
                <Tab.Container id="trending-product-tabs" activeKey={key} onSelect={(k) => setKey(k)}>
                    
                    {/* KHỐI 1: HEADER (Tiêu đề bên trái, Tabs bên phải) */}
                    <div className="row align-items-center mb_40 special_product_content">
                        {/* Tiêu đề */}
                        <div className="col-xl-6 col-md-6">
                            <div className="section_heading_2 section_heading">
                                <h3><span>Trending</span> Products</h3>
                            </div>
                        </div>
                        
                        {/* Thanh Menu Tabs */}
                        <div className="col-xl-6 col-md-6">
                            <div className="special_product_menu d-flex justify-content-md-end mt-4 mt-md-0">
                                <Nav variant="pills" className="nav-pills">
                                    <Nav.Item>
                                        <Nav.Link eventKey="western">Western</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="tops">Tops</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="bags">Bags</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="shoes">Shoes</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </div>
                        </div>
                    </div>
                    
                    {/* KHỐI 2: NỘI DUNG SẢN PHẨM (Nằm phía dưới) */}
                    <div className="row wow fadeInUp">
                        <div className="col-12">
                            <Tab.Content>
                                <Tab.Pane eventKey="western">{renderProductGrid('western')}</Tab.Pane>
                                <Tab.Pane eventKey="tops">{renderProductGrid('tops')}</Tab.Pane>
                                <Tab.Pane eventKey="bags">{renderProductGrid('bags')}</Tab.Pane>
                                <Tab.Pane eventKey="shoes">{renderProductGrid('shoes')}</Tab.Pane>
                            </Tab.Content>
                        </div>
                    </div>

                </Tab.Container>
            </div>
        </section>
    );
};

export default TrendingProducts;