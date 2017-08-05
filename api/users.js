const express = require('express');
const router = express.Router();
const queries = require('../db/queries')


router.get('/', (req, res) => {
  queries.getAll().then(users=> {
    res.json(users)
  })
});

module.exports = router;
