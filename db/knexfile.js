// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'bags',
      user:     'postgres',
      password: '1234'
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
      database: 'youarec1_bags',
      user:     'youarec1_pg',
      password: 'tv$w)47WRvDJ'
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