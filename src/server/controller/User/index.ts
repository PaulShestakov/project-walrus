import { Router, Request, Response } from 'express';
import Util from "../../util/Util";
import repo from "../../repository/user/User";
import * as passport from 'passport';

import BaseController from "../BaseController";


class User extends BaseController {

    router: Router;
    
    constructor() {
        super();
        this.router = Router();

        this.router.get('/me',
            passport.authenticate('jwt', { session: false }), this.getCurrentUser.bind(this));
    }

    private getCurrentUser(req: any, res: Response) {
        const { user } = req;
        this.okResponse(res, {
            id: user.user_id,
            name: user.name,
            role: user.user_group,
            email: user.email,
            photo: user.foto,
        });
    }
}

export default new User().router;