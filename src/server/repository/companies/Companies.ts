import * as squel from "squel";

import { executeQuery, executeSeries, executeParallel } from '../../database/DBHelper';
import * as _ from 'lodash';
import * as moment from 'moment';

import Queries from './sql/Queries';
import BaseCRUD from '../BaseCRUD';
import Util from '../../util/Util';
import * as uuid from 'uuid';

export default class Companies extends BaseCRUD  {

	static getCompany(companyId: string, callback) {
		executeQuery(Queries.GET, [companyId], (error, result) => {
			if (error) {
				Util.handleError(error, callback);
			} else {
				if (result) {
					const reducedResult = result.reduce((acc, item) => {
						if (!acc[item.companyId]) {
							acc[item.companyId] = {
								id: item.companyId,
								categoryId: item.categoryId,
								subcategoryId: item.subcategoryId,
								name: item.name,
								logo: item.logo,
								description: item.description,
								email: item.email,
								url: item.url,
								locations: []
							};
						}

						if (!acc[item.companyId].locations[item.locationId]) {
							acc[item.companyId].locations[item.locationId] = {
								subwayId: item.subwayId,
								cityId: item.cityId,
								address: item.address,
								lat: item.lat,
								lng: item.lng,
								workingTimes: [],
								phones: []
							};
						}

						if (!acc[item.companyId].locations[item.locationId].workingTimes[item.DAY_OF_WEEK]) {
							acc[item.companyId].locations[item.locationId].workingTimes[item.DAY_OF_WEEK] = {
								day: item.dayOfWeek,
								open: item.open,
								close: item.close
							};
						}

						if (!acc[item.companyId].locations[item.locationId].phones[item.phoneId]) {
							acc[item.companyId].locations[item.locationId].phones[item.phoneId] = {
								phone: item.phone
							};
						}
						return acc;
					}, {});

					const response = Object.values(reducedResult).map(company => ({
						...company,
						locations: Object.values(company.locations).map(location => ({
							...location,
							workingTimes: Object.values(location.workingTimes),
							phones: Object.values(location.phones).map(i => i.phone)
						})),
					}));

					callback(null, response);
				} else {
					callback(null, null);
				}
			}
		});
	}

