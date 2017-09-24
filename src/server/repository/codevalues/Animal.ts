import BaseCRUD from "../BaseCRUD";

export default class Animal extends BaseCRUD {

    constructor() {
        super('wikipet.animal');
    }

    mapper(animal) {
        return {
            animalId: animal.ANIMAL_ID,
            name: animal.NAME,
        }
    }
}
