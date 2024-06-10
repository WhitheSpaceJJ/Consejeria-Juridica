CREATE DATABASE  IF NOT EXISTS `defensoria_usuarios2` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `defensoria_usuarios2`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: defensoria_usuarios2
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `detalle_permiso_usuario`
--

DROP TABLE IF EXISTS `detalle_permiso_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_permiso_usuario` (
  `id_usuario` int NOT NULL,
  `id_permiso` int NOT NULL,
  `id_detalle_permiso` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id_detalle_permiso`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_permiso_usuario`
--

LOCK TABLES `detalle_permiso_usuario` WRITE;
/*!40000 ALTER TABLE `detalle_permiso_usuario` DISABLE KEYS */;
INSERT INTO `detalle_permiso_usuario` VALUES (1,1,1),(1,13,2),(2,1,3),(2,13,4),(3,1,5),(3,13,6),(4,1,7),(4,13,8),(5,1,9),(5,13,10),(6,1,11),(6,13,12),(7,1,13),(7,13,14),(8,1,15),(8,13,16),(9,1,17),(9,13,18),(10,1,19),(10,13,20),(11,1,21),(11,13,22),(12,1,23),(12,13,24),(27,1,55),(27,13,56);
/*!40000 ALTER TABLE `detalle_permiso_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permisos`
--

DROP TABLE IF EXISTS `permisos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permisos` (
  `id_permiso` int NOT NULL AUTO_INCREMENT,
  `nombre_permiso` varchar(50) NOT NULL,
  PRIMARY KEY (`id_permiso`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permisos`
--

LOCK TABLES `permisos` WRITE;
/*!40000 ALTER TABLE `permisos` DISABLE KEYS */;
INSERT INTO `permisos` VALUES (1,'ALL_SA'),(2,'AD_USUARIOS_SA'),(3,'AD_EMPLEADOS_SA'),(4,'AD_JUICIOS_SA'),(5,'AD_GENEROS_SA'),(6,'AD_ESTADOSCIVILES_SA'),(7,'AD_MOTIVOS_SA'),(8,'AD_CATALOGOREQUISITOS_SA'),(9,'CONSULTA_ASESORIA_SA'),(10,'REGISTRO_ASESORIA_SA'),(12,'TURNAR_ASESORIA_SA'),(13,'ALL_SD'),(14,'AD_ESCOLARIDAD_SD'),(15,'AD_ETNIA_SD'),(16,'AD_JUZGADO_SD'),(17,'AD_OCUPACION_SD'),(18,'CONSULTA_PROCESO_JUDICIAL_SD'),(19,'SEGUIMIENTO_PROCESO_JUDICIAL_SD'),(22,'REGISTRO_PROCESO_JUDICIAL_SD');
/*!40000 ALTER TABLE `permisos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_user`
--

DROP TABLE IF EXISTS `tipo_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_user` (
  `id_tipouser` int NOT NULL AUTO_INCREMENT,
  `tipo_usuario` varchar(45) NOT NULL,
  PRIMARY KEY (`id_tipouser`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_user`
--

LOCK TABLES `tipo_user` WRITE;
/*!40000 ALTER TABLE `tipo_user` DISABLE KEYS */;
INSERT INTO `tipo_user` VALUES (1,'supervisor'),(2,'asesor'),(3,'defensor'),(4,'general');
/*!40000 ALTER TABLE `tipo_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(200) NOT NULL,
  `password` varchar(65) NOT NULL,
  `id_tipouser` int NOT NULL,
  `id_distrito_judicial` int DEFAULT NULL,
  `estatus_general` enum('ACTIVO','INACTIVO') NOT NULL,
  `id_empleado` int DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  KEY `fk_tipo_user_idx` (`id_tipouser`),
  CONSTRAINT `fk_tipo_user` FOREIGN KEY (`id_tipouser`) REFERENCES `tipo_user` (`id_tipouser`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'DPS Usuario Uno','defensoria.testing.usuario1@gmail.com','$2b$10$sMNvquSguksaho9k35eqze6KgYN0EsyHUIXqvyqMHA0Z3iCSxejyG',1,1,'ACTIVO',NULL),(2,'DPS Usuario Dos','defensoria.testing.usuario2@gmail.com','$2b$10$7YC/phrWDkDfu7POtnasKuBJjE9ku.ayAW8lHtkDGpTUgfCAZfkbu',1,2,'ACTIVO',NULL),(3,'DPS Usuario Tres','defensoria.testing.usuario3@gmail.com','$2b$10$z8AMY5zqaXSo3uWkGJK2ruYo.xtqFWRnLS2re.ml0ErNc9ajhyjHy',1,3,'ACTIVO',NULL),(4,'DPS Usuario Cuatro','defensoria.testing.usuario4@gmail.com','$2b$10$hKhCZA75JOCIj0ZuVBfFjepsBt/g0tMZmzrOP6w.WFLiJ33RQHa3.',1,4,'ACTIVO',NULL),(5,'DPS Usuario Cinco','defensoria.testing.usuario5@gmail.com','$2b$10$zfg8dfz5EvU.WiQDUwfxWeqnJURw0CKIyyVTnwfsjRFuQlqqeF5a.',1,5,'ACTIVO',NULL),(6,'DPS Usuario Seis','defensoria.testing.usuario6@gmail.com','$2b$10$YSHT1BnLUX3T44.Mxyqz7OvVu0RiwRq9jtX0PeA17w4ds7KOeFcI.',1,6,'ACTIVO',NULL),(7,'DPS Usuario Siete','defensoria.testing.usuario7@gmail.com','$2b$10$oUdUm3X/OdCaJiArEeI3BexTSF0ZkeKPY0u3dnUhMWPfrvyLspVzC',1,7,'ACTIVO',NULL),(8,'DPS Usuario Ocho','defensoria.testing.usuario8@gmail.com','$2b$10$vUVlF.3WjSJF9VMY10VzIO5AAAZ.ZOHz0hjzOcAKEDoBjHYM/FY9G',1,8,'ACTIVO',NULL),(9,'DPS Usuario Nueve','defensoria.testing.usuario9@gmail.com','$2b$10$T0UI.ti9fHZlfeL0Ktv6yOyMC6bJiX7wspLTKnYmBK3XZ6qHLcNQK',1,9,'ACTIVO',NULL),(10,'DPS Usuario Diez','defensoria.testing.usuario10@gmail.com','$2b$10$zyCnZZbCeB.N6cnd5T5saOG2J2LO8Wu.8ZoDK/766hyPPCY/zMoSa',1,10,'ACTIVO',NULL),(11,'DPS Usuario Once','defensoria.testing.usuario11@gmail.com','$2b$10$iLamJYaekXOTvK6GHPO3H.yYJAtA/q.owVB3DiQHAAvR6yIA1wBhu',1,11,'ACTIVO',NULL),(12,'DPS Usuario Doce','defensoria.testing.usuario12@gmail.com','$2b$10$EgP4Ma8sIIABqc5kxPgwuOsriO.HNkH3syZCXQMSZ75g7lLj2tPoy',1,12,'ACTIVO',NULL),(27,'aaaaaaaaa','aaaaaa@gmail.com','$2b$10$rqM7e6nK76voSs2MZMkmJ.vvUw1F2Q6U/XlUgozRcEzVbq6bDifCi',1,10,'ACTIVO',NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-10 11:20:01
