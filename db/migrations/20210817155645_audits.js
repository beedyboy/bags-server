exports.up = function (knex) {
    return knex.schema

    .table("reconcillations", function (t) {
        t.string("cancellation_number", 30);
      })
   
      .createTable("audits", (audTable) => {
        audTable.increments("id");
        audTable.integer("recon_id").unsigned().nullable();
        audTable.string("value_date", 30).notNullable();
        audTable.text("remarks").nullable();
        audTable.float("credit_amount").notNullable();
        audTable.float("amount_used").nullable();
        audTable.float("balance").nullable();
        audTable.string("customer", 50).nullable();
        audTable.boolean("approved_one").nullable().defaultTo(false);
        audTable.boolean("approved_two").nullable().defaultTo(false);
        audTable.integer("approval_one").unsigned().nullable();
        audTable.integer("approval_two").unsigned().nullable();
        audTable.string("reference", 30).nullable();
        audTable.string("cancellation_number", 30).nullable();
        audTable.timestamps(true, true);
        audTable
          .foreign("approval_one")
          .references("id")
          .inTable("accounts")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
        audTable
          .foreign("approval_two")
          .references("id")
          .inTable("accounts")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
        audTable
          .foreign("reconId")
          .references("id")
          .inTable("reconcillations")
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
  