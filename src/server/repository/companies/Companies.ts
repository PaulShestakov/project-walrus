import * as squel from "squel";

import { executeQuery, executeSeries, executeParallel } from '../../database/DBHelper';

import Queries from './sql/Queries';
import BaseCRUD from "../BaseCRUD";
import Util from "../../util/Util";
import * as uuid from 'uuid';

export default class Companies extends BaseCRUD  {

	static getCompany(companyId: string, callback) {
        const getCompany = (connection, done) => {
            connection.query(Queries.GET, [companyId], (error, result) => {
                if (result && result.length > 0) {
                    result = Companies.externalizeCompany(result[0]);
                }
                done(error, result);
            });
        };
        const getPhones = (connection, done) => {
            connection.query(Queries.GET_PHONES, [companyId], (error, result) => {
                let res = [];
                if (result && result.length > 0) {
                    result.forEach(item => {
                        res.push(item.PHONE);
                    });
                }
                done(error, res);
            });
        };
        executeParallel([getCompany, getPhones], (error, result) => {
            if (error) {
                Util.handleError(error, callback);
            } else {
                result[0].phones = result[1];
                callback(null, result[0]);
            }
        });
	}

	static postCompany(company: Company, callback) {
	    let phones: Array<string> = company.phones;
	    const savePhones = (connection, done) => {
	        if (phones) {
                connection.query(Queries.SAVE_PHONES, [phones.map(item => Companies.internalizePhone(company.companyId, item))], (error, result) => {
                    done(error, result);
                });
            } else {
	            done(null, null);
            }

        };
	    const saveCompany = (connection, done) => {
	        delete company.phones;
            connection.query(Queries.SAVE, [Companies.internalizeCompany(company)], (error, result) => {
                done(error, result);
            });
        };
        executeParallel([saveCompany, savePhones], (error, result) => {
            if (error) {
                Util.handleError(error, callback);
            } else {
                callback(null, { message : 'Success'});
            }
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

    static internalizeCompany(company: Company) {
        return {
            COMPANY_ID: uuid(),
            NAME: company.name,
            LOGO: company.logo,
            DESCRIPTION: company.description,
            EMAIL: company.email,
            WEBSITE_URL: company.url,
            LAT: company.lat,
            LNG: company.lng,

            COMPANY_CATEGORY_ID: company.companyCategoryId,
            COMPANY_SUBCATEGORY_ID: company.companySubcategoryId
        };
    }

    static internalizePhone(companyId, phone) {
	    return {
	        COMPANY_PHONE_ID: uuid(),
	        COMPANY_ID: companyId,
            PHONE: phone
        };
    }

    static externalizeCompany(company) {
        return {
            companyId: company.COMPANY_ID,
            name: company.NAME,
            logo: company.LOGO,
            description: company.DESCRIPTION,
            email: company.EMAIL,
            url: company.WEBSITE_URL,
            phone: company.PHONE,
            lat: company.LAT,
            lng: company.LNG,

            companyCategoryId: company.COMPANY_CATEGORY_ID,
            companySubcategoryId: company.COMPANY_SUBCATEGORY_ID,
            companyCategoryName: company.COMPANY_CATEGORY_NAME,
            companySubcategoryName: company.COMPANY_SUBCATEGORY_NAME,
        };
    }
}