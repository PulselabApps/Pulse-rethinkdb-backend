import { Router } from 'express';
import expressListRoutes from 'express-list-routes';
import Institution from '../../models/Institution';
import PulseClass from '../../models/PulseClass';
import Teacher from '../../models/Teacher';
import Student from '../../models/Student';
import ClassSession from '../../models/ClassSession';
import { thinky } from '../../db';

export default function() {
  var v1Class = Router();

  var r = thinky.r;

  /**
   * @apiDefine ClassGroup Class endpoints
   *
   * API endpoints that involve interacting with the Class
   * object.
   */

  /**
   * @api {GET} /api/v1/class/:id Get Class with id
   * @apiGroup ClassGroup
   * @apiParam {String} id ObjectID of The Class you want to retrieve.
   * @apiName GetClassWithId
   */
  v1Class.get('/:id', (req, res) => {
    var id = req.params.id;
    PulseClass.get(id).run().then( result => {
      return res.json(result);
    });
  });

  /**
   * @api {GET} /api/v1/class/:id/students Get Students in Class
   * @apiGroup ClassGroup
   * @apiParam {String} id ObjectID of The Class.
   * @apiName GetClassStudents
   */
  v1Class.get('/:id/students', (req, res) => {
    var id = req.params.id;
    PulseClass.get(id).run().then ( pulseClass => {
      var studentIds = pulseClass.students;
      Students.getAll(r.args(studentIds)).run().then( result => {
        res.son(result.map ( d => {
          return Object.assign({}, d, { password: '' });
        }));
      });
    });
  });

  /**
   * @api {GET} /api/v1/class/:id/teachers Get Teachers in Class
   * @apiGroup ClassGroup
   * @apiParam {String} id ObjectID of The Class.
   * @apiName GetClassTeachers
   */
  v1Class.get('/:id/teachers', (req, res) => {

  });

  /**
   * @api {GET} /api/v1/class/:id/sessions Get ClassSessions for Class
   * @apiGroup ClassGroup
   * @apiParam {String} id ObjectID of The Class.
   * @apiName GetClassSessionsForClass
   */
  v1Class.get('/:id/sessions', (req, res) => {

  });

  /**
   * @api {POST} /api/v1/class/:id/sessions Create ClassSession For Class
   * @apiGroup ClassGroup
   * @apiParam {String} id ObjectID of The Class.
   * @apiParam {String} name Name/Label for Class Session. (Preferable a label describing content of class)
   * @apiParam {Boolean} isActive Whether or not Session is Active. Defaults to true if not specified in post parameters
   * @apiName CreateClassSessionForClass
   */
  v1Class.post('/:id/sessions', (req, res) => {

  });

  return v1Class;
}
