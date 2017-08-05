
exports.up = function(knex, Promise) {
  return knex.schema.createTable('person', (table) => {
    table.increments();
    table.boolean('is_seller').defaultTo('false');
    table.string('email').notNullable();
    table.text('name').notNullable();
    table.string('address');
    table.string('password').notNullable();
    table.integer('item_id').unsigned().references('item.id').onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('person')
};
