import {
  StatusCodes
} from 'http-status-codes';
import AppError from '../utils/appError.js';
import errorMessages from '../constants/errorMessages.js';
import models from "../models/index.js";

class CategoryController {
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
   * @returns {Promise<*>}
   */
  async create(req, res, next) {
    try {
      // get user input
      const {
        name,
        description
      } = req.body;

      // validate user input
      if (!(name && description)) {
        return next(new AppError(errorMessages.INVALID_PARAMS, StatusCodes.BAD_REQUEST));
      }

      // create category
      const category = await this.models.category.createCategory({
        name,
        description
      });

      // return category id
      res.status(StatusCodes.CREATED).json({
        id: category.id
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
  async list(req, res, next) {
    try {
      let { offset = 0, limit = 10 } = req.query;
      limit = parseInt(limit);
      offset = parseInt(offset);

      // get categories list
      const categories = await this.models.category.getCategories(offset, limit);

      // get total count of categories
      const totalCount = await this.models.category.getTotalCount();

      // return data with limit and offset
      res.status(StatusCodes.OK).json({
        categories,
        limit,
        offset: offset + limit,
        totalCount: parseInt(totalCount)
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
   * @returns {Promise<*>}
   */
  async delete(req, res, next) {
    try {
      const { id } = req.params;

      // validate category input
      if (!id) {
        return next(new AppError(errorMessages.INVALID_PARAMS, StatusCodes.BAD_REQUEST));
      }

      // delete category
      const deleted = await this.models.category.deleteCategory(id);

      // return success response
      res.status(StatusCodes.OK).json({
        success: deleted
      });
    }
    catch (e) {
      next(e);
    }
  }
}

export default new CategoryController(models);
