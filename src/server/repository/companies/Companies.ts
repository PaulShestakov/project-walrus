import * as squel from "squel";

import { executeQuery, executeSeries, executeParallel } from '../../database/DBHelper';
import * as _ from 'lodash';
import * as moment from 'moment';

import Queries from './sql/Queries';
import BaseCRUD from '../BaseCRUD';
import Util from '../../util/Util';
import * as uuid from 'uuid';
import Locations from "./Locations";
import Phones from "./Phones";
import WorkingTimes from "./WorkingTimes";

export default class Companies extends BaseCRUD  {

	static mapCompany = (item) => ({
		companyId: item.companyId,
		categoryId: item.categoryId,
		subcategoryId: item.subcategoryId,
		subcategoryName: item.subcategoryName,
		name: item.name,
		logo: item.logo,
		description: item.description,
		email: item.email,
		url: item.url,
		numerOfLocations: item.locationsCount,
		numberOfFeedbacks: item.numberOfFeedbacks || 0,
		averageRating: item.averageRating,
	});

	static internalizeCompany(company) {
		let imagePath = _.get(company, ['image', '0', 'path'], null);
		if (imagePath) {
			imagePath = '/' + imagePath.split('\\').join('\/');
		}
		return {
			COMPANY_ID: company.companyId,
			COMPANY_CATEGORY_ID: company.categoryId || null,
			COMPANY_SUBCATEGORY_ID: company.subcategoryId || null,
			NAME: company.name,
			LOGO: imagePath,
			DESCRIPTION: company.description,
			EMAIL: company.email,
			WEBSITE_URL: company.url,
		};
	}

	static mapCompanyAnimal = (item) => ({
		animalId: item.animalId,
		breedId: item.breedId,
		animalName: item.animalName,
		breedName: item.breedName,
	});

	static getCompany(companyId: string, callback) {
		executeQuery(Queries.GET, [companyId], (error, rows) => {
			if (error) {
				Util.handleError(error, callback);
			} else {
				if (rows) {
					const shape = {
						name: 'companies',
						idName: 'companyId',
						map: Companies.mapCompany,
						children: [
							{
								name: 'locations',
								idName: 'locationId',
								map: Locations.mapLocation,
								children: [
									{
										name: 'workingTimes',
										idName: 'dayOfWeek',
										map: WorkingTimes.mapDayOfWeek
									},
									{
										name: 'phones',
										idName: 'phoneId',
										map: Phones.mapPhone
									}
								]
							},
							{
								name: 'animals',
								idName: 'companyAnimalId',
								map: Companies.mapCompanyAnimal
							}
						]
					};
					callback(null, Util.reduceFlatData(rows, shape).companies[0]);
				} else {
					callback(null, null);
				}
			}
		});
	}

	static deleteCompany(companyId: string, callback) {
		executeQuery(Queries.DELETE, [companyId], (error) => {
			if (error) {
				Util.handleError(error, callback);
			} else {
				callback(null, { uuid: companyId });
			}
		});
	}
  
