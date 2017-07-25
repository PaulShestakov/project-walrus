import BaseCRUD from "../BaseCRUD";

export default class Status extends BaseCRUD {

    private GET_BY_NAME : string;

    constructor() {
        super('wikipet.promo_status');
        this.GET_BY_NAME = 'SELECT * FROM ' + this.TABLE_NAME + ' WHERE ST_NAME = ?';
    }

    public getByName(name, callback) {
        this.wrapSingleQuery(this.GET_BY_NAME, [name], callback);
    }
}