const express = require('express');
const router = express.Router();
const queries = require('../db/queries');

function isValidId (req, res, next) {
  if (!isNaN(eq.params.id)) return next();
  next(new Error('Invalid Id'));
}

function validSeller(person) {
  const validEmail= typeof person.email == 'string' && person.email.trim() !== '';
  const validPassword = typeof person.password == 'string' &&
  person.password.trim() !== '' &&
  person.password.trim().length >=6;
  const validName = typeof person.name == 'string' && person.name.trim() !== '';
  const validLocation = typeof person.address == 'string' && person.address.trim() !== '';
  return validEmail && validPassword && validName && validLocation;
}

function validBuyer(person) {
  const validEmail= typeof person.email == 'string' && person.email.trim() !== '';
  const validPassword = typeof person.password == 'string' &&
  person.password.trim() !== '' &&
  person.password.trim().length >=6;
  const validName = typeof person.name == 'string' && person.name.trim() !== '';
  return validEmail && validPassword && validName && validLocation;
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

router.post('/', (req, res, next)=> {
  
})

module.exports = router;
