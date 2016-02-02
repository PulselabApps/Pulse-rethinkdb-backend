import { thinky } from '../db';

var type = thinky.type;

var PulseClass = thinky.createModel('Class', {
  id: type.string(),
  name: type.string(),
  teachers: [type.string()],
  students: [type.string()],
  classSessions: [type.string()],
  isActive: type.boolean()
});

export default PulseClass;

