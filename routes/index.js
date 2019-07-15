var express  = require("express"),
	router   = express.Router(),
	passport = require("passport"),
	User     = require("../models/user");

// Root route
router.get("/",function(req,res){
	res.render("home");
});

// =============
// AUTH ROUTES
// =============
// show register form
router.get("/register",function(req,res){
	res.render("register");
});
// handling newly registered user
router.post("/register",function(req,res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password,function(err,user){
		if(err){
			req.flash("error",err.message);
			return res.redirect("back");
		}
		passport.authenticate("local")(req,res,function(){
			req.flash("success","Hi " + user.username +"! Welcome to Ujjawal's Yelpcamp " );
			res.redirect("/campgrounds");
		});
	}); 
});
// show login form
router.get("/login",function(req,res){
	res.render("login");
});
// handling login 
router.post("/login",passport.authenticate("local",{
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
	}),function(req,res){
});
// hangling logout
router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","Logged out!");
	res.redirect("back");
});

// middleware functions
function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	return res.redirect("/login");
}

module.exports = router;