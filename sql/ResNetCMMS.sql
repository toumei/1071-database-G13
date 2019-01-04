-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: res_net_cmms
-- ------------------------------------------------------
-- Server version	8.0.13

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
-- Table structure for table `_coloption`
--

DROP TABLE IF EXISTS `_coloption`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `_coloption` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '#',
  `name` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '名字',
  `type` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '型態',
  `value` json DEFAULT NULL COMMENT '值',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='欄位控制';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_coloption`
--

LOCK TABLES `_coloption` WRITE;
/*!40000 ALTER TABLE `_coloption` DISABLE KEYS */;
INSERT INTO `_coloption` VALUES (0,'ID','TEXT','\"PK\"'),(1,'addr','TEXTAREA','\"NONE\"'),(2,'bedNum','TEXTAREA','\"NONE\"'),(3,'boarderID','TEXT','\"NONE\"'),(4,'cabinetCode','TEXT','\"PK\"'),(5,'cabinetID','TEXT','\"NONE\"'),(6,'date','DATETIME','\"NONE\"'),(7,'desc','TEXTAREA','\"NONE\"'),(8,'detail','TEXTAREA','\"NONE\"'),(9,'email','TEXT','\"EMAIL\"'),(10,'employeeID','TEXT','\"NONE\"'),(11,'IDcard','TEXT','\"IDCARD\"'),(12,'malfunctionID','TEXT','\"PK\"'),(13,'matter','SELECT','[{\"label\": \"個人床位—無法連線\", \"value\": \"個人床位—無法連線\"}, {\"label\": \"個人床位—網路不穩/網速遲緩\", \"value\": \"個人床位—網路不穩/網速遲緩\"}, {\"label\": \"個人床位—網路插孔故障\", \"value\": \"個人床位—網路插孔故障\"}, {\"label\": \"整間寢室—無法連線\", \"value\": \"整間寢室—無法連線\"}, {\"label\": \"網路插座\", \"value\": \"網路插座\"}, {\"label\": \"部分床位—無法連線\", \"value\": \"部分床位—無法連線\"}]'),(14,'name','TEXT','\"NONE\"'),(15,'result','SELECT','[{\"label\": \"親洽OK\", \"value\": \"親洽OK\"}, {\"label\": \"電洽OK\", \"value\": \"電洽OK\"}]'),(16,'specification','TEXTAREA','\"NONE\"'),(17,'status','CHECKBOX','\"正常:維修\"'),(18,'studentCode','TEXT','\"PK\"'),(19,'switchID','TEXT','\"NONE\"'),(20,'tel','TEXT','\"TEL\"'),(21,'time','TEXT','\"NONE\"'),(22,'vendorCode','TEXT','\"PK\"'),(23,'vendorID','TEXT','\"NONE\"');
/*!40000 ALTER TABLE `_coloption` ENABLE KEYS */;
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
  `date` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '申報日期',
  `desc` varchar(90) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '維護說明',
  PRIMARY KEY (`ID`),
  KEY `FK_switchID_apply_idx` (`switchID`),
  KEY `FK_employeeID_apply_idx` (`employeeID`),
  CONSTRAINT `FK_employeeID_apply` FOREIGN KEY (`employeeID`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_switchID_apply` FOREIGN KEY (`switchID`) REFERENCES `switch` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='申報';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apply`
--

LOCK TABLES `apply` WRITE;
/*!40000 ALTER TABLE `apply` DISABLE KEYS */;
/*!40000 ALTER TABLE `apply` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='住宿生';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boarder`
--

LOCK TABLES `boarder` WRITE;
/*!40000 ALTER TABLE `boarder` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='機櫃';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cabinet`
--

LOCK TABLES `cabinet` WRITE;
/*!40000 ALTER TABLE `cabinet` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='工作人員';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
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
  `boarderID` int(10) unsigned DEFAULT NULL COMMENT '學號',
  `bedNum` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '寢室床號',
  `date` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '報修日期',
  `matter` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '報修事項',
  `desc` varchar(90) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '狀況描述',
  `time` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '方便維修時段',
  PRIMARY KEY (`ID`),
  KEY `FK_studentID_malfunction_idx` (`boarderID`),
  CONSTRAINT `FK_studentID_malfunction` FOREIGN KEY (`boarderID`) REFERENCES `boarder` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='報修單';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `malfunction`
--

LOCK TABLES `malfunction` WRITE;
/*!40000 ALTER TABLE `malfunction` DISABLE KEYS */;
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
  `result` varchar(90) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '維修結果',
  `detail` varchar(90) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '處理內容',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `malfunctionID_UNIQUE` (`malfunctionID`),
  KEY `FK_employeeID_processing_idx` (`employeeID`),
  KEY `FK_malfunctionID_processing_idx` (`ID`),
  KEY `FK_malfunctionID_processing_idx1` (`malfunctionID`),
  CONSTRAINT `FK_employeeID_processing` FOREIGN KEY (`employeeID`) REFERENCES `employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_malfunctionID_processing` FOREIGN KEY (`malfunctionID`) REFERENCES `malfunction` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='維修單';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `processing`
--

LOCK TABLES `processing` WRITE;
/*!40000 ALTER TABLE `processing` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='清掃';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sweep`
--

LOCK TABLES `sweep` WRITE;
/*!40000 ALTER TABLE `sweep` DISABLE KEYS */;
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
  `vendorID` int(10) unsigned DEFAULT NULL COMMENT '廠商代號',
  `cabinetID` int(10) unsigned DEFAULT NULL COMMENT '機櫃編號',
  `switchID` int(10) unsigned DEFAULT NULL COMMENT '交換器編號',
  `status` varchar(30) DEFAULT NULL COMMENT '狀態',
  `specification` varchar(90) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '規格',
  PRIMARY KEY (`ID`),
  KEY `FK_cabinetID_switch_idx` (`cabinetID`),
  KEY `FK_vendorCode_switch_idx` (`vendorID`),
  CONSTRAINT `FK_cabinetID_switch` FOREIGN KEY (`cabinetID`) REFERENCES `cabinet` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_vendorCode_switch` FOREIGN KEY (`vendorID`) REFERENCES `vendor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='交換器';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `switch`
--

LOCK TABLES `switch` WRITE;
/*!40000 ALTER TABLE `switch` DISABLE KEYS */;
/*!40000 ALTER TABLE `switch` ENABLE KEYS */;
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
  `tel` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '電話',
  `email` varchar(90) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '電子信箱',
  `addr` varchar(90) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '地址',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `vendorCode_UNIQUE` (`vendorCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='廠商';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendor`
--

LOCK TABLES `vendor` WRITE;
/*!40000 ALTER TABLE `vendor` DISABLE KEYS */;
/*!40000 ALTER TABLE `vendor` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-01-04  8:34:50
