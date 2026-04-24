import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import productService from '../services/productService';
import ProductCard from '../components/common/ProductCard';

// ── Skeleton placeholder ──────────────────────────────────────────────────────
const SkeletonCard = () => (
    <div className="col-xl-3 col-lg-4 col-sm-6" aria-hidden="true">
        <div className="product_item_2 product_item skeleton-card">
            <div className="skeleton-img" />
            <div className="skeleton-line" style={{ width: '70%', marginTop: 12 }} />
            <div className="skeleton-line" style={{ width: '40%', marginTop: 8 }} />
        </div>
    </div>
);

// ── Main Page ─────────────────────────────────────────────────────────────────
const SearchResults = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const keyword = searchParams.get('keyword') || '';

    const [products, setProducts]   = useState([]);
    const [loading, setLoading]     = useState(false);
    const [error, setError]         = useState(null);
    const [inputVal, setInputVal]   = useState(keyword);
    const [sortBy, setSortBy]       = useState('default');

    // ── Fetch từ BE ──────────────────────────────────────────────────────────
    const fetchResults = useCallback(async (kw) => {
        if (!kw.trim()) {
            setProducts([]);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const data = await productService.searchProducts(kw.trim());
            setProducts(data);
        } catch (err) {
            console.error('Search error:', err);
            setError('Không thể tải kết quả. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    }, []);

    // Khi keyword thay đổi từ URL → fetch lại
    useEffect(() => {
        setInputVal(keyword);
        fetchResults(keyword);
    }, [keyword, fetchResults]);

    // ── Submit form tìm kiếm inline ──────────────────────────────────────────
    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputVal.trim()) {
            setSearchParams({ keyword: inputVal.trim() });
        }
    };

    // ── Sắp xếp client-side ──────────────────────────────────────────────────
    const sortedProducts = [...products].sort((a, b) => {
        if (sortBy === 'price-asc')  return (a.salePrice || 0) - (b.salePrice || 0);
        if (sortBy === 'price-desc') return (b.salePrice || 0) - (a.salePrice || 0);
        if (sortBy === 'rating')     return (b.rating || 0) - (a.rating || 0);
        return 0; // default: giữ nguyên thứ tự BE trả về (theo tên ASC)
    });

    return (
        <>
            {/* ── Page Banner ── */}
            <section
                className="page_banner"
                style={{ background: 'linear-gradient(135deg,#1a1a2e 0%,#16213e 60%,#0f3460 100%)', padding: '60px 0' }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h1 className="text-white mb-2" style={{ fontWeight: 700 }}>
                                {keyword ? `Kết quả tìm kiếm: "${keyword}"` : 'Tìm kiếm sản phẩm'}
                            </h1>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb justify-content-center">
                                    <li className="breadcrumb-item"><Link to="/" className="text-white-50">Trang chủ</Link></li>
                                    <li className="breadcrumb-item active text-white" aria-current="page">Tìm kiếm</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Nội dung chính ── */}
            <section className="section_padding" style={{ padding: '60px 0' }}>
                <div className="container">

                    {/* ── Thanh tìm kiếm inline ── */}
                    <div className="row justify-content-center mb-4">
                        <div className="col-lg-6">
                            <form
                                id="search-form-results"
                                onSubmit={handleSubmit}
                                style={{
                                    display: 'flex',
                                    gap: 8,
                                    background: '#fff',
                                    borderRadius: 50,
                                    padding: '6px 6px 6px 20px',
                                    boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                                }}
                            >
                                <input
                                    id="search-input-results"
                                    type="text"
                                    value={inputVal}
                                    onChange={(e) => setInputVal(e.target.value)}
                                    placeholder="Tìm kiếm sản phẩm..."
                                    style={{
                                        border: 'none',
                                        outline: 'none',
                                        flex: 1,
                                        fontSize: 15,
                                        background: 'transparent',
                                    }}
                                />
                                <button
                                    id="search-btn-results"
                                    type="submit"
                                    style={{
                                        background: 'linear-gradient(135deg,#e94560,#c23152)',
                                        border: 'none',
                                        borderRadius: 50,
                                        color: '#fff',
                                        padding: '10px 24px',
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                        fontSize: 14,
                                    }}
                                >
                                    <i className="fa-solid fa-magnifying-glass me-1" />
                                    Tìm
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* ── Toolbar: tổng + sort ── */}
                    {!loading && !error && keyword && (
                        <div
                            className="d-flex align-items-center justify-content-between flex-wrap mb-4"
                            style={{ gap: 12 }}
                        >
                            <p style={{ margin: 0, color: '#555', fontSize: 14 }}>
                                {products.length > 0
                                    ? <><strong>{products.length}</strong> sản phẩm được tìm thấy</>
                                    : 'Không có sản phẩm nào phù hợp.'}
                            </p>
                            {products.length > 0 && (
                                <select
                                    id="sort-select"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    style={{
                                        border: '1px solid #ddd',
                                        borderRadius: 8,
                                        padding: '6px 14px',
                                        fontSize: 14,
                                        outline: 'none',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <option value="default">Mặc định (A → Z)</option>
                                    <option value="price-asc">Giá: Thấp → Cao</option>
                                    <option value="price-desc">Giá: Cao → Thấp</option>
                                    <option value="rating">Đánh giá cao nhất</option>
                                </select>
                            )}
                        </div>
                    )}

                    {/* ── Trạng thái Loading ── */}
                    {loading && (
                        <div className="row g-4">
                            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
                        </div>
                    )}

                    {/* ── Lỗi ── */}
                    {!loading && error && (
                        <div className="text-center py-5">
                            <i className="fa-solid fa-triangle-exclamation fa-3x text-danger mb-3" />
                            <p className="text-danger">{error}</p>
                            <button
                                className="btn btn-outline-danger"
                                onClick={() => fetchResults(keyword)}
                            >
                                Thử lại
                            </button>
                        </div>
                    )}

                    {/* ── Không có kết quả ── */}
                    {!loading && !error && keyword && products.length === 0 && (
                        <div className="text-center py-5">
                            <i className="fa-solid fa-box-open fa-4x mb-3" style={{ color: '#ccc' }} />
                            <h4 className="mb-2">Không tìm thấy sản phẩm nào</h4>
                            <p className="text-muted">
                                Hãy thử tìm kiếm với từ khoá khác hoặc kiểm tra lỗi chính tả.
                            </p>
                            <Link to="/" className="btn btn-dark mt-2">Về trang chủ</Link>
                        </div>
                    )}

                    {/* ── Chưa có từ khoá ── */}
                    {!loading && !error && !keyword && (
                        <div className="text-center py-5">
                            <i className="fa-solid fa-magnifying-glass fa-4x mb-3" style={{ color: '#ddd' }} />
                            <h4 className="text-muted">Nhập từ khoá để bắt đầu tìm kiếm</h4>
                        </div>
                    )}

                    {/* ── Danh sách sản phẩm ── */}
                    {!loading && !error && sortedProducts.length > 0 && (
                        <div className="row g-4">
                            {sortedProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="col-xl-3 col-lg-4 col-sm-6"
                                >
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ── Skeleton styles (inline, không phụ thuộc CSS file) ── */}
            <style>{`
                .skeleton-card {
                    pointer-events: none;
                }
                .skeleton-img {
                    width: 100%;
                    padding-top: 120%;
                    background: linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%);
                    background-size: 200% 100%;
                    animation: shimmer 1.4s infinite;
                    border-radius: 8px;
                }
                .skeleton-line {
                    height: 14px;
                    background: linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%);
                    background-size: 200% 100%;
                    animation: shimmer 1.4s infinite;
                    border-radius: 4px;
                }
                @keyframes shimmer {
                    0%   { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
            `}</style>
        </>
    );
};

export default SearchResults;
