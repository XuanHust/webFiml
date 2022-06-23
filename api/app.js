var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testApiRouter = require('./routes/testApi');
var seriesFiml = require('./routes/series');
var oddFiml = require('./routes/single');
var shows = require('./routes/shows');
var cartoon = require('./routes/cartoon');
var totalFiml = require('./routes/totalFiml');
var postData = require('./routes/postData')
var actor = require('./routes/actor');
var director = require('./routes/director');
var category = require('./routes/category');
var espisodes = require('./routes/espisodes');
var filterFiml = require('./routes/filterFiml');
var searchActor = require('./routes/searchActor');
var selectType = require('./routes/selectType');
var account = require('./routes/account');
var allUser = require('./routes/allUser');
var creAcc = require('./routes/creAcc');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/testApi", testApiRouter);
app.use("/series", seriesFiml);
app.use("/single", oddFiml);
app.use("/shows", shows);
app.use("/cartoon", cartoon);
app.use("/totalFiml", totalFiml);
app.use(postData);
app.use("/actor", actor);
app.use("/director", director);
app.use("/category", category);
app.use("/espisodes", espisodes);
app.use(filterFiml);
app.use(searchActor);
app.use(selectType);
app.use(account);
app.use(allUser);
app.use(creAcc);

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
