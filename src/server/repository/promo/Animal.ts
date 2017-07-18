import BaseCRUD from "../BaseCRUD";

export default class Animal extends BaseCRUD {

    TABLE_NAME = 'WIKIPET.ANIMAL';
    GET_ALL :       string = 'SELECT * FROM ' + this.TABLE_NAME;

}