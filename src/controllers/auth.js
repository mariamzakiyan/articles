import {
  StatusCodes
} from 'http-status-codes';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import AppError from '../utils/appError.js';
import config from '../config.js';
import errorMessages from '../constants/errorMessages.js';
import roles from '../constants/roles.js';
import models from "../models/index.js";

class AuthController {
  /**
   *
   * @param models
   */
  constructor(models) {
    this.models = models.models;
  }

  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<void>}
   */
  async signUp(req, res, next) {
    try {
      // get user input
      const { name, login, password } = req.body;

      // validate user input
      if (!(name && login && password)) {
        return next(new AppError(errorMessages.INVALID_PARAMS, StatusCodes.BAD_REQUEST));
      }

      // check if user already exist
      const oldUser = await this.models.user.getUserByLogin(login);
      if (oldUser) {
        return next(new AppError(errorMessages.USER_ALREADY_EXISTS, StatusCodes.CONFLICT));
      }

      // encrypt password
      const encryptedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await this.models.user.createUser({
        name,
        login,
        password: encryptedPassword,
        role: roles.MEMBER
      });

      // Create token
      const token = jwt.sign(
        { user_id: user.id, login },
        config.TOKEN_KEY,
        {
          expiresIn: '2h'
        }
      );

      // return token
      res.status(StatusCodes.CREATED).json({
        token
      });
    }
    catch (e) {
      next(e);
    }
  }

  /**
   *
   * @param req
   * @param res
   * @param next
   * @returns {Promise<void>}
   */
  async singin(req, res, next) {
    try {
      // get user input
      const {
        login,
        password
      } = req.body;

      // validate user input
      if (!(login && password)) {
        return next(new AppError(errorMessages.INVALID_PARAMS, StatusCodes.BAD_REQUEST));
      }

      // check if user exist
      const user = await this.models.user.getUserByLogin(login);

      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = jwt.sign(
          {
            user_id: user._id,
            login
          },
          config.TOKEN_KEY,
          {
            expiresIn: '2h'
          }
        );

        // return token
        res.status(200)
          .json({
            token
          });
      }

      return next(new AppError(errorMessages.INVALID_CREDENTIALS, StatusCodes.BAD_REQUEST));
    }
    catch (e) {
      next(e);
    }
  }
}

export default new AuthController(models);
