const express = require('express'),
  router = express.Router(),
  User = require('../models/user'),
  passport = require('passport')
// middleware = require("../Middleware");

//Root Route
router.get('/', function (req, res) {
  res.render('landing')
})

//AUTH ROUTES

//show register form route
router.get('/register', (req, res) => {
  res.render('register')
})

//handle sign-up logic route
router.post('/register', (req, res) => {
  let newUser = new User({ username: req.body.username })
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err)
      req.flash('error', err.message)
      return res.redirect('register')
    }
    passport.authenticate('local')(req, res, function () {
      req.flash('success', 'Welcome To YelpCamp ' + user.username + ', dawg')
      res.redirect('/campgrounds')
    })
  })
})

//login form
router.get('/login', (req, res) => {
  res.render('login')
})

//handling login logic
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login',
  }),
  (req, res) => {}
)

//logout route
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success', 'Successfully logged you out')
  res.redirect('/campgrounds')
})

module.exports = router
