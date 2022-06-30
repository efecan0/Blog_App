var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');
//var FileStore = require('session-file-store')(session)
const MongoStore = require('connect-mongo');

var config = require('./config')
var passport = require('passport')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var blogRouter = require('./routes/blogRouter')
const uploadRouter = require('./routes/uploadRouter');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.use(passport.initialize())

app.use(session({
  secret: 'dawdwadawdwa',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: config.mongoUrl,
    autoRemove: 'native',
  }),
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 3000000,
    secure: false
  },
  unset: 'destroy',
  rolling: true
})
);
app.use(passport.session())


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/blog', blogRouter);
app.use('/imageUpload', uploadRouter);

const mongoose = require('mongoose');
const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Connected correctly to the server");
}, (err) => { console.log(err); })


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: "ERROR" });
});

module.exports = app;
