// require models
let Campground = require("../models/campground");
let Comment = require("../models/comment");

//make object
let middlewareObj = {};
//middleware
middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} 
	req.flash("error", "Please Log In");
	res.redirect('/login');
};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
	//is user logged in?
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, (err, foundCampground)=>{
			if(err){
			console.log(err);
			res.redirect("back");
		} //is user owner of page
			else {
				if(foundCampground.author.id.equals(req.user._id)){
				next();
				} else {
					res.redirect("back");
				}
		}
	})
	}else{res.redirect("back");}
};

middlewareObj.checkCommentOwnership = function (req, res, next){
	//is user logged in?
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, (err, foundComment)=>{
			if(err){
			console.log(err);
			res.redirect("back");
		} //is user owner of page?
			else {
				if(foundComment.author.id.equals(req.user._id)){
				next();
				} else {
					res.redirect("back");
				}
		}
	})
	}else{res.redirect("back");}
};

//export middleware

module.exports = middlewareObj;