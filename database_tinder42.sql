-- MySQL dump 10.13  Distrib 5.7.21, for osx10.12 (x86_64)
--
-- Host: localhost    Database: Matcha
-- ------------------------------------------------------
-- Server version	5.7.21

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
-- Table structure for table `Chat`
--

DROP TABLE IF EXISTS `Chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Chat` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `match_id` int(10) unsigned NOT NULL,
  `sender_id` int(10) unsigned NOT NULL,
  `receiver_id` int(10) unsigned NOT NULL,
  `message` text,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `read_message` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `sender_id` (`sender_id`),
  KEY `receiver_id` (`receiver_id`),
  KEY `match_id` (`match_id`),
  CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `Users` (`id`),
  CONSTRAINT `chat_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `Users` (`id`),
  CONSTRAINT `chat_ibfk_3` FOREIGN KEY (`match_id`) REFERENCES `Matchs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1249 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Chat`
--

LOCK TABLES `Chat` WRITE;
/*!40000 ALTER TABLE `Chat` DISABLE KEYS */;
/*!40000 ALTER TABLE `Chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CheckedUsers`
--

DROP TABLE IF EXISTS `CheckedUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CheckedUsers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `checker_id` int(10) unsigned NOT NULL,
  `checked_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `checker_id` (`checker_id`),
  KEY `checked_id` (`checked_id`),
  CONSTRAINT `checkedusers_ibfk_1` FOREIGN KEY (`checker_id`) REFERENCES `Users` (`id`),
  CONSTRAINT `checkedusers_ibfk_2` FOREIGN KEY (`checked_id`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CheckedUsers`
--

