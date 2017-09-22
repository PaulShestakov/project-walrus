import BaseCRUD from "../BaseCRUD";
import {executeQuery} from "../../database/DBHelper";

export default class Breed extends BaseCRUD {

    GET_BREEDS_BY_ANIMAL : string;

    constructor() {
        super('wikipet.breed');
        this.GET_BREEDS_BY_ANIMAL = 'SELECT * FROM ' + this.TABLE_NAME + ' WHERE ANIMAL_ID = ?';
    }

    getByAnimal(animal : string, callback) : void {
        executeQuery(this.GET_BREEDS_BY_ANIMAL, [animal], callback);
    }
}