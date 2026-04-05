import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productService from '../../services/productService';
import ProductCard from '../common/ProductCard';

const FlashSale = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Gọi API thực tế
                // const data = await productService.getFlashSaleProducts();
                // setProducts(data);

                // DỮ LIỆU GIẢ LẬP TẠM THỜI (Mô phỏng API trả về)
                setTimeout(() => {
                    setProducts([
                        { id: 1, name: "Full Sleeve Hoodie Jacket", salePrice: 40, originalPrice: 48, discountPercent: 75, isNew: true, reviewsCount: 20, image: "assets/images/product_1.png", colors: ["#DB4437", "#638C34", "#1C58F2", "#ffa500"] },
                        { id: 2, name: "Denim casual blazer for men", salePrice: 120, originalPrice: 99, discountPercent: 45, isNew: false, reviewsCount: 17, image: "assets/images/product_24.png", colors: ["#DB4437", "#638C34", "#ffa500"] },
                        { id: 3, name: "Women's Western Party Dress", salePrice: 50, originalPrice: 40, discountPercent: 15, isNew: false, reviewsCount: 22, image: "assets/images/product_3.png", colors: ["#638C34", "#1C58F2", "#ffa500"] },
                        // ... thêm sản phẩm
                    ]);
                    setLoading(false);
                }, 500);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu Flash Sale", error);
                setLoading(false);
            }
        };

        fetchProducts();
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
                            {/* Chỗ này để thư viện đếm ngược thời gian nếu cần */}
                            <div className="simply-countdown simply-countdown-one"></div>
                            <div className="view_all_btn_area">
                                <Link className="view_all_btn" to="/flash-deals">View all</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt_25">
                    {loading ? (
                        <p>Đang tải sản phẩm...</p>
                    ) : (
                        products.map((product) => (
                            // Mỗi sản phẩm chiếm 1 cột, chia layout tùy màn hình
                            <div key={product.id} className="col-xl-1-5 col-lg-3 col-md-4 col-sm-6 mb-4 wow fadeInUp">
                                <ProductCard product={product} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default FlashSale;