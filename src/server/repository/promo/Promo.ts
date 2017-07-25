import * as uuid from 'uuid/v4'
import Mapper from '../../util/Mapper';
import Util from '../../util/Util';
import StatusRepo from './Status';
import TypeRepo from "./Type";
import BaseCRUD from "../BaseCRUD";
import {PromoEntity, PromoInfoEntity} from "../../entity/PromoEntity";

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
		let promoEntity: PromoEntity =
			this.mapper.mapToEntity(promo, this.mapper.PROMO, {'pr_uuid': uuid()});

		let promoInfoEntity: PromoInfoEntity =
			this.mapper.mapToEntity(promo, this.mapper.PROMO_INFO, {'pi_uuid': uuid()});

		promoEntity.pi_uuid = promoInfoEntity.pi_uuid;
		let images = promo.images.map(file => ([
			uuid(),
			promoInfoEntity.pi_uuid,
			file.path
		]));

		const savePromoInfo = (connection, done) => {
			connection.query(promoInfoSQL.SAVE, [promoInfoEntity], (error, rows) => {
				Util.handleError(error, done);
				done(null, rows);
			});
		};
		const saveImages = (connection, done) => {
			connection.query(promoImagesSQL.SAVE_ALL, [images], (error, rows) => {
				Util.handleError(error, done);
				done(null, rows);
			});
		};
		const savePromo = (connection, done) => {
			connection.query(promoSQL.SAVE, [promoEntity], (error, rows) => {
				Util.handleError(error, done);
				done(null, rows);
			});
		};

		this.wrapWithTransaction([savePromoInfo, saveImages, savePromo], (error, result) => {
			Util.handleError(error, callback);
			callback(null, 'Success');
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

	public update(promo: any, callback): void {
		promo.uuid = uuid();
        super.update(promo, callback);
	}

	public remove(uuid: string, callback): void {
		//TODO: Change db structure maybe?
		// this.wrapWithTransaction([
		// 		function removePromo(connection, done) {
		// 			connection.query(promoSQL.DELETE, [uuid], (error, rows) => {
		// 				Util.handleError(error, done);
		// 				done(null, rows);
		// 			});
		// 		},
		// 		function removePromoInfo(connection, done) {
		// 			connection.query(promoSQL.DELETE, [uuid], (error, rows) => {
		// 				Util.handleError(error, done);
		// 				done(null, rows);
		// 			});
		// 		},
		// 		function removeImages(connection, done) {
		// 			connection.query(promoSQL.DELETE, [uuid], (error, rows) => {
		// 				Util.handleError(error, done);
		// 				done(null, rows);
		// 			});
		// 		}
		// 	],
		// 	function handleResult(error) {
		// 		if (error) {
		// 			Util.handleError(error, callback);
		// 		} else {
		// 			callback(null, 'Success');
		// 		}
		// 	}
		// );
	}
}

export default new Promo();