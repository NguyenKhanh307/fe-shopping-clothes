import React from 'react';
import { Link } from 'react-router-dom';
import PageBanner from '../components/common/PageBanner'; // Tái sử dụng PageBanner

const Brand = () => {
    // 1. Dữ liệu Breadcrumb cho Banner
    const breadcrumbData = [
        { label: 'Home', link: '/' },
        { label: 'Brand', link: null }
    ];

    // 2. Mock Data: Danh sách các logo thương hiệu
    // Tôi tạo sẵn 16 item mẫu, bạn có thể dễ dàng thêm/bớt hoặc gọi từ API sau này
    const brandsData = [
        { id: 1, image: "/assets/images/brand1.png", link: "/shop" },
        { id: 2, image: "/assets/images/brand2.png", link: "/shop" },
        { id: 3, image: "/assets/images/brand3.png", link: "/shop" },
        { id: 4, image: "/assets/images/brand4.png", link: "/shop" },
        { id: 5, image: "/assets/images/brand5.png", link: "/shop" },
        { id: 6, image: "/assets/images/brand6.png", link: "/shop" },
        { id: 7, image: "/assets/images/brand7.png", link: "/shop" },
        { id: 8, image: "/assets/images/brand8.png", link: "/shop" },
        { id: 9, image: "/assets/images/brand9.png", link: "/shop" },
        { id: 10, image: "/assets/images/brand10.png", link: "/shop" },
        { id: 11, image: "/assets/images/brand11.png", link: "/shop" },
        { id: 12, image: "/assets/images/brand1.png", link: "/shop" },
        { id: 13, image: "/assets/images/brand2.png", link: "/shop" },
        { id: 14, image: "/assets/images/brand3.png", link: "/shop" },
        { id: 15, image: "/assets/images/brand4.png", link: "/shop" },
        { id: 16, image: "/assets/images/brand5.png", link: "/shop" },
    ];

    return (
        <>
            {/* KHỐI 1: BANNER ĐẦU TRANG */}
            <PageBanner title="Brand" breadcrumb={breadcrumbData} />

            {/* KHỐI 2: DANH SÁCH BRAND */}
            <section className="brand_page mt_100 mb_100">
                <div className="container">
                    <div className="row brand_2">
                        <div className="col-12">
                            <ul>
                                {/* Dùng .map() để render tự động danh sách Logo */}
                                {brandsData.map((brand) => (
                                    <li key={brand.id} className="wow fadeInUp">
                                        <Link to={brand.link}>
                                            <img src={brand.image} alt={`Brand ${brand.id}`} className="img-fluid" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* KHỐI 3: PHÂN TRANG (PAGINATION) */}
                    <div className="row">
                        <div className="pagination_area">
                            <nav aria-label="Brand Pagination">
                                <ul className="pagination justify-content-center mt_50">
                                    <li className="page-item">
                                        <Link className="page-link" to="#">
                                            {/* Đã cập nhật icon theo chuẩn FontAwesome 6 */}
                                            <i className="fa-solid fa-arrow-left"></i>
                                        </Link>
                                    </li>
                                    <li className="page-item">
                                        <Link className="page-link active" to="#">01</Link>
                                    </li>
                                    <li className="page-item">
                                        <Link className="page-link" to="#">02</Link>
                                    </li>
                                    <li className="page-item">
                                        <Link className="page-link" to="#">03</Link>
                                    </li>
                                    <li className="page-item">
                                        <Link className="page-link" to="#">
                                            <i className="fa-solid fa-arrow-right"></i>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Brand;