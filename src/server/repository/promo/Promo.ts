import * as uuid from 'uuid/v4'
import Mapper from '../../util/Mapper';
import Util from '../../util/Util';
import StatusRepo from './Status';
import TypeRepo from "./Type";
import BaseCRUD from "../BaseCRUD";
import {PromoEntity, PromoInfoEntity} from "../../entity/PromoEntity";

class Promo extends BaseCRUD {

    //Promo
    private PR_TABLE_NAME :    string = 'WIKIPET.PROMO';
    private PI_TABLE_NAME :    string = 'WIKIPET.PROMO_INFO';

    private PR_GET_ALL 	  :    string =	'SELECT * FROM ' + this.PR_TABLE_NAME + ' AS PR ' +
										'LEFT JOIN ' 	 + this.PI_TABLE_NAME + ' AS PI ON PR.PI_UUID = PI.PI_UUID';

    private PR_SAVE :          string = 'INSERT INTO   ' + this.PR_TABLE_NAME + ' set ?';

    //Promo info
    private PI_GET_ALL :       string = 'SELECT * FROM ' + this.PI_TABLE_NAME;
    private PI_GET_BY_UUID :   string = 'SELECT * FROM ' + this.PI_TABLE_NAME + ' WHERE UUID = ?';
    private PI_SAVE :          string = 'INSERT INTO   ' + this.PI_TABLE_NAME + ' set ?';
    private PI_UPDATE :        string = 'UPDATE        ' + this.PI_TABLE_NAME + ' set ? WHERE UUID = ?';
    private PI_DELETE :        string = 'DELETE FROM   ' + this.PI_TABLE_NAME + ' WHERE UUID = ?';

	private mapper 		: Mapper;
	private statusRepo 	: StatusRepo;
	private typeRepo	: TypeRepo;

	constructor() {
		super('WIKIPET.PROMO');
		this.mapper		 = new Mapper();
		this.statusRepo  = new StatusRepo();
		this.typeRepo 	 = new TypeRepo();
	}

	private static internalizePromo(promo) {
		const promoId = uuid();
		const promoInfoId = uuid();

		const promoEntity = {
			pr_uuid:		promoId,
			pi_uuid:		promoInfoId,
			ty_id:			promo.promoType,
			st_id:			promo.status, //???
			pr_title:		promo.promoName,
			city:			promo.city,
			pr_image:		promo.promoType, //???
			animal_id:		promo.animalId,
			breed_id:		promo.breedId,
			user_id:		1, //???
			pr_description: promo.description
		};

		const promoInfoEntity = {
			pi_uuid:		promoInfoId,
			pi_address:		promo.lostAddress,
			pi_date:		promo.lostDate,
			pi_gender:		promo.gender,
			pi_age:			promo.approximateAge,
			pi_cost:		promo.price,
		};
		return [promoEntity, promoInfoEntity];
	}

	/**
	 *
	 * @param promo
	 * @param callback
	 */
	save(promo : any, callback) : void {
		let promoEntity = this.mapper.mapToEntity(promo, this.mapper.PROMO, {'pr_uuid' : uuid()});
		let promoInfoEntity = this.mapper.mapToEntity(promo, this.mapper.PROMO_INFO, {'pi_uuid' : uuid()});
		promoEntity.pi_uuid = promoInfoEntity.pi_uuid;

		const savePromoInfo = (connection, done) => {
			connection.query(this.PI_SAVE, [promoInfoEntity], (error, rows) => {
				Util.handleError(error, done);
				done(null, rows);
			});
		};
		const savePromo = (connection, done) => {
			connection.query(this.PR_SAVE, [promoEntity], (error, rows) => {
				Util.handleError(error, done);
				done(null, rows);
			});
		};

		this.wrapWithTransaction([savePromoInfo, savePromo], (error, result) => {
			Util.handleError(error, callback);
			callback(null, 'Success');
		});
	}

	getAll(callback) : void {
		super.getAll(this.PR_GET_ALL, callback);
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