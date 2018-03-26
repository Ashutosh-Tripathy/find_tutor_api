'use strict';
import bcrypt from 'bcrypt';
import logger from '../../logging/logger';
const saltRounds = 3;

module.exports = (router, db) => {

  const Op = db.Sequelize.Op;

  // GET one app_user by id
  router.get('/app_user/:id', (req, res) => {
    const id = req.params.id;
    logger(3, `Get app_user: ${id}`);

    db.app_user.findOne({
      where: { id: { [Op.eq]: id } },
      attributes: { exclude: ['password'] }
    })
    .then(app_user => {
      if (!app_user) {
        res.status(404).json({ message: 'Resource not found.' });
      } else {
        app_user.password = '';
        res.status(200).json(app_user);
      }
    })
    .catch(err => {
      logger(0, err);
      res.status(500).json({ message: 'Unsuccessful, Please try again.' });
    });
  });

  // POST single app_user
  router.post('/app_user', (req, res) => {
    var { email, password, name, mobile, type } = req.query;
    var mobile = parseInt(mobile);
    logger(2, `Post app_user: ${email}, name: ${name}`);
    const textpassword = password;
    bcrypt.hash(textpassword, saltRounds)
      .then(password => {
        db.app_user.create({ email, password, name, mobile, type })
          .then(new_app_user => {
            new_app_user.password = '';
            res.status(200).json(new_app_user);
          })
        .catch(err => {
          logger(0, err);
          res.status(500).json({ message: 'Unsuccessful, Please try again.' });
        });
      })
    .catch(err => {
      logger(0, err);
      res.status(500).json({ message: 'Unsuccessful, Please try again.' });
    });
  });


  // Put app_user
  router.put('/app_user', (req, res) => {
    res.status(200).json({ message: 'Functionality not yet implimented' });
  });

  // Verify email
  router.post('/verifyEmail', (req, res) => {
    res.status(200).json({ message: 'Functionality not yet implimented' });
  });


  // Search tutor
  router.get('/searchTutor', (req, res) => {
    let queryObj = {'is_hidden': false};
    //const {subject_id, state_id, district_id} = req.query;
    const subject_id = parseInt(req.query.subject_id), state_id = parseInt(req.query.state_id), district_id = parseInt(req.query.district_id);
    logger(3, `searchTutor, subject_id: ${subject_id}`);

    if(!subject_id) {
      return res.status(400).json({message: 'Missing/invalid query parameter.'});
    }

    queryObj['subject_id'] = subject_id;
    if(state_id) {
      queryObj['state_id'] = state_id;
    }
    if(district_id) {
      queryObj['district_id'] = district_id;
    }

    db.app_user.findAll({
      attributes: ['id', 'name'],
      include: [{model: db.tutor, as: '',  attributes:['gender', 'min_rate', 'max_rate', 'summary', 'subject_id', 'about_me'], where: queryObj, required: true}]
    })
    .then(tutors => {
      if (!tutors) {
        res.status(404).json({ message: 'Resource not found.' });
      } else {
        let result = flattenArray(JSON.parse(JSON.stringify(tutors)));
        res.status(200).json(result);
      }
    })
    .catch(err => {
      logger(0, err);
      res.status(500).json({ message: 'Unsuccessful, Please try again.' });
    });
  });

  // get tutor
  router.get('/getTutor/:id', (req, res) => {
    const id = req.params.id;
    logger(3, `getTutor: ${id}`);

    db.app_user.findOne({
      where: { id: { [Op.eq]: id } },
      attributes: ['id', 'name'],
      include: [{model: db.tutor, attributes:['gender', 'min_rate', 'max_rate', 'summary', 'subject_id', 'about_me'], required: true}]
    })
    .then(tutor => {
      if (!tutor) {
        res.status(404).json({ message: 'Resource not found.' });
      } else {
        res.status(200).json(tutor);
      }
    })
    .catch(err => {
      logger(0, err);
      res.status(500).json({ message: 'Unsuccessful, Please try again.' });
    });
  });


  // get tutor detail
  router.get('/getTutorDetail/:id', (req, res) => {
    const id = req.params.id;
    logger(3, `getTutorDetail: ${id}`);

    db.app_user.findOne({
      where: { id: { [Op.eq]: id } },
      attributes: ['id', 'email', 'mobile'],
      include: [{model: db.tutor, attributes: ['about_session', 'qualification', 'availability', 'state_id', 'district_id', 'comment'], required: true}]
    })
    .then(tutorDetail => {
      if (!tutorDetail) {
        res.status(404).json({ message: 'Resource not found.' });
      } else {
        let result = flattenObject(JSON.parse(JSON.stringify(tutorDetail)), 0);
        res.status(200).json(result);
      }
    })
    .catch(err => {
      logger(0, err);
      res.status(500).json({ message: 'Unsuccessful, Please try again.' });
    });
  });
};


var flattenObject = function(ob, depth, maxDepth = 1) {
  let toReturn = {};

  for (let i in ob) {
    if (!ob.hasOwnProperty(i)) continue;

    if ((typeof ob[i]) == 'object') {
      if (depth < maxDepth) {
        let flatObject = flattenObject(ob[i], depth + 1);
        for (let x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) continue;

          toReturn[x] = flatObject[x];
        }}
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
};

var flattenArray = (arr) => {
  let toReturn = [];
  for (let item of arr){
    toReturn.push(flattenObject(item, 0));
  }
  return toReturn;
}

