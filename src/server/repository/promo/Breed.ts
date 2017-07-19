import BaseCRUD from "../BaseCRUD";

export default class Breed extends BaseCRUD {

    GET_BREEDS_BY_ANIMAL : string;

    constructor() {
        super('WIKIPET.BREED');
        this.GET_BREEDS_BY_ANIMAL = 'SELECT * FROM ' + this.TABLE_NAME + ' WHERE ANIMAL_ID = ?';
    }

    getByAnimal(animal : string, callback) : void {
        this.wrapSingleQuery(this.GET_BREEDS_BY_ANIMAL, [animal], callback);
    }
}