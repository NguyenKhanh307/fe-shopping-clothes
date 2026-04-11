import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    // Tự động cập nhật năm hiện tại
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer_2 pt_100" style={{ backgroundImage: 'url(assets/images/footer_2_bg_2.jpg)' }}>
            <div className="container">
                <div className="row justify-content-between">
                    {/* Logo & Mạng xã hội */}
                    <div className="col-xl-3 col-md-6 col-lg-3 wow fadeInUp" data-wow-delay=".7s">
                        <div className="footer_2_logo_area">
                            <Link className="footer_logo" to="/">
                                <img src="assets/images/footer_logo_2.png" alt="Zenis" className="img-fluid w-100" />
                            </Link>
                            <p>Đồng hành cùng phong cách của bạn mỗi ngày. Mua sắm dễ dàng, an tâm chất lượng.</p>
                            <ul>
                                <li><span>Theo dõi :</span></li>
                                <li><a href="#!"><i className="fab fa-facebook-f"></i></a></li>
                                <li><a href="#!"><i className="fab fa-twitter"></i></a></li>
                                <li><a href="#!"><i className="fab fa-google-plus-g"></i></a></li>
                                <li><a href="#!"><i className="fab fa-linkedin-in"></i></a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Về Công ty */}
                    <div className="col-xl-2 col-sm-6 col-md-4 col-lg-2 wow fadeInUp" data-wow-delay="1s">
                        <div className="footer_link">
                            <h3>Về Chúng Tôi</h3>
                            <ul>
                                <li><Link to="/about">Giới thiệu</Link></li>
                                <li><Link to="/contact">Liên hệ</Link></li>
                                <li><Link to="/affiliate">Tiếp thị liên kết</Link></li>
                                <li><Link to="/career">Tuyển dụng</Link></li>
                                <li><Link to="/blog">Tin tức mới nhất</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Danh mục sản phẩm */}
                    <div className="col-xl-2 col-sm-6 col-md-4 col-lg-2 wow fadeInUp" data-wow-delay="1.3s">
                        <div className="footer_link">
                            <h3>Danh mục</h3>
                            <ul>
                                <li><Link to="/shop?category=men">Thời trang nam</Link></li>
                                <li><Link to="/shop?category=denim">Bộ sưu tập Denim</Link></li>
                                <li><Link to="/shop?category=western">Trang phục phương Tây</Link></li>
                                <li><Link to="/shop?category=sport">Đồ thể thao</Link></li>
                                <li><Link to="/shop?category=jewellery">Trang sức thời trang</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Liên kết nhanh */}
                    <div className="col-xl-2 col-sm-6 col-md-4 col-lg-2 wow fadeInUp" data-wow-delay="1.6s">
                        <div className="footer_link">
                            <h3>Hỗ trợ khách hàng</h3>
                            <ul>
                                <li><Link to="/privacy-policy">Chính sách bảo mật</Link></li>
                                <li><Link to="/terms">Điều khoản & Điều kiện</Link></li>
                                <li><Link to="/return-policy">Chính sách đổi trả</Link></li>
                                <li><Link to="/faq">Câu hỏi thường gặp</Link></li>
                                <li><Link to="/vendor-register">Trở thành người bán</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Thông tin liên hệ */}
                    <div className="col-xl-3 col-sm-6 col-md-4 col-lg-3 wow fadeInUp" data-wow-delay="1.9s">
                        <div className="footer_link footer_logo_area">
                            <h3>Liên hệ</h3>
                            <p>Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7. Hãy liên hệ ngay khi cần.</p>
                            <span>
                                <b><img src="assets/images/location_icon_white.png" alt="Địa chỉ" className="img-fluid" /></b>
                                123 Đường Thời Trang, Quận 1, TP.HCM
                            </span>
                            <span>
                                <b><img src="assets/images/phone_icon_white.png" alt="Điện thoại" className="img-fluid" /></b>
                                <a href="tel:+123324587939">+123 324 5879 39</a>
                            </span>
                            <span>
                                <b><img src="assets/images/mail_icon_white.png" alt="Email" className="img-fluid" /></b>
                                <a href="mailto:info@Zenis.com">info@Zenis.com</a>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bản quyền & Thanh toán */}
                <div className="row">
                    <div className="col-12">
                        <div className="footer_copyright mt_75">
                            <p>Bản quyền thuộc về @ <b>Zenis</b> {currentYear}. Bảo lưu mọi quyền.</p>
                            <ul className="payment">
                                <li>Thanh toán qua :</li>
                                <li><img src="assets/images/footer_payment_icon_1.jpg" alt="phương thức thanh toán" className="img-fluid w-100" /></li>
                                <li><img src="assets/images/footer_payment_icon_2.jpg" alt="phương thức thanh toán" className="img-fluid w-100" /></li>
                                <li><img src="assets/images/footer_payment_icon_3.jpg" alt="phương thức thanh toán" className="img-fluid w-100" /></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;