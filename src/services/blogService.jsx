import axiosClient from './axiosInstance';

// Mapper: chuẩn hoá field blog từ BE → UI
const mapBlog = (b) => ({
    ...b,
    image:    b.imageUrl    ?? b.image_url    ?? b.image    ?? '',
    author:   b.authorName  ?? b.author_name  ?? 'Ẩn Danh',
    comments: b.commentsCount ?? b.comments_count ?? 0,
    // Format ngày hiển thị: "24 Apr 2025"
    date: b.publishedAt ?? b.published_at
        ? new Date(b.publishedAt ?? b.published_at).toLocaleDateString('vi-VN', {
              day: '2-digit', month: 'short', year: 'numeric',
          })
        : '',
    link: `/blog/${b.slug ?? b.id}`,
});

const mapBlogCategory = (c) => ({
    ...c,
    link: `/blog?category=${c.slug ?? c.id}`,
});

const blogService = {
    // Danh sách blog (có phân trang & lọc theo danh mục)
    getAllBlogs: (params = {}) =>
        axiosClient.get('/blogs', { params }).then(res => res.data.map(mapBlog)),

    // Bài viết phổ biến (sidebar Blog.jsx)
    getPopularBlogs: () =>
        axiosClient.get('/blogs/popular').then(res => res.data.map(mapBlog)),

    // Danh mục blog (sidebar Blog.jsx)
    getBlogCategories: () =>
        axiosClient.get('/blog-categories').then(res => res.data.map(mapBlogCategory)),

    // Tags (sidebar Blog.jsx)
    getBlogTags: () =>
        axiosClient.get('/blog-tags').then(res => res.data),
};

export default blogService;
