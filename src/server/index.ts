import * as fs from 'fs'
import * as http from 'http';
import * as https from 'https';
import * as path from 'path';
import App from './App';

const privateKey  = fs.readFileSync(path.resolve(__dirname,'../../config/server.key'), 'utf8');
const certificate = fs.readFileSync(path.resolve(__dirname,'../../config/server.crt'), 'utf8');

const credentials = {key: privateKey, cert: certificate};

const app = new App().app;

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(3000);
httpsServer.listen(443);

console.log('Servers started listening');