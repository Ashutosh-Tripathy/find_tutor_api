'use strict';
import logger from '../../logging/logger';
import verifytoken from 'verifytoken';

function app_middleware(req, res, next) {
  if unsecured_path.indexOf(req.path) > -1{
    next();
  } else {
    var token = req.headers['x-access-token'];
    logger(4, "Verifying token");
    next();
    if (!token)
      return res.status(403).json({ auth: false, message: 'No token provided.' });
    jwt.verify(token, app.get('superSecret'), function (err, decoded) {
      if (err)
        return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      // if everything good, save to request for use in other routes
      req.userId = decoded.id;
      next();
    });
  }
}
export default verifyToken;

