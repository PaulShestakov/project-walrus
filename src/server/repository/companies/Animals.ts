import * as uuid from 'uuid';
import Queries from './sql/Queries';
import Util from "../../util/Util";

export default class Animals {

    static mapCompanyAnimal = (item) => ({
        animalId: item.animalId,
        breedId: item.breedId,
        animalName: item.animalName,
        breedName: item.breedName,
    });

    static internalizeCompanyAnimal(animal, companyId) {
        return [
            uuid(),
            companyId,
            animal.animalId,
            animal.breedId,
        ]
    }

    static saveAnimals(animals, companyId) {
        return (connection, done) => {
            if (animals && animals.length > 0) {
                connection.query(Queries.SAVE_COMPANY_ANIMAL,
                    [animals.map(animal => Animals.internalizeCompanyAnimal(animal, companyId))], done);
            } else {
                done(null, null);
            }
        };
    }

    static updateAnimals = (animals, companyId) => {
        return (connection, done) => {
            const deleteAnimals = new Promise((resolve, reject) => {
                connection.query(Queries.DELETE_ANIMALS_FOR_COMPANY, [companyId], Util.resolvePromise(resolve, reject));
            });
            const insertAnimals = new Promise((resolve, reject) => {
                if (animals && animals.length > 0) {
                    const internalizedAnimals = animals.map(animal => {
                        return Animals.internalizeCompanyAnimal(animal, companyId);
                    });
                    connection.query(Queries.SAVE_COMPANY_ANIMAL, [internalizedAnimals], Util.resolvePromise(resolve, reject));
                } else {
                    resolve(null);
                }
            });
            Promise.all([deleteAnimals, insertAnimals]).then((results) => done(null, results));
        };
    }
}