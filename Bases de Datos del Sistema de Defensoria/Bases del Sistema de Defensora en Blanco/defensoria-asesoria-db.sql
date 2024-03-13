CREATE DATABASE  IF NOT EXISTS `defensoria_asesorias` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `defensoria_asesorias`;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `catalogo_requisitos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `catalogo_requisitos` (
  `id_catalogo` int NOT NULL AUTO_INCREMENT,
  `descripcion_catalogo` varchar(75) NOT NULL,
  PRIMARY KEY (`id_catalogo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


LOCK TABLES `catalogo_requisitos` WRITE;
/*!40000 ALTER TABLE `catalogo_requisitos` DISABLE KEYS */;
INSERT INTO `catalogo_requisitos` VALUES (1,'Requisitos'),(2,'Carta compromiso'),(3,'Citatorio');
/*!40000 ALTER TABLE `catalogo_requisitos` ENABLE KEYS */;
UNLOCK TABLES;



DROP TABLE IF EXISTS `defensores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `defensores` (
  `id_defensor` int NOT NULL AUTO_INCREMENT,
  `nombre_defensor` varchar(100) NOT NULL,
  PRIMARY KEY (`id_defensor`),
  CONSTRAINT `fk_defesor_empleado` FOREIGN KEY (`id_defensor`) REFERENCES `empleados` (`id_empleado`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


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

LOCK TABLES `distritos_judiciales` WRITE;
/*!40000 ALTER TABLE `distritos_judiciales` DISABLE KEYS */;
INSERT INTO `distritos_judiciales` VALUES (1,'Distrito Judicial de Alamos',3,60),(2,'Distrito Judicial de Agua Prieta',1,41),(3,'Distrito Judicial de Altar',1,80),(4,'Distrito Judicial de Cajeme',3,251),(5,'Distrito Judicial de Cananea',1,270),(6,'Distrito Judicial de Guaymas',3,660),(7,'Distrito Judicial de Hermosillo',2,674),(8,'Distrito Judicial de Huatabampo',3,706),(9,'Distrito Judicial de Magdalena',1,950),(10,'Distrito Judicial de Moctezuma',2,1056),(11,'Distrito Judicial de Navojoa',3,1103),(12,'Distrito Judicial de Nogales',1,1117),(13,'Distrito Judicial de Puerto Peñasco',1,1253),(14,'Distrito Judicial de San Luis Rio Colorado',1,1550),(15,'Distrito Judicial de Sahuaripa',1,1304),(16,'Distrito Judicial de Ures',1,2295);
/*!40000 ALTER TABLE `distritos_judiciales` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;



DROP TABLE IF EXISTS `estados_civiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estados_civiles` (
  `id_estado_civil` int NOT NULL AUTO_INCREMENT,
  `estado_civil` varchar(50) NOT NULL,
  PRIMARY KEY (`id_estado_civil`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


LOCK TABLES `estados_civiles` WRITE;
/*!40000 ALTER TABLE `estados_civiles` DISABLE KEYS */;
INSERT INTO `estados_civiles` VALUES (1,'Soltero(a)'),(2,'Casado(a)'),(3,'Unión Libre'),(4,'Separado(a)'),(5,'Divorciado(a)'),(6,'Viudo(a)');
/*!40000 ALTER TABLE `estados_civiles` ENABLE KEYS */;
UNLOCK TABLES;


DROP TABLE IF EXISTS `generos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `generos` (
  `id_genero` int NOT NULL AUTO_INCREMENT,
  `descripcion_genero` varchar(25) NOT NULL,
  PRIMARY KEY (`id_genero`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;



LOCK TABLES `generos` WRITE;
/*!40000 ALTER TABLE `generos` DISABLE KEYS */;
INSERT INTO `generos` VALUES (1,'Masculino'),(2,'Femenino'),(3,'No Binario');
/*!40000 ALTER TABLE `generos` ENABLE KEYS */;
UNLOCK TABLES;


DROP TABLE IF EXISTS `motivos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `motivos` (
  `id_motivo` int NOT NULL AUTO_INCREMENT,
  `descripcion_motivo` varchar(75) NOT NULL,
  PRIMARY KEY (`id_motivo`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


LOCK TABLES `motivos` WRITE;
/*!40000 ALTER TABLE `motivos` DISABLE KEYS */;
INSERT INTO `motivos` VALUES (1,'Discapacidad o enfermedad'),(2,'Ama de casa'),(3,'En busca de empleo'),(4,'Pensionado(a)');
/*!40000 ALTER TABLE `motivos` ENABLE KEYS */;
UNLOCK TABLES;


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


LOCK TABLES `municipios_distritos` WRITE;
/*!40000 ALTER TABLE `municipios_distritos` DISABLE KEYS */;
INSERT INTO `municipios_distritos` VALUES (29,'Aconchi',16),(41,'Agua Prieta',2),(60,'Álamos',1),(80,'Altar',3),(134,'Arivechi',15),(135,'Arizpe',5),(159,'Atil',3),(204,'Bacadéhuachi',10),(206,'Bacanora',15),(207,'Bacerac',2),(209,'Bacoachi',5),(210,'Bácum',4),(215,'Banámichi',16),(218,'Baviácora',16),(219,'Bavispe',2),(226,'Benito Juárez',8),(230,'Benjamín Hill',9),(246,'Caborca',3),(251,'Cajeme',4),(270,'Cananea',5),(285,'Carbó',7),(505,'Cucurpe',9),(516,'Cumpas',10),(528,'Divisaderos',10),(585,'Empalme',6),(600,'Etchojoa',8),(616,'Fronteras',2),(631,'General Plutarco Elías Calles',13),(643,'Granados',10),(660,'Guaymas',6),(674,'Hermosillo',7),(694,'Huachinera',2),(704,'Huásabas',10),(706,'Huatabampo',8),(727,'Huépac',16),(757,'Imuris',9),(882,'La Colorada',7),(950,'Magdalena',9),(1001,'Mazatán',7),(1056,'Moctezuma',10),(1085,'Naco',5),(1086,'Nácori Chico',10),(1087,'Nacozari de García',10),(1103,'Navojoa',11),(1117,'Nogales',12),(1160,'Ónavas',7),(1162,'Opodepe',16),(1163,'Oquitoa',3),(1232,'Pitiquito',3),(1253,'Puerto Peñasco',13),(1266,'Quiriego',11),(1276,'Rayón',16),(1297,'Rosario',4),(1304,'Sahuaripa',15),(1396,'San Felipe de Jesús',16),(1434,'San Ignacio Río Muerto',4),(1440,'San Javier',7),(1550,'San Luis Río Colorado',14),(1592,'San Miguel de Horcasitas',7),(1645,'San Pedro de la Cueva',16),(1712,'Santa Ana',9),(1744,'Santa Cruz',12),(1929,'Sáric',3),(1963,'Soyopa',7),(1964,'Suaqui Grande',7),(2085,'Tepache',10),(2255,'Trincheras',3),(2258,'Tubutama',3),(2295,'Ures',16),(2355,'Villa Hidalgo',10),(2359,'Villa Pesqueira',16),(2413,'Yécora',15);
/*!40000 ALTER TABLE `municipios_distritos` ENABLE KEYS */;
UNLOCK TABLES;


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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `tipos_juicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipos_juicios` (
  `id_tipo_juicio` int NOT NULL AUTO_INCREMENT,
  `tipo_juicio` varchar(100) NOT NULL,
  PRIMARY KEY (`id_tipo_juicio`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `tipos_juicios` WRITE;
/*!40000 ALTER TABLE `tipos_juicios` DISABLE KEYS */;
INSERT INTO `tipos_juicios` VALUES (1,'Divorcio Incausado'),(2,'Divorcio Voluntario'),(3,'J. Vol de Acred. de Hechos de Concubinato'),(4,'J. Vol de Convenio Judicial (Pensión y Convivencia)'),(5,'J. Vol. Acred. Hechos de Defunción'),(6,'J. Vol. Acred. Hechos de Dep. Económica'),(7,'J. Vol. Acred. Hechos de Nacimiento'),(8,'J. Vol. de Cancelación de Pensión'),(9,'J. Vol. de Consignación de Pensión'),(10,'Nulidad de Acta de Nacimiento'),(11,'Oral Cuestiones Familiares (Convivencia)'),(12,'Oral de Alimentos'),(13,'Sucesorio Intestamentario'),(14,'Sucesorio Testamentario');
/*!40000 ALTER TABLE `tipos_juicios` ENABLE KEYS */;
UNLOCK TABLES;



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


DROP TABLE IF EXISTS `zonas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zonas` (
  `id_zona` int NOT NULL AUTO_INCREMENT,
  `nombre_zona` varchar(50) NOT NULL,
  PRIMARY KEY (`id_zona`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;



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

