import {Router, Request, Response} from 'express';
import Companies from '../../repository/companies/Companies';

const companiesTypesRouter = Router();

companiesTypesRouter.get('/', get);

function get(req: Request, res: Response) {
	Companies.getCompaniesTypes((error, result) => {
		if (error) {
			res.status(500).send(error);
		} else {
			res.status(200).send(result);
		}
	});
}

export default companiesTypesRouter;
