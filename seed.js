let mongoose = require("mongoose"),
	Campground = require("./models/campground");
	Comment = require("./models/comment");

let data = [
	{name: "Devil's Pass",
	image: "https://images.unsplash.com/photo-1513476395295-fcf532934d17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
	description: "I'm baby ugh selfies raw denim blog, truffaut man bun synth artisan XOXO mixtape offal. Whatever cronut before they sold out ramps. Fingerstache man bun synth put a bird on it vexillologist succulents. Intelligentsia ugh gastropub vinyl four loko truffaut humblebrag poke typewriter activated charcoal sriracha pug cray tumblr. Sustainable poutine air plant vice literally selvage."
	},
	{name: "White Gulch",
	image: "https://images.unsplash.com/photo-1580177218421-dc6cc19ec60e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
	description: "Taxidermy normcore celiac, trust fund fixie tumblr roof party prism blue bottle aesthetic art party seitan green juice beard twee. Shabby chic single-origin coffee hashtag sartorial blog tofu direct trade XOXO etsy la croix brunch. Austin fingerstache farm-to-table selvage. Yuccie intelligentsia sriracha leggings poutine deep v"
	},
	{name: "Canyon Spree",
	image: "https://images.unsplash.com/photo-1555703484-89d93b41e658?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
	description: "Prism dreamcatcher try-hard polaroid selvage, vegan selfies listicle mustache tote bag forage hammock single-origin coffee sustainable af. Raw denim chartreuse skateboard vinyl mlkshk mixtape, single-origin coffee portland cornhole. Ramps polaroid keffiyeh mustache sartorial four dollar toast. Coloring book keytar tote bag, four dollar toast letterpress prism jianbing echo park next level vegan food truck distillery celiac 90's kinfolk. Distillery DIY fingerstache pop-up post-ironic next level YOLO vinyl food truck iPhone tilde tumeric flannel cliche. Vaporware wayfarers copper mug air plant farm-to-table pitchfork."
	}
		   ]

function seedDB() {
	
	//REMOVE ALL CAMPGROUNDS
	Campground.deleteMany({}, (err)=>{
		if(err){
			console.log(err)
		} else{
			console.log("campgrounds removed");
			//ADD CAMPGROUNDS
			data.forEach(function(seed){
				Campground.create(seed,function(err, newCampground){
					if(err){
						console.log(err)
					} else {
						console.log("campground added");
						Comment.create({
							text: "this place is great, but I wish it had internet",
							author: "Homer"
						}, (err, comment)=>{
							if(err){
								console.log(err)
							}else{
								newCampground.comments.push(comment);
								newCampground.save((err,data)=>{
									if(err){
										console.log(err)
										   } else {console.log("comment added")}
								
									
								})
							}
						
						
							})
					}
				})
			})
		}
})}
	
	//ADD COMMENTS

module.exports = seedDB;