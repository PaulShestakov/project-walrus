import {executeQuery, performTransaction} from '../database/DBHelper';
import Util from "../util/Util";

export default class BaseCRUD {

    TABLE_NAME  : string ;

    GET_ALL     : string ;
    GET_BY_UUID : string ;
    SAVE        : string ;
    UPDATE      : string ;
    DELETE      : string ;

    constructor(tableName : string) {
        this.TABLE_NAME = tableName;

        this.GET_ALL        = 'SELECT * FROM ' + this.TABLE_NAME;
        this.GET_BY_UUID    = 'SELECT * FROM ' + this.TABLE_NAME + ' WHERE UUID = ?';
        this.SAVE           = 'INSERT INTO   ' + this.TABLE_NAME + ' set ?';
        this.UPDATE         = 'UPDATE '        + this.TABLE_NAME + ' set ? WHERE UUID = ?';
        this.DELETE         = 'DELETE FROM   ' + this.TABLE_NAME + ' WHERE UUID = ?';
    }

    /**
     * Get by uuid
     * @param uuid
     * @returns {Promise<T>}
     */
    get(uuid : string) : Promise<object> {
        return this.wrapSingleQuery(this.GET_BY_UUID, [uuid]);
    }

    /**
     * Get all
     * @returns {Promise<T>}
     */
    getAll(query : string) : Promise<object> {
        return this.wrapSingleQuery(query ? query : this.GET_ALL, []);
    }

    /**
     * Saves entity
     * @param entity
     * @returns {Promise<Object>}
     */
    save(entity : any) : Promise<object> {
        const saveEntity = (connection, done) => {
            connection.query(this.SAVE, [entity], (error, result) => {
                Util.handleError(error, done);
                done(null, result);
            });
        };
        return this.wrapWithTransaction(saveEntity);
    }

    /**
     * Delete by uuid
     * @returns {Promise<T>}
     */
    delete(uuid : string) : Promise<object> {
        const deleteEntity = (connection, done) => {
            connection.query(this.DELETE, [uuid], (error, result) => {
                Util.handleError(error, done);
                done(null, result);
            });
        };
        return this.wrapWithTransaction(deleteEntity);
    }

    /**
     * Updates entity
     * @returns {Promise<T>}
     */
    update(entity : any) : Promise<object> {
        const updateEntity = (connection, done) => {
            connection.query(this.UPDATE, [entity], (error, result) => {
                Util.handleError(error, done);
                done(null, result);
            });
        };
        return this.wrapWithTransaction(updateEntity);
    }

    protected wrapSingleQuery(query : string, params) {
        return new Promise((resolve, reject) => {
            executeQuery(query, params, (error, result) => {
                Util.handleError(error, reject);
                resolve(result);
            });
        });
    }

    protected wrapWithTransaction(queries) {
        return new Promise((resolve, reject) => {
            performTransaction(queries, (error, result) => {
                Util.handleError(error, reject);
                resolve(result);
            });
        });
    }
}