	static postCompany(company: Company, callback) {
		company.companyId = uuid();
		const locations = company.locations
			.filter(i => i.city.value && i.address)
			.map(item => Companies.internalizeLocation(company.companyId, item));

	    const savePhones = (connection, done) => {
			const phones = company.locations.reduce((acc, item, index) => {
				item.phones.forEach(phone => {
					acc.push(Companies.internalizePhone({
						locationId: locations[index][0],
						phone: phone.phone,
					}));
				});
				return acc;
			}, []);
            if (phones && phones.length > 0) {
                connection.query(Queries.SAVE_PHONES, [phones], (error, result) => {
                    done(error, result);
                });
            } else {
	            done(null, null);
            }
		};
		const saveLocation = (connection, done) => {
	        connection.query(Queries.SAVE_LOCATION, [locations], (error, result) => {
				done(error, result);
			});
		};
		const saveWorkingTimes = (connection, done) => {
			const times = company.locations.reduce((acc, item, index) => {
				item.workingTimes.filter(i => i.from && i.to && i.day)
					.forEach(time => {
						acc.push(Companies.internalizeTime({
							locationId: locations[index][0],
							day: time.day.value,
							from: time.from,
							to: time.to,
						}));
					});
				return acc;
			}, []);
			if (times && times.length > 0) {
				connection.query(Queries.SAVE_WORKING_TIMES, [times], (error, result) => {
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
        executeSeries([saveCompany, saveLocation, savePhones, saveWorkingTimes], (error) => {
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
		const isWorkingNow = params.isWorkingNow === 'true';

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

		if (isWorkingNow) {
			// Belarus timezone is UTC+3
			const momentNow = moment().utcOffset(3);

			const dayOfWeek = momentNow.day();
			const time = momentNow.format('HH:mm:ss');

			filter = filter.and(`
				EXISTS(
					SELECT * FROM wikipet.companies_working_time
						WHERE DAY_OF_WEEK = ?
							AND OPEN_TIME >= ?
							AND CLOSE_TIME <= ?
				)`,
				dayOfWeek, time, time);
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
						daysOfWeekWorkingTime: {}
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
					}
				}

				if (!acc[row.COMPANY_ID].phones[row.COMPANY_PHONE_ID]) {
					acc[row.COMPANY_ID].phones[row.COMPANY_PHONE_ID] = {
						companyPhoneId: row.COMPANY_PHONE_ID,
						phone: row.PHONE,
					}
				}

				// Now timetable is one to one to the company
				if (!acc[row.COMPANY_ID].daysOfWeekWorkingTime[row.DAY_OF_WEEK]) {
					acc[row.COMPANY_ID].daysOfWeekWorkingTime[row.DAY_OF_WEEK] = {
						dayOfWeek: row.DAY_OF_WEEK,
						dayOfWeekName: row.DAY_OF_WEEK_NAME,
						openTime: row.OPEN_TIME,
						closeTime: row.CLOSE_TIME,
					}
				}

				return acc;
			}, {});

			const result = Object.values(reducedData).map(company => ({
				...company,
				locations: Object.values(company.locations),
				phones: Object.values(company.phones),
				daysOfWeekWorkingTime: Object.values(company.daysOfWeekWorkingTime),
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

	static postFeedback(feedback: IFeedback, callback) {
		executeQuery(Queries.SAVE_FEEDBACK, [Companies.internalizeFeedback(feedback)], (error, result) => {
			if (error) {
				callback(error);
				return;
			}
			callback(null, 'Success');
		});
	}

	static getFeedbacks(companyId: string, callback) {
		executeQuery(Queries.GET_FEEDBACKS, [companyId], (error, result) => {
			if (error) {
				callback(error);
				return;
			
			}
			const feedbacks = result.reduce((acc, row) => {
				const feedback = {
					id: row.feedbackId,
					feedback: row.feedback,
					summary: row.summary,
					rating: row.rating,
					createDate: row.createDate,
					modificateDate: row.modificateDate,
					user: {
						id: row.userId,
						photo: row.photo,
						name: row.userName
					}
				};
				acc.push(feedback);
				return acc;
			}, []);
			callback(null, feedbacks);
		});
	}

	static internalizeFeedback(feedback: IFeedback) {
		return {
			COMPANY_FEEDBACK_ID: uuid(),
			COMPANY_ID: feedback.companyId,
			USER_ID: feedback.user.id,
			FEEDBACK: feedback.feedback,
			SUMMARY: feedback.summary,
			RATING: feedback.rating
		}
	}

    static internalizeCompany(company: Company) {
		let image = '/' + _.get(company.image, ['0', 'path'], null);
		if (image) {
			image = image.split('\\').join('\/');
		}
        return {
            COMPANY_ID: company.companyId,
			COMPANY_CATEGORY_ID: company.companyCategoryId ?
				company.companyCategoryId.value : null,
			COMPANY_SUBCATEGORY_ID: company.companySubcategoryId ?
				company.companySubcategoryId.value : null,
            NAME: company.name,
            LOGO: image,
            DESCRIPTION: company.description,
            EMAIL: company.email,
            WEBSITE_URL: company.url,
        };
	}

	static internalizeTime(workingTime) {
		return [
			workingTime.locationId,
			workingTime.day,
			`${workingTime.from}:00:00`,
			`${workingTime.to}:00:00`
		]
	}
	
	static internalizeLocation(companyId, location) {
		return [
			uuid(),
			location.subway ? location.subway.value : null,
			companyId,
			location.city ? location.city.value : null,
			location.address,
			location.location ? location.location.lat : null,
			location.location ? location.location.lng : null,
			null,
			null,
		]
	}

    static internalizePhone(phone) {
	    return [
	        uuid(),
			phone.locationId,
            phone.phone
        ];
    }

	static externalizeCompany(company) {
		return {
			companyId: company.companyId,
			categoryId: company.categoryId,
			categoryName: company.categoryName,
			subcategoryId: company.subcategoryId,
			subcategoryName: company.subcategoryName,
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