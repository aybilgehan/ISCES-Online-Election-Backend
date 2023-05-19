CREATE DATABASE  IF NOT EXISTS `employee-directory`;
USE `employee_directory`;

DROP TABLE IF EXISTS `authorities`;
DROP TABLE IF EXISTS `users`;

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `enabled` tinyint NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Inserting data for table `users`
--

INSERT INTO `users` 
VALUES 
('john','{noop}test123',1),
('mary','{noop}test123',1),
('susan','{noop}test123',1);


--
-- Table structure for table `authorities`
--

CREATE TABLE `authorities` (
  `email` varchar(50) NOT NULL,
  `authority` varchar(50) NOT NULL,
  UNIQUE KEY `authorities_idx_1` (`email`,`authority`),
  CONSTRAINT `authorities_ibfk_1` FOREIGN KEY (`email`) REFERENCES `users` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Inserting data for table `authorities`
--

INSERT INTO `authorities` 
VALUES 
('john','ROLE_STUDENT'),
('mary','ROLE_STUDENT'),
('mary','ROLE_REPRESENTATIVE'),
('susan','ROLE_STUDENT'),
('susan','ROLE_REPRESENTATIVE'),
('susan','ROLE_RECTOR');


