import React from 'react';
import { Link } from 'react-router-dom';

const Blogs = () => {
    return (
        <section className="blog_2 pt_95">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-sm-9">
                        <div className="section_heading_2 section_heading">
                            <h3>Our <span>News</span> & Articles</h3>
                        </div>
                    </div>
                    <div className="col-xl-6 col-sm-3">
                        <div className="view_all_btn_area">
                            <Link className="view_all_btn" to="/blog">View all</Link>
                        </div>
                    </div>
                </div>
                <div className="row mt_15">
                    {[1, 2, 3].map(item => (
                        <div key={item} className="col-lg-4 col-md-6 mb-4 wow fadeInUp">
                            <div className="blog_item">
                                <Link to="/blog/1" className="blog_img">
                                    <img src={`assets/images/blog_img_${item}.png`} alt="blog" className="img-fluid w-100" />
                                </Link>
                                <div className="blog_text">
                                    <ul className="top">
                                        <li><span><img src="assets/images/user_icon_black.svg" alt="user" className="img-fluid" /></span> Admin</li>
                                        <li><span><img src="assets/images/calender.png" alt="date" className="img-fluid" /></span> 12 Mar 2025</li>
                                    </ul>
                                    <Link className="title" to="/blog/1">How to Plop Hair for Bouncy, Beautiful Curls</Link>
                                    <ul className="bottom">
                                        <li><Link to="/blog/1">read more <i className="fas fa-long-arrow-right"></i></Link></li>
                                        <li><span><i className="far fa-comment-dots"></i> 15 Comments</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blogs;