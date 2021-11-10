const express = require('express')
app = express()
bodyParser = require('body-parser')
mongoose = require('mongoose')
passport = require('passport')
session = require('express-session')
LocalStrategy = require('passport-local')
Campground = require('./models/campground')
Comment = require('./models/comment')
User = require('./models/user')
seedDB = require('./seed')
methodOverride = require('method-override')
flash = require('connect-flash')

// require('dotenv').config() //comment this out when pushing to Heroku

const PORT = process.env.PORT || 3000

//requiring routes
const indexRoute = require('./Routes/index'),
  campgroundsRoute = require('./Routes/campgrounds'),
  commentsRoute = require('./Routes/comments')

// seedDB() //seed the database

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(flash())

//this got rid of a Deprication Warning
mongoose.set('useUnifiedTopology', true)

let url = process.env.DATABASEURL || 'mongodb://localhost:27017/yelp_camp'

mongoose.connect(url, { useNewUrlParser: true })

const SECRET = process.env.SECRET

// PASSPORT CONFIGURATION
const sessionConfig = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true, //this was false
  cookie: {
    httpOnly: true, //added layer of security
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, //Date.now() gives date in miliseconds, the numbers to the right make it a week later
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
}
app.use(session(sessionConfig))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//passes currentUser into all the pages
app.use(function (req, res, next) {
  currentUser = req.user
  res.locals.success = req.flash('success')
  res.locals.error = req.flash('error')
  next()
})

app.use(indexRoute)
app.use('/campgrounds', campgroundsRoute)
app.use('/campgrounds/:id/comments', commentsRoute)
app.get('*', (req, res) => {
  res.render('noMatch')
})

app.listen(PORT, function () {
  console.log('YelpCamp is cranking')
})
