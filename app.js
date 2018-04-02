var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api.route');

var app = express();

// set up mongodb connection
mongoose.connect('mongodb://heroku_0mc7rmx6:6076u7i1n34sd6e52gogglq9la@ds131329.mlab.com:31329/heroku_0mc7rmx6')
.then(() => {
	console.log('Successfully connected to the Mongodb Database at URL: mongodb://heroku_0mc7rmx6:6076u7i1n34sd6e52gogglq9la@ds131329.mlab.com:31329/heroku_0mc7rmx6')
})
.catch(() => {
	console.log('Error connecting to the Mongodb Database at URL: mongodb://heroku_0mc7rmx6:6076u7i1n34sd6e52gogglq9la@ds131329.mlab.com:31329/heroku_0mc7rmx6')
})

// allow Cross Origin Request(Request from Angular Frontend)
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
