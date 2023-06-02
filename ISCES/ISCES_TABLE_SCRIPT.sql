CREATE DATABASE  IF NOT EXISTS `isces_directory`;
USE `isces_directory`;


DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `student`;
DROP TABLE IF EXISTS `candidate`;
--
-- Table structure for ısces
--


CREATE TABLE `user` (
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `role` varchar(50) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `student` (
  `student_number` BIGINT NOT NULL,
  `department_id` BIGINT NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `grade` FLOAT NOT NULL,
  `term` BIGINT NOT NULL,
  `is_voted` TINYINT NOT NULL,
  `email` varchar(50) NOT NULL,
  `is_applied` TINYINT NOT NULL,
  PRIMARY KEY (`student_number`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `candidate` (
  `candidate_id` BIGINT NOT NULL,
  `votes` BIGINT NOT NULL,
  `student_number` BIGINT NOT NULL,
  `status` TINYINT,
  PRIMARY KEY (`candidate_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;





--
-- Inserting data for tables
--

INSERT INTO `user` 
VALUES 
('ahmetozdemir@std.iyte.edu.tr','test123','student'),
('bilgehanay@std.iyte.edu.tr','test123','candidate'),
('ecesavran@std.iyte.edu.tr','test123','student'),
('emrekaraduman@std.iyte.edu.tr','test123','candidate');


INSERT INTO `student` 
VALUES 
(270201050,1,'Ahmet','Özdemir',2.73,3,0,'ahmetozdemir@std.iyte.edu.tr',false),
(270201020,1,'Ece','Savran',3.41,3,0,'ecesavran@std.iyte.edu.tr',false),
(270201030,1,'Emre','Karaduman',3.41,3,0,'emrekaraduman@std.iyte.edu.tr',false),
(270201070,1,'Bilgehan','Ay',3.41,3,0,'bilgehanay@std.iyte.edu.tr',false);







