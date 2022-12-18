/**
 * @param { import("knex").Knex } knex
 */
export const up = (knex) => knex.schema.createTableIfNotExists('categories', (table) => {
  table.increments();

  table.string('name');
  table.string('description');
});

/**
 * @param { import("knex").Knex } knex
 */
export const down = (knex) => knex.schema.dropTableIfExists('categories');
