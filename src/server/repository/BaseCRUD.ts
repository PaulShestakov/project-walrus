import {executeQuery, performTransaction} from '../database/DBHelper';
import Util from "../util/Util";

export default class BaseCRUD {

    TABLE_NAME : string;

    protected GET_ALL :       string = 'SELECT * FROM ' + this.TABLE_NAME;
    GET_BY_UUID :   string = 'SELECT * FROM ' + this.TABLE_NAME + ' WHERE UUID = ?';
    SAVE :          string = 'INSERT INTO   ' + this.TABLE_NAME + ' set ?';
    UPDATE :        string = 'UPDATE        ' + this.TABLE_NAME + ' set ? WHERE UUID = ?';
    DELETE :        string = 'DELETE FROM   ' + this.TABLE_NAME + ' WHERE UUID = ?';

    constructor() {

    }

    /**
     * Get by uuid
     * @param uuid
     * @returns {Promise<T>}
     */
    protected get(uuid : string) : Promise<object> {
        return this.wrapQuery(this.GET_BY_UUID, [uuid]);
    }

    /**
     * Get all
     * @returns {Promise<T>}
     */
    protected getAll() : Promise<object> {
        return this.wrapQuery(this.GET_ALL, []);
    }

    /**
     * Delete by uuid
     * @returns {Promise<T>}
     */
    public delete(uuid : string) : Promise<object> {
        const deleteEntity = (connection, done) => {
            connection.query(this.DELETE, [uuid], (error, result) => {
                Util.handleError(error, done);
                done(null, result);
            });
        };
        return new Promise((resolve, reject) => {
            performTransaction([deleteEntity], (error, result) => {
                Util.handleError(error, reject);
                resolve(result);
            });
        });
    }

    wrapQuery(query : string, params) {
        return new Promise((resolve, reject) => {
            executeQuery(query, params, (error, result) => {
                Util.handleError(error, reject);
                resolve(result);
            });
        });
    }
}