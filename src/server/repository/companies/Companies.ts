//
// import * as squel from "squel";
//
// import Util from '../../util/Util';
//
// import { executeQuery, executeSeries, executeParallel } from '../../database/DBHelper';
//
// import Queries from './sql/Queries';
//
//
//
// class Companies {
//
// 	static getCompanyById(companyId: string, callback) {
// 		executeQuery(Queries.GET, [companyId], callback);
// 	}
//
// 	public getFiltered(params, callback): void {
// 		// Retrieve filter params
// 		const typeId = params.type;
// 		const animalId = params.animal;
// 		const breedsIds = Util.ensureArray(params.breeds);
// 		const citiesIds = Util.ensureArray(params.cities);
// 		const priceFrom = params.priceFrom;
// 		const priceTo = params.priceTo;
//
// 		let filter = squel.expr();
//
// 		if (typeId && typeId !== 'ALL') {
// 			filter = filter.and('p.TYPE_ID = ?', typeId);
// 		}
// 		if (animalId && animalId !== 'ALL') {
// 			filter = filter.and('p.ANIMAL_ID = ?', animalId);
// 		}
// 		if (breedsIds.length > 0) {
// 			filter = filter.and('p.BREED_ID IN ?', breedsIds)
// 		}
// 		if (citiesIds.length > 0) {
// 			filter = filter.and('p.CITY_ID IN ?', citiesIds);
// 		}
// 		if (priceFrom) {
// 			filter = filter.and('p.PRICE >= ?', priceFrom);
// 		}
// 		if (priceTo) {
// 			filter = filter.and('p.PRICE <= ?', priceTo);
// 		}
//
// 		const sql = squel
// 			.select()
// 			.from('wikipet.promo', 'p')
// 			.where(filter)
// 			.order('p.CREATION_DATE', false)
// 			.toParam();
//
// 		executeQuery(sql.text, sql.values, (error, rows) => {
// 			if (error) {
// 				callback(error);
// 				return;
// 			}
// 			const promos = rows.map(Promo.externalizePromo);
// 			callback(null, promos);
// 		});
// 	}
//
//
//
//
// }