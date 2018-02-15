'use strict';
import bcrypt from 'bcrypt';
import logger from '../../logging/logger';
const saltRounds = 3;

module.exports = (router, db) => {

  const Op = db.Sequelize.Op;
  // GET all subjects
  router.get('/subjects', (req, res) => {
    logger(3, 'Get all subjects.');

    db.subject.findAll({
    })
    .then(subjects => {
      if (!subjects) {
        res.status(404).json({ message: 'Resource not found.' });
      } else {
        res.status(200).json(subjects);
      }
    })
    .catch(err => {
      logger(0, err);
      res.status(500).json({ message: 'Unsuccessful, Please try again.' });
    });
  });
};
