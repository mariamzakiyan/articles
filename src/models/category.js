export default class CategoryModel {
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
  async createCategory(data) {
    const category = await this.db.table('categories')
      .insert({
        name: data.name,
        description: data.description
      }).returning('id');

    return category.length ? category[0] : null;
  }

  /**
   *
   * @param id
   * @returns {Promise<boolean>}
   */
  async deleteCategory(id) {
    const deleted = await this.db.table('categories')
      .del()
      .where({ id });
    return !!deleted;
  }

  /**
   *
   * @param offset
   * @param limit
   * @returns {Promise<*>}
   */
  async getCategories(offset, limit) {
    const categories = await this.db.select()
      .from('categories').limit(limit).offset(offset);
    return categories;
  }

  /**
   *
   * @param id
   * @returns {Promise<*>}
   */
  async getCategoryById(id) {
    const category = await this.db.select()
      .from('categories')
      .where({ id })
      .first();
    return category;
  }
}
