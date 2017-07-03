import * as mysql from 'mysql';

const pool = mysql.createPool({
    connectionLimit : 100, //important
    host     :  process.env.DATABASE_HOST || '127.0.0.1',
    port     :  process.env.PORT || 3306,
    user     : 'wikipetsdev',
    password : 'RBxKVaMJDjbYCSvf',
    database : 'wikipet',
    debug    :  false
});

pool.getConnection(function(err, connection) {
   console.log(!err ? "DB is connected" : "DB is not connected " + err);
});

export default pool;