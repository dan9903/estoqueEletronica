import Knex from 'knex';

export async function up(knex: Knex){
  return knex.schema.createTable('solds', table => {
    table.increments('id').notNullable();
    table.integer('id_client').notNullable().references('id').inTable('clients');
    table.integer('id_product').notNullable().references('id').inTable('products');
    table.integer('quantity').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('solds');
}