	static saveCompany(company: Company, callback) {
		company.companyId = uuid();
		const locations = company.locations.map(item => Locations.internalizeLocation(company.companyId, item));

	    const savePhones = (connection, done) => {
			const phones: Array<object> = company.locations.reduce((acc, item, index) => {
				if (item.phones) {
					item.phones.forEach(phone => {
						acc.push(Phones.internalizePhone({
							locationId: locations[index][0],
							phone: phone.phone,
						}));
					});
				}
				return acc;
			}, []);
            if (phones.length > 0) {
                connection.query(Queries.SAVE_PHONES, [phones], done);
            } else {
	            done(null, null);
            }
		};
		const saveLocation = (connection, done) => {
			if (locations.length > 0) {
				connection.query(Queries.SAVE_LOCATION, [locations], done);
			} else {
				done(null, null);
			}
		};
		const saveWorkingTimes = (connection, done) => {
			const times: Array<object> = company.locations.reduce((acc, item, index) => {
				if (item.workingTimes) {
					item.workingTimes.filter(i => i.open && i.close && i.dayOfWeek)
                        .forEach(time => {
							acc.push(WorkingTimes.internalizeTime({
								locationId: locations[index][0],
								day: time.dayOfWeek.value,
								from: time.open,
								to: time.close,
							}));
						});
				}
				return acc;
			}, []);
			if (times.length > 0) {
				connection.query(Queries.SAVE_WORKING_TIMES, [times], done);
			} else {
				done(null, null);
			}
        };
		const saveAnimals = (connection, done) => {
			if (company.animals && company.animals.length > 0) {
				connection.query(Queries.SAVE_COMPANY_ANIMAL,
					[company.animals.map(a => Companies.internalizeCompanyAnimal(a, company.companyId))], done);
			} else {
				done(null, null);
			}
		};
	    const saveCompany = (connection, done) => {
            connection.query(Queries.SAVE, [Companies.internalizeCompany(company)], done);
		};

        executeSeries([saveCompany, saveAnimals, saveLocation, savePhones, saveWorkingTimes], (error) => {
            if (error) {
                Util.handleError(error, callback);
            } else {
                callback(null, { uuid : company.companyId });
            }
        });
	}

	static updateCompany(companyId, company, callback) {
		const internalizedCompany = this.internalizeCompany(company);
		internalizedCompany.COMPANY_ID = companyId;
		if (company.image.length === 0) {
			delete internalizedCompany.LOGO;
		}

		const locations = company.locations.map(Locations.internalizeLocationToObject.bind(null, companyId));
		const updateLocations = Locations.getLocationsUpdater(locations, company.locations.map(loc => loc.locationId));
		
		

		const updateCompany = (connection, done) => {
			connection.query(Queries.UPDATE_COMPANY, [internalizedCompany, companyId], done);
		}

		executeParallel([updateCompany, updateLocations], (error) => {
			if (error) {
				Util.handleError(error, callback);
			} else {
				callback(null, { uuid : companyId });
			}
		})
	}

