-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.10-log - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping structure for table moomootravel.vacations
CREATE TABLE IF NOT EXISTS `vacations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `origin_airport_id` int(11) DEFAULT '-1',
  `destination_airport_id` int(11) DEFAULT '-1',
  `departure_date` date DEFAULT NULL,
  `return_date` date DEFAULT NULL,
  `flight_adults` int(11) DEFAULT '1',
  `flight_children` int(11) DEFAULT '0',
  `flight_seniors` int(11) DEFAULT '0',
  `flight_infants_lap` int(11) DEFAULT '0',
  `flight_infants_seat` int(11) DEFAULT NULL,
  `vac_custom` tinyint(4) DEFAULT NULL,
  `vac_lat` double DEFAULT NULL,
  `vac_lng` double DEFAULT NULL,
  `selected_flight_id` varchar(40) DEFAULT NULL,
  `selected_hotel_id` varchar(40) DEFAULT NULL,
  `selected_car_id` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `vacation_destination_airport_id` (`destination_airport_id`),
  KEY `vacation_origin_airport_id` (`origin_airport_id`),
  KEY `vacation_user_id` (`user_id`),
  CONSTRAINT `vacation_destination_airport_id` FOREIGN KEY (`destination_airport_id`) REFERENCES `airports` (`id`),
  CONSTRAINT `vacation_origin_airport_id` FOREIGN KEY (`origin_airport_id`) REFERENCES `airports` (`id`),
  CONSTRAINT `vacation_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Dumping data for table moomootravel.vacations: ~1 rows (approximately)
DELETE FROM `vacations`;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` (`id`, `name`, `user_id`, `origin_airport_id`, `destination_airport_id`, `departure_date`, `return_date`, `flight_adults`, `flight_children`, `flight_seniors`, `flight_infants_lap`, `flight_infants_seat`, `vac_custom`, `vac_lat`, `vac_lng`, `selected_flight_id`, `selected_hotel_id`, `selected_car_id`) VALUES
	(2, 'vacation name nxion', 1, 6554, 6557, '2017-09-03', '2017-11-09', 1, 0, 0, 0, 0, 1, 2312.123, 12312.12312, '52345jg5k3h5gh2345', 'gf89yuuasdjk283jsef89x', 'dfadasd8f7a898efy893y98yf'),
	(4, 'dsfsdfsd', 1, 8717, 8795, NULL, NULL, 1, 0, 0, 0, 0, 0, 0, 0, 'watergateisalie', '', 'watergateisalie'),
	(5, 'dsfsdfsd', 1, 8717, 8795, NULL, NULL, 1, 0, 0, 0, 0, 0, 0, 0, 'watergateisalie', '', 'watergateisalie'),
	(6, 'NewNixon', 1, 8717, 8795, '2017-05-05', '2017-05-06', 1, 0, 0, 0, 0, 0, 38.186375, -85.74179, 'watergateisalie', '', 'watergateisalie'),
	(7, '', 1, 8717, 8423, '2017-04-04', '2017-04-05', 1, 0, 0, 0, 0, 0, 33.640068, -84.44403, 'watergateisalie', '', 'watergateisalie');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
