import { thinky } from '../db';

var type = thinky.type;

// r.db('pulse_beta').table('Student').insert({
//   email: 'max@pulselab.io',
//   password: 'password',
//   firstName: 'Max',
//   lastName: 'Marze',
//   studentScores: []
// })

var Teacher = thinky.createModel('Teacher', {
  id: type.string(),
  email: type.string().email(),
  password: type.string(),
  firstName: type.string(),
  lastName: type.string()
});

export default Teacher;
