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
INSERT INTO `Chat` VALUES (745,13,1,6,'ww','2018-09-02 12:29:45',1),(746,13,1,6,'w','2018-09-02 12:33:37',1),(747,13,1,6,'w','2018-09-02 12:34:32',1),(748,13,6,1,'dwd','2018-09-02 12:34:37',1),(749,13,1,6,'de','2018-09-02 12:40:48',1),(750,13,1,6,'de','2018-09-02 12:41:16',1),(751,13,1,6,'ww','2018-09-02 12:41:24',1),(752,13,1,6,'aa','2018-09-02 18:08:33',1),(753,13,6,1,'ww','2018-09-02 18:08:36',1),(754,12,2,1,'s','2018-09-02 18:15:04',1),(755,12,2,1,'qqqq','2018-09-02 18:15:48',1),(756,12,2,1,'fr','2018-09-02 18:23:01',1),(757,13,1,6,'ww','2018-09-02 18:23:05',1),(758,12,2,1,'ww','2018-09-02 18:23:11',1),(759,12,2,1,'ff','2018-09-02 18:24:28',1),(760,12,2,1,'aa','2018-09-02 18:24:34',1),(761,13,1,6,'pp','2018-09-02 18:24:59',1),(762,12,2,1,'dd','2018-09-02 18:25:02',1),(763,12,2,1,'gg','2018-09-02 18:25:13',1),(764,12,2,1,'gt','2018-09-02 18:25:46',1),(765,12,2,1,'thyt','2018-09-02 18:25:50',1),(766,12,2,1,'y','2018-09-02 18:25:57',1),(767,13,1,6,'gbr','2018-09-02 18:26:04',1),(768,12,2,1,'bhgn','2018-09-02 18:26:08',1),(769,12,2,1,'d','2018-09-02 19:05:30',1),(770,12,2,1,'d','2018-09-02 19:05:34',1),(771,12,2,1,'r','2018-09-02 19:07:08',1),(772,12,1,2,'ok','2018-09-02 20:35:23',1),(773,12,2,1,'cd','2018-09-02 20:39:02',1),(774,12,2,1,'ccfc','2018-09-02 21:50:51',1),(775,12,2,1,'de','2018-09-02 21:50:55',1),(776,12,2,1,'fefe','2018-09-02 21:51:00',1),(777,13,1,6,'fe','2018-09-02 21:51:06',1),(778,12,2,1,'fe','2018-09-02 21:51:08',1),(779,13,1,6,'fefe','2018-09-02 21:51:42',1),(780,12,2,1,'r','2018-09-02 21:52:01',1),(781,12,2,1,'r','2018-09-02 21:52:03',1),(782,12,2,1,'r','2018-09-02 21:52:04',1),(783,12,2,1,'r','2018-09-02 21:52:04',1),(784,12,2,1,'de','2018-09-02 22:12:27',1),(785,12,2,1,'fe','2018-09-02 22:12:32',1),(786,13,1,6,'fe','2018-09-02 22:12:40',1),(787,12,2,1,'f','2018-09-02 22:12:45',1),(788,13,1,6,'few','2018-09-02 22:13:51',1),(789,12,2,1,'de','2018-09-02 22:13:54',1),(790,13,1,6,'fcwe','2018-09-02 22:14:28',1),(791,12,2,1,'fcew','2018-09-02 22:14:30',1),(792,12,2,1,'ce','2018-09-02 22:14:46',1),(793,13,1,6,'fe','2018-09-02 22:15:07',1),(794,12,2,1,'fre','2018-09-02 22:15:09',1),(795,12,1,2,'de','2018-09-02 22:15:24',1),(796,13,1,6,'few','2018-09-02 22:15:50',1),(797,12,2,1,'fre','2018-09-02 22:15:52',1),(798,13,1,6,'few','2018-09-02 22:16:06',1),(799,12,2,1,'fe','2018-09-02 22:16:09',1),(800,12,2,1,'vre','2018-09-02 22:16:44',1),(801,12,2,1,'fe','2018-09-02 22:17:37',1),(802,12,2,1,'vre','2018-09-02 22:17:44',1),(803,12,1,2,'fre','2018-09-02 22:18:11',1),(804,12,2,1,'vfd','2018-09-02 22:18:13',1),(805,12,2,1,'vfe','2018-09-02 22:18:19',1),(806,12,2,1,'few','2018-09-02 22:18:57',1),(807,12,1,2,'d','2018-09-02 22:21:27',1),(808,12,2,1,'few','2018-09-02 22:21:32',1),(809,12,2,1,'vfre','2018-09-02 22:22:47',1),(810,12,2,1,'cew','2018-09-03 14:49:26',1),(811,12,2,1,'fd\\','2018-09-03 14:50:25',1),(812,12,2,1,'dr','2018-09-03 14:50:56',1),(813,12,1,2,'sw','2018-09-03 14:55:19',1),(814,12,2,1,'ed','2018-09-03 14:55:25',1),(815,12,2,1,'de','2018-09-03 14:56:55',1),(816,12,2,1,'de','2018-09-03 14:57:01',1),(817,13,1,6,'dfrew','2018-09-03 14:57:05',1),(818,12,2,1,'de','2018-09-03 14:57:11',1),(819,13,1,6,'nl','2018-09-03 14:57:49',1),(820,13,1,6,'nkl','2018-09-03 14:58:07',1),(821,12,2,1,'njkl','2018-09-03 14:58:10',1),(822,13,1,6,'bhk','2018-09-03 14:58:31',1),(823,12,2,1,'nkl','2018-09-03 14:58:33',1),(824,12,2,1,'bhkjb','2018-09-03 14:58:53',1),(825,13,1,6,'dw','2018-09-03 15:00:38',1),(826,12,2,1,'kl;','2018-09-03 15:00:41',1),(827,13,1,6,'fe','2018-09-03 15:01:01',1),(828,12,2,1,'fer','2018-09-03 15:01:03',1),(829,13,1,6,'cdw','2018-09-03 15:01:16',1),(830,12,2,1,'dew','2018-09-03 15:01:24',1),(831,13,1,6,'dw','2018-09-03 15:01:52',1),(832,12,2,1,'few','2018-09-03 15:01:56',1),(833,13,1,6,'dfe','2018-09-03 15:02:43',1),(834,12,2,1,'fre','2018-09-03 15:02:53',1),(835,13,1,6,'fre','2018-09-03 15:03:43',1),(836,12,2,1,'cds','2018-09-03 15:04:21',1),(837,12,2,1,'cd','2018-09-03 15:04:50',1),(838,12,2,1,'vd','2018-09-03 15:05:41',1),(839,12,2,1,'fr','2018-09-03 15:11:59',1),(840,12,2,1,'fr','2018-09-03 15:12:03',1),(841,12,2,1,'kk','2018-09-03 15:14:45',1),(842,13,1,6,'fe','2018-09-03 15:15:50',1),(843,12,2,1,'fe','2018-09-03 15:15:51',1),(844,12,1,2,'fr','2018-09-03 15:16:09',1),(845,13,1,6,'fd','2018-09-03 15:16:12',1),(846,12,2,1,'fre','2018-09-03 15:16:14',1),(847,12,1,2,'de','2018-09-03 15:16:44',1),(848,12,2,1,'d','2018-09-03 15:18:29',1),(849,12,2,1,'de','2018-09-03 15:18:41',1),(850,12,2,1,'fe','2018-09-03 15:18:45',1),(851,13,1,6,'fe','2018-09-03 15:18:48',1),(852,12,2,1,'fe','2018-09-03 15:18:50',1),(853,12,2,1,'referge','2018-09-03 15:33:52',1),(854,12,2,1,'gtrg4','2018-09-03 15:33:58',1),(855,13,1,6,'gtg','2018-09-03 15:34:06',1),(856,12,2,1,'grg','2018-09-03 15:34:08',1),(857,13,1,6,'vrr','2018-09-03 15:35:20',1),(858,12,2,1,'fr','2018-09-03 15:35:32',1),(859,12,2,1,'grgrgrgr','2018-09-03 15:37:27',1),(860,12,2,1,'rgreger','2018-09-03 15:38:50',1),(861,12,2,1,'freferfer','2018-09-03 15:40:59',1),(862,12,2,1,'gregrt','2018-09-03 15:41:17',1),(863,13,1,6,'grgr','2018-09-03 15:41:36',1),(864,12,2,1,'vfvf','2018-09-03 15:42:17',1),(865,12,2,1,'freger','2018-09-03 15:57:45',1),(866,12,2,1,'frgr','2018-09-03 15:58:03',1),(867,12,2,1,'ffr','2018-09-03 15:59:00',1),(868,13,1,6,'fefe','2018-09-03 15:59:10',1),(869,12,2,1,'fefe','2018-09-03 15:59:13',1),(870,12,1,2,'fefe','2018-09-03 15:59:24',1),(871,12,2,1,'ww','2018-09-03 15:59:28',1),(872,12,2,1,'ffr','2018-09-03 15:59:58',1),(873,12,2,1,'grgr','2018-09-03 16:00:11',1),(874,12,2,1,'fefe','2018-09-03 16:01:07',1),(875,12,1,2,'fefe','2018-09-03 16:01:14',1),(876,12,2,1,'ff','2018-09-03 16:01:19',1),(877,12,2,1,'gr','2018-09-03 16:03:12',1),(878,12,2,1,'fefe','2018-09-03 16:04:19',1),(879,12,2,1,'efe','2018-09-03 16:04:26',1),(880,13,1,6,'vvfr','2018-09-03 16:04:29',1),(881,12,2,1,'fef','2018-09-03 16:04:32',1),(882,12,2,1,'ffe','2018-09-03 16:06:35',1),(883,12,2,1,'dwdw','2018-09-03 16:06:47',1),(884,12,2,1,'c','2018-09-03 16:06:52',1),(885,12,2,1,'cdcd','2018-09-03 16:06:54',1),(886,13,1,6,'dwdw','2018-09-03 16:06:59',1),(887,12,2,1,'deed','2018-09-03 16:07:04',1),(888,12,2,1,'fdf','2018-09-03 16:07:39',1),(889,12,2,1,'dfe','2018-09-03 16:08:07',1),(890,12,2,1,'dee','2018-09-03 16:08:11',1),(891,12,1,2,'dede','2018-09-03 16:08:14',1),(892,12,2,1,'dfe','2018-09-03 16:08:17',1),(893,12,1,2,'f4f4','2018-09-03 16:08:52',1),(894,12,2,1,'gtgt','2018-09-03 16:08:55',1),(895,12,1,2,'grg','2018-09-03 16:09:15',1),(896,12,1,2,'g','2018-09-03 16:09:24',1),(897,12,2,1,'gt','2018-09-03 16:09:33',1),(898,12,1,2,'frfr','2018-09-03 16:09:48',1),(899,12,2,1,'frg','2018-09-03 16:09:51',1),(900,12,1,2,'dff','2018-09-03 16:10:52',1),(901,12,2,1,'vrvr','2018-09-03 16:11:12',1),(902,12,2,1,'fge','2018-09-03 16:11:20',1),(903,12,2,1,'fe','2018-09-03 16:11:48',1),(904,12,1,2,'frr','2018-09-03 16:13:09',1),(905,12,2,1,'frfr','2018-09-03 16:13:18',1),(906,12,2,1,'fefe','2018-09-03 16:13:46',1),(907,13,1,6,'fef','2018-09-03 16:13:56',1),(908,12,2,1,'frfr ','2018-09-03 16:13:59',1),(909,12,2,1,'vr','2018-09-03 16:14:03',1),(910,12,2,1,'fdsd','2018-09-03 16:14:04',1),(911,12,2,1,'fef','2018-09-03 16:14:15',1),(912,12,2,1,'few','2018-09-03 16:14:46',1),(913,13,1,6,'vd','2018-09-03 16:14:54',1),(914,12,2,1,'vv','2018-09-03 16:16:17',1),(915,12,2,1,'fef','2018-09-03 16:19:57',1),(916,12,2,1,'fef','2018-09-03 16:21:01',1),(917,12,2,1,'fefe','2018-09-03 16:21:09',1),(918,13,1,6,'fefe','2018-09-03 16:21:12',1),(919,12,2,1,'fefe','2018-09-03 16:21:15',1),(920,12,2,1,'fefe','2018-09-03 16:21:35',1),(921,12,2,1,'fef','2018-09-03 16:21:43',1),(922,13,1,6,'qqq','2018-09-03 16:21:52',1),(923,12,2,1,'vf','2018-09-03 16:22:16',1),(924,12,2,1,'fef','2018-09-03 16:23:14',1),(925,12,2,1,'fefe','2018-09-03 16:23:24',1),(926,12,2,1,'fefe','2018-09-03 16:23:34',1),(927,13,1,6,'fr','2018-09-03 16:23:36',1),(928,12,2,1,'fe','2018-09-03 16:23:41',1),(929,13,1,6,'grfrf','2018-09-03 16:24:18',1),(930,12,2,1,'fefe','2018-09-03 16:24:28',1),(931,13,1,6,'vrefer','2018-09-03 16:24:46',1),(932,12,2,1,'fr','2018-09-03 16:25:36',1),(933,13,1,6,'fefe','2018-09-03 16:25:47',1),(934,13,1,6,'fefe','2018-09-03 16:26:04',1),(935,12,2,1,'fe','2018-09-03 16:26:06',1),(936,12,2,1,'vf','2018-09-03 16:26:40',1),(937,12,1,2,'bf','2018-09-03 16:30:35',1),(938,12,1,2,'bfbg','2018-09-03 16:30:57',1),(939,12,2,1,'ddefe','2018-09-03 16:37:04',1),(940,12,1,2,'fefe','2018-09-03 16:37:06',1),(941,13,1,6,'fefe','2018-09-03 16:37:11',1),(942,12,2,1,'fef','2018-09-03 16:37:13',1),(943,12,2,1,'rfr','2018-09-03 16:38:55',1),(944,13,1,6,'frfr','2018-09-03 16:39:00',1),(945,12,2,1,'frfr','2018-09-03 16:39:03',1),(946,12,2,1,'ded','2018-09-03 16:39:56',1),(947,12,1,2,'cee','2018-09-03 16:39:59',1),(948,13,1,6,'fefr','2018-09-03 16:40:04',1),(949,12,2,1,'fefe','2018-09-03 16:40:06',1),(950,13,1,6,'df','2018-09-03 16:42:45',1),(951,12,2,1,'fef','2018-09-03 16:42:47',1),(952,13,1,6,'fef','2018-09-03 16:43:12',1),(953,12,2,1,'fe','2018-09-03 16:43:14',1),(954,13,1,6,'dfef','2018-09-03 16:44:11',1),(955,12,2,1,'fefe','2018-09-03 16:44:13',1),(956,12,1,2,'fefe','2018-09-03 16:45:50',1),(957,12,2,1,'fe','2018-09-03 16:46:02',1),(958,13,1,6,'fer','2018-09-03 16:46:17',1),(959,12,2,1,'fe','2018-09-03 16:46:19',1),(960,13,1,6,'few','2018-09-03 16:47:17',1),(961,12,2,1,'fer','2018-09-03 16:47:19',1),(962,12,2,1,'dcd','2018-09-03 16:48:52',1),(963,12,1,2,'vfd','2018-09-03 16:48:58',1),(964,12,2,1,'cd','2018-09-03 17:01:49',1),(965,13,1,6,'fe','2018-09-03 17:02:08',1),(966,12,2,1,'vf','2018-09-03 17:02:12',1),(967,12,1,2,'de','2018-09-03 17:45:31',1),(968,12,2,1,'de','2018-09-03 17:45:34',1),(969,13,1,6,'de','2018-09-03 17:45:39',1),(970,12,2,1,'de','2018-09-03 17:45:41',1),(971,13,1,6,'few','2018-09-03 17:47:38',1),(972,12,2,1,'fe','2018-09-03 17:47:42',1),(973,12,1,2,'de','2018-09-03 17:50:00',1),(974,12,2,1,'v','2018-09-03 17:50:01',1),(975,13,1,6,'vrg','2018-09-03 17:50:05',1),(976,12,2,1,'fe','2018-09-03 17:50:07',1),(977,12,2,1,'fe','2018-09-03 17:50:11',1),(978,12,1,2,'fe','2018-09-03 17:50:31',1),(979,12,2,1,'gr','2018-09-03 17:50:33',1),(980,13,1,6,'f4','2018-09-03 17:50:37',1),(981,12,2,1,'gr','2018-09-03 17:50:40',1),(982,13,1,6,'fe','2018-09-03 17:51:24',1),(983,12,1,2,'e','2018-09-03 17:51:31',1),(984,12,2,1,'re','2018-09-03 17:51:33',1),(985,12,1,2,'fe','2018-09-03 18:00:31',1),(986,12,1,2,'fr','2018-09-03 18:09:09',1),(987,12,2,1,'frefer','2018-09-03 18:09:45',1),(988,13,1,6,'freger','2018-09-03 18:09:52',0),(989,12,2,1,'gre','2018-09-03 18:09:54',1),(990,12,1,2,'vfe','2018-09-03 18:10:45',1),(991,13,1,6,'gfe\\','2018-09-03 18:10:49',0),(992,12,2,1,'gre','2018-09-03 18:10:52',1),(993,13,1,6,'fewr4','2018-09-03 18:11:22',0),(994,12,2,1,'rew','2018-09-03 18:11:25',1),(995,12,1,2,'few','2018-09-03 18:11:57',1),(996,13,1,6,'few','2018-09-03 18:12:01',0),(997,13,1,6,'fe','2018-09-03 18:12:21',0),(998,12,2,1,'re','2018-09-03 18:12:24',1),(999,12,1,2,'fe','2018-09-03 18:12:32',1),(1000,13,1,6,'gre','2018-09-03 18:12:36',0),(1001,12,2,1,'re','2018-09-03 18:12:39',1),(1002,13,1,6,'efe','2018-09-03 19:58:29',0),(1003,13,1,6,'cde','2018-09-03 19:58:35',0),(1004,15,13,1,'ver','2018-09-03 19:58:39',1),(1005,13,1,6,'few','2018-09-03 19:59:10',0),(1006,12,1,2,'fe','2018-09-03 19:59:14',1),(1007,15,1,13,'fe','2018-09-03 19:59:22',1),(1008,15,13,1,'fe','2018-09-03 19:59:35',1),(1009,12,1,2,'fewfe','2018-09-03 19:59:41',1),(1010,15,13,1,'fe','2018-09-03 19:59:45',1),(1011,15,13,1,'fe','2018-09-03 19:59:48',1),(1012,15,13,1,'fre','2018-09-03 19:59:49',1),(1013,13,1,6,'ref','2018-09-03 20:00:22',0),(1014,15,13,1,'fre','2018-09-03 20:00:24',1),(1015,15,13,1,'few','2018-09-03 20:02:03',1),(1016,12,1,2,'cds','2018-09-03 20:03:04',1),(1017,15,13,1,'fer','2018-09-03 20:03:07',1),(1018,15,13,1,'fe','2018-09-03 20:03:15',1),(1019,12,2,1,'de','2018-09-03 20:12:02',1),(1020,12,2,1,'fe','2018-09-03 20:12:16',1),(1021,12,2,1,'fr','2018-09-03 20:15:34',1),(1022,12,1,2,'fr','2018-09-03 20:15:43',1),(1023,12,2,1,'frfer','2018-09-03 20:15:53',1),(1024,13,1,6,'re','2018-09-03 20:16:02',0),(1025,12,2,1,'fre','2018-09-03 20:16:04',1),(1026,12,2,1,'ve','2018-09-03 20:17:17',1),(1027,12,2,1,'mkl','2018-09-03 20:17:21',1),(1028,12,2,1,'mk','2018-09-03 20:17:24',1),(1029,12,2,1,'vf','2018-09-03 23:27:15',1),(1030,12,1,2,'vgrfgr','2018-09-03 23:27:18',1),(1031,15,1,13,'gr','2018-09-03 23:27:23',0),(1032,12,2,1,'gt','2018-09-03 23:27:26',1),(1033,13,1,6,'gt','2018-09-03 23:27:40',0),(1034,12,2,1,'gt','2018-09-03 23:27:43',1),(1035,12,2,1,'gt','2018-09-03 23:27:53',1),(1036,12,2,1,'cd','2018-09-04 00:19:02',1),(1037,12,1,2,'fr','2018-09-04 00:26:29',1),(1038,12,2,1,'r','2018-09-04 00:26:33',1),(1039,12,1,2,'vfvf','2018-09-04 00:52:55',1),(1040,12,2,1,'vrv','2018-09-04 00:52:58',1),(1041,12,2,1,'vrf','2018-09-04 00:53:04',1),(1042,12,2,1,'vr','2018-09-04 00:53:36',1),(1043,12,1,2,'de','2018-09-04 00:58:11',1),(1044,12,2,1,'fe','2018-09-04 00:58:14',1),(1045,12,2,1,'ef','2018-09-04 00:58:32',1),(1046,12,2,1,'fr','2018-09-04 00:58:48',1),(1047,12,2,1,'fr','2018-09-04 00:58:56',1),(1048,12,2,1,'vrvr','2018-09-04 01:00:03',1),(1049,12,2,1,'vcrfr','2018-09-04 01:00:13',1),(1050,12,2,1,'fr','2018-09-04 01:00:53',1),(1051,12,2,1,'gr','2018-09-04 01:01:03',1),(1052,12,2,1,'gr','2018-09-04 01:01:10',1),(1053,12,2,1,'gr','2018-09-04 01:01:18',1),(1054,12,1,2,'dce','2018-09-04 14:25:38',1),(1055,12,2,1,'ce','2018-09-04 14:25:40',1),(1056,12,2,1,'few','2018-09-04 14:25:43',1),(1057,12,1,2,'de','2018-09-04 14:27:22',1),(1058,12,2,1,'ff','2018-09-04 14:27:25',1),(1059,12,2,1,'fr','2018-09-04 14:27:30',1),(1060,12,2,1,'fr','2018-09-04 14:27:38',1),(1061,12,2,1,'fr','2018-09-04 14:28:45',1),(1062,12,2,1,'fr','2018-09-04 14:28:54',1),(1063,12,2,1,'fr','2018-09-04 14:30:11',1),(1064,12,2,1,'grfr','2018-09-04 14:30:41',1),(1065,12,2,1,'fr','2018-09-04 14:30:46',1),(1066,12,2,1,'ce','2018-09-04 14:31:04',1),(1067,12,2,1,'d','2018-09-04 14:32:51',1),(1068,12,2,1,'e','2018-09-04 14:34:24',1),(1069,12,2,1,'d','2018-09-04 14:39:23',1),(1070,12,2,1,'ce','2018-09-04 14:39:26',1),(1071,12,2,1,'cr','2018-09-04 14:39:48',1),(1072,12,2,1,'vf','2018-09-04 15:10:41',1),(1073,12,2,1,'v','2018-09-04 15:10:56',1),(1074,12,2,1,'de','2018-09-04 15:11:50',1),(1075,12,2,1,'f','2018-09-04 15:13:44',1),(1076,12,2,1,'e','2018-09-04 15:13:50',1),(1077,12,2,1,'fr','2018-09-04 15:14:01',1),(1078,12,2,1,'fr','2018-09-04 15:14:04',1),(1079,12,2,1,'fr','2018-09-04 15:14:05',1),(1080,12,2,1,'gr','2018-09-04 15:14:06',1),(1081,12,2,1,'gr','2018-09-04 15:14:07',1),(1082,12,2,1,'fr','2018-09-04 15:14:20',1),(1083,12,2,1,'fr','2018-09-04 15:14:28',1),(1084,12,2,1,'gr','2018-09-04 15:14:30',1),(1085,12,2,1,'de','2018-09-04 15:14:31',1),(1086,12,2,1,'cd','2018-09-04 15:15:09',1),(1087,12,2,1,'cd','2018-09-04 15:15:16',1),(1088,12,1,2,'qwerty','2018-09-04 15:16:22',1),(1089,12,2,1,'fr','2018-09-04 15:16:31',1),(1090,12,1,2,'fr','2018-09-04 15:16:37',1),(1091,12,2,1,'fr','2018-09-04 15:16:46',1),(1092,12,2,1,'dw','2018-09-04 15:17:00',1),(1093,12,2,1,'dw','2018-09-04 15:17:37',1),(1094,12,2,1,'cd','2018-09-04 15:17:45',1),(1095,12,2,1,'cd','2018-09-04 15:17:50',1),(1096,12,2,1,'qq','2018-09-04 15:18:25',1),(1097,12,2,1,'fe','2018-09-04 15:28:28',1),(1098,12,2,1,'cd','2018-09-04 15:28:35',1),(1099,12,2,1,'cd','2018-09-04 15:28:43',1),(1100,12,2,1,'ffrf','2018-09-04 15:28:54',1),(1101,12,2,1,'de','2018-09-04 15:29:47',1),(1102,12,2,1,'e','2018-09-04 15:29:56',1),(1103,12,2,1,'de','2018-09-04 15:30:05',1),(1104,12,1,2,'de','2018-09-04 15:30:12',1),(1105,12,2,1,'de','2018-09-04 15:30:14',1),(1106,12,2,1,'ew','2018-09-04 15:42:49',1),(1107,12,2,1,'e','2018-09-04 15:43:02',1),(1108,12,2,1,'fv','2018-09-04 15:44:07',1),(1109,12,2,1,'vf','2018-09-04 15:47:37',1),(1110,12,1,2,'g','2018-09-04 15:47:41',1),(1111,12,2,1,'h','2018-09-04 15:51:43',1),(1112,12,2,1,'fe','2018-09-04 15:55:58',1),(1113,12,2,1,'vf','2018-09-04 15:56:55',1),(1114,12,2,1,'e','2018-09-04 15:57:14',1),(1115,12,2,1,'rgr','2018-09-04 15:58:50',1),(1116,12,2,1,'gf','2018-09-04 15:59:35',1),(1117,12,2,1,'fre','2018-09-04 15:59:59',1),(1118,12,2,1,'d4e','2018-09-04 16:00:21',1),(1119,12,2,1,'freg','2018-09-04 16:00:33',1),(1120,12,2,1,'mlmk','2018-09-04 16:01:05',1),(1121,12,2,1,'de','2018-09-04 16:07:07',1),(1122,12,2,1,'crfr','2018-09-04 16:09:07',1),(1123,12,2,1,'fr','2018-09-04 16:09:13',1),(1124,12,2,1,'fr','2018-09-04 16:09:39',1),(1125,12,2,1,'fr','2018-09-04 16:09:42',1),(1126,12,2,1,'fr','2018-09-04 16:09:50',1),(1127,12,2,1,'fee','2018-09-04 16:12:32',1),(1128,12,2,1,'vd','2018-09-04 16:13:10',1),(1129,12,2,1,'de','2018-09-04 16:13:21',1),(1130,12,2,1,'fre','2018-09-04 16:16:53',1),(1131,12,2,1,'fr','2018-09-04 16:16:59',1),(1132,12,2,1,'fr','2018-09-04 16:17:43',1),(1133,12,2,1,'fr','2018-09-04 16:17:53',1),(1134,12,2,1,'ce','2018-09-04 16:36:35',1),(1135,12,2,1,'vr','2018-09-04 16:43:26',1),(1136,12,2,1,'vf','2018-09-04 16:43:52',1),(1137,12,2,1,'ce','2018-09-04 17:02:54',1),(1138,12,2,1,'cdd','2018-09-04 17:03:02',1),(1139,12,2,1,'fr','2018-09-04 17:03:50',1),(1140,12,2,1,'fef','2018-09-04 17:04:05',1),(1141,12,2,1,'ffe','2018-09-04 17:04:18',1),(1142,12,2,1,'fe','2018-09-04 17:05:07',1),(1143,12,2,1,'fe','2018-09-04 17:05:22',1),(1144,12,2,1,'fe','2018-09-04 17:06:16',1),(1145,12,2,1,'fr','2018-09-04 17:09:18',1),(1146,12,2,1,'frg','2018-09-04 17:09:24',1),(1147,12,2,1,'vgr','2018-09-04 17:10:32',1),(1148,12,2,1,'grgr','2018-09-04 17:10:39',1),(1149,12,2,1,'grgf','2018-09-04 17:11:05',1),(1150,12,2,1,'gtrhr','2018-09-04 17:25:54',1),(1151,12,2,1,'gfd','2018-09-04 17:26:38',1),(1152,12,2,1,'fr','2018-09-04 17:27:56',1),(1153,12,2,1,'gr','2018-09-04 17:28:05',1),(1154,12,2,1,'gre','2018-09-04 17:28:10',1),(1155,12,2,1,'gre','2018-09-04 17:28:18',1),(1156,12,2,1,'vf','2018-09-04 17:29:37',1),(1157,12,2,1,'gr','2018-09-04 17:30:35',1),(1158,12,2,1,'vfdbdgd','2018-09-04 17:30:38',1),(1159,12,2,1,'v','2018-09-04 17:31:13',1),(1160,12,2,1,'fe','2018-09-04 17:33:31',1),(1161,12,2,1,'v','2018-09-04 17:33:36',1),(1162,12,2,1,'fv','2018-09-04 17:41:02',1),(1163,12,2,1,' ','2018-09-04 17:41:04',1),(1164,12,2,1,'n bvn','2018-09-04 17:41:06',1),(1165,12,2,1,'ver','2018-09-04 17:43:58',1),(1166,12,2,1,'f','2018-09-04 17:44:02',1),(1167,12,2,1,'fe','2018-09-04 17:44:14',1),(1168,12,2,1,'greg','2018-09-04 17:44:44',1),(1169,12,2,1,'vrfv','2018-09-04 23:37:05',1),(1170,12,2,1,'vf','2018-09-04 23:37:11',1),(1171,12,2,1,'fre','2018-09-04 23:51:35',1),(1172,12,2,1,'cd','2018-09-04 23:52:06',1),(1173,12,2,1,'vd','2018-09-04 23:52:11',1),(1174,12,2,1,'vd','2018-09-04 23:52:18',1),(1175,12,2,1,'fr','2018-09-04 23:53:12',1),(1176,12,1,2,'de','2018-09-04 23:57:28',1),(1177,12,2,1,'ce','2018-09-04 23:57:33',1),(1178,12,2,1,'fefe','2018-09-04 23:57:40',1),(1179,12,2,1,'fe','2018-09-04 23:58:47',1),(1180,12,2,1,'ve','2018-09-04 23:58:51',1),(1181,12,2,1,'fe','2018-09-04 23:59:35',1),(1182,12,2,1,'vdf','2018-09-04 23:59:37',1),(1183,12,2,1,'vfdfv','2018-09-04 23:59:42',1),(1184,12,2,1,'vfdvdf','2018-09-04 23:59:45',1),(1185,12,2,1,'vfd','2018-09-04 23:59:50',1),(1186,12,2,1,'few','2018-09-05 00:00:02',1),(1187,12,2,1,'fe','2018-09-05 00:01:54',1),(1188,12,2,1,'dewf','2018-09-05 00:02:18',1),(1189,12,2,1,'vvfre','2018-09-05 00:02:20',1),(1190,12,2,1,'few','2018-09-05 00:04:43',1),(1191,12,2,1,'fewfcd','2018-09-05 00:04:45',1),(1192,12,2,1,'few','2018-09-05 00:04:56',1),(1193,12,2,1,'vdv','2018-09-05 00:05:07',1),(1194,12,2,1,'vf','2018-09-05 00:05:15',1),(1195,12,2,1,'vfd','2018-09-05 00:05:16',1),(1196,12,2,1,'fe','2018-09-05 00:08:26',1),(1197,12,2,1,'fe','2018-09-05 00:08:29',1),(1198,12,2,1,'fre','2018-09-05 00:10:03',1),(1199,12,2,1,'fe','2018-09-05 00:10:08',1),(1200,12,2,1,'vf','2018-09-05 00:10:52',1),(1201,12,2,1,'fdefr','2018-09-05 00:11:19',1),(1202,13,1,6,'fefre','2018-09-05 00:11:27',0),(1203,12,2,1,'df','2018-09-05 00:11:29',1),(1204,12,2,1,'fefcd','2018-09-05 00:11:38',1),(1205,12,1,2,'vfd','2018-09-05 00:11:43',1),(1206,12,2,1,'cdscd','2018-09-05 00:12:15',1),(1207,12,1,2,'cfr','2018-09-05 00:13:21',1),(1208,12,2,1,'fdfe','2018-09-05 00:13:23',1),(1209,13,1,6,'fre','2018-09-05 00:13:29',0),(1210,12,2,1,'gw','2018-09-05 00:13:31',1),(1211,12,1,2,'gerf','2018-09-05 00:13:37',1),(1212,12,2,1,'fe','2018-09-05 00:13:42',1),(1213,12,1,2,'frf','2018-09-05 00:13:51',1),(1214,12,1,2,'fre','2018-09-05 00:13:54',1),(1215,12,2,1,'fr','2018-09-05 00:13:59',1),(1216,12,2,1,'fre','2018-09-05 00:14:44',1),(1217,12,1,2,'fre','2018-09-05 00:14:47',1),(1218,12,2,1,'fefer','2018-09-05 00:14:52',1),(1219,12,1,2,'fre','2018-09-05 00:14:57',1),(1220,12,1,2,'vfdvf','2018-09-05 00:17:29',1),(1221,12,2,1,'cercfv','2018-09-05 00:17:39',1),(1222,12,1,2,'fere','2018-09-05 00:18:00',1),(1223,12,2,1,'fe','2018-09-05 00:18:03',1),(1224,12,1,2,'frmeklfmerl','2018-09-05 00:18:09',1),(1225,12,2,1,'ff','2018-09-05 00:18:14',1),(1226,12,2,1,'frfr','2018-09-05 00:18:20',1),(1227,12,1,2,'rf','2018-09-05 00:18:25',1),(1228,12,1,2,'nonj','2018-09-05 00:19:26',1),(1229,12,2,1,'fr','2018-09-05 00:19:29',1),(1230,12,1,2,'njk','2018-09-05 00:20:01',1),(1231,12,2,1,'mlkkm','2018-09-05 00:20:05',1),(1232,12,1,2,',l','2018-09-05 00:20:14',1),(1233,12,2,1,',','2018-09-05 00:20:51',1),(1234,12,1,2,'d','2018-09-05 00:22:08',1),(1235,12,2,1,'few','2018-09-05 00:22:10',1),(1236,12,1,2,'cd','2018-09-05 00:22:24',1),(1237,12,2,1,'few','2018-09-05 00:22:26',1),(1238,12,1,2,'d','2018-09-05 00:23:19',1),(1239,12,2,1,'de','2018-09-05 00:23:23',1),(1240,12,1,2,'de','2018-09-05 00:23:27',1),(1241,12,2,1,'de','2018-09-05 00:23:30',1),(1242,12,2,1,'d','2018-09-05 00:23:33',1),(1243,12,2,1,'c','2018-09-05 00:23:38',1),(1244,12,2,1,'d','2018-09-05 00:23:54',1),(1245,12,2,1,'d','2018-09-05 00:24:00',1),(1246,12,2,1,'cd','2018-09-05 00:31:53',1),(1247,12,1,2,'cd','2018-09-05 00:31:57',1),(1248,12,2,1,'vd','2018-09-05 00:32:01',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CheckedUsers`
--

LOCK TABLES `CheckedUsers` WRITE;
/*!40000 ALTER TABLE `CheckedUsers` DISABLE KEYS */;
INSERT INTO `CheckedUsers` VALUES (57,1,2),(58,2,1),(59,6,1),(60,6,2),(61,1,6),(62,2,6),(63,13,5),(64,13,1),(65,13,10),(66,1,10),(67,1,13),(68,2,10),(69,2,13);
/*!40000 ALTER TABLE `CheckedUsers` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HashtagUsers`
--

LOCK TABLES `HashtagUsers` WRITE;
/*!40000 ALTER TABLE `HashtagUsers` DISABLE KEYS */;
INSERT INTO `HashtagUsers` VALUES (18,1,6),(19,1,1),(20,2,4),(21,5,4),(22,1,10),(23,1,5);
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Hashtags`
--

LOCK TABLES `Hashtags` WRITE;
/*!40000 ALTER TABLE `Hashtags` DISABLE KEYS */;
INSERT INTO `Hashtags` VALUES (1,'Hacker'),(2,'Self-taught'),(3,'Growth'),(4,'Worker'),(5,'Sport'),(6,'Try Hard'),(7,'Designer'),(8,'Photo'),(9,'Tchouleur'),(10,'Hustle');
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
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LikeUsers`
--

LOCK TABLES `LikeUsers` WRITE;
/*!40000 ALTER TABLE `LikeUsers` DISABLE KEYS */;
INSERT INTO `LikeUsers` VALUES (41,1,2),(42,2,1),(43,6,1),(44,6,2),(45,1,6),(46,2,6),(47,13,5),(48,13,1),(49,13,10),(50,1,10),(51,1,13),(52,2,10),(53,2,13);
/*!40000 ALTER TABLE `LikeUsers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Preferences`
--

DROP TABLE IF EXISTS `Preferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Preferences` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `age_min` int(10) unsigned NOT NULL,
  `age_max` int(10) unsigned NOT NULL,
  `max_distance` int(10) unsigned NOT NULL,
  `sex` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `preferences_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Preferences`
--

LOCK TABLES `Preferences` WRITE;
/*!40000 ALTER TABLE `Preferences` DISABLE KEYS */;
INSERT INTO `Preferences` VALUES (1,16,38,50000,1,1),(2,16,38,50000,1,2),(3,16,38,50000,1,9),(4,16,38,50000,1,10),(5,20,35,20000,1,6),(6,16,38,50000,1,11),(7,16,38,50000,1,12),(8,16,38,50000,1,13);
/*!40000 ALTER TABLE `Preferences` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'Ugo','u0','u@u.uu',0,'u',0,'http://res.cloudinary.com/dzhnhtkyv/image/upload/v1533814281/qmjwhvkncokjkifgkr3a.jpg','http://res.cloudinary.com/dzhnhtkyv/image/upload/v1533477852/znxgo1spp1mlrlubjsm5.png','http://res.cloudinary.com/dzhnhtkyv/image/upload/v1533477852/ck4xg3x9vv2o6kalar76.png','http://res.cloudinary.com/dzhnhtkyv/image/upload/v1533477027/jsluurjsbuekjwwxxkgv.png',NULL,24,'',NULL,'French, English',0,48.87922850,2.38619830,1),(2,'Alice','a0','a@a.aa',0,'a',0,'https://firebasestorage.googleapis.com/v0/b/tinder42matcha.appspot.com/o/alice.jpg?alt=media&token=879456eb-347e-4c79-a72f-9cfad45a8f2a',NULL,NULL,NULL,NULL,22,NULL,NULL,NULL,0,48.87922370,2.38618570,2),(5,'Arlo','tttttt','t@t.tt',0,'Vo54TsEUwP45ncS',0,'https://firebasestorage.googleapis.com/v0/b/tinder42matcha.appspot.com/o/arlo.jpeg?alt=media&token=43409694-01c4-458f-bc40-aced9bd4e31e',NULL,NULL,NULL,NULL,22,NULL,NULL,NULL,0,0.00000000,0.00000000,1),(6,'test','plp','t@t.tt',0,'dc',0,'http://res.cloudinary.com/dzhnhtkyv/image/upload/v1533477852/znxgo1spp1mlrlubjsm5.png',NULL,NULL,NULL,NULL,22,NULL,NULL,NULL,0,43.66168660,7.12158330,1),(9,'Gary','0000','g@g.gg',0,'cdsfsd',0,'http://res.cloudinary.com/dzhnhtkyv/image/upload/v1534115764/gary_zj8qvo.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,48.86485100,2.37676500,0),(10,'test2','$2b$10$EyNIUm2ojGc8Nx97prsQc.ix1GwfELzD6T.OjuXVtVvpbcuOjzgg6','test@test.test',0,'YnBEYf86f8MjO6m',0,NULL,NULL,NULL,NULL,NULL,24,NULL,NULL,NULL,0,48.87925050,2.38620850,1),(11,'wwww','$2b$10$vaL5DbIqpE2dMvvpNc.cB.KQ/pdUZcy63gUQqoI6E5Fzz12ks0uYC','ww@ww.ww',0,'XyhZwY5q0kkMwbV',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,48.87926610,2.38618270,1),(12,'okok','$2b$10$Ppbw/NyZhYqxEu2DC8BB8ObYm1o2nAo46cCkBiPn6dElk2g0JA2om','okok@okok.okok',0,'YEaBpmn3dCpcOcp',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,48.86107260,2.38765810,1),(13,'qqqq','$2b$10$clWFYUSNWpUJ0JaAIh4GiOHAnwfDMqtGwe6tOzTkWuADi/2PoK9k2','q@q.qq',0,'rmZ9YA2kyDwDIrr',0,NULL,NULL,NULL,NULL,NULL,24,NULL,NULL,NULL,0,48.87926200,2.38619510,1);
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
INSERT INTO `matchs` VALUES (12,2,1,'2018-09-02 12:23:53',1),(13,1,6,'2018-09-02 12:25:41',1),(14,2,6,'2018-09-02 18:08:59',1),(15,1,13,'2018-09-03 19:24:18',1);
/*!40000 ALTER TABLE `matchs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-05 15:47:02
