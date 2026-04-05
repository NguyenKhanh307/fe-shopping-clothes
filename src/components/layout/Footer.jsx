import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer_2 pt_100" style={{ background: 'url(assets/images/footer_2_bg_2.jpg)' }}>
            <div className="container">
                <div className="row justify-content-between">
                    {/* Logo & Social */}
                    <div className="col-xl-3 col-md-6 col-lg-3 wow fadeInUp" data-wow-delay=".7s">
                        <div className="footer_2_logo_area">
                            <Link className="footer_logo" to="/">
                                <img src="assets/images/footer_logo_2.png" alt="Zenis" className="img-fluid w-100" />
                            </Link>
                            <p>Đồng hành cùng phong cách của bạn mỗi ngày. Mua sắm dễ dàng, an tâm chất lượng.</p>
                            <ul>
                                <li><span>Follow :</span></li>
                                <li><a href="#!"><i className="fab fa-facebook-f"></i></a></li>
                                <li><a href="#!"><i className="fab fa-twitter"></i></a></li>
                                <li><a href="#!"><i className="fab fa-google-plus-g"></i></a></li>
                                <li><a href="#!"><i className="fab fa-linkedin-in"></i></a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div className="col-xl-2 col-sm-6 col-md-4 col-lg-2 wow fadeInUp" data-wow-delay="1s">
                        <div className="footer_link">
                            <h3>Company</h3>
                            <ul>
                                <li><Link to="/about">About us</Link></li>
                                <li><Link to="/contact">Contact Us</Link></li>
                                <li><Link to="/affiliate">Affiliate</Link></li>
                                <li><Link to="/career">Career</Link></li>
                                <li><Link to="/blog">Latest News</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Category Links */}
                    <div className="col-xl-2 col-sm-6 col-md-4 col-lg-2 wow fadeInUp" data-wow-delay="1.3s">
                        <div className="footer_link">
                            <h3>Category</h3>
                            <ul>
                                <li><Link to="/shop?category=men">Men’s Fashion</Link></li>
                                <li><Link to="/shop?category=denim">Denim Collection</Link></li>
                                <li><Link to="/shop?category=western">Western Wear</Link></li>
                                <li><Link to="/shop?category=sport">Sport Wear</Link></li>
                                <li><Link to="/shop?category=jewellery">Fashion Jewellery</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-xl-2 col-sm-6 col-md-4 col-lg-2 wow fadeInUp" data-wow-delay="1.6s">
                        <div className="footer_link">
                            <h3>Quick Links</h3>
                            <ul>
                                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                                <li><Link to="/terms">Terms and Condition</Link></li>
                                <li><Link to="/return-policy">Return Policy</Link></li>
                                <li><Link to="/faq">FAQ's</Link></li>
                                <li><Link to="/vendor-register">Become a Vendor</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="col-xl-3 col-sm-6 col-md-4 col-lg-3 wow fadeInUp" data-wow-delay="1.9s">
                        <div className="footer_link footer_logo_area">
                            <h3>Contact Us</h3>
                            <p>Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7. Hãy liên hệ ngay khi cần.</p>
                            <span>
                                <b><img src="assets/images/location_icon_white.png" alt="Map" className="img-fluid" /></b>
                                123 Fashion Street, NY
                            </span>
                            <span>
                                <b><img src="assets/images/phone_icon_white.png" alt="Call" className="img-fluid" /></b>
                                <a href="callto:+123324587939">+123 324 5879 39</a>
                            </span>
                            <span>
                                <b><img src="assets/images/mail_icon_white.png" alt="Mail" className="img-fluid" /></b>
                                <a href="mailto:info@Zenis.com">info@Zenis.com</a>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Copyright & Payments */}
                <div className="row">
                    <div className="col-12">
                        <div className="footer_copyright mt_75">
                            <p>Copyright @ <b>Zenis</b> 2025. All right reserved.</p>
                            <ul className="payment">
                                <li>Payment by :</li>
                                <li><img src="assets/images/footer_payment_icon_1.jpg" alt="payment" className="img-fluid w-100" /></li>
                                <li><img src="assets/images/footer_payment_icon_2.jpg" alt="payment" className="img-fluid w-100" /></li>
                                <li><img src="assets/images/footer_payment_icon_3.jpg" alt="payment" className="img-fluid w-100" /></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;