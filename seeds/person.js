var bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('person').del()
    .then(function () {

      var hash1 = bcrypt.hashSync('Thymeshare', 8)
      var hash2 = bcrypt.hashSync('NotThymeshare', 8)
      // Inserts seed entries
      return knex('person').insert([
        { id: 1, is_seller: 'true', email: 'connor.alcock.87@gmail.com', name: 'Connor', address: '2660 W 40th Ave Denver, CO 80211', password: hash1, item_id: 1 },
        { id: 2, is_seller: 'true', email: 'trenton.wuerker@gmail.com', name: 'Trent', address: '1644 Platte St, Denver, CO 80202', password: hash2, item_id: 2 }
      ]);
    });
};
