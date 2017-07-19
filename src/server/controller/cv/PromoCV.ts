import { Router, Request, Response } from 'express';
import async from 'async';
import Util from "../../util/Util";
import AnimalRepo from "../../repository/promo/Animal";
import CityRepo from "../../repository/promo/City";
import BreedRepo from "../../repository/promo/Breed";


class PromoCV {

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
        this.router.get('/breed/:animal', this.getBreeds.bind(this));
    }

    getAll(req : Request, res : Response) {
        let that = this;
        async.parallel([
            function (callback) {
                that.animalRepo.getAll().then((result) => {

                    result = {
                        "animals" : result.map((entity) => {return entity.ANIMAL_ID})
                    };

                    callback(null, result);

                }).catch((error) => {
                    Util.handleError(error, callback);
                });
            },
            function (callback) {
                that.cityRepo.getAll().then((result : Array<>) => {

                    result = {
                      "cities"  : result.map((entity) => {return entity.CITY_ID})
                    };

                    callback(null, result);

                }).catch((error) => {
                    Util.handleError(error, callback);
                });
            }
        ], function (error, result) {
            if (error) {
                res.status(500).send(error);
            }
            res.status(200).send(result);
        });
    }

    getBreeds(req : Request, res : Response) {
        let animal = req.params.animal;
        this.breedRepo.getByAnimal(animal).then((result) => {

            result = result.map((entity) => {
                return entity.BREED_ID;
            });

            res.status(200).send(result);

        }).catch((error) => {
            res.status(500).send(error);
        });
    }
}

export default new PromoCV().router;
