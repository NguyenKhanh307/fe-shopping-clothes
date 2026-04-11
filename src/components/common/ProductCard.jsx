import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
    const { addItemToCart } = useCart();
    const navigate = useNavigate();

    const handleAddToCart = (e) => {
        e.preventDefault();
        addItemToCart(product.id, 1, product.colors && product.colors.length > 0 ? product.colors[0].hexCode : null).then(success => {
            if (success) alert("Đã thêm vào giỏ hàng");
            else navigate('/sign-in', { state: { from: '/cart' } });
        });
    };

    return (
        <div className="product_item_2 product_item">
            <div className="product_img">
                <img src={product.image} alt={product.name} className="img-fluid w-100" />
                
                {/* Render nhãn giảm giá / new nếu có */}
                <ul className="discount_list">
                    {product.discountPercent > 0 && (
                        <li className="discount"> <b>-</b> {product.discountPercent}%</li>
                    )}
                    {product.isNew && <li className="new"> new</li>}
                </ul>

                <ul className="btn_list">
                    <li>
                        <a href="#!" onClick={(e) => e.preventDefault()}>
                            <i className="fas fa-random"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#!" onClick={(e) => e.preventDefault()}>
                            <i className="far fa-heart"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#!" onClick={handleAddToCart} title="Thêm vào giỏ">
                            <i className="fas fa-shopping-bag"></i>
                        </a>
                    </li>
                </ul>
            </div>
            
            <div className="product_text">
                <Link className="title" to={`/shop/${product.id}`}>{product.name}</Link>
                <p className="price">
                    ${product.salePrice.toFixed(2)}{' '}
                    {product.originalPrice && <del>${product.originalPrice.toFixed(2)}</del>}
                </p>
                
                {/* Giả lập rating */}
                <p className="rating">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="far fa-star"></i>
                    <span>({product.reviewsCount} reviews)</span>
                </p>

                {/* Render màu sắc nếu có */}
                {product.colors && product.colors.length > 0 && (
                    <ul className="color">
                        {product.colors.map((color, index) => (
                            <li 
                                key={index} 
                                className={index === 0 ? 'active' : ''} 
                                style={{ background: color }}
                            ></li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ProductCard;