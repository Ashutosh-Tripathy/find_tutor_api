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
    const { email, password, name, mobile, type } = req.body;
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
    const {subject_id, state_id, district_id} = req.query;
    logger(3, `searchTutor, subject_id: ${subject_id}`);

    if(!subject_id) {
      return res.status(400).json({message: 'Missing query parameter.'});
    }

    queryObj['subject_id'] = subject_id;
    if(state_id) {
      queryObj['state_id'] = state_id;
    }
    if(district_id) {
      queryObj['district_id'] = district_id;
    }

    db.app_user.findAll({
      attributes: ['id'],
      include: [{model: db.tutor, attributes:['subject_id'], where: queryObj, required: true}]
    })
    .then(ids => {
      if (!ids) {
        res.status(404).json({ message: 'Resource not found.' });
      } else {
        res.status(200).json(ids);
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
        res.status(200).json(tutorDetail);
      }
    })
    .catch(err => {
      logger(0, err);
      res.status(500).json({ message: 'Unsuccessful, Please try again.' });
    });
  });
};




// with open('list.txt', 'r') as l:
// m = l.readlines()
// s = {}
// for x in m:
//   x = x.strip()
// print(x)
// id, state = x.split(",")
// s[state] = id
// n = []
// k = []
// print(s)
// print("----------------------------")
// with open('state.txt', 'r') as l:
// m = l.readlines()
// for x in m:
//   x = x.strip()
// found = False
// for state in s:
//   if state in x:
//     found = True
// n.append(x.replace("'" + state + "')", s[state] + ")"))
// if not found:
//   k.append(x)

// print(n)
// with open('state.txt', 'w') as l:
// l.writelines("\n".join(n))

// print("+++++++++++++++++++++++++++++++")
// print(k)
