import knex from 'knex';
import config from '../knexfile.js';
import appConfig from './config.js';

const environment = appConfig.NODE_ENV || 'development';

export default class Database {
  constructor() {
    this.db = knex(config[environment]);
  }

  /**
   *
   * @returns {Database}
   */
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}
