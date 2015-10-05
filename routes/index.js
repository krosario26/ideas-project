var express = require('express');
var passport = require('../auth/auth');
var User = require('../db/users');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  //Redirect if not a user
  if (!req.user) {
    res.redirect('/signup');
  } else {
    res.render('index', { title: 'Express', username: req.user.username });
  }
});

/* GET register page */
router.get('/signup', function(req, res) {
  res.render('signup', { title: 'Express' });
});

/* Register new user */
router.post('/signup', function(req, res) {
  var newUser = new User();
  newUser.fullName = req.body.fullName;
  newUser.email = req.body.email;
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
  failureRedirect: '/signup'
}));

/* Logout from your session */
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('signup');
})

/* Wrong url redirect to home page or log in page */
router.get('*', function(req, res) {
  res.redirect('/');
});

module.exports = router;
