-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mydb
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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `reg_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'Antanas Berniokas','ontanis@hotmail.gg','$2b$10$GWAvXxFFFG14VIGNZ72Ffu6qeQrFUYOFFo6pkpF2vA0RXaPRPR8iC','2023-06-30 08:07:31'),(3,'John Doe','doe@hotmail.gg','$2b$10$JThGn1/DA3yM21xvBcQ.SuIQi0JQp2ah0lJuTW9n8g6iUKtzongSi','2023-06-30 13:46:15'),(4,'Alfredas Mazgonis','alfred@hotmail.gg','$2b$10$WVQr.zH.aszY9EzdKveJM.kHhOhy0N7EeYNI60mC0NkGeO/JEJjH6','2023-06-30 14:05:10'),(5,'Mantas Gulbys','mantas@gmail.com','$2b$10$VfEV8rW5AgtjHTaqr8wBMun1eV/l5AYI0/LNw7PxOmukGsC8o5J6.','2023-07-02 04:52:38'),(6,'Testas Testauskas','testas@gmail.com','$2b$10$RkBp.AmzLT/VEJQ16vY6uuqB3Pu0me4H1UurpzyUDeYQKI4KMsxSy','2023-07-02 05:00:36'),(7,'Testas Testauskas','testas@gmail.com','$2b$10$Fsatv4GslZZH7Sh.xotE7ekQZSXt.yB.qeGObV0u3I5LvXPO45YaC','2023-07-02 05:03:31'),(8,'Testas Testauskas','testas@gmail.com','$2b$10$iob.6V5olxf5XuXAhqguo.LnVQ11XngAVBs4ge20M/cYqH4r5BKm6','2023-07-02 05:07:03'),(9,'Don Carleone','don@hotmail.gg','$2b$10$J4pcoNmBnH4qLCsCRMbeoOIkzI/XWsW8x4CkaRp9WL4tJNxm9fbGG','2023-07-02 12:21:31'),(10,'Rio Ferdinand','rio@gmail.com','$2b$10$RZV.mxAg66cKf91iETutvuh7Hdf9E1Nld2Oiw0FHZb9T.CW5JwmbC','2023-07-02 12:40:19');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-03  8:23:02
