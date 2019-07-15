var middlewareObj = {};
var Campground    = require("../models/campground");
var Comment       = require("../models/comment");

middlewareObj.checkCampgroundOwner = function(req,res,next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err,campground){
			if(err){
				req.flash("error","Something unusual happened :(");
				res.redirect("back");
			}
			else{
				if(campground.author.id.equals(req.user._id)){
					next();
				}
				else{
					req.flash("error","Permission denied!");
					res.redirect("/campgrounds/"+campground._id);
				}
			}
		});
	} else {
		req.flash("error","You need to be logged in to do that!");
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwner = function(req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err,comment){
			if(err){
				req.flash("error","Something unusual happened :(");
				res.redirect("back");
			}
			else{
				if(comment.author.id.equals(req.user._id)){
					next();
				}
				else{
					req.flash("error","Permission denied!");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error","You need to be logged in to do that!");
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","You need to be logged in to do that!");
	res.redirect("back");
}

module.exports = middlewareObj;