-- MySQL dump 10.13  Distrib 8.0.12, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: res_net_cmms
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_account`
--

DROP TABLE IF EXISTS `_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `_account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_account`
--

LOCK TABLES `_account` WRITE;
/*!40000 ALTER TABLE `_account` DISABLE KEYS */;
INSERT INTO `_account` VALUES (2,'$2a$10$f2JHn4ZiC./FKGzYaP1EqOtglj0rMQxRQKhbZjHW3VrUV.TphCDlC'),(3,'$2a$10$QMj2aZDwc74BIMCFSRf6TurZpqwSqg3rp4HNOmTrlSc//gr1p4fBa'),(4,'$2a$10$Ed9FjGqdIVHM5wnmUHZRAuQeYa8K6NAWXA7hnDdULzH.W/qaG1x22');
/*!40000 ALTER TABLE `_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_account_role`
--

DROP TABLE IF EXISTS `_account_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `_account_role` (
  `accountID` int(11) NOT NULL,
  `roleID` int(11) NOT NULL,
  PRIMARY KEY (`accountID`,`roleID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_account_role`
--

LOCK TABLES `_account_role` WRITE;
/*!40000 ALTER TABLE `_account_role` DISABLE KEYS */;
INSERT INTO `_account_role` VALUES (2,4),(3,4),(4,2),(4,4);
/*!40000 ALTER TABLE `_account_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_coloption`
--

DROP TABLE IF EXISTS `_coloption`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `_coloption` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '#',
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '名字',
  `type` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '型態',
  `value` json DEFAULT NULL COMMENT '值',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='欄位控制';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_coloption`
--

LOCK TABLES `_coloption` WRITE;
/*!40000 ALTER TABLE `_coloption` DISABLE KEYS */;
INSERT INTO `_coloption` VALUES (0,'ID','TEXT','\"PK\"'),(1,'addr','TEXTAREA','\"NONE\"'),(2,'bedNum','TEXTAREA','\"NONE\"'),(3,'boarderID','TEXT','\"NONE\"'),(4,'cabinetCode','TEXT','\"PK\"'),(5,'cabinetID','TEXT','\"NONE\"'),(6,'date','DATETIME','\"NONE\"'),(7,'desc','TEXTAREA','\"NONE\"'),(8,'detail','TEXTAREA','\"NONE\"'),(9,'email','TEXT','\"EMAIL\"'),(10,'employeeID','TEXT','\"NONE\"'),(11,'IDcard','TEXT','\"IDCARD\"'),(12,'malfunctionID','TEXT','\"PK\"'),(13,'matter','SELECT','[{\"label\": \"個人床位—無法連線\", \"value\": \"個人床位—無法連線\"}, {\"label\": \"個人床位—網路不穩/網速遲緩\", \"value\": \"個人床位—網路不穩/網速遲緩\"}, {\"label\": \"個人床位—網路插孔故障\", \"value\": \"個人床位—網路插孔故障\"}, {\"label\": \"整間寢室—無法連線\", \"value\": \"整間寢室—無法連線\"}, {\"label\": \"網路插座\", \"value\": \"網路插座\"}, {\"label\": \"部分床位—無法連線\", \"value\": \"部分床位—無法連線\"}]'),(14,'name','TEXT','\"NONE\"'),(15,'result','SELECT','[{\"label\": \"親洽OK\", \"value\": \"親洽OK\"}, {\"label\": \"電洽OK\", \"value\": \"電洽OK\"}]'),(16,'specification','TEXTAREA','\"NONE\"'),(17,'status','CHECKBOX','\"正常:維修\"'),(18,'studentCode','TEXT','\"PK\"'),(19,'switchID','TEXT','\"NONE\"'),(20,'tel','TEXT','\"TEL\"'),(21,'time','TEXT','\"NONE\"'),(22,'vendorCode','TEXT','\"NONE\"'),(23,'vendorID','TEXT','\"NONE\"'),(24,'repair_date','DATETIME','\"NONE\"'),(26,'roomNum','TEXT','\"NONE\"'),(27,'switchCode','TEXT','\"NONE\"'),(28,'exc','TEXT','\"NONE\"');
/*!40000 ALTER TABLE `_coloption` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `_role`
--

DROP TABLE IF EXISTS `_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_role`
--

LOCK TABLES `_role` WRITE;
/*!40000 ALTER TABLE `_role` DISABLE KEYS */;
INSERT INTO `_role` VALUES (1,'DB_admin'),(2,'admin'),(3,'worker'),(4,'user');
/*!40000 ALTER TABLE `_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apply`
--

DROP TABLE IF EXISTS `apply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `apply` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '#',
  `employeeID` int(10) unsigned DEFAULT NULL COMMENT '員工編號',
  `switchID` int(10) unsigned DEFAULT NULL COMMENT '交換器編號',
  `vendorID` int(10) unsigned DEFAULT NULL COMMENT '廠商編號',
  `date` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '申報日期',
  `repair_date` datetime DEFAULT NULL COMMENT '送修日期',
  `desc` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '維護說明',
  PRIMARY KEY (`ID`),
  KEY `FK_switchID_apply_idx` (`switchID`),
  KEY `FK_employeeID_apply_idx` (`employeeID`),
  KEY `FK_vendorID_apply_idx` (`vendorID`),
  CONSTRAINT `FK_employeeID_apply` FOREIGN KEY (`employeeID`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_switchID_apply` FOREIGN KEY (`switchID`) REFERENCES `switch` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_vendorID_apply` FOREIGN KEY (`vendorID`) REFERENCES `vendor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='申報';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apply`
--

LOCK TABLES `apply` WRITE;
/*!40000 ALTER TABLE `apply` DISABLE KEYS */;
INSERT INTO `apply` VALUES (2,2,2,2,'2019-01-07 01:09:06','2019-01-07 09:09:06','3'),(3,2,2,2,'2019-01-07 09:15:10','2019-01-07 09:15:10','2'),(4,2,2,2,'2019-01-07 09:16:41','2019-01-07 09:16:41','2'),(5,2,2,2,'2019-01-07 09:17:11','2019-01-07 09:17:11','2'),(6,2,2,2,'2019-01-07 09:20:24','2019-01-07 09:20:24','2');
/*!40000 ALTER TABLE `apply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bed`
--

DROP TABLE IF EXISTS `bed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `bed` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '#',
  `malfunctionID` int(10) unsigned DEFAULT NULL COMMENT '單號',
  `bedNum` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '寢室床號',
  PRIMARY KEY (`ID`),
  KEY `FK_malfunctionID_bed_idx` (`malfunctionID`),
  CONSTRAINT `FK_malfunctionID_bed` FOREIGN KEY (`malfunctionID`) REFERENCES `malfunction` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='寢室';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bed`
--

LOCK TABLES `bed` WRITE;
/*!40000 ALTER TABLE `bed` DISABLE KEYS */;
INSERT INTO `bed` VALUES (1,1,'0'),(2,2,'1'),(3,3,'3'),(4,4,'4'),(5,5,'4'),(6,6,'3'),(7,7,'4'),(8,8,'4'),(9,9,'3'),(10,10,'4'),(11,11,'2'),(12,12,'2'),(13,13,'3'),(14,14,'3'),(15,15,'4'),(16,16,'1'),(17,17,'3'),(18,18,'3'),(19,19,'1'),(20,20,'2、3、4'),(21,21,'4'),(22,22,'3'),(23,23,'3'),(24,24,'1'),(25,25,'2'),(26,26,'1'),(27,27,'4'),(28,28,'2'),(29,29,'1'),(30,30,'0'),(31,31,'1'),(32,32,'2'),(33,33,'1'),(34,34,'2'),(35,35,'3'),(36,36,'2'),(37,37,'1'),(38,38,'2'),(39,39,'2'),(40,40,'0'),(41,41,'0'),(42,42,'1'),(43,43,'4'),(44,44,'1'),(45,45,'3'),(46,46,'0'),(47,47,'2'),(48,48,'2'),(49,49,'1'),(50,50,'1'),(51,51,'2'),(52,52,'2'),(53,53,'4'),(54,54,'3'),(55,55,'1'),(56,56,'3'),(57,57,'2、3'),(58,58,'1'),(59,59,'4'),(60,60,'1'),(61,61,'4'),(62,62,'1、2、3、4'),(63,63,'4'),(64,64,'4'),(65,65,'3'),(66,66,'3'),(67,67,'3'),(68,68,'2'),(69,69,'2'),(70,70,'1'),(71,71,'3'),(72,72,'1'),(73,73,'4'),(74,74,'4'),(75,75,'4'),(76,76,'1'),(77,77,'3'),(78,78,'2'),(79,79,'1'),(80,80,'2'),(81,81,'3'),(82,82,'2'),(83,83,'3'),(84,84,'2'),(85,85,'2'),(86,86,'1'),(87,87,'3'),(88,88,'1'),(89,89,'3'),(90,90,'4'),(91,91,'3'),(92,92,'2'),(93,93,'4'),(94,94,'3'),(95,95,'2'),(96,96,'1'),(97,97,'2'),(98,98,'2'),(99,99,'0'),(100,100,'2'),(101,101,'1'),(102,102,'0'),(103,103,'1'),(104,104,'4'),(105,105,'1'),(106,106,'3'),(107,107,'1'),(108,108,'3'),(109,109,'2'),(110,110,'2'),(111,111,'4'),(112,112,'3'),(113,113,'3'),(114,114,'4'),(115,115,'1'),(116,116,'1'),(117,117,'4'),(118,118,'1'),(119,119,'1、2、3'),(120,120,'4');
/*!40000 ALTER TABLE `bed` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boarder`
--

DROP TABLE IF EXISTS `boarder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `boarder` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '#',
  `studentCode` int(10) unsigned NOT NULL COMMENT '學號',
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '姓名',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `studentID_UNIQUE` (`studentCode`)
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='住宿生';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boarder`
--

LOCK TABLES `boarder` WRITE;
/*!40000 ALTER TABLE `boarder` DISABLE KEYS */;
INSERT INTO `boarder` VALUES (1,404412214,'郭英杰'),(2,2,'陳婉婷'),(3,3,'洪于晴'),(4,4,'林宥亘'),(5,5,'吳奕潔'),(6,6,'陳艾琪'),(7,7,'龔思穎'),(8,8,'張沁凌'),(9,9,'陳霈瑄'),(10,10,'劉阡儂'),(11,11,'張詠筑'),(12,12,'劉姿彣'),(13,13,'李宜融'),(14,14,'吳汶樺'),(15,15,'戴巧瑮'),(16,16,'陳沛潔'),(17,17,'許絲媛'),(18,18,'楊子嫺'),(19,19,'陳美彣'),(20,20,'陳美儒'),(21,21,'陳以彣'),(22,22,'陳文禕'),(23,23,'游佩璇'),(24,24,'胡翊瑜'),(25,25,'蔡青樺'),(26,26,'蔡旻臻'),(27,27,'林映辰'),(28,28,'吳至芳'),(29,29,'蔡依琳'),(30,30,'游佩璇'),(31,31,'王翎安'),(32,32,'陳雪芬'),(33,33,'王翎安'),(34,34,'王筱萍'),(35,35,'陳子琳'),(36,36,'許之瑜'),(37,37,'黃苑怡'),(38,38,'陳郁太'),(39,39,'廖語琪'),(40,40,'游佩璇'),(41,41,'紀欣妙'),(42,42,'王翎安'),(43,43,'顏莘曄'),(44,44,'王翎安'),(45,45,'沈芝佑'),(46,46,'張端心'),(47,47,'許之瑜'),(48,48,'陳卉軒'),(49,49,'羅韻'),(50,50,'葉宥鑫'),(51,51,'李佩穎'),(52,52,'谢依雯'),(53,53,'黃文萱'),(54,54,'沈德旻'),(55,55,'賴晏平'),(56,56,'徐琬婷'),(57,57,'劉瀞文'),(58,58,'黃文靜'),(59,59,'曾文琳'),(60,60,'于清睿'),(61,61,'顏莘曄'),(62,62,'彭楚晴'),(63,63,'楊芷芸'),(64,64,'謝靜雅'),(65,65,'許茵婷'),(66,66,'許茵婷'),(67,67,'葉子瑄'),(68,68,'魏羽芊'),(69,69,'鐘琳'),(70,70,'彭楚晴'),(71,71,'劉昱秀'),(72,72,'顏辰羽'),(73,73,'姚昀蓉'),(74,74,'王宇君'),(75,75,'黃律沄'),(76,76,'張簡德涵'),(77,77,'李宜融'),(78,78,'張詠筑'),(79,79,'侯宛伶'),(80,80,'翁瑋旋'),(81,81,'張君詠'),(82,82,'李奕萱'),(83,83,'吳佳穎'),(84,84,'陳禹彤'),(85,85,'詹雅晴'),(86,86,'郭宜蓁'),(87,87,'劉昱均'),(88,88,'黃意璇'),(89,89,'林妤潔'),(90,90,'黃薇'),(91,91,''),(92,92,'張庭慈'),(93,93,'黃薪妤'),(94,94,'張雅瑜'),(95,95,'姜芯芸'),(96,96,'鍾佳伶'),(97,97,'張洳嫣'),(98,98,'周佳瑩'),(99,99,'康如育'),(100,100,'林姸君'),(101,101,'賴晏平'),(102,102,'王婷'),(103,103,'陳妍均'),(104,104,'林映辰'),(105,105,'周宜潔'),(106,106,'林素嘉'),(107,107,'陳玟立'),(108,108,'黃芳湲'),(109,109,'徐莉芳'),(110,110,'謝宛庭'),(111,111,'謝欣辰'),(112,112,'黃雁怡'),(113,113,'吳佳穎'),(114,114,'賴菱伶'),(115,115,'黃文靜'),(116,116,'吳欣容'),(117,117,'許德萲'),(118,118,'張芳');
/*!40000 ALTER TABLE `boarder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cabinet`
--

DROP TABLE IF EXISTS `cabinet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cabinet` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '#',
  `cabinetCode` int(10) unsigned NOT NULL COMMENT '機櫃編號',
  `status` varchar(30) DEFAULT NULL COMMENT '狀態',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `cabinetID_UNIQUE` (`cabinetCode`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='機櫃';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cabinet`
--

LOCK TABLES `cabinet` WRITE;
/*!40000 ALTER TABLE `cabinet` DISABLE KEYS */;
INSERT INTO `cabinet` VALUES (1,1,'維修'),(2,2,'正常'),(3,3,'正常'),(4,4,'正常'),(5,5,'正常'),(6,6,'正常'),(7,7,'正常'),(8,8,'正常'),(9,9,'正常'),(10,10,'正常'),(11,11,'正常'),(12,12,'正常'),(13,13,'正常'),(14,14,'正常'),(15,15,'正常'),(16,16,'正常'),(17,17,'正常'),(18,18,'正常'),(19,19,'正常'),(20,20,'正常'),(21,21,'正常'),(22,22,'正常'),(23,23,'正常'),(24,24,'正常'),(25,25,'正常'),(26,26,'正常');
/*!40000 ALTER TABLE `cabinet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `employee` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '#',
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '姓名',
  `IDcard` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '身分證',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `IDcard_UNIQUE` (`IDcard`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='工作人員';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'郭英杰','H192809140'),(2,'陳黛瑄','A229244276'),(3,'陳姵融','F218844390'),(4,'陳思瑜','M207623424'),(5,'簡利珈','G254225052'),(6,'林杏樺','L242610455'),(7,'呂宜庭','M298945855'),(8,'駱憶欣','N289053498');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `malfunction`
--

DROP TABLE IF EXISTS `malfunction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `malfunction` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '#',
  `boarderID` int(10) unsigned DEFAULT NULL COMMENT '住宿生編號',
  `roomNum` varchar(30) DEFAULT NULL COMMENT '寢室編號',
  `date` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '報修日期',
  `matter` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '報修事項',
  `desc` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '狀況描述',
  PRIMARY KEY (`ID`),
  KEY `FK_boarderID_malfunction_idx` (`boarderID`),
  CONSTRAINT `FK_boarderID_malfunction` FOREIGN KEY (`boarderID`) REFERENCES `boarder` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='報修單';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `malfunction`
--

LOCK TABLES `malfunction` WRITE;
/*!40000 ALTER TABLE `malfunction` DISABLE KEYS */;
INSERT INTO `malfunction` VALUES (1,1,'6666','2019-01-04 07:48:32','個人床位—無法連線','無法連線'),(2,2,'2402','2018-08-23 21:45:00','個人床位—無法連線','電腦就算接了線，還是連不到網路。'),(3,3,'2615','2018-09-02 23:57:00','網路插座','插座爆掉，無法自行銜接修理'),(4,4,'3409','2018-09-03 18:53:00','整間寢室—無法連線','整間寢室用網路線接電腦都無法使用'),(5,5,'1610','2018-09-03 20:55:00','整間寢室—無法連線','插網路線但還是無法連線'),(6,6,'2607','2018-09-04 15:32:00','個人床位—無法連線','完全無法連線'),(7,7,'3620','2018-09-05 14:49:00','個人床位—無法連線','插下去無法連線，本身的電腦和網路線皆無問題'),(8,8,'3518','2018-09-05 18:04:00','個人床位—無法連線','無法連線'),(9,9,'3410','2018-09-05 20:19:00','整間寢室—無法連線','全寢室網路孔皆不能使用，電腦會顯示乙太網路纜線未正確插入或已經損毀'),(10,10,'3505','2018-09-06 20:17:00','個人床位—無法連線','使用網路線卻沒辦法連上網路'),(11,11,'3625','2018-09-06 21:47:00','個人床位—無法連線','電腦顯示沒有ip位置\n有開自動搜尋，也嘗試過宿舍網站的方法，我的筆電是win10系統。有可以直接連wifi的，有試過也是顯示無法連線'),(12,12,'2604','2018-09-07 15:14:00','個人床位—無法連線','已插好網路線 但仍無法使用'),(13,13,'3625','2018-09-07 16:23:00','個人床位—無法連線','無法更新ip位址'),(14,14,'2611','2018-09-08 12:07:00','整間寢室—無法連線','一開始連線正常，拔掉網路線重插後網路就無法使用了，已確認過網路線無異狀。'),(15,15,'3501','2018-09-09 10:14:00','整間寢室—無法連線','筆電插上網路線後連不到網路，整寢都是，問了3503寢也是這樣'),(16,16,'2605','2018-09-09 12:11:00','整間寢室—無法連線','整間寢室網路插孔皆無法連線使用網路，已確定網路線與USB網卡皆可正常使用。'),(17,17,'1606','2018-09-09 17:28:00','個人床位—無法連線','1606-3的網路無法使用'),(18,18,'2606','2018-09-09 22:56:00','個人床位—無法連線','已插上網路線但卻無法連線'),(19,19,'2216','2018-09-10 13:45:00','個人床位—無法連線','網路插孔無法連線'),(20,20,'1606','2018-09-10 14:52:00','部分床位—無法連線','插入網路線後無法連線上網（僅有一個床位連得上，其他三個都不行）'),(21,21,'2620','2018-09-10 15:21:00','個人床位—無法連線','已接網路線但無法連線'),(22,22,'2327','2018-09-10 19:42:00','個人床位—無法連線','有網路線但無法連線喔喔喔喔喔?已哭'),(23,23,'2624','2018-09-10 23:29:00','個人床位—無法連線','已經插入網路線，但始終無法連上網路'),(24,24,'3330','2018-09-11 13:40:00','整間寢室—無法連線','9/10晚上開始無法上網，出現無法辨識的網路。已自行用網路設定說明步驟仍無法上網，麻煩了謝謝。'),(25,25,'3333','2018-09-11 13:57:00','整間寢室—無法連線','寢室內網路無法連線，一直顯示無法辨識網路'),(26,26,'3326','2018-09-11 14:05:00','個人床位—無法連線','無法連線，不是電腦及網路線問題。'),(27,27,'3332','2018-09-11 18:30:00','整間寢室—無法連線','網路無法連線'),(28,28,'2624','2018-09-12 16:23:00','部分床位—無法連線','昨日晚間同寢的網路線插口有接受維修，維修後可使用網路，而我的部分則是正常。但今天卻都無法成功連上網路，不知是校園網路訊號問題還是插座問題。'),(29,29,'3130','2018-09-12 18:15:00','個人床位—無法連線','前天網路都可以連上，但是有時候不穩，到昨天開始完全無法連線，而且連網路線旁邊的分機電話都沒有通。'),(30,30,'2624','2018-09-12 21:06:00','整間寢室—無法連線','插了網路線之後，仍然無法連線'),(31,31,'2628','2018-09-13 19:15:00','整間寢室—無法連線','連不到網路 產生黃色驚嘆號'),(32,32,'3610','2018-09-16 21:06:00','個人床位—無法連線','無法辨識網路'),(33,33,'2628','2018-09-16 21:27:00','整間寢室—無法連線','連不到網路 顯示黃色驚嘆號'),(34,34,'3330','2018-09-17 00:06:00','個人床位—無法連線','沒辦法連上網路'),(35,35,'2307','2018-09-17 11:45:00','個人床位—網路插孔故障','筆電跟線都測試過是沒問題的，插了宿舍插孔顯示乙太網路已拔除網路線，重插重開機都沒用，放置一段時間有時候又突然連的上，重開機就又斷了。'),(36,36,'1416','2018-09-17 15:59:00','個人床位—無法連線','第一次插就沒辦法連線'),(37,37,'3426','2018-09-17 16:09:00','個人床位—無法連線','網絡異常，連線成功上不了網'),(38,38,'3426','2018-09-17 16:36:00','個人床位—無法連線','突然網路就斷了，網路線明明都一直接著，還是顯示未連線。'),(39,39,'3425','2018-09-17 16:48:00','整間寢室—無法連線','昨天晚上連線正常，今天開始不正常，連不到網路'),(40,40,'2624','2018-09-17 21:42:00','整間寢室—無法連線','插了網路線，但一直無法連上網路'),(41,41,'2628','2018-09-17 22:10:00','整間寢室—無法連線','整間寢室連不上網路'),(42,42,'2628','2018-09-17 22:25:00','整間寢室—無法連線','連不到忘網路 顯示黃色驚嘆號'),(43,43,'2628','2018-09-18 16:42:00','整間寢室—無法連線','整間寢室網路不能用好多天了，希望可以盡快幫我們處理，最近有報告要上傳，拜託！！'),(44,44,'2628','2018-09-18 16:43:00','整間寢室—無法連線','連不到網路 顯示黃色驚嘆號'),(45,45,'2628','2018-09-18 16:43:00','整間寢室—無法連線','寢室網路多天無法使用 希望可以盡快處理'),(46,46,'2613','2018-09-18 17:52:00','整間寢室—無法連線','連不上網路'),(47,47,'1416','2018-09-19 13:01:00','個人床位—無法連線','只有晚上(6.7點以後）才能連網路'),(48,48,'3514','2018-09-19 20:02:00','個人床位—無法連線','接網路線沒網路'),(49,49,'2422','2018-09-22 19:04:00','個人床位—網路不穩/網速遲緩','网路不稳定，网页无法打开'),(50,50,'3106','2018-09-24 20:35:00','個人床位—無法連線','我用我的網路線和室友的網路插頭可以連結我的電腦，但是我自己的網路插頭卻不可以。不是電腦和網路線和問題。'),(51,51,'3130','2018-09-25 12:10:00','個人床位—無法連線','連線不上網路'),(52,52,'3109','2018-09-25 13:50:00','整間寢室—無法連線','伺服器的问题'),(53,53,'3110','2018-09-25 19:57:00','部分床位—無法連線','有兩個床位網路無法連線'),(54,54,'3103','2018-09-25 20:43:00','整間寢室—無法連線','我們寢室完全沒有網路，換了兩條線跟接頭也沒連到網路TT'),(55,55,'2314','2018-09-25 20:53:00','個人床位—無法連線','插網路線連不到或/連wi-fi 3分鐘以內會斷掉'),(56,56,'3104','2018-09-25 21:24:00','部分床位—無法連線','插了網路線但無法連到網路'),(57,57,'3107','2018-09-25 21:50:00','部分床位—無法連線','床位的網路線不能用'),(58,58,'3102','2018-09-25 23:03:00','整間寢室—無法連線','無法上網'),(59,59,'3108','2018-09-26 12:51:00','整間寢室—無法連線','整間寢室都無法用網路線連上網路'),(60,60,'2210','2018-09-27 21:00:00','整間寢室—無法連線','整間寢室的網路都無法使用'),(61,61,'2628','2018-09-27 23:16:00','個人床位—無法連線','網路本身好像沒有問題，自己買到網路線跟轉接頭也都可以用，可是不知道為什麼，電腦都無法連線'),(62,62,'2219','2018-09-28 12:04:00','整間寢室—無法連線','9/27 晚上突然斷線 再也無法連上網路 導致我們線上作業做到一半斷線 只好重新做 '),(63,63,'2219','2018-09-28 12:07:00','整間寢室—無法連線','昨天晚上突然斷線後就再也連不上 導致我們線上作業報告重新做 麻煩儘快處理謝謝'),(64,64,'2206','2018-09-28 13:34:00','整間寢室—無法連線','無法連線'),(65,65,'2211','2018-09-28 16:47:00','部分床位—無法連線','連網路線沒有網路'),(66,66,'2211','2018-09-28 16:47:00','部分床位—無法連線','連網路線沒有網路'),(67,67,'2214','2018-09-28 17:44:00','整間寢室—無法連線','網路孔無法連線'),(68,68,'2215','2018-09-28 19:27:00','整間寢室—無法連線','整間無法連線'),(69,69,'2209','2018-09-30 13:40:00','整間寢室—無法連線','網路一直連不上，之前都可以用，現在突然不行'),(70,70,'2219','2018-10-01 01:22:00','個人床位—無法連線','宿網於星期五斷線後，9/29有人來協助修理之後，我的筆電仍然連不上宿網，重設IP也無法連上。\n\n幫忙修理一半的時候，Wi-Fi欄位都消失了，本來可以連至wifi，不知道是否要下載Wi-Fi驅動程式。\n（筆電為win8, 試圖更新win8.1也無法成功）\n\n希望可以幫忙協助看看有什麼問題，不好意思麻煩了?'),(71,71,'2205','2018-10-01 12:16:00','部分床位—無法連線','有查網路線卻無連線可用'),(72,72,'3628','2018-10-02 16:20:00','整間寢室—無法連線','3628-1：狀態顯示已連線。但下方有這一排字：「AX88772 」有自行分配的 IP 位址，將無法連接 Internet。\n其他：網路沒有有效的IP設定'),(73,73,'3625','2018-10-02 18:03:00','整間寢室—無法連線','無法連線 沒有IP位置'),(74,74,'3324','2018-10-03 10:22:00','個人床位—無法連線','原本的網路線連不上，買了新的還是不行，但是插其他床位的網路孔就可以'),(75,75,'1312','2018-10-09 23:39:00','個人床位—無法連線','電腦無法偵測到網路'),(76,76,'1213','2018-10-12 16:01:00','整間寢室—無法連線','無法接上網路 非個人線材問題'),(77,77,'3625','2018-10-13 17:13:00','個人床位—網路不穩/網速遲緩','無法更新ip位址'),(78,78,'3625','2018-10-15 10:56:00','個人床位—無法連線','無法連線'),(79,79,'3316','2018-10-20 09:41:00','部分床位—無法連線','乙太網路無法連線'),(80,80,'3315','2018-10-20 11:47:00','個人床位—無法連線','不行上網'),(81,81,'3312','2018-10-20 21:28:00','個人床位—無法連線','插入網路線後無法連到網路'),(82,82,'2325','2018-10-22 09:35:00','個人床位—無法連線','手機連不上電腦開的熱點，但電腦是可連線的\n已試過手機電腦重開機、更改網路名稱及密碼等，也重新插過網路線，依舊手機連不上電腦WiFi'),(83,83,'3317','2018-10-22 12:55:00','整間寢室—無法連線','就是無法連線，不知道哪裡出了問題'),(84,84,'3202','2018-10-24 18:08:00','整間寢室—無法連線','已經拔過所有網路線也重新啟動電腦還是無法連線另外有詢問隔壁房結果也是一樣無法連線'),(85,85,'3205','2018-10-24 18:30:00','個人床位—無法連線','連不上網路 換過網路線也不行'),(86,86,'3204','2018-10-24 18:54:00','整間寢室—無法連線','連不上網路'),(87,87,'3207','2018-10-24 19:16:00','部分床位—無法連線','除了3207-4之外，另外3個床位都無法連網路'),(88,88,'1624','2018-10-25 17:36:00','整間寢室—無法連線','原本電腦接上網路線後可以使用網路\n目前接上網路線後沒有網路連接'),(89,89,'1623','2018-10-26 21:13:00','部分床位—無法連線','網路線插入主機沒有亮燈 確定網路線沒有損壞'),(90,90,'1623','2018-10-29 18:32:00','部分床位—無法連線','插了網路線但是沒網路，同一間房有2個都是這樣'),(91,91,'2306','2018-10-31 20:10:00','個人床位—無法連線','連結網路線還是連不上 '),(92,92,'3401','2018-11-02 17:52:00','整間寢室—無法連線','不能上網'),(93,93,'3403','2018-11-02 17:57:00','整間寢室—無法連線','整寢都接不到網路'),(94,94,'3405','2018-11-04 17:41:00','整間寢室—無法連線','從10/31開始都無法連線'),(95,95,'3402','2018-11-04 22:22:00','整間寢室—無法連線','11/2前一天晚上突然斷一下，\n隔天就整個斷掉斷到11/4還沒好'),(96,96,'3501','2018-11-05 18:10:00','整間寢室—無法連線','無法連接網路'),(97,97,'3403','2018-11-07 07:56:00','整間寢室—無法連線','插網路線沒沒網路，整間寢室'),(98,98,'2214','2018-11-07 21:42:00','個人床位—無法連線','無法連線'),(99,99,'2522','2018-11-13 17:03:00','整間寢室—無法連線','沒有網路'),(100,100,'2523','2018-11-13 20:45:00','整間寢室—無法連線','無法連線'),(101,101,'2314','2018-11-18 11:55:00','個人床位—無法連線','連不到網路'),(102,102,'3302','2018-11-26 22:36:00','整間寢室—無法連線','網路無法辨識'),(103,103,'3322','2018-11-26 22:54:00','整間寢室—無法連線','上網到一半 突然顯示無法連線'),(104,104,'3332','2018-11-26 23:49:00','整間寢室—無法連線','顯示沒有網際網路'),(105,105,'3310','2018-11-27 09:38:00','個人床位—無法連線','網路無法連線'),(106,106,'3309','2018-11-27 11:59:00','整間寢室—無法連線','沒辦法連線'),(107,107,'3333','2018-11-27 12:29:00','整間寢室—無法連線','也是突然就無法連線，這種情況以前也出現過'),(108,108,'3328','2018-11-27 12:50:00','個人床位—無法連線','使用網路時突然斷線,隔天還是斷線中'),(109,109,'3321','2018-11-27 13:23:00','整間寢室—無法連線','昨天晚上用到一半就不能連了'),(110,110,'3327','2018-11-27 14:16:00','個人床位—無法連線','顯示連不到乙太網路'),(111,111,'3315','2018-11-27 16:11:00','個人床位—無法連線','無法連線'),(112,112,'3329','2018-11-27 17:56:00','個人床位—無法連線','插了電腦的網路孔 可是都顯示“無法辨識的網路” 有確認過插座有有插穩'),(113,113,'3317','2018-11-27 20:30:00','整間寢室—無法連線','我們房間都的人都無法連上網路'),(114,114,'3106','2018-11-27 20:44:00','個人床位—網路不穩/網速遲緩','房間其他床位網路也不穩 常常一下有網路 一下沒網路'),(115,115,'3102','2018-11-27 20:48:00','整間寢室—無法連線','網路沒法使用'),(116,116,'3304','2018-11-27 22:11:00','整間寢室—無法連線','大約在26日晚上9點後開始連不到網路'),(117,117,'3328','2018-11-28 09:13:00','整間寢室—無法連線','前天開始房間的網路都連不上去，上網看學校Dcard發現三館三樓也有別的人有同樣情形發生~'),(118,118,'3202','2018-12-03 13:40:00','個人床位—網路不穩/網速遲緩','幾乎沒有網路，有也是大概1分鐘又沒了，寢室其他人都沒問題'),(119,1,'6666','2019-01-07 04:09:09','網路插座','壞掉'),(120,1,'6666','2019-01-07 04:12:19','部分床位—無法連線','無法連線');
/*!40000 ALTER TABLE `malfunction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `processing`
--

DROP TABLE IF EXISTS `processing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `processing` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '#',
  `malfunctionID` int(10) unsigned NOT NULL COMMENT '單號',
  `employeeID` int(10) unsigned DEFAULT NULL COMMENT '員工編號',
  `date` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '維修日期',
  `result` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '維修結果',
  `detail` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '處理內容',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `malfunctionID_UNIQUE` (`malfunctionID`),
  KEY `FK_employeeID_processing_idx` (`employeeID`),
  KEY `FK_malfunctionID_processing_idx` (`ID`),
  KEY `FK_malfunctionID_processing_idx1` (`malfunctionID`),
  CONSTRAINT `FK_employeeID_processing` FOREIGN KEY (`employeeID`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_malfunctionID_processing` FOREIGN KEY (`malfunctionID`) REFERENCES `malfunction` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='維修單';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `processing`
--

LOCK TABLES `processing` WRITE;
/*!40000 ALTER TABLE `processing` DISABLE KEYS */;
INSERT INTO `processing` VALUES (1,1,1,'2019-01-04 08:22:55','親洽OK','可以正常使用'),(2,2,7,'2018-09-11 00:00:00','親洽OK',''),(3,3,4,'2018-10-03 00:00:00','親洽OK','插座壞掉（整個爆開），工程師維修過後可正常使用'),(4,4,4,'2018-09-10 00:00:00','親洽OK','switch重啟後仍不閃燈，經工程師維修後可正常使用。'),(5,5,4,'2018-09-10 00:00:00','親洽OK','網路線接觸不良。'),(6,6,8,'2018-09-09 00:00:00','親洽OK','switch重啟後可正常使用。'),(7,7,8,'2018-09-09 00:00:00','親洽OK','switch重啟後可正常使用。'),(8,8,8,'2018-09-09 00:00:00','親洽OK','switch重啟後可正常使用。'),(9,9,4,'2018-09-10 00:00:00','親洽OK','switch重啟後仍不閃燈，經工程師維修後可正常使用。'),(10,10,4,'2018-09-10 00:00:00','親洽OK','switch重啟後仍不閃燈，經工程師維修後可正常使用。'),(11,11,8,'2018-09-09 00:00:00','親洽OK','switch重啟後可正常使用。'),(12,12,4,'2018-09-10 00:00:00','親洽OK','網路共用中心→乙太網路→內容→IPV4→改為自動取得ip即可'),(13,13,8,'2018-09-09 00:00:00','親洽OK','switch重啟後可正常使用。'),(14,14,8,'2018-09-09 00:00:00','親洽OK','switch重啟後可正常使用。'),(15,15,4,'2018-09-10 00:00:00','親洽OK','switch重啟後仍不閃燈，經工程師維修後可正常使用。'),(16,16,4,'2018-09-10 00:00:00','親洽OK','switch重啟後仍不閃燈，經工程師維修後可正常使用。'),(17,17,4,'2018-09-10 00:00:00','親洽OK','switch重啟後仍不閃燈，經工程師維修後可正常使用。'),(18,18,4,'2018-09-10 00:00:00','親洽OK','網路共用中心→乙太網路→內容→IPV4→改為自動取得ip即可 hi u'),(19,19,4,'2018-09-10 00:00:00','親洽OK','機櫃網路線沒有插好，及筆電網路孔過鬆，導致接觸不良，且網路線故障'),(20,20,4,'2018-09-10 00:00:00','親洽OK','switch重啟後仍不閃燈，經工程師維修後可正常使用。'),(21,21,4,'2018-09-10 00:00:00','親洽OK','網路共用中心→乙太網路→內容→IPV4→改為自動取得ip即可'),(22,22,4,'2018-09-10 00:00:00','親洽OK','由於使用hamachi連線，無法正常取得乙太網路，所以關掉hamachi重新插網路線即可'),(23,23,5,'2018-09-12 00:00:00','親洽OK','此插座無法連線到網路，換另一個插座後可使用。'),(24,24,7,'2018-09-11 00:00:00','親洽OK','由於人不在，不確定switch重啟後可正常使用'),(25,25,7,'2018-09-11 00:00:00','親洽OK','switch重啟後可正常使用'),(26,26,7,'2018-09-11 00:00:00','親洽OK','switch重啟後可正常使用'),(27,27,7,'2018-09-11 00:00:00','親洽OK','switch重啟後可正常使用'),(28,28,5,'2018-09-12 00:00:00','電洽OK','2館6樓最下面那台 switch 有時會不亮，網路非常不穩'),(29,29,5,'2018-09-12 00:00:00','親洽OK','個人設備問題，重設網卡即可使用。'),(30,30,5,'2018-09-12 00:00:00','電洽OK','2館6樓最下面那台 switch 有時會不亮，網路非常不穩'),(31,31,2,'2018-09-13 00:00:00','電洽OK','2館6樓最下面那台 switch 有時會不亮，網路非常不穩'),(32,32,4,'2018-09-16 00:00:00','親洽OK','網路線沒有插好，重插後可正常使用。'),(33,33,4,'2018-09-16 00:00:00','電洽OK','2館6樓最下面那台 switch 有時會不亮，網路非常不穩'),(34,34,7,'2018-09-17 00:00:00','親洽OK','switch測試網路孔可以連線，親洽也可以正常連線。'),(35,35,7,'2018-10-23 00:00:00','電洽OK','電洽使用者已可以使用，但聽她說網路設定會跑掉自行能處理，我請她如果有問題再填寫保單。'),(36,36,7,'2018-09-17 00:00:00','親洽OK','switch網路正常，親洽也可正常連線。'),(37,37,7,'2018-09-17 00:00:00','親洽OK','switch電源線掉了，插上後可正常使用。'),(38,38,7,'2018-09-17 00:00:00','親洽OK','switch電源線掉了，插上後可正常使用。'),(39,39,7,'2018-09-17 00:00:00','親洽OK','switch電源線掉了，插上後可正常使用。'),(40,40,7,'2018-09-24 00:00:00','電洽OK',''),(41,41,7,'2018-09-24 00:00:00','電洽OK','9/19 已與住宿生告知狀況'),(42,42,7,'2018-09-24 00:00:00','電洽OK','9/19 已與住宿生告知狀況'),(43,43,7,'2018-09-24 00:00:00','電洽OK','9/19 已與住宿生告知狀況'),(44,44,7,'2018-09-24 00:00:00','電洽OK','9/19 已與住宿生告知狀況'),(45,45,7,'2018-09-24 00:00:00','電洽OK','9/19 已與住宿生告知狀況'),(46,46,7,'2018-09-24 00:00:00','電洽OK','switch重啟後即可使用'),(47,47,5,'2018-09-19 00:00:00','親洽OK','網路線問題，已請住宿生自行更換'),(48,48,5,'2018-09-19 00:00:00','親洽OK','重設網卡即可使用'),(49,49,8,'2018-09-23 00:00:00','親洽OK','個人電腦網路孔感應不良。'),(50,50,4,'2018-09-26 00:00:00','親洽OK','switch重啟後仍不閃燈，經工程師維修後可正常使用。'),(51,51,4,'2018-09-26 00:00:00','親洽OK','switch重啟後仍不閃燈，經工程師維修後可正常使用。'),(52,52,4,'2018-09-26 00:00:00','親洽OK','switch重啟後仍不閃燈，經工程師維修後可正常使用。'),(53,53,4,'2018-09-26 00:00:00','親洽OK','switch重啟後仍不閃燈，經工程師維修後可正常使用。'),(54,54,4,'2018-09-26 00:00:00','親洽OK','switch重啟後仍不閃燈，經工程師維修後可正常使用。'),(55,55,4,'2018-09-26 00:00:00','親洽OK','switch重啟後仍不閃燈，經工程師維修後可正常使用。'),(56,56,4,'2018-09-26 00:00:00','親洽OK','switch重啟後仍不閃燈，經工程師維修後可正常使用。'),(57,57,4,'2018-09-26 00:00:00','親洽OK','switch重啟後仍不閃燈，經工程師維修後可正常使用。'),(58,58,4,'2018-09-26 00:00:00','親洽OK','switch重啟後仍不閃燈，經工程師維修後可正常使用。'),(59,59,4,'2018-09-26 00:00:00','親洽OK','switch重啟後仍不閃燈，經工程師維修後可正常使用。'),(60,60,6,'2018-09-30 00:00:00','親洽OK','switch重啟後即可使用'),(61,61,5,'2018-10-01 00:00:00','親洽OK','機櫃內的網路線掉了，插上即可使用'),(62,62,6,'2018-09-30 00:00:00','親洽OK','switch重啟後即可使用'),(63,63,6,'2018-09-30 00:00:00','親洽OK','switch重啟後即可使用'),(64,64,6,'2018-09-30 00:00:00','親洽OK','switch重啟後即可使用'),(65,65,6,'2018-09-30 00:00:00','親洽OK','switch重啟後即可使用'),(66,66,6,'2018-09-30 00:00:00','親洽OK','switch重啟後即可使用'),(67,67,6,'2018-09-30 00:00:00','親洽OK','switch重啟後即可使用'),(68,68,6,'2018-09-30 00:00:00','親洽OK','switch重啟後即可使用'),(69,69,6,'2018-09-30 00:00:00','親洽OK','switch重啟後即可使用'),(70,70,5,'2018-10-01 00:00:00','親洽OK','個人設備問題，處理過後已可使用（改為自動ip、診斷、cmd...等都有處理）'),(71,71,5,'2018-10-01 00:00:00','親洽OK','可正常使用。'),(72,72,7,'2018-10-02 00:00:00','親洽OK','switch重啟後即可使用'),(73,73,7,'2018-10-02 00:00:00','親洽OK','switch重啟後即可使用'),(74,74,4,'2018-10-03 00:00:00','親洽OK','機櫃的網路線沒有插，重插後即可正常使用'),(75,75,8,'2018-10-11 00:00:00','親洽OK','已可正常使用'),(76,76,7,'2018-10-15 00:00:00','電洽OK',''),(77,77,6,'2018-10-14 00:00:00','親洽OK','已可正常使用'),(78,78,7,'2018-10-15 00:00:00','親洽OK','switch正常，使用者使用正常，聽使用者說是早上九點突然斷線。'),(79,79,8,'2018-10-22 00:00:00','親洽OK','機櫃重啟後即可正常使用。'),(80,80,8,'2018-10-22 00:00:00','親洽OK','機櫃重啟後即可正常使用。'),(81,81,8,'2018-10-22 00:00:00','親洽OK','機櫃重啟後即可正常使用。'),(82,82,7,'2018-10-23 00:00:00','電洽OK','IP分享器/熱點問題不在修繕範圍內。'),(83,83,8,'2018-10-22 00:00:00','親洽OK','機櫃重啟後即可正常使用。'),(84,84,3,'2018-10-24 00:00:00','親洽OK','機櫃重啟後即可正常使用。'),(85,85,3,'2018-10-24 00:00:00','親洽OK','機櫃重啟後即可正常使用。'),(86,86,4,'2018-10-28 00:00:00','親洽OK','機櫃重啟後即可正常使用。'),(87,87,3,'2018-10-24 00:00:00','親洽OK','機櫃重啟後即可正常使用。'),(88,88,6,'2018-10-29 00:00:00','親洽OK','switch重啟後仍不閃燈，經工程師維修後可正常使用。'),(89,89,6,'2018-10-29 00:00:00','親洽OK','switch重啟後仍不閃燈，經工程師維修後可正常使用。'),(90,90,6,'2018-10-29 00:00:00','親洽OK','switch重啟後仍不閃燈，經工程師維修後可正常使用。'),(91,91,8,'2018-11-01 00:00:00','親洽OK','維修時同學不在，其室友同意後進房檢修，網路孔及網路線接正常，應是同學個人電腦的問題。'),(92,92,5,'2018-11-07 00:00:00','親洽OK','工程師維修後可正常使用'),(93,93,5,'2018-11-07 00:00:00','親洽OK','工程師維修後可正常使用'),(94,94,5,'2018-11-07 00:00:00','親洽OK','工程師維修後可正常使用'),(95,95,5,'2018-11-07 00:00:00','親洽OK','工程師維修後可正常使用'),(96,96,5,'2018-11-07 00:00:00','親洽OK','工程師維修後可正常使用'),(97,97,5,'2018-11-07 00:00:00','親洽OK','工程師維修後可正常使用'),(98,98,4,'2018-11-07 00:00:00','親洽OK','剛剛突然斷網，但現在可正常使用了'),(99,99,6,'2018-11-13 00:00:00','親洽OK',''),(100,100,6,'2018-11-13 00:00:00','親洽OK',''),(101,101,4,'2018-11-18 00:00:00','親洽OK','檢測後網路並無異常'),(102,102,4,'2018-11-28 00:00:00','電洽OK','switch重啟後仍不閃燈，經工程師維修後可正常使用。'),(103,103,4,'2018-11-28 00:00:00','電洽OK','switch重啟後仍不閃燈，經工程師維修後可正常使用。'),(104,104,4,'2018-11-28 00:00:00','電洽OK','switch重啟後仍不閃燈，經工程師維修後可正常使用。'),(105,105,4,'2018-11-28 00:00:00','電洽OK','switch重啟後仍不閃燈，經工程師維修後可正常使用。'),(106,106,4,'2018-11-28 00:00:00','電洽OK','switch重啟後仍不閃燈，經工程師維修後可正常使用。'),(107,107,4,'2018-11-28 00:00:00','電洽OK','switch重啟後仍不閃燈，經工程師維修後可正常使用。'),(108,108,4,'2018-11-28 00:00:00','電洽OK','switch重啟後仍不閃燈，經工程師維修後可正常使用。'),(109,109,4,'2018-11-28 00:00:00','電洽OK','switch重啟後仍不閃燈，經工程師維修後可正常使用。'),(110,110,4,'2018-11-28 00:00:00','電洽OK','switch重啟後仍不閃燈，經工程師維修後可正常使用。'),(111,111,4,'2018-11-28 00:00:00','電洽OK','switch重啟後仍不閃燈，經工程師維修後可正常使用。'),(112,112,4,'2018-11-28 00:00:00','電洽OK','switch重啟後仍不閃燈，經工程師維修後可正常使用。'),(113,113,4,'2018-11-28 00:00:00','電洽OK','switch重啟後仍不閃燈，經工程師維修後可正常使用。'),(114,114,5,'2018-11-27 00:00:00','親洽OK','無異常'),(115,115,5,'2018-11-27 00:00:00','親洽OK','無異常'),(116,116,4,'2018-11-28 00:00:00','電洽OK','switch重啟後仍不閃燈，經工程師維修後可正常使用。'),(117,117,4,'2018-11-28 00:00:00','電洽OK','switch重啟後仍不閃燈，經工程師維修後可正常使用。'),(118,118,5,'2018-12-03 00:00:00','親洽OK','住宿生使用時燈號閃爍不定，使用其他條線測試燈號正常，判斷為網路線的問題，已請住宿生自行更換。'),(119,119,1,'2019-01-07 05:25:54','親洽OK','');
/*!40000 ALTER TABLE `processing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sweep`
--

DROP TABLE IF EXISTS `sweep`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sweep` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '#',
  `employeeID` int(10) unsigned DEFAULT NULL COMMENT '員工編號',
  `cabinetID` int(10) unsigned DEFAULT NULL COMMENT '機櫃編號',
  `date` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '清掃日期',
  PRIMARY KEY (`ID`),
  KEY `FK_cabinetID_sweep_idx` (`cabinetID`),
  KEY `FK_employeeID_sweep_idx` (`employeeID`),
  CONSTRAINT `FK_cabinetID_sweep` FOREIGN KEY (`cabinetID`) REFERENCES `cabinet` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_employeeID_sweep` FOREIGN KEY (`employeeID`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='清掃';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sweep`
--

LOCK TABLES `sweep` WRITE;
/*!40000 ALTER TABLE `sweep` DISABLE KEYS */;
INSERT INTO `sweep` VALUES (1,2,1,'2019-01-05 00:24:10');
/*!40000 ALTER TABLE `sweep` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `switch`
--

DROP TABLE IF EXISTS `switch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `switch` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '#',
  `cabinetID` int(10) unsigned DEFAULT NULL COMMENT '機櫃編號',
  `switchCode` int(10) unsigned DEFAULT NULL COMMENT '交換器代號',
  `status` varchar(30) DEFAULT NULL COMMENT '狀態',
  `specification` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '規格',
  PRIMARY KEY (`ID`),
  KEY `FK_cabinetID_switch_idx` (`cabinetID`),
  CONSTRAINT `FK_cabinetID_switch` FOREIGN KEY (`cabinetID`) REFERENCES `cabinet` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=154 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='交換器';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `switch`
--

LOCK TABLES `switch` WRITE;
/*!40000 ALTER TABLE `switch` DISABLE KEYS */;
INSERT INTO `switch` VALUES (1,1,1,'維修','GS108PP'),(2,1,2,'正常','GS109PP'),(3,1,3,'維修','GS110PP'),(4,1,4,'正常','GS111PP'),(5,1,5,'正常','GS112PP'),(6,2,1,'正常','GS113PP'),(7,2,2,'正常','GS114PP'),(8,2,3,'正常','GS115PP'),(9,2,4,'正常','GS116PP'),(10,2,5,'正常','GS117PP'),(11,3,1,'正常','GS118PP'),(12,3,2,'正常','GS119PP'),(13,3,3,'正常','GS120PP'),(14,3,4,'正常','GS121PP'),(15,3,5,'正常','GS122PP'),(16,4,1,'正常','GS123PP'),(17,4,2,'正常','GS124PP'),(18,4,3,'正常','GS125PP'),(19,4,4,'正常','GS126PP'),(20,4,5,'正常','GS127PP'),(21,5,1,'正常','GS128PP'),(22,5,2,'正常','GS129PP'),(23,5,3,'正常','GS130PP'),(24,5,4,'正常','GS131PP'),(25,5,5,'正常','GS132PP'),(26,6,1,'正常','GS133PP'),(27,6,2,'正常','GS134PP'),(28,6,3,'正常','GS135PP'),(29,6,4,'正常','GS136PP'),(30,6,5,'正常','GS137PP'),(31,7,1,'正常','GS138PP'),(32,7,2,'正常','GS139PP'),(33,7,3,'正常','GS140PP'),(34,7,4,'正常','GS141PP'),(35,7,5,'正常','GS142PP'),(36,8,1,'正常','GS143PP'),(37,8,2,'正常','GS144PP'),(38,8,3,'正常','GS145PP'),(39,8,4,'正常','GS146PP'),(40,8,5,'正常','GS147PP'),(41,9,1,'正常','GS148PP'),(42,9,2,'正常','GS149PP'),(43,9,3,'正常','GS150PP'),(44,9,4,'正常','GS151PP'),(45,9,5,'正常','GS152PP'),(46,10,1,'正常','GS153PP'),(47,10,2,'正常','GS154PP'),(48,10,3,'正常','GS155PP'),(49,10,4,'正常','GS156PP'),(50,10,5,'正常','GS157PP'),(51,11,1,'正常','GS158PP'),(52,11,2,'正常','GS159PP'),(53,11,3,'正常','GS160PP'),(54,11,4,'正常','GS161PP'),(55,11,5,'正常','GS162PP'),(56,12,1,'正常','GS163PP'),(57,12,2,'正常','GS164PP'),(58,12,3,'正常','GS165PP'),(59,12,4,'正常','GS166PP'),(60,12,5,'正常','GS167PP'),(61,13,1,'正常','GS168PP'),(62,13,2,'正常','GS169PP'),(63,13,3,'正常','GS170PP'),(64,13,4,'正常','GS171PP'),(65,13,5,'正常','GS172PP'),(66,14,1,'正常','GS173PP'),(67,14,2,'正常','GS174PP'),(68,14,3,'正常','GS175PP'),(69,14,4,'正常','GS176PP'),(70,14,5,'正常','GS177PP'),(71,15,1,'正常','GS178PP'),(72,15,2,'正常','GS179PP'),(73,15,3,'正常','GS180PP'),(74,15,4,'正常','GS181PP'),(75,15,5,'正常','GS182PP'),(76,16,1,'正常','GS183PP'),(77,16,2,'正常','GS184PP'),(78,16,3,'正常','GS185PP'),(79,16,4,'正常','GS186PP'),(80,16,5,'正常','GS187PP'),(81,17,1,'正常','GS188PP'),(82,17,2,'正常','GS189PP'),(83,17,3,'正常','GS190PP'),(84,17,4,'正常','GS191PP'),(85,17,5,'正常','GS192PP'),(86,18,1,'正常','GS193PP'),(87,18,2,'正常','GS194PP'),(88,18,3,'正常','GS195PP'),(89,18,4,'正常','GS196PP'),(90,18,5,'正常','GS197PP'),(91,19,1,'正常','GS198PP'),(92,19,2,'正常','GS199PP'),(93,19,3,'正常','GS200PP'),(94,19,4,'正常','GS201PP'),(95,19,5,'正常','GS202PP'),(96,20,1,'正常','GS203PP'),(97,20,2,'正常','GS204PP'),(98,20,3,'正常','GS205PP'),(99,20,4,'正常','GS206PP'),(100,20,5,'正常','GS207PP'),(101,21,1,'正常','GS208PP'),(102,21,2,'正常','GS209PP'),(103,21,3,'正常','GS210PP'),(104,21,4,'正常','GS211PP'),(105,21,5,'正常','GS212PP'),(106,22,1,'正常','GS213PP'),(107,22,2,'正常','GS214PP'),(108,22,3,'正常','GS215PP'),(109,22,4,'正常','GS216PP'),(110,22,5,'正常','GS217PP'),(111,23,1,'正常','GS218PP'),(112,23,2,'正常','GS219PP'),(113,23,3,'正常','GS220PP'),(114,23,4,'正常','GS221PP'),(115,23,5,'正常','GS222PP'),(116,24,1,'正常','GS223PP'),(117,24,2,'正常','GS224PP'),(118,24,3,'正常','GS225PP'),(119,24,4,'正常','GS226PP'),(120,24,5,'正常','GS227PP'),(121,25,1,'正常','GS228PP'),(122,25,2,'正常','GS229PP'),(123,25,3,'正常','GS230PP'),(124,25,4,'正常','GS231PP'),(125,25,5,'正常','GS232PP');
/*!40000 ALTER TABLE `switch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `time`
--

DROP TABLE IF EXISTS `time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `time` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '#',
  `malfunctionID` int(10) unsigned DEFAULT NULL COMMENT '單號',
  `time` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '方便維修時段',
  `exc` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '例外時段',
  PRIMARY KEY (`ID`),
  KEY `FK_malfunctionID_time_idx` (`malfunctionID`),
  CONSTRAINT `FK_malfunctionID_time` FOREIGN KEY (`malfunctionID`) REFERENCES `malfunction` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='時段';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `time`
--

LOCK TABLES `time` WRITE;
/*!40000 ALTER TABLE `time` DISABLE KEYS */;
INSERT INTO `time` VALUES (1,1,'00:00~24:00',NULL),(2,2,'08:00~11:00',NULL),(3,3,'19:30~20:00',NULL),(4,4,'09:00~22:00',NULL),(5,5,'20:00~21:00',NULL),(6,6,'13:00~16:00',NULL),(7,7,'20:00~21:00',NULL),(8,8,'20:00~',NULL),(9,9,'19:00~22:00',NULL),(10,10,'20:00~22:00',NULL),(11,11,'20:00~22:00','9/7、9/8 00:00~24:00'),(12,12,'20:00~',NULL),(13,13,'20:00~21:30',NULL),(14,14,'21:00~22:00',NULL),(15,15,'20:00~22:00',NULL),(16,16,'20:00~22:00',NULL),(17,17,'20:00~22:00',NULL),(18,18,'20:00~',NULL),(19,19,'20:00~21:00',NULL),(20,20,'20:00~22:00',NULL),(21,21,'20:00~22:00',NULL),(22,22,'20:00~22:00',NULL),(23,23,'20:00~',NULL),(24,24,'20:00~',NULL),(25,25,'20:00~22:00',NULL),(26,26,'20:00~22:00',NULL),(27,27,'20:00~22:00',NULL),(28,28,'20:00~22:00',NULL),(29,29,'20:00~21:00',NULL),(30,30,'21:00~',NULL),(31,31,'20:00~',NULL),(32,32,'21:00~22:00',NULL),(33,33,'22:00~',NULL),(34,34,'20:00~22:00',NULL),(35,35,'21:00~',NULL),(36,36,'20:00~22:00',NULL),(37,37,'一、二、三、四、五 00:00~24:00',NULL),(38,38,'20:00~21:00',NULL),(39,39,'21:00~21:30',NULL),(40,40,'21:00~',NULL),(41,41,'20:30~',NULL),(42,42,'20:00~',NULL),(43,43,'20:00~22:00',NULL),(44,44,'20:00~',NULL),(45,45,'20:00~',NULL),(46,46,'20:00~22:00',NULL),(47,47,'20:00~22:00',NULL),(48,48,'20:00~22:00',NULL),(49,49,'20:00~22:00',NULL),(50,50,'21:00~',NULL),(51,51,'21:00~',NULL),(52,52,'20:00~',NULL),(53,53,'08:20~',NULL),(54,54,'20:00~22:00',NULL),(55,55,'20:00~22:00',NULL),(56,56,'21:00~',NULL),(57,57,'20:00~22:00',NULL),(58,58,'三 20:00~，四 20:00~',NULL),(59,59,'全 00:00~24:00',NULL),(60,60,'20:00~22:00',NULL),(61,61,'20:00~22:00',NULL),(62,62,'20:00~22:00',NULL),(63,63,'21:00~',NULL),(64,64,'20:00~',NULL),(65,65,'20:00~',NULL),(66,66,'20:00~',NULL),(67,67,'20:00~22:00',NULL),(68,68,'20:00~21:00',NULL),(69,69,'20:00~',NULL),(70,70,'20:00~22:00',NULL),(71,71,'21:00~',NULL),(72,72,'10/2 20:00~',NULL),(73,73,'20:00~',NULL),(74,74,'一 20:00~22:00',NULL),(75,75,'08:00~09:00',NULL),(76,76,'20:00~21:00',NULL),(77,77,'20:00~22:00',NULL),(78,78,'20:00~22:00',NULL),(79,79,'17:30~22:00',NULL),(80,80,'20:00~21:00',NULL),(81,81,'20:00~21:00',NULL),(82,82,'20:00~22:00',NULL),(83,83,'20:00~22:00',NULL),(84,84,'20:00~22:00',NULL),(85,85,'20:00~22:00',NULL),(86,86,'20:00~22:00',NULL),(87,87,'20:00~22:00',NULL),(88,88,'19:30~22:00',NULL),(89,89,'六 21:00~22:00',NULL),(90,90,'一 20:00~22:00，三 21:30~22:00',NULL),(91,91,'20:00~21:00',NULL),(92,92,'全 00:00~24:00',NULL),(93,93,'20:00~22:00',NULL),(94,94,'20:00~22:00',NULL),(95,95,'11/5 00:00~24:00',NULL),(96,96,'20:00~22:00',NULL),(97,97,'19:00~21:00',NULL),(98,98,'20:00~22:00',NULL),(99,99,'20:00~',NULL),(100,100,'全 00:00~24:00',NULL),(101,101,'21:00~22:00',NULL),(102,102,'20:00~',NULL),(103,103,'20:30~22:00',NULL),(104,104,'20:00~22:00',NULL),(105,105,'18:00~20:00',NULL),(106,106,'21:00~22:00',NULL),(107,107,'20:00~22:00',NULL),(108,108,'20:00~22:00',NULL),(109,109,'18:00~22:00',NULL),(110,110,'11/28 21:00~',NULL),(111,111,'20:00~22:00',NULL),(112,112,'20:00~22:00',NULL),(113,113,'20:00~22:00',NULL),(114,114,'21:00~',NULL),(115,115,'20:00~22:00',NULL),(116,116,'21:00~22:00',NULL),(117,117,'20:30~22:00',NULL),(118,118,'18:00~22:00',NULL),(119,119,'全',''),(120,120,'全','');
/*!40000 ALTER TABLE `time` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendor`
--

DROP TABLE IF EXISTS `vendor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `vendor` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '#',
  `vendorCode` char(7) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '廠商代號',
  `name` varchar(30) DEFAULT NULL COMMENT '名稱',
  `tel` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '電話',
  `email` varchar(90) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '電子信箱',
  `addr` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '地址',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `vendorCode_UNIQUE` (`vendorCode`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='廠商';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor`
--

LOCK TABLES `vendor` WRITE;
/*!40000 ALTER TABLE `vendor` DISABLE KEYS */;
INSERT INTO `vendor` VALUES (1,'K666666','666','026666666','666@666.com','6666'),(2,'K123456','K123456','123456789','K123456@K123456.com','K123456'),(3,'K654321','K654321','0911222333','K654321@gmail.com','K654321'),(4,'K111111','K111111','0933444555','K111111@gmail.com','K111111');
/*!40000 ALTER TABLE `vendor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'res_net_cmms'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-01-07 17:40:12
