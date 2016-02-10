import { Router } from 'express';
import expressListRoutes from 'express-list-routes';
import Institution from '../../models/Institution';
import PulseClass from '../../models/PulseClass';
import Teacher from '../../models/Teacher';
import Student from '../../models/Student';
import { thinky } from '../../db';
import v1Inst from './institutionAPI';
import v1Class from './pulseClassAPI';
import jwt from 'jsonwebtoken';

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

  v1.post('/studentLogin', (req, res) => {
    console.log(req.body.email);
    Student.filter({'email': req.body.email, 'password': req.body.password}).run().then( result => {
        if(!result) { 
            res.json({success: false, message: 'No user found'});
        } else {
            var user = result[0];
            var token = jwt.sign(user, req.app.get('jsonTokenSecret'), {
                expiresIn: 86400
        	    });
            res.json({
                success: true,
                token: token,
                user: Object.assign({}, user, { password: ''})
            });
        }
    });
  });
  
  v1.use((req, res, next) => {
      var token = req.body.token || req.query.token || req.headers['x-access-token'];
      
      if(token) {
      jwt.verify(token, req.app.get('jsonTokenSecret'), (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            code: 1003,
            message: 'Failed to authentication token'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });
    }
  });

  v1.use('/institution', v1Inst());

  v1.use('/class', v1Class());

  v1.get('/', (req, res) => {
    res.json({
      'version': 1
    });
  });

  return v1;
}
