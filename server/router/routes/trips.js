'use strict';
import logger from '../../logging/logger';

module.exports = (router, db) => {

    // GET all trips
    router.get('/trips', (req, res) => {
        let condition = req.role == 'admin' ? {} : { user_id: req.userId };
        db.trips.findAll({
            where: condition
        })
            .then(trips => {
                res.status(200).json(trips);
            })
            .catch(err => {
                logger(0, err);
                res.status(500).json({ message: 'Unsuccessful, Please try again.' });
            });
    });

    // GET one trip by id
    router.get('/trip/:id', (req, res) => {
        const id = req.params.id;
        logger(2, `Get trip: ${id}`);
        logger(2, `Token: ${req.headers['x-access-token']}`);
        let condition = req.role == 'admin' ? { id: id } : { id: id, user_id: req.userId };
        db.trips.find({
            where: condition
        })
            .then(trip => {
                if (!trip) return res.status(403).json({ message: "Forbidden" });
                res.status(200).json(trip);
            })
            .catch(err => {
                logger(0, err);
                res.status(500).json({ message: 'Unsuccessful, Please try again.' });
            });
    });

    // POST single trip
    router.post('/trip', (req, res) => {
        const {destination, startdate, enddate, user_id } = req.body;
//        const user_id = req.role == 'admin' ? req.body.user_id : req.userId;
        db.trips.create({
            destination, startdate, enddate, user_id
        })
            .then(newtrip => {
                res.status(200).json(newtrip);
            })
            .catch(err => {
                logger(0, err);
                res.status(500).json({ message: 'Unsuccessful, Please try again.' });
            });
    });

    // PATCH single trip
    router.patch('/trip/:id', (req, res) => {
        const id = req.params.id;
        const updates = req.body;
        let condition = req.role == 'admin' ? { id: id } : { id: id, user_id: req.userId };
        db.trips.find({
            where: condition
        })
            .then(trip => {
                if (!trip) return res.status(403).json({ message: "Forbidden" });
                return trip.updateAttributes(updates)
            })
            .then(updatedtrip => {
                res.status(200).json(updatedtrip);
            })
            .catch(err => {
                logger(0, err);
                res.status(500).json({ message: 'Unsuccessful, Please try again.' });
            });
    });

    // DELETE single trip
    router.delete('/trip/:id', (req, res) => {
        const id = req.params.id;
        let condition = req.role == 'admin' ? { id: id } : { id: id, user_id: req.userId };
        db.trips.destroy({
            where: condition
        })
            .then(deletedtrip => {
                if (!deletedtrip) return res.status(403).json({ message: "Forbidden" });
                res.status(200).json(deletedtrip);
            })
            .catch(err => {
                logger(0, err);
                res.status(500).json({ message: 'Unsuccessful, Please try again.' });
            });
    });
};
