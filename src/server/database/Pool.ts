import * as mysql from 'mysql';
import * as config from 'config';
import log from './../logger/Logger';

const pool = mysql.createPool({
	connectionLimit : 100, //important
	host     :  process.env.DATABASE_HOST || config.get('mysql.host'),
	port     :  process.env.PORT || config.get('mysql.port'),
	user     :  config.get('mysql.user'),
	password :  config.get('mysql.password'),
	database :  config.get('mysql.db')
});

//Test connection
pool.getConnection(function(err, connection) {
	if (!err) {
		log.info('DB is connected');
		connection.query("SELECT COUNT(*) as count FROM PROMO", (err, rows) => {
			if (rows[0].count > 0) {
				log.info('test data is already inserted');
			} else {
				const data = require('./../database/promo.json');
				connection.query("INSERT INTO promo set ? ", data, (err, result) => {
					if (err) {
						log.error("Error inserting : %s +", err);
					} else {
						log.info(data.title + " inserted successfully");
					}
				});
			}
		});
	} else {
		log.warning('DB is not connected, error : ' + err);
	}
	connection.release();
});

const executeQuery = (query, params) => {
	return new Promise((resolve, reject) => {
		pool.getConnection((err,conn) => {
			try {
				conn.query(query, params, (err, rows) => {
					conn.release();
					return err ? reject(err) : resolve(rows);
				});
			} catch (e) {
				log.error('Error ' + e);
				conn.release();
				reject(e);
			}
		});
	});
};

export default executeQuery;
