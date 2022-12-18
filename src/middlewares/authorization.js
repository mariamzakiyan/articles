import { StatusCodes } from 'http-status-codes';
import AppError from '../utils/appError.js';
import errorMessages from '../constants/errorMessages.js';

/**
 * @param roles
 * @returns {(function(*, *, *): void)|*}
 */
const permit = (roles) =>
  // return a middleware
  (req, res, next) => {
    const { user } = req;

    if (user && roles.includes(user.role)) {
      // role is allowed, so continue on the next middleware
      next();
    }
    else {
      next(new AppError(errorMessages.ACCESS_DENIED, StatusCodes.FORBIDDEN));
    }
  };

export default permit;
