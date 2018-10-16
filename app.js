var createError = require('http-errors');
var express = require('express');
const database = require('./database');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
var postRouter = require('./routes/post');
var clinicRouter = require('./routes/clinic');
var cityRouter = require('./routes/city');
var doctorRouter = require('./routes/doctor');
var specialityRouter = require('./routes/speciality');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser({ extended: true}));

app.use('/', indexRouter);
app.use('/auth', loginRouter);
app.use('/users', usersRouter);
app.use('/post', postRouter);
app.use('/clinic', clinicRouter);
app.use('/city', cityRouter);
app.use('/doctor', doctorRouter);
app.use('/speciality', specialityRouter);

database().then(info => {
  console.log(`Connected to ${info.host}:${info.port}/${info.name}`)
}).catch(() => {
  console.log('Unable to connection to database');
  process.exit(1);
});

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
