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
ADD CONSTRAINT `Company_Feedback_Location`
  FOREIGN KEY (`COMPANY_FEEDBACK_ID`)
  REFERENCES `wikipet`.`companies_location` (`COMPANY_LOCATION_ID`)
  ON DELETE CASCADE
  ON UPDATE NO ACTION;
