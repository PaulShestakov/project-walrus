import BaseCRUD from "../BaseCRUD";
import {executeQuery} from "../../database/DBHelper";

export default class Type extends BaseCRUD {

    private GET_BY_NAME : string;

    constructor() {
        super('WIKIPET.PROMO_TYPE');
        this.GET_BY_NAME = 'SELECT * FROM ' + this.TABLE_NAME + ' WHERE TY_NAME = ?';
    }

    public getByName(name, callback) {
        executeQuery(this.GET_BY_NAME, [name], callback);
    }
}