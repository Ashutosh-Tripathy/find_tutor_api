'use strict';
import bcrypt from 'bcrypt';
import logger from '../../logging/logger';
const saltRounds = 2;

module.exports = (router, db) => {

    // GET all users
    router.get('/users', (req, res) => {
        logger(2, `Token: ${req.headers['x-access-token']}`);
        db.users.findAll()
            .then(users => {
                users.map(user => user.password = '');
                res.status(200).json(users);
            })
            .catch(err => {
                logger(0, err);
                res.status(500).json({ message: 'Unsuccessful, Please try again.' });
            });
    });

    // GET one user by id
    router.get('/user/:id', (req, res) => {
        const id = req.params.id;
        logger(2, `Get user: ${id}`);
        db.users.find({
            where: { id: id }
            //attributes: { exclude: ['password'] }
        })
            .then(user => {
                if (!user) {
                    res.status(404).json({ message: 'resource not found' });
                } else {
                    user.password = '';
                    res.status(200).json(user);
                }
            })
            .catch(err => {
                logger(0, err);
                res.status(500).json({ message: 'Unsuccessful, Please try again.' });
            });
    });

    // POST single user
    router.post('/user', (req, res) => {
        const id = req.body.id;
        const name = req.body.name;
        const textpassword = req.body.password;
        const role = req.body.role;
        logger(2, `Patch user: ${id}, name: ${name}, password: ${textpassword}, role: ${role}`);

        bcrypt.hash(textpassword, saltRounds)
            .then(password => {
                db.users.create({ name, password, role })
                    .then(newuser => {
                        newuser.password = '';
                        res.status(200).json(newuser);
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

    // PATCH single user
    router.patch('/user/:id', (req, res) => {
        const id = req.params.id;
        const name = req.body.name;
        const textpassword = req.body.password;
        const role = req.body.role;
        logger(2, `Patch user: ${id}, name: ${name}, password: ${textpassword}, role: ${role}`);
        logger(2, req.body);
        if (textpassword) {
            bcrypt.hash(textpassword, saltRounds)
                .then(password => {
                    db.users.update({ name, password, role }, { where: { id: id } })
                        .then(updatedUser => {
                            updatedUser.password = '';
                            res.status(200).json(updatedUser);
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
        } else {
            db.users.update({ name, role }, { where: { id: id } })
                .then(updatedUser => {
                    updatedUser.password = '';
                    res.status(200).json(updatedUser);
                })
                .catch(err => {
                    logger(0, err);
                    res.status(500).json({ message: 'Unsuccessful, Please try again.' });
                });
        }

    });

    // DELETE single user
    router.delete('/user/:id', (req, res) => {
        const id = req.params.id;
        logger(2, `Delete user: ${id}`);
        db.users.destroy({
            where: { id: id }
        })
            .then(deleteduser => {
                res.status(200).json(deleteduser);
            })
            .catch(err => {
                logger(0, err);
                res.status(500).json({ message: 'Unsuccessful, Please try again.' });
            });
    });
};
