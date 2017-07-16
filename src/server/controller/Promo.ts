import { Router, Request, Response } from 'express';
import repo from '../repository/Promo';


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

	private get(req: Request, res: Response) {
		let uuid = req.params.uuid;
		if (uuid) {
			repo.get(uuid).then((result) => {
				res.status(200).send(result);
			}).catch((err) => Promo.error(res, 500, err));
		} else {
			Promo.error(res, 400, 'Query parameter uuid is missing');
		}
	}

	private getAll(req: Request, res: Response) {
		repo.getAll().then((result) => {
			res.status(200).send(result);
		}).catch((error) => {
			Promo.error(res, 500, error);
		});
	}

	private save(req: Request, res: Response) {
		let promo = req.body;
		if (promo) {
			repo.save(promo).then((data) => {
				res.status(200).send(data);
			}).catch((error) => {
				Promo.error(res, 500, error);
			});
		} else {
			Promo.error(res, 400, 'Promo is missing');
		}
	}

	private update(req: Request, res: Response) {
		let promo = req.body;
		if (promo) {
			repo.update(promo).then(() => {
				res.status(200).send(promo);
			}).catch((err) =>{
				Promo.error(res, 500, err);
			});
		} else {
			Promo.error(res, 400, 'Promo is missing');
		}
	}

	private remove(req: Request, res: Response) {
		let uuid = req.params.uuid;
		if (uuid) {
			repo.remove(uuid).then(() => {
				res.status(200).send();
			}).catch((error) => {
				Promo.error(res, 500, error);
			});
		} else {
			Promo.error(res, 400, 'Query parameter uuid is missing');
		}
	}

	private static error(res: Response, code: number, error: string|Object): void {
		res.status(code).send({error});
	}
}

export default new Promo().router;
