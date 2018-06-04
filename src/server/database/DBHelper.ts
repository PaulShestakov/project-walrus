import * as mysql from 'mysql';
import * as async from 'async';
import * as config from 'config';
import log from "../util/Logger";

// const MYSQL_CONNECTION_LIMIT = 100;
//
// const MYSQL_HOST = config.get('mysql.host');
// const MYSQL_PORT = config.get('mysql.port');
// const MYSQL_DATABASE = config.get('mysql.database');
// const MYSQL_USER = config.get('mysql.user');
// const MYSQL_PASSWORD = config.get('mysql.password');
//
//
// const pool = mysql.createPool({
// 	connectionLimit: MYSQL_CONNECTION_LIMIT,
//
// 	host: MYSQL_HOST,
// 	port: MYSQL_PORT,
//     database: MYSQL_DATABASE,
// 	user: MYSQL_USER,
// 	password: MYSQL_PASSWORD,
// });
//
//
// // Test connection
// pool.getConnection(function(err, connection) {
// 	if (!err) {
// 		log.info('DB is connected');
// 	} else {
// 		console.log('DB is not connected, error : ' + err);
// 	}
// 	connection.release();
// });


const _performInTransaction = (functionToPerform, callback) => {

	global.pool.getConnection(function (err, connection) {
		if (err) {
			console.log(err);
			callback(err);
			return;
		}

		connection.beginTransaction(function(transactionError) {

			if (transactionError) {
				connection.rollback(function(rollbackError) {
					connection.release();
					// We'll loose transaction error in case rollback also fires error
					callback(rollbackError || transactionError);
				});
				return;
			}

			functionToPerform(connection, callback);
		});
	});
};


const executeQuery = (query, params, callback) => {

	function transactionContent(connection, callback) {
		connection.query(query, params, (queryError, result) => {
			if (queryError) {
				connection.rollback(function (rollbackError) {
					connection.release();
					// We'll loose query error in case rollback also fires error
					callback(rollbackError || queryError);
				});
				return;
			}

			connection.commit(function (commitError) {
				if (commitError) {
					connection.rollback(function (rollbackError) {
						connection.release();
						// We'll loose commit error in case rollback also fires error
						callback(rollbackError || commitError);
					});
					return;
				}

				connection.release();
				callback(null, result);
			});
		});
	}

	_performInTransaction(transactionContent, callback);
};


const _executeFunctions = (asyncMethod, functions, callback) => {

	function transactionContent(connection, callback) {

		functions = functions.map((func) => func.bind(null, connection));

		async[asyncMethod](functions, function(seriesError, result) {
			if (seriesError) {
				connection.rollback(function(rollbackError) {
					connection.release();
					callback(rollbackError || seriesError);
				});
				return;
			}

			connection.commit(function(commitError) {
				if (commitError) {
					connection.rollback(function(rollbackError) {
						connection.release();
						// We'll loose commit error in case rollback also fires error
						callback(rollbackError || commitError);
					});
					return;
				}

				connection.release();
				callback(null, result);
			});
		});
	}

	_performInTransaction(transactionContent, callback);
};


const executeSeries = _executeFunctions.bind(null, 'series');
const executeParallel = _executeFunctions.bind(null, 'parallel');


export { executeQuery, executeSeries, executeParallel, global.pool as pool };
