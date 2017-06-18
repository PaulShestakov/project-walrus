'use strict';

const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;

app.use(express.static(path.join(__dirname, './../../dist')));

app.get('*', function(request, response) {
    response.sendFile(path.join(__dirname, './../../dist', 'index.html'));
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);