var express = require('express');
var passport = require('../auth/auth');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  //Redirect if not a user
  if (!req.user) {
    res.redirect('/login');
  } else {
    res.render('index', { title: 'Express' });
  }
});

/* GET login page */
router.get('/login', function(req, res) {
  res.render('login');
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
