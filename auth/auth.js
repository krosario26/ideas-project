var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../db/users');

    passport.use(new LocalStrategy(
      function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
          if (err) { return done(err); }
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (!user.password) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        });
      }
    ));

    passport.serializeUser(function(user, done) {
    	done(null, user.username);
    });

    passport.deserializeUser(function(username, done) {
    	done(null, {username: username});
    });

module.exports = passport;
