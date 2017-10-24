import * as Ajv from 'ajv';
import { Router, Request, Response } from 'express';
import BaseController from '../BaseController';
import upload from '../../util/Upload';
import CompaniesRepository from '../../repository/companies/Companies';


const filteredSchema = {
	"id": "/src/server/controller/companies/index/getFiltered",
	"type": "object",

	"properties": {
		"companyCategoryId": {
			"type": "string"
		},
		"companySubcategoryId": {
			"type": "string"
		},
		"isWorkingNow": {
			"enum": ["true", "false"]
		},
		"cityId": {
			"type": "array",
			"items": {
				"type": "string"
			}
		}
	},

	"required": ["companyCategoryId", "companySubcategoryId", "isWorkingNow"]
};

class Companies extends BaseController {

	router: Router;
	ajv;

	constructor() {
		super();
		this.router = Router();
		this.ajv = new Ajv();

		this.router.get('/filtered', this.getFiltered.bind(this));
		this.router.get('/fuzzySearch', this.fuzzySearch.bind(this));
		this.router.get('/:companyId', this.getCompany.bind(this));
		this.router.delete('/:companyId', this.deleteCompany.bind(this));
		this.router.post('/:companyId/feedback', this.postFeedback.bind(this));
		this.router.get('/:companyId/feedback', this.getFeedbacks.bind(this));
		//this.router.post('/', passport.authenticate('jwt', { session: false }), this.postCompany.bind(this));
		this.router.post('/', upload.array('image', 1), this.saveCompany.bind(this));
		this.router.put('/:companyId', upload.array('image', 1), this.updateCompany.bind(this));
	}

	private getFiltered(req: Request, res: Response) {
		const valid = this.ajv.validate(filteredSchema, req.query);

		if (!valid) {
			const errors = this.ajv.errors;
			this.errorResponse(res, 400, errors);

		} else {
			CompaniesRepository.getFiltered(req.query, (error, result) => {
				if (error) {
					this.errorResponse(res, 500, error);
				}
				this.okResponse(res, result);
			});
		}
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

	private deleteCompany(req: Request, res: Response) {
		CompaniesRepository.deleteCompany(req.params.companyId, (error, result) => {
			if (error) {
				this.errorResponse(res, 500, error);
			} else {
				this.okResponse(res, result);
			}
		});
	}
  
	private saveCompany(req: Request, res: Response) {
		//this.checkRole(req, res, 1)
       if (true) {
		let company = JSON.parse(req.body.company);
	   	company.image = req.files;
		CompaniesRepository.saveCompany(company, (error, result) => {
		   if (error) {
			   this.errorResponse(res, 500, error);
		   } else {
			   this.okResponse(res, result);
		   }
		});
	   }
	}

	private updateCompany(req: Request, res: Response) {
		const companyId = req.params.companyId;

		let company = JSON.parse(req.body.company);
		company.image = req.files;

		CompaniesRepository.updateCompany(companyId, company, (error, result) => {
			if (error) {
				this.errorResponse(res, 500, error);
			} else {
				this.okResponse(res, result);
			}
		});
	}

	private postFeedback(req: Request, res: Response) {
		//this.checkRole(req, res, 1)
		if (true) {
			const companyId = req.params.companyId;
			if (companyId) {
				CompaniesRepository.postFeedback(req.body, (error) => {
					if (error) {
						this.errorResponse(res, 500, error);
					} else {
						this.okResponse(res, { result: 'Success' });
					}
				});
			} else {
				this.errorResponse(res, 400, 'Company id was not provided');
			}
		}
	}

	private getFeedbacks(req: Request, res: Response) {
		const { companyId } = req.params;
		if (companyId) {
			CompaniesRepository.getFeedbacks(companyId, (error, result) => {
				if (error) {
					this.errorResponse(res, 500, error);
				} else {
					this.okResponse(res, result);
				}
			});
		} else {
			this.errorResponse(res, 400, 'Company id was not provided');
		}
	}
}

export default new Companies().router;