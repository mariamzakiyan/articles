/**
 * @param { import("knex").Knex } knex
 */
export const up = (knex) => knex.schema.createTableIfNotExists('users', (table) => {
  table.increments();

  table.string('name');
  table.string('login').unique();
  table.string('password');
  table.string('role');
});

/**
 * @param { import("knex").Knex } knex
 */
export const down = (knex) => knex.schema.dropTableIfExists('users');
