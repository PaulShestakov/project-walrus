import { Router, Request, Response } from 'express';
import BaseController from "../BaseController";

class Companies extends BaseController {

	router: Router;

	constructor() {
		super();
		this.router = Router();
		this.router.get('/filtered', this.getFiltered.bind(this));
	}

	private getFiltered(req: Request, res: Response) {
		// repo.getFiltered(req.query, (error, result) => {
		// 	if (error) {
		// 		this.error(res, 500, error);
		// 	}
		// 	this.okResponse(res, result);
		// });
	}
}

export default new Companies().router;