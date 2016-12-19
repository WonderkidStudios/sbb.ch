require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');

var passport = require('passport');
/*
var LocalStrategy = require('passport-local').Strategy;
var BasicStrategy = require('passport-http').BasicStrategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
*/

var mongoose = require('mongoose');
var _ = require('lodash');

var User = require('./models/users.js').User;

var api = require('./api.js');
var dataManager = require('./lib/data.manager.js');
var proxyManager = require('./lib/proxy.manager.js');
var settings = require('./config/settings.js');
var trips =  require('./trips/trips.js');

/*
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      return done(null, user);
    });
  }
));

passport.use(new BasicStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      return done(null, user);
    });
  }
));

var opts = {}
opts.jwtFromRequest = ExtractJwt.versionOneCompatibility({authScheme: 'Bearer'});
opts.secretOrKey = settings.secret;

passport.use(new JwtStrategy(
  opts,
  function(jwt_payload, done) {
    User.findOne({ _id: jwt_payload._id }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      return done(null, user);
    });
  }
));


function ifUserAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    res.status(401).json({ success: false, message: 'Not an admin.' });
    return;
  }
  next();
}

*/
require('./lib/auth.manager.js').authSetup(passport, settings);

var app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

/*
//app.use('/trips', express.static('public'));
app.get('/trips', function (req, res) {
  trips.proxy = proxyManager.getProxies();
  trips.tt = 0;
  result = '';
  i=0;
  
  (function f(i) {
  if (i > 24){ res.send((result)); return;}
    trips._getTrips(req, res, function(rs) {
      result += rs;
      f(i+1);
    });
  })(1);
  //trips._getTrips(req, res, function(rs) {res.send((rs))});
  
  
});
*/
app.use(morgan('dev'));
app.use(passport.initialize());

/*
app.post('/authenticate', function(req, res) {
  var username = req.body.name;
  var password = req.body.password;
  // check if password matches
  User.findOne({ username: username }, function (err, user) {
      if (err) {
      console.log("ERR authenticate: findOne: " + err);
      res.json({ success: false, message: 'Authentication failed.' });
      return;
        }
    if (!user) {
      res.json({ success: false, message: 'User not found.' });
      return;
      }
    if (!user.validPassword(password)) {
      res.json({ success: false, message: 'Password is wrong.' });
      return;
  }
    var token = user.generateJwt();
    res.json({
      success: true,
      message: 'Token sent',
      token: token
    });
    });
});

app.get('/authenticate', passport.authenticate('jwt', { session: false }), function(req, res) {
  res.send("OK");
});
*/

require('./routes.js')(app, passport);

mongoose.connect('mongodb://127.0.0.1:27017/crawler2api');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  proxyManager.loadProxies(function(err) {
    if (err) {
      console.log("Error loading proxies");
    }
    app.listen(settings.serverPort, function () {
      console.log('Server listening on port ' + settings.serverPort + '!');
    });
  });
});

