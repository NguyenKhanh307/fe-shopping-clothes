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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `vendor_id` int unsigned NOT NULL COMMENT 'FK → users (role=vendor)',
  `category_id` int unsigned NOT NULL COMMENT 'FK → categories',
  `brand_id` int unsigned DEFAULT NULL COMMENT 'FK → brands',
  `name` varchar(200) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `description` text,
  `image_url` varchar(255) DEFAULT NULL COMMENT 'Ảnh chính, vd: /assets/images/product_1.png',
  `sale_price` decimal(12,2) NOT NULL COMMENT 'Giá bán hiện tại (salePrice trong UI)',
  `original_price` decimal(12,2) DEFAULT NULL COMMENT 'Giá gốc trước giảm (originalPrice)',
  `discount_percent` tinyint unsigned DEFAULT NULL COMMENT 'Phần trăm giảm giá (discountPercent 0–100)',
  `stock` int unsigned NOT NULL DEFAULT '0',
  `rating` decimal(2,1) NOT NULL DEFAULT '5.0' COMMENT 'Điểm đánh giá trung bình',
  `reviews_count` int unsigned NOT NULL DEFAULT '0' COMMENT 'reviewsCount trong ProductCard',
  `is_new` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Nhãn "new" trong ProductCard',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `fk_product_brand` (`brand_id`),
  KEY `idx_products_slug` (`slug`),
  KEY `idx_products_vendor` (`vendor_id`),
  KEY `idx_products_category` (`category_id`),
  KEY `idx_products_sale_price` (`sale_price`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`vendor_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `products_ibfk_3` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Sản phẩm thời trang';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,2,1,1,'Áo Hoodie Dài Tay Unisex','ao-hoodie-dai-tay-unisex','Áo hoodie form rộng, chất nỉ mềm mại, phù hợp cả nam và nữ','/assets/images/product_1.png',40.00,48.00,75,80,4.5,20,1,1,'2026-04-05 16:11:23','2026-04-05 16:11:23'),(2,2,1,2,'Áo Blazer Denim Nam Casual','ao-blazer-denim-nam-casual','Blazer denim phong cách casual, dễ phối đồ công sở lẫn dạo phố','/assets/images/product_24.png',120.00,99.00,45,35,4.3,17,0,1,'2026-04-05 16:11:23','2026-04-05 16:11:23'),(3,2,2,3,'Đầm Dự Tiệc Nữ Phong Cách Tây','dam-du-tiec-nu-phong-cach-tay','Đầm dự tiệc thiết kế thanh lịch, tôn dáng, phong cách phương Tây','/assets/images/product_3.png',50.00,40.00,15,60,4.6,22,0,1,'2026-04-05 16:11:23','2026-04-05 16:11:23'),(4,2,1,1,'Quần Short Denim Lửng Nam','quan-short-denim-lung-nam','Quần short denim lửng 2/4 hiện đại, thoáng mát cho mùa hè','/assets/images/product_7.png',40.00,NULL,NULL,90,4.4,20,1,1,'2026-04-05 16:11:23','2026-04-05 16:11:23'),(5,2,1,2,'Bộ Đôi Denim Nam Phong Cách','bo-doi-denim-nam-phong-cach','Combo áo + quần denim nam phong cách trẻ trung năng động','/assets/images/product_9.png',47.00,50.00,45,55,4.5,17,0,1,'2026-04-05 16:11:23','2026-04-05 16:11:23'),(6,2,2,3,'Đầm Dự Tiệc Bé Gái Phong Cách Tây','dam-du-tiec-be-gai-phong-cach-tay','Đầm dự tiệc cho bé gái kiểu dáng Tây phương xinh xắn, đáng yêu','/assets/images/product_11.png',75.00,69.00,75,40,4.8,58,1,1,'2026-04-05 16:11:23','2026-04-05 16:11:23'),(7,2,4,4,'Túi Da Dây Kéo Cổ Điển','tui-da-day-keo-co-dien','Túi da cao cấp thiết kế cổ điển, dây kéo kim loại bền chắc','/assets/images/product_12.png',120.00,NULL,NULL,25,4.7,45,0,1,'2026-04-05 16:11:23','2026-04-05 16:11:23'),(8,2,1,5,'Giày Sneaker Nam Năng Động','giay-sneaker-nam-nang-dong','Giày sneaker nam thể thao, đế cao su chống trơn, đi bền','/assets/images/product_21.png',85.00,NULL,NULL,70,4.4,10,0,1,'2026-04-05 16:11:23','2026-04-05 16:11:23'),(9,2,1,1,'Giày Thể Thao Casual Nam','giay-the-thao-casual-nam','Giày thể thao casual nam phong cách, đế êm ái chống mỏi','/assets/images/best_sell_pro_img_1.jpg',89.00,112.00,NULL,65,4.6,32,0,1,'2026-04-05 16:11:23','2026-04-05 16:11:23'),(10,2,3,2,'Đầm Bé Gái Dự Tiệc Sinh Nhật','dam-be-gai-du-tiec-sinh-nhat','Đầm bé gái thiết kế phồng xòe, thích hợp dự sinh nhật và tiệc tùng','/assets/images/best_sell_pro_img_2.jpg',75.00,99.00,NULL,45,4.9,28,0,1,'2026-04-05 16:11:23','2026-04-05 16:11:23'),(11,2,1,3,'Áo Khoác Mùa Đông Nam Casual','ao-khoac-mua-dong-nam-casual','Áo khoác mùa đông casual chất liệu dày dặn giữ ấm tốt','/assets/images/best_sell_pro_img_3.jpg',60.00,65.00,NULL,50,4.5,19,0,1,'2026-04-05 16:11:23','2026-04-05 16:11:23'),(12,2,2,2,'Áo Tops Nữ Chất Liệu Cherry','ao-tops-nu-chat-lieu-cherry','Áo tops nữ chất liệu mềm mịn thoáng khí, màu sắc tươi sáng','/assets/images/product_22.png',54.00,NULL,NULL,88,4.7,98,1,1,'2026-04-05 16:11:23','2026-04-05 16:11:23'),(13,2,2,3,'Áo Khoác Denim Nữ Phong Cách','ao-khoac-denim-nu-phong-cach','Áo khoác denim nữ phong cách hiện đại, dễ phối cùng nhiều trang phục','/assets/images/product_24.png',49.00,NULL,NULL,76,4.5,44,0,1,'2026-04-05 16:11:23','2026-04-05 16:11:23'),(14,2,3,1,'Đầm Búp Bê Trẻ Em Xinh Xắn','dam-bup-be-tre-em-xinh-xan','Đầm búp bê cho bé gái vải mềm thoáng mát, an toàn cho làn da','/assets/images/product_23.png',40.00,48.00,20,55,4.6,20,0,1,'2026-04-05 16:11:23','2026-04-05 16:11:23'),(15,2,2,4,'Áo Khoác Tay Lỡ Nữ Cá Tính','ao-khoac-tay-lo-nu-ca-tinh','Áo khoác tay lỡ nữ phong cách cá tính, phù hợp đi chơi và làm việc','/assets/images/product_25.png',60.00,NULL,NULL,42,4.8,57,0,1,'2026-04-05 16:11:23','2026-04-05 16:11:23'),(16,2,1,NULL,'Áo Hoodie Nam Phong Cách','ao-hoodie-nam-phong-cach-01','Chất liệu nỉ ngoại cao cấp, giữ ấm tốt.','/assets/images/product_100.png',250000.00,350000.00,28,100,5.0,0,1,1,'2026-04-09 16:05:24','2026-04-09 16:05:24'),(19,2,1,NULL,'Áo Hoodie Nam Phong Cách','ao-hoodie-nam-phong-cach-011','Chất liệu nỉ ngoại cao cấp, giữ ấm tốt.','/assets/images/product_100.png',250000.00,350000.00,28,100,5.0,0,1,1,'2026-04-09 16:16:31','2026-04-09 16:16:31'),(20,2,1,NULL,'Á Cách','ao-hoodie-nam-phong-cach-111','Chất liệu nỉ ngoại cao cấp, giữ ấm tốt.','/assets/images/product_100.png',250000.00,350000.00,28,100,5.0,0,1,1,'2026-04-09 16:19:48','2026-04-09 16:19:48');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
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

-- Dump completed on 2026-04-11 21:31:31
