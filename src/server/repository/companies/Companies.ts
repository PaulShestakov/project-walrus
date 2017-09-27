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
		const companyCategoryId = params.companyCategoryId;
		const companySubcategoryId = params.companySubcategoryId;
		const citiesIds = Util.ensureArray(params.cityId);
		const daysOfWeekIds = Util.ensureArray(params.dayOfWeek);

		let filter = squel.expr();

		if (companyCategoryId && companyCategoryId !== 'ALL') {
			filter = filter.and('c.COMPANY_CATEGORY_ID = ?', companyCategoryId);
		}
		if (companySubcategoryId && companySubcategoryId !== 'ALL') {
			filter = filter.and('c.COMPANY_SUBCATEGORY_ID = ?', companySubcategoryId);
		}
		if (citiesIds.length > 0) {
			filter = filter.and('l.CITY_ID IN ?', citiesIds);
		}
		if (daysOfWeekIds.length > 0) {
			filter = filter.and('t.DAY_OF_WEEK IN ?', daysOfWeekIds);
		}

		const sql = squel
			.select()
				.field('c.COMPANY_ID')
				.field('c.COMPANY_CATEGORY_ID')
				.field('c.COMPANY_SUBCATEGORY_ID')
				.field('c.LOGO')
				.field('c.DESCRIPTION')
				.field('c.EMAIL')
				.field('c.WEBSITE_URL')

				.field('l.COMPANY_LOCATION_ID')
				.field('l.CITY_ID')
				.field('cv1.NAME', 'CITY_NAME')
				.field('l.ADDRESS')
				.field('l.SUBWAY_ID')
				.field('l.LAT')
				.field('l.LNG')

				.field('t.DAY_OF_WEEK')
				.field('cv2.NAME', 'DAY_OF_WEEK_NAME')
				.field('t.OPEN_TIME')
				.field('t.CLOSE_TIME')

			.from('wikipet.companies', 'c')
			.left_join('wikipet.companies_location', 'l', 'l.COMPANY_ID = c.COMPANY_ID')
			.left_join('wikipet.companies_working_time', 't', 't.COMPANY_ID = c.COMPANY_ID')
			.left_join('wikipet.code_values', 'cv1', "cv1.GROUP = 'CITY' AND cv1.ID = l.CITY_ID")
			.left_join('wikipet.code_values', 'cv2', "cv2.GROUP = 'DAY_OF_WEEK' AND cv2.ID = t.DAY_OF_WEEK")
			.where(filter)
			.toParam();

		executeQuery(sql.text, sql.values, (error, flatData) => {
			if (error) {
				callback(error);
				return;
			}

			const reducedData = flatData.reduce((acc, row) => {

				if (!acc[row.COMPANY_ID]) {
					acc[row.COMPANY_ID] = {
						companyId: row.COMPANY_ID,
						name: row.NAME,
						logo: row.LOGO,
						description: row.DESCRIPTION,
						email: row.EMAIL,
						websiteUrl: row.WEBSITE_URL,

						locations: {}
					};
				}

				if (!acc[row.COMPANY_ID].locations[row.COMPANY_LOCATION_ID]) {
					acc[row.COMPANY_ID].locations[row.COMPANY_LOCATION_ID] = {
						companyLocationId: row.COMPANY_LOCATION_ID,
						cityId: row.CITY_ID,
						cityName: row.CITY_NAME,
						address: row.ADDRESS,
						subwayId: row.SUBWAY_ID,
						lat: row.LAT,
						lng: row.LNG,

						workingDays: []
					}
				}

				acc[row.COMPANY_ID].locations[row.COMPANY_LOCATION_ID].workingDays.push({
					dayOfWeek: row.DAY_OF_WEEK,
					dayOfWeekName: row.DAY_OF_WEEK_NAME,
					openTime: row.OPEN_TIME,
					closeTime: row.CLOSE_TIME,
				});

				return acc;
			}, {});

			const result = Object.values(reducedData).map(company => ({
				...company,
				locations: Object.values(company.locations)
			}));

			callback(null, result);
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
			websiteUrl: company.WEBSITE_URL,

			companyLocationId: company.COMPANY_LOCATION_ID,
			cityId: company.CITY_ID,
			address: company.ADDRESS,
			subwayId: company.SUBWAY_ID,
			lat: company.LAT,
			lng: company.LNG,

			dayOfWeek: company.DAY_OF_WEEK,
			dayOfWeekName: company.DAY_OF_WEEK_NAME,
			openTime: company.OPEN_TIME,
			closeTime: company.CLOSE_TIME,
		};
	}
}