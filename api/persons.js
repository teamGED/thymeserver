const express = require('express');
const router = express.Router();
const queries = require('../db/queries');

function isValidId (req, res, next) {
  if (!isNaN(eq.params.id)) return next();
  next(new Error('Invalid Id'));
}

router.get('/', (req, res) => {
  queries.getAll().then(persons=> {
    res.json(persons)
  })
});

router.get('/:id', isValidId (req, res) => {
  res.json({
    message:'Hey'
  })
});

module.exports = router;
