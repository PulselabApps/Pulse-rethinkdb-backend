import { thinky } from '../db';

var type = thinky.type;

// IMPORTANT!!!!!
// Right now passwords' aren't hashed. Will be changed
// but sample data is more important right this second then
// hashes

// r.db('pulse_beta').table('Student').insert({
//   email: 'max@pulselab.io',
//   password: 'password',
//   firstName: 'Max',
//   lastName: 'Marze',
//   studentScores: []
// })

var Student = thinky.createModel('Student', {
  id: type.string(),
  email: type.string().email(),
  password: type.string(),
  firstName: type.string(),
  lastName: type.string(),
  studentScores: [type.string()]
});

export default Student;
