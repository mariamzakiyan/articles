import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import AppError from '../utils/appError.js';
import UserModel from '../models/user.js';
import Database from '../database.js';
import config from '../config.js';
import errorMessages from '../constants/errorMessages.js';

const userModel = new UserModel(Database.getInstance().db);

/**
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
const verifyToken = async (req, res, next) => {
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

    // add user to request
    req.user = user;
  }
  catch (err) {
    next(new AppError(errorMessages.TOKEN_REQUIRED, StatusCodes.UNAUTHORIZED));
  }

  return next();
};

export default verifyToken;
