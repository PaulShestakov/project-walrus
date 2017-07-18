import BaseCRUD from "./BaseCRUD";
import {executeQuery} from "../database/Pool";

export default class Status extends BaseCRUD {

    protected TABLE_NAME : string = 'WIKIPET.PROMO_STATUS';

    private GET_BY_NAME = 'SELECT * FROM ' + this.TABLE_NAME + ' WHERE ST_NAME = ?';

    public async getByName(name) {
        return await executeQuery(this.GET_BY_NAME, [name]);
    }
}