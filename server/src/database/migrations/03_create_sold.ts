import Knex from 'knex';

export async function up(knex: Knex){
  return knex.schema.createTable('sold', table => {
    table.increments('id').notNullable();
    table.integer('id_client').notNullable();
    table.integer('id_product').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('sold');
}