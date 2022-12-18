import config from '../config.js';

/**
 * @param err
 * @param req
 * @param res
 * @param next
 * @constructor
 */
const errorHandler = (err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || 'Something went wrong';
  // return error
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: config.NODE_ENV === 'development' ? err.stack : {}
  });
};

export default errorHandler;
