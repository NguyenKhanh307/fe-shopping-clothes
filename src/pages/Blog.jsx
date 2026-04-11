import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageBanner from '../components/common/PageBanner';
import blogService from '../services/blogService';

const Blog = () => {
    const breadcrumbData = [
        { label: 'Trang Chủ', link: '/' },
        { label: 'Blog', link: null },
    ];

    const [blogs, setBlogs]               = useState([]);
    const [popularBlogs, setPopularBlogs] = useState([]);
    const [blogCategories, setBlogCategories] = useState([]);
    const [tags, setTags]                 = useState([]);
    const [loading, setLoading]           = useState(true);

    useEffect(() => {
        // Gọi song song tất cả các API cần thiết cho trang Blog
        Promise.allSettled([
            blogService.getAllBlogs(),
            blogService.getPopularBlogs(),
            blogService.getBlogCategories(),
            blogService.getBlogTags(),
        ]).then(([blogsRes, popularRes, catsRes, tagsRes]) => {
            if (blogsRes.status    === 'fulfilled') setBlogs(blogsRes.value);
            if (popularRes.status  === 'fulfilled') setPopularBlogs(popularRes.value);
            if (catsRes.status     === 'fulfilled') setBlogCategories(catsRes.value);
            if (tagsRes.status     === 'fulfilled') setTags(tagsRes.value);
        }).finally(() => setLoading(false));
    }, []);



    return (
        <>
            <PageBanner title="Blog" breadcrumb={breadcrumbData} />

            <section className="blog_right_sidebar blog_2 mt_75 mb_100">
                <div className="container">
                    <div className="row">

                        {/* ═══════════════ CỘT TRÁI: DANH SÁCH BLOG ═══════════════ */}
                        <div className="col-xl-9 col-lg-8">
                            <div className="row">
                                {loading && <p className="text-center py-5">Đang tải bài viết...</p>}
                                {!loading && blogs.length === 0 && (
                                    <p className="text-center py-5">Chưa có bài viết nào.</p>
                                )}
                                {!loading && blogs.map((blog) => (
                                    <div key={blog.id} className="col-xl-4 col-md-6 wow fadeInUp">
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
                                                            đọc tiếp <i className="fa-solid fa-arrow-right"></i>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <span>
                                                            <i className="fa-regular fa-comment-dots"></i> {blog.comments} Bình luận
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Phân trang */}
                            <div className="row">
                                <div className="pagination_area">
                                    <nav aria-label="Blog Pagination">
                                        <ul className="pagination justify-content-center mt_50">
                                            <li className="page-item">
                                                <Link className="page-link" to="#">
                                                    <i className="fa-solid fa-arrow-left"></i>
                                                </Link>
                                            </li>
                                            <li className="page-item">
                                                <Link className="page-link active" to="#">01</Link>
                                            </li>
                                            <li className="page-item">
                                                <Link className="page-link" to="#">02</Link>
                                            </li>
                                            <li className="page-item">
                                                <Link className="page-link" to="#">03</Link>
                                            </li>
                                            <li className="page-item">
                                                <Link className="page-link" to="#">
                                                    <i className="fa-solid fa-arrow-right"></i>
                                                </Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>

                        {/* ═══════════════ CỘT PHẢI: SIDEBAR ═══════════════ */}
                        <div className="col-xl-3 col-lg-4 col-md-8 mt-5 mt-lg-0">
                            <div id="sticky_sidebar">
                                <div className="blog_details_right wow fadeInRight">

                                    {/* Ô tìm kiếm */}
                                    <form action="#" onSubmit={(e) => e.preventDefault()}>
                                        <input type="text" placeholder="Tìm kiếm..." />
                                        <button type="submit">
                                            <i className="fa-solid fa-search" aria-hidden="true"></i>
                                        </button>
                                    </form>

                                    {/* Bài viết phổ biến */}
                                    <div className="blog_details_right_header sidebar_blog">
                                        <h3>Bài Viết Phổ Biến</h3>
                                        {popularBlogs.map((pop) => (
                                            <div key={pop.id} className="popular_blog d-flex flex-wrap">
                                                <div className="popular_blog_img">
                                                    <img src={pop.image} alt="img" className="img-fluid w-100" />
                                                </div>
                                                <div className="popular_blog_text">
                                                    <p>
                                                        <span>
                                                            <i className="far fa-calendar-alt"></i>
                                                        </span>
                                                        {pop.date}
                                                    </p>
                                                    <Link className="title" to={pop.link}>{pop.title}</Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Danh mục blog */}
                                    <div className="blog_details_right_header">
                                        <h3>Danh Mục Blog</h3>
                                        <ul className="sidebar_blog_category">
                                            {blogCategories.map((cat) => (
                                                <li key={cat.id}>
                                                    <Link to={cat.link}>
                                                        <p>{cat.name}</p>
                                                        <span>
                                                            ({cat.postCount ?? cat.post_count ?? 0 < 10
                                                                ? `0${cat.postCount ?? cat.post_count ?? 0}`
                                                                : cat.postCount ?? cat.post_count ?? 0})
                                                        </span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Tags */}
                                    <div className="blog_details_right_header">
                                        <h3>Tags Phổ Biến</h3>
                                        <ul className="blog_details_tag d-flex flex-wrap">
                                            {tags.map((tag) => (
                                                <li key={tag.id ?? tag.slug}>
                                                    <Link to={`/blog?tag=${tag.slug}`}>{tag.name}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Banner quảng cáo */}
                                    <div className="blog_details_right_header">
                                        <div className="blog_seidebar_add">
                                            <img
                                                src="/assets/images/blog_sidebar_add_img.png"
                                                alt="blog add"
                                                className="img-fluid w-100"
                                            />
                                            <div className="text">
                                                <h4>Giúp Bạn Tỏa Sáng Mỗi Ngày.</h4>
                                                <Link className="common_btn" to="/shop">
                                                    mua ngay <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default Blog;