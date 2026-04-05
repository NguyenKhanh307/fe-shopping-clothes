-- ============================================================
--  ZENIS CORE DB - DATABASE SCHEMA
--  Phiên bản: 2.0
--  Tương thích: MySQL 8.0
--  Dự án: fe-shopping-clothes (React + Vite)
--
--  Các bảng:
--    1. users           - Tài khoản người dùng (admin / vendor / customer)
--    2. categories      - Danh mục sản phẩm (Men's, Women's, Kids, ...)
--    3. brands          - Thương hiệu (logo slider trang chủ)
--    4. products        - Sản phẩm (Flash Sale, Trending, Best Selling, ...)
--    5. product_colors  - Màu sắc của từng sản phẩm
--    6. flash_sales     - Chương trình Flash Sale (có thời gian đếm ngược)
--    7. orders          - Đơn hàng
--    8. order_items     - Chi tiết đơn hàng
--    9. blogs           - Bài viết / tin tức
--   10. blog_categories - Danh mục blog (Make up, Skin care, ...)
--   11. blog_tags       - Tags của bài viết
--   12. blog_post_tags  - Bảng nối giữa blog & tags
-- ============================================================

CREATE DATABASE IF NOT EXISTS zenis_core_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE zenis_core_db;

-- Xóa bảng theo thứ tự ngược (tránh lỗi FK)
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS blog_post_tags;
DROP TABLE IF EXISTS blog_tags;
DROP TABLE IF EXISTS blog_categories;
DROP TABLE IF EXISTS blogs;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS flash_sales;
DROP TABLE IF EXISTS product_colors;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS brands;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================
-- 1. BẢNG USERS
-- Lưu: Admin, Vendor (nhà bán hàng), Customer (khách hàng)
-- UI tham chiếu: UserPage.jsx, trang đăng ký / đăng nhập
-- ============================================================
CREATE TABLE users (
    id          INT UNSIGNED    AUTO_INCREMENT PRIMARY KEY,
    full_name   VARCHAR(100)    NOT NULL,
    email       VARCHAR(150)    UNIQUE NOT NULL,
    password    VARCHAR(255)    NOT NULL COMMENT 'BCrypt hash',
    phone       VARCHAR(20)     NULL,
    role        ENUM('admin', 'vendor', 'customer') NOT NULL DEFAULT 'customer',
    -- Chỉ dùng khi role = 'vendor'
    store_name  VARCHAR(150)    NULL,
    avatar_url  VARCHAR(255)    NULL,
    address     TEXT            NULL,
    is_active   TINYINT(1)      NOT NULL DEFAULT 1,
    created_at  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_users_email  (email),
    INDEX idx_users_role   (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Tài khoản hệ thống';


-- ============================================================
-- 2. BẢNG CATEGORIES
-- Danh mục sản phẩm hiển thị trên trang Category.jsx
-- Bao gồm: Men\'s Fashion, Women\'s Fashion, Kids Fashion,
--           Beauty & Health, Jewelry, Sports Wear, Electronics
-- ============================================================
CREATE TABLE categories (
    id          INT UNSIGNED    AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100)    NOT NULL,
    slug        VARCHAR(100)    UNIQUE NOT NULL COMMENT 'URL thân thiện, vd: mens-fashion',
    image_url   VARCHAR(255)    NULL COMMENT 'Ảnh icon danh mục hiển thị trong Category.jsx',
    sort_order  INT UNSIGNED    NOT NULL DEFAULT 0,
    is_active   TINYINT(1)      NOT NULL DEFAULT 1,

    INDEX idx_categories_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Danh mục sản phẩm';


-- ============================================================
-- 3. BẢNG BRANDS
-- Thương hiệu — hiển thị trong Brand.jsx và slider Brands.jsx
-- brand1.png … brand10.png
-- ============================================================
CREATE TABLE brands (
    id          INT UNSIGNED    AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100)    NOT NULL,
    logo_url    VARCHAR(255)    NULL COMMENT 'Đường dẫn logo, vd: /assets/images/brand1.png',
    website_url VARCHAR(255)    NULL,
    is_active   TINYINT(1)      NOT NULL DEFAULT 1,

    INDEX idx_brands_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Thương hiệu / đối tác';


-- ============================================================
-- 4. BẢNG PRODUCTS
-- Sản phẩm chính — dùng cho tất cả section:
--   FlashSale.jsx, TrendingProducts.jsx, BestSelling.jsx,
--   FavouriteProducts.jsx, SpecialProducts.jsx, NewArrival.jsx
--
-- Các trường quan trọng lấy từ ProductCard.jsx:
--   name, salePrice, originalPrice, discountPercent,
--   isNew, reviewsCount, image, colors (→ product_colors)
-- ============================================================
CREATE TABLE products (
    id               INT UNSIGNED    AUTO_INCREMENT PRIMARY KEY,
    vendor_id        INT UNSIGNED    NOT NULL     COMMENT 'FK → users (role=vendor)',
    category_id      INT UNSIGNED    NOT NULL     COMMENT 'FK → categories',
    brand_id         INT UNSIGNED    NULL         COMMENT 'FK → brands',

    name             VARCHAR(200)    NOT NULL,
    slug             VARCHAR(200)    UNIQUE NOT NULL,
    description      TEXT            NULL,
    image_url        VARCHAR(255)    NULL         COMMENT 'Ảnh chính, vd: /assets/images/product_1.png',

    sale_price       DECIMAL(12,2)   NOT NULL     COMMENT 'Giá bán hiện tại (salePrice trong UI)',
    original_price   DECIMAL(12,2)   NULL         COMMENT 'Giá gốc trước giảm (originalPrice)',
    discount_percent TINYINT UNSIGNED NULL        COMMENT 'Phần trăm giảm giá (discountPercent 0–100)',

    stock            INT UNSIGNED    NOT NULL DEFAULT 0,
    rating           DECIMAL(2,1)    NOT NULL DEFAULT 5.0 COMMENT 'Điểm đánh giá trung bình',
    reviews_count    INT UNSIGNED    NOT NULL DEFAULT 0   COMMENT 'reviewsCount trong ProductCard',

    is_new           TINYINT(1)      NOT NULL DEFAULT 0  COMMENT 'Nhãn "new" trong ProductCard',
    is_active        TINYINT(1)      NOT NULL DEFAULT 1,

    created_at       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY fk_product_vendor   (vendor_id)   REFERENCES users(id)       ON DELETE RESTRICT,
    FOREIGN KEY fk_product_category (category_id) REFERENCES categories(id)  ON DELETE RESTRICT,
    FOREIGN KEY fk_product_brand    (brand_id)    REFERENCES brands(id)      ON DELETE SET NULL,

    INDEX idx_products_slug       (slug),
    INDEX idx_products_vendor     (vendor_id),
    INDEX idx_products_category   (category_id),
    INDEX idx_products_sale_price (sale_price)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Sản phẩm thời trang';


-- ============================================================
-- 5. BẢNG PRODUCT_COLORS
-- Màu sắc lựa chọn của sản phẩm — hiển thị ul.color trong ProductCard
-- Ví dụ: ["#DB4437", "#638C34", "#1C58F2", "#ffa500"]
-- ============================================================
CREATE TABLE product_colors (
    id          INT UNSIGNED    AUTO_INCREMENT PRIMARY KEY,
    product_id  INT UNSIGNED    NOT NULL,
    hex_code    VARCHAR(10)     NOT NULL COMMENT 'Mã màu HEX, vd: #DB4437',
    color_name  VARCHAR(50)     NULL     COMMENT 'Tên màu tùy chọn, vd: Red',
    sort_order  TINYINT UNSIGNED NOT NULL DEFAULT 0,

    FOREIGN KEY fk_color_product (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_colors_product (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Màu sắc của sản phẩm';


-- ============================================================
-- 6. BẢNG FLASH_SALES
-- Chương trình Flash Sale có thời gian đếm ngược — FlashSale.jsx
-- Một sản phẩm có thể xuất hiện trong nhiều đợt flash sale khác nhau
-- ============================================================
CREATE TABLE flash_sales (
    id          INT UNSIGNED    AUTO_INCREMENT PRIMARY KEY,
    product_id  INT UNSIGNED    NOT NULL,
    sale_price  DECIMAL(12,2)   NOT NULL COMMENT 'Giá ưu đãi trong kỳ flash sale',
    start_at    DATETIME        NOT NULL COMMENT 'Thời điểm bắt đầu (đếm ngược từ đây)',
    end_at      DATETIME        NOT NULL COMMENT 'Thời điểm kết thúc',
    is_active   TINYINT(1)      NOT NULL DEFAULT 1,

    FOREIGN KEY fk_flash_product (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_flash_product (product_id),
    INDEX idx_flash_time    (start_at, end_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Đợt Flash Sale';


-- ============================================================
-- 7. BẢNG ORDERS
-- Đơn hàng của khách — liên kết tới customer trong users
-- ============================================================
CREATE TABLE orders (
    id               INT UNSIGNED    AUTO_INCREMENT PRIMARY KEY,
    customer_id      INT UNSIGNED    NOT NULL,
    order_number     VARCHAR(50)     UNIQUE NOT NULL COMMENT 'Mã đơn hàng hiển thị, vd: ORD-20250424-001',
    total_amount     DECIMAL(12,2)   NOT NULL,
    status           ENUM('pending','processing','shipped','delivered','cancelled')
                                     NOT NULL DEFAULT 'pending',
    shipping_address TEXT            NOT NULL,
    note             TEXT            NULL,
    created_at       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY fk_order_customer (customer_id) REFERENCES users(id) ON DELETE RESTRICT,
    INDEX idx_orders_customer (customer_id),
    INDEX idx_orders_status   (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Đơn hàng';


-- ============================================================
-- 8. BẢNG ORDER_ITEMS
-- Chi tiết từng dòng sản phẩm trong đơn hàng
-- ============================================================
CREATE TABLE order_items (
    id          INT UNSIGNED    AUTO_INCREMENT PRIMARY KEY,
    order_id    INT UNSIGNED    NOT NULL,
    product_id  INT UNSIGNED    NOT NULL,
    quantity    INT UNSIGNED    NOT NULL DEFAULT 1,
    unit_price  DECIMAL(12,2)   NOT NULL COMMENT 'Giá tại thời điểm đặt hàng',
    color       VARCHAR(10)     NULL     COMMENT 'Màu đã chọn (hex)',

    FOREIGN KEY fk_item_order   (order_id)   REFERENCES orders(id)   ON DELETE CASCADE,
    FOREIGN KEY fk_item_product (product_id) REFERENCES products(id) ON DELETE RESTRICT,
    INDEX idx_items_order   (order_id),
    INDEX idx_items_product (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Chi tiết đơn hàng';


-- ============================================================
-- 9. BẢNG BLOG_CATEGORIES
-- Danh mục sidebar bài viết — Blog.jsx: Make up, Skin care,
-- Fashion and beauty, Cosmetics, Body care
-- ============================================================
CREATE TABLE blog_categories (
    id          INT UNSIGNED    AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100)    NOT NULL,
    slug        VARCHAR(100)    UNIQUE NOT NULL,
    post_count  INT UNSIGNED    NOT NULL DEFAULT 0 COMMENT 'Cache số bài trong danh mục',

    INDEX idx_blog_cat_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Danh mục bài viết blog';


-- ============================================================
-- 10. BẢNG BLOGS
-- Bài viết tin tức — Blog.jsx, Blogs.jsx (home)
-- Các trường: author, date, title, comments, image, link
-- ============================================================
CREATE TABLE blogs (
    id              INT UNSIGNED    AUTO_INCREMENT PRIMARY KEY,
    blog_category_id INT UNSIGNED   NULL,
    author_id       INT UNSIGNED    NULL COMMENT 'FK → users (nullable nếu tác giả ngoài)',
    author_name     VARCHAR(100)    NOT NULL COMMENT 'Tên hiển thị, vd: Jhon Deo',

    title           VARCHAR(300)    NOT NULL,
    slug            VARCHAR(300)    UNIQUE NOT NULL,
    content         LONGTEXT        NULL,
    image_url       VARCHAR(255)    NULL COMMENT '/assets/images/blog_img_1.png',
    excerpt         TEXT            NULL COMMENT 'Tóm tắt ngắn',

    comments_count  INT UNSIGNED    NOT NULL DEFAULT 0 COMMENT 'Cache số bình luận',
    is_popular      TINYINT(1)      NOT NULL DEFAULT 0 COMMENT 'Bài viết phổ biến (sidebar)',
    is_published    TINYINT(1)      NOT NULL DEFAULT 1,

    published_at    DATETIME        NULL COMMENT 'Ngày đăng hiển thị trên UI, vd: 24 Apr 2025',
    created_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY fk_blog_category (blog_category_id) REFERENCES blog_categories(id) ON DELETE SET NULL,
    FOREIGN KEY fk_blog_author   (author_id)        REFERENCES users(id)           ON DELETE SET NULL,

    INDEX idx_blogs_slug      (slug),
    INDEX idx_blogs_published (published_at),
    INDEX idx_blogs_popular   (is_popular)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Bài viết blog / tin tức';


-- ============================================================
-- 11. BẢNG BLOG_TAGS
-- Tags bài viết — Blog.jsx sidebar:
-- Cleansing, Make up, eye cream, nail, shampoo, coffee bean,
-- healthy, skin care, Cosmetics
-- ============================================================
CREATE TABLE blog_tags (
    id      INT UNSIGNED    AUTO_INCREMENT PRIMARY KEY,
    name    VARCHAR(100)    NOT NULL,
    slug    VARCHAR(100)    UNIQUE NOT NULL,

    INDEX idx_tag_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Tags bài viết';


-- ============================================================
-- 12. BẢNG BLOG_POST_TAGS (Bảng nối nhiều-nhiều Blog ↔ Tag)
-- ============================================================
CREATE TABLE blog_post_tags (
    blog_id INT UNSIGNED NOT NULL,
    tag_id  INT UNSIGNED NOT NULL,
    PRIMARY KEY (blog_id, tag_id),

    FOREIGN KEY fk_bpt_blog (blog_id) REFERENCES blogs(id)     ON DELETE CASCADE,
    FOREIGN KEY fk_bpt_tag  (tag_id)  REFERENCES blog_tags(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Nối bảng Blog ↔ Tags';


-- ============================================================
-- DỮ LIỆU MẪU (SEED DATA)
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- SEED: users
-- ─────────────────────────────────────────────────────────────
INSERT INTO users (full_name, email, password, phone, role, store_name, address) VALUES
    ('Quản Trị Zenis',         'admin@zenis.com',         '$2a$10$examplehash.ADMIN0000000000000000000', '0900000001', 'admin',    NULL,                    'Hà Nội, Việt Nam'),
    ('Thời Trang ABC',         'vendor@abc.com',           '$2a$10$examplehash.VENDOR000000000000000000', '0900000002', 'vendor',   'Shop Thời Trang ABC',   'TP. Hồ Chí Minh, Việt Nam'),
    ('Nguyễn Văn An',          'customer@gmail.com',       '$2a$10$examplehash.CUSTOMER0000000000000000', '0900000003', 'customer', NULL,                    'Đà Nẵng, Việt Nam'),
    ('Trần Minh Khoa',         'minh.khoa@blog.com',       '$2a$10$examplehash.AUTHOR10000000000000000',  '0900000004', 'customer', NULL,                    'Hà Nội, Việt Nam'),
    ('Lê Thị Hương',           'thi.huong@blog.com',       '$2a$10$examplehash.AUTHOR20000000000000000',  '0900000005', 'customer', NULL,                    'TP. Hồ Chí Minh, Việt Nam');

-- ─────────────────────────────────────────────────────────────
-- SEED: categories
-- (dựa theo Category.jsx: name + image)
-- ─────────────────────────────────────────────────────────────
INSERT INTO categories (name, slug, image_url, sort_order) VALUES
    ('Thời Trang Nam',   'thoi-trang-nam',   '/assets/images/category_img_2.png', 1),
    ('Thời Trang Nữ',   'thoi-trang-nu',    '/assets/images/category_img_3.png', 2),
    ('Thời Trang Trẻ Em','thoi-trang-tre-em','/assets/images/category_img_1.png', 3),
    ('Làm Đẹp & Sức Khoẻ','lam-dep-suc-khoe','/assets/images/category_img_4.png', 4),
    ('Trang Sức',        'trang-suc',        '/assets/images/category_img_5.png', 5),
    ('Đồ Thể Thao',     'do-the-thao',      '/assets/images/category_img_6.png', 6),
    ('Điện Tử',         'dien-tu',          '/assets/images/category_img_7.png', 7);

-- ─────────────────────────────────────────────────────────────
-- SEED: brands
-- (dựa theo Brands.jsx: brand1.png … brand10.png)
-- ─────────────────────────────────────────────────────────────
INSERT INTO brands (name, logo_url) VALUES
    ('Việt Phong',     '/assets/images/brand1.png'),
    ('Sài Gòn Style',  '/assets/images/brand2.png'),
    ('Hà Nội Mode',    '/assets/images/brand3.png'),
    ('Áo Dài Việt',    '/assets/images/brand4.png'),
    ('Phố Thị',        '/assets/images/brand5.png'),
    ('Mộc Nhiên',      '/assets/images/brand6.png'),
    ('Xuân Thu',       '/assets/images/brand7.png'),
    ('Nam Định Denim', '/assets/images/brand8.png'),
    ('Lotus Fashion',  '/assets/images/brand9.png'),
    ('Bắc Phong',      '/assets/images/brand10.png');

-- ─────────────────────────────────────────────────────────────
-- SEED: products
-- vendor_id=2 (Shop ABC Fashion), lấy từ FlashSale + TrendingProducts + BestSelling + FavouriteProducts
-- ─────────────────────────────────────────────────────────────
INSERT INTO products (vendor_id, category_id, brand_id, name, slug, sale_price, original_price, discount_percent, stock, rating, reviews_count, is_new, image_url, description) VALUES
    -- Sản phẩm Flash Sale (FlashSale.jsx)
    (2, 1, 1, 'Áo Hoodie Dài Tay Unisex',        'ao-hoodie-dai-tay-unisex',          40.00,  48.00, 75, 80,  4.5, 20, 1, '/assets/images/product_1.png',          'Áo hoodie form rộng, chất nỉ mềm mại, phù hợp cả nam và nữ'),
    (2, 1, 2, 'Áo Blazer Denim Nam Casual',        'ao-blazer-denim-nam-casual',         120.00, 99.00, 45, 35,  4.3, 17, 0, '/assets/images/product_24.png',         'Blazer denim phong cách casual, dễ phối đồ công sở lẫn dạo phố'),
    (2, 2, 3, 'Đầm Dự Tiệc Nữ Phong Cách Tây',   'dam-du-tiec-nu-phong-cach-tay',     50.00,  40.00, 15, 60,  4.6, 22, 0, '/assets/images/product_3.png',          'Đầm dự tiệc thiết kế thanh lịch, tôn dáng, phong cách phương Tây'),
    -- Sản phẩm Xu Hướng - Western (TrendingProducts.jsx)
    (2, 1, 1, 'Quần Short Denim Lửng Nam',        'quan-short-denim-lung-nam',          40.00,  NULL,  NULL, 90, 4.4, 20, 1, '/assets/images/product_7.png',          'Quần short denim lửng 2/4 hiện đại, thoáng mát cho mùa hè'),
    (2, 1, 2, 'Bộ Đôi Denim Nam Phong Cách',      'bo-doi-denim-nam-phong-cach',        47.00,  50.00, 45, 55,  4.5, 17, 0, '/assets/images/product_9.png',          'Combo áo + quần denim nam phong cách trẻ trung năng động'),
    -- Sản phẩm Xu Hướng - Tops
    (2, 2, 3, 'Đầm Dự Tiệc Bé Gái Phong Cách Tây','dam-du-tiec-be-gai-phong-cach-tay', 75.00,  69.00, 75, 40,  4.8, 58, 1, '/assets/images/product_11.png',         'Đầm dự tiệc cho bé gái kiểu dáng Tây phương xinh xắn, đáng yêu'),
    -- Sản phẩm Xu Hướng - Túi xách
    (2, 4, 4, 'Túi Da Dây Kéo Cổ Điển',           'tui-da-day-keo-co-dien',             120.00, NULL,  NULL, 25, 4.7, 45, 0, '/assets/images/product_12.png',         'Túi da cao cấp thiết kế cổ điển, dây kéo kim loại bền chắc'),
    -- Sản phẩm Xu Hướng - Giày
    (2, 1, 5, 'Giày Sneaker Nam Năng Động',        'giay-sneaker-nam-nang-dong',         85.00,  NULL,  NULL, 70, 4.4, 10, 0, '/assets/images/product_21.png',         'Giày sneaker nam thể thao, đế cao su chống trơn, đi bền'),
    -- Sản phẩm Bán Chạy (BestSelling.jsx)
    (2, 1, 1, 'Giày Thể Thao Casual Nam',         'giay-the-thao-casual-nam',           89.00, 112.00, NULL, 65, 4.6, 32, 0, '/assets/images/best_sell_pro_img_1.jpg','Giày thể thao casual nam phong cách, đế êm ái chống mỏi'),
    (2, 3, 2, 'Đầm Bé Gái Dự Tiệc Sinh Nhật',    'dam-be-gai-du-tiec-sinh-nhat',      75.00,  99.00, NULL, 45, 4.9, 28, 0, '/assets/images/best_sell_pro_img_2.jpg','Đầm bé gái thiết kế phồng xòe, thích hợp dự sinh nhật và tiệc tùng'),
    (2, 1, 3, 'Áo Khoác Mùa Đông Nam Casual',    'ao-khoac-mua-dong-nam-casual',      60.00,  65.00, NULL, 50, 4.5, 19, 0, '/assets/images/best_sell_pro_img_3.jpg','Áo khoác mùa đông casual chất liệu dày dặn giữ ấm tốt'),
    -- Sản phẩm Yêu Thích (FavouriteProducts.jsx)
    (2, 2, 2, 'Áo Tops Nữ Chất Liệu Cherry',     'ao-tops-nu-chat-lieu-cherry',        54.00,  NULL,  NULL, 88, 4.7, 98, 1, '/assets/images/product_22.png',         'Áo tops nữ chất liệu mềm mịn thoáng khí, màu sắc tươi sáng'),
    (2, 2, 3, 'Áo Khoác Denim Nữ Phong Cách',    'ao-khoac-denim-nu-phong-cach',      49.00,  NULL,  NULL, 76, 4.5, 44, 0, '/assets/images/product_24.png',         'Áo khoác denim nữ phong cách hiện đại, dễ phối cùng nhiều trang phục'),
    (2, 3, 1, 'Đầm Búp Bê Trẻ Em Xinh Xắn',     'dam-bup-be-tre-em-xinh-xan',        40.00,  48.00, 20, 55,  4.6, 20, 0, '/assets/images/product_23.png',         'Đầm búp bê cho bé gái vải mềm thoáng mát, an toàn cho làn da'),
    (2, 2, 4, 'Áo Khoác Tay Lỡ Nữ Cá Tính',     'ao-khoac-tay-lo-nu-ca-tinh',        60.00,  NULL,  NULL, 42, 4.8, 57, 0, '/assets/images/product_25.png',         'Áo khoác tay lỡ nữ phong cách cá tính, phù hợp đi chơi và làm việc');

-- ─────────────────────────────────────────────────────────────
-- SEED: product_colors
-- (dựa theo FlashSale.jsx: colors: ["#DB4437", "#638C34", "#1C58F2", "#ffa500"])
-- ─────────────────────────────────────────────────────────────
INSERT INTO product_colors (product_id, hex_code, color_name, sort_order) VALUES
    -- Sản phẩm 1: Áo Hoodie Dài Tay Unisex
    (1, '#DB4437', 'Đỏ',     1),
    (1, '#638C34', 'Xanh lá',2),
    (1, '#1C58F2', 'Xanh dương', 3),
    (1, '#ffa500', 'Cam',    4),
    -- Sản phẩm 2: Áo Blazer Denim Nam Casual
    (2, '#DB4437', 'Đỏ',     1),
    (2, '#638C34', 'Xanh lá',2),
    (2, '#ffa500', 'Cam',    3),
    -- Sản phẩm 3: Đầm Dự Tiệc Nữ Phong Cách Tây
    (3, '#638C34', 'Xanh lá',1),
    (3, '#1C58F2', 'Xanh dương', 2),
    (3, '#ffa500', 'Cam',    3);

-- ─────────────────────────────────────────────────────────────
-- SEED: flash_sales
-- ─────────────────────────────────────────────────────────────
INSERT INTO flash_sales (product_id, sale_price, start_at, end_at) VALUES
    (1, 40.00,  '2025-04-24 00:00:00', '2025-04-24 23:59:59'),
    (2, 120.00, '2025-04-24 00:00:00', '2025-04-24 23:59:59'),
    (3, 50.00,  '2025-04-24 00:00:00', '2025-04-24 23:59:59');

-- ─────────────────────────────────────────────────────────────
-- SEED: orders + order_items (1 đơn hàng mẫu)
-- ─────────────────────────────────────────────────────────────
INSERT INTO orders (customer_id, order_number, total_amount, status, shipping_address, note) VALUES
    (3, 'DH-20250424-001', 169.00, 'delivered', '123 Lê Lợi, Hải Châu, Đà Nẵng, Việt Nam', 'Giao giờ hành chính, gọi trước 30 phút'),
    (3, 'DH-20250425-002', 114.00, 'shipped',   '45 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh',  NULL),
    (3, 'DH-20250426-003',  47.00, 'pending',   '78 Hoàn Kiếm, Hà Nội, Việt Nam',           'Đóng gói cẩn thận, có đồ dễ vỡ');

INSERT INTO order_items (order_id, product_id, quantity, unit_price, color) VALUES
    -- Đơn hàng 1: Áo Hoodie + Giày Casual + Quần Short Denim
    (1, 1, 1, 40.00,  '#1C58F2'),
    (1, 9, 1, 89.00,  NULL),
    (1, 4, 1, 40.00,  NULL),
    -- Đơn hàng 2: Áo Blazer Denim + Giày Sneaker
    (2, 2, 1, 120.00, '#638C34'),
    (2, 8, 1,  85.00, NULL),
    -- Đơn hàng 3: Bộ Đôi Denim Nam
    (3, 5, 1,  47.00, '#DB4437');

-- ─────────────────────────────────────────────────────────────
-- SEED: blog_categories
-- (dựa theo Blog.jsx sidebar: Make up, Skin care, ...)
-- ─────────────────────────────────────────────────────────────
INSERT INTO blog_categories (name, slug, post_count) VALUES
    ('Trang Điểm',              'trang-diem',           7),
    ('Chăm Sóc Da',             'cham-soc-da',          14),
    ('Thời Trang & Làm Đẹp',   'thoi-trang-lam-dep',   34),
    ('Mỹ Phẩm',                 'my-pham',              5),
    ('Chăm Sóc Cơ Thể',        'cham-soc-co-the',      18);

-- ─────────────────────────────────────────────────────────────
-- SEED: blogs
-- (dựa theo Blog.jsx: id, author, date, title, comments, image)
-- author_id: Jhon Deo = 4, Adnan Alvi = 5, khác = NULL
-- ─────────────────────────────────────────────────────────────
INSERT INTO blogs (blog_category_id, author_id, author_name, title, slug, image_url, comments_count, is_popular, published_at) VALUES
    (3, 4, 'Trần Minh Khoa', 'Bí Quyết Chọn Ghế Sofa Phù Hợp Cho Không Gian Sống',              'bi-quyet-chon-ghe-sofa-phu-hop',           '/assets/images/blog_img_12.png', 15, 0, '2025-04-24 08:00:00'),
    (2, 5, 'Lê Thị Hương',   'Cách Tạo Kiểu Tóc Xoăn Bồng Bềnh Hoàn Hảo Tại Nhà',              'cach-tao-kieu-toc-xoan-bong-benh',         '/assets/images/blog_img_5.png',  15, 0, '2025-03-12 09:00:00'),
    (3, NULL,'Nguyễn Hải Sinh','Fast Fashion: Ngành Thời Trang Và Tác Động Đến Biến Đổi Khí Hậu',  'fast-fashion-tac-dong-bien-doi-khi-hau',   '/assets/images/blog_img_6.png',  42, 0, '2025-04-20 10:00:00'),
    (2, NULL,'Phạm Thanh Hà', 'Chọn Kem Nền Đúng Chuẩn Cho Từng Loại Da',                         'chon-kem-nen-dung-chuan-cho-tung-loai-da', '/assets/images/blog_img_3.png',  36, 0, '2025-03-07 11:00:00'),
    (3, 4, 'Trần Minh Khoa', 'Xu Hướng Thời Trang Xuân Hè 2025 Không Thể Bỏ Qua',               'xu-huong-thoi-trang-xuan-he-2025',         '/assets/images/blog_img_8.png',  15, 0, '2025-04-24 12:00:00'),
    (2, 5, 'Lê Thị Hương',   '10 Bước Skincare Buổi Tối Giúp Da Mịn Màng Sáng Bừng',            '10-buoc-skincare-buoi-toi',                '/assets/images/blog_img_9.png',  15, 0, '2025-03-12 13:00:00'),
    -- Bài viết phổ biến (sidebar)
    (1, NULL,'Quản Trị Viên','Top 5 Quán Cà Phê Ngon Nhất Tại Hà Nội Bạn Phải Thử Một Lần',      'top-5-quan-ca-phe-ngon-ha-noi',            '/assets/images/blog_img_1.png',  8,  1, '2024-03-23 00:00:00'),
    (3, NULL,'Quản Trị Viên','Căn Hộ Penthouse Hạng Sang Đang Mở Bán Tại TP. Hồ Chí Minh',       'can-ho-penthouse-hang-sang-hcm',           '/assets/images/blog_img_2.png',  5,  1, '2024-03-24 00:00:00'),
    (3, NULL,'Quản Trị Viên','Những Kỹ Năng Cần Có Để Thành Công Trong Ngành Thời Trang',         'ky-nang-thanh-cong-nganh-thoi-trang',      '/assets/images/blog_img_3.png',  3,  1, '2024-03-25 00:00:00');

-- ─────────────────────────────────────────────────────────────
-- SEED: blog_tags
-- (dựa theo Blog.jsx: tags mảng)
-- ─────────────────────────────────────────────────────────────
INSERT INTO blog_tags (name, slug) VALUES
    ('Tẩy Trang',       'tay-trang'),
    ('Trang Điểm',      'trang-diem'),
    ('Kem Mắt',         'kem-mat'),
    ('Làm Móng',        'lam-mong'),
    ('Dầu Gội',         'dau-goi'),
    ('Cà Phê',          'ca-phe'),
    ('Lối Sống Lành Mạnh','loi-song-lanh-manh'),
    ('Chăm Sóc Da',     'cham-soc-da'),
    ('Mỹ Phẩm',         'my-pham');

-- ─────────────────────────────────────────────────────────────
-- SEED: blog_post_tags (liên kết bài 2 → tags liên quan)
-- ─────────────────────────────────────────────────────────────
INSERT INTO blog_post_tags (blog_id, tag_id) VALUES
    (2, 1), (2, 3), (2, 5),   -- Tóc Xoăn → Tẩy Trang, Kem Mắt, Dầu Gội
    (4, 1), (4, 2), (4, 8),   -- Kem Nền → Tẩy Trang, Trang Điểm, Chăm Sóc Da
    (6, 8), (6, 9),           -- Skincare Buổi Tối → Chăm Sóc Da, Mỹ Phẩm
    (1, 7),                   -- Ghế Sofa → Lối Sống Lành Mạnh
    (7, 6), (7, 7);           -- Quán Cà Phê → Cà Phê, Lối Sống Lành Mạnh
