import * as mysql from 'mysql';
import * as config from 'config';

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
        console.log('DB is connected');
        connection.query("SELECT COUNT(*) as count FROM PROMO", (err, rows) => {
            if (rows[0].count > 0) {
                console.log('test data is already inserted');
            } else {
                const data = require('./../database/promo.json');
                connection.query("INSERT INTO promo set ? ", data, (err, result) => {
                    if (err) {
                        console.log("Error inserting : %s +", err);
                    } else {
                        console.log(data.title + " inserted successfully");
                    }
                });
            }
        });
    } else {
        console.log('DB is not connected, error : ' + err);
    }
    connection.release();
});

const getConnection = function (callback) {
    pool.getConnection((err,conn) => {
        if (err) {
            console.log('Error during to connection to database ' + err);
        } else {
            callback(conn);
        }
        conn.release();
    });
};

export default getConnection;
