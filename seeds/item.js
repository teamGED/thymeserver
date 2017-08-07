exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('item').del()
    .then(function () {
      // Inserts seed entries
      return knex('item').insert([
        { id: 1, name: 'carrots' },
        { id: 2, name: 'beets' },
        { id: 3, name: 'arugala' },
        { id: 4, name: 'spinach' },
        { id: 5, name: 'cabbage' },
        { id: 6, name: 'mushrooms' },
        { id: 7, name: 'peppers' },
        { id: 8, name: 'green beans' },
        { id: 9, name: 'green onions' },
        { id: 10, name: 'apples' },
        { id: 11, name: 'apricots' },
        { id: 12, name: 'zucchini' },
        { id: 13, name: 'lettuce' },
        { id: 14, name: 'cucumber' },
        { id: 15, name: 'eggplant' },
        { id: 16, name: 'rhubarb' },
        { id: 17, name: 'melon' },
        { id: 18, name: 'kale' },
        { id: 19, name: 'plums' },
        { id: 20, name: 'pumpkins' },
        { id: 21, name: 'peas' },
        { id: 22, name: 'peaches' },
        { id: 23, name: 'radiashes' },
        { id: 24, name: 'rhubarb' },
        { id: 25, name: 'squash' },
        { id: 27, name: 'tomatos' },
        { id: 28, name: 'corn' },
        { id: 29, name: 'fennel' }

      ]);
    });
};
