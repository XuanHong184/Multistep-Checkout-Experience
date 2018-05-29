CREATE DATABASE IF NOT EXISTS checkout;

USE checkout;

-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'address'
-- 
-- ---

DROP TABLE IF EXISTS `address`;
		
CREATE TABLE `address` (
  `id` INTEGER AUTO_INCREMENT,
  `line1` MEDIUMTEXT NULL DEFAULT NULL,
  `line2` MEDIUMTEXT NULL DEFAULT NULL,
  `city` MEDIUMTEXT NULL DEFAULT NULL,
  `state` MEDIUMTEXT NULL DEFAULT NULL,
  `zip` MEDIUMTEXT NULL DEFAULT NULL,
  `user_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'cards'
-- 
-- ---

DROP TABLE IF EXISTS `cards`;
		
CREATE TABLE `cards` (
  `id` INTEGER AUTO_INCREMENT,
  `number` MEDIUMTEXT NULL DEFAULT NULL,
  `expiry` MEDIUMTEXT NULL DEFAULT NULL,
  `cvv` MEDIUMTEXT NULL DEFAULT NULL,
  `zip` MEDIUMTEXT NULL DEFAULT NULL,
  `user_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'users'
-- 
-- ---

DROP TABLE IF EXISTS `users`;
		
CREATE TABLE `users` (
  `id` INTEGER AUTO_INCREMENT,
  `username` MEDIUMTEXT NULL DEFAULT NULL,
  `password` MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `address` ADD FOREIGN KEY (user_id) REFERENCES `users` (`id`);
ALTER TABLE `cards` ADD FOREIGN KEY (user_id) REFERENCES `users` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `address` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `cards` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `users` (`username`,`password`) VALUES
-- ('','');
-- INSERT INTO `address` (`line1`,`line2`,`city`,`state`,`zip`,`user_id`) VALUES
-- ('','','','','','');
-- INSERT INTO `cards` (`number`,`expiry`,`cvv`,`zip`,`user_id`) VALUES
-- ('','','','','');
