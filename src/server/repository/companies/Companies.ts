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
			if (result) {
				result = Companies.externalizeCompany(result[0]);
			}
			callback(error, result);
		});
	}

	public getFiltered(params, callback): void {
		// Retrieve filter params
		const typeId = params.type;
		const animalId = params.animal;
		const breedsIds = Util.ensureArray(params.breeds);
		const citiesIds = Util.ensureArray(params.cities);
		const priceFrom = params.priceFrom;
		const priceTo = params.priceTo;

		let filter = squel.expr();


		const sql = squel
			.select()
			.from('wikipet.companies', 'p')
			.where(filter)
			.order('p.CREATION_DATE', false)
			.toParam();

		// executeQuery(sql.text, sql.values, (error, rows) => {
		// 	if (error) {
		// 		callback(error);
		// 		return;
		// 	}
		// 	const promos = rows.map(Promo.externalizePromo);
		// 	callback(null, promos);
		// });
	}

	static getCompaniesTypes(callback) {
		executeQuery(Queries.GET_COMPANIES_TYPES, [], (error, result) => {
			if (result) {
				const reducedRecords = result.map(Companies.externalizeCompanyType).reduce(Companies.companiesTypesReducer, {});
				result = Object.values(reducedRecords);
			}
			callback(error, result);
		});
	}

	static externalizeCompanyType(record) {
		return {
			companyTypeId: record.COMPANY_TYPE_ID,
			companyTypeName: record.COMPANY_TYPE_NAME,
			companyExactTypeId: record.COMPANY_EXACT_TYPE_ID,
			companyExactTypeName: record.COMPANY_EXACT_TYPE_NAME,
		}
	}


	static companiesTypesReducer(acc, record) {
		if (!acc[record.companyTypeId]) {
			acc[record.companyTypeId] = {
				companyTypeId: record.companyTypeId,
				companyTypeName: record.companyTypeName,
				exactTypes: []
			};
		}
		acc[record.companyTypeId].exactTypes.push({
			companyExactTypeId: record.companyExactTypeId,
			companyExactTypeName: record.companyExactTypeName,
		});
		return acc;
	}
}