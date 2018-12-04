-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: localhost    Database: girl_repair_system
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
-- Table structure for table `boarder`
--

DROP TABLE IF EXISTS `boarder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `boarder` (
  `studentID` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '學號',
  `name` varchar(45) NOT NULL COMMENT '姓名',
  PRIMARY KEY (`studentID`)
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
  `cabinetID` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '機櫃編號',
  `status` tinyint(3) unsigned NOT NULL COMMENT '狀態',
  PRIMARY KEY (`cabinetID`)
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
-- Table structure for table `declare`
--

DROP TABLE IF EXISTS `declare`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `declare` (
  `employeeID` int(11) unsigned NOT NULL COMMENT '員工編號',
  `switchID` int(11) unsigned NOT NULL COMMENT '交換器編號',
  `vendorID` int(11) unsigned NOT NULL COMMENT '廠商代號',
  `date` date DEFAULT NULL COMMENT '申報日期',
  `desc` varchar(45) DEFAULT NULL COMMENT '維護說明',
  KEY `FK_employeeID_declare` (`employeeID`),
  KEY `FK_switchID_vendorID_declare` (`switchID`,`vendorID`),
  CONSTRAINT `FK_employeeID_declare` FOREIGN KEY (`employeeID`) REFERENCES `employee` (`employeeid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_switchID_vendorID_declare` FOREIGN KEY (`switchID`, `vendorID`) REFERENCES `switch` (`switchid`, `vendorid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='申報';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `declare`
--

LOCK TABLES `declare` WRITE;
/*!40000 ALTER TABLE `declare` DISABLE KEYS */;
/*!40000 ALTER TABLE `declare` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `employee` (
  `employeeID` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '員工編號',
  `name` varchar(45) DEFAULT NULL COMMENT '姓名',
  `IDcard` varchar(11) DEFAULT NULL COMMENT '身分證',
  PRIMARY KEY (`employeeID`),
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
-- Table structure for table `repair`
--

DROP TABLE IF EXISTS `repair`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `repair` (
  `repairID` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '單號',
  `studentID` int(11) unsigned NOT NULL COMMENT '學號',
  `bedID` int(11) unsigned NOT NULL COMMENT '寢室床號',
  `date` date DEFAULT NULL COMMENT '報修日期',
  `matter` varchar(45) DEFAULT NULL COMMENT '報修事項',
  `desc` varchar(45) DEFAULT NULL COMMENT '狀況描述',
  `time` date DEFAULT NULL COMMENT '方便維修時段',
  PRIMARY KEY (`repairID`),
  KEY `FK_studentID_repair` (`studentID`),
  CONSTRAINT `FK_studentID_repair` FOREIGN KEY (`studentID`) REFERENCES `boarder` (`studentid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='報修單';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `repair`
--

LOCK TABLES `repair` WRITE;
/*!40000 ALTER TABLE `repair` DISABLE KEYS */;
/*!40000 ALTER TABLE `repair` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rma`
--

DROP TABLE IF EXISTS `rma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `rma` (
  `employeeID` int(11) unsigned NOT NULL COMMENT '員工編號',
  `repairID` int(11) unsigned NOT NULL COMMENT '單號',
  `date` date DEFAULT NULL COMMENT '維修日期',
  `result` varchar(45) DEFAULT NULL COMMENT '維修結果',
  `detail` varchar(45) DEFAULT NULL COMMENT '處理內容',
  KEY `FK_repairID_rma` (`repairID`),
  KEY `FK_employeeID_rma` (`employeeID`),
  CONSTRAINT `FK_employeeID_rma` FOREIGN KEY (`employeeID`) REFERENCES `employee` (`employeeid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_repairID_rma` FOREIGN KEY (`repairID`) REFERENCES `repair` (`repairid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='維修單';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rma`
--

LOCK TABLES `rma` WRITE;
/*!40000 ALTER TABLE `rma` DISABLE KEYS */;
/*!40000 ALTER TABLE `rma` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sweep`
--

DROP TABLE IF EXISTS `sweep`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `sweep` (
  `employeeID` int(11) unsigned NOT NULL COMMENT '員工編號',
  `cabinetID` int(11) unsigned NOT NULL COMMENT '機櫃編號',
  `date` date DEFAULT NULL COMMENT '清掃日期',
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
  `switchID` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '交換器編號',
  `vendorID` int(11) unsigned NOT NULL COMMENT '廠商代號',
  `cabinetID` int(11) unsigned NOT NULL COMMENT '機櫃編號',
  `status` tinyint(3) unsigned NOT NULL COMMENT '狀態',
  `specification` varchar(45) DEFAULT NULL COMMENT '規格',
  PRIMARY KEY (`switchID`,`vendorID`),
  KEY `FK_vendorID_switch` (`vendorID`) /*!80000 INVISIBLE */,
  KEY `FK_cabinetID_switch` (`cabinetID`),
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
  `vendorID` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '廠商代號',
  `email` varchar(45) DEFAULT NULL COMMENT '電子信箱',
  `tel` varchar(10) DEFAULT NULL COMMENT '電話',
  `addr` varchar(45) DEFAULT NULL COMMENT '地址',
  PRIMARY KEY (`vendorID`)
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

-- Dump completed on 2018-12-04 13:13:32
