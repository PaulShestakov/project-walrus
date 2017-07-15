import * as uuid from 'uuid/v4'
import Mapper from '../util/Mapper';
import Util from '../util/Util';
import {executeQuery, pool } from 'database/Pool';
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
	public async save(promo) : Promise<object> {
		return pool.getConnection((err, connection) => {
			return new Promise((resolve, reject) => {
				connection.beginTransaction(async (err) => {
					if (err) { throw err; }

					let promoEntity = this.mapper.mapToEntity(promo, this.mapper.PROMO);
					let promoInfoEntity = this.mapper.mapToEntity(promo, this.mapper.PROMO_INFO);

					if (!this._.isEmpty(promoEntity) && !this._.isEmpty(promoInfoEntity)) {
						promoInfoEntity.pi_uuid = uuid();
						await executeQuery(this.PI_SAVE, [promoInfoEntity], connection);

						promoEntity.pr_uuid = uuid();
						promoEntity.pi_uuid = promoInfoEntity.pi_uuid;

						await Promise.all([
							this.statusRepo.getByName(promoEntity.st_uuid, connection),
							this.typeRepo.getByName(promoEntity.ty_uuid, connection)
						]).then(async (data) => {
							//data[0].ST_UUID = UNDEFINED????
							console.log(data[0].ST_UUID);

							promoEntity.st_uuid = data[0].ST_UUID;
							promoEntity.ty_uuid = data[1].ty_uuid;

							await executeQuery(this.PR_SAVE, [promoEntity], connection);

							promoEntity.pi_uuid = promoInfoEntity;
							promoEntity.st_uuid = data[0].st_name;
							promoEntity.ty_uuid = data[1].ty_name;

							connection.commit(function(err) {
								if (err) {
									return connection.rollback(function() {
										connection.release();
										throw err;
									});
								}
								connection.release();
								resolve(this.mapper.mapToDTO(promoEntity, this.mapper.PROMO));
							}.bind(this));
						}).catch((err) => {
							console.log('Error ' + err);
						});
					} else {
						reject();
					}
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