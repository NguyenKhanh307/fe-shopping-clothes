import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageBanner from '../components/common/PageBanner';
import categoryService from '../services/categoryService';

const Category = () => {
    const breadcrumbData = [
        { label: 'Trang Chủ', link: '/' },
        { label: 'Danh Mục',  link: null },
    ];

    const [categories, setCategories] = useState([]);
    const [loading, setLoading]       = useState(true);
    const [error, setError]           = useState(null);

    useEffect(() => {
        categoryService.getAllCategories()
            .then(data => setCategories(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <PageBanner title="Danh Mục" breadcrumb={breadcrumbData} />

            <section className="category_page category_2 mt_75 mb_95">
                <div className="container">
                    <div className="row">
                        {loading && (
                            <p className="text-center py-5">Đang tải danh mục...</p>
                        )}
                        {error && (
                            <p className="text-center py-5 text-danger">Không thể tải dữ liệu.</p>
                        )}
                        {!loading && !error && categories.length === 0 && (
                            <p className="text-center py-5">Chưa có danh mục nào.</p>
                        )}
                        {!loading && !error && categories.map((category) => (
                            <div key={category.id} className="col-xl-2 col-6 col-sm-4 col-md-3 wow fadeInUp">
                                <Link to={category.link} className="category_item">
                                    <div className="img">
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="img-fluid w-100"
                                        />
                                    </div>
                                    <h3>{category.name}</h3>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Phân trang */}
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