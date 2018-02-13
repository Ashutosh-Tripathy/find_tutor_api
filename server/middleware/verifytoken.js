'use strict';
import logger from '../logging/logger';
import jwt from 'jsonwebtoken';
import { SECRET } from '../config/env';


var unsecured_path = ['/api/authenticate'];
function verifyToken(req, res, next) {
    logger(4, `Path: ${req.path}`);
    if (unsecured_path.indexOf(req.path) > -1) {
        logger(4, 'Unsecured path');
        next();
    } else {
        logger(4, 'Secured path');

        var token = req.headers['x-access-token'];
        logger(4, `Received token: ${token}`);
        if (!token) {
            return res.status(403).json({ auth: false, message: 'No token provided.' });
        }
        jwt.verify(token, SECRET, function (err, decoded) {
            logger(4, `Decoded message: ${JSON.stringify(decoded)}`);
            if (err)
                return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
            // if everything good, save to request for use in other routes

            req.userId = decoded.id;
            req.role = decoded.role;
            next();
        });
    }
}
export default verifyToken;
