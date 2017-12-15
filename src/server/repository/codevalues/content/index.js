"use strict";

var fs = require('fs');

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('codeValues.csv')
});

let i = 10;
let group = '';
lineReader.on('line', function (line) {
	let values = line.split(',');
	if (values[1] !== group) {
		i = 10;
		group = values[1];
	}
	let data = `${values[0]},${values[1]},${values[2]},${i}\r\n`;
	fs.appendFileSync("codeValues1.csv", data);
	i+= 10;
});