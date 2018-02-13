'use strict';
import logger from '../logging/logger';

function authorize(req, res, next) {
    logger(2, `Role: ${req.role}`);
    logger(2, `Path: ${req.path}`);

    if (req.path.toLowerCase().startsWith('/api/trip')) {
        next();
    } else if (req.path.toLowerCase().startsWith('/api/user') && ['admin', 'manager'].indexOf(req.role) > -1) {
        next();
    }
    else if (req.path.toLowerCase().startsWith('/api/authenticate')) {
        next();
    }
    else {
        res.status(403).json({ message: "Forbidden" }); // user is forbidden
    }
}


export default authorize;

