import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("clients", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("phone").notNullable();
    table.date("sold_date").notNullable();
    table.decimal("total").notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("clients");
}
