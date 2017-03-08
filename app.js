/**
 * Created by Dinesh on 01-03-2017.
 */

var express = require('express');
var app = express();
var path  = require('path');
var exphbs = require('express-handlebars');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose  = require('mongoose');
var flash = require('connect-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
mongoose.connect('mongodb://localhost/loginData');
var db = mongoose.connection;

//setup static path
app.use(express.static(path.join(__dirname, 'public')));

//setup routes
var routes = require('./routes/index');
var users = require('./routes/users');

//setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.engine('handlebars',exphbs({defaultLayout:'layout'}));

//Body parser middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

//express-session
app.use(session({
  secret: 'somerandomstring',
  resave: true,
  saveUninitialized: true,
}));

//passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//flash
app.use(flash());

//Variables
app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//routes
app.use('/', routes);
app.use('/user', users);

app.set('port', process.env.PORT || 2500);


app.listen(app.get('port'), function(){
    console.log("Server running on PORT " + app.get('port'));
});

module.exports = app;