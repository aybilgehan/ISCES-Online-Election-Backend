CREATE DATABASE  IF NOT EXISTS `isces_directory`;
USE `isces_directory`;



DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `student`;
DROP TABLE IF EXISTS `candidate`;
DROP TABLE IF EXISTS `admin`;
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
  `is_applied` TINYINT,
  PRIMARY KEY (`student_number`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `candidate` (
  `candidate_id` BIGINT NOT NULL,
  `votes` BIGINT NOT NULL,
  `student_number` BIGINT NOT NULL,
  PRIMARY KEY (`candidate_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `admin` (
  `admin_id` BIGINT NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `department_id` BIGINT,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




--
-- Inserting data for tables
--

INSERT INTO `user`
VALUES
('ahmetozdemir1@std.iyte.edu.tr','test123','student'),
('ahmetozdemir2@std.iyte.edu.tr','test123','student'),
('ahmetozdemir3@std.iyte.edu.tr','test123','student'),
('ahmetozdemir4@std.iyte.edu.tr','test123','student'),
('ahmetozdemir5@std.iyte.edu.tr','test123','student'),
('bilgehanay1@std.iyte.edu.tr','test123','student'),
('bilgehanay2@std.iyte.edu.tr','test123','student'),
('bilgehanay3@std.iyte.edu.tr','test123','student'),
('bilgehanay4@std.iyte.edu.tr','test123','student'),
('bilgehanay5@std.iyte.edu.tr','test123','student'),
('ecesavran1@std.iyte.edu.tr','test123','student'),
('ecesavran2@std.iyte.edu.tr','test123','student'),
('ecesavran3@std.iyte.edu.tr','test123','student'),
('ecesavran4@std.iyte.edu.tr','test123','student'),
('ecesavran5@std.iyte.edu.tr','test123','student'),
('emrekaraduman1@std.iyte.edu.tr','test123','student'),
('emrekaraduman2@std.iyte.edu.tr','test123','student'),
('emrekaraduman3@std.iyte.edu.tr','test123','student'),
('emrekaraduman4@std.iyte.edu.tr','test123','student'),
('emrekaraduman5@std.iyte.edu.tr','test123','student'),
('officer1@ofc.iyte.edu.tr','test123','officer'),
('officer2@ofc.iyte.edu.tr','test123','officer'),
('officer3@ofc.iyte.edu.tr','test123','officer'),
('officer4@ofc.iyte.edu.tr','test123','officer'),
('rector@rct.iyte.edu.tr','test123','rector');




INSERT INTO `student`
VALUES
(270201051, 1, 'Ahmet', 'Özdemir', 2.73, 3, 0, 'ahmetozdemir1@std.iyte.edu.tr', false),
(270201052, 1, 'Ahmet', 'Özdemir', 2.73, 3, 0, 'ahmetozdemir2@std.iyte.edu.tr', false),
(270201053, 1, 'Ahmet', 'Özdemir', 2.73, 3, 0, 'ahmetozdemir3@std.iyte.edu.tr', false),
(270201054, 1, 'Ahmet', 'Özdemir', 2.73, 3, 0, 'ahmetozdemir4@std.iyte.edu.tr', false),
(270201055, 1, 'Ahmet', 'Özdemir', 2.73, 3, 0, 'ahmetozdemir5@std.iyte.edu.tr', false),
(270201021, 2, 'Bilgehan', 'Ay', 3.41, 3, 0, 'bilgehanay1@std.iyte.edu.tr', false),
(270201022, 2, 'Bilgehan', 'Ay', 3.41, 3, 0, 'bilgehanay2@std.iyte.edu.tr', false),
(270201023, 2, 'Bilgehan', 'Ay', 3.41, 3, 0, 'bilgehanay3@std.iyte.edu.tr', false),
(270201024, 2, 'Bilgehan', 'Ay', 3.41, 3, 0, 'bilgehanay4@std.iyte.edu.tr', false),
(270201025, 2, 'Bilgehan', 'Ay', 3.41, 3, 0, 'bilgehanay5@std.iyte.edu.tr', false),
(270201031, 3, 'Ece', 'Savran', 3.41, 3, 0, 'ecesavran1@std.iyte.edu.tr', false),
(270201032, 3, 'Ece', 'Savran', 3.41, 3, 0, 'ecesavran2@std.iyte.edu.tr', false),
(270201033, 3, 'Ece', 'Savran', 3.41, 3, 0, 'ecesavran3@std.iyte.edu.tr', false),
(270201034, 3, 'Ece', 'Savran', 3.41, 3, 0, 'ecesavran4@std.iyte.edu.tr', false),
(270201035, 3, 'Ece', 'Savran', 3.41, 3, 0, 'ecesavran5@std.iyte.edu.tr', false),
(270201071, 4, 'Emre', 'Karaduman', 3.41, 3, 0, 'emrekaraduman1@std.iyte.edu.tr', false),
(270201072, 4, 'Emre', 'Karaduman', 3.41, 3, 0, 'emrekaraduman2@std.iyte.edu.tr', false),
(270201073, 4, 'Emre', 'Karaduman', 3.41, 3, 0, 'emrekaraduman3@std.iyte.edu.tr', false),
(270201074, 4, 'Emre', 'Karaduman', 3.41, 3, 0, 'emrekaraduman4@std.iyte.edu.tr', false),
(270201075, 4, 'Emre', 'Karaduman', 3.41, 3, 0, 'emrekaraduman5@std.iyte.edu.tr', false);




INSERT INTO `admin`
VALUES
(1,'officer1firstname','officer1lastname','officer1@ofc.iyte.edu.tr',1),
(2,'officer2firstname','officer2lastname','officer2@ofc.iyte.edu.tr',2),
(3,'officer3firstname','officer3lastname','officer3@ofc.iyte.edu.tr',3),
(4,'officer4firstname','officer4lastname','officer4@ofc.iyte.edu.tr',4),
(5,'rectorfirstname','rectorlastname','rector@rct.iyte.edu.tr',null);



