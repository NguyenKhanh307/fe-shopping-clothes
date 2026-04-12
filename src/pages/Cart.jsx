import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import PageBanner from '../components/common/PageBanner';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { checkoutOrder } from '../services/orderService';

const formatVND = (num) => {
    if (num == null) return null;
    return Number(num).toLocaleString('vi-VN') + '₫';
};

const Cart = () => {
    const { cartItems, subTotal, isLoading, updateItemQuantity, removeCartItem, refreshCart } = useCart();
    const { user } = useAuth();
    const [showSuccessModal, setShowSuccessModal] = React.useState(false);
    const [checkoutError, setCheckoutError] = React.useState('');
    const navigate = useNavigate();

    const handleCheckout = async (e) => {
        e.preventDefault();
        setCheckoutError('');
        if (!user?.id) {
            navigate('/sign-in', { state: { from: '/cart' } });
            return;
        }
        try {
            // Gọi API tạo đơn hàng (backend sẽ tự xóa giỏ hàng)
            await checkoutOrder(user.id);
            // Refresh giỏ để frontend biết giỏ đã trống
            await refreshCart();
            setShowSuccessModal(true);
        } catch (err) {
            setCheckoutError(err.message || 'Thanh toán thất bại, vui lòng thử lại.');
        }
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        navigate('/shop');
    };

    const breadcrumbData = [
        { label: 'Trang chủ', link: '/' },
        { label: 'Cửa hàng', link: '/shop' },
        { label: 'Giỏ hàng', link: null },
    ];

    const successModal = (
        <Modal show={showSuccessModal} onHide={handleCloseModal} centered backdrop="static" keyboard={false}>
            <Modal.Body className="text-center p-5">
                <div className="mb-4">
                    <i className="fas fa-check-circle" style={{fontSize: '80px', color: '#10b981'}}></i>
                </div>
                <h3 className="mb-3" style={{fontWeight: 800}}>Thanh toán thành công!</h3>
                <p className="text-muted mb-4 d-block">Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.</p>
                <button type="button" className="btn-glow w-100 justify-content-center mt-2" onClick={handleCloseModal}>
                    Tiếp tục mua sắm
                </button>
            </Modal.Body>
        </Modal>
    );

    if (isLoading) {
        return (
            <>
                <PageBanner title="Giỏ Hàng" breadcrumb={breadcrumbData} />
                <section className="mt_100 mb_100 text-center">
                    <div className="spinner-border text-warning" style={{ width: '3rem', height: '3rem' }} />
                    <p className="mt-3">Đang rải giỏ hàng...</p>
                </section>
                {successModal}
            </>
        );
    }

    if (!cartItems || cartItems.length === 0) {
        return (
            <>
                <PageBanner title="Giỏ Hàng" breadcrumb={breadcrumbData} />
                <section className="cart_area mt_100 mb_100 text-center">
                    <div className="container">
                        <h3>Giỏ hàng của bạn đang trống!</h3>
                        <Link className="common_btn mt-4 d-inline-block" to="/shop">
                            Tiếp tục mua sắm
                        </Link>
                    </div>
                </section>
                {successModal}
            </>
        );
    }

    return (
        <>
            <PageBanner title="Giỏ Hàng" breadcrumb={breadcrumbData} />
            <section className="cart_area mt_100 mb_100">
                <div className="container">
                    <div className="row">
                        {/* Cart Items List */}
                        <div className="col-lg-8 mb-5 mb-lg-0 wow fadeInLeft">
                            <div className="modern-cart-list">
                                {cartItems.map((item) => (
                                    <div className="modern-cart-item" key={item.id}>
                                        <Link to={`/shop/${item.productId}`}>
                                            <img src={item.imageUrl || "assets/images/product_1.png"} alt="product" className="cart-img" />
                                        </Link>
                                        <div className="cart-details">
                                            <Link to={`/shop/${item.productId}`} className="title">{item.productName || "Sản phẩm"}</Link>
                                            <div className="meta mb-2">
                                                {item.color && (
                                                    <span className="me-3">
                                                        Màu: <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', background: item.color, verticalAlign: 'middle', border: '1px solid #ddd' }} title={item.color}></span>
                                                    </span>
                                                )}
                                                <span className="price">{formatVND(item.price)}</span>
                                            </div>
                                            <div className="modern-quantity-ctl d-inline-flex">
                                                <button type="button" onClick={() => updateItemQuantity(item.id, Math.max(1, item.quantity - 1))} disabled={item.quantity <= 1}>
                                                    <i className="fas fa-minus" />
                                                </button>
                                                <input type="text" value={item.quantity} readOnly />
                                                <button type="button" onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>
                                                    <i className="fas fa-plus" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="item-total">
                                            {formatVND(item.price * item.quantity)}
                                        </div>
                                        <a href="#!" className="btn-remove" onClick={(e) => { e.preventDefault(); removeCartItem(item.id); }}>
                                            <i className="fas fa-times" />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Checkout Summary Card */}
                        <div className="col-lg-4 wow fadeInRight">
                            <div className="checkout-glass-card">
                                <h3>Hóa Đơn Giỏ Hàng</h3>
                                <ul>
                                    <li>Tạm tính <span>{formatVND(subTotal)}</span></li>
                                    <li>Phí giao hàng <span>Miễn phí</span></li>
                                    <li>Tích lũy <span>0₫</span></li>
                                    <li className="total">Tổng cộng <span>{formatVND(subTotal)}</span></li>
                                </ul>
                                {checkoutError && (
                                    <div className="alert alert-danger py-2 mt-2 small">{checkoutError}</div>
                                )}
                                <a href="#!" className="btn-glow mt-2" onClick={handleCheckout}>
                                    Thanh toán ngay <i className="fas fa-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {successModal}
        </>
    );
};

export default Cart;
