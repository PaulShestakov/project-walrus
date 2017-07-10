import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';

import Promo from './controller/Promo';

export default class App {
    // ref to Express instance
    public express: express.Application;

    // Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use('/', express.static(path.join(__dirname, '../client')));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    // Configure API endpoints.
    private routes(): void {
        //this.express.use('/api/v1/promo', Promo);

        this.express.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, './../client', 'index.html'));
        });
    }
}