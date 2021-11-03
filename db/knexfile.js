const logger = require("../logger");

// Update with your config settings.

module.exports = {
  test: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "dontopen",
      database: "bags",
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
      database: "bags",
      user: "postgres",
      password: "1234",
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
      // host: "127.0.0.1",
      host: "67.220.184.242",
      port: 3306,
      user: "mybagswa_root_app",
      password: "VpW8Z8Z$8tdN",
      database: "mybagswa_bags",
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
