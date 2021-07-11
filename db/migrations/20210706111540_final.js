exports.up = function (knex) {
    return knex.schema
      .createTable("contacts", (table) => {
        table.increments("id");
        table.string("fullname", 60).nullable(); 
        table.string("phone", 20).nullable(); 
        table.string("email", 50).notNullable();
        table.text("description").notNullable(); 
        table
          .enu("status", ["Read", "UnRead", "Deleted"])
          .defaultTo("UnRead");
        table.timestamps(true, true);
      }) 
      .then(() => console.log("table created"))
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        knex.destroy();
      });
    
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("accounts");
  };
  