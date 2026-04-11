-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: mysql-39f457de-nphkhanh307204-8c3e.f.aivencloud.com    Database: defaultdb
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '22726bdf-1e1c-11f1-94b2-d2e4c1d3ba99:1-36,
95bb5859-1eec-11f1-a9f4-2e9f35b469b4:1-125';

--
-- Table structure for table `blogs`
--

DROP TABLE IF EXISTS `blogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blogs` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `blog_category_id` int unsigned DEFAULT NULL,
  `author_id` int unsigned DEFAULT NULL COMMENT 'FK → users (nullable nếu tác giả ngoài)',
  `author_name` varchar(100) NOT NULL COMMENT 'Tên hiển thị, vd: Jhon Deo',
  `title` varchar(300) NOT NULL,
  `slug` varchar(300) NOT NULL,
  `content` longtext,
  `image_url` varchar(255) DEFAULT NULL COMMENT '/assets/images/blog_img_1.png',
  `excerpt` text COMMENT 'Tóm tắt ngắn',
  `comments_count` int unsigned NOT NULL DEFAULT '0' COMMENT 'Cache số bình luận',
  `is_popular` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Bài viết phổ biến (sidebar)',
  `is_published` tinyint(1) NOT NULL DEFAULT '1',
  `published_at` datetime DEFAULT NULL COMMENT 'Ngày đăng hiển thị trên UI, vd: 24 Apr 2025',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `fk_blog_category` (`blog_category_id`),
  KEY `fk_blog_author` (`author_id`),
  KEY `idx_blogs_slug` (`slug`),
  KEY `idx_blogs_published` (`published_at`),
  KEY `idx_blogs_popular` (`is_popular`),
  CONSTRAINT `blogs_ibfk_1` FOREIGN KEY (`blog_category_id`) REFERENCES `blog_categories` (`id`) ON DELETE SET NULL,
  CONSTRAINT `blogs_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Bài viết blog / tin tức';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogs`
--

LOCK TABLES `blogs` WRITE;
/*!40000 ALTER TABLE `blogs` DISABLE KEYS */;
INSERT INTO `blogs` VALUES (1,3,4,'Trần Minh Khoa','Bí Quyết Chọn Ghế Sofa Phù Hợp Cho Không Gian Sống','bi-quyet-chon-ghe-sofa-phu-hop',NULL,'/assets/images/blog_img_12.png',NULL,15,0,1,'2025-04-24 08:00:00','2026-04-05 16:11:24','2026-04-05 16:11:24'),(2,2,5,'Lê Thị Hương','Cách Tạo Kiểu Tóc Xoăn Bồng Bềnh Hoàn Hảo Tại Nhà','cach-tao-kieu-toc-xoan-bong-benh',NULL,'/assets/images/blog_img_5.png',NULL,15,0,1,'2025-03-12 09:00:00','2026-04-05 16:11:24','2026-04-05 16:11:24'),(3,3,NULL,'Nguyễn Hải Sinh','Fast Fashion: Ngành Thời Trang Và Tác Động Đến Biến Đổi Khí Hậu','fast-fashion-tac-dong-bien-doi-khi-hau',NULL,'/assets/images/blog_img_6.png',NULL,42,0,1,'2025-04-20 10:00:00','2026-04-05 16:11:24','2026-04-05 16:11:24'),(4,2,NULL,'Phạm Thanh Hà','Chọn Kem Nền Đúng Chuẩn Cho Từng Loại Da','chon-kem-nen-dung-chuan-cho-tung-loai-da',NULL,'/assets/images/blog_img_3.png',NULL,36,0,1,'2025-03-07 11:00:00','2026-04-05 16:11:24','2026-04-05 16:11:24'),(5,3,4,'Trần Minh Khoa','Xu Hướng Thời Trang Xuân Hè 2025 Không Thể Bỏ Qua','xu-huong-thoi-trang-xuan-he-2025',NULL,'/assets/images/blog_img_8.png',NULL,15,0,1,'2025-04-24 12:00:00','2026-04-05 16:11:24','2026-04-05 16:11:24'),(6,2,5,'Lê Thị Hương','10 Bước Skincare Buổi Tối Giúp Da Mịn Màng Sáng Bừng','10-buoc-skincare-buoi-toi',NULL,'/assets/images/blog_img_9.png',NULL,15,0,1,'2025-03-12 13:00:00','2026-04-05 16:11:24','2026-04-05 16:11:24'),(7,1,NULL,'Quản Trị Viên','Top 5 Quán Cà Phê Ngon Nhất Tại Hà Nội Bạn Phải Thử Một Lần','top-5-quan-ca-phe-ngon-ha-noi',NULL,'/assets/images/blog_img_1.png',NULL,8,1,1,'2024-03-23 00:00:00','2026-04-05 16:11:24','2026-04-05 16:11:24'),(8,3,NULL,'Quản Trị Viên','Căn Hộ Penthouse Hạng Sang Đang Mở Bán Tại TP. Hồ Chí Minh','can-ho-penthouse-hang-sang-hcm',NULL,'/assets/images/blog_img_2.png',NULL,5,1,1,'2024-03-24 00:00:00','2026-04-05 16:11:24','2026-04-05 16:11:24'),(9,3,NULL,'Quản Trị Viên','Những Kỹ Năng Cần Có Để Thành Công Trong Ngành Thời Trang','ky-nang-thanh-cong-nganh-thoi-trang',NULL,'/assets/images/blog_img_3.png',NULL,3,1,1,'2024-03-25 00:00:00','2026-04-05 16:11:24','2026-04-05 16:11:24');
/*!40000 ALTER TABLE `blogs` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-11 21:31:56
