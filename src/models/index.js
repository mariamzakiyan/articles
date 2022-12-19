import UserModel from './user.js';
import CategoryModel from './category.js';
import ArticleModel from './article.js';
import Database from "../database.js";
const { db } = Database.getInstance();

class Models {
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

export default new Models(db);
