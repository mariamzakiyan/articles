import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import AppError from '../utils/appError.js';
import UserModel from '../models/user.js';
import Database from '../database.js';
import config from '../config.js';
import errorMessages from '../constants/errorMessages.js';

const userModel = new UserModel(Database.getInstance().db);
/**
 *
 * @param roles
 * @returns {(function(*, *, *): Promise<void>)|*}
 */
const authorize = (roles) =>
  // return a middleware
  async (req, res, next) => {
    // get token from headers
    const token = req.headers['x-access-token'];

    if (!token) {
      next(new AppError(errorMessages.TOKEN_REQUIRED, StatusCodes.FORBIDDEN));
    }

    try {
      // try to decode jwt token
      const decoded = jwt.verify(token, config.TOKEN_KEY);

      // get user by login
      const user = await userModel.getUserByLogin(decoded.login);
      if (!user) {
        next(new AppError(errorMessages.USER_NOT_FOUND, StatusCodes.NOT_FOUND));
      }

      if (roles.length && !roles.includes(user.role)) {
        // role is not allowed, so continue on the next middleware
        next(new AppError(errorMessages.ACCESS_DENIED, StatusCodes.FORBIDDEN));
      }

      // add user to request
      req.user = user;
      next();
    }
    catch (err) {
      next(new AppError(errorMessages.TOKEN_REQUIRED, StatusCodes.UNAUTHORIZED));
    }
};

export default authorize;
