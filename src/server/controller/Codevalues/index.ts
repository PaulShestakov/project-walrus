import { Router, Request, Response } from 'express';
import Util from "../../util/Util";
import repo from "../../repository/codevalues";

import BaseController from "../BaseController";


class Codevalues extends BaseController {
    router: Router;

    constructor() {
        super();
        this.router = Router();

		this.router.get('/countries', this.getCountries.bind(this));
		this.router.get('/animals', this.getAnimals.bind(this));
		this.router.get('/companyCategories', this.getCompanyCategories.bind(this));
		this.router.get('/', this.getByTypes.bind(this));
    }

    getByTypes(req: Request, res: Response) {
    	const types = Util.ensureArray(req.query.type);

		const validGroups = ['DAY_OF_WEEK', 'JOB_TYPE', 'PETS_OWNER_TYPE',
		 'DRUGS_TYPE', 'CLINICS_SERVICES', 'TORG_TYPE', 'SPECIALIST_DIRECTION'];

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

	getCountries(req: Request, res: Response) {
		repo.getCountries(this.getOrdinalResponseCallback(res));
	}

	getAnimals(req: Request, res: Response) {
		repo.getAnimals(this.getOrdinalResponseCallback(res));
	}
	
	getCompanyCategories(req: Request, res: Response) {
		repo.getCompanyCategories(this.getOrdinalResponseCallback(res));
	}
}

export default new Codevalues().router;
