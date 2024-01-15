CREATE DATABASE  IF NOT EXISTS `consejeria_asesorias` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `consejeria_asesorias`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: consejeria_asesorias
-- ------------------------------------------------------
-- Server version	8.0.33

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

--
-- Table structure for table `asesorados`
--

DROP TABLE IF EXISTS `asesorados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asesorados` (
  `id_asesorado` int NOT NULL,
  `estatus_trabajo` tinyint NOT NULL,
  `id_motivo` int DEFAULT NULL,
  `id_estado_civil` int NOT NULL,
  `numero_hijos` int DEFAULT NULL,
  `ingreso_mensual` double DEFAULT NULL,
  PRIMARY KEY (`id_asesorado`),
  KEY `fk_estado_civil_idx` (`id_estado_civil`),
  KEY `fk_motivo_asesorado_idx` (`id_motivo`),
  CONSTRAINT `fk_estado_civil_asesorado` FOREIGN KEY (`id_estado_civil`) REFERENCES `estados_civiles` (`id_estado_civil`),
  CONSTRAINT `fk_motivo_asesorado` FOREIGN KEY (`id_motivo`) REFERENCES `motivos` (`id_motivo`),
  CONSTRAINT `fk_persona_asesorado` FOREIGN KEY (`id_asesorado`) REFERENCES `personas` (`id_persona`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asesorados`
--

LOCK TABLES `asesorados` WRITE;
/*!40000 ALTER TABLE `asesorados` DISABLE KEYS */;
INSERT INTO `asesorados` VALUES (1,0,3,1,0,NULL),(2,0,3,1,0,NULL),(3,0,3,1,0,NULL),(4,0,3,1,0,NULL),(5,0,3,1,0,NULL),(6,0,3,1,0,NULL),(7,0,3,1,0,NULL),(8,0,3,1,0,NULL),(9,0,3,1,0,NULL),(10,0,3,1,0,NULL),(11,0,3,1,0,NULL),(12,0,3,1,0,NULL),(13,0,3,1,0,NULL),(14,0,3,1,0,NULL),(15,0,3,1,0,NULL),(16,0,3,1,0,NULL),(17,0,3,1,0,NULL),(18,0,3,1,0,NULL),(19,0,3,1,0,NULL),(20,0,3,1,0,NULL),(21,0,3,1,0,NULL),(22,0,3,1,0,NULL),(23,0,3,1,0,NULL),(24,0,3,1,0,NULL),(25,0,3,1,0,NULL),(26,0,3,1,0,NULL),(27,0,3,1,0,NULL),(28,0,3,1,0,NULL),(29,0,3,1,0,NULL),(30,0,3,1,0,NULL),(31,0,3,1,0,NULL),(32,0,3,1,0,NULL),(33,0,3,1,0,NULL),(34,0,3,1,0,NULL),(35,0,3,1,0,NULL),(36,0,3,1,0,NULL),(37,0,3,1,0,NULL),(38,0,3,1,0,NULL),(39,0,3,1,0,NULL),(40,0,3,1,0,NULL),(41,0,3,1,0,NULL),(42,0,3,1,0,NULL),(43,0,3,1,0,NULL),(44,0,3,1,0,NULL),(45,0,3,1,0,NULL),(46,0,3,1,0,NULL),(47,0,3,1,0,NULL),(48,0,3,1,0,NULL);
/*!40000 ALTER TABLE `asesorados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asesores`
--

DROP TABLE IF EXISTS `asesores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asesores` (
  `id_asesor` int NOT NULL,
  `nombre_asesor` varchar(100) NOT NULL,
  PRIMARY KEY (`id_asesor`),
  CONSTRAINT `fk_asesor_asesor_empleado` FOREIGN KEY (`id_asesor`) REFERENCES `empleados` (`id_empleado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asesores`
--

LOCK TABLES `asesores` WRITE;
/*!40000 ALTER TABLE `asesores` DISABLE KEYS */;
INSERT INTO `asesores` VALUES (1,'Jose Jesus Orozco Hernandez');
/*!40000 ALTER TABLE `asesores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asesorias`
--

DROP TABLE IF EXISTS `asesorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asesorias` (
  `id_asesoria` int NOT NULL AUTO_INCREMENT,
  `resumen_asesoria` varchar(250) DEFAULT NULL,
  `conclusion_asesoria` varchar(250) DEFAULT NULL,
  `estatus_requisitos` tinyint DEFAULT NULL,
  `fecha_registro` date DEFAULT NULL,
  `id_empleado` int NOT NULL,
  `id_turno` int DEFAULT NULL,
  `id_asesorado` int NOT NULL,
  `usuario` varchar(195) NOT NULL,
  `id_tipo_juicio` int NOT NULL,
  PRIMARY KEY (`id_asesoria`),
  KEY `fk_asesorado_asesoria_idx` (`id_asesorado`),
  KEY `fk_turno_asesoria_idx` (`id_turno`),
  KEY `fk_tipo_juicio_idx` (`id_tipo_juicio`),
  KEY `fk_empleado_asesoria_idx` (`id_empleado`),
  CONSTRAINT `fk_asesorado_asesoria` FOREIGN KEY (`id_asesorado`) REFERENCES `asesorados` (`id_asesorado`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_asesoria_empleado` FOREIGN KEY (`id_empleado`) REFERENCES `empleados` (`id_empleado`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_id_tipo_juicio_asesoria` FOREIGN KEY (`id_tipo_juicio`) REFERENCES `tipos_juicios` (`id_tipo_juicio`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_turno_asesoria` FOREIGN KEY (`id_turno`) REFERENCES `turnos` (`id_turno`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asesorias`
--

LOCK TABLES `asesorias` WRITE;
/*!40000 ALTER TABLE `asesorias` DISABLE KEYS */;
INSERT INTO `asesorias` VALUES (1,'Resumen d','Conclusión de ',1,'2023-12-16',2,NULL,1,'Jose Jesus Hernandez Orozco',10),(3,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,3,'Jose Jesus Hernandez Orozco',10),(4,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,4,'Jose Jesus Hernandez Orozco',10),(5,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,5,'Jose Jesus Hernandez Orozco',10),(6,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,6,'Jose Jesus Hernandez Orozco',10),(7,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,7,'Jose Jesus Hernandez Orozco',10),(8,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,8,'Jose Jesus Hernandez Orozco',10),(9,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,9,'Jose Jesus Hernandez Orozco',10),(10,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,10,'Jose Jesus Hernandez Orozco',10),(11,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,11,'Jose Jesus Hernandez Orozco',10),(12,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,12,'Jose Jesus Hernandez Orozco',10),(13,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,13,'Jose Jesus Hernandez Orozco',10),(14,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,14,'Jose Jesus Hernandez Orozco',10),(15,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,15,'Jose Jesus Hernandez Orozco',10),(16,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,16,'Jose Jesus Hernandez Orozco',10),(17,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,17,'Jose Jesus Hernandez Orozco',10),(18,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,18,'Jose Jesus Hernandez Orozco',10),(19,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,19,'Jose Jesus Hernandez Orozco',10),(20,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,20,'Jose Jesus Hernandez Orozco',10),(21,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,21,'Jose Jesus Hernandez Orozco',10),(22,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,22,'Jose Jesus Hernandez Orozco',10),(23,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,23,'Jose Jesus Hernandez Orozco',10),(24,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,24,'Jose Jesus Hernandez Orozco',10),(25,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,25,'Jose Jesus Hernandez Orozco',10),(26,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,26,'Jose Jesus Hernandez Orozco',10),(27,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,27,'Jose Jesus Hernandez Orozco',10),(28,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,28,'Jose Jesus Hernandez Orozco',10),(29,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,29,'Jose Jesus Hernandez Orozco',10),(30,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,30,'Jose Jesus Hernandez Orozco',10),(31,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,31,'Jose Jesus Hernandez Orozco',10),(32,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,32,'Jose Jesus Hernandez Orozco',10),(33,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,33,'Jose Jesus Hernandez Orozco',10),(34,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,34,'Jose Jesus Hernandez Orozco',10),(35,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,35,'Jose Jesus Hernandez Orozco',10),(36,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,36,'Jose Jesus Hernandez Orozco',10),(37,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,37,'Jose Jesus Hernandez Orozco',10),(38,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,38,'Jose Jesus Hernandez Orozco',10),(39,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,39,'Jose Jesus Hernandez Orozco',10),(40,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,40,'Jose Jesus Hernandez Orozco',10),(41,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,41,'Jose Jesus Hernandez Orozco',10),(42,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,42,'Jose Jesus Hernandez Orozco',10),(43,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,43,'Jose Jesus Hernandez Orozco',10),(44,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,44,'Jose Jesus Hernandez Orozco',10),(45,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,45,'Jose Jesus Hernandez Orozco',10),(46,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,46,'Jose Jesus Hernandez Orozco',10),(47,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,47,'Jose Jesus Hernandez Orozco',10),(48,'Resumen d','Conclusión de ',1,'2023-11-16',1,NULL,48,'Jose Jesus Hernandez Orozco',10);
/*!40000 ALTER TABLE `asesorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `catalogo_requisitos`
--

DROP TABLE IF EXISTS `catalogo_requisitos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `catalogo_requisitos` (
  `id_catalogo` int NOT NULL AUTO_INCREMENT,
  `descripcion_catalogo` varchar(75) NOT NULL,
  PRIMARY KEY (`id_catalogo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalogo_requisitos`
--

LOCK TABLES `catalogo_requisitos` WRITE;
/*!40000 ALTER TABLE `catalogo_requisitos` DISABLE KEYS */;
INSERT INTO `catalogo_requisitos` VALUES (1,'Requisitos'),(2,'Carta compromiso'),(3,'Citatorio');
/*!40000 ALTER TABLE `catalogo_requisitos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `defensores`
--

DROP TABLE IF EXISTS `defensores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `defensores` (
  `id_defensor` int NOT NULL AUTO_INCREMENT,
  `nombre_defensor` varchar(100) NOT NULL,
  PRIMARY KEY (`id_defensor`),
  CONSTRAINT `fk_defesor_empleado` FOREIGN KEY (`id_defensor`) REFERENCES `empleados` (`id_empleado`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `defensores`
--

LOCK TABLES `defensores` WRITE;
/*!40000 ALTER TABLE `defensores` DISABLE KEYS */;
INSERT INTO `defensores` VALUES (2,'Juan Marin Miranda');
/*!40000 ALTER TABLE `defensores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_asesorias_catalogos`
--

DROP TABLE IF EXISTS `detalle_asesorias_catalogos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_asesorias_catalogos` (
  `id_asesoria` int NOT NULL,
  `id_catalogo` int NOT NULL,
  `id_detalle` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id_detalle`),
  KEY `fk_detalle_asesoria_idx` (`id_asesoria`),
  KEY `fk_detalle_catalogo_idx` (`id_catalogo`),
  CONSTRAINT `fk_detalle_asesoria` FOREIGN KEY (`id_asesoria`) REFERENCES `asesorias` (`id_asesoria`),
  CONSTRAINT `fk_detalle_catalogo` FOREIGN KEY (`id_catalogo`) REFERENCES `catalogo_requisitos` (`id_catalogo`)
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_asesorias_catalogos`
--

LOCK TABLES `detalle_asesorias_catalogos` WRITE;
/*!40000 ALTER TABLE `detalle_asesorias_catalogos` DISABLE KEYS */;
INSERT INTO `detalle_asesorias_catalogos` VALUES (1,1,1),(1,2,2),(1,3,3),(3,1,7),(3,2,8),(3,3,9),(4,1,10),(4,2,11),(4,3,12),(5,1,13),(5,2,14),(5,3,15),(6,1,16),(6,2,17),(6,3,18),(7,1,19),(7,2,20),(7,3,21),(8,1,22),(8,2,23),(8,3,24),(9,1,25),(9,2,26),(9,3,27),(10,1,28),(10,2,29),(10,3,30),(11,1,31),(11,2,32),(11,3,33),(12,1,34),(12,2,35),(12,3,36),(13,1,37),(13,2,38),(13,3,39),(14,1,40),(14,2,41),(14,3,42),(15,1,43),(15,2,44),(15,3,45),(16,1,46),(16,2,47),(16,3,48),(17,1,49),(17,2,50),(17,3,51),(18,1,52),(18,2,53),(18,3,54),(19,1,55),(19,2,56),(19,3,57),(20,1,58),(20,2,59),(20,3,60),(21,1,61),(21,2,62),(21,3,63),(22,1,64),(22,2,65),(22,3,66),(23,1,67),(23,2,68),(23,3,69),(24,1,70),(24,2,71),(24,3,72),(25,1,73),(25,2,74),(25,3,75),(26,1,76),(26,2,77),(26,3,78),(27,1,79),(27,2,80),(27,3,81),(28,1,82),(28,2,83),(28,3,84),(29,1,85),(29,2,86),(29,3,87),(30,1,88),(30,2,89),(30,3,90),(31,1,91),(31,2,92),(31,3,93),(32,1,94),(32,2,95),(32,3,96),(33,1,97),(33,2,98),(33,3,99),(34,1,100),(34,2,101),(34,3,102),(35,1,103),(35,2,104),(35,3,105),(36,1,106),(36,2,107),(36,3,108),(37,1,109),(37,2,110),(37,3,111),(38,1,112),(38,2,113),(38,3,114),(39,1,115),(39,2,116),(39,3,117),(40,1,118),(40,2,119),(40,3,120),(41,1,121),(41,2,122),(41,3,123),(42,1,124),(42,2,125),(42,3,126),(43,1,127),(43,2,128),(43,3,129),(44,1,130),(44,2,131),(44,3,132),(45,1,133),(45,2,134),(45,3,135),(46,1,136),(46,2,137),(46,3,138),(47,1,139),(47,2,140),(47,3,141),(48,1,142),(48,2,143),(48,3,144);
/*!40000 ALTER TABLE `detalle_asesorias_catalogos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `distritos_judiciales`
--

DROP TABLE IF EXISTS `distritos_judiciales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `distritos_judiciales` (
  `id_distrito_judicial` int NOT NULL AUTO_INCREMENT,
  `nombre_distrito_judicial` varchar(100) NOT NULL,
  `id_zona` int NOT NULL,
  `id_municipio_distrito` int NOT NULL,
  PRIMARY KEY (`id_distrito_judicial`),
  KEY `fk_distrito_judicial_zona_idx` (`id_zona`),
  KEY `fk_distritito_judicial_municipio_distrito_idx` (`id_municipio_distrito`),
  CONSTRAINT `fk_distritito_judicial_municipio_distrito` FOREIGN KEY (`id_municipio_distrito`) REFERENCES `municipios_distritos` (`id_municipio_distrito`),
  CONSTRAINT `fk_distrito_judicial_zona` FOREIGN KEY (`id_zona`) REFERENCES `zonas` (`id_zona`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `distritos_judiciales`
--

LOCK TABLES `distritos_judiciales` WRITE;
/*!40000 ALTER TABLE `distritos_judiciales` DISABLE KEYS */;
INSERT INTO `distritos_judiciales` VALUES (1,'Distrito Judicial de Alamos',3,60),(2,'Distrito Judicial de Agua Prieta',1,41),(3,'Distrito Judicial de Altar',1,80),(4,'Distrito Judicial de Cajeme',3,251),(5,'Distrito Judicial de Cananea',1,270),(6,'Distrito Judicial de Guaymas',3,660),(7,'Distrito Judicial de Hermosillo',2,674),(8,'Distrito Judicial de Huatabampo',3,706),(9,'Distrito Judicial de Magdalena',1,950),(10,'Distrito Judicial de Moctezuma',2,1056),(11,'Distrito Judicial de Navojoa',3,1103),(12,'Distrito Judicial de Nogales',1,1117),(13,'Distrito Judicial de Puerto Peñasco',1,1253),(14,'Distrito Judicial de San Luis Rio Colorado',1,1550),(15,'Distrito Judicial de Sahuaripa',1,1304),(16,'Distrito Judicial de Ures',1,2295);
/*!40000 ALTER TABLE `distritos_judiciales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `domicilios`
--

DROP TABLE IF EXISTS `domicilios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `domicilios` (
  `id_domicilio` int NOT NULL AUTO_INCREMENT,
  `calle_domicilio` varchar(75) NOT NULL,
  `numero_exterior_domicilio` varchar(25) DEFAULT NULL,
  `numero_interior_domicilio` varchar(25) DEFAULT NULL,
  `id_colonia` int NOT NULL,
  PRIMARY KEY (`id_domicilio`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `domicilios`
--

LOCK TABLES `domicilios` WRITE;
/*!40000 ALTER TABLE `domicilios` DISABLE KEYS */;
INSERT INTO `domicilios` VALUES (1,'Los Cabos','12','',54091),(2,'Los Cabos','12','',54091),(3,'Los Cabos','12','',54091),(4,'Los Cabos','12','',54091),(5,'Los Cabos','12','',54091),(6,'Los Cabos','12','',54091),(7,'Los Cabos','12','',54091),(8,'Los Cabos','12','',54091),(9,'Los Cabos','12','',54091),(10,'Los Cabos','12','',54091),(11,'Los Cabos','12','',54091),(12,'Los Cabos','12','',54091),(13,'Los Cabos','12','',54091),(14,'Los Cabos','12','',54091),(15,'Los Cabos','12','',54091),(16,'Los Cabos','12','',54091),(17,'Los Cabos','12','',54091),(18,'Los Cabos','12','',54091),(19,'Los Cabos','12','',54091),(20,'Los Cabos','12','',54091),(21,'Los Cabos','12','',54091),(22,'Los Cabos','12','',54091),(23,'Los Cabos','12','',54091),(24,'Los Cabos','12','',54091),(25,'Los Cabos','12','',54091),(26,'Los Cabos','12','',54091),(27,'Los Cabos','12','',54091),(28,'Los Cabos','12','',54091),(29,'Los Cabos','12','',54091),(30,'Los Cabos','12','',54091),(31,'Los Cabos','12','',54091),(32,'Los Cabos','12','',54091),(33,'Los Cabos','12','',54091),(34,'Los Cabos','12','',54091),(35,'Los Cabos','12','',54091),(36,'Los Cabos','12','',54091),(37,'Los Cabos','12','',54091),(38,'Los Cabos','12','',54091),(39,'Los Cabos','12','',54091),(40,'Los Cabos','12','',54091),(41,'Los Cabos','12','',54091),(42,'Los Cabos','12','',54091),(43,'Los Cabos','12','',54091),(44,'Los Cabos','12','',54091),(45,'Los Cabos','12','',54091),(46,'Los Cabos','12','',54091),(47,'Los Cabos','12','',54091),(48,'Los Cabos','12','',54091);
/*!40000 ALTER TABLE `domicilios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleados`
--

DROP TABLE IF EXISTS `empleados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleados` (
  `id_empleado` int NOT NULL AUTO_INCREMENT,
  `tipo_empleado` varchar(100) NOT NULL,
  `id_distrito_judicial` int NOT NULL,
  PRIMARY KEY (`id_empleado`),
  KEY `fk_empleado_distrito_judicial_idx` (`id_distrito_judicial`),
  CONSTRAINT `fk_empleado_distrito_judicial` FOREIGN KEY (`id_distrito_judicial`) REFERENCES `distritos_judiciales` (`id_distrito_judicial`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleados`
--

LOCK TABLES `empleados` WRITE;
/*!40000 ALTER TABLE `empleados` DISABLE KEYS */;
INSERT INTO `empleados` VALUES (1,'asesor',4),(2,'defensor',4);
/*!40000 ALTER TABLE `empleados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estados_civiles`
--

DROP TABLE IF EXISTS `estados_civiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estados_civiles` (
  `id_estado_civil` int NOT NULL AUTO_INCREMENT,
  `estado_civil` varchar(50) NOT NULL,
  PRIMARY KEY (`id_estado_civil`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estados_civiles`
--

LOCK TABLES `estados_civiles` WRITE;
/*!40000 ALTER TABLE `estados_civiles` DISABLE KEYS */;
INSERT INTO `estados_civiles` VALUES (1,'Soltero(a)'),(2,'Casado(a)'),(3,'Unión Libre'),(4,'Separado(a)'),(5,'Divorciado(a)'),(6,'Viudo(a)');
/*!40000 ALTER TABLE `estados_civiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `generos`
--

DROP TABLE IF EXISTS `generos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `generos` (
  `id_genero` int NOT NULL AUTO_INCREMENT,
  `descripcion_genero` varchar(25) NOT NULL,
  PRIMARY KEY (`id_genero`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `generos`
--

LOCK TABLES `generos` WRITE;
/*!40000 ALTER TABLE `generos` DISABLE KEYS */;
INSERT INTO `generos` VALUES (1,'Masculino'),(2,'Femenino'),(3,'No Binario');
/*!40000 ALTER TABLE `generos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motivos`
--

DROP TABLE IF EXISTS `motivos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `motivos` (
  `id_motivo` int NOT NULL AUTO_INCREMENT,
  `descripcion_motivo` varchar(75) NOT NULL,
  PRIMARY KEY (`id_motivo`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motivos`
--

LOCK TABLES `motivos` WRITE;
/*!40000 ALTER TABLE `motivos` DISABLE KEYS */;
INSERT INTO `motivos` VALUES (1,'Discapacidad o enfermedad'),(2,'Ama de casa'),(3,'En busca de empleo'),(4,'Pensionado(a)');
/*!40000 ALTER TABLE `motivos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `municipios_distritos`
--

DROP TABLE IF EXISTS `municipios_distritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `municipios_distritos` (
  `id_municipio_distrito` int NOT NULL,
  `nombre_municipio` varchar(100) NOT NULL,
  `id_distrito_judicial` int NOT NULL,
  PRIMARY KEY (`id_municipio_distrito`),
  KEY `fk_municipio_distrito_distrito_judicial_idx` (`id_distrito_judicial`),
  CONSTRAINT `fk_municipio_distrito_distrito_judicial` FOREIGN KEY (`id_distrito_judicial`) REFERENCES `distritos_judiciales` (`id_distrito_judicial`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `municipios_distritos`
--

LOCK TABLES `municipios_distritos` WRITE;
/*!40000 ALTER TABLE `municipios_distritos` DISABLE KEYS */;
INSERT INTO `municipios_distritos` VALUES (29,'Aconchi',16),(41,'Agua Prieta',2),(60,'Álamos',1),(80,'Altar',3),(134,'Arivechi',15),(135,'Arizpe',5),(159,'Atil',3),(204,'Bacadéhuachi',10),(206,'Bacanora',15),(207,'Bacerac',2),(209,'Bacoachi',5),(210,'Bácum',4),(215,'Banámichi',16),(218,'Baviácora',16),(219,'Bavispe',2),(226,'Benito Juárez',8),(230,'Benjamín Hill',9),(246,'Caborca',3),(251,'Cajeme',4),(270,'Cananea',5),(285,'Carbó',7),(505,'Cucurpe',9),(516,'Cumpas',10),(528,'Divisaderos',10),(585,'Empalme',6),(600,'Etchojoa',8),(616,'Fronteras',2),(631,'General Plutarco Elías Calles',13),(643,'Granados',10),(660,'Guaymas',6),(674,'Hermosillo',7),(694,'Huachinera',2),(704,'Huásabas',10),(706,'Huatabampo',8),(727,'Huépac',16),(757,'Imuris',9),(882,'La Colorada',7),(950,'Magdalena',9),(1001,'Mazatán',7),(1056,'Moctezuma',10),(1085,'Naco',5),(1086,'Nácori Chico',10),(1087,'Nacozari de García',10),(1103,'Navojoa',11),(1117,'Nogales',12),(1160,'Ónavas',7),(1162,'Opodepe',16),(1163,'Oquitoa',3),(1232,'Pitiquito',3),(1253,'Puerto Peñasco',13),(1266,'Quiriego',11),(1276,'Rayón',16),(1297,'Rosario',4),(1304,'Sahuaripa',15),(1396,'San Felipe de Jesús',16),(1434,'San Ignacio Río Muerto',4),(1440,'San Javier',7),(1550,'San Luis Río Colorado',14),(1592,'San Miguel de Horcasitas',7),(1645,'San Pedro de la Cueva',16),(1712,'Santa Ana',9),(1744,'Santa Cruz',12),(1929,'Sáric',3),(1963,'Soyopa',7),(1964,'Suaqui Grande',7),(2085,'Tepache',10),(2255,'Trincheras',3),(2258,'Tubutama',3),(2295,'Ures',16),(2355,'Villa Hidalgo',10),(2359,'Villa Pesqueira',16),(2413,'Yécora',15);
/*!40000 ALTER TABLE `municipios_distritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personas`
--

DROP TABLE IF EXISTS `personas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personas` (
  `id_persona` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido_materno` varchar(50) NOT NULL,
  `apellido_paterno` varchar(50) NOT NULL,
  `edad` int NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `id_domicilio` int NOT NULL,
  `id_genero` int NOT NULL,
  PRIMARY KEY (`id_persona`),
  KEY `fk_domicilio_idx` (`id_domicilio`),
  KEY `fk_genero_idx` (`id_genero`),
  CONSTRAINT `fk_domicilio_persona` FOREIGN KEY (`id_domicilio`) REFERENCES `domicilios` (`id_domicilio`),
  CONSTRAINT `fk_genero_persona` FOREIGN KEY (`id_genero`) REFERENCES `generos` (`id_genero`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personas`
--

LOCK TABLES `personas` WRITE;
/*!40000 ALTER TABLE `personas` DISABLE KEYS */;
INSERT INTO `personas` VALUES (1,'Jose','Mendivil G','Orozco',21,'1231231232',1,1),(2,'Jose','Mendivil','Orozco',21,'1231231232',2,1),(3,'Jose','Mendivil','Orozco',21,'1231231232',3,1),(4,'Jose','Mendivil','Orozco',21,'1231231232',4,1),(5,'Jose','Mendivil','Orozco',21,'1231231232',5,1),(6,'Jose','Mendivil','Orozco',21,'1231231232',6,1),(7,'Jose','Mendivil','Orozco',21,'1231231232',7,1),(8,'Jose','Mendivil','Orozco',21,'1231231232',8,1),(9,'Jose','Mendivil','Orozco',21,'1231231232',9,1),(10,'Jose','Mendivil H','Orozco',21,'1231231232',10,1),(11,'Jose','Mendivil','Orozco',21,'1231231232',11,1),(12,'Jose','Mendivil','Orozco',21,'1231231232',12,1),(13,'Jose','Mendivil','Orozco',21,'1231231232',13,1),(14,'Jose','Mendivil','Orozco',21,'1231231232',14,1),(15,'Jose','Mendivil','Orozco',21,'1231231232',15,1),(16,'Jose','Mendivil','Orozco',21,'1231231232',16,1),(17,'Jose','Mendivil','Orozco',21,'1231231232',17,1),(18,'Jose','Mendivil','Orozco',21,'1231231232',18,1),(19,'Jose','Mendivil','Orozco',21,'1231231232',19,1),(20,'Jose','Mendivil','Orozco',21,'1231231232',20,1),(21,'Jose','Mendivil','Orozco',21,'1231231232',21,1),(22,'Jose','Mendivil','Orozco',21,'1231231232',22,1),(23,'Jose','Mendivil','Orozco',21,'1231231232',23,1),(24,'Jose','Mendivil','Orozco',21,'1231231232',24,1),(25,'Jose','Mendivil','Orozco',21,'1231231232',25,1),(26,'Jose','Mendivil','Orozco',21,'1231231232',26,1),(27,'Jose','Mendivil','Orozco',21,'1231231232',27,1),(28,'Jose','Mendivil','Orozco',21,'1231231232',28,1),(29,'Jose','Mendivil','Orozco',21,'1231231232',29,1),(30,'Jose','Mendivil','Orozco',21,'1231231232',30,1),(31,'Jose','Mendivil','Orozco',21,'1231231232',31,1),(32,'Jose','Mendivil','Orozco',21,'1231231232',32,1),(33,'Jose','Mendivil','Orozco',21,'1231231232',33,1),(34,'Jose','Mendivil','Orozco',21,'1231231232',34,1),(35,'Jose','Mendivil','Orozco',21,'1231231232',35,1),(36,'Jose','Mendivil','Orozco',21,'1231231232',36,1),(37,'Jose','Mendivil','Orozco',21,'1231231232',37,1),(38,'Jose','Mendivil','Orozco',21,'1231231232',38,1),(39,'Jose','Mendivil','Orozco',21,'1231231232',39,1),(40,'Jose','Mendivil','Orozco',21,'1231231232',40,1),(41,'Jose','Mendivil','Orozco',21,'1231231232',41,1),(42,'Jose','Mendivil','Orozco',21,'1231231232',42,1),(43,'Jose','Mendivil','Orozco',21,'1231231232',43,1),(44,'Jose','Mendivil','Orozco',21,'1231231232',44,1),(45,'Jose','Mendivil','Orozco',21,'1231231232',45,1),(46,'Jose','Mendivil','Orozco',21,'1231231232',46,1),(47,'Jose','Mendivil','Orozco',21,'1231231232',47,1),(48,'Jose','Mendivil A','Orozco',21,'1231231232',48,1);
/*!40000 ALTER TABLE `personas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipos_juicios`
--

DROP TABLE IF EXISTS `tipos_juicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_juicios` (
  `id_tipo_juicio` int NOT NULL AUTO_INCREMENT,
  `tipo_juicio` varchar(100) NOT NULL,
  PRIMARY KEY (`id_tipo_juicio`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipos_juicios`
--

LOCK TABLES `tipos_juicios` WRITE;
/*!40000 ALTER TABLE `tipos_juicios` DISABLE KEYS */;
INSERT INTO `tipos_juicios` VALUES (1,'Divorcio Incausado'),(2,'Divorcio Voluntario'),(3,'J. Vol de Acred. de Hechos de Concubinato'),(4,'J. Vol de Convenio Judicial (Pensión y Convivencia)'),(5,'J. Vol. Acred. Hechos de Defunción'),(6,'J. Vol. Acred. Hechos de Dep. Económica'),(7,'J. Vol. Acred. Hechos de Nacimiento'),(8,'J. Vol. de Cancelación de Pensión'),(9,'J. Vol. de Consignación de Pensión'),(10,'Nulidad de Acta de Nacimiento'),(11,'Oral Cuestiones Familiares (Convivencia)'),(12,'Oral de Alimentos'),(13,'Sucesorio Intestamentario'),(14,'Sucesorio Testamentario');
/*!40000 ALTER TABLE `tipos_juicios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turnos`
--

DROP TABLE IF EXISTS `turnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `turnos` (
  `id_turno` int NOT NULL AUTO_INCREMENT,
  `fecha_turno` date NOT NULL,
  `hora_turno` time NOT NULL,
  PRIMARY KEY (`id_turno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turnos`
--

LOCK TABLES `turnos` WRITE;
/*!40000 ALTER TABLE `turnos` DISABLE KEYS */;
/*!40000 ALTER TABLE `turnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zonas`
--

DROP TABLE IF EXISTS `zonas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zonas` (
  `id_zona` int NOT NULL AUTO_INCREMENT,
  `nombre_zona` varchar(50) NOT NULL,
  PRIMARY KEY (`id_zona`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zonas`
--

LOCK TABLES `zonas` WRITE;
/*!40000 ALTER TABLE `zonas` DISABLE KEYS */;
INSERT INTO `zonas` VALUES (1,'NORTE'),(2,'CENTRO'),(3,'SUR');
/*!40000 ALTER TABLE `zonas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-15  0:23:03
