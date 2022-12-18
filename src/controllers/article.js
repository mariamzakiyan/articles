import {
  StatusCodes
} from 'http-status-codes';
import AppError from '../utils/appError.js';
import errorMessages from '../constants/errorMessages.js';

export default class ArticleController {
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
      res.status(201).json({
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
      const { offset = 0, limit = 10 } = req.query;

      // get articles list
      const articles = await this.models.article.getArticles(offset, limit);

      // return data with limit and offset
      res.status(201).json({
        articles,
        limit,
        offset
      });
    }
    catch (e) {
      next(e);
    }
  }
}
