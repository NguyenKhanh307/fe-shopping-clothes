import React from 'react';
import { Link } from 'react-router-dom';
import PageBanner from '../components/common/PageBanner';

const ContactUs = () => {
    const breadcrumbData = [
        { label: 'Trang Chủ', link: '/' },
        { label: 'Liên Hệ', link: null }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Tính năng gửi tin nhắn sẽ được kết nối với Backend sau!");
    };

    return (
        <>
            <PageBanner title="Liên Hệ" breadcrumb={breadcrumbData} />

            <section className="contact_us mt_75">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-4 col-md-6">
                            <div className="contact_info wow fadeInUp">
                                <span><img src="/assets/images/call_icon_black.png" alt="call" className="img-fluid" /></span>
                                <h3>Gọi Cho Chúng Tôi</h3>
                                <a href="callto:12345678901">+84 28 3850 5520</a>
                                <a href="callto:12345678901">+84 90 1234 567</a>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-6">
                            <div className="contact_info wow fadeInUp">
                                <span><img src="/assets/images/mail_icon_black.png" alt="Mail" className="img-fluid" /></span>
                                <h3>Gửi Email</h3>
                                <a href="mailto:support@zenis.com">support@zenis.com</a>
                                <a href="mailto:info@zenis.com">info@zenis.com</a>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-6">
                            <div className="contact_info wow fadeInUp">
                                <span><img src="/assets/images/location_icon_black.png" alt="Map" className="img-fluid" /></span>
                                <h3>Địa Chỉ Của Chúng Tôi</h3>
                                {/* ĐÃ CẬP NHẬT ĐỊA CHỈ MỚI */}
                                <p>180 Cao Lỗ, Phường 4, Quận 8, Thành phố Hồ Chí Minh, Việt Nam</p>
                            </div>
                        </div>
                    </div>

                    <div className="row mt_75">
                        <div className="col-lg-5">
                            <div className="contact_img wow fadeInLeft">
                                <img src="/assets/images/contact_message.jpg" alt="contact" className="img-fluid w-100" />
                                <div className="contact_hotline">
                                    <h3>Hotline</h3>
                                    <a href="callto:+842838505520">+84 28 3850 5520</a>
                                    <div className="icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            strokeWidth="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-7">
                            <div className="contact_form wow fadeInRight">
                                <h2>Liên Hệ Với Chúng Tôi 👋</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="single_input">
                                                <label>Họ và Tên</label>
                                                <input type="text" placeholder="Nguyễn Văn A" required />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="single_input">
                                                <label>Email</label>
                                                <input type="email" placeholder="example@email.com" required />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="single_input">
                                                <label>Số Điện Thoại</label>
                                                <input type="text" placeholder="+84 912 345 678" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="single_input">
                                                <label>Chủ Đề</label>
                                                <input type="text" placeholder="Chủ đề" />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="single_input">
                                                <label>Nội Dung</label>
                                                <textarea rows="7" placeholder="Nội dung tin nhắn..." required></textarea>
                                            </div>
                                            <button type="submit" className="common_btn">
                                                gửi tin nhắn <i className="fa-solid fa-arrow-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="contact_map mt_100 wow fadeInUp">
                    {/* ĐÃ CẬP NHẬT BẢN ĐỒ THEO TỌA ĐỘ BẠN CUNG CẤP */}
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.954415822601!2d106.6756326757134!3d10.73800635990264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f62a90e5dbd%3A0x67aa3a8300e12915!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4cgU8OgaSBHw7Ju!5e0!3m2!1svi!2s!4v1712305545000!5m2!1svi!2s"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Saigon Technology University Map"
                    ></iframe>
                </div>
            </section>
        </>
    );
};

export default ContactUs;