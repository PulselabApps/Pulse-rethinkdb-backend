import { Router } from 'express';
import expressListRoutes from 'express-list-routes';
import Institution from '../../models/Institution';
import PulseClass from '../../models/PulseClass';
import Teacher from '../../models/Teacher';
import Student from '../../models/Student';
import { thinky } from '../../db';
export default function() {
  var v1 = Router();

  var r = thinky.r;


  /**
   * @apiDefine InstitutionGroup Institution endpoints
   *
   * API endpoints that involve interacting with the root institution
   * object.
   */

  /**
   * @api {GET} /api/v1/institutions Get All Institutions
   * @apiGroup InstitutionGroup
   * @apiName GetInstitutions
   * @apiDescription Retrieves all institutions registered in the
   * database. Information is based on access level. I.E. Public-read
   * only will see only institution names. 
   */
  v1.get('/institutions', (req, res) => {
    Institution.run().then( result => {
      res.json(result);
    });
  });

  /**
   * @api {GET} /api/v1/institution/:id Get Institution By ID
   * @apiGroup InstitutionGroup
   * @apiParam {String} id ObjectID of institution you want to
   * retrieve.
   * @apiName GetInstitutionByID
   */
  v1.get('/institution/:id', (req, res) => {
    var id = req.params.id;
    Institution.get(id).run().then( result => {
      res.json(result);
    });
  });

  /**
   * @api {GET} /api/v1/institution/:id/classes Get Classes Of Institution
   * @apiGroup InstitutionGroup
   * @apiParam {String} id ObjectID of The Institution you want to retrieve classes from.
   * @apiName GetInstitutionClasses
   */
  v1.get('/institution/:id/classes', (req, res) => {
    var id = req.params.id;
    Institution.get(id).run().then( institution => {
      var instClasses = institution.classes;
      console.log(instClasses);
      PulseClass.getAll(r.args(instClasses)).run().then( result => {
        res.json(result);
      });
    });
  });

  /**
   * @api {GET} /api/v1/institution/:id/students Get Students Of Institution
   * @apiGroup InstitutionGroup
   * @apiParam {String} id ObjectID of The Institution you want to retrieve Students from.
   * @apiName GetInstitutionStudents
   */
  v1.get('/institution/:id/students', (req, res) => {
    var id = req.params.id;
    Institution.get(id).run().then( institution => {
      var instStudents = institution.students;
      console.log(instStudents);
      Student.getAll(r.args(instStudents)).run().then( result => {
        res.json(result.map( d => {
          return Object.assign({}, d, { password: ''});
        }));
      });
    });
  });

  /**
   * @api {GET} /api/v1/institution/:id/teachers Get Teachers Of Institution
   * @apiGroup InstitutionGroup
   * @apiParam {String} id ObjectID of The Institution you want to retrieve Teachers from.
   * @apiName GetInstitutionTeachers
   */
  v1.get('/institution/:id/teachers', (req, res) => {
    var id = req.params.id;
    Institution.get(id).run().then( institution => {
      var instTeachers = institution.teachers;
      console.log(instTeachers);
      Teacher.getAll(r.args(instTeachers)).run().then( result => {
        res.json(result.map( d => {
          return Object.assign({}, d, { password: ''});
        }));
      });
    });
  });

  v1.get('/classes', (req, res) => {
    PulseClass.run().then( result => {
      res.json(result);
    });
  });


  v1.get('/', (req, res) => {
    res.json({
      'version': 1
    });
  });

  return v1;
}
