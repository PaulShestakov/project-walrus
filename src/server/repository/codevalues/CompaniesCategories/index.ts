import BaseCRUD from "../../BaseCRUD";
import {executeQuery} from "../../../database/DBHelper";

export default class CompaniesCategories extends BaseCRUD {

	constructor() {
		super(null);
	}

	getAll(callback) {
		// TODO: So-so
		const redefinedQuery = `
			SELECT
				ct.COMPANY_CATEGORY_ID,
				ct.COMPANY_CATEGORY_NAME,
	
				cet.COMPANY_SUBCATEGORY_ID,
				cet.COMPANY_SUBCATEGORY_NAME
	
			FROM wikipet.COMPANIES_CATEGORIES AS ct
	
			INNER JOIN wikipet.COMPANIES_SUBCATEGORIES AS cet
				ON ct.COMPANY_CATEGORY_ID = cet.COMPANY_CATEGORY_ID`;

		executeQuery(redefinedQuery, [], (error, result) => {
			if (result) {
				const reducedRecords = result
					.map(CompaniesCategories.externalizeCompanyCategory)
					.reduce(CompaniesCategories.companiesCategoryReducer, {});
				result = Object.values(reducedRecords);
			}
			callback(error, result);
		});
	}

	static externalizeCompanyCategory(record) {
		return {
			companyCategoryId: record.COMPANY_CATEGORY_ID,
			companyCategoryName: record.COMPANY_CATEGORY_NAME,
			companySubcategoryId: record.COMPANY_SUBCATEGORY_ID,
			companySubcategoryName: record.COMPANY_SUBCATEGORY_NAME,
		}
	}


	static companiesCategoryReducer(acc, record) {
		if (!acc[record.companyCategoryId]) {
			acc[record.companyCategoryId] = {
				companyCategoryId: record.companyCategoryId,
				companyCategoryName: record.companyCategoryName,
				subcategories: []
			};
		}
		acc[record.companyCategoryId].subcategories.push({
			companySubcategoryId: record.companySubcategoryId,
			companySubcategoryName: record.companySubcategoryName,
		});
		return acc;
	}
}