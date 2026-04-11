import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import blogService from '../../services/blogService';

const Blogs = () => {
    const [blogs, setBlogs]   = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Lấy 3 bài mới nhất cho section trang chủ
        blogService.getAllBlogs({ limit: 3 })
            .then(data => setBlogs(data.slice(0, 3)))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className="blog_2 pt_95">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-sm-9">
                        <div className="section_heading_2 section_heading">
                            <h3>Tin Tức <span>&</span> Bài Viết Mới</h3>
                        </div>
                    </div>
                    <div className="col-xl-6 col-sm-3">
                        <div className="view_all_btn_area">
                            <Link className="view_all_btn" to="/blog">Xem tất cả</Link>
                        </div>
                    </div>
                </div>

                <div className="row mt_15">
                    {loading && <p className="text-center py-5">Đang tải bài viết...</p>}
                    {!loading && blogs.length === 0 && (
                        <p className="text-center py-5">Chưa có bài viết nào.</p>
                    )}
                    {!loading && blogs.map(blog => (
                        <div key={blog.id} className="col-lg-4 col-md-6 mb-4 wow fadeInUp">
                            <div className="blog_item">
                                <Link to={blog.link} className="blog_img">
                                    <img src={blog.image} alt="blog" className="img-fluid w-100" />
                                </Link>
                                <div className="blog_text">
                                    <ul className="top">
                                        <li>
                                            <span>
                                                <i className="far fa-user"></i>
                                            </span>
                                            {blog.author}
                                        </li>
                                        <li>
                                            <span>
                                                <i className="far fa-calendar-alt"></i>
                                            </span>
                                            {blog.date}
                                        </li>
                                    </ul>
                                    <Link className="title" to={blog.link}>{blog.title}</Link>
                                    <ul className="bottom">
                                        <li>
                                            <Link to={blog.link}>
                                                đọc tiếp <i className="fas fa-long-arrow-right"></i>
                                            </Link>
                                        </li>
                                        <li>
                                            <span>
                                                <i className="far fa-comment-dots"></i> {blog.comments} Bình luận
                                            </span>
                                        </li>
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