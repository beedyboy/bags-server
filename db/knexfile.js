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
      timezone: 'UTC',
      dateStrings: true,
      typeCast: function (field, next) {
        if (field.type === 'JSON') {
          return (JSON.parse(field.string()))
        }
        if (field.type == 'TINY' && field.length == 1) {
          return (field.string() == '1'); // 1 = true, 0 = false
      } 
        return next()
      }
  
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
