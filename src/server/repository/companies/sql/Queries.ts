const COMPANIES_TABLE = 'wikipet.companies';
const COMPANIES_PHONES = 'wikipet.companies_phones';
const COMPANIES_LOCATION = 'wikipet.companies_location';
const COMPANIES_ANIMALS = 'wikipet.companies_animals';
const CODE_VALUES = 'wikipet.code_values';
const WORKING_TIMES = 'wikipet.companies_working_time';
const FEEDBACK = 'wikipet.companies_feedback';
const USERS = 'wikipet.dle_users';

export default {
	GET: `
		SELECT
			c.COMPANY_ID companyId,
			c.URL_ID url_id,
			c.COMPANY_CATEGORY_ID categoryId,
			(SELECT NAME FROM wikipet.code_values WHERE ID = c.COMPANY_CATEGORY_ID) as categoryName,
			c.COMPANY_SUBCATEGORY_ID subcategoryId,
			(SELECT NAME FROM wikipet.code_values WHERE ID = c.COMPANY_SUBCATEGORY_ID) as subcategoryName,
			c.NAME name,
			c.LOGO logo,
			c.VK vk,
			c.FACEBOOK facebook,
			c.INSTAGRAM instagram,
			c.DESCRIPTION description,
			c.EMAIL email,
			c.WEBSITE_URL url,

			cl.COMPANY_LOCATION_ID locationId,
			cl.COUNTRY_ID countryId,
			(SELECT NAME FROM wikipet.code_values WHERE ID = cl.COUNTRY_ID) as countryName,
			cl.URL_ID locUrlId,
			cl.SUBWAY_ID subwayId,
			(SELECT NAME FROM wikipet.code_values WHERE ID = cl.SUBWAY_ID) as subwayName,
			cl.CITY_ID cityId,
			(SELECT NAME FROM wikipet.code_values WHERE ID = cl.CITY_ID) as cityName,
			cl.ADDRESS address,
			cl.IS_MAIN isMain,
			cl.LAT lat,
			cl.LNG lng,
			
			fe.COMPANY_FEEDBACK_ID feedbackId,
			fe.FEEDBACK feedback,
			fe.COMPANY_LOCATION_ID locId,
			fe.RATING rating,
			fe.creation_date createDate,
			fe.modification_date modificateDate,

			us.user_id userId,
			us.foto photo,
			us.name userName,
			
			wt.DAY_OF_WEEK dayOfWeek,
			wt.OPEN_TIME open,
			wt.CLOSE_TIME close,
			
			ph.COMPANY_PHONE_ID phoneId,
			ph.PHONE phone,
			
			ca.COMPANY_ANIMAL_ID as companyAnimalId,
			(SELECT NAME FROM wikipet.code_values WHERE ID = ca.ANIMAL_ID) as animalName,
			(SELECT NAME FROM wikipet.code_values WHERE ID = ca.BREED_ID) as breedName,
			ca.ANIMAL_ID as animalId,
			ca.BREED_ID as breedId

		FROM ${COMPANIES_TABLE} c
		
		LEFT JOIN ${COMPANIES_LOCATION} cl
			ON c.COMPANY_ID = cl.COMPANY_ID
		
		LEFT JOIN ${WORKING_TIMES} wt
			ON cl.COMPANY_LOCATION_ID = wt.COMPANY_LOCATION_ID
			
		LEFT JOIN ${COMPANIES_PHONES} ph
			ON cl.COMPANY_LOCATION_ID = ph.COMPANY_LOCATION_ID
			
		LEFT JOIN ${FEEDBACK} fe
			ON cl.COMPANY_LOCATION_ID = fe.COMPANY_LOCATION_ID
		
		LEFT JOIN ${USERS} us
			ON fe.USER_ID = us.user_id
			
		LEFT JOIN ${COMPANIES_ANIMALS} ca
			ON ca.COMPANY_ID = c.COMPANY_ID
			
		WHERE c.URL_ID = ?
		
		ORDER BY fe.CREATION_DATE DESC
	`,
	GET_BY_NAME: `
		SELECT
			c.COMPANY_ID companyId,
			c.NAME name,
			c.URL_ID url_id,
			c.COMPANY_CATEGORY_ID categoryId,
			c.COMPANY_SUBCATEGORY_ID subcategoryId,
			c.LOGO logo,
			c.DESCRIPTION description,
			c.EMAIL email,
			c.WEBSITE_URL url

		FROM ${COMPANIES_TABLE} c
		WHERE c.NAME LIKE ? AND c.COMPANY_SUBCATEGORY_ID = ?
	`,
	SAVE: `INSERT INTO ${COMPANIES_TABLE} set ?`,
	UPDATE_COMPANY: `UPDATE ${COMPANIES_TABLE} SET ? WHERE COMPANY_ID = ?`,
	DELETE: `DELETE FROM ${COMPANIES_TABLE} WHERE COMPANY_ID = ?`,

	SAVE_PHONES: `INSERT INTO ${COMPANIES_PHONES} VALUES ?`,
	DELETE_PHONES_BY_LOCATION: `DELETE FROM ${COMPANIES_PHONES} WHERE COMPANY_LOCATION_ID = ?`,

	SAVE_LOCATION: `INSERT INTO ${COMPANIES_LOCATION} VALUES ?`,
	SELECT_LOCATIONS_FOR_COMPANY: `SELECT COMPANY_LOCATION_ID locId FROM ${COMPANIES_LOCATION} WHERE COMPANY_ID = ?`,
	UPDATE_LOCATION: `UPDATE ${COMPANIES_LOCATION} SET ? WHERE COMPANY_LOCATION_ID = ?`,
	DELETE_LOCATIONS: `DELETE FROM ${COMPANIES_LOCATION} WHERE COMPANY_LOCATION_ID IN (?)`,

	SAVE_WORKING_TIMES: `INSERT INTO ${WORKING_TIMES} VALUES ?`,
	DELETE_WORKING_TIMES_BY_LOCATION: `DELETE FROM ${WORKING_TIMES} WHERE COMPANY_LOCATION_ID = ?`,

	SAVE_FEEDBACK: `INSERT INTO ${FEEDBACK} set ?`,
	DELETE_FEEDBACK: `DELETE FROM ${FEEDBACK} WHERE COMPANY_FEEDBACK_ID = ?`,

	SAVE_COMPANY_ANIMAL: `INSERT INTO ${COMPANIES_ANIMALS} VALUES ?`,
	DELETE_ANIMALS_FOR_COMPANY: `DELETE FROM ${COMPANIES_ANIMALS} WHERE COMPANY_ID = ?`
}