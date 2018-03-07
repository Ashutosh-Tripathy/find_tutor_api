'use strict';
import bcrypt from 'bcrypt';
import logger from '../../logging/logger';
const saltRounds = 3;

module.exports = (router, db) => {

  const Op = db.Sequelize.Op;
  // GET one tutor by id
  router.get('/tutor/:id', (req, res) => {
    const id = req.params.id;
    logger(3, `Get tutor: ${id}`);

    db.tutor.findOne({
      where: { id: { [Op.eq]: id } },
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

  // POST single tutor
  router.post('/tutor', (req, res) => {
    const {id, gender, min_rate, max_rate, summary, subject_id, about_me, about_session, qualification, availability, state_id, district_id, comment} = req.body;
    logger(2, `Post tutor: ${id}, subject_id: ${subject_id}`);
    db.tutor.create({id, gender, min_rate, max_rate, summary, subject_id, about_me, about_session, qualification, availability, state_id, district_id, comment })
      .then(new_tutor => {
        new_tutor.password = '';
        res.status(200).json(new_tutor);
      })
    .catch(err => {
      logger(0, err);
      res.status(500).json({ message: 'Unsuccessful, Please try again.' });
    });
  });


  // Put tutor
  router.patch('/tutor', (req, res) => {
    const id = req.params.id;
    const {gender, min_rate, max_rate, summary, subject_id, about_me, about_session, qualification, avalability, state_id, district_id, comment} = req.body;
    const updates = req.body;
    db.tutor.find({
      where: { id: { [Op.eq]: id } }
    })
    .then(tutor => {
      if (!tutor) return res.status(404).json({ message: 'Resource not found.' }); 
      return tutor.updateAttributes({gender, min_rate, max_rate, summary, subject_id, about_me, about_session, qualification, avalability, state_id, district_id, comment})
    })
    .then(updatedtutor => {
      res.status(200).json(updatedtutor);
    })
    .catch(err => {
      logger(0, err);
      res.status(500).json({ message: 'Unsuccessful, Please try again.' });
    });
  });
};
