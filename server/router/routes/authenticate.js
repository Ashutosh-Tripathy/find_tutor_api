'use strict';
import logger from '../../logging/logger';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET } from '../../config/env';

const saltRounds = 3;

module.exports = (router, db) => {

  const Op = db.Sequelize.Op;
  // Post authenticate
  router.post('/authenticate', (req, res) => {
    logger(2, `Authenticate app_user: ${req.body.email}`);
    db.app_user.findOne({ where: { email: { [Op.eq]: req.body.email } } })
      .then(app_user => {
        if (!app_user) {
          res.status(400).json({ success: false, message: 'Invalid email/password.' });
        } else if (app_user) {

          bcrypt.compare(req.body.password, app_user.password)
            .then(response => {
              if (!response) {
                res.status(400).json({ success: false, message: 'Invalid email/password.' });
              }
              else {
                // if app_user is found and password is right
                // create a token with only our given payload
                // we don't want to pass in the entire app_user since that has the password

                const payload = {
                  id: app_user.id,
                  type: app_user.type
                };
                logger(4, `Payload: ${JSON.stringify(payload)}`);
                var token = jwt.sign(payload, SECRET, {
                  expiresIn: 20 * 12 * 30 * 24 * 60 * 60 // expires in 24 hours
                });

                delete app_user.password;
                // return the information including token as JSON
                res.status(200).json({
                  success: true,
                  token, app_user
                });
              }
            })
          .catch(err => {
            logger(0, err);
            res.status(500).json({ message: 'Unsuccessful, Please try again.' });
          });
        }
      })
    .catch(err => {
      logger(0, err);
      res.status(500).json({ message: 'Unsuccessful, Please try again.' });
    });
  });
};


