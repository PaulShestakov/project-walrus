const Client = require('ssh2').Client;
const ssh = new Client();
const config = require('config');

const SSH_HOST = config.get('ssh.host');
const SSH_PORT = 22;
const SSH_USERNAME = config.get('ssh.username');
const SSH_PASSWORD = config.get('ssh.password');


export const setupSshConnectionPromise = new Promise(function(resolve, reject) {
	ssh.on('ready', function() {
		ssh.forwardOut(
			// source address, this can usually be any valid address
			'127.0.0.1',
			// source port, this can be any valid port number
			3307,
			// destination address (localhost here refers to the SSH server)
			'127.0.0.1',
			// destination port
			3306,
			function (err, stream) {
				if (err) {
					reject(err); // SSH error: can also send error in promise ex. reject(err)
				}

				console.log('Ssh tunnel is configured');
				resolve(stream);
			});
	}).connect({
		host: SSH_HOST,
		port: SSH_PORT,
		username: SSH_USERNAME,
		password: SSH_PASSWORD
	});
});



