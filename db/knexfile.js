const logger = require("../logger");
const dotenv = require('dotenv');
dotenv.config();

// Update with your config settings.

module.exports = {
  test: {
    client: "mysql",
    connection: {
      host: process.env.APP_DEV_DB_HOST,
      port: process.env.APP_DEV_DB_PORT,
      user: process.env.APP_DEV_DB_USER,
      password: process.env.APP_DEV_DB_PWD,
      database: process.env.APP_DEV_DB_NAME,
      timezone: "UTC",
      dateStrings: true,
      debug: true,
      asyncStackTraces: true,
      typeCast: (field, next) => {
        if (field.type === "JSON" || field.type === "LONGTEXT") { 
          // console.log("acl", field.string());
          // return JSON.parse(field.string());
        }
        if (field.type == "TINY" && field.length == 1) {
          let value = field.string();
          return value ? value == "1" : null;
        }
        return next();
      },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
  development: {
    client: "postgresql",
    connection: { 
      user: process.env.APP_PROD_DB_USERNAME,
      password: process.env.APP_PROD_DB_PASSWORD,
      database: process.env.APP_PROD_DB_DATABASE,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "mysql",
    connection: {
      host: process.env.APP_PROD_DB_HOST, 
      port: process.env.APP_PROD_DB_PORT,
      user: process.env.APP_PROD_DB_USERNAME,
      password: process.env.APP_PROD_DB_PASSWORD,
      database: process.env.APP_PROD_DB_DATABASE,
      timezone: "UTC",
      dateStrings: true,

      typeCast: (field, next) => {
        if (field.type === "JSON" || field.type === "LONGTEXT") {
          logger.info("Field", field.type);
          logger.info("acl", field.string());
          return JSON.parse(field.string());
        }
        if (field.type == "TINY" && field.length == 1) {
          let value = field.string();
          return value ? value == "1" : null;
        }
        return next();
      },
      debug: true,
      asyncStackTraces: true,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
