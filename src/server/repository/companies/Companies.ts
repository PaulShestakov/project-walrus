

import { executeQuery } from "../../database/DBHelper";
import Queries from './sql/Queries';



class Companies {

	static getCompanyById(companyId: string, callback) {
		executeQuery(Queries.GET, [companyId], callback);
	}




}