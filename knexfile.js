import appConfig from './src/config.js';

const config = {
  development: {
    client: 'postgresql',
    connection: {
      host: appConfig.POSTGRES_HOST,
      port: appConfig.POSTGRES_PORT,
      user: appConfig.POSTGRES_USER,
      password: appConfig.POSTGRES_PASSWORD,
      database: appConfig.POSTGRES_DB
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};

export default config;
