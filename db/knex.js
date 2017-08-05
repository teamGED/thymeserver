const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js')[environment];
const production = process.env.DATABASE_URL;
module.exports = require('knex')(config);
