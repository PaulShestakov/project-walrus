import * as uuid from 'uuid/v4'
import * as squel from "squel";
import Mapper from '../../util/Mapper';
import Util from '../../util/Util';
import StatusRepo from './Status';
import TypeRepo from "./Type";
import BaseCRUD from "../BaseCRUD";
import { executeQuery, executeSeries, executeParallel } from '../../database/DBHelper';

import promoSQL from '../../query/promo/Promo';
import promoInfoSQL from '../../query/promo/PromoInfo';
import promoImagesSQL from '../../query/promo/PromoImages';
import promoUsersSQL from '../../query/promo/PromoUsers';
import {PromoEntity, PromoInfoEntity, PromoUser} from "../../entity/Promo";


class Promo extends BaseCRUD {

	private mapper 		: Mapper;
	private statusRepo 	: StatusRepo;
	private typeRepo	: TypeRepo;

	constructor() {
		super(promoSQL.TABLE_NAME);
		this.mapper		 = new Mapper();
		this.statusRepo  = new StatusRepo();
		this.typeRepo 	 = new TypeRepo();
	}

	public save(promo: any, callback): void {
		const promoId = uuid();
		const promoInfoId = uuid();

		const promoBase = {
			'PROMO_ID' : promoId
		};
		const promoInfoBase = {
			'PROMO_INFO_ID' : promoInfoId,
			'PROMO_ID' : promoId
		};

		let promoEntity: PromoEntity = this.mapper.mapToEntity(promo, this.mapper.PROMO, promoBase);
		let promoInfoEntity: PromoInfoEntity = this.mapper.mapToEntity(promo, this.mapper.PROMO_INFO, promoInfoBase);

		let savePromoUser;
		if (!promoEntity.USER_ID) {
			let promoUserId = uuid();
			let promoUser : PromoUser = this.mapper.mapToEntity(promo, this.mapper.PROMO_USER, { 'PROMO_USER_ID' : promoUserId });
			promoEntity.PROMO_USER_ID = promoUserId;

			savePromoUser = (connection, done) => {
				connection.query(promoUsersSQL.SAVE, [promoUser], (error, rows) => {
					if (error) {
						Util.handleError(error, done);
					} else {
						done(null, rows);
					}
				});
			};
		}

		let images = promo.images.map(file => ([
			uuid(),
			promoId,
			file.path,
			0
		]));

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
			connection.query(promoSQL.SAVE, [promoEntity], (error, rows) => {
				if (error) {
					Util.handleError(error, done);
				} else {
					done(null, rows);
				}
			});
		};

		let functionsToExecute = [savePromoInfo, saveImages];
		if (savePromoUser) {
			functionsToExecute.push(savePromoUser);
		}
		functionsToExecute.push(savePromo);

		executeSeries(functionsToExecute, (error, result) => {
			if (error) {
				Util.handleError(error, callback);
			} else {
				callback(null, 'Success');
			}
		});
	}

	public getAll(callback): void {
		super.getAll(promoSQL.GET_ALL, (error, result) => {
			let promos = result.map((item) => {
				let promoInfoDTO = this.mapper.mapToDTO(item, this.mapper.PROMO_INFO);
				return this.mapper.mapToDTO(item, this.mapper.PROMO, promoInfoDTO);
			});
			callback(null, promos);
		});
	}

	public getFiltered(params, callback): void {
		const offset = 0;
		const limit = 10;

		const promoTypeId = 'LOST';
		const breedsIds = Util.wrapWithArray(params.breeds);
		const citiesIds = Util.wrapWithArray(params.cities);

		const priceMin = 0;
		const priceMax = 100;

		// .where('p.PRICE > ? AND p.PRICE < ?', priceMin, priceMax) ??? move price to promo?
        //.where('p.TYPE_ID = ?', promoTypeId)

		let conditions = squel.expr().and('p.ANIMAL_ID = ?', params.animal);
		if (breedsIds.length > 0) {
            conditions = conditions.and('p.BREED_ID IN ?', breedsIds)
		}
		if (citiesIds.length > 0) {
			conditions = conditions.and('p.CITY_ID IN ?', citiesIds);
		}

		let sql = squel
			.select()
			.from('wikipet.promo', 'p')
			.where(conditions)
			.offset(offset)
			.limit(limit)
			.toParam();

		executeQuery(sql.text, sql.values, (error, rows) => {
			if (error) {
				callback(error);
				return;
			}

			let promos = rows.map(row => {
				return this.mapper.mapToDTO(row, this.mapper.PROMO);
			});
			callback(null, promos);
		});
	}

	public update(promo: any, callback): void {
		//promo.uuid = uuid();
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
}

export default new Promo();