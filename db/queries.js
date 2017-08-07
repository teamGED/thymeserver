const knex = require('./knex'); //connection

module.exports = {
  getAll() {
    return knex('*').from('person');
  },
  getOnePerson(id) {
    return knex('person')
    .where('id', id)
    .first()
  },
  getNames() {
    return knex('item').from('item')
    .select('item.name as item_name', 'person.name as person_name')
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
    .insert(person);
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
  deleteItem(id){
    return knex('item_id')
    .where('id', id)
    .del()
  }
}
