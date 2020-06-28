import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('sold', table =>{
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('phone').notNullable();
    table.date('sold_date').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('sold');
}