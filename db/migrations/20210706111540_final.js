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
     
      .createTable("settings", function (subTable) {
        subTable.increments();
        subTable.string("name", 50).nullable();
        subTable.string("slug", 50).nullable();
        subTable.string("category", 100).nullable();
        subTable.text("description").nullable();
        subTable
          .enu("status", ["Active", "Pending", "Deleted"])
          .defaultTo("Active");
        subTable.timestamps(true, true);
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
  