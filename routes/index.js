var express = require('express');
var passport = require('../auth/auth');
var User = require('../db/users');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  //Redirect if not a user
  if (!req.user) {
    res.redirect('/login');
  } else {
    res.render('index', { title: 'Express', username: req.user.username });
  }
});

/* GET register page */
router.get('/register', function(req, res) {
  res.render('register', { title: 'Express' });
});

/* GET login page */
router.get('/login', function(req, res) {
  res.render('login');
});

/* Register new user */
router.post('/register', function(req, res) {
  var newUser = new User();
  newUser.username = req.body.username;
  newUser.password = req.body.password;
  console.log(newUser.username + " " + newUser.password);
  newUser.save(function(err) {
    if (err) {
      throw err;
    }
    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
});

/* Post login form from login view*/
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

/* Logout from your session */
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('login');
})

/* Wrong url redirect to home page or log in page */
router.get('*', function(req, res) {
  res.redirect('/');
});

module.exports = router;
