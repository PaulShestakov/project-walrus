import {Router, Request, Response, NextFunction} from 'express';
import AnimalRepo from '../repository/promo/Animal';
import CityRepo from '../repository/promo/City';
import BreedRepo from '../repository/promo/Breed';

class CodeValue {

    router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/:name', this.getAll);
    }

    getAll(req : Request, res : Response, next : NextFunction) {
        let animalRepo = new AnimalRepo();
        let cityRepo = new CityRepo();
        let breedRepo = new BreedRepo();
        let name = req.params.name;
        switch (name) {
            case 'animal':
                animalRepo.getAll().then((result) => {
                    res.status(200).send(result);
                }).catch((error) => {
                    res.status(500).send(error);
                });
                break;
            case 'city':
                cityRepo.getAll().then((result) => {
                    res.status(200).send(result);
                }).catch((error) => {
                    res.status(500).send(error);
                });
                break;
            case 'breed':
                breedRepo.getAll().then((result) => {
                    res.status(200).send(result);
                }).catch((error) => {
                    res.status(500).send(error);
                });
                break;
        }
    }

}

export default new CodeValue().router;
