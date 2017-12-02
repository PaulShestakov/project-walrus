import Queries from './sql/Queries';
import uuid from 'uuid';
import * as async from 'async';

export default class Extensions {

    static mapDrugs = (item) => ({
        uuid: item.drugUuid,
        id: item.drugId,
        name: item.drugName
    });

    static mapServices = (item) => ({
        uuid: item.serviceUuid,
        id: item.serviceId,
        name: item.serviceName
    });

    static mapTrades = (item) => ({
        uuid: item.tradeUuid,
        id: item.tradeId,
        name: item.tradeName
    });

    static saveManyToMany(ids, companyId, query) {
        return (connection, done) => {
            if (ids && ids.length > 0) {
                connection.query(query, [ids.map(id => ([uuid(), companyId, id]))], done);
            } else {
                done(null, null);
            }
        };
    }

    static updateExtensions(extensions, companyId) {
        
        // let internalizedExtenstions = [];
        // if (extensions) {
        //     internalizedExtenstions = animals.map(animal => {
        //         return Animals.internalizeCompanyAnimal(animal, companyId);
        //     });
        // }

        // const deleteExtenstions = (connection, done) => {
        //     connection.query(Queries.DELETE_DRUGS_FOR_COMPANY, [companyId], done);
        //     connection.query(Queries.DELETE_SERVICES_FOR_COMPANY, [companyId], done);
        //     connection.query(Queries.DELETE_TRADES_FOR_COMPANY, [companyId], done);
        // };

        // const insertAnimals = (connection, done) => {
        //     if (internalizedExtenstions.length > 0) {
        //         connection.query(Queries.SAVE, [internalizedExtenstions], done);
        //     } else {
        //         done(null, null);
        //     }
        // };

        // return (connection, done) => {
        //     const tasks = [deleteExtenstions, insertAnimals].map(f => f.bind(null, connection));
        //     async.series(tasks, done);
        // };
    }

}