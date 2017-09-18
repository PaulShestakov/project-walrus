import { Router, Request, Response } from 'express';
import BaseController from "../BaseController";

import CompaniesRepository from '../../repository/companies/Companies';

class Companies extends BaseController {

	router: Router;

	constructor() {
		super();
		this.router = Router();
		this.router.get('/:companyId', this.getCompany);
		this.router.get('/filtered', this.getFiltered);

	}

	private getFiltered(req: Request, res: Response) {
		// repo.getFiltered(req.query, (error, result) => {
		// 	if (error) {
		// 		this.error(res, 500, error);
		// 	}
		// 	this.okResponse(res, result);
		// });
	}

	private getCompany(req: Request, res: Response) {
		CompaniesRepository.getCompany('42', (error, result) => {
			if (error) {
				this.error(res, 500, error);
			} else {
				this.okResponse(res, result);
			}
		});
	}
}

export default new Companies().router;