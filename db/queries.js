const knex = require('./knex'); //connection

module.exports = {
  getAll() {
    return knex('person')
  }
}
