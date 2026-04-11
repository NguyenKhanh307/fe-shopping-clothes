import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const MiniCart = ({ show, handleClose }) => {
    const { cartItems, subTotal, removeCartItem, updateItemQuantity } = useCart();
    const { isLoggedIn } = useAuth();

    const handleRemoveItem = (e, itemId) => {
        e.preventDefault();
        removeCartItem(itemId);
    };

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end" className="mini_cart">
            <Offcanvas.Header className="premium-offcanvas-header border-bottom">
                <Offcanvas.Title className="premium-offcanvas-title">
                    <i className="fas fa-shopping-bag" style={{ color: '#ff7e5f' }}></i> Giỏ hàng {isLoggedIn ? <span>({cartItems.length < 10 ? `0${cartItems.length}` : cartItems.length})</span> : ''}
                </Offcanvas.Title>
                <button type="button" className="premium-close-btn" onClick={handleClose}>
                    <i className="fas fa-times"></i>
                </button>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {!isLoggedIn ? (
                    <div className="text-center mt-5">
                        <i className="fas fa-shopping-bag fa-4x mb-3 text-muted"></i>
                        <h5>Vui lòng đăng nhập</h5>
                        <p className="text-muted mb-4">Bạn cần đăng nhập để xem giỏ hàng của mình.</p>
                        <Link className="common_btn mb-3 d-block" to="/sign-in" onClick={handleClose}>Đăng nhập</Link>
                        <Link className="common_btn d-block" style={{ background: '#333' }} to="/sign-up" onClick={handleClose}>Đăng ký</Link>
                    </div>
                ) : (
                    <>
                        <ul>
                            {cartItems.map((item) => (
                                <li key={item.id}>
                                    <Link to={`/shop/${item.productId}`} className="cart_img" onClick={handleClose}>
                                        {/* TODO: Replace with real product image when BE returns it */}
                                        <img src={item.imageUrl || "assets/images/product_1.png"} alt="product" className="img-fluid w-100" />
                                    </Link>
                                    <div className="cart_text">
                                        <Link className="cart_title" to={`/shop/${item.productId}`} onClick={handleClose}>{item.productName || "Sản phẩm"}</Link>
                                        <p>{Number(item.price).toLocaleString('vi-VN')}₫</p>
                                        <div className="d-flex align-items-center mt-1 mb-2">
                                            {item.color && <span className="me-3"><b>Màu:</b> <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', background: item.color, verticalAlign: 'middle', border: '1px solid #ddd' }} title={item.color}></span></span>}
                                        </div>
                                        <div className="modern-quantity-ctl d-inline-flex" style={{ transform: 'scale(0.85)', transformOrigin: 'left center' }}>
                                            <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); updateItemQuantity(item.id, Math.max(1, item.quantity - 1)); }} disabled={item.quantity <= 1}>
                                                <i className="fas fa-minus" />
                                            </button>
                                            <input type="text" value={item.quantity} readOnly style={{ color: '#1e293b' }} />
                                            <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); updateItemQuantity(item.id, item.quantity + 1); }}>
                                                <i className="fas fa-plus" />
                                            </button>
                                        </div>
                                    </div>
                                    <a className="del_icon" href="#!" onClick={(e) => handleRemoveItem(e, item.id)}>
                                        <i className="fas fa-times"></i>
                                    </a>
                                </li>
                            ))}
                            {cartItems.length === 0 && (
                                <li><p style={{ textAlign: "center", width: "100%", padding: "20px" }}>Giỏ hàng trống.</p></li>
                            )}
                        </ul>
                        <h5>sub total <span>{Number(subTotal).toLocaleString('vi-VN')}₫</span></h5>
                        <div className="minicart_btn_area">
                            <Link className="common_btn" to="/cart" onClick={handleClose}>Xem giỏ hàng chi tiết</Link>
                        </div>
                    </>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default MiniCart;