import React from 'react';
import CountUp from 'react-countup';
import PageBanner from '../components/common/PageBanner';
import Brands from '../components/home/Brands'; // Tái sử dụng component Brands từ trang chủ
import Blogs from '../components/home/Blogs';   // Tái sử dụng component Blogs từ trang chủ

const AboutUs = () => {
    // Khai báo đường dẫn Breadcrumb truyền vào Banner
    const breadcrumbData = [
        { label: 'Home', link: '/' },
        { label: 'About Us', link: null }
    ];

    return (
        <>
            {/* 1. KHỐI BANNER ĐẦU TRANG */}
            <PageBanner title="About Us" breadcrumb={breadcrumbData} />

            {/* 2. KHỐI ABOUT COMPANY */}
            <section className="about_us mt_100">
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-xxl-5 col-md-10 col-lg-6 wow fadeInLeft">
                            <div className="about_us_img">
                                <div className="img">
                                    <img src="/assets/images/about_img.jpg" alt="about us" className="img-fluid w-100" />
                                </div>
                                <h3>12+ <span>Years experience</span></h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate officiis architecto reiciendis. <span>jhon deo</span></p>
                            </div>
                        </div>
                        <div className="col-xxl-6 col-lg-6 wow fadeInRight">
                            <div className="about_us_text">
                                <h6>About Company</h6>
                                <h2>Well-coordinated Teamwork Speaks About Us</h2>
                                <p className="description">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate aspernatur molestiae minima pariatur consequatur voluptate sapiente deleniti soluta.</p>
                                <ul>
                                    <li>
                                        <h4>trusted partner</h4>
                                        <p>Lorem Ipsum Dolor Sit Amet Consectetur, Adipisicing Elit. Minus, Officiis Placeat Iusto Quasi Adipisci Impedit Delectus Beatae Ab Maxime.</p>
                                    </li>
                                    <li>
                                        <h4>quality products</h4>
                                        <p>Lorem Ipsum Dolor Sit Amet Consectetur, Adipisicing Elit. Minus, Officiis Placeat Iusto Quasi Adipisci Impedit Delectus Beatae Ab Maxime.</p>
                                    </li>
                                    <li>
                                        <h4>secure payment</h4>
                                        <p>Lorem Ipsum Dolor Sit Amet Consectetur, Adipisicing Elit. Minus, Officiis Placeat Iusto Quasi Adipisci Impedit Delectus Beatae Ab Maxime.</p>
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
                    <div class="row">
                        <div className="col-xl-3 col-md-6 wow fadeInUp">
                            <div className="features_item purple">
                                <div className="icon">
                                    <img src="/assets/images/feature-icon_1.svg" alt="feature" />
                                </div>
                                <div className="text">
                                    <h3>Return & refund</h3>
                                    <p>Money back guarantee</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 wow fadeInUp">
                            <div className="features_item green">
                                <div className="icon">
                                    <img src="/assets/images/feature-icon_3.svg" alt="feature" />
                                </div>
                                <div className="text">
                                    <h3>Quality Support</h3>
                                    <p>Always online 24/7</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 wow fadeInUp">
                            <div className="features_item orange">
                                <div className="icon">
                                    <img src="/assets/images/feature-icon_2.svg" alt="feature" />
                                </div>
                                <div className="text">
                                    <h3>Secure Payment</h3>
                                    <p>30% off by subscribing</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 wow fadeInUp">
                            <div className="features_item">
                                <div className="icon">
                                    <img src="/assets/images/feature-icon_4.svg" alt="feature" />
                                </div>
                                <div className="text">
                                    <h3>Daily Offers</h3>
                                    <p>20% off by subscribing</p>
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
                                            <h3>Why we are the <span>best</span></h3>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-md-6 wow fadeInUp">
                                        <div className="about_choose_text_box">
                                            <span><i className="fa-solid fa-shirt"></i></span>
                                            <h4>quality products</h4>
                                            <p>Objectively pontificate quality models before intuitive information.</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-md-6 wow fadeInUp">
                                        <div className="about_choose_text_box">
                                            <span><i className="fa-solid fa-truck"></i></span>
                                            <h4>Fast Delivery</h4>
                                            <p>Objectively pontificate quality models before intuitive information.</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-md-6 wow fadeInUp">
                                        <div className="about_choose_text_box">
                                            <span><i className="fa-solid fa-rotate-left"></i></span>
                                            <h4>return policy</h4>
                                            <p>Objectively pontificate quality models before intuitive information.</p>
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-md-6 wow fadeInUp">
                                        <div className="about_choose_text_box">
                                            <span><i className="fa-solid fa-headset"></i></span>
                                            <h4>24/7 Service</h4>
                                            <p>Objectively pontificate quality models before intuitive information.</p>
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
                                        <p>Happy customers</p>
                                    </li>
                                    <li className="wow fadeInUp">
                                        <div className="icon">
                                            <img src="/assets/images/counter_icon_2.png" alt="counter" className="img-fluid w-100" />
                                        </div>
                                        <h2>
                                            <span className="counter"><CountUp end={350} enableScrollSpy scrollSpyOnce /></span>+
                                        </h2>
                                        <p>Expert Team</p>
                                    </li>
                                    <li className="wow fadeInUp">
                                        <div className="icon">
                                            <img src="/assets/images/counter_icon_3.png" alt="counter" className="img-fluid w-100" />
                                        </div>
                                        <h2>
                                            <span className="counter"><CountUp end={35} enableScrollSpy scrollSpyOnce /></span>+
                                        </h2>
                                        <p>Award Wining</p>
                                    </li>
                                    <li className="wow fadeInUp">
                                        <div className="icon">
                                            <img src="/assets/images/counter_icon_4.png" alt="counter" className="img-fluid w-100" />
                                        </div>
                                        <h2>
                                            <span className="counter"><CountUp end={4} suffix=".9" decimals={1} enableScrollSpy scrollSpyOnce /></span>
                                        </h2>
                                        <p>Avarage Rating</p>
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