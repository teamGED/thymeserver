
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("user").del()
    .then(function () {
      // Inserts seed entries
      return knex("user").insert([
        { id: 1, is_seller: 'true', email: 'connor.alcock.87@gmail.com', name: 'Connor', address: '2660 W 40th Ave Denver, CO 80211', password: 'Thymeshare', item_id: 1 },
        { id: 2, is_seller: 'false', email: 'trenton.wuerker@gmail.com', name: 'Trent', address: '1644 Platte St, Denver, CO 80202', password: 'NotThymeshare', item_id: null }
      ]);
    });
};
