
exports.up = function(knex, Promise) {
  return knex.schema.createTable('item', (table) => {
    table.increments();
      table.text('name').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('item')
};
