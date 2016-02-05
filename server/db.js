import Thinky from 'thinky';
import url from 'url';

var connectionString = process.env.RETHINKDB_URL || 'http://localhost:28015';
var parser = url.parse(connectionString);
console.log(parser.hostname);
console.log(parser.port);

export const thinky = Thinky({
  host: parser.hostname,
  port: parser.port,
  db: 'pulse_beta'
});

export default function(callback) {
	// connect to a database if needed
  callback();
}
