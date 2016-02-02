import Thinky from 'thinky';

export const thinky = Thinky({
  db: 'pulse_beta'
});

export default function(callback) {
	// connect to a database if needed
  callback();
}
