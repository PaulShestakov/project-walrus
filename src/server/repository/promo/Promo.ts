import * as uuid from 'uuid/v4'
import Mapper from '../../util/Mapper';
import Util from '../../util/Util';
import StatusRepo from './Status';
import TypeRepo from "./Type";
import BaseCRUD from "../BaseCRUD";
import {PromoEntity, PromoInfoEntity} from "../../entity/PromoEntity";

import promoQ from '../../query/promo/Promo';
import promoInfoQ from '../../query/promo/PromoInfo';
import promoImagesQ from '../../query/promo/PromoImages';

class Promo extends BaseCRUD {

	private mapper 		: Mapper;
	private statusRepo 	: StatusRepo;
	private typeRepo	: TypeRepo;

	constructor() {
		super(promoQ.TABLE_NAME);
		this.mapper		 = new Mapper();
		this.statusRepo  = new StatusRepo();
		this.typeRepo 	 = new TypeRepo();
	}

	/**
	 *
	 * @param promo
	 * @param callback
	 */
	save(promo : any, callback) : void {
		let promoEntity : PromoEntity =
			this.mapper.mapToEntity(promo, this.mapper.PROMO, {'pr_uuid' : uuid()});

		let promoInfoEntity : PromoInfoEntity =
			this.mapper.mapToEntity(promo, this.mapper.PROMO_INFO, {'pi_uuid' : uuid()});

		promoEntity.pi_uuid = promoInfoEntity.pi_uuid;
		let images = promo.images.map(file => ([
				uuid(),
				promoInfoEntity.pi_uuid,
				file.path
			])
		);

		const savePromoInfo = (connection, done) => {
			connection.query(promoInfoQ.SAVE, [promoInfoEntity], (error, rows) => {
				Util.handleError(error, done);
				done(null, rows);
			});
		};
		const saveImages = (connection, done) => {
			connection.query(promoImagesQ.SAVE_ALL, [images], (error, rows) => {
				Util.handleError(error, done);
				done(null, rows);
			});
		};
		const savePromo = (connection, done) => {
			connection.query(promoQ.SAVE, [promoEntity], (error, rows) => {
				Util.handleError(error, done);
				done(null, rows);
			});
		};

		this.wrapWithTransaction([savePromoInfo, saveImages, savePromo], (error, result) => {
			Util.handleError(error, callback);
			callback(null, 'Success');
		});
	}

	getAll(callback) : void {
		super.getAll(promoQ.GET_ALL, (error, result) => {
			let promos = result.map((item) => {
				let promoInfoDTO = this.mapper.mapToDTO(item, this.mapper.PROMO_INFO);
				return this.mapper.mapToDTO(item, this.mapper.PROMO, promoInfoDTO);

			});
			callback(null, promos);
		});
	}

	/**
	 *
	 * @param promo
	 * @param callback
	 */
	public update(promo : any, callback) : void {
		promo.uuid = uuid();
        super.update(promo, callback);
	}
}

export default new Promo();