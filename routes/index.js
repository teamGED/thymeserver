var express = require('express');
var router = express.Router();
const knex = require('../db/knex');

//routes
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json('index');
});

module.exports = router;
