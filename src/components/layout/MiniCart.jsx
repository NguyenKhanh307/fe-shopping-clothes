import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MiniCart = ({ show, handleClose }) => {
    // Giả lập data giỏ hàng (Sau này thay bằng Context API hoặc Redux)
    const cartItems = [
        { id: 1, name: "Men's Fashionable Hoodie", price: 140, color: "Red", size: "XL", img: "assets/images/product_1.png" },
        { id: 2, name: "Kids cotton Combo Set", price: 130, color: "Orange", size: "M", img: "assets/images/product_2.png" }
    ];

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end" className="mini_cart">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                    my cart <span>({cartItems.length < 10 ? `0${cartItems.length}` : cartItems.length})</span>
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.id}>
                            <Link to={`/shop/${item.id}`} className="cart_img">
                                <img src={item.img} alt="product" className="img-fluid w-100" />
                            </Link>
                            <div className="cart_text">
                                <Link className="cart_title" to={`/shop/${item.id}`}>{item.name}</Link>
                                <p>${item.price}</p>
                                <span><b>Color:</b> {item.color}</span>
                                <span><b>Size:</b> {item.size}</span>
                            </div>
                            <a className="del_icon" href="#!"><i className="fal fa-times"></i></a>
                        </li>
                    ))}
                </ul>
                <h5>sub total <span>$270.00</span></h5>
                <div className="minicart_btn_area">
                    <Link className="common_btn" to="/cart" onClick={handleClose}>view cart</Link>
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default MiniCart;