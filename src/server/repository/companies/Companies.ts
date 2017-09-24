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
		const companySubcategoryId = params.companySubcategoryId;
		const citiesIds = Util.ensureArray(params.cityId);

		let filter = squel.expr();

		if (companySubcategoryId && companySubcategoryId !== 'ALL') {
			filter = filter.and('c.COMPANY_SUBCATEGORY_ID = ?', companySubcategoryId);
		}
		if (citiesIds.length > 0) {
			filter = filter.and('c.CITY_ID IN ?', citiesIds);
		}

		const sql = squel
			.select()
			.from('wikipet.companies', 'c')
			.where(filter)
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
}