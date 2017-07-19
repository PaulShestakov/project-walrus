import { Router, Request, Response } from 'express';
import async from 'async';
import Util from "../../util/Util";
import AnimalRepo from "../../repository/promo/Animal";
import CityRepo from "../../repository/promo/City";
import BreedRepo from "../../repository/promo/Breed";
import BaseController from "../BaseController";


class PromoCV extends BaseController {

    router: Router;
    animalRepo : AnimalRepo;
    cityRepo : CityRepo;
    breedRepo : BreedRepo;

    constructor() {
        this.router = Router();
        this.animalRepo = new AnimalRepo();
        this.cityRepo = new CityRepo();
        this.breedRepo = new BreedRepo();

        this.router.get('/', this.getAll.bind(this));
        this.router.get('/breed', this.getBreeds.bind(this));
    }

    getAll(req : Request, res : Response) {
        let that = this;
        async.parallel([
            function (callback) {
                that.animalRepo.getAll(null, (error, result) => {

                    Util.handleError(error, callback);

                    result = {
                        "animals" : result.map((entity) => {return entity.ANIMAL_ID})
                    };

                    callback(null, result);

                });
            },
            function (callback) {
                that.cityRepo.getAll(null, (error, result) => {

                    Util.handleError(error, callback);

                    result = {
                      "cities"  : result.map((entity) => {return entity.CITY_ID})
                    };

                    callback(null, result);

                });
            }
        ], function (error, result) {
            if (error) {
                that.error(res, 500, error);
                return;
            }
            that.okResponse(res, result);
        });
    }

    getBreeds(req : Request, res : Response) {
        let animal = req.query.animal;
        this.breedRepo.getByAnimal(animal, (error, result) => {

            if (error) {
                this.error(res, 500, error);
                return;
            }

            result = result.map((entity) => {return entity.BREED_ID;});

            this.okResponse(res, result);

        });
    }
}

export default new PromoCV().router;
