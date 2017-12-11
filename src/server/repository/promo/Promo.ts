import * as uuid from 'uuid/v4'
import * as squel from "squel";
import * as _ from 'lodash';
import Mapper from '../../util/Mapper';
import Util from '../../util/Util';
import BaseCRUD from "../BaseCRUD";
import { executeQuery, executeSeries, executeParallel } from '../../database/DBHelper';

import promoSQL from './sql/Promo';
import promoInfoSQL from './sql/PromoInfo';
import promoImagesSQL from './sql/PromoImages';


import IPromo from './entities/IPromo'
import IPromoInfo from './entities/IPromo'


class Promo extends BaseCRUD {

	private mapper: Mapper;

	constructor() {
		super(promoSQL.TABLE_NAME);
		this.mapper		 = new Mapper();
	}

	static externalizePromo(promo) {
		return {
			promoId: promo.PROMO_ID,
			title: promo.TITLE,
			description: promo.DESCRIPTION,
			cityId: promo.CITY_ID,
			animalId: promo.ANIMAL_ID,
			breedId: promo.BREED_ID,
			image: promo.IMAGE,
			typeId: promo.TYPE_ID,
			statusId: promo.STATUS_ID,
			userId: promo.USER_ID,
			creationDate: promo.CREATION_DATE,
			modificationDate: promo.MODIFICATION_DATE
		};
	}

	static externalizePromoInfo(promoInfo) {
		return {
			address: promoInfo.ADDRESS,
			date: promoInfo.DATE,
			gender: promoInfo.GENDER,
			age: promoInfo.AGE,
			cost: promoInfo.COST
		};
	}


	static internalizePromo(promo, promoId, image): IPromo {
		return {
			PROMO_ID: promoId,
			TITLE: promo.title,
			DESCRIPTION: promo.description,
			CITY_ID: promo.city,
			ANIMAL_ID: promo.animal,
			BREED_ID: promo.breed,
			IMAGE: image,
			TYPE_ID: promo.type,
			STATUS_ID: promo.status,
			USER_ID: promo.userId,
			CREATION_DATE: new Date(),
			MODIFICATION_DATE: new Date()
		};
	}

	public save(promo: any, callback): void {
		const promoId = uuid();
		const promoInfoId = uuid();

		const promoBase = {
			'PROMO_ID': promoId
		};
		const promoInfoBase = {
			'PROMO_INFO_ID': promoInfoId,
			'PROMO_ID': promoId
		};

		//let promoEntity: PromoEntity = this.mapper.mapToEntity(promo, this.mapper.PROMO, promoBase);
		const promoInfoEntity: IPromoInfo = this.mapper.mapToEntity(promo, this.mapper.PROMO_INFO, promoInfoBase);

		const mainImagePath = _.get(promo.images, ['0', 'path'], null);
		const promoEntity: IPromo = Promo.internalizePromo(promo, promoId, mainImagePath);

		const images = promo.images.map(image => [
			uuid(),
			promoId,
			image.path,
			0,
			new Date(),
			new Date()
		]);

		const savePromoInfo = (connection, done) => {
			connection.query(promoInfoSQL.SAVE, [promoInfoEntity], (error, rows) => {
				if (error) {
					Util.handleError(error, done);
				} else {
					done(null, rows);
				}
			});
		};
		const saveImages = (connection, done) => {
			if (images.length === 0) {
				done(null);
				return;
			} else {
				connection.query(promoImagesSQL.SAVE_ALL, [images], (error, rows) => {
					if (error) {
						Util.handleError(error, done);
					} else {
						done(null, rows);
					}
				});
			}
		};
		const savePromo = (connection, done) => {
			connection.query(promoSQL.SAVE, promoEntity, (error, rows) => {
				if (error) {
					Util.handleError(error, done);
				} else {
					done(null, rows);
				}
			});
		};

		executeParallel([savePromo, savePromoInfo, saveImages], (error, result) => {
			if (error) {
				Util.handleError(error, callback);
			} else {
				callback(null, 'Success');
			}
		});
	}


	public getFiltered(params, callback): void {
		// Retrieve filter params
		const typeId = params.promoTypeId;
		const animalId = params.animalId;
		const breedsIds = Util.ensureArray(params.breedId);
		const citiesIds = Util.ensureArray(params.cityId);
		const priceFrom = params.priceFrom;
		const priceTo = params.priceTo;

		let filter = squel.expr();

		if (typeId && typeId !== 'ALL') {
			filter = filter.and('p.TYPE_ID = ?', typeId);
		}
		if (animalId && animalId !== 'ALL') {
			filter = filter.and('p.ANIMAL_ID = ?', animalId);
		}
		if (breedsIds.length > 0) {
			filter = filter.and('p.BREED_ID IN ?', breedsIds)
		}
		if (citiesIds.length > 0) {
			filter = filter.and('p.CITY_ID IN ?', citiesIds);
		}
		if (priceFrom) {
			filter = filter.and('p.PRICE >= ?', priceFrom);
		}
		if (priceTo) {
			filter = filter.and('p.PRICE <= ?', priceTo);
		}

		const sql = squel
			.select()
			.from('promo', 'p')
			.where(filter)
			.order('p.CREATION_DATE', false)
			.toParam();

		executeQuery(sql.text, sql.values, (error, rows) => {
			if (error) {
				callback(error);
				return;
			}
			const promos = rows.map(Promo.externalizePromo);
			callback(null, promos);
		});
	}

	public update(promo: any, callback): void {
        super.update(promo, callback);
	}

	public remove(uuid: string, callback): void {
		executeParallel([
				function removePromo(connection, done) {
					connection.query(promoSQL.DELETE, [uuid], (error, rows) => {
						Util.handleError(error, done);
						done(null, rows);
					});
				},
				function removePromoInfo(connection, done) {
					connection.query(promoSQL.DELETE, [uuid], (error, rows) => {
						Util.handleError(error, done);
						done(null, rows);
					});
				},
				function removeImages(connection, done) {
					connection.query(promoSQL.DELETE, [uuid], (error, rows) => {
						Util.handleError(error, done);
						done(null, rows);
					});
				}
			],
			function handleResult(error) {
				if (error) {
					Util.handleError(error, callback);
				} else {
					callback(null, 'Success');
				}
			}
		);
	}

	public get(promoId: string, callback) {
		executeQuery(promoSQL.GET, [promoId], (error, result) => {
			result = result.map(record => ({
				...Promo.externalizePromo(record),
				...Promo.externalizePromoInfo(record)
			}));
			callback(error, result[0]);
		});
	}
}

export default new Promo();