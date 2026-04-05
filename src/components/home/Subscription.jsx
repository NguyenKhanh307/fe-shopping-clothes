import React from 'react';

const Subscription = () => {
    return (
        <section className="subscription_2 mt_50 xs_mt_60" style={{ background: 'url(assets/images/subscribe_2_bg.jpg)' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xxl-6 col-lg-8 wow fadeInUp">
                        <div className="subscription_2_text">
                            <h2>Get Upto <span>70% </span> Off Discount Coupon</h2>
                            <p>by Subscribe our Newsletter</p>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <input type="text" placeholder="Your email" />
                                <button type="submit" className="common_btn">Subscribe</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Subscription;