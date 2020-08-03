const express 	 = require("express");
	  app 		 = express();
	  bodyParser = require("body-parser");
	  mongoose   = require("mongoose");
	  passport   = require('passport');
	  LocalStrategy = require('passport-local');
	  Campground = require("./models/campground");
	  Comment	 = require("./models/comment")
	  User		 = require('./models/user');
      seedDB	 = require("./seed");
	  methodOverride = require("method-override");
	  flash		 = require("connect-flash");

const port = process.env.PORT || 3000;

//requiring routes
const indexRoute 		= require("./Routes/index"),
	  campgroundsRoute 	= require("./Routes/campgrounds"),
	  commentsRoute		= require("./Routes/comments");

//seedDB();  //seed the database

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(flash());

//this got rid of a Deprication Warning 
mongoose.set('useUnifiedTopology', true);


let url = process.env.DATABASEURL || "mongodb://localhost:27017/yelp_camp";

mongoose.connect(url, {useNewUrlParser: true});
// mongoose.connect("mongodb+srv://germcarthief:11Mongonow1@cluster0.rkkiu.mongodb.net/yelp_camp?retryWrites=true&w=majority", {useNewUrlParser: true});

// PASSPORT CONFIGURATION
app.use(require('express-session')({
	secret: 'Once again rust wins cutest dog',
	resave: false,
	saveUninitialize: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//passes currentUser into all the pages
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.success = req.flash("success");
	res.locals.error =	 req.flash("error");
	next();
});


app.use(indexRoute);
app.use("/campgrounds", campgroundsRoute);
app.use("/campgrounds/:id/comments", commentsRoute);

app.listen(port, function(){
	console.log("YelpCamp is cranking")
})