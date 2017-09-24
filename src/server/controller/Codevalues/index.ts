import { Router, Request, Response } from 'express';
import async from 'async';
import Util from "../../util/Util";

import AnimalRepo from "../../repository/codevalues/Animal";
import CityRepo from "../../repository/codevalues/City";
import BreedRepo from "../../repository/codevalues/Breed";
import CompaniesCategoriesRepo from '../../repository/codevalues/CompaniesCategories';


const { check, oneOf, validationResult } = require('express-validator/check');


import BaseController from "../BaseController";
import BaseCRUD from "../../repository/BaseCRUD";


class Codevalues extends BaseController {
    router: Router;

    animalRepo: AnimalRepo;
    cityRepo: CityRepo;
    breedRepo: BreedRepo;
	companiesCategoriesRepo: CompaniesCategoriesRepo;


    constructor() {
        super();
        this.router = Router();

        this.animalRepo = new AnimalRepo();
        this.cityRepo = new CityRepo();
        this.breedRepo = new BreedRepo();
        this.companiesCategoriesRepo = new CompaniesCategoriesRepo();

        this.router.get('/', this.getByTypes.bind(this));
        this.router.get('/breed', this.getBreeds.bind(this));
    }

    getByTypes(req: Request, res: Response) {
		const types = Util.ensureArray(req.query.type);

		// Temp validation:
		const validTypes = ['ANIMALS', 'CITIES', 'COMPANIES_CATEGORIES'];
		const validationPassed: boolean = types.every(type => {
			if (validTypes.indexOf(type) === -1) {
				this.errorResponse(res, 400, {error: 'Unsupported codevalue type'});
				return false;
			}
			return true;
		});


		function mapAnimal(animal) {
			return {
				animalId: animal.ANIMAL_ID,
				name: animal.NAME
			}
		}

		function mapCity(city) {
			return {
				cityId: city.CITY_ID,
				name: city.NAME
			}
		}

		if (validationPassed) {
			const typeToRepoMap: Map<string, BaseCRUD> = new Map();

			typeToRepoMap.set('ANIMALS', this.animalRepo);
			typeToRepoMap.set('CITIES', this.cityRepo);
			typeToRepoMap.set('COMPANIES_CATEGORIES', this.companiesCategoriesRepo);

			const allTasks = {
				ANIMALS: (callback) => {
					this.animalRepo.getAll((error, result) => {
						if (error) {
							callback(error);
						} else {
							callback(null, result.map(mapAnimal));
						}
					})
				},
				CITIES: (callback) => {
					this.cityRepo.getAll((error, result) => {
						if (error) {
							callback(error);
						} else {
							callback(null, result.map(mapCity));
						}
					})
				},
				COMPANIES_CATEGORIES: this.companiesCategoriesRepo.getAll.bind(this.companiesCategoriesRepo)
			};

			const tasks = types.map(type => allTasks[type]);

			async.parallel(tasks, (error, result) => {
				if (error) {
					this.errorResponse(res, 500, error);
				} else {
					const mappedResult = result.reduce((acc, resultItem, index) => {
						acc[types[index]] = resultItem;
						return acc;
					}, {});
					this.okResponse(res, mappedResult);
				}
			});
		}
	}


    getBreeds(req: Request, res: Response) {
        let animal = req.query.animal;
        this.breedRepo.getByAnimal(animal, (error, result) => {

            if (error) {
                this.errorResponse(res, 500, error);
                return;
            }

            result = result.map((entity) => ({
                id: entity.BREED_ID,
                name: entity.NAME,
            }));

            this.okResponse(res, result);
        });
    }
}

export default new Codevalues().router;
