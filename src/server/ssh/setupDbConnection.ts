const config = require('config');
const mysql = require('mysql');


const MYSQL_CONNECTION_LIMIT = 100;

// const MYSQL_HOST = config.get('mysql.host');
// const MYSQL_PORT = config.get('mysql.port');
// const MYSQL_DATABASE = config.get('mysql.database');
// const MYSQL_USER = config.get('mysql.user');
// const MYSQL_PASSWORD = config.get('mysql.password');

const MYSQL_HOST = config.get('dbClone.host');
const MYSQL_PORT = config.get('dbClone.port');
const MYSQL_DATABASE = config.get('dbClone.database');
const MYSQL_USER = config.get('dbClone.user');
const MYSQL_PASSWORD = config.get('dbClone.password');


import {executeQuery} from '../database/DBHelper'

export function setupDbConnectionPool(stream) {

	const dbConfig = {
        connectionLimit: MYSQL_CONNECTION_LIMIT,

        host: MYSQL_HOST,
        port: MYSQL_PORT,
        database: MYSQL_DATABASE,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
    };

    if (stream) {
		dbConfig.stream = stream;
	}

	const pool = mysql.createPool(dbConfig);

	console.log('Connected to db');

	global.pool = pool

}

