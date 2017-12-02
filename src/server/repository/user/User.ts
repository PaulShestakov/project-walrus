import BaseCRUD from "../BaseCRUD";
import * as md5 from 'md5';
import { executeQuery } from '../../database/DBHelper';

import userSQL from './sql/User';

class User extends BaseCRUD {

    constructor() {
        super(userSQL.TABLE_NAME);
    }

    public getById(userId: string, callback) {
        executeQuery(userSQL.GET_BY_ID, [userId], (error, result) => {
            if (result) {
                return callback(error, result[0]);
            }
            callback(error, null);
        });
    }

    public getByNameAndPassword(username: string, password: string, callback) {
        password = md5(password);
        executeQuery(userSQL.GET_BY_NAME_AND_PASSWORD, [username, password], (error, result) => {
            callback(error, result[0]);
        });
    }
}

export default new User();