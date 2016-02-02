import { thinky } from '../db';

var type = thinky.type;

var ClassSession = thinky.createModel('ClassSession', {
  id: type.string(),
  name: type.string(),
  questions: [type.string()],
  studentScores: [type.string()],
  isActive: type.boolean()
});

export default ClassSession;
