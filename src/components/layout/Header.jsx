import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import productService from '../../services/productService';

// ── Debounce hook ─────────────────────────────────────────────────────────────
function useDebounce(value, delay) {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const t = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(t);
    }, [value, delay]);
    return debounced;
}

const Header = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showDrop, setShowDrop] = useState(false);
    const [loadingSug, setLoadingSug] = useState(false);
    const wrapperRef = useRef(null);
    const debouncedKw = useDebounce(keyword, 300);

    // ── Lấy gợi ý từ BE khi gõ ───────────────────────────────────────────────
    useEffect(() => {
        if (debouncedKw.trim().length < 2) {
            setSuggestions([]);
            setShowDrop(false);
            return;
        }
        let cancelled = false;
        setLoadingSug(true);
        productService.searchProducts(debouncedKw.trim())
            .then((data) => {
                if (!cancelled) {
                    setSuggestions(data.slice(0, 6)); // chỉ lấy tối đa 6 gợi ý
                    setShowDrop(true);
                }
            })
            .catch(() => { })
            .finally(() => { if (!cancelled) setLoadingSug(false); });
        return () => { cancelled = true; };
    }, [debouncedKw]);

    // ── Đóng dropdown khi click ngoài ────────────────────────────────────────
    useEffect(() => {
        const handler = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setShowDrop(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // ── Submit form: điều hướng đến trang kết quả ────────────────────────────
    const handleSubmit = (e) => {
        e.preventDefault();
        const kw = keyword.trim();
        if (!kw) return;
        setShowDrop(false);
        navigate(`/search?keyword=${encodeURIComponent(kw)}`);
    };

    // ── Chọn gợi ý ───────────────────────────────────────────────────────────
    const handleSelectSuggestion = useCallback((product) => {
        setShowDrop(false);
        setKeyword('');
        navigate(`/shop/${product.id}`);
    }, [navigate]);

    return (
        <header className="header_2">
            <div className="container">
                <div className="row align-items-center">
                    {/* Logo Area */}
                    <div className="col-lg-2">
                        <div className="header_logo_area">
                            <Link to="/" className="header_logo">
                                <img src="/assets/images/logo_2.png" alt="Zenis" className="img-fluid w-100" />
                            </Link>
                            <div className="mobile_menu_icon d-block d-lg-none" data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
                                <span className="mobile_menu_icon"><i className="fa-solid fa-bars-staggered menu_icon_bar" aria-hidden="true"></i></span>
                            </div>
                        </div>
                    </div>

                    {/* ── Search Form ── */}
                    <div className="col-xxl-6 col-xl-5 col-lg-5 d-none d-lg-block">
                        <div ref={wrapperRef} style={{ position: 'relative' }}>
                            <form id="header-search-form" onSubmit={handleSubmit} role="search">
                                <select className="select_2" defaultValue="Tất cả danh mục">
                                    <option value="Tất cả danh mục">Tất cả danh mục</option>
                                    <option value="Thời trang">Thời trang</option>
                                    <option value="Điện tử">Điện tử</option>
                                    <option value="Thời trang & Làm đẹp">Thời trang &amp; Làm đẹp</option>
                                    <option value="Trang sức">Trang sức</option>
                                </select>
                                <div className="input">
                                    <input
                                        id="header-search-input"
                                        type="text"
                                        placeholder="Tìm kiếm sản phẩm..."
                                        value={keyword}
                                        onChange={(e) => setKeyword(e.target.value)}
                                        onFocus={() => suggestions.length > 0 && setShowDrop(true)}
                                        autoComplete="off"
                                        aria-label="Tìm kiếm sản phẩm"
                                        aria-autocomplete="list"
                                        aria-expanded={showDrop}
                                    />
                                    <button
                                        id="header-search-btn"
                                        type="submit"
                                        aria-label="Tìm kiếm"
                                    >
                                        {loadingSug
                                            ? <i className="fa-solid fa-spinner fa-spin" aria-hidden="true" />
                                            : <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />}
                                    </button>
                                </div>
                            </form>

                            {/* ── Dropdown gợi ý ── */}
                            {showDrop && suggestions.length > 0 && (
                                <ul
                                    id="search-suggestions-dropdown"
                                    role="listbox"
                                    style={{
                                        position: 'absolute',
                                        top: 'calc(100% + 4px)',
                                        left: 0,
                                        right: 0,
                                        background: '#fff',
                                        border: '1px solid #eee',
                                        borderRadius: 8,
                                        boxShadow: '0 6px 20px rgba(0,0,0,0.10)',
                                        listStyle: 'none',
                                        margin: 0,
                                        padding: '4px 0',
                                        zIndex: 9999,
                                        maxHeight: 150,
                                        overflowY: 'auto',
                                    }}
                                >
                                    {suggestions.map((product) => (
                                        <li
                                            key={product.id}
                                            role="option"
                                            onClick={() => handleSelectSuggestion(product)}
                                            style={{
                                                padding: '6px 12px',
                                                margin: 0,
                                                lineHeight: '1.5',
                                                minHeight: 'auto',
                                                cursor: 'pointer',
                                                fontSize: 13,
                                                color: '#222',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                transition: 'background 0.15s',
                                                display: 'block',
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.background = '#f5f5f5'}
                                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                        >
                                            {product.name}
                                        </li>
                                    ))}
                                    {/* Xem toàn bộ kết quả */}
                                    <li style={{ borderTop: '1px solid #f0f0f0', padding: '8px 16px' }}>
                                        <button
                                            id="search-see-all-btn"
                                            type="button"
                                            onClick={() => {
                                                setShowDrop(false);
                                                navigate(`/search?keyword=${encodeURIComponent(keyword.trim())}`);
                                            }}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: '#e94560',
                                                fontWeight: 600,
                                                fontSize: 13,
                                                cursor: 'pointer',
                                                padding: 0,
                                            }}
                                        >
                                            Xem tất cả kết quả cho &quot;{keyword}&quot; →
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Hotline & Language/Currency */}
                    <div className="col-xxl-4 col-xl-5 col-lg-5 d-none d-lg-flex">
                        <div className="header_support_user d-flex flex-wrap">
                            <div className="header_support">
                                <span className="icon">
                                    <i className="fa-solid fa-phone" aria-hidden="true"></i>
                                </span>
                                <h3>
                                    Hotline:
                                    <a href="callto:1234567890">
                                        <span>+(84) 90 1234 567</span>
                                    </a>
                                </h3>
                            </div>
                        </div>
                        <div className="topbar_right d-flex flex-wrap align-items-center justify-content-end">
                            <select className="select_js language" defaultValue="Tiếng Việt">
                                <option value="Tiếng Việt">Tiếng Việt</option>
                                <option value="Tiếng Anh">Tiếng Anh</option>
                            </select>
                            <select className="select_js" defaultValue="VNĐ">
                                <option value="VNĐ">VNĐ</option>
                                <option value="$USD">$USD</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;