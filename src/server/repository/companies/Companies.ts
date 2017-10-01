import * as squel from "squel";

import { executeQuery, executeSeries, executeParallel } from '../../database/DBHelper';
import * as _ from 'lodash';

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
		company.companyId = uuid();
	    const savePhones = (connection, done) => {
			let phones: Array<string> = company.phones;
	        if (phones && phones.length > 0) {
                connection.query(Queries.SAVE_PHONES,
					[phones.map(item => Companies.internalizePhone(company.companyId, item))], (error, result) => {
                    done(error, result);
                });
            } else {
	            done(null, null);
            }
		};
		const saveLocation = (connection, done) => {
	        connection.query(Queries.SAVE_LOCATION, [Companies.internalizeLocation(company)], (error, result) => {
				done(error, result);
			});
		};
		const saveWorkingTimes = (connection, done) => {
			let times = company.workingTimes;
			if (times && times.length > 0) {
				connection.query(Queries.SAVE_WORKING_TIMES, [times.map(item => Companies.internalizeTime(company, item))], (error, result) => {
					done(error, result);
				});
			} else {
				done(null, null);
			}
        };
	    const saveCompany = (connection, done) => {
            connection.query(Queries.SAVE, [Companies.internalizeCompany(company)], (error, result) => {
                done(error, result);
            });
        };
        executeSeries([saveCompany, saveLocation, savePhones, saveWorkingTimes], (error, result) => {
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
				.field('c.NAME')
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

				.field('p.COMPANY_PHONE_ID')
				.field('p.PHONE')

			.from('wikipet.companies', 'c')
			.left_join('wikipet.companies_location', 'l', 'l.COMPANY_ID = c.COMPANY_ID')
			.left_join('wikipet.companies_working_time', 't', 't.COMPANY_ID = c.COMPANY_ID')
			.left_join('wikipet.code_values', 'cv1', "cv1.GROUP = 'CITY' AND cv1.ID = l.CITY_ID")
			.left_join('wikipet.code_values', 'cv2', "cv2.GROUP = 'DAY_OF_WEEK' AND cv2.ID = t.DAY_OF_WEEK")

			.left_join('wikipet.companies_phones', 'p', 'p.COMPANY_ID = c.COMPANY_ID')

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

						locations: {},
						phones: {},
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

				if (!acc[row.COMPANY_ID].phones[row.COMPANY_PHONE_ID]) {
					acc[row.COMPANY_ID].phones[row.COMPANY_PHONE_ID] = {
						companyPhoneId: row.COMPANY_PHONE_ID,
						phone: row.PHONE,
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
				locations: Object.values(company.locations),
				phones: Object.values(company.phones),
			}));

			callback(null, result);
		});
	}

	static fuzzySearch(queryParams, callback): void {
		const searchQuery = queryParams.searchQuery;

		executeQuery(Queries.GET_BY_NAME, `%${searchQuery}%`, (error, data) => {
			if (error) {
				callback(error);
				return;
			}
			callback(null, data);
		});
	}

    static internalizeCompany(company: Company) {
		let image = (company.image ?  _.get(company.image, ['0', 'path'], null) : company.logo);
		if (image) {
			image = image.split('\\').join('\/');
		}
		console.log(image);
        return {
            COMPANY_ID: company.companyId,
            NAME: company.name,
            LOGO: image,
            DESCRIPTION: company.description,
            EMAIL: company.email,
            WEBSITE_URL: company.url,

            COMPANY_CATEGORY_ID: company.companyCategoryId,
            COMPANY_SUBCATEGORY_ID: company.companySubcategoryId
        };
	}

	static internalizeTime(company: Company, workingTime) {
		return [
			company.companyId,
			workingTime.day,
			`${workingTime.from}:00:00`,
			`${workingTime.to}:00:00`
		]
	}
	
	static internalizeLocation(company) {
		return {
			COMPANY_LOCATION_ID: uuid(),
			SUBWAY_ID: company.subway,
			COMPANY_ID: company.companyId,
			CITY_ID: company.city,
			ADDRESS: company.address,
			LAT: company.lat,
			LNG: company.lng
		}
	}

    static internalizePhone(companyId, phone) {
	    return [
	        uuid(),
	        companyId,
            phone
        ];
    }

	static externalizeCompany(company) {
		return {
			companyId: company.companyId,
			category: company.catId,
			subcategoryId: company.subCatId,
			subcategoryName: company.subcatName,
			name: company.name,
			logo: company.logo,
			description: company.description,
			email: company.email,
			websiteUrl: company.url,

			cityId: company.cityId,
			address: company.address,
			subwayId: company.subwayId,
			lat: company.lat,
			lng: company.lng,

			dayOfWeek: company.DAY_OF_WEEK,
			dayOfWeekName: company.DAY_OF_WEEK_NAME,
			openTime: company.OPEN_TIME,
			closeTime: company.CLOSE_TIME,
		};
	}
}