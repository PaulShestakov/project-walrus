import BaseCRUD from "../BaseCRUD";
import * as md5 from 'md5';
import { executeQuery } from '../../database/DBHelper';

import userSQL from './sql/User';

class User extends BaseCRUD {

    constructor() {
        super(userSQL.TABLE_NAME);
    }

    getById(userId: string, callback) {
        executeQuery(userSQL.GET_BY_ID, [userId], (error, result) => {
            if (result && result.length > 0) {
                return callback(error, result[0]);
            }
            callback(error, null);
        });
    }

    getByNameAndPassword(username: string, password: string, callback) {
        password = md5(password);
        executeQuery(userSQL.GET_BY_NAME_AND_PASSWORD, [username, password], (error, result) => {
            if (result && result.length > 0) {
                return callback(error, result[0]);
            }
            callback(error, null);
        });
    }

    getKeyForUser(jwt: string, callback: Function) {
        executeQuery(userSQL.GET_KEY_BY_JWT, [jwt], (error, result) => {
            if (result && result.length > 0) {
                return callback(error, result[0].ukey);
            }
            callback(error, null);
        });
    }
}

export default new User();