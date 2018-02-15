'use strict';
import bcrypt from 'bcrypt';
import logger from '../../logging/logger';
const saltRounds = 3;

module.exports = (router, db) => {
  const Op = db.Sequelize.Op;
  // GET all districts
  router.get('/districts/:id', (req, res) => {
    const id = req.params.id;
    logger(3, `Get all district: ${id}`);

    db.district.findAll({
      where: {state_id: {[Op.eq]: id }}
    })
    .then(districts => {
      if (!districts) {
        res.status(404).json({ message: 'Resource not found.' });
      } else {
        res.status(200).json(districts);
      }
    })
    .catch(err => {
      logger(0, err);
      res.status(500).json({ message: 'Unsuccessful, Please try again.' });
    });
  });
};
