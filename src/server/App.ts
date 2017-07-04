import * as express from 'express';
import * as bodyParser from 'body-parser';

import Promo from './routes/promo/Promo';

class App {

    // ref to Express instance
    public express: express.Application;

    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(express.static(__dirname + '/dist'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    // Configure API endpoints.
    private routes(): void {
        this.express.use('/api/v1/promo', Promo);
        this.express.get("/*", (req, res, next) => {
            res.status(404).send("Incorrect endpoint");
        });
    }

}

export default new App().express;