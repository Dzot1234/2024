-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: concert_tickets
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `login` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `login` (`login`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'admin','admin1234','2025-01-26 11:59:02','2025-01-26 11:59:02');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `concerts`
--

DROP TABLE IF EXISTS `concerts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `concerts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `venue` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `concerts`
--

LOCK TABLES `concerts` WRITE;
/*!40000 ALTER TABLE `concerts` DISABLE KEYS */;
INSERT INTO `concerts` VALUES (1,'2024-12-20 00:00:00','╨Ь╨╛╤Б╨║╨▓╨░','╨С╨░╤А╨▓╨╕╤Е╨░ LUXURY VILLAGE','2025-01-19 22:20:13','2025-01-19 22:20:13'),(2,'2024-12-21 00:00:00','╨б╨░╨╜╨║╤В-╨Я╨╡╤В╨╡╤А╨▒╤Г╤А╨│','╨С╨░╤А╨▓╨╕╤Е╨░ LUXURY VILLAGE','2025-01-19 22:20:13','2025-01-19 22:20:13'),(3,'2024-12-22 00:00:00','╨Ъ╨░╨╗╨╕╨╜╨╕╨╜╨│╤А╨░╨┤','╨С╨░╤А╨▓╨╕╤Е╨░ LUXURY VILLAGE','2025-01-19 22:20:13','2025-01-19 22:20:13'),(4,'2024-12-23 00:00:00','╨Ь╨░╨│╨╜╨╕╤В╨╛╨│╨╛╤А╤Б╨║','╨С╨░╤А╨▓╨╕╤Е╨░ LUXURY VILLAGE','2025-01-19 22:20:13','2025-01-19 22:20:13'),(5,'2024-12-24 00:00:00','╨н╨╗╨╡╨║╤В╤А╨╛╤Б╤В╨░╨╗╤М','╨С╨░╤А╨▓╨╕╤Е╨░ LUXURY VILLAGE','2025-01-19 22:20:13','2025-01-19 22:20:13'),(6,'2024-12-25 00:00:00','╨б╨░╤А╨░╤В╨╛╨▓','╨С╨░╤А╨▓╨╕╤Е╨░ LUXURY VILLAGE','2025-01-19 22:20:13','2025-01-19 22:20:13');
/*!40000 ALTER TABLE `concerts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20250119151203-create-concert.js'),('20250119151215-create-ticket.js'),('20250126115514-create-admins-table.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tickets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `concertId` int DEFAULT NULL,
  `row` int DEFAULT NULL,
  `seat` int DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `buyerName` varchar(255) DEFAULT NULL,
  `buyerEmail` varchar(255) DEFAULT NULL,
  `buyerPhone` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickets`
--

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
INSERT INTO `tickets` VALUES (1,1,9,15,1500,'Dzot','VladBorch2017@mail.ru','+7 (953) 452-73-83','2025-01-21 11:20:16','2025-01-21 11:20:16'),(2,5,1,6,2500,'╨Р╤Е╨░╤Е╨░╤Е','VladBorch2017@mail.ru','+7 (953) 452-73-83','2025-01-21 11:21:02','2025-01-21 11:21:02'),(3,5,9,15,1500,'╨Р╤Е╨░╤Е╨░╤Е','VladBorch2017@mail.ru','+7 (953) 452-73-83','2025-01-21 11:21:45','2025-01-21 11:21:45'),(4,5,9,11,1500,'vlad borch','VladBorch2017@mail.ru','+7 (953) 452-73-83','2025-01-21 11:28:34','2025-01-21 11:28:34'),(5,1,5,15,2000,'Dzot Dz','VladBorch2017@mail.ru','+7 (953) 452-73-83','2025-01-21 11:49:22','2025-01-21 11:49:22'),(6,1,6,3,2000,'Da da','VladBorch2017@mail.ru','+7 (953) 452-73-83','2025-01-21 13:08:38','2025-01-21 13:08:38'),(7,6,2,6,2500,'╨Т╨╗╨░╨┤','vladborch2017@mail.ru','89534527383','2025-01-22 20:22:24','2025-01-26 11:07:29');
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-26 18:38:52
