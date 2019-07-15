var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
	Campground     = require("./models/campground"),
	Comment        = require("./models/comment"),
	seedDB         = require("./seeds"),
	User           = require("./models/user"),
	methodOverride = require("method-override"),
	flash          = require("connect-flash");

var commentRoutes    = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	indexRoutes      = require("./routes/index");
// ==================
// DB CONFIG
// ==================
//seedDB();
mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
// ==================
// APP CONFIG
// ==================
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
// ==================
// PASSPORT CONFIG
// ==================
app.use(require("express-session")({
	secret: "This is my YelpCamp",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// passing user to every route
app.use(function(req,res,next){
	res.locals.user = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
})

// ==================
// ROUTES CONFIG
// ==================
app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

// ==================
// SERVER SETUP
// ==================
app.listen(3001,function(){
	console.log("YelpCamp started and serving at port 3001...");
});