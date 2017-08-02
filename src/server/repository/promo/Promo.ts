import * as uuid from 'uuid/v4'
import * as squel from "squel";
import Mapper from '../../util/Mapper';
import Util from '../../util/Util';
import StatusRepo from './Status';
import TypeRepo from "./Type";
import BaseCRUD from "../BaseCRUD";
import {PromoEntity, PromoInfoEntity} from "../../entity/PromoEntity";
import { executeQuery, executeSeries, executeParallel } from '../../database/DBHelper';

import promoSQL from '../../query/promo/Promo';
import promoInfoSQL from '../../query/promo/PromoInfo';
import promoImagesSQL from '../../query/promo/PromoImages';


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
			'PROMO_ID': promoId
		};
		const promoInfoBase = {
			'PROMO_INFO_ID': promoInfoId,
			'PROMO_ID': promoId
		};

		let promoEntity: PromoEntity = this.mapper.mapToEntity(promo, this.mapper.PROMO, promoBase);
		let promoInfoEntity: PromoInfoEntity = this.mapper.mapToEntity(promo, this.mapper.PROMO_INFO, promoInfoBase);

		let images = promo.images.map(file => ([
			uuid(),
			promoId,
			file.path
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

		executeSeries([savePromo, savePromoInfo, saveImages], (error, result) => {
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
		console.log(params);
		const offset = 0;
		const limit = 10;

		const promoTypeId = 'LOST';
		const breedsIds = []; // ?????
		const citiesIds = ['BREST', 'GRODNO'];

		const priceMin = 0;
		const priceMax = 100;

		const sql = squel.select()
			.field('*')
			.from('wikipet.promo p')
			//.where('p.TYPE_ID = ?', promoTypeId)
			.where('p.ANIMAL_ID = ?', params.animal)
			//.where('p.BREED_ID IN ?', breedsIds)
			.where('p.CITY_ID = ?', params.city)
			// .where('p.PRICE > ? AND p.PRICE < ?', priceMin, priceMax) ??? move price to promo?
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