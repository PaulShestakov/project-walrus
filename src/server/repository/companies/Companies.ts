import * as squel from "squel";

import Util from '../../util/Util';

import { executeQuery, executeSeries, executeParallel } from '../../database/DBHelper';

import Queries from './sql/Queries';



export default class Companies {

	static externalizeCompany(company) {
		return {
			companyId: company.COMPANY_ID,
			companyTypeId: company.COMPANY_TYPE_ID,
			companyExactTypeId: company.COMPANY_EXACT_TYPE_ID,
			name: company.NAME,
			logo: company.LOGO,
			description: company.DESCRIPTION,
			email: company.EMAIL,
			url: company.URL,
			phone: company.PHONE,
			lat: company.LAT,
			lng: company.LNG,
			companyTypeName: company.COMPANY_TYPE_NAME,
			companyExactTypeName: company.COMPANY_EXACT_TYPE_NAME,
		};
	}

	static getCompany(companyId: string, callback) {
		executeQuery(Queries.GET, [companyId], (error, result) => {
			if (result && result.length > 0) {
				result = Companies.externalizeCompany(result[0]);
			}
            callback(error, result);
		});
	}

	static getFiltered(params, callback): void {
		const companyCategoryId = params.companyCategoryId;
		const companySubcategoryId = params.companySubcategoryId;
		const cityId = params.cityId;

		let filter = squel.expr();

		if (companyCategoryId && companyCategoryId !== 'ALL') {
			filter = filter.and('c.COMPANY_CATEGORY_ID = ?', companyCategoryId);
		}
		if (companySubcategoryId && companySubcategoryId !== 'ALL') {
			filter = filter.and('c.COMPANY_SUBCATEGORY_ID = ?', companySubcategoryId);
		}

		const sql = squel
			.select()
			.from('wikipet.companies', 'c')
			// .where(filter)
			.toParam();

		executeQuery(sql.text, sql.values, (error, rows) => {
			if (error) {
				callback(error);
				return;
			}
			const companies = rows.map(Companies.externalizeCompany);
			callback(null, companies);
		});
	}

	static getCompaniesCategories(callback) {
		executeQuery(Queries.GET_COMPANIES_CATEGORIES, [], (error, result) => {
			if (result) {
				const reducedRecords = result.map(Companies.externalizeCompanyCategory).reduce(Companies.companiesCategoryReducer, {});
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