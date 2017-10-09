import BaseCRUD from "../BaseCRUD";
import {executeQuery} from "../../database/DBHelper";
import codeValuesSQL from './sql';

class CodeValues extends BaseCRUD {

    constructor() {
        super(codeValuesSQL.TABLE_NAME);
    }

    static buildCodeValues(rows) {
        return rows.reduce((acc, row) => {

            if (!acc[row.GROUP]) {
				acc[row.GROUP] = [];
            }

			acc[row.GROUP].push({
				value: row.ID,
                label: row.NAME
            });

            return acc;
        }, {});
    }

    public getByTypes(types, callback) {
        executeQuery(codeValuesSQL.GET_BY_TYPES, [types], (error, rows) => {
            if (error) {
                return callback(error);
            }
            callback(null, CodeValues.buildCodeValues(rows));
        });
    }

    public getCompanyCategories(callback) {
        executeQuery(codeValuesSQL.GET_COMPANIES_CATEGORIES, [], (error, rows) => {
            if (error) {
                return callback(error);
            }

            const reducedRows = rows.reduce((accum, row) => {
                if (!accum[row.categoryId]) {
                    accum[row.categoryId] = {
                        value: row.categoryId,
                        label: row.categoryName,
                        sort: row.categorySort,
                        subcategories: []
                    }
                }
                accum[row.categoryId].subcategories.push({
                    value: row.subcategoryId,
                    label: row.subcategoryName,
                    sort: row.subcategorySort,
                    count: row.number ? row.number : 0
                });
                return accum;
            }, {});

            callback(error, Object.values(reducedRows));
        });
    }
}

export default new CodeValues();