import { Router, Request, Response } from 'express';
import async from 'async';
import Util from "../../util/Util";
import repo from "../../repository/codevalues";

import BaseController from "../BaseController";


class Codevalues extends BaseController {
    router: Router;

    constructor() {
        super();
        this.router = Router();

		this.router.get('/cities', this.getCities.bind(this));
		this.router.get('/companyCategories', this.getCompanyCategories.bind(this));
		this.router.get('/', this.getByTypes.bind(this));
    }

    getByTypes(req: Request, res: Response) {
    	const types = Util.ensureArray(req.query.type);

		const validGroups = ['ANIMAL',
							'BREED.DOG',
							'BREED.CAT',
							'DAY_OF_WEEK'];

		const validationPassed: boolean = types.every(type => {
			if (validGroups.indexOf(type) === -1) {
				this.errorResponse(res, 400, {error: 'Unsupported codevalue type'});
				return false;
			}
			return true;
		});

		if (validationPassed) {
			repo.getByTypes(types, this.getOrdinalResponseCallback(res));
		}

	}

	getCities(req: Request, res: Response) {
		repo.getCities(this.getOrdinalResponseCallback(res));
	}
	
	getCompanyCategories(req: Request, res: Response) {
		repo.getCompanyCategories(this.getOrdinalResponseCallback(res));
	}
}

export default new Codevalues().router;
