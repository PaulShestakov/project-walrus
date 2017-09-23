import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as helmet from 'helmet';
import Promo from "./controller/promo/Promo";
import Company from "./controller/companies/Companies";
import CodeValue from "./controller/CodeValue";
import * as cookieParser from "cookie-parser";
import * as passport from 'passport';
import { Strategy as JWTStrategy } from 'passport-jwt';
import User from "./repository/user/User";

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

		this.jwtMiddleware();
        this.express.use(passport.initialize());
	}

	// Configure API endpoints.
	private routes(): void {
		this.express.use('/uploads', express.static(path.join(__dirname, '../uploads')));
		this.express.use('/api/v1/promo', Promo);
		this.express.use('/api/v1/company', Company);
		this.express.use('/api/v1/codevalue', CodeValue);
		this.express.use('/', express.static(path.join(__dirname, '../client')));

		this.express.get('*', (req, res) => {
			res.sendFile(path.join(__dirname, './../client', 'index.html'));
		});
	}

	private jwtMiddleware() {
        const opts = {
            secretOrKey: Buffer.from('rixlgJCCQ4n94NUvKNJkZ6xWOTbTYKvCGDxWSZqrkl7yGGF3P5yh86GqF9UDGTr', 'base64'),
            jwtFromRequest: (req) => req.cookies.jwt,
            algorithms: ['HS512'],
            ignoreExpiration: true,
            issuer: 'https://wikipet.by/'
		};
        passport.use(new JWTStrategy(opts, function(jwt_payload, done) {
            User.getById(jwt_payload.data.id, function(err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                    // or you could create a new account
                }
            });
        }));
	}
}