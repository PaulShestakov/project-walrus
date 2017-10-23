const COMPANIES_TABLE = 'wikipet.companies';
const COMPANIES_PHONES = 'wikipet.companies_phones';
const COMPANIES_LOCATION = 'wikipet.companies_location';
const CODE_VALUES = 'wikipet.code_values';
const WORKING_TIMES = 'wikipet.companies_working_time';
const FEEDBACK = 'wikipet.companies_feedback';
const USERS = 'wikipet.dle_users';

export default {
	GET: `
		SELECT
			c.COMPANY_ID companyId,
			c.COMPANY_CATEGORY_ID categoryId,
			(SELECT NAME FROM wikipet.code_values WHERE ID = c.COMPANY_CATEGORY_ID) as categoryName,
			c.COMPANY_SUBCATEGORY_ID subcategoryId,
			(SELECT NAME FROM wikipet.code_values WHERE ID = c.COMPANY_SUBCATEGORY_ID) as subcategoryName,
			c.NAME name,
			c.LOGO logo,
			c.DESCRIPTION description,
			c.EMAIL email,
			c.WEBSITE_URL url,

			cl.COMPANY_LOCATION_ID locationId,
			cl.SUBWAY_ID subwayId,
			cl.CITY_ID cityId,
			cl.ADDRESS address,
			cl.IS_MAIN isMain,
			cl.LAT lat,
			cl.LNG lng,
			
			wt.DAY_OF_WEEK dayOfWeek,
			wt.OPEN_TIME open,
			wt.CLOSE_TIME close,
			
			ph.COMPANY_PHONE_ID phoneId,
			ph.PHONE phone

		FROM ${COMPANIES_TABLE} c
		
		LEFT JOIN ${COMPANIES_LOCATION} cl
			ON c.COMPANY_ID = cl.COMPANY_ID
		
		LEFT JOIN ${WORKING_TIMES} wt
			ON cl.COMPANY_LOCATION_ID = wt.COMPANY_LOCATION_ID
			
		LEFT JOIN ${COMPANIES_PHONES} ph
			ON cl.COMPANY_LOCATION_ID = ph.COMPANY_LOCATION_ID
			
		WHERE c.COMPANY_ID = ?
	`,

	GET_BY_NAME: `
		SELECT
			c.COMPANY_ID companyId,
			c.NAME name,
			c.LOGO logo,
			c.DESCRIPTION description,
			c.EMAIL email,
			c.WEBSITE_URL url

		FROM ${COMPANIES_TABLE} c
		WHERE c.NAME LIKE ?
	`,

	SAVE: `INSERT INTO ${COMPANIES_TABLE} set ?`,

	SAVE_PHONES: `INSERT INTO ${COMPANIES_PHONES} VALUES ?`,

	SAVE_LOCATION: `INSERT INTO ${COMPANIES_LOCATION} VALUES ?`,

	SAVE_WORKING_TIMES: `INSERT INTO ${WORKING_TIMES} VALUES ?`,

	SAVE_FEEDBACK: `INSERT INTO ${FEEDBACK} set ?`,

	GET_FEEDBACKS: `SELECT
			f.COMPANY_FEEDBACK_ID feedbackId,
			f.COMPANY_ID companyId,
			f.FEEDBACK feedback,
			f.SUMMARY summary,
			f.RATING rating,
			f.creation_date createDate,
			f.modification_date modificateDate,

			u.user_id userId,
			u.foto photo,
			u.name userName

		FROM ${FEEDBACK} f
		LEFT JOIN ${USERS} u
			ON f.USER_ID = u.user_id
		WHERE f.COMPANY_ID = ?
		ORDER BY f.creation_date desc`,

	UPDATE_COMPANY: `UPDATE ${COMPANIES_TABLE} SET ? WHERE COMPANY_ID = ?`
}