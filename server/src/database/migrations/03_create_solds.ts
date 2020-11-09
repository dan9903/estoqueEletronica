import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("solds", (table) => {
    table.increments("id").notNullable();
    table
      .integer("client_id")
      .notNullable()
      .references("id")
      .inTable("clients");
    table
      .integer("product_id")
      .notNullable()
      .references("id")
      .inTable("products");
    table.integer("quantity").notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("solds");
}
