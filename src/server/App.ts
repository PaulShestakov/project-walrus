import * as express from 'express';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as helmet from 'helmet';
import * as cookieParser from "cookie-parser";
import * as passport from 'passport';
import { Strategy as JWTStrategy } from 'passport-jwt';

import User from "./repository/user/User";
import Promo from "./controller/Promo";
import UserController from "./controller/User";
import Company from "./controller/Companies";
import CodeValue from "./controller/Codevalues";


export default class App {
	public app: express.Application;

	constructor() {
		this.app = express();
		this.configureMiddleware();
		this.configureRoutes();
	}

	private configureMiddleware(): void {
		this.app.use(compression());
		this.app.use(cookieParser());
		this.app.use(helmet());
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.jwtMiddleware();
		this.app.use(passport.initialize());
	}

	private configureRoutes(): void {
		this.app.use('/dist/uploads', express.static(path.join(__dirname, '../uploads')));
		this.app.use('/api/v1/user', UserController);
		this.app.use('/api/v1/promo', Promo);
		this.app.use('/api/v1/company', Company);
		this.app.use('/api/v1/codevalue', CodeValue);
		this.app.use('/', express.static(path.join(__dirname, '../client')));

		this.app.get('*', (req, res) => {
			res.sendFile(path.join(__dirname, './../client', 'index.html'));
		});
	}

	private jwtMiddleware() {
        const opts = {
            secretOrKey: Buffer.from('rixlgJCCQ4n94NUvKNJkZ6xWOTbTYKvCGDxWSZqrkl7yGGF3P5yh86GqF9UDGTr', 'base64'),
            jwtFromRequest: (req) => req.cookies.jwt,
            algorithms: ['HS512'],
            ignoreExpiration: true,
            //issuer: 'https://wikipet.by/'
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