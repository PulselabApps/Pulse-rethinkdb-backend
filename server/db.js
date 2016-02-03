import Thinky from 'thinky';

export const thinky = Thinky({
  // host: process.env.DB_HOST,
  // port: process.env.DB_PORT,
  host: '172.17.0.2',
  db: 'pulse_beta'
});

export default function(callback) {
	// connect to a database if needed
  callback();
}
