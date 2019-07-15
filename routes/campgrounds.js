var express    = require("express"),
	Campground = require("../models/campground"),
	router     = express.Router({mergeParams: true}),
	middleware = require("../middleware");

// INDEX ROUTE
router.get("/",function(req,res){

	Campground.find({},function(err,allCampgrounds){
		if(err){
			console.log("SOME ERROR OCCURED");
			console.log(err);
		}
		else{
			res.render("campgrounds/index",{campgrounds: allCampgrounds});
		}
	});
});
// CREATE ROUTE
router.post("/",middleware.isLoggedIn,function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var author = {
		username: req.user.username,
		id: req.user._id
	};
	var price = req.body.price;
	var newCampground = {name: name,image: image, description: description, author: author, price: price};
	Campground.create(newCampground,function(err,newCampground){
		if(err){
			console.log(err);
		}
		else{
			res.redirect("/campgrounds");
		}
	});
});
// NEW ROUTE
router.get("/new",middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/new");
});

//SHOW ROUTE - description of every campground
router.get("/:id",function(req,res){

	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}
		else{
			res.render("campgrounds/show",{campground: foundCampground});
		}
	});
});

// EDIT ROUTE
router.get("/:id/edit",middleware.checkCampgroundOwner,function(req,res){
	Campground.findById(req.params.id, function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds/"+req.params.id);
		}
		else{
			res.render("campgrounds/edit",{campground: campground});
		}
	});
	
});
// UPDATE ROUTE
router.put("/:id",middleware.checkCampgroundOwner,function(req,res){
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds/"+req.params.id);
		}
		else{
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});
// DESTROY ROUTE
router.delete("/:id",middleware.checkCampgroundOwner,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}
		else{
			res.redirect("/campgrounds");	
		}
	});
});

module.exports = router;