import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Tab, Nav } from 'react-bootstrap';
import PageBanner from '../components/common/PageBanner';
import { getProductById } from '../api/userApi';
import { useCart } from '../context/CartContext';

// ─── Fallback cho các trường DB chưa có ──────────────────────────────────────
const FALLBACK = {
    images: [
        '/assets/images/pro_det_1.jpg',
        '/assets/images/pro_det_2.jpg',
        '/assets/images/pro_det_3.jpg',
        '/assets/images/pro_det_4.jpg',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    brand: 'Zenis',
    category: 'Thời trang',
    tags: ['Thời trang', 'Quần áo'],
    description: 'Sản phẩm chất lượng cao, thiết kế hiện đại phù hợp nhiều dịp. Chất liệu thoáng mát, bền đẹp sau nhiều lần giặt.',
    relatedProducts: [
        { id: 1, title: 'Quần Jeans Nam Phá Cách', img: '/assets/images/product_7.png', price: '400.000₫', discount: '20%' },
        { id: 2, title: 'Bộ Combo Đồ Jean Nam', img: '/assets/images/product_9.png', price: '470.000₫', discount: '15%' },
        { id: 3, title: 'Đầm Dạ Hội Nữ Kiểu Tây', img: '/assets/images/product_10.png', price: '430.000₫', discount: '10%' },
        { id: 4, title: 'Áo Polo Nam Basic', img: '/assets/images/product_11.png', price: '250.000₫', discount: '5%' },
    ],
};

// ─── Helper: format tiền ──────────────────────────────────────────────────────
const formatVND = (num) => {
    if (num == null) return null;
    return Number(num).toLocaleString('vi-VN') + '₫';
};

// ─── Render sao đánh giá ──────────────────────────────────────────────────────
const StarRating = ({ rating }) => {
    const stars = [];
    const full = Math.floor(rating || 4.5);
    const half = (rating || 4.5) % 1 >= 0.5;
    for (let i = 0; i < full; i++) stars.push(<i key={i} className="fa-solid fa-star" />);
    if (half) stars.push(<i key="half" className="fa-solid fa-star-half-stroke" />);
    while (stars.length < 5) stars.push(<i key={`e${stars.length}`} className="fa-regular fa-star" />);
    return <>{stars}</>;
};

const ShopDetails = () => {
    const { id } = useParams();
    const { addItemToCart } = useCart();
    const navigate = useNavigate();

    // ─── State ────────────────────────────────────────────────────────────────
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeImage, setActiveImage] = useState(FALLBACK.images[0]);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(FALLBACK.sizes[0]);
    const [selectedColor, setSelectedColor] = useState(null);

    // ─── Fetch product từ BE ──────────────────────────────────────────────────
    useEffect(() => {
        if (!id) return;
        setLoading(true);
        setError('');

        getProductById(id)
            .then((res) => {
                const p = res.data;
                setProduct(p);
                // Set ảnh chính: dùng image_url từ DB, fallback về ảnh mẫu
                setActiveImage(p.imageUrl || FALLBACK.images[0]);
                // Set màu đầu tiên nếu có
                if (p.colors && p.colors.length > 0) {
                    setSelectedColor(p.colors[0].hexCode);
                }
            })
            .catch(() => {
                setError('Không thể tải thông tin sản phẩm. Vui lòng thử lại.');
            })
            .finally(() => setLoading(false));
    }, [id]);

    // ─── Breadcrumb ───────────────────────────────────────────────────────────
    const breadcrumbData = [
        { label: 'Trang chủ', link: '/' },
        { label: 'Cửa hàng', link: '/shop' },
        { label: product?.name || 'Chi tiết sản phẩm', link: null },
    ];

    // ─── Số lượng ─────────────────────────────────────────────────────────────
    const handleIncrement = () => setQuantity((q) => q + 1);
    const handleDecrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

    // ─── Ảnh hiển thị (gallery) ───────────────────────────────────────────────
    // DB chỉ có 1 image_url — tạo gallery giả với fallback
    const gallery = product?.imageUrl
        ? [product.imageUrl, ...FALLBACK.images.slice(1)]
        : FALLBACK.images;

    // ─── Colors từ DB hoặc fallback ──────────────────────────────────────────
    const colors =
        product?.colors?.length > 0
            ? product.colors
            : [
                { hexCode: '#DB4437', colorName: 'Đỏ' },
                { hexCode: '#638C34', colorName: 'Xanh lá' },
                { hexCode: '#1C58F2', colorName: 'Xanh dương' },
                { hexCode: '#111111', colorName: 'Đen' },
            ];

    // ─── Loading ──────────────────────────────────────────────────────────────
    if (loading) {
        return (
            <>
                <PageBanner title="Chi Tiết Sản Phẩm" breadcrumb={[{ label: 'Trang chủ', link: '/' }, { label: 'Đang tải...', link: null }]} />
                <section className="mt_100 mb_100">
                    <div className="container text-center py-5">
                        <div className="spinner-border text-warning" style={{ width: '3rem', height: '3rem' }} role="status" />
                        <p className="mt-3 text-muted">Đang tải sản phẩm...</p>
                    </div>
                </section>
            </>
        );
    }

    // ─── Error ────────────────────────────────────────────────────────────────
    if (error || !product) {
        return (
            <>
                <PageBanner title="Chi Tiết Sản Phẩm" breadcrumb={breadcrumbData} />
                <section className="mt_100 mb_100">
                    <div className="container text-center py-5">
                        <i className="fa-solid fa-circle-exclamation fa-3x text-danger mb-3" />
                        <h4>{error || 'Sản phẩm không tồn tại.'}</h4>
                        <Link to="/" className="common_btn mt-4 d-inline-block">Về trang chủ</Link>
                    </div>
                </section>
            </>
        );
    }

    return (
        <>
            <PageBanner title="Chi Tiết Sản Phẩm" breadcrumb={breadcrumbData} />

            {/* ═══════════════ KHỐI 1: THÔNG TIN SẢN PHẨM ═══════════════ */}
            <section className="shop_details mt_100 mb_100">
                <div className="container">
                    <div className="row">

                        {/* CỘT TRÁI: GALLERY ẢNH */}
                        <div className="col-xl-6 col-lg-6 wow fadeInLeft">
                            <div className="shop_details_img">
                                {/* Ảnh lớn */}
                                <div className="product_large_img premium-gallery-main">
                                    <img
                                        src={activeImage}
                                        alt={product.name}
                                        className="img-fluid w-100"
                                        style={{ borderRadius: '16px', objectFit: 'cover', maxHeight: '500px' }}
                                        onError={(e) => { e.target.src = FALLBACK.images[0]; }}
                                    />
                                </div>
                                {/* Thumbnails */}
                                <div className="row mt-3">
                                    {gallery.map((img, idx) => (
                                        <div key={idx} className="col-3">
                                            <div
                                                className={`premium-thumb ${activeImage === img ? 'active' : ''}`}
                                                onClick={() => setActiveImage(img)}
                                            >
                                                <img
                                                    src={img}
                                                    alt={`thumb-${idx}`}
                                                    className="img-fluid w-100"
                                                    style={{ objectFit: 'cover', height: '80px' }}
                                                    onError={(e) => { e.target.src = FALLBACK.images[0]; }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* CỘT PHẢI: CHI TIẾT */}
                        <div className="col-xl-6 col-lg-6 wow fadeInRight">
                            <div className="shop_details_text">

                                {/* Brand (hardcode fallback) */}
                                <Link className="brand" to="/brand">{FALLBACK.brand}</Link>

                                {/* Tên sản phẩm — từ DB: name */}
                                <h3>{product.name}</h3>

                                {/* Rating — từ DB: rating, reviewsCount */}
                                <p className="rating">
                                    <StarRating rating={product.rating} />
                                    <span>({product.reviewsCount ?? 0} Đánh giá)</span>
                                </p>

                                {/* Giá — từ DB: salePrice, originalPrice */}
                                <h4>
                                    <span className="gradient-text">{formatVND(product.salePrice)}</span>
                                    {product.originalPrice && product.originalPrice > product.salePrice && (
                                        <del style={{ marginLeft: '12px', color: '#aaa', fontSize: '18px' }}>
                                            {formatVND(product.originalPrice)}
                                        </del>
                                    )}
                                    <span className="ms-2 tag-sale">
                                        -{product.discountPercent}%
                                    </span>
                                </h4>

                                {/* Mô tả — từ DB: description, fallback hardcode */}
                                <p className="description">
                                    {product.description || FALLBACK.description}
                                </p>

                                {/* Chọn size & màu */}
                                <div className="shop_details_color_size d-flex flex-wrap">
                                    {/* Size (hardcode fallback — DB không có) */}
                                    <div className="shop_details_size">
                                        <p>Chọn Kích Thước :</p>
                                        <div className="d-flex flex-wrap mt-2">
                                            {FALLBACK.sizes.map((s) => (
                                                <div
                                                    key={s}
                                                    className={`size-pill ${selectedSize === s ? 'active' : ''}`}
                                                    onClick={() => setSelectedSize(s)}
                                                >
                                                    {s}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Màu — từ DB: colors[].hexCode / colors[].colorName */}
                                    <div className="shop_details_color">
                                        <p>Chọn Màu Sắc :</p>
                                        <ul>
                                            {colors.map((c, idx) => (
                                                <li
                                                    key={idx}
                                                    className={`color-swatch ${selectedColor === c.hexCode ? 'active' : ''}`}
                                                    onClick={() => setSelectedColor(c.hexCode)}
                                                    style={{ background: c.hexCode }}
                                                />
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Số lượng & Thêm vào giỏ */}
                                <div className="details_quentity_area d-flex flex-wrap">
                                    <div className="details_quentity_area_left d-flex flex-wrap align-items-center">
                                        <div className="modern-quantity-ctl d-inline-flex">
                                            <button type="button" onClick={handleDecrement}>
                                                <i className="fas fa-minus" />
                                            </button>
                                            <input type="text" value={quantity} readOnly />
                                            <button type="button" onClick={handleIncrement}>
                                                <i className="fas fa-plus" />
                                            </button>
                                        </div>
                                        <button className="btn-glow ms-3" onClick={() => {
                                            addItemToCart(product.id, quantity, selectedColor).then(success => {
                                                if (success) alert("Thêm vào giỏ hàng thành công!");
                                                else navigate('/sign-in', { state: { from: '/cart' } });
                                            });
                                        }}>
                                            Thêm vào giỏ <i className="fas fa-shopping-cart"></i>
                                        </button>
                                    </div>
                                    <div className="details_quentity_area_right d-flex flex-wrap align-items-center mt-3 mt-sm-0">
                                        <Link className="btn-icon-soft ms-2" to="/wishlist" title="Yêu thích"><i className="far fa-heart" /></Link>
                                        <Link className="btn-icon-soft ms-2" to="/compare" title="So sánh"><i className="fas fa-random"></i></Link>
                                    </div>
                                </div>

                                {/* Thông tin phụ */}
                                <ul className="details_more_info">
                                    {/* SKU từ DB: slug */}
                                    <li><span>Mã SP:</span> {product.slug || product.id}</li>
                                    {/* Stock từ DB */}
                                    {product.stock != null && (
                                        <li>
                                            <span>Tồn kho:</span>{' '}
                                            <span style={{ color: product.stock > 0 ? '#27ae60' : '#e74c3c' }}>
                                                {product.stock > 0 ? `${product.stock} sản phẩm` : 'Hết hàng'}
                                            </span>
                                        </li>
                                    )}
                                    {/* Danh mục (hardcode fallback — category bị @JsonIgnore) */}
                                    <li>
                                        <span>Danh mục:</span>{' '}
                                        <Link to="/category">{FALLBACK.category}</Link>
                                    </li>
                                    {/* Tags hardcode */}
                                    <li>
                                        <span>Thẻ:</span>{' '}
                                        {FALLBACK.tags.map((tag, idx) => (
                                            <Link key={idx} to="#">{tag}{idx < FALLBACK.tags.length - 1 ? ', ' : ''}</Link>
                                        ))}
                                    </li>
                                </ul>

                                {/* Chia sẻ */}
                                <ul className="details_share d-flex flex-wrap">
                                    <li><span>Chia sẻ:</span></li>
                                    <li><Link to="#"><i className="fa-brands fa-facebook-f" /></Link></li>
                                    <li><Link to="#"><i className="fa-brands fa-twitter" /></Link></li>
                                    <li><Link to="#"><i className="fa-brands fa-linkedin-in" /></Link></li>
                                    <li><Link to="#"><i className="fa-brands fa-pinterest-p" /></Link></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ═══════════════ KHỐI 2: TABS MÔ TẢ & ĐÁNH GIÁ ═══════════════ */}
            <section className="shop_details_bottom mt_100">
                <div className="container">
                    <Tab.Container id="product-tabs" defaultActiveKey="description">

                        <div className="product_details_tab_menu premium-tabs">
                            <Nav variant="pills" className="nav-pills justify-content-center border-bottom pb-3 mb-4">
                                <Nav.Item><Nav.Link eventKey="description">Mô Tả Sản Phẩm</Nav.Link></Nav.Item>
                                <Nav.Item><Nav.Link eventKey="information">Thông Tin Thêm</Nav.Link></Nav.Item>
                                <Nav.Item><Nav.Link eventKey="reviews">Đánh Giá ({product.reviewsCount ?? 0})</Nav.Link></Nav.Item>
                            </Nav>
                        </div>

                        <div className="product_details_tab_content">
                            <Tab.Content>

                                {/* Tab Mô tả — description từ DB hoặc fallback */}
                                <Tab.Pane eventKey="description">
                                    <div className="product_tab_description">
                                        <p>{product.description || FALLBACK.description}</p>
                                        <ul>
                                            <li>Được làm từ 100% cotton cao cấp, thấm hút mồ hôi tốt.</li>
                                            <li>Thiết kế hiện đại, trẻ trung, dễ phối đồ.</li>
                                            <li>Không xù lông, không phai màu sau nhiều lần giặt.</li>
                                        </ul>
                                    </div>
                                </Tab.Pane>

                                {/* Tab Thông tin thêm — hardcode (DB không có) */}
                                <Tab.Pane eventKey="information">
                                    <div className="product_tab_info">
                                        <table className="table table-bordered">
                                            <tbody>
                                                <tr><th>Trọng lượng</th><td>1 kg</td></tr>
                                                <tr><th>Kích thước đóng gói</th><td>20 × 30 × 5 cm</td></tr>
                                                <tr><th>Chất liệu</th><td>60% Cotton, 40% Polyester</td></tr>
                                                <tr><th>Tình trạng hàng</th><td>{product.stock > 0 ? 'Còn hàng' : 'Hết hàng'}</td></tr>
                                                <tr><th>Mã sản phẩm</th><td>{product.slug || product.id}</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </Tab.Pane>

                                {/* Tab Đánh giá — hardcode (chưa có review API) */}
                                <Tab.Pane eventKey="reviews">
                                    <div className="product_tab_review">
                                        <div className="review_list">
                                            <div className="single_review d-flex gap-3">
                                                <div className="review_img">
                                                    <img src="/assets/images/user_1.png" alt="user" className="img-fluid" style={{ width: '60px', borderRadius: '50%' }} />
                                                </div>
                                                <div className="review_text">
                                                    <h4 className="mb-1">Nguyễn Văn A</h4>
                                                    <p className="date text-muted small">15 Tháng 4, 2026</p>
                                                    <p className="rating text-warning mb-1">
                                                        <i className="fa-solid fa-star" />
                                                        <i className="fa-solid fa-star" />
                                                        <i className="fa-solid fa-star" />
                                                        <i className="fa-solid fa-star" />
                                                        <i className="fa-solid fa-star" />
                                                    </p>
                                                    <p>Sản phẩm rất đẹp, chất vải mát, giao hàng cực kỳ nhanh!</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Form viết đánh giá */}
                                        <div className="review_form mt_50">
                                            <h3>Viết đánh giá của bạn</h3>
                                            <form onSubmit={(e) => e.preventDefault()}>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="single_input">
                                                            <label>Họ và Tên</label>
                                                            <input type="text" placeholder="Nhập tên của bạn" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="single_input">
                                                            <label>Email</label>
                                                            <input type="email" placeholder="Nhập email" />
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="single_input">
                                                            <label>Nội dung đánh giá</label>
                                                            <textarea rows="5" placeholder="Sản phẩm này thế nào?..." />
                                                        </div>
                                                        <button type="submit" className="common_btn">
                                                            Gửi Đánh Giá <i className="fa-solid fa-paper-plane ms-2" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </Tab.Pane>

                            </Tab.Content>
                        </div>
                    </Tab.Container>
                </div>
            </section>

            {/* ═══════════════ KHỐI 3: SẢN PHẨM LIÊN QUAN ═══════════════ */}
            <section className="related_product mt_90 mb_100 wow fadeInUp">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section_heading_2 section_heading mb_15">
                                <h3>Sản phẩm <span>Liên quan</span></h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {FALLBACK.relatedProducts.map((prod) => (
                            <div key={prod.id} className="col-xl-3 col-lg-4 col-sm-6 mb-4">
                                <div className="product_item_2 product_item">
                                    <div className="product_img">
                                        <Link to={`/shop/${prod.id}`}>
                                            <img src={prod.img} alt={prod.title} className="img-fluid w-100" />
                                        </Link>
                                        <ul className="discount_list">
                                            <li className="discount"><b>-</b> {prod.discount}</li>
                                        </ul>
                                        <ul className="btn_list">
                                            <li><Link to="#"><i className="fas fa-random"></i></Link></li>
                                            <li><Link to="#"><i className="far fa-heart"></i></Link></li>
                                            <li><Link to="/cart"><i className="fas fa-shopping-bag"></i></Link></li>
                                        </ul>
                                    </div>
                                    <div className="product_text">
                                        <Link className="title" to={`/shop/${prod.id}`}>{prod.title}</Link>
                                        <p className="price">{prod.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default ShopDetails;