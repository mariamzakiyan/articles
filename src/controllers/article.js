import {
  StatusCodes
} from 'http-status-codes';
import AppError from '../utils/appError.js';
import errorMessages from '../constants/errorMessages.js';
import models from "../models/index.js";

class ArticleController {
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
      // get article input
      const {
        name,
        content,
        categoryId
      } = req.body;

      // validate article input
      if (!(name && content && categoryId)) {
        return next(new AppError(errorMessages.INVALID_PARAMS, StatusCodes.BAD_REQUEST));
      }

      // get category by id
      const category = await this.models.category.getCategoryById(categoryId);
      if (!category) {
        return next(new AppError(errorMessages.CATEGORY_NOT_FOUND, StatusCodes.NOT_FOUND));
      }

      // get user id from request
      const { user: { id: userId } } = req;

      // create article
      const article = await this.models.article.createArticle({
        name,
        content,
        categoryId,
        userId
      });

      // return article id
      res.status(StatusCodes.CREATED).json({
        id: article.id
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

      // get articles list
      const articles = await this.models.article.getArticles(offset, limit);

      // get total count of articles
      const totalCount = await this.models.article.getTotalCount();

      // return data with limit and offset
      res.status(StatusCodes.OK).json({
        articles,
        limit,
        offset: offset+ limit,
        totalCount: parseInt(totalCount)
      });
    }
    catch (e) {
      next(e);
    }
  }
}

export default new ArticleController(models);
