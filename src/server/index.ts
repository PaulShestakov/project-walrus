import * as fs from 'fs'
import * as http from 'http';
import * as https from 'https';
import * as path from 'path';
import App from './App';


import { setupSshConnectionPromise } from './ssh/setupSshConnection';
import { setupDbConnectionPool } from './ssh/setupDbConnection';

const PORT = 3000;

// const privateKey  = fs.readFileSync(path.resolve(__dirname,'../../config/server.key'), 'utf8');
// const certificate = fs.readFileSync(path.resolve(__dirname,'../../config/server.crt'), 'utf8');

// const credentials = {key: privateKey, cert: certificate};


// setupSshConnectionPromise
//     .then(stream => {
        const pool = setupDbConnectionPool();


        const app = new App().app;

        const httpServer = http.createServer(app);

        httpServer.listen(PORT);

        console.log(`Server started listening on port ${PORT}`);
    // });
