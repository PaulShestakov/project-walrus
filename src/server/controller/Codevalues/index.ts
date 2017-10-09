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

		this.router.get('/companyCategories', this.getCompanyCategories.bind(this));
		this.router.get('/', this.getByTypes.bind(this));
    }

    getByTypes(req: Request, res: Response) {
    	const types = Util.ensureArray(req.query.type);

		const validGroups = ['ANIMAL',
							'CITY',
							'COMPANY_CATEGORY',
							'COMPANY_SUBCATEGORY.BREEDING',
							'COMPANY_SUBCATEGORY.GOODS',
							'COMPANY_SUBCATEGORY.HEALTH',
							'COMPANY_SUBCATEGORY.OTHER',
							'COMPANY_SUBCATEGORY.SERVICES',
							'COMPANY_SUBCATEGORY.TRAINING',
							'BREED.DOG',
							'BREED.CAT',
							'DAY_OF_WEEK',
							'SUBWAY.MINSK'];

		const validationPassed: boolean = types.every(type => {
			if (validGroups.indexOf(type) === -1) {
				this.errorResponse(res, 400, {error: 'Unsupported codevalue type'});
				return false;
			}
			return true;
		});

		if (validationPassed) {
			repo.getByTypes(types, (error, data) => {
				if (error) {
					this.errorResponse(res, 500, error);
					return;
				}
				this.okResponse(res, data);
			});
		}

	}
	
	getCompanyCategories(req: Request, res: Response) {
		repo.getCompanyCategories((error, data) => {
			if (error) {
				this.errorResponse(res, 500, error);
				return;
			}
			this.okResponse(res, data);
		});
	}
}

export default new Codevalues().router;
