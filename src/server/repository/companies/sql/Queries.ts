const COMPANIES_TABLE = 'wikipet.companies';
const COMPANIES_PHONES = 'wikipet.companies_phones';
const COMPANINES_LOCATION = 'wikipet.companies_location';
const CODE_VALUES = 'wikipet.code_values';
const WORKING_TIMES = 'wikipet.companies_working_time';

export default {
	GET: `
		SELECT
			c.COMPANY_ID companyId,
			(SELECT cv.NAME FROM wikipet.code_values cv WHERE cv.ID = c.COMPANY_SUBCATEGORY_ID) as subcatName,
			c.COMPANY_CATEGORY_ID catId,
			c.COMPANY_SUBCATEGORY_ID subCatId,
			c.NAME name,
			c.LOGO logo,
			c.DESCRIPTION description,
			c.EMAIL email,
			c.WEBSITE_URL url,

			cl.SUBWAY_ID subwayId,
			cl.CITY_ID cityId,
			cl.ADDRESS address,
			cl.LAT lat,
			cl.LNG lng

		FROM ${COMPANIES_TABLE} c
		JOIN ${COMPANINES_LOCATION} cl
			ON c.COMPANY_ID = cl.COMPANY_ID
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

	GET_PHONES: `SELECT PHONE FROM ${COMPANIES_PHONES} WHERE COMPANY_ID = ?`,

	SAVE_PHONES: `INSERT INTO ${COMPANIES_PHONES} VALUES ?`,

	SAVE_LOCATION: `INSERT INTO ${COMPANINES_LOCATION} set ?`,

	SAVE_WORKING_TIMES: `INSERT INTO ${WORKING_TIMES} VALUES ?`,
}