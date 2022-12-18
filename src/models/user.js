export default class UserModel {
  /**
   *
   * @param db
   */
  constructor(db) {
    this.db = db;
  }

  /**
   *
   * @param login
   * @returns {Promise<*>}
   */
  async getUserByLogin(login) {
    const user = await this.db.select()
      .from('users')
      .where({ login })
      .first();
    return user;
  }

  /**
   *
   * @param id
   * @returns {Promise<*>}
   */
  async getUserById(id) {
    const user = await this.db.select()
      .from('users')
      .where({ id })
      .first();
    return user;
  }

  /**
   *
   * @param data
   * @returns {Promise<*|null>}
   */
  async createUser(data) {
    const user = await this.db.table('users')
      .insert({
        name: data.name,
        login: data.login,
        password: data.password,
        role: data.role
      }).returning('id');

    return user.length ? user[0] : null;
  }
}
