var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
var flash = require('req-flash');
var cors = require('cors')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(cors())
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(session({
  secret: 'djhxcvxfgshajfgjhgsjhfgsakjeauytsdfy',
  resave: false,
  saveUninitialized: true
  }));

  app.use(flash());
 
 // Global variables
app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//Db Connection Start 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true })
.then(() => console.log('connection successful'))
.catch((err) => console.error(err))



app.use('/index', indexRouter);
app.use('/', usersRouter);
 
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
app.listen(3000);
module.exports = app;
