import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageBanner from '../components/common/PageBanner';
import brandService from '../services/brandService';

const Brand = () => {
    const breadcrumbData = [
        { label: 'Trang Chủ', link: '/' },
        { label: 'Thương Hiệu', link: null },
    ];

    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState(null);

    useEffect(() => {
        brandService.getAllBrands()
            .then(data => setBrands(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <PageBanner title="Thương Hiệu" breadcrumb={breadcrumbData} />

            <section className="brand_page mt_100 mb_100">
                <div className="container">
                    <div className="row brand_2">
                        <div className="col-12">
                            {loading && <p className="text-center py-5">Đang tải thương hiệu...</p>}
                            {error   && <p className="text-center py-5 text-danger">Không thể tải dữ liệu.</p>}
                            {!loading && !error && (
                                <ul>
                                    {brands.map((brand) => (
                                        <li key={brand.id} className="wow fadeInUp">
                                            <Link to={brand.link}>
                                                <img
                                                    src={brand.image}
                                                    alt={brand.name ?? `Thương hiệu ${brand.id}`}
                                                    className="img-fluid"
                                                />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Phân trang */}
                    <div className="row">
                        <div className="pagination_area">
                            <nav aria-label="Brand Pagination">
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

export default Brand;