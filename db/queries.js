const knex = require('./knex'); //connection

module.exports = {
  getAll() {
    return knex('*').from('person');
  },
  getNames() {
    return knex('item').from('item')
    .select('item.name as item_name', 'person.name as person_name', 'person.address as address', 'person.is_seller as seller')
    .join('person', 'item.id', 'person.item_id')
    // .first();
  },
  getItemId(name) {
    return knex('item')
    .select('item.id')
    .where('name', name);
  },
  checkEmail(email) {
    return knex('person')
    .where('email', email)
  },
  create(person) {
    return knex('person')
    .insert(person)
    .returning('*');
  },
  sellerLogin(email) {
    return knex('person')
    .select('*')
    .where('email', email)
  },
  getSellerById(id){
    return knex('person')
    .where('id', id)
  },
  update(id, person) {
    return knex('person')
    .where('id', id)
    .update(person, 'id')
  },
  deletePerson(id) {
    return knex('person')
    .where('id', id)
    .del();
  },
  updateItem(id, item){
    return knex('person')
    .where('id', id)
    .update('item_id', item)
  }
}
