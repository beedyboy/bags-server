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
    client: "postgresql",
    connection: {
      database: "youarec1_bags",
      user: "youarec1_root_bags",
      password: "BagsRoot1#",
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
