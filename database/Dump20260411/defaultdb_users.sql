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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL COMMENT 'BCrypt hash',
  `phone` varchar(20) DEFAULT NULL,
  `role` enum('admin','vendor','customer') NOT NULL DEFAULT 'customer',
  `store_name` varchar(150) DEFAULT NULL,
  `avatar_url` varchar(255) DEFAULT NULL,
  `address` text,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_users_email` (`email`),
  KEY `idx_users_role` (`role`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Tài khoản hệ thống';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Quản Trị Zenis','admin@zenis.com','$2a$10$examplehash.ADMIN0000000000000000000','0900000001','admin',NULL,NULL,'Hà Nội, Việt Nam',1,'2026-04-05 16:11:22','2026-04-05 16:11:22'),(2,'Thời Trang ABC','vendor@abc.com','$2a$10$examplehash.VENDOR000000000000000000','0900000002','vendor','Shop Thời Trang ABC',NULL,'TP. Hồ Chí Minh, Việt Nam',1,'2026-04-05 16:11:22','2026-04-05 16:11:22'),(3,'Nguyễn Văn An','customer@gmail.com','$2a$10$examplehash.CUSTOMER0000000000000000','0900000003','customer',NULL,NULL,'Đà Nẵng, Việt Nam',1,'2026-04-05 16:11:22','2026-04-05 16:11:22'),(4,'Trần Minh Khoa','minh.khoa@blog.com','$2a$10$examplehash.AUTHOR10000000000000000','0900000004','customer',NULL,NULL,'Hà Nội, Việt Nam',1,'2026-04-05 16:11:22','2026-04-05 16:11:22'),(5,'Lê Thị Hương','thi.huong@blog.com','$2a$10$examplehash.AUTHOR20000000000000000','0900000005','customer',NULL,NULL,'TP. Hồ Chí Minh, Việt Nam',1,'2026-04-05 16:11:22','2026-04-05 16:11:22'),(7,'khanh','khanh@gmail.com','$2a$10$/xZL44Hs6TVCFzaoVQMdi.jx5Z5vr/ZS.FNikFK3ELV/l.WIZCg7W','0123456789','customer',NULL,NULL,NULL,1,'2026-04-09 07:11:18','2026-04-09 07:11:18');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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

-- Dump completed on 2026-04-11 21:31:42
