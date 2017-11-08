import * as uuid from 'uuid';
import Queries from './sql/Queries';
import Util from "../../util/Util";
import async from 'async';

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

	static updateAnimals(animals, companyId) {

		let internalizedAnimals = [];
		if (animals) {
			internalizedAnimals = animals.map(animal => {
				return Animals.internalizeCompanyAnimal(animal, companyId);
			});
		}

		const deleteAnimals = (connection, done) => {
			connection.query(Queries.DELETE_ANIMALS_FOR_COMPANY, [companyId], done);
		};

		const insertAnimals = (connection, done) => {
			if (internalizedAnimals.length > 0) {
				connection.query(Queries.SAVE_COMPANY_ANIMAL, [internalizedAnimals], done);
			} else {
				done(null, null);
			}
		};

		return (connection, done) => {
			const tasks = [deleteAnimals, insertAnimals].map(f => f.bind(null, connection));
			async.series(tasks, done);
		};
	}
}