import BaseCRUD from "../BaseCRUD";
import {executeQuery} from "../../database/DBHelper";
import codeValuesSQL from './sql/CodeValue';
import CodeValue from './entities/CodeValue';

class CodeValues extends BaseCRUD {

    constructor() {
        super(codeValuesSQL.TABLE_NAME);
    }

    static externalizeCodeValue(codeValue: CodeValue) {
        return {
            value: codeValue.ID,
            name: codeValue.NAME
        }
    }

    public getByTypes(types, callback) {
        executeQuery(codeValuesSQL.GET_BY_TYPES, [types], (error, rows) => {
            if (error) {
                return callback(error);
            }

            callback(error, rows.map(row => {
                return CodeValues.externalizeCodeValue(row);
            }));
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
                        name: row.categoryName,
                        subCategories: []
                    }
                }
                accum[row.categoryId].subCategories.push({
                    value: row.subCategoryId,
                    name: row.subCategoryName
                })
                return accum;
            }, {});

            callback(error, Object.values(reducedRows));
        });
    }
}

export default new CodeValues();