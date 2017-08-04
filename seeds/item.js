
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('item').del()
    .then(function () {
      // Inserts seed entries
      return knex('item').insert([
        { id: 1, name: 'carrots' },
        { id: 2, name: 'beets' },
      ]);
    });
};
