import BaseCRUD from "../BaseCRUD";

export default class Type extends BaseCRUD {

    private GET_BY_NAME : string;

    constructor() {
        super('wikipet.promo_type');
        this.GET_BY_NAME = 'SELECT * FROM ' + this.TABLE_NAME + ' WHERE TY_NAME = ?';
    }

    public getByName(name, callback) {
        this.wrapSingleQuery(this.GET_BY_NAME, [name], callback);
    }
}