import * as Ajv from 'ajv';
import { Router, Request, Response } from 'express';
import BaseController from '../BaseController';
import upload from '../../util/Upload';
import CompaniesRepository from '../../repository/companies/Companies';
import FeedbacksRepository from '../../repository/companies/Feedbacks';
import * as passport from 'passport';
import validators from './validators.js';

class Companies extends BaseController {

	router: Router;
	ajv;

	constructor() {
		super();
		this.router = Router();
		this.ajv = new Ajv();

		this.router.get('/filtered', this.getFiltered.bind(this));
		this.router.get('/fuzzySearch', this.fuzzySearch.bind(this));

		this.router.post('/:companyId/feedback',
			passport.authenticate('jwt', { session: false }), this.postFeedback.bind(this));
		//this.router.post('/:companyId/feedback', this.postFeedback.bind(this));

		this.router.delete('/:companyId/feedback/:feedbackId',
			passport.authenticate('jwt', { session: false }), this.deleteFeedback.bind(this));
		//this.router.delete('/:companyId/feedback/:feedbackId', this.deleteFeedback.bind(this));


		this.router.post('/',
			passport.authenticate('jwt', { session: false }),this.saveCompany.bind(this));
		//this.router.post('/', upload.array('image', 1), this.saveCompany.bind(this));
		
		this.router.put('/:companyId', upload.array('image', 1),
			passport.authenticate('jwt', { session: false }), this.updateCompany.bind(this));
		
		this.router.get('/:url_id', this.getCompany.bind(this));
		this.router.delete('/:companyId',
			passport.authenticate('jwt', { session: false }), this.deleteCompany.bind(this));
	}

	private getFiltered(req: Request, res: Response) {
		const valid = this.ajv.validate(validators.filter, req.query);

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
		CompaniesRepository.getCompany(decodeURI(req.params.url_id), (error, result) => {
			if (error) {
				this.errorResponse(res, 500, error);
			} else {
				this.okResponse(res, result);
			}
		});
	}

	private deleteCompany(req: Request, res: Response) {
		if (this.checkRole(req, res, 1)) {
			CompaniesRepository.deleteCompany(req.params.companyId, (error, result) => {
				if (error) {
					this.errorResponse(res, 500, error);
				} else {
					this.okResponse(res, result);
				}
			});
		}
	}
  
	private saveCompany(req: Request, res: Response) {
       if (this.checkRole(req, res, 1)) {
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

		if (this.checkRole(req, res, 1)) {
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
	}

	private postFeedback(req: Request, res: Response) {
		if (this.checkRole(req, res, 1)) {
			const companyId = req.params.companyId;
			if (companyId) {
				const feedback = req.body;
				feedback.companyId = companyId;
				// feedback.user = req.user.id;
				feedback.user = 38;
				FeedbacksRepository.postFeedback(req.body, (error) => {
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

	private deleteFeedback(req: Request, res: Response) {
		const { feedbackId } = req.params;
		if (this.checkRole(req, res, 1)) {
			if (feedbackId) {
				FeedbacksRepository.deleteFeedback(feedbackId, (error, result) => {
					if (error) {
						this.errorResponse(res, 500, error);
					} else {
						this.okResponse(res, result);
					}
				});
			} else {
				this.errorResponse(res, 400, 'Feedback id was not provided');
			}
		}
	}
}

export default new Companies().router;