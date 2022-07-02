var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
require("dotenv").config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testApiRouter = require('./routes/testApi');
var seriesFilm = require('./routes/series');
var oddFilm = require('./routes/single');
var shows = require('./routes/shows');
var cartoon = require('./routes/cartoon');
var totalFilm = require('./routes/totalFilm');
var postData = require('./routes/postData')
var actor = require('./routes/actor');
var director = require('./routes/director');
var category = require('./routes/category');
var espisodes = require('./routes/espisodes');
var filterFilm = require('./routes/filterFilm');
var searchActor = require('./routes/searchActor');
var selectType = require('./routes/selectType');
var account = require('./routes/account');
var allUser = require('./routes/allUser');
var creAcc = require('./routes/creAcc');
var comments = require('./routes/comment');
var postComment = require('./routes/postComment');
var booksRouter = require('./routes/admin');
var verifyToken = require("./models/authenticateToken");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use("*", [verifyToken]);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/testApi", testApiRouter);
app.use("/series", seriesFilm);
app.use("/single", oddFilm);
app.use("/shows", shows);
app.use("/cartoon", cartoon);
app.use("/totalFilm", totalFilm);
app.use(postData);
app.use("/actor", actor);
app.use("/director", director);
app.use("/category", category);
app.use("/espisodes", espisodes);
app.use(filterFilm);
app.use(searchActor);
app.use(selectType);
app.use(account);
app.use(allUser);
app.use(creAcc);
app.use(comments);
app.use(postComment);
app.use('/admin', booksRouter);
app.use('/video', (req, res) => {
  res.sendFile('assets/video/cartoon.mp4', {root: __dirname})
});

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
  res.render('error');
});

module.exports = app;
