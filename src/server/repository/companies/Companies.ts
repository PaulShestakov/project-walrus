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
import Animals from "./Animals";
import Feedbacks from "./Feedbacks";

export default class Companies extends BaseCRUD  {

	static mapCompany = (item) => ({
		companyId: item.companyId,
		url_id: item.url_id,
		categoryId: item.categoryId,
		subcategoryId: item.subcategoryId,
		subcategoryName: item.subcategoryName,
		name: item.name,
		logo: item.logo,
		description: item.description,
		email: item.email,
		vk: item.vk,
		facebook: item.facebook,
		instagram: item.instagram,
		url: item.url,
		numberOfLocations: item.locationsCount,
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
			URL_ID: company.url_id,
			COMPANY_CATEGORY_ID: company.categoryId || null,
			COMPANY_SUBCATEGORY_ID: company.subcategoryId || null,
			NAME: company.name,
			LOGO: imagePath,
			DESCRIPTION: company.description,
			EMAIL: company.email,
			WEBSITE_URL: company.url,
			VK: company.vk,
			FACEBOOK: company.facebook,
			INSTAGRAM: company.instagram,
		};
	}

	static getCompany(companyId: string, callback) {
		executeQuery(Queries.GET, [companyId], (error, rows) => {
			if (error) {
				Util.handleError(error, callback);
			} else {
				if (rows && rows.length > 0) {
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
									},
									{
										name: 'feedbacks',
										idName: 'feedbackId',
										map: Feedbacks.mapFeedback
									}
								]
							},
							{
								name: 'animals',
								idName: 'companyAnimalId',
								map: Animals.mapCompanyAnimal
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

		const locations = company.locations.map(item => Locations.internalizeLocationToArray(company.companyId, item));

		const savePhones = Phones.savePhones(company.locations, locations);

		const saveLocations = Locations.saveLocations(locations);

		const saveWorkingTimes = WorkingTimes.saveWorkingTimes(company.locations, locations);

		const saveAnimals = Animals.saveAnimals(company.animals, company.companyId);

	    const saveCompany = (connection, done) => {
            connection.query(Queries.SAVE, [Companies.internalizeCompany(company)], done);
		};

        executeSeries([saveCompany, saveAnimals, saveLocations, savePhones, saveWorkingTimes], (error) => {
            if (error) {
                Util.handleError(error, callback);
            } else {
                callback(null, { url_id : company.url_id });
            }
        });
	}

	static updateCompany(url_id, company, callback) {

		const internalizedCompany = this.internalizeCompany(company);
		if (company.image.length === 0) {
			delete internalizedCompany.LOGO;
		}

		const updateCompany = (connection, done) => {
			connection.query(Queries.UPDATE_COMPANY, [internalizedCompany, company.companyId], done);
		};

		const updateLocations = Locations.updateLocations(company.locations, company.companyId);
		const updateAnimals = Animals.updateAnimals(company.animals, company.companyId);

		executeParallel([updateCompany, updateAnimals, updateLocations], (error) => {
			if (error) {
				Util.handleError(error, callback);
			} else {
				callback(null, { url_id : company.url_id || url_id });
			}
		});
	}

	static getFiltered(params, callback): void {
		const { companyCategoryId, companySubcategoryId, cityId, countryId, animalId } = params;
		const subwaysIds = Util.ensureArray(params.subwayId);
		const breedsIds = Util.ensureArray(params.breedId);
		const isWorkingNow = params.isWorkingNow && params.isWorkingNow === 'true';

		let filter = squel.expr();

		if (companyCategoryId) {
			filter = filter.and('c.COMPANY_CATEGORY_ID = ?', companyCategoryId.toUpperCase());
		}
		if (companySubcategoryId) {
			filter = filter.and('c.COMPANY_SUBCATEGORY_ID = ?', companySubcategoryId.toUpperCase());
		}
		if (countryId) {
			filter = filter.and('l.COUNTRY_ID = ?', countryId.toUpperCase());
		}
		if (cityId) {
			filter = filter.and('l.CITY_ID = ?', cityId.toUpperCase());
		}
		if (subwaysIds.length > 0) {
			filter = filter.and('l.SUBWAY_ID IN ?', subwaysIds);
		}
		if (animalId) {
			filter = filter.and('ca.ANIMAL_ID = ?', animalId);
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
				.field('c.URL_ID', 'url_id')
				.field('c.NAME', 'name')
				.field('c.COMPANY_CATEGORY_ID', 'categoryId')
				.field('c.COMPANY_SUBCATEGORY_ID', 'subcategoryId')
            	.field('cv0.NAME', 'subcategoryName')
				.field('c.LOGO', 'logo')
				.field('c.DESCRIPTION', 'description')
				.field('c.EMAIL', 'email')
				.field('c.VK', 'vk')
				.field('c.FACEBOOK', 'facebook')
				.field('c.INSTAGRAM', 'instagram')
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
            .left_join('wikipet.code_values', 'cv0', "cv0.ID = c.COMPANY_SUBCATEGORY_ID")
			.left_join('wikipet.code_values', 'cv1', "cv1.ID = l.CITY_ID")
			.left_join('wikipet.code_values', 'cv2', "cv2.ID = t.DAY_OF_WEEK")
			.left_join('wikipet.companies_animals', 'ca', 'c.COMPANY_ID = ca.COMPANY_ID')
			.left_join('wikipet.companies_phones', 'p', 'p.COMPANY_LOCATION_ID = l.COMPANY_LOCATION_ID')
			.where(filter)
			.order('c.NAME');
			
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
						map: Animals.mapCompanyAnimal
					}
				]
			};
			const companies = Util.reduceFlatData(rows, shape).companies;
			callback(null, Util.ensureArray(companies));
		});
	}

	static fuzzySearch(queryParams, callback): void {
		const { searchQuery, subcategoryId } = queryParams;
		const params = subcategoryId ? {
			q: Queries.GET_BY_NAME_AND_SUBCATEGORY,
			p: [`${searchQuery}%`, subcategoryId],
		} : {
			q: Queries.GET_BY_NAME,
			p: [`${searchQuery}%`]
		};
		executeQuery(params.q, params.p, (error, data) => {
			if (error) {
				callback(error);
				return;
			}
			callback(null, data);
		});
	}
}