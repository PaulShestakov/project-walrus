import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as helmet from 'helmet';
import Promo from "./controller/promo/Promo";
import CodeValue from "./controller/CodeValue";
import * as jwt from "jsonwebtoken";
import * as cookieParser from "cookie-parser";

export default class App {
	// Ref to Express instance
	public express: express.Application;

	// Run configuration methods on the Express instance.
	constructor() {
		this.express = express();
		this.middleware();
		this.routes();
	}

	// Configure Express middleware.
	private middleware(): void {
		this.express.use(cookieParser());
		this.express.use(helmet());
		this.express.use(bodyParser.json());
		this.express.use(bodyParser.urlencoded({ extended: false }));
		this.express.use(function(req, res, next) {
			// check header or url parameters or post parameters for token
			let token = req.cookies.jwt;

			// decode token
			if (token) {

				// verifies secret and checks exp
				jwt.verify(token, Buffer.from('rixlgJCCQ4n94NUvKNJkZ6xWOTbTYKvCGDxWSZqrkl7yGGF3P5yh86GqF9UDGTr', 'base64'),
					function(err, decoded) {
					if (err) {
						return res.json({ success: false, message: 'Failed to authenticate token.' });
					} else {
						// if everything is good, save to request for use in other routes
						req.decoded = decoded;
						next();
					}
				});

			} else {

				// if there is no token
				// return an error
				return res.status(403).send({
					success: false,
					message: 'No token provided.'
				});

			}
		});
	}

	// Configure API endpoints.
	private routes(): void {
		this.express.use('/images', express.static(path.join(__dirname, '../uploads')));
		this.express.use('/api/v1/promo', Promo);
		this.express.use('/api/v1/codevalue', CodeValue);
		this.express.use('/', express.static(path.join(__dirname, '../client')));

		this.express.get('*', (req, res) => {
			res.sendFile(path.join(__dirname, './../client', 'index.html'));
		});
	}
}