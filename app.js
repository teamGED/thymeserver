const express = require('express');
const path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var handlebars = require('hbs')
const bodyParser = require('body-parser');
const index = require('./routes/index');
const users = require('./routes/users');
const app = express();
const cors = require('cors');
const logger = require('morgan');
const jwt = require('jsonwebtoken');



const persons = require('./api/persons');


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



//maybe delete this

app.use(express.static(path.join(__dirname, 'public')));

//mount the router

app.use('/api/v1/users', persons);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  })
});

module.exports = app;
