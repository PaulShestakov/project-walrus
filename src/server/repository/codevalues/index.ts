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

    public getCities(callback) {
        executeQuery(codeValuesSQL.GET_CITIES, [], (error, rows) => {
            if (error) {
                return callback(error);
            }

            const reducedRows = rows.reduce((accum, row) => {
                if (!accum[row.cityId]) {
                    accum[row.cityId] = {
                        value: row.cityId,
                        label: row.cityName,
                        sort: row.citySort,
                        subCities: {},
                        subways: {}
                    }
                }
                if (!accum[row.cityId].subCities[row.subCityId]) {
                    accum[row.cityId].subCities[row.subCityId] = {
                        value: row.subCityId,
                        label: row.subCityName,
                        sort: row.subCitySort,
                    };
                }
                if (!accum[row.cityId].subways[row.citySubwayId]) {
                    accum[row.cityId].subways[row.citySubwayId] = {
                        value: row.citySubwayId,
                        label: row.citySubwayName,
                        sort: row.subCitySort,
                    };
                }
                return accum;
            }, {});

            const result = Object.values(reducedRows).map(entry => ({
                ...entry,
                subways: Object.values(entry.subways).filter(e => e.value !== null),
                subCities: Object.values(entry.subCities).filter(e => e.value !== null),
            }));
    
            callback(error, result);
        });        
    }
}

export default new CodeValues();