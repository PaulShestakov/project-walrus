import { Router, Request, Response } from 'express';
import repo from '../../repository/promo/Promo';
import BaseController from "../BaseController";
import upload from '../../util/Upload';

const IMAGES_UPLOAD_MAX_COUNT = 100;

class Promo extends BaseController {

	router : Router;

	constructor() {
		super();
		this.router = Router();
		this.router.get('/', this.getAll.bind(this));
		this.router.get('/:uuid', this.get.bind(this));
		this.router.post('/', upload.array('image', IMAGES_UPLOAD_MAX_COUNT), this.save.bind(this));
		this.router.put('/:uuid', this.update.bind(this));
		this.router.delete('/:uuid', this.remove.bind(this));
	}

	private get(req: Request, res: Response) {
		let uuid = req.params.uuid;
		if (uuid) {
			repo.get(uuid, (error, result) => {
				if (error) {
					this.error(res, 500, error);
					return;
				}
				this.okResponse(res, result);
			});
		} else {
			this.error(res, 400, 'Query parameter uuid is missing');
		}
	}

	private getAll(req: Request, res: Response) {
		repo.getAll((error, result) => {
			if (error) {
				this.error(res, 500, error);
			}
			this.okResponse(res, result);
		});
	}

	private save(req: any, res: Response) {
		const promo = JSON.parse(req.body.promo);
		const files = req.files;

		if (promo) {
			repo.save(promo, (error, data) => {
				if (error) {
					this.error(res, 500, error);
					return;
				}
				this.okResponse(res, data);
			});
		} else {
			this.error(res, 400, 'Promo is missing');
		}
	}

	private update(req: Request, res: Response) {
		let promo = req.body;
		if (promo) {
			repo.update(promo, (error, result) => {
				if (error) {
					this.error(res, 500, error);
					return;
				}
				this.okResponse(res, result);
			});
		} else {
			this.error(res, 400, 'Promo is missing');
		}
	}

	private remove(req: Request, res: Response) {
		let uuid = req.params.uuid;
		if (uuid) {
			repo.remove(uuid, (error, result) => {
				if (error) {
					this.error(res, 500, error);
					return;
				}
				this.okResponse(res, result);
			});
		} else {
			this.error(res, 400, 'Query parameter uuid is missing');
		}
	}
}

export default new Promo().router;