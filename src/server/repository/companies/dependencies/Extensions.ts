import Queries from '../sql/Queries';
import * as uuid from 'uuid';
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

    static mapOwnerType = (item) => ({
        uuid: item.ownerTypeUuid,
        id: item.ownerTypeId,
        name: item.ownerTypeName
    });

    static mapJobType = (item) => ({
        uuid: item.jobTypeUuid,
        id: item.jobTypeId,
        name: item.jobTypeName
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

        const queries = [];

        [
            Queries.DELETE_DRUGS_FOR_COMPANY,
            Queries.DELETE_SERVICES_FOR_COMPANY,
            Queries.DELETE_TRADES_FOR_COMPANY,
            Queries.DELETE_JOB_TYPES,
            Queries.DELETE_OWNER_TYPES
        ].forEach(deleteQuery => {
            queries.push((connection, done) => {
                connection.query(deleteQuery, [companyId], done);
            });
        });

        extensions.forEach(ext => {
            queries.push(Extensions.saveManyToMany(ext.ids, companyId, ext.query));
        });

        return (connection, done) => {
            const tasks = queries.map(f => f.bind(null, connection));
            async.series(tasks, done);
        };
    }

}