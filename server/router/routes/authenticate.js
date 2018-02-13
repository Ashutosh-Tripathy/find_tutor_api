'use strict';
import logger from '../../logging/logger';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET } from '../../config/env';

const saltRounds = 2;

module.exports = (router, db) => {
    // Post authenticate
    router.post('/authenticate', (req, res) => {
        logger(2, `Authenticate user: ${req.body.username}`);
        db.users.findOne({ where: { name: req.body.username } })
            .then(user => {
                if (!user) {
                    res.status(400).json({ success: false, message: 'Invalid username/password.' });
                } else if (user) {

                    bcrypt.compare(req.body.password, user.password)
                        .then(response => {
                            if (!response) {
                                res.status(400).json({ success: false, message: 'Invalid username/password.' });
                            }
                            else {
                                // if user is found and password is right
                                // create a token with only our given payload
                                // we don't want to pass in the entire user since that has the password

                                const payload = {
                                    id: user.id,
                                    role: user.role
                                };
                                logger(4, `Payload: ${JSON.stringify(payload)}`);
                                var token = jwt.sign(payload, SECRET, {
                                    expiresIn: 30 * 24 * 60 * 60 // expires in 24 hours
                                });
                                user.password = '';
                                // return the information including token as JSON
                                res.status(200).json({
                                    success: true,
                                    token: token,
                                    user: user
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


