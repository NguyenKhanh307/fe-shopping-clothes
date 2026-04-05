import React from 'react';
import CountUp from 'react-countup';
import PageBanner from '../components/common/PageBanner';
import Brands from '../components/home/Brands'; // Tái sử dụng component Brands từ trang chủ
import Blogs from '../components/home/Blogs';   // Tái sử dụng component Blogs từ trang chủ

const AboutUs = () => {
    // Khai báo đường dẫn Breadcrumb truyền vào Banner
    const breadcrumbData = [
        { label: 'Trang Chủ', link: '/' },
        { label: 'Giới Thiệu', link: null }
    ];

    return (
        <>
            {/* 1. KHỐI BANNER ĐẦU TRANG */}
            <PageBanner title="Giới Thiệu" breadcrumb={breadcrumbData} />

            {/* 2. KHỐI ABOUT COMPANY */}
            <section className="about_us mt_100">
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-xxl-5 col-md-10 col-lg-6 wow fadeInLeft">
                            <div className="about_us_img">
                                <div className="img">
                                    <img src="/assets/images/about_img.jpg" alt="about us" className="img-fluid w-100" />
                                </div>
                                <h3>12+ <span>Năm Kinh Nghiệm</span></h3>
                                <p>Chúng tôi tự hào đồng hành cùng hàng nghìn khách hàng trong suốt hơn một thập kỷ. <span>Zenis Fashion</span></p>
                            </div>
                        </div>
                        <div className="col-xxl-6 col-lg-6 wow fadeInRight">
                            <div className="about_us_text">
                                <h6>Về Chúng Tôi</h6>
                                <h2>Sự Phối Hợp Nhịp Nhàng Tạo Nên Thương Hiệu Của Chúng Tôi</h2>
                                <p className="description">Chúng tôi là đội ngũ đam mê thời trang, cam kết mang đến những sản phẩm chất lượng với giá thành hợp lý nhất cho người tiêu dùng Việt Nam.</p>
                                <ul>
                                    <li>
                                        <h4>Đối Tác Tin Cậy</h4>
                                        <p>Chúng tôi hợp tác với các nhà cung cấp uy tín, đảm bảo mỗi sản phẩm đều đạt tiêu chuẩn chất lượng cao nhất trước khi đến tay khách hàng.</p>
                                    </li>
                                    <li>
                                        <h4>Sản Phẩm Chất Lượng</h4>
                                        <p>Mỗi sản phẩm được kiểm định nghiêm ngặt về chất liệu, đường may và độ bền, mang lại trải nghiệm mua sắm thực sự xứng đáng với đồng tiền bạn bỏ ra.</p>
                                    </li>
                                    <li>
                                        <h4>Thanh Toán An Toàn</h4>
                                        <p>Hệ thống thanh toán được mã hóa bảo mật 256-bit, hỗ trợ đa dạng phương thức từ thẻ ngân hàng, ví điện tử đến thanh toán khi nhận hàng.</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. KHỐI TÍNH NĂNG (FEATURES) */}
            <section className="features mt_75">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-3 col-md-6 wow fadeInUp">
                            <div className="features_item purple">
                                <div className="icon">
                                    <img src="/assets/images/feature-icon_1.svg" alt="feature" />
                                </div>
                                <div className="text">
                                    <h3>Đổi Trả & Hoàn Tiền</h3>
                                    <p>Hoàn tiền 100% nếu không hài lòng</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 wow fadeInUp">
                            <div className="features_item green">
                                <div className="icon">
                                    <img src="/assets/images/feature-icon_3.svg" alt="feature" />
                                </div>
                                <div className="text">
                                    <h3>Hỗ Trợ Chất Lượng</h3>
                                    <p>Luôn trực tuyến 24/7</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 wow fadeInUp">
                            <div className="features_item orange">
                                <div className="icon">
                                    <img src="/assets/images/feature-icon_2.svg" alt="feature" />
                                </div>
                                <div className="text">
                                    <h3>Thanh Toán An Toàn</h3>
                                    <p>Giảm 30% khi đăng ký thành viên</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 wow fadeInUp">
                            <div className="features_item">
                                <div className="icon">
                                    <img src="/assets/images/feature-icon_4.svg" alt="feature" />
                                </div>
                                <div className="text">
                                    <h3>Ưu Đãi Hằng Ngày</h3>
                                    <p>Giảm 20% khi đăng ký thành viên</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. KHỐI VÌ SAO CHỌN CHÚNG TÔI */}
            <section className="about_choose mt_95 pt_100 pb_100">
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-8 col-lg-7">
                            <div className="about_choose_text">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="section_heading_2 section_heading mb_15">
                                            <h3>Tại Sao Chọn <span>Chúng Tôi</span></h3>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-md-6 wow fadeInUp">
                                        <div className="about_choose_text_box">
                                            <span><i className="fa-solid fa-shirt"></i></span>
                                            <h4>Sản Phẩm Chất Lượng</h4>
                                            <p>Cam kết chỉ cung cấp những sản phẩm đã qua kiểm định chất lượng nghiêm ngặt.</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-md-6 wow fadeInUp">
                                        <div className="about_choose_text_box">
                                            <span><i className="fa-solid fa-truck"></i></span>
                                            <h4>Giao Hàng Nhanh</h4>
                                            <p>Giao hàng toàn quốc trong 2–5 ngày làm việc, miễn phí vận chuyển cho đơn từ 500K.</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-md-6 wow fadeInUp">
                                        <div className="about_choose_text_box">
                                            <span><i className="fa-solid fa-rotate-left"></i></span>
                                            <h4>Chính Sách Đổi Trả</h4>
                                            <p>Đổi trả miễn phí trong vòng 30 ngày nếu sản phẩm có lỗi từ nhà sản xuất.</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-md-6 wow fadeInUp">
                                        <div className="about_choose_text_box">
                                            <span><i className="fa-solid fa-headset"></i></span>
                                            <h4>Hỗ Trợ 24/7</h4>
                                            <p>Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xxl-4 col-lg-5 wow fadeInRight">
                            <div className="about_choose_img">
                                <img src="/assets/images/why_choose_img.jpg" alt="about us" className="img-fluid w-100" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. KHỐI BRANDS (Tái sử dụng) */}
            <Brands />

            {/* 6. KHỐI ĐẾM SỐ (Dùng thư viện react-countup) */}
            <section className="counter_part mt_100">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="counter_area">
                                <ul>
                                    <li className="wow fadeInUp">
                                        <div className="icon">
                                            <img src="/assets/images/counter_icon_1.png" alt="counter" className="img-fluid w-100" />
                                        </div>
                                        <h2>
                                            <span className="counter"><CountUp end={950} enableScrollSpy scrollSpyOnce /></span>+
                                        </h2>
                                        <p>Khách Hàng Hài Lòng</p>
                                    </li>
                                    <li className="wow fadeInUp">
                                        <div className="icon">
                                            <img src="/assets/images/counter_icon_2.png" alt="counter" className="img-fluid w-100" />
                                        </div>
                                        <h2>
                                            <span className="counter"><CountUp end={350} enableScrollSpy scrollSpyOnce /></span>+
                                        </h2>
                                        <p>Chuyên Gia Của Chúng Tôi</p>
                                    </li>
                                    <li className="wow fadeInUp">
                                        <div className="icon">
                                            <img src="/assets/images/counter_icon_3.png" alt="counter" className="img-fluid w-100" />
                                        </div>
                                        <h2>
                                            <span className="counter"><CountUp end={35} enableScrollSpy scrollSpyOnce /></span>+
                                        </h2>
                                        <p>Giải Thưởng Đạt Được</p>
                                    </li>
                                    <li className="wow fadeInUp">
                                        <div className="icon">
                                            <img src="/assets/images/counter_icon_4.png" alt="counter" className="img-fluid w-100" />
                                        </div>
                                        <h2>
                                            <span className="counter"><CountUp end={4} suffix=".9" decimals={1} enableScrollSpy scrollSpyOnce /></span>
                                        </h2>
                                        <p>Đánh Giá Trung Bình</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. KHỐI BLOGS (Tái sử dụng) */}
            <Blogs />

        </>
    );
};

export default AboutUs;