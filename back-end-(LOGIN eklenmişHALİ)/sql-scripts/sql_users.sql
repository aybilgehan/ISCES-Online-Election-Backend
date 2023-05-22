CREATE DATABASE  IF NOT EXISTS `employee_directory`;
USE `employee_directory`;


DROP TABLE IF EXISTS `user`;

--
-- Table structure for table `users`
--

CREATE TABLE `user` (
  `id` varchar(15) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Inserting data for table `users`
--

INSERT INTO `user` 
VALUES 
('270201050','Ahmet','Özdemir','ahmetozdemir@std.iyte.edu.tr','test123'),
('270201030','Emre','Karaduman','emrekaraduman@std.iyte.edu.tr','test123'),
('270201000','Yusuf','Baran','yusufbaran@rct.iyte.edu.tr','test123');