const express = require('express');
const router = express.Router();
const queries = require('../db/queries');
const bodyParser = require('body-parser')

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
  queries.getNames()
  .then(names => {
  res.json(names)
  })
});

router.get('/:name', (req, res) => {
  queries.getItemId(req.params.name)
  .then(id => {
    res.json(id)
  })
});

router.post('/', (req, res, next)=> {
  console.log(req.body)
  if (validBuyer(req.body)){
    var hash  = bcrypt.hashSync(req.body.password)
    const person = {
      is_seller: req.body.seller,
      name: req.body.name,
      email:req.body.email,
      password: hash,
      address: req.body.address
    }
  }
  if(validSeller(req.body)){
    var hash = bcrypt.hashSync(req.body.password)
    const person = {
      is_seller: req.body.seller,
      name: req.body.name,
      email:req.body.email,
      password: hash,
      address: req.body.address
    }
    queries.create(person)
    .then(id => {
      res.json({
        id:id[0]
      });
    })
  } else {
    res.status(500)
    res.json({
      message: 'Invalid User'
    })
  }
})


module.exports = router;
