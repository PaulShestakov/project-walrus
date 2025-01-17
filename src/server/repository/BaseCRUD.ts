import { executeQuery, executeSeries } from '../database/DBHelper';
import Util from "../util/Util";

export default class BaseCRUD {

    TABLE_NAME: string;

    GET_ALL: string;
    GET_BY_UUID: string;
    SAVE: string;
    UPDATE: string;
    DELETE: string;

    constructor(tableName: string) {
        this.TABLE_NAME = tableName;

        this.GET_ALL        = 'SELECT * FROM ' + this.TABLE_NAME;
        this.GET_BY_UUID    = 'SELECT * FROM ' + this.TABLE_NAME + ' WHERE UUID = ?';
        this.SAVE           = 'INSERT INTO   ' + this.TABLE_NAME + ' set ?';
        this.UPDATE         = 'UPDATE '        + this.TABLE_NAME + ' set ? WHERE UUID = ?';
        this.DELETE         = 'DELETE FROM   ' + this.TABLE_NAME + ' WHERE UUID = ?';
    }

    get(uuid: string, callback: Function): void {
        executeQuery(this.GET_BY_UUID, [uuid], callback);
    }

    getAll(callback: Function): void {
        executeQuery(this.GET_ALL, [], callback);
    }

    save(entity: any, callback: Function): void {
        const saveEntity = (connection, done) => {
            connection.query(this.SAVE, [entity], (error, result) => {
                Util.handleError(error, done);
                done(null, result);
            });
        };
        executeSeries(saveEntity, callback);
    }

    delete(uuid: string, callback: Function): void {
        const deleteEntity = (connection, done) => {
            connection.query(this.DELETE, [uuid], (error, result) => {
                Util.handleError(error, done);
                done(null, result);
            });
        };
        executeSeries(deleteEntity, callback);
    }

    update(entity: any, callback: Function): void {
        const updateEntity = (connection, done) => {
            connection.query(this.UPDATE, [entity], (error, result) => {
                Util.handleError(error, done);
                done(null, result);
            });
        };
        executeSeries([updateEntity], callback);
    }

}