const express = require('express');
const router = express.Router();
const queries = require('../db/queries');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')

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
  const validLocation = typeof person.address == 'string' && person.address.trim() !== '';
  return validEmail && validPassword && validName && validLocation;
}

router.get('/', (req, res)=> {
  queries.getAll()
  .then(person => {
    res.json(person)
  })
})

router.get('/names', (req, res) => {
  queries.getNames()
  .then(names => {
  res.json(names)
  })
});

router.get('/item', (req, res) => {
  queries.getItemId(req.body.name)
  .then(id => {
    res.json(id)
  })
});

router.post('/signup', (req, res, next)=> {
  queries.checkEmail(req.body.email)
  .then(person => {
    if (person.length === 0) {
  const is_seller = req.body.seller;
  console.log(is_seller)
  if (is_seller == false && validBuyer(req.body)) {
    var hash  = bcrypt.hashSync(req.body.password, 8)
    const person = {
      is_seller: req.body.seller,
      name: req.body.name,
      email:req.body.email,
      password: hash
    }
  } else if (is_seller == true && validSeller(req.body)) {
    var hash = bcrypt.hashSync(req.body.password, 8)
    const person = {
      is_seller: req.body.seller,
      name: req.body.name,
      email:req.body.email,
      password: hash,
      address: req.body.address,
      item_id: req.body.item
    }
    console.log(person)
    queries.create(person)
    .returning('*')
    .then(person => {
      res.json(person);
    })
  }
} else {
  res.json({message: "Email already in use, try logging in"})
}
});
})

router.delete('/:id', (req, res) => {
  let id = req.params.id;
  let drop = req.body;
  queries.deletePerson(id).del(drop)
  .returning('*')
  .then(person => {
    res.json(person);
  })
});

router.put('/:user/:item', (req, res) => {
  let user = req.params.user
  let item = req.params.item
  queries.updateItem(user, item)
  .returning('*')
  .then(data => res.json(data))
})

module.exports = router;
