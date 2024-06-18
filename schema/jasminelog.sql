CREATE TABLE IF NOT EXISTS `score_management` (
  `score_management_id` int(11) NOT NULL AUTO_INCREMENT,
    `score_id` int(11) DEFAULT NULL,
    `company_id` int(11) DEFAULT NULL,
  `score` varchar(255) DEFAULT NULL,
   `review_status` varchar(255) DEFAULT NULL,
    `comments` Text DEFAULT NULL,
    `reviewer` varchar(255) DEFAULT NULL,
  `creation_date` varchar(255) DEFAULT NULL,
  `modification_date` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`score_management_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `score_management_history` (
  `score_management_history_id` int(11) NOT NULL AUTO_INCREMENT,
    `score_management_id` int(11) DEFAULT NULL,
    `question_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
   `comments` Text DEFAULT NULL,
    `reviewer` varchar(255) DEFAULT NULL,
   `review_status` varchar(255) DEFAULT NULL,
  `creation_date` varchar(255) DEFAULT NULL,
  `modification_date` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`score_management_history_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


CREATE TABLE IF NOT EXISTS `question_management` (
  `question_management_id` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(255) DEFAULT NULL,
    `category` varchar(255) DEFAULT NULL,
   `iso_code` varchar(255) DEFAULT NULL,
  `creation_date` varchar(255) DEFAULT NULL,
  `modification_date` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`question_management_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;