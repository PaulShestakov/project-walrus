import BaseCRUD from "../BaseCRUD";
import {executeQuery} from "../../database/DBHelper";
import codeValuesSQL from './sql';
import Util from "../../util/Util";

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
                label: row.NAME,
                sort: row.SORT,
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

    public getAnimals(callback) {
        function mapAnimal(animal) {
            return {
                value: animal.animalId,
                label: animal.animalName,
                sort: animal.animalSort
            }
        }
        function mapBreed (breed) {
            return {
                value: breed.breedId,
                label: breed.breedName,
                sort: breed.breedSort
            }
        }
        executeQuery(codeValuesSQL.GET_ANIMALS, [], (error, rows) => {
            if (error) {
                return callback(error);
            }
            const shape = {
                name: 'animals',
                idName: 'animalId',
                map: mapAnimal,
                children: [
                    {
                        name: 'breeds',
                        idName: 'breedId',
                        map: mapBreed
                    }
                ]
            };
            const animals = Util.reduceFlatData(rows, shape).animals;
            callback(null, Util.ensureArray(animals));
        });
    }

    mapCountry = (item) => ({
		value: item.countryId,
        label: item.countryName,
        sort: item.countrySort,
    });
    
    mapCity = (item) => ({
		value: item.cityId,
        label: item.cityName,
        sort: item.citySort,
    });
    
    mapSubCity = (item) => ({
		value: item.subCityId,
        label: item.subCityName,
        sort: item.subCitySort,
    });
    
    mapSubway = (item) => ({
		value: item.citySubwayId,
        label: item.citySubwayName,
        sort: item.citySubwaySort,
    });

    public getCountries(callback) {
        executeQuery(codeValuesSQL.GET_COUNTIRES, [], (error, rows) => {
            if (error) {
                return callback(error);
            }
            const shape = {
                name: 'countries',
                idName: 'countryId',
                map: this.mapCountry,
                children: [
                    {
                        name: 'cities',
                        idName: 'cityId',
                        map: this.mapCity,
                        children: [
							{
								name: 'subCities',
								idName: 'subCityId',
								map: this.mapSubCity
							},
							{
								name: 'subways',
								idName: 'citySubwayId',
								map: this.mapSubway
							}
						]
                    }
                ]
            };
    
            callback(null, Util.reduceFlatData(rows, shape).countries);
        });        
    }
}

export default new CodeValues();