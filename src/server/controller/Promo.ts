import { Router, Request, Response, NextFunction } from 'express';
import repo from 'repository/Promo';

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
			}).catch((err) => this.error(res, 500, err));
		} else {
			this.error(res, 400, '', 'Uuid is missing');
		}
	}

	private getAll(req: Request, res: Response, next: NextFunction) {
		repo.getAll().then((result) => {
			res.status(200).send(result);
		}).catch((err) => {
			console.log('Error ' + err);
			res.status(500).send(message ? message : 'Error');
		});
	}

	private save(req: Request, res: Response, next: NextFunction) {
		let promo = req.body;
		if (promo) {
			repo.save(promo).then((data) => {
				res.status(200).send(data);
			}).catch((err) => this.error(res, 500, err));
		} else {
			this.error(res, 400, err, '', 'Promo is missing');
		}
	}

	private update(req: Request, res: Response, next: NextFunction) {
		let promo = req.body;
		if (promo) {
			repo.update(promo).then(() => {
				res.status(200).send(promo);
			}).catch(() => this.error(res, 500, err));
		} else {
			this.error(res, 400, '', 'Promo is missing');
		}
	}

	private remove(req: Request, res: Response, next: NextFunction) {
		let uuid = req.params.uuid;
		if (uuid) {
			repo.remove(uuid).then(() => {
				res.status(200).send();
			}).catch((err) => this.error(res, 500, err));
		} else {
			this.error(res, 400, '', 'Uuid is missing');
		}
	}

	private static error(res : Response, code : number, err, message : string) : void {
		console.log('Error ${message} ${err}');
		res.status(code).send(message ? message : 'Error');
	}
}

export default new Promo().router;
