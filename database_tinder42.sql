-- MySQL dump 10.13  Distrib 5.7.22, for osx10.12 (x86_64)
--
-- Host: localhost    Database: Matcha
-- ------------------------------------------------------
-- Server version	5.7.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `password` varchar(200) NOT NULL,
  `mail` varchar(30) NOT NULL,
  `photo` varchar(30) DEFAULT NULL,
  `notif_read` tinyint(1) DEFAULT '0',
  `randomKey` varchar(15) NOT NULL,
  `activate` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'Ugo','u0','u@u.uu',NULL,0,'u',0),(2,'Alice','a0','a@a.aa',NULL,0,'a',0),(5,'test','tttttt','t@t.tt',NULL,0,'Vo54TsEUwP45ncS',0),(6,'test','tttttt','t@t.tt',NULL,0,'cTopYZ26YcpsdIG',0),(7,'d','$2b$10$Rv4IH.q39qZYgWqi8GLmrOOkDqPn2.MT3GoU0o4NJEz03T2DZjKqy','a@sharklasers.com',NULL,0,'YsnhwqCwqB9APVY',0),(8,'gertrude','$2b$10$wCHqzLs1Oti.62ega4GQxe/iHwMR24tpt37Kqqi/xHCdvFKaMaKUK','g@g.gg',NULL,0,'lINsWMOK8EfLwfO',0),(9,'ttest','$2b$10$sG.KTokKiYCnEEcbSMz5rurIZEa0vsLpP3cBsKhXQosdxfDlmYIa.','tt@t.tt',NULL,0,'nFA9Fx9ykbxIIeV',0),(10,'w','$2b$10$kSAPo.9uHI8ipirjLVWGm.NbqUPW8L1vq4LuJ1IXb5hURR6uRNC7q','w@w.ww',NULL,0,'DLIosehkHwQvAfe',0),(11,'undefined','undefined','undefined',NULL,0,'lK7EC6eQ5Ii76d0',0),(12,'undefined','undefined','undefined',NULL,0,'EARsDLcvnxZgBKF',0),(13,'undefined','undefined','undefined',NULL,0,'JX8Xc3B27UXKS3e',0),(14,'undefined','undefined','undefined',NULL,0,'Umtx4ib7hADG7dp',0),(15,'this.state.valueUsername','$2b$10$Yr0AmmvmWluRwYZDD.J0CO5Srwv.GWhXwYAeE6kfZlDn4PrKH8S1a','this.state.valueMail',NULL,0,'5UQYiC6HnRV4nY8',0),(16,'oooo','$2b$10$77S/2txJqCpPcrGtaFg0Y.xgEemjzrJQoImk39a78GVd4sRiDWnPW','o@o.oo',NULL,0,'sweRm7FPtAReBKv',0),(17,'undefined','undefined','undefined',NULL,0,'gEJjjgdk0KQE5BS',0),(18,'vv','$2b$10$3vtcrPwhPcp01yN5qBtWs.iK0kl2sK.bWHlO5uZAC1E7hYvgy84Za','v@v.vv',NULL,0,'LiMPfZTsZLJJSby',0),(19,'iii','$2b$10$cRw1pWjutEEIWyVlHkN6tOi10oBw34/cJyYaaJ7N0hHXGjammcBnu','i@ii.iii',NULL,0,'vIIWj74ookFmvHZ',0),(20,'i','$2b$10$DmqHv5tuuyhmnj6EBydU8.XaCH1xtEqHROEodPVMsjlO0.8cAKdNO','i@iiii.iii',NULL,0,'nfMxaFZYzB4FfeW',0),(21,'o','$2b$10$ZGF46ivhSqxgatu8eV5gN.SlSxdl7vmWRF27.t96q6mn.kzMh6dxG','oo@oo.oo',NULL,0,'eQbZKArUSqH6iVq',0),(22,'h','$2b$10$jcZDVs8TcK.s2yBkcU.4ku9d2TaD2LETRtJyBrEYJEB6ifBlx0wQW','h@h.hh',NULL,0,'bJSuJNePYhLmI4P',0),(23,'wdw','$2b$10$wnvc394eXEx7aFr.i6tNwe.ok0EdUg43U2VFAyrqEEQgCalOJfnNy','few@dw.dwe',NULL,0,'kt4mk1sDPheawUZ',0),(24,'wdw','$2b$10$FbeQSTZjF7W3jHy9ZBX6quqvSb8FTdb83xwCIEAz5wgA8g30LWE9u','few@dw.dwe',NULL,0,'eaeBS1dsuEuHBPy',0),(25,'wdw','$2b$10$qwcT2LOC/Ic/zwhl68R7serztjqpl6K6d7FmT9QtRfyJJihTKDyz2','few@dw.dwe',NULL,0,'A7eMDSVqSrEW7kZ',0),(26,'wdw','$2b$10$UlfJUqABUIeDQI3gcZrL0.MbSshXSp2DU/53LlRy.pbuYPyvhbQW6','few@dw.dwe',NULL,0,'lzNCRr76FoEM7Xj',0),(27,'njkn','$2b$10$dZLWvy.gzmzu73NO2UAWru7IeAfpjNTmCqGt9O4/J0fuoHnxsYF.6','hiu@jl.jn',NULL,0,'jfEwr4XJDqLldbZ',0),(28,'njkn','$2b$10$TrTlOFJoZPmgcbwFwGTi9e26pDOXRi9/GZrqu1AitOW4bEMZXaYTm','hiu@jl.jn',NULL,0,'m7wkm1xGwrjBPFq',0),(29,'smwd','$2b$10$ZDqz0.Lv1b3IU.NGBy5HgeyssHtLKq5wTX32Na4rDIXOag6OKef12','few@dw.fwe',NULL,0,'l8Sd2w1xJfwsykq',0),(30,'dewf','$2b$10$TnfCCkC8eYAm/w2K6NFqH.u3i71Pj4vF2aGbK7L4mJPbaU5VICRV6','dew@dwe.dw',NULL,0,'3D5OhLfRNuLNwV8',0),(31,'few','$2b$10$r5eakd0Xau9LtFlpp/923O0DYxJOQud3JP3vZbv8vdVntSVj6Ibzi','fw@dw.dw',NULL,0,'hGbDIX9yqOyrQSr',0),(32,'fewfe','$2b$10$8mb.8AQJSGUYTluA1IAjKe15sRfLSuDPTJUK2Zr4qHW93YQJZbWJu','ve@dew.dew',NULL,0,'LuEFMCm73BHGQWe',0),(33,'fefe','$2b$10$/y5vcLbd/RjWMDTSpYiguOTuciITjkIp5WBa8xYv7uGi4My50s6.W','fwfe@dewf.fwef',NULL,0,'o10uKeQW8MIstkl',0),(34,'camarche','$2b$10$8vyXzOt5Yb.9PEdJNFihLuClBRpY7/NctG5SyN7ZBT2bIDhZMzcEC','ca@marche.com',NULL,0,'KtB183QfgLOhfAw',0),(35,'dsf','$2b$10$vNaHVDM/FvhHxdnw6DqYGe6Qs2.nv6r4UxpeSI3ZeagMAed5QEIIi','de@ded.de',NULL,0,'VZLDNdJQWzUfV78',0),(36,'dwef','$2b$10$ntYcUZHYPuFNQOZz8ewPjeGCQAOm1RZpnkiYxWOubkBL8ubnrxXAi','dwe@dwe.dwe',NULL,0,'mqdo8gXAuMf0kzR',0),(37,'dew','$2b$10$GvdVgbO7WYtUtnWGUbUpIeOPSaKxuPACqWPaSIdWQrkcEU0JkzR4y','fdw@dwe.dew',NULL,0,'IIWG8QIhCtgu2pt',0),(38,'dsaf','$2b$10$Zfi4/LJgb6UkxQK.k7Rrk.UAQnzuVcYLnPrhrQmpxOaAgyXnYc5iu','ds@dwe.da',NULL,0,'uqMQnoDOPiB8VJw',0),(39,'fdsfce','$2b$10$UC8XhFrLLVGBX/eCRTKJNOWmVyurPLAXHIg/jfJoxLLStPCS.YgEK','dwe@few.fsd',NULL,0,'5DepawuUlMXeVYn',0),(40,'dsfd','$2b$10$7Mz9j8/K9ditEFg1Fu8ZGuP5YeOh4LCUsRzxUzHlQTiNXBJ0wWQJW','fre@dwe.dwfd',NULL,0,'Ye921ClwcFUaQzS',0),(41,'dwd','$2b$10$AarvFVcw3/qzGpCVUmtvIuMpSIeMzabAVvCEze4zbVq3uja3zIC6W','we@dew.das',NULL,0,'hpZP5ntZjZNEzD3',0),(42,'dwkpoew','$2b$10$BK1LU4MaLALpvd7ZuSDRY.zT6QUdGqCwoWOJfBPmUWTnvqfzdpyly','dsa@dw.dwf',NULL,0,'wXP3ijbZFxnoEtN',0),(43,'nojn','$2b$10$gcif2oDqwGSIW/zc9p6pLuFtO2BpJ7kiOavSj/rGpp23rVr40NM8G','jkl@m.no',NULL,0,'yEii69H01xQjDPn',0),(44,'wqe','$2b$10$S1Otm7F4CKST7CrDnOKmc.BuML.EaoXYsicO4rxF2H7lNGRCNsYk6','xw@dwq.dwq',NULL,0,'s349J6N1cVi1Ifh',0),(45,'rrr','$2b$10$9REj5LaVzJP3qgUK8tA4ZO1F9a4ht/ML5YGAYTzGSSHNSW1rHDJp.','r@rr.rr',NULL,0,'B0Z7zCDJSGN0lnY',0),(46,'bhbibi','$2b$10$u9kMsuHKdLEdZcpVGNu3k./K.imKkrvVShaK7yKx30lNoqWarKSsW','njk@ghjb.hi',NULL,0,'nWHGaLcbBi4qLTs',0),(47,'jlj','$2b$10$1Ji8o/DnBOgqIXPPFg1ad.J4Y4ApleIRJeHl1xTmr0sz4pmc.Blhe','u@uuuu.uuuu',NULL,0,'Sh2dIzY0BmnMg8P',0),(48,'vweew','$2b$10$YLwb0yzZGTLHYCa8hhY4PeVK/t7.SVnQhOpRDGVqyoH.Zd.Xf/s4a','dewf@dewf.fdwde',NULL,0,'J5acca1zejrQcMs',0),(49,'cdf','$2b$10$JbeboOvA9l9xsKFOT0wcGu.n1WzbQsL.oG0nj6QtH9yEu887bKQE6','k@molk.cwef',NULL,0,'RLghOZuejrMrH6t',0),(50,'feferfre','$2b$10$PQOTCAAxCf/VStpy0S4L1ODbwlbAuY/vfCA4CQnA8djGpVqpMvGny','cce@efer.ferf',NULL,0,'nTI1a5Puhslv6EJ',0),(51,'ugof','$2b$10$PlPmFx89tildlah2qdgEyuQhFFZeT5AKmfuFyMzlS99o4UjDI3BNK','u@u.uuv',NULL,0,'lDz8nsQE8GEPKuL',0),(52,'vdsvds','$2b$10$5WG8X6kN1iaqtDj8rzMJDu52a/tbvq7v9lnnMsHZ7Quhbf3wUCZ2K','efcd@fewgfer.fsdge',NULL,0,'4kk7XlJVmBA1kaP',0),(53,'jdoiwefn','$2b$10$FcHQJjMoUSJ/LMsfPyzHEuKixYRTVpZ5SioJ4/jE4VeH6.043pz/e','ybu@hbi.fegfe',NULL,0,'HL2wsfR6VtH1NPD',0);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-12 17:12:03
