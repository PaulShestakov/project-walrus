import { Router, Request, Response, NextFunction } from 'express';

import Pool from './../../database/Pool';

class Promo {

    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    private get(req: Request, res: Response, next: NextFunction) {
        Pool.getConnection(function(err,connection){
            if (err) {
                res.json({"code" : 100, "status" : "Error in connection database"});
                return;
            }

            console.log('connected as id ' + connection.threadId);

            connection.query("select * from dle_users", function(err,rows){
                connection.release();
                if(!err) {
                    res.json(rows);
                }
            });

            connection.on('error', function(err) {
                res.json({"code" : 100, "status" : "Error in connection database"});
                return;
            });
        });
    }

    private getAll(req: Request, res: Response, next: NextFunction) {
        res.send('Send all');
    }

    private save(req: Request, res: Response, next: NextFunction) {
        res.send('saved');
    }
    private update(req: Request, res: Response, next: NextFunction) {
        res.send('not implemented');
    }

    private delete(req: Request, res: Response, next: NextFunction) {
        res.send('not implemented');
    }

    init() {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.get);
        this.router.post('/', this.save);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }

}

export default new Promo().router;