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


CREATE TABLE IF NOT EXISTS `testing` (
  `testing_id` int(11) NOT NULL AUTO_INCREMENT,
    `score_management_id` int(11) DEFAULT NULL,
    `answered` int(11) DEFAULT NULL,
  `unanswred` varchar(255) DEFAULT NULL,
   `comments` Text DEFAULT NULL,
    `reviewer` varchar(255) DEFAULT NULL,
   `review_status` varchar(255) DEFAULT NULL,
  `creation_date` varchar(255) DEFAULT NULL,
  `modification_date` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`testing_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


CREATE TABLE IF NOT EXISTS `gap_analysis` (
  `gap_analysis_id` int(11) NOT NULL AUTO_INCREMENT,
   `review_status` varchar(255) DEFAULT NULL,
    `description1` Text DEFAULT NULL,
    `description2` Text DEFAULT NULL,
    `description3` Text DEFAULT NULL,
    `description4` Text DEFAULT NULL,
    `gap` varchar(255) DEFAULT NULL,
     `indicate_action` varchar(255) DEFAULT NULL,
      `requirements_implemented` varchar(255) DEFAULT NULL,
       `document_id` varchar(255) DEFAULT NULL,
        `document_description` varchar(255) DEFAULT NULL,
 `version` varchar(255) DEFAULT NULL,
  `release_date` varchar(255) DEFAULT NULL,
   `assessed` varchar(255) DEFAULT NULL,
    `acceptable` varchar(255) DEFAULT NULL,
     `remarks` varchar(255) DEFAULT NULL,
     `onsite_assessed` varchar(255) DEFAULT NULL,
    `onsite_acceptable` varchar(255) DEFAULT NULL,
     `onsite_remarks` varchar(255) DEFAULT NULL,
  `creation_date` varchar(255) DEFAULT NULL,
  `modification_date` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`gap_analysis_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


CREATE TABLE IF NOT EXISTS `correlation_matrix` (
  `correlation_matrix_id` int(11) NOT NULL AUTO_INCREMENT,
    `validation_test` varchar(255) DEFAULT NULL,
     `validation_date` varchar(255) DEFAULT NULL,
      `validated_name` varchar(255) DEFAULT NULL,
       `comments` Text DEFAULT NULL,
  `software_version` varchar(255) DEFAULT NULL,
   `file_name` varchar(255) DEFAULT NULL,
    `storage_location` archar(255) DEFAULT NULL,
    `supplier` varchar(255) DEFAULT NULL,
  `creation_date` varchar(255) DEFAULT NULL,
  `modification_date` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `modified_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`correlation_matrix_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;
