'use strict';
import bcrypt from 'bcrypt';
import logger from '../../logging/logger';
const saltRounds = 3;

module.exports = (router, db) => {

  const Op = db.Sequelize.Op;
  // GET all states
  router.get('/states', (req, res) => {
    logger(3, 'Get all states.');

    db.state.findAll({
    })
    .then(states => {
      if (!states) {
        res.status(404).json({ message: 'Resource not found.' });
      } else {
        res.status(200).json(states);
      }
    })
    .catch(err => {
      logger(0, err);
      res.status(500).json({ message: 'Unsuccessful, Please try again.' });
    });
  });
};
