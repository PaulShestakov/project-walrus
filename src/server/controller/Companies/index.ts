import { Router, Request, Response } from 'express';
import BaseController from "../BaseController";
import upload from "../../util/Upload";

import CompaniesRepository from '../../repository/companies/Companies';
import * as passport from 'passport';

class Companies extends BaseController {

	router: Router;

	constructor() {
		super();
		this.router = Router();
		this.router.get('/filtered', this.getFiltered.bind(this));
		this.router.get('/fuzzySearch', this.fuzzySearch.bind(this));
		this.router.get('/:companyId', this.getCompany.bind(this));
		//this.router.post('/', passport.authenticate('jwt', { session: false }), this.postCompany.bind(this));
		this.router.post('/', upload.array('image', 1), this.postCompany.bind(this));
	}

	private getFiltered(req: Request, res: Response) {
		CompaniesRepository.getFiltered(req.query, (error, result) => {
			if (error) {
				this.errorResponse(res, 500, error);
			}
			this.okResponse(res, result);
		});
	}

	private fuzzySearch(req: Request, res: Response) {
		CompaniesRepository.fuzzySearch(req.query, (error, result) => {
			if (error) {
				this.errorResponse(res, 500, error);
			}
			this.okResponse(res, result);
		});
	}

	private getCompany(req: Request, res: Response) {
		CompaniesRepository.getCompany(req.params.companyId, (error, result) => {
			if (error) {
				this.errorResponse(res, 500, error);
			} else {
				this.okResponse(res, result);
			}
		});
	}

	private postCompany(req: Request, res: Response) {
		//this.checkRole(req, res, 1)
       if (true) {
		let company = JSON.parse(req.body.company);
	   	company.image = req.files;
		CompaniesRepository.postCompany(company, (error, result) => {
		   if (error) {
			   this.errorResponse(res, 500, error);
		   } else {
			   this.okResponse(res, result);
		   }
		});
	   }
	}
}

export default new Companies().router;