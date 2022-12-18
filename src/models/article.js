export default class ArticleModel {
  /**
   *
   * @param db
   */
  constructor(db) {
    this.db = db;
  }

  /**
   *
   * @param data
   * @returns {Promise<*|null>}
   */
  async createArticle(data) {
    const article = await this.db.table('articles')
      .insert({
        name: data.name,
        content: data.content,
        user_id: data.userId,
        category_id: data.categoryId
      }).returning('id');

    return article.length ? article[0] : null;
  }

  /**
   * @param offset
   * @param limit
   * @returns {Promise<awaited Knex.QueryBuilder<DeferredKeySelection.ReplaceBase<TResult, TRecord & TJoinTargetRecord>>>}
   */
  async getArticles(offset, limit) {
    const articles = await this.db.select([
      'articles.id as articleId',
      'articles.name as articleName',
      'articles.content as articleContent',
      'users.id as userId',
      'users.name as userName',
      'categories.id as categoryId',
      'categories.name as categoryName',
      'categories.description as categoryDescription'
    ])
      .from('articles')
      .innerJoin('users', 'users.id', 'articles.user_id')
      .innerJoin('categories', 'categories.id', 'articles.category_id')
      .limit(limit)
      .offset(offset);
    return articles;
  }
}
