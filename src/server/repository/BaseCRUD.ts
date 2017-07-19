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
     *
     * @param uuid
     * @param callback
     */
    get(uuid : string, callback : Function) : void {
        this.wrapSingleQuery(this.GET_BY_UUID, [uuid], callback);
    }

    /**
     *
     * @param query
     * @param callback
     */
    getAll(query : string, callback : Function) : void {
        this.wrapSingleQuery(query ? query : this.GET_ALL, [], callback);
    }

    /**
     * Saves entity
     *
     * @param entity
     * @param callback
     */
    save(entity : any, callback : Function) : void {
        const saveEntity = (connection, done) => {
            connection.query(this.SAVE, [entity], (error, result) => {
                Util.handleError(error, done);
                done(null, result);
            });
        };
        this.wrapWithTransaction(saveEntity, callback);
    }

    /**
     * Delete by uuid
     * @returns {Promise<T>}
     */
    delete(uuid : string, callback : Function) : void {
        const deleteEntity = (connection, done) => {
            connection.query(this.DELETE, [uuid], (error, result) => {
                Util.handleError(error, done);
                done(null, result);
            });
        };
        this.wrapWithTransaction(deleteEntity, callback);
    }

    /**
     * Updates entity
     * @returns {Promise<T>}
     */
    update(entity : any, callback : Function) : void {
        const updateEntity = (connection, done) => {
            connection.query(this.UPDATE, [entity], (error, result) => {
                Util.handleError(error, done);
                done(null, result);
            });
        };
        this.wrapWithTransaction([updateEntity], callback);
    }

    protected wrapSingleQuery(query : string, params, callback : Function) : void {
        executeQuery(query, params, function executeQueryCallback(error, result) {
            Util.handleError(error, callback);
            callback(null, result);
        });
    }

    protected wrapWithTransaction(queries, callback : Function) : void {
        performTransaction(queries, (error, result) => {
            Util.handleError(error, callback);
            callback(null, result);
        });
    }
}