var express = require("express");
var 	  router  = express.Router({mergeParams: true});
var  Campground = require("../models/campground");
var	  Comment = require("../models/comment");
let 	middleware = require("../Middleware");

//Comments new
router.get("/new", middleware.isLoggedIn, (req, res)=> {
	Campground.findById(req.params.id, (err,campground) =>{
	if(err){
		console.log(err)
	}else{
	res.render("comments/new", {campgrounds: campground});
	}
	})
})
//Comments create
router.post("/", middleware.isLoggedIn, (req, res) => {
	Campground.findById(req.params.id, (err, campground) =>{
		if(err){
			console.log(err);
			res.redirect('/campgrounds/');
		} else{
			Comment.create(req.body.comment, (err, comment)=>{
				if(err){
			console.log(err);
			} else {
				//add username & id
				console.log(req.user._id);
				comment.author.id = req.user._id;
				comment.author.username = req.user.username;
				//save comment
				comment.save();
				campground.comments.push(comment);
				campground.save();
				res.redirect('/campgrounds/' + campground._id);
		}
	})
		}
	})
	
});

//Update
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res)=>{
	Comment.findById(req.params.comment_id, (err, foundComment)=>{
		if(err){
			res.redirect("back");
		} else{
			console.log(foundComment);
			res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
		}
	})
	
});

router.put("/:comment_id", middleware.checkCommentOwnership, (req, res)=>{
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, foundComment)=>{
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
})

//Delete Comment
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res)=>{
	Comment.findByIdAndRemove(req.params.comment_id, (err)=>{
		if(err){
			res.redirect("back");
		} else {
			req.flash("success", "Your comment has been removed");
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
});


module.exports = router;