	static getFiltered(params, callback): void {
		const companyCategoryId = params.companyCategoryId;
		const companySubcategoryId = params.companySubcategoryId;
		const citiesIds = Util.ensureArray(params.cityId);
		const animalsIds = Util.ensureArray(params.animalId);
		const subwaysIds = Util.ensureArray(params.subwayId);
		const breedsIds = Util.ensureArray(params.breedId);
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
		if (subwaysIds.length > 0) {
			filter = filter.and('l.SUBWAY_ID IN ?', subwaysIds);
		}
		if (animalsIds.length > 0) {
			filter = filter.and('ca.ANIMAL_ID IN ?', animalsIds);
		}
		if (breedsIds.length > 0) {
			filter = filter.and('ca.BREED_ID IN ?', breedsIds);
		}

		let dayOfWeek, timeNow;
		if (isWorkingNow) {
			// Belarus timezone is UTC+3
			const momentNow = moment().utcOffset(3);
			dayOfWeek = momentNow.day() - 1;
			timeNow = momentNow.format('HH:mm:ss');
		}

		
		let sql = squel
			.select()
				.field('c.COMPANY_ID', 'companyId')
				.field('c.NAME', 'name')
				.field('c.COMPANY_CATEGORY_ID', 'categoryId')
				.field('c.COMPANY_SUBCATEGORY_ID', 'subcategoryId')
				.field('c.LOGO', 'logo')
				.field('c.DESCRIPTION', 'description')
				.field('c.EMAIL', 'email')
				.field('c.WEBSITE_URL', 'url')
				.field( squel.select()
								.field('COUNT(*)')
							.from('wikipet.companies_location', 'cl1')
							.where('cl1.COMPANY_ID = c.COMPANY_ID')
							.where('cl1.IS_MAIN = 0'), 'locationsCount'
				)
				.field('cf1.numberOfFeedbacks')
				.field('cf1.averageRating')

				.field('l.COMPANY_LOCATION_ID', 'locationId')
				.field('l.CITY_ID', 'cityId')
				.field('cv1.NAME', 'cityName')
				.field('l.ADDRESS', 'address')
				.field('l.SUBWAY_ID', 'subwayId')
				.field('l.IS_MAIN', 'isMain')
				.field('l.LAT', 'lat')
				.field('l.LNG', 'lng')

				.field('t.DAY_OF_WEEK', 'dayOfWeek')
				.field('cv2.NAME', 'dayOfWeekName')
				.field('t.OPEN_TIME', 'open')
				.field('t.CLOSE_TIME', 'close')

				.field('p.COMPANY_PHONE_ID', 'phoneId')
				.field('p.PHONE', 'phone')

				.field('ca.COMPANY_ANIMAL_ID', 'companyAnimalId')
				.field('ca.ANIMAL_ID', 'animalId')
				.field('ca.BREED_ID', 'breedId')
			.from('wikipet.companies', 'c')
			.left_join(
				squel.select()
					.field('cf.COMPANY_ID')
					.field('COUNT(cf.RATING)', 'numberOfFeedbacks')
					.field('AVG(cf.RATING)', 'averageRating')
				.from('wikipet.companies_feedback', 'cf')
				.group('cf.COMPANY_ID'), 'cf1', 'cf1.COMPANY_ID = c.COMPANY_ID'
			)
			.left_join('wikipet.companies_location', 'l', 'l.COMPANY_ID = c.COMPANY_ID')
			.left_join('wikipet.companies_working_time', 't', 't.COMPANY_LOCATION_ID = l.COMPANY_LOCATION_ID');
		

		if (isWorkingNow) {
			sql = sql
			.join(
				squel.select()
					.field('cwt.COMPANY_LOCATION_ID')					
				.from('wikipet.companies_working_time', 'cwt')
					.where('cwt.DAY_OF_WEEK = ?', dayOfWeek)
					.where('cwt.OPEN_TIME <= ?', timeNow)
					.where('cwt.CLOSE_TIME >= ?', timeNow), 'validLocations', 'l.COMPANY_LOCATION_ID = validLocations.COMPANY_LOCATION_ID'
			)
		}
			
		sql = sql
			.left_join('wikipet.code_values', 'cv1', "cv1.GROUP = 'CITY' AND cv1.ID = l.CITY_ID")
			.left_join('wikipet.code_values', 'cv2', "cv2.GROUP = 'DAY_OF_WEEK' AND cv2.ID = t.DAY_OF_WEEK")
			.left_join('wikipet.companies_animals', 'ca', 'c.COMPANY_ID = ca.COMPANY_ID')
			.left_join('wikipet.companies_phones', 'p', 'p.COMPANY_LOCATION_ID = l.COMPANY_LOCATION_ID')
			.where(filter);
			
		const sqlParams = sql.toParam();

		executeQuery(sqlParams.text, sqlParams.values, (error, rows) => {
			if (error) {
				callback(error);
				return;
			}

			const shape = {
				name: 'companies',
				idName: 'companyId',
				map: Companies.mapCompany,
				children: [
					{
						name: 'locations',
						idName: 'locationId',
						map: Locations.mapLocation,
						children: [
							{
								name: 'workingTimes',
								idName: 'dayOfWeek',
								map: WorkingTimes.mapDayOfWeek
							},
							{
								name: 'phones',
								idName: 'phoneId',
								map: Phones.mapPhone
							}
						]
					},
					{
						name: 'animals',
						idName: 'companyAnimalId',
						map: Companies.mapCompanyAnimal
					}
				]
			};
			const companies = Util.reduceFlatData(rows, shape).companies;
			callback(null, Util.ensureArray(companies));
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

	static internalizeCompanyAnimal(animal, companyId) {
		return [
			uuid(),
			companyId,
			animal.animalId,
			animal.breedId,
		]
	}
}