CREATE DATABASE  IF NOT EXISTS `defensoria_usuarios` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `defensoria_usuarios`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: defensoria_usuarios
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
-- Table structure for table `tipo_user`
--

DROP TABLE IF EXISTS `tipo_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_user` (
  `id_tipouser` int NOT NULL AUTO_INCREMENT,
  `tipo_usuario` varchar(45) NOT NULL,
  PRIMARY KEY (`id_tipouser`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_user`
--

LOCK TABLES `tipo_user` WRITE;
/*!40000 ALTER TABLE `tipo_user` DISABLE KEYS */;
INSERT INTO `tipo_user` VALUES (1,'Supervisor'),(2,'Operador'),(3,'Administrador');
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
  `nombre` varchar(45) NOT NULL,
  `paterno` varchar(45) NOT NULL,
  `materno` varchar(45) NOT NULL,
  `correo` varchar(45) NOT NULL,
  `password` varchar(65) NOT NULL,
  `id_tipouser` int NOT NULL,
  `id_distrito_judicial` int NOT NULL,
  `estatus_general` enum('ACTIVO','INACTIVO') NOT NULL,
  PRIMARY KEY (`id_usuario`),
  KEY `fk_tipo_user_idx` (`id_tipouser`),
  CONSTRAINT `fk_tipo_user` FOREIGN KEY (`id_tipouser`) REFERENCES `tipo_user` (`id_tipouser`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'DPS','Usuario','Uno','defensoria.testing.usuario1@gmail.com','$2b$10$sMNvquSguksaho9k35eqze6KgYN0EsyHUIXqvyqMHA0Z3iCSxejyG',2,1,'ACTIVO'),(2,'DPS','Usuario','Dos','defensoria.testing.usuario2@gmail.com','$2b$10$7YC/phrWDkDfu7POtnasKuBJjE9ku.ayAW8lHtkDGpTUgfCAZfkbu',2,2,'ACTIVO'),(3,'DPS','Usuario','Tres','defensoria.testing.usuario3@gmail.com','$2b$10$z8AMY5zqaXSo3uWkGJK2ruYo.xtqFWRnLS2re.ml0ErNc9ajhyjHy',2,3,'ACTIVO'),(4,'DPS','Usuario','Cuatro','defensoria.testing.usuario4@gmail.com','$2b$10$hKhCZA75JOCIj0ZuVBfFjepsBt/g0tMZmzrOP6w.WFLiJ33RQHa3.',2,4,'ACTIVO'),(5,'DPS','Usuario','Cinco','defensoria.testing.usuario5@gmail.com','$2b$10$zfg8dfz5EvU.WiQDUwfxWeqnJURw0CKIyyVTnwfsjRFuQlqqeF5a.',2,5,'ACTIVO'),(6,'DPS','Usuario','Seis','defensoria.testing.usuario6@gmail.com','$2b$10$YSHT1BnLUX3T44.Mxyqz7OvVu0RiwRq9jtX0PeA17w4ds7KOeFcI.',2,6,'ACTIVO'),(7,'DPS','Usuario','Siete','defensoria.testing.usuario7@gmail.com','$2b$10$oUdUm3X/OdCaJiArEeI3BexTSF0ZkeKPY0u3dnUhMWPfrvyLspVzC',2,7,'ACTIVO'),(8,'DPS','Usuario','Ocho','defensoria.testing.usuario8@gmail.com','$2b$10$vUVlF.3WjSJF9VMY10VzIO5AAAZ.ZOHz0hjzOcAKEDoBjHYM/FY9G',2,8,'ACTIVO'),(9,'DPS','Usuario','Nueve','defensoria.testing.usuario9@gmail.com','$2b$10$T0UI.ti9fHZlfeL0Ktv6yOyMC6bJiX7wspLTKnYmBK3XZ6qHLcNQK',2,9,'ACTIVO'),(10,'DPS','Usuario','Diez','defensoria.testing.usuario10@gmail.com','$2b$10$zyCnZZbCeB.N6cnd5T5saOG2J2LO8Wu.8ZoDK/766hyPPCY/zMoSa',2,10,'ACTIVO'),(11,'DPS','Usuario','Once','defensoria.testing.usuario11@gmail.com','$2b$10$iLamJYaekXOTvK6GHPO3H.yYJAtA/q.owVB3DiQHAAvR6yIA1wBhu',2,11,'ACTIVO'),(12,'DPS','Usuario','Doce','defensoria.testing.usuario12@gmail.com','$2b$10$EgP4Ma8sIIABqc5kxPgwuOsriO.HNkH3syZCXQMSZ75g7lLj2tPoy',2,12,'ACTIVO');
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

-- Dump completed on 2024-03-04  2:38:57
