const COMPANIES_TABLE = 'wikipet.companies';
const COMPANIES_CATEGORIES_TABLE = 'wikipet.companies_categories';
const COMPANIES_SUBCATEGORIES_TABLE = 'wikipet.companies_subcategories';
const COMPANIES_PHONES = 'wikipet.companies_phones';

export default {
	GET: `
		SELECT
			c.COMPANY_ID,
			c.COMPANY_CATEGORY_ID,
			c.COMPANY_SUBCATEGORY_ID,
			c.NAME,
			c.LOGO,
			c.DESCRIPTION,
			c.EMAIL,
			c.WEBSITE_URL

		FROM ${COMPANIES_TABLE} AS c

		WHERE c.COMPANY_ID = ?
	`,

	SAVE: `INSERT INTO ${COMPANIES_TABLE} set ?`,

	GET_PHONES: `SELECT PHONE FROM ${COMPANIES_PHONES} WHERE COMPANY_ID = ?`,

	SAVE_PHONES: `INSERT INTO ${COMPANIES_PHONES} VALUES ?`
}