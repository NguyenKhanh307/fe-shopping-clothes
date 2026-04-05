import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
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
                            <img src="../../assets/images/compare_icon_white.svg" alt="Compare" className="img-fluid" />
                        </a>
                    </li>
                    <li>
                        <a href="#!" onClick={(e) => e.preventDefault()}>
                            <img src="assets/images/love_icon_white.svg" alt="Love" className="img-fluid" />
                        </a>
                    </li>
                    <li>
                        <a href="#!" onClick={(e) => e.preventDefault()}>
                            <img src="assets/images/cart_icon_white.svg" alt="Cart" className="img-fluid" />
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