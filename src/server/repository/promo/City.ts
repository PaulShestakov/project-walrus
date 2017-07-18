import BaseCRUD from "../BaseCRUD";

export default class Breed extends BaseCRUD {

    protected TABLE_NAME : string = 'WIKIPET.CITY';
    GET_ALL :       string = 'SELECT * FROM ' + this.TABLE_NAME;
}