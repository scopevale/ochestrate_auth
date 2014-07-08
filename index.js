//index.js/
var express = require('express'),
    exphbs  = require('express4-handlebars'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    TwitterStrategy = require('passport-twitter'),
    GoolgeStrategy = require('passport-google'),
    FacebookStrategy = require('passport-facebook'),
		path = require('path');

// connect middleware includes
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var expSession = require('express-session');


//We will be creating these two files shortly
var config = require('../config.js'), //config file contains all tokens and other private info
    funct = require('./functions.js'); //funct file contains our helper functions for our Passport and database work

var app = express();

//===============PASSPORT===============

//This section will contain our work with Passport

//===============EXPRESS================
// Configure Express
//app.use(express.logger());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(methodOverride());
app.use(cookieParser());

app.use(expSession({ 
	secret: 'supernova',
	resave: true,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Session-persisted message middleware
app.use(function(req, res, next){
  var err = req.session.error,
      msg = req.session.notice,
      success = req.session.success;

  delete req.session.error;
  delete req.session.success;
  delete req.session.notice;

  if (err) res.locals.error = err;
  if (msg) res.locals.notice = msg;
  if (success) res.locals.success = success;

  next();
});

// app.use(app.router); no longer needed in Express 4

// Configure express to use handlebars templates

// var hbs = exphbs.create({
//     defaultLayout: 'main', //we will be creating this layout shortly
// });
// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');
// 
var views_path = './views';

var hbs = exphbs.get('extname');

console.log(hbs);

app.engine(hbs, exphbs.__express);
app.set('view engine', hbs);

exphbs.set('layout_dir', path.join(views_path, 'layouts'));
exphbs.set('partials_dir', path.join(views_path, 'partials'));
exphbs.set('useLayout', true);
exphbs.set('layout', 'main');


//===============ROUTES===============

//This section will hold our Routes
//===============ROUTES=================
//displays our homepage
app.get('/', function(req, res){
  res.render('home', {user: req.user});
});

//displays our signup page
app.get('/signin', function(req, res){
  res.render('signin');
});





//===============PORT=================
var port = process.env.PORT || 3000; //select your port or let it pull from your .env file
app.listen(port);
console.log("listening on " + port + "!");