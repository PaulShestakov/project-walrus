import * as uuid from 'uuid/v4'
import Mapper from '../util/Mapper';
import Util from '../util/Util';
import async from 'async';
import {executeQuery, performTransaction } from '../database/Pool';
import StatusRepo from './Status';
import TypeRepo from "./Type";

class Promo {

	mapper 		: Mapper;
	_	   		: Util;
	statusRepo 	: StatusRepo;
	typeRepo	: TypeRepo;

	constructor() {
		this.mapper = new Mapper();
		this._ = new Util();
		this.statusRepo = new StatusRepo();
		this.typeRepo = new TypeRepo();
	}

	//Promo

	private PR_TABLE_NAME :    string = 'WIKIPET.PROMO';
	private PI_TABLE_NAME :    string = 'WIKIPET.PROMO_INFO';

	private PR_GET_ALL : string =
		' SELECT * FROM ' + this.PR_TABLE_NAME + ' AS PR ' +
		' LEFT JOIN ' 	  + this.PI_TABLE_NAME + ' AS PI ON PR.PI_UUID = PI.PI_UUID';
	private PR_GET_BY_UUID :   string = 'SELECT * FROM ' + this.PR_TABLE_NAME + ' WHERE UUID = ?';
	private PR_SAVE :          string = 'INSERT INTO   ' + this.PR_TABLE_NAME + ' set ?';
	private PR_UPDATE :        string = 'UPDATE        ' + this.PR_TABLE_NAME + ' set ? WHERE UUID = ?';
	private PR_DELETE :        string = 'DELETE FROM   ' + this.PR_TABLE_NAME + ' WHERE UUID = ?';

	//Promo info

	private PI_GET_ALL :       string = 'SELECT * FROM ' + this.PI_TABLE_NAME;
	private PI_GET_BY_UUID :   string = 'SELECT * FROM ' + this.PI_TABLE_NAME + ' WHERE UUID = ?';
	private PI_SAVE :          string = 'INSERT INTO   ' + this.PI_TABLE_NAME + ' set ?';
	private PI_UPDATE :        string = 'UPDATE        ' + this.PI_TABLE_NAME + ' set ? WHERE UUID = ?';
	private PI_DELETE :        string = 'DELETE FROM   ' + this.PI_TABLE_NAME + ' WHERE UUID = ?';


	/**
	 * Get Promo by uuid
	 * @param uuid
	 * @returns {Promise<T>}
	 */
	public async get(uuid : string) : Promise<object> {
		return await executeQuery(this.PR_GET_BY_UUID, [uuid]);
	}

	/**
	 * Get all promos
	 * @returns {Promise<T>}
	 */
	public async getAll() : Promise<object> {
		return await executeQuery(this.PR_GET_ALL, []);
	}

	/**
	 * Save promo + promo info
	 * @param promo
	 * @returns {Promise<T>}
	 */
	public save(promo) {
		return new Promise((resolve, reject) => {
            let promoEntity = this.mapper.mapToEntity(promo, this.mapper.PROMO);
            let promoInfoEntity = this.mapper.mapToEntity(promo, this.mapper.PROMO_INFO);
            Promise.all([
                this.statusRepo.getByName(promoEntity.st_uuid),
                this.typeRepo.getByName(promoEntity.ty_uuid)
            ]).then((data) => {
                const savePromoInfo = (connection, done) => {
                    promoInfoEntity.pi_uuid = uuid();
                    connection.query(this.PI_SAVE, [promoInfoEntity], (error, rows) => {
                        if (error) {
                            console.log(error);
                        }
                        done(null, rows);
                    });
                };
                const savePromo = (connection, done) => {
                    promoEntity.pr_uuid = uuid();
                    console.log(data);
                    promoEntity.st_uuid = data[0].ST_UUID;
                    promoEntity.ty_uuid = data[1].TY_UUID;
                    promoEntity.pi_uuid = promoInfoEntity.pi_uuid;
                    connection.query(this.PR_SAVE, [promoEntity], (error, rows) => {
                        if (error) {
                            console.log(error);
                        }
                        done(null, rows);
                    });
                };
                performTransaction([savePromoInfo, savePromo], (error, result) => {
                    if (error) {
                        console.log(error);
                    }
                    resolve(this.mapper.mapToDTO(promoEntity, this.mapper.PROMO));
                });
            });
		});
	}

	/**
	 * Update promo
	 * @param promo
	 * @returns {Promise<T>}
	 */
	public async update(promo) : Promise<object> {
		promo.uuid = uuid();
		return await executeQuery(this.PR_UPDATE, [promo]);
	}

	/**
	 * Remove promo
	 * @param uuid
	 * @returns {Promise<T>}
	 */
	public async remove(uuid : string) : Promise<object> {
		return await executeQuery(this.PR_DELETE, [uuid]);
	}
}

export default new Promo();