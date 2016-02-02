import { thinky } from '../db';

var type = thinky.type;

var Institution = thinky.createModel('Institution', {
  id: type.string(),
  name: type.string(),
  classes: [type.string()],
  students: [type.string()],
  teachers: [type.string()]
});

export default Institution;
