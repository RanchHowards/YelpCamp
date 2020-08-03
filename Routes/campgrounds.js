const express = require("express"),
	  router  = express.Router(),
	  Campground = require("../models/campground"),
	  User = require("../models/user"),
	  Comment = require("../models/comment"),
	  middleware = require("../Middleware");

//INDEX
router.get("/", function(req, res){
	Campground.find({}, function(err, campgrounds){
		if(err){
			console.log(err);
		} else {
			res.render('campgrounds/index', {campgrounds:campgrounds});}
	})
	
	
});


//CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
	let name = req.body.name;
	let image = req.body.image;
	let desc = req.body.description;
	let price = req.body.price;
	let author = {
		id: req.user._id,
		username: req.user.username
	};
	let newCampground = {name: name, price: price, image: image, description: desc, author: author};
	
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else{
			res.redirect("/campgrounds")
		}
	})
	
	
});

//NEW
router.get("/new",middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});

//SHOW
router.get("/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			console.log(foundCampground);
		res.render("campgrounds/show", {campgrounds: foundCampground});	
		}
	});
});

//Edit
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res)=>{
	Campground.findById(req.params.id, (err, foundCampground)=>{
		if(err){
			res.redirect("back");
		} else {
			res.render("campgrounds/edit", {campgrounds: foundCampground});}
	})
});
//Update
router.put("/:id", middleware.checkCampgroundOwnership, (req, res)=>{
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, foundCampground)=>{
		if(err){
			console.log(err);
			res.redirect("/");
		}else{
			req.flash("success","Successfully updated the campground");
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
})

//Destroy
router.delete('/:id', middleware.checkCampgroundOwnership, (req, res)=>{
	Campground.findByIdAndRemove(req.params.id, (err)=>{
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else{
			req.flash("success", "Campground deleted");
			res.redirect("/campgrounds");
		}
	})
})


module.exports = router;
