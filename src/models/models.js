import UserModel from './user.js';
import CategoryModel from './category.js';
import ArticleModel from './article.js';

export default class Models {
  /**
   *
   * @param db
   */
  constructor(db) {
    this.models = {
      user: new UserModel(db),
      category: new CategoryModel(db),
      article: new ArticleModel(db)
    };
  }
}
