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
-- Table structure for table `apply`
--

DROP TABLE IF EXISTS `apply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `apply` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'No.',
  `employeeID` int(11) unsigned NOT NULL COMMENT '員工編號',
  `switchID` int(11) unsigned NOT NULL COMMENT '交換器編號',
  `vendorID` int(11) unsigned NOT NULL COMMENT '廠商代號',
  `date` date DEFAULT NULL COMMENT '申報日期',
  `desc` varchar(45) DEFAULT NULL COMMENT '維護說明',
  UNIQUE KEY `ID_UNIQUE` (`ID`),
  KEY `FK_employeeID_apply` (`employeeID`),
  KEY `FK_switchID_vendorID_apply` (`switchID`,`vendorID`),
  CONSTRAINT `FK_employeeID_apply` FOREIGN KEY (`employeeID`) REFERENCES `employee` (`employeeid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_switchID_vendorID_apply` FOREIGN KEY (`switchID`, `vendorID`) REFERENCES `switch` (`switchid`, `vendorid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='申報';
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
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'No.',
  `studentID` int(10) unsigned NOT NULL COMMENT '學號',
  `name` varchar(45) NOT NULL COMMENT '姓名',
  PRIMARY KEY (`studentID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='住宿生';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boarder`
--

LOCK TABLES `boarder` WRITE;
/*!40000 ALTER TABLE `boarder` DISABLE KEYS */;
INSERT INTO `boarder` VALUES (1,1,'1'),(2,2,'2'),(3,3,'3'),(4,4,'4'),(5,5,'5'),(6,6,'6'),(7,7,'7'),(8,8,'8'),(9,9,'9'),(10,10,'10'),(11,11,'11'),(12,12,'12'),(13,13,'13'),(14,14,'14'),(15,15,'15'),(16,16,'16');
/*!40000 ALTER TABLE `boarder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cabinet`
--

DROP TABLE IF EXISTS `cabinet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cabinet` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'No.',
  `cabinetID` int(11) unsigned NOT NULL COMMENT '機櫃編號',
  `status` tinyint(3) unsigned NOT NULL COMMENT '狀態',
  PRIMARY KEY (`cabinetID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`)
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
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'No.',
  `employeeID` int(11) unsigned NOT NULL COMMENT '員工編號',
  `name` varchar(45) DEFAULT NULL COMMENT '姓名',
  `IDcard` varchar(11) DEFAULT NULL COMMENT '身分證',
  PRIMARY KEY (`employeeID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`),
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
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'No.',
  `malfunctionID` int(11) unsigned NOT NULL COMMENT '單號',
  `studentID` int(11) unsigned NOT NULL COMMENT '學號',
  `bedID` int(11) unsigned NOT NULL COMMENT '寢室床號',
  `date` date DEFAULT NULL COMMENT '報修日期',
  `matter` varchar(45) DEFAULT NULL COMMENT '報修事項',
  `desc` varchar(45) DEFAULT NULL COMMENT '狀況描述',
  `time` date DEFAULT NULL COMMENT '方便維修時段',
  PRIMARY KEY (`malfunctionID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`),
  KEY `FK_studentID_malfunction` (`studentID`),
  CONSTRAINT `FK_studentID_malfunction` FOREIGN KEY (`studentID`) REFERENCES `boarder` (`studentid`) ON DELETE CASCADE ON UPDATE CASCADE
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
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'No.',
  `employeeID` int(11) unsigned NOT NULL COMMENT '員工編號',
  `malfunctionID` int(11) unsigned NOT NULL COMMENT '單號',
  `date` date DEFAULT NULL COMMENT '維修日期',
  `result` varchar(45) DEFAULT NULL COMMENT '維修結果',
  `detail` varchar(45) DEFAULT NULL COMMENT '處理內容',
  UNIQUE KEY `ID_UNIQUE` (`ID`),
  KEY `FK_employeeID_processing_idx` (`employeeID`),
  KEY `FK_malfunctionID_processing` (`malfunctionID`),
  CONSTRAINT `FK_employeeID_processing` FOREIGN KEY (`employeeID`) REFERENCES `employee` (`employeeid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_malfunctionID_processing` FOREIGN KEY (`malfunctionID`) REFERENCES `malfunction` (`malfunctionid`) ON DELETE CASCADE ON UPDATE CASCADE
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
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'No.',
  `employeeID` int(11) unsigned NOT NULL COMMENT '員工編號',
  `cabinetID` int(11) unsigned NOT NULL COMMENT '機櫃編號',
  `date` date DEFAULT NULL COMMENT '清掃日期',
  UNIQUE KEY `ID_UNIQUE` (`ID`),
  KEY `FK_employeeID_sweep` (`employeeID`),
  CONSTRAINT `FK_employeeID_sweep` FOREIGN KEY (`employeeID`) REFERENCES `employee` (`employeeid`) ON DELETE CASCADE ON UPDATE CASCADE
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
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'No.',
  `switchID` int(11) unsigned NOT NULL COMMENT '交換器編號',
  `vendorID` int(11) unsigned NOT NULL COMMENT '廠商代號',
  `cabinetID` int(11) unsigned NOT NULL COMMENT '機櫃編號',
  `status` tinyint(3) unsigned NOT NULL COMMENT '狀態',
  `specification` varchar(45) DEFAULT NULL COMMENT '規格',
  PRIMARY KEY (`switchID`,`vendorID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`),
  KEY `FK_cabinetID_switch` (`cabinetID`),
  KEY `FK_vendorID_switch` (`vendorID`),
  CONSTRAINT `FK_cabinetID_switch` FOREIGN KEY (`cabinetID`) REFERENCES `cabinet` (`cabinetid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_vendorID_switch` FOREIGN KEY (`vendorID`) REFERENCES `vendor` (`vendorid`) ON DELETE CASCADE ON UPDATE CASCADE
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
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'No.',
  `vendorID` int(11) unsigned NOT NULL COMMENT '廠商代號',
  `email` varchar(45) DEFAULT NULL COMMENT '電子信箱',
  `tel` varchar(10) DEFAULT NULL COMMENT '電話',
  `addr` varchar(45) DEFAULT NULL COMMENT '地址',
  PRIMARY KEY (`vendorID`),
  UNIQUE KEY `ID_UNIQUE` (`ID`)
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

-- Dump completed on 2018-12-10  7:57:39
