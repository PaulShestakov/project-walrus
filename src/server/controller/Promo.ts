import { Router, Request, Response, NextFunction } from 'express';
import repo from './../repository/Promo';
import * as validator from 'validator';

class Promo {

	router: Router;

	constructor() {
		this.router = Router();
		this.router.get('/', this.getAll);
		this.router.get('/:uuid', this.get);
		this.router.post('/', this.save);
		this.router.put('/:uuid', this.update);
		this.router.delete('/:uuid', this.remove);
	}

	private get(req: Request, res: Response, next: NextFunction) {
		let uuid = req.params.uuid;
		if (uuid) {
			repo.get(uuid).then((result) => {
				res.status(200).send(result);
			}).catch(() => {
				res.status(500).send();
			});
		} else {
			console.log('Uuid is missing');
			res.status(400).send('Uuid is missing');
		}
	}

	private getAll(req: Request, res: Response, next: NextFunction) {
		repo.getAll().then((result) => {
			res.status(200).send(result);
		}).catch(() => {
			res.status(500).send();
		});
	}

	private save(req: Request, res: Response, next: NextFunction) {

		console.log(req)
		console.log(typeof req.body)
		let promo = JSON.parse(JSON.stringify(req.body));
		if (promo) {
			repo.save(promo).then(() => {
				res.status(200).send();
			}).catch(() => {
				res.status(500).send();
			});
		} else {
			res.status(400).send('Promo is missing');
		}
	}
	private update(req: Request, res: Response, next: NextFunction) {
		let promo = JSON.parse(JSON.stringify(req.body));
		if (promo) {
			repo.update(promo).then(() => {
				res.status(200).send();
			}).catch(() => {
				res.status(500).send();
			});
		} else {
			res.status(400).send('Promo is missing');
		}
	}

	private remove(req: Request, res: Response, next: NextFunction) {
		let uuid = req.params.uuid;
		if (uuid) {
			repo.remove(uuid).then(() => {
				res.status(200).send();
			}).catch(() => {
				res.status(500).send();
			});
		} else {
			console.log('Uuid is missing');
			res.status(400).send('Uuid is missing');
		}
	}
}

export default new Promo().router;