LOCK TABLES `CheckedUsers` WRITE;
/*!40000 ALTER TABLE `CheckedUsers` DISABLE KEYS */;
/*!40000 ALTER TABLE `CheckedUsers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ConnectedUsers`
--

DROP TABLE IF EXISTS `ConnectedUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ConnectedUsers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user1` int(10) unsigned NOT NULL,
  `user2` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user1`),
  KEY `connected_id` (`user2`),
  CONSTRAINT `connectedusers_ibfk_1` FOREIGN KEY (`user1`) REFERENCES `Users` (`id`),
  CONSTRAINT `connectedusers_ibfk_2` FOREIGN KEY (`user2`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ConnectedUsers`
--

LOCK TABLES `ConnectedUsers` WRITE;
/*!40000 ALTER TABLE `ConnectedUsers` DISABLE KEYS */;
INSERT INTO `ConnectedUsers` VALUES (53,1,47),(54,1,46);
/*!40000 ALTER TABLE `ConnectedUsers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HashtagPreferences`
--

DROP TABLE IF EXISTS `HashtagPreferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `HashtagPreferences` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `hashtag_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `hashtag_id` (`hashtag_id`),
  CONSTRAINT `hashtagpreferences_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`),
  CONSTRAINT `hashtagpreferences_ibfk_2` FOREIGN KEY (`hashtag_id`) REFERENCES `Hashtags` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HashtagPreferences`
--

LOCK TABLES `HashtagPreferences` WRITE;
/*!40000 ALTER TABLE `HashtagPreferences` DISABLE KEYS */;
/*!40000 ALTER TABLE `HashtagPreferences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HashtagUsers`
--

DROP TABLE IF EXISTS `HashtagUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `HashtagUsers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `hashtag_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `hashtag_id` (`hashtag_id`),
  CONSTRAINT `hashtagusers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`),
  CONSTRAINT `hashtagusers_ibfk_2` FOREIGN KEY (`hashtag_id`) REFERENCES `Hashtags` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HashtagUsers`
--

LOCK TABLES `HashtagUsers` WRITE;
/*!40000 ALTER TABLE `HashtagUsers` DISABLE KEYS */;
INSERT INTO `HashtagUsers` VALUES (18,1,6),(19,1,1),(22,1,10),(23,1,5);
/*!40000 ALTER TABLE `HashtagUsers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Hashtags`
--

DROP TABLE IF EXISTS `Hashtags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Hashtags` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Hashtags`
--

LOCK TABLES `Hashtags` WRITE;
/*!40000 ALTER TABLE `Hashtags` DISABLE KEYS */;
INSERT INTO `Hashtags` VALUES (1,'Hacker'),(2,'Self-taught'),(3,'Growth'),(4,'Worker'),(5,'Sport'),(6,'Try Hard'),(7,'Designer'),(8,'Photo'),(9,'Tchouleur'),(10,'Hustle'),(11,'98'),(12,'Avenue'),(13,'De');
/*!40000 ALTER TABLE `Hashtags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LikeUsers`
--

DROP TABLE IF EXISTS `LikeUsers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LikeUsers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `liker_id` int(10) unsigned NOT NULL,
  `liked_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `liker_id` (`liker_id`),
  KEY `liked_id` (`liked_id`),
  CONSTRAINT `likeusers_ibfk_1` FOREIGN KEY (`liker_id`) REFERENCES `Users` (`id`),
  CONSTRAINT `likeusers_ibfk_2` FOREIGN KEY (`liked_id`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LikeUsers`
--

LOCK TABLES `LikeUsers` WRITE;
/*!40000 ALTER TABLE `LikeUsers` DISABLE KEYS */;
/*!40000 ALTER TABLE `LikeUsers` ENABLE KEYS */;
UNLOCK TABLES;

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
  `notif_read` tinyint(1) DEFAULT '0',
  `randomKey` varchar(15) NOT NULL,
  `activate` tinyint(1) DEFAULT '0',
  `picture1` text,
  `picture2` text,
  `picture3` text,
  `picture4` text,
  `picture5` text,
  `age` int(10) unsigned DEFAULT NULL,
  `description` text,
  `work` varchar(255) DEFAULT NULL,
  `language` varchar(255) DEFAULT NULL,
  `popularity` int(10) unsigned NOT NULL DEFAULT '0',
  `latitude` decimal(10,8) DEFAULT '0.00000000',
  `longitude` decimal(11,8) DEFAULT '0.00000000',
  `sex` int(10) unsigned DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'Ugo','$2b$10$8t4nYGlBPjeeo0iPAIyyAuQSX7kV3ZD270l2928JMHoSQGGU5t/ny','ugo@sharklasers.com',0,'1',0,'http://res.cloudinary.com/dzhnhtkyv/image/upload/v1533814281/qmjwhvkncokjkifgkr3a.jpg','http://res.cloudinary.com/dzhnhtkyv/image/upload/v1533477852/znxgo1spp1mlrlubjsm5.png','http://res.cloudinary.com/dzhnhtkyv/image/upload/v1533477852/ck4xg3x9vv2o6kalar76.png','http://res.cloudinary.com/dzhnhtkyv/image/upload/v1533477027/jsluurjsbuekjwwxxkgv.png',NULL,24,'',NULL,'French, English',1,48.89673600,2.31834290,0);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matchs`
--

DROP TABLE IF EXISTS `matchs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `matchs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user1` int(10) unsigned NOT NULL,
  `user2` int(10) unsigned NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `read_match` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user1` (`user1`),
  KEY `user2` (`user2`),
  CONSTRAINT `matchs_ibfk_1` FOREIGN KEY (`user1`) REFERENCES `Users` (`id`),
  CONSTRAINT `matchs_ibfk_2` FOREIGN KEY (`user2`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matchs`
--

LOCK TABLES `matchs` WRITE;
/*!40000 ALTER TABLE `matchs` DISABLE KEYS */;
/*!40000 ALTER TABLE `matchs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `preferences`
--

DROP TABLE IF EXISTS `preferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `preferences` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `age_min` int(10) unsigned NOT NULL,
  `age_max` int(10) unsigned NOT NULL,
  `max_distance` int(10) unsigned NOT NULL,
  `sex` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `popularity_min` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `preferences_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preferences`
--

LOCK TABLES `preferences` WRITE;
/*!40000 ALTER TABLE `preferences` DISABLE KEYS */;
INSERT INTO `preferences` VALUES (1,16,38,645000,1,1,0);
/*!40000 ALTER TABLE `preferences` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-16 21:13:54
