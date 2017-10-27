ALTER TABLE `wikipet`.`companies_location` 
ADD CONSTRAINT `Location_Company`
  FOREIGN KEY (`COMPANY_ID`)
  REFERENCES `wikipet`.`companies` (`COMPANY_ID`)
  ON DELETE CASCADE
  ON UPDATE NO ACTION;

ALTER TABLE `wikipet`.`companies_phones` 
ADD INDEX `Phones_Company_idx` (`COMPANY_LOCATION_ID` ASC);
ALTER TABLE `wikipet`.`companies_phones` 
ADD CONSTRAINT `Phones_Company`
  FOREIGN KEY (`COMPANY_LOCATION_ID`)
  REFERENCES `wikipet`.`companies_location` (`COMPANY_LOCATION_ID`)
  ON DELETE CASCADE
  ON UPDATE NO ACTION;

  
ALTER TABLE `wikipet`.`companies_working_time` 
ADD CONSTRAINT `Working_Time_Location`
  FOREIGN KEY (`COMPANY_LOCATION_ID`)
  REFERENCES `wikipet`.`companies_location` (`COMPANY_LOCATION_ID`)
  ON DELETE CASCADE
  ON UPDATE NO ACTION;

  
ALTER TABLE `wikipet`.`companies_feedback` 
DROP FOREIGN KEY `Company_Feedback_Location`;
ALTER TABLE `wikipet`.`companies_feedback` 
ADD INDEX `Company_Feedback_Location_idx` (`COMPANY_ID` ASC),
DROP PRIMARY KEY;
ALTER TABLE `wikipet`.`companies_feedback` 
ADD CONSTRAINT `Company_Feedback_Location`
  FOREIGN KEY (`COMPANY_ID`)
  REFERENCES `wikipet`.`companies` (`COMPANY_ID`)
  ON DELETE CASCADE
  ON UPDATE NO ACTION;
