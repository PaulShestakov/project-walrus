import * as mysql from 'mysql';

const pool = mysql.createPool({
    connectionLimit : 100, //important
    host     : 'cp.karal.neolocation.net/PhPmYaDmIn/',
    port     : '443',
    user     : 'wikipetsdev',
    password : 'RBxKVaMJDjbYCSvf',
    database : 'wikipetsdev',
    debug    :  false
});

pool.getConnection(function(err, connection) {
   console.log(!err ? "DB is connected" : "DB is not connected " + err);
});

export default pool;