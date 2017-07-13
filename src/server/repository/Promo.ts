import executeQuery from './../database/Pool';
import * as uuid from 'uuid/v4'
import * as mapper from './../util/Mapper';

class Promo {

	private TABLE_NAME :    string = 'WIKIPET.PROMO';

	private GET_ALL :       string = 'SELECT * FROM ' + this.TABLE_NAME;
	private GET_BY_UUID :   string = 'SELECT * FROM ' + this.TABLE_NAME + ' WHERE UUID = ?';
	private SAVE :          string = 'INSERT INTO   ' + this.TABLE_NAME + ' set ?';
	private UPDATE :        string = 'UPDATE        ' + this.TABLE_NAME + ' set ? WHERE UUID = ?';
	private DELETE :        string = 'DELETE FROM   ' + this.TABLE_NAME + ' WHERE UUID = ?';

	/**
	 * Get Promo by uuid
	 * @param uuid
	 * @returns {Promise<T>}
	 */
	public async get(uuid : string) : Promise<object> {
		return await executeQuery(this.GET_BY_UUID, [uuid]);
	}

	/**
	 * Get all promos
	 * @returns {Promise<T>}
	 */
	public async getAll() : Promise<object> {
		return await executeQuery(this.GET_ALL, []);
	}

	/**
	 * Save promo
	 * @param promo
	 * @returns {Promise<T>}
	 */
	public async save(promo) : Promise<object> {
		let entity = mapper.map(promo, Mapper.PROMO);
		entity.uuid = uuid();
		return await executeQuery(this.SAVE, [entity]);
	}

	/**
	 * Update promo
	 * @param promo
	 * @returns {Promise<T>}
	 */
	public async update(promo) : Promise<object> {
		promo.uuid = uuid();
		return await executeQuery(this.UPDATE, [promo]);
	}

	/**
	 * Remove promo
	 * @param uuid
	 * @returns {Promise<T>}
	 */
	public async remove(uuid : string) : Promise<object> {
		return await executeQuery(this.DELETE, [uuid]);
	}
}

export default new Promo();