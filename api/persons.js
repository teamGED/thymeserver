const express = require('express');
const router = express.Router();
const queries = require('../db/queries');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

require('dotenv').config()

function isValidId(req, res, next) {
  if (!isNaN(eq.params.id)) return next();
  next(new Error('Invalid Id'));
}

function validSeller(person) {
  const validEmail = typeof person.email == 'string' && person.email.trim() !== '';
  const validPassword = typeof person.password == 'string' &&
    person.password.trim() !== '' &&
    person.password.trim().length >= 6;
  const validName = typeof person.name == 'string' && person.name.trim() !== '';
  const validLocation = typeof person.address == 'string' && person.address.trim() !== '';
  return validEmail && validPassword && validName && validLocation;
}

function validBuyer(person) {
  const validEmail = typeof person.email == 'string' && person.email.trim() !== '';
  const validPassword = typeof person.password == 'string' &&
    person.password.trim() !== '' &&
    person.password.trim().length >= 6;
  const validName = typeof person.name == 'string' && person.name.trim() !== '';
  const validLocation = typeof person.address == 'string' && person.address.trim() !== '';
  return validEmail && validPassword && validName && validLocation;
}

router.get('/', (req, res) => {
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

router.post('/login', (req, res) => {
  console.log(req.body);
  queries.checkEmail(req.body.email)
  .then(user => {
    if (user.length === 0) {
      res.json ({ error: 'E-mail or password did not match'})
    } else {
      var match = bcrypt.compareSync(user[0].password, req.body.password)
      console.log(match, req.body.password, user[0].password);
      if (match) {
        delete user[0].password
        var token = jwt.sign(user[0], process.env.TOKEN_SECRET)
        res.json({ data: token})
      } else {
        res.json({ error: 'E-mail or password did not match'})
      }
    }
  })
  res.json({message: 'login sucessful'})
})

router.post('/buyer/signup', (req, res, next) => {
  queries.checkEmail(req.body.email)
    .then(person => {
      if (person.length === 0) {
        // const is_seller = req.body.seller;
        if (validBuyer(req.body)) {
          var hash = bcrypt.hashSync(req.body.password, 8)
          var buyer = {
            is_seller: req.body.seller,
            name: req.body.name,
            email: req.body.email,
            password: hash
          }
          queries.create(buyer)
            .then(user => {
              let token = jwt.sign(user[0], process.env.TOKEN_SECRET)
              res.json({
                token
              })
            })
        }
      } else {
        res.json({
          error: "Email already exists, try logging in!"
        })
      }
    })
})

router.post('/seller/signup', (req, res, next) => {
  queries.checkEmail(req.body.email)
    .then(person => {
      if (person.length === 0) {
        // const is_seller = req.body.seller;
        if (validSeller(req.body)) {
          var hash = bcrypt.hashSync(req.body.password, 8)
          const seller = {
            is_seller: req.body.seller,
            name: req.body.name,
            email: req.body.email,
            password: hash,
            address: req.body.address,
            item_id: req.body.item
          }
          queries.create(seller)
            .then(user => {
              var token = jwt.sign(user[0], process.env.TOKEN_SECRET)
              res.json({
                token
              })
            })
        }
      } else {
        res.json({
          error: "Email already exists, try logging in!"
        })
      }
    })
})

router.get('/:id/profile', (req, res) => {
  console.log('token ', req.headers.authorization)
  if (req.headers.authorization) {
    const token = req.headers.authorization.substring(7)
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    if (decoded.id == req.params.id) {
      queries.getSellerById(req.params.id).then(info => {
        res.json(info)
        console.log(info);
      })
    } else {
      res.status(401)
      res.json({
        error: 'unauthorized'
      })
    }
  } else {
    res.status(401)
    res.json({
      error: 'unauthorized'
    })
  }
});

router.delete('/:id', (req, res) => {
  let id = req.params.id;
  let drop = req.body;
  queries.deletePerson(id).del(drop)
    .returning('*')
    .then(person => {
      res.json(person);
    })
});

router.put('/:user_id/:item_id', (req, res) => {
  let user = req.params.user_id
  let item = req.params.item_id
  queries.updateItem(user, item)
  .returning('*')
  .then(data => res.json(data))
})

module.exports = router;
