import * as squel from "squel";

import Util from '../../util/Util';

import { executeQuery, executeSeries, executeParallel } from '../../database/DBHelper';

import Queries from './sql/Queries';



export default class Companies {

	static getCompany(companyId: string, callback) {
		executeQuery(Queries.GET, [companyId], callback);
	}

	public getFiltered(params, callback): void {
		// Retrieve filter params
		const typeId = params.type;
		const animalId = params.animal;
		const breedsIds = Util.ensureArray(params.breeds);
		const citiesIds = Util.ensureArray(params.cities);
		const priceFrom = params.priceFrom;
		const priceTo = params.priceTo;

		let filter = squel.expr();


		const sql = squel
			.select()
			.from('wikipet.companies', 'p')
			.where(filter)
			.order('p.CREATION_DATE', false)
			.toParam();

		// executeQuery(sql.text, sql.values, (error, rows) => {
		// 	if (error) {
		// 		callback(error);
		// 		return;
		// 	}
		// 	const promos = rows.map(Promo.externalizePromo);
		// 	callback(null, promos);
		// });
	}




}