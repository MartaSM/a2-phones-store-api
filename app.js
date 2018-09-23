const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');

const phonesRouter = require('./routes/phones.routes');
const usersRouter = require('./routes/users.routes');
const sessionsRouter = require('./routes/sessions.routes');

const app = express();

require('./configs/db.config');
require('./configs/passport.config').setup(passport);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: process.env.COOKIE_SECRET || 'Super Secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 *24 *2
  }
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/phones', phonesRouter);
app.use('/users', usersRouter);
app.use('/sessions', sessionsRouter);

//FALTA LO DE LOS ERRORES

app.use(function(req, res, next) {
  next(createError(404));
});



app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  res.status(err.status || 500);
  res.render.json;
});

module.exports = app;
