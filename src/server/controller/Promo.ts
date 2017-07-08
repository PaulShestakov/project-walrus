import { Router, Request, Response, NextFunction } from 'express';
import Repo from './../repository/Promo';

class Promo {

    router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/', this.getAll);
        this.router.get('/:uuid', this.get);
        this.router.post('/', this.save);
        this.router.put('/:uuid', this.update);
        this.router.delete('/:uuid', this.remove);
    }

    private get(req: Request, res: Response, next: NextFunction) {
        let uuid = req.params.uuid;
        if (uuid) {
            Repo.get(uuid, (err, result) => {
                if (!err) {
                    res.status(200).send(result);
                } else {
                    res.status(500).send();
                }
            });
        } else {
            console.log('Uuid is missing');
            res.status(400).send('Uuid is missing');
        }
    }

    private getAll(req: Request, res: Response, next: NextFunction) {
        Repo.getAll((err, result) => {
            if (!err) {
                res.status(200).send(result);
            } else {
                res.status(500).send();
            }
        });
    }

    private save(req: Request, res: Response, next: NextFunction) {
        let promo = JSON.parse(JSON.stringify(req.body));
        if (promo) {
            Repo.save(promo, (err) => {
                if (!err) {
                    res.status(200).send();
                } else {
                    res.status(500).send();
                }
            });
        } else {
            res.status(400).send('Promo is missing');
        }
    }
    private update(req: Request, res: Response, next: NextFunction) {
        let promo = JSON.parse(JSON.stringify(req.body));
        if (promo) {
            Repo.update(promo, (err) => {
                if (!err) {
                    res.status(200).send();
                } else {
                    res.status(500).send();
                }
            });
        } else {
            res.status(400).send('Promo is missing');
        }
    }

    private remove(req: Request, res: Response, next: NextFunction) {
        let uuid = req.params.uuid;
        if (uuid) {
            Repo.remove(uuid, (err) => {
                if (!err) {
                    res.status(200).send();
                } else {
                    res.status(500).send();
                }
            });
        } else {
            console.log('Uuid is missing');
            res.status(400).send('Uuid is missing');
        }
    }
}

export default new Promo().router;
