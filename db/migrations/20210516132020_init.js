exports.up = function (knex) {
  return knex.schema
    .createTable("accounts", (table) => {
      table.increments("id");
      table.string("firstname", 30).nullable();
      table.string("lastname", 30).nullable();
      table.string("username", 30).nullable();
      table.text("address").nullable();
      table.string("email", 50).notNullable().unique();
      table.text("password").notNullable();
      table.string("phone", 50).nullable();
      table.text("token").nullable();
      table
        .enu("status", ["Active", "Pending", "Deleted", "Banned"])
        .defaultTo("Active");
      table.timestamps(true, true);
    })

    .createTable("subscribers", function (subscribeTable) {
        subscribeTable.increments();
        subscribeTable.string("email", 50).notNullable().unique(); 
        subscribeTable
          .enu("status", ["Active", "Pending", "Deleted"])
          .defaultTo("Active");
        subscribeTable.timestamps(true, true);
      })

    .createTable("brands", function (brandTable) {
      brandTable.increments();
      brandTable.string("name", 50).nullable();
      brandTable.text("description").nullable();
      brandTable
        .enu("status", ["Active", "Pending", "Deleted"])
        .defaultTo("Active");
      brandTable.timestamps(true, true);
    })

    .createTable("subcategories", function (subTable) {
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

    .createTable("products", function (productTable) {
      productTable.increments();
      productTable.string("category", 100).nullable(); 
      productTable.integer("sub_id").unsigned().nullable();
      productTable.integer("brand_id").unsigned().nullable();
      productTable.string("product_name", 50).nullable();
      productTable.text("description").nullable(); 
      productTable
        .enu("status", ["Active", "Pending", "Deleted"])
        .defaultTo("Active");
      productTable.specificType("images", "text ARRAY");
      productTable.boolean("has_name").nullable().defaultTo(false);
      productTable.boolean("branded").nullable().defaultTo(false);
      productTable.boolean("best").nullable().defaultTo(false);
      productTable.boolean("new").nullable().defaultTo(false);
      productTable.boolean("featured").nullable().defaultTo(false);
      productTable.timestamps(true, true);
      productTable
        .foreign("sub_id")
        .references("id")
        .inTable("subcategories")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      productTable
        .foreign("brand_id")
        .references("id")
        .inTable("brands")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
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
