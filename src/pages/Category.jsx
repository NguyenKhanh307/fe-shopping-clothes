import React from 'react';
import { Link } from 'react-router-dom';
import PageBanner from '../components/common/PageBanner'; // Tái sử dụng PageBanner của trang About

const Category = () => {
    // 1. Khai báo Breadcrumb cho Page Banner
    const breadcrumbData = [
        { label: 'Home', link: '/' },
        { label: 'Category', link: null }
    ];

    // 2. Mock Data: Danh sách các danh mục (Sau này sẽ thay bằng dữ liệu từ API)
    // Tôi tạo sẵn 12 item dựa trên hình ảnh của template để minh họa
    const categoriesData = [
        { id: 1, name: "Men's Fashion", image: "/assets/images/category_img_2.png", link: "/shop" },
        { id: 2, name: "Women's Fashion", image: "/assets/images/category_img_3.png", link: "/shop" },
        { id: 3, name: "Kids Fashion", image: "/assets/images/category_img_1.png", link: "/shop" },
        { id: 4, name: "Beauty & Health", image: "/assets/images/category_img_4.png", link: "/shop" },
        { id: 5, name: "Jewelry", image: "/assets/images/category_img_5.png", link: "/shop" },
        { id: 6, name: "Sports Wear", image: "/assets/images/category_img_6.png", link: "/shop" },
        { id: 7, name: "Electronics", image: "/assets/images/category_img_7.png", link: "/shop" },
        { id: 8, name: "Men's Fashion", image: "/assets/images/category_img_2.png", link: "/shop" },
        { id: 9, name: "Women's Fashion", image: "/assets/images/category_img_3.png", link: "/shop" },
        { id: 10, name: "Kids Fashion", image: "/assets/images/category_img_1.png", link: "/shop" },
        { id: 11, name: "Beauty & Health", image: "/assets/images/category_img_4.png", link: "/shop" },
        { id: 12, name: "Jewelry", image: "/assets/images/category_img_5.png", link: "/shop" }
    ];

    return (
        <>
            {/* KHỐI 1: BANNER ĐẦU TRANG */}
            <PageBanner title="Category" breadcrumb={breadcrumbData} />

            {/* KHỐI 2: DANH SÁCH CATEGORY */}
            <section className="category_page category_2 mt_75 mb_95">
                <div className="container">
                    <div className="row">
                        {/* Dùng .map() để duyệt qua mảng data và render ra các ô Category */}
                        {categoriesData.map((category) => (
                            <div key={category.id} className="col-xl-2 col-6 col-sm-4 col-md-3 wow fadeInUp">
                                <Link to={category.link} className="category_item">
                                    <div className="img">
                                        <img src={category.image} alt={category.name} className="img-fluid w-100" />
                                    </div>
                                    <h3>{category.name}</h3>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* KHỐI 3: PHÂN TRANG (PAGINATION) */}
                    <div className="row">
                        <div className="pagination_area">
                            <nav aria-label="Category Pagination">
                                <ul className="pagination justify-content-center mt_50">
                                    <li className="page-item">
                                        <Link className="page-link" to="#">
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

export default Category;