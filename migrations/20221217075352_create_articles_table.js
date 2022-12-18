/**
 * @param { import("knex").Knex } knex
 */
export const up = (knex) => knex.schema.createTableIfNotExists('articles', (table) => {
  table.increments();

  table.string('name');
  table.string('description');
  table.string('content');

  table.integer('user_id')
    .unsigned()
    .index()
    .references('id')
    .inTable('users')
    .onDelete('CASCADE');

  table.integer('category_id')
    .unsigned()
    .index()
    .references('id')
    .inTable('categories')
    .onDelete('CASCADE');

  table.timestamp('updatedAt').defaultTo(knex.fn.now());
});

/**
 * @param { import("knex").Knex } knex
 */
export const down = (knex) => knex.schema.dropTableIfExists('articles');
