var express    = require("express"),
	router     = express.Router({mergeParams: true}),
	Campground = require("../models/campground"),
	Comment    = require("../models/comment"),
	middleware = require("../middleware");

//====================
// COMMENT ROUTES 
//====================
// COMMENT NEW ROUTE
router.get("/new",middleware.isLoggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
			req.flash("error","Something unusual happened :(");
		}
		else{
			res.render("comments/new",{campground: campground});
		}
	});
});
// COMMENT CREATE ROUTE
router.post("/",middleware.isLoggedIn,function(req,res){
	//finding campground
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
			req.flash("error","Something unusual happened :(");
			res.redirect("back");
		}
		else{
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					console.log(err);
					req.flash("error","Something unusual happened :(");
					res.redirect("back");
				}
				else {
					// add username to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					//add comment to campground
					campground.comments.push(comment);
					//save campground
					campground.save();
					req.flash("success","Comment added successfully!");
					res.redirect("/campgrounds/"+req.params.id);
				}
			});
		}
	});
});
// COMMENT EDIT ROUTE
router.get("/:comment_id/edit",middleware.checkCommentOwner,function(req,res){
	Comment.findById(req.params.comment_id,function(err,comment){
		if(err){
			req.flash("error","Something unusual happened :(");
			res.redirect("back");
		} else {
			Campground.findById(req.params.id,function(err,campground){
				if(err){
					req.flash("error","Something unusual happened :(");
					res.redirect("back");
				} else {
					res.render("comments/edit",{campground: campground,comment: comment});
				}
			});
		}
	});
});
// COMMENT UPDATE ROUTE
router.put("/:comment_id",middleware.checkCommentOwner,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,comment){
		if(err){
			res.redirect("back");
		} else {
			req.flash("success","Comment edited successfully!");
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});
// COMMENT DESTROY ROUTE
router.delete("/:comment_id",middleware.checkCommentOwner,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			req.flash("error","Something unusual happened :(");
			res.redirect("back");
		} else {
			req.flash("success","Comment deleted successfully!");
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
});

module.exports = router;