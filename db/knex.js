const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js')[environment];
const environmentConfig = config[environment];
const knex = require('knex');
const connection = knex(environmentConfig);
module.exports = require('knex')(environmentConfig);
