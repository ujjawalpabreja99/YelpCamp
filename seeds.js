var mongoose   = require("mongoose"),
	Campground = require("./models/campground"),
	Comment    = require("./models/comment");


var data = [
	{
		name:"Connoor Valley",
		image:"https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c732d78d59145cc5b_340.jpg",
		description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name:"Solang Valley",
		image:"https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c732d78d59145cc5b_340.jpg",
		description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name:"Spiti Valley",
		image:"https://pixabay.com/get/57e2d54b4852ad14f6da8c7dda793f7f1636dfe2564c704c732d78d59145cc5b_340.jpg",
		description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	}
]


function seedDB(){
	// Delete all campgrounds
	Campground.deleteMany({},function(err){
		if(err){
			console.log(err);
		}
		else{
			console.log("Removed");
		}
		//Add new campgrounds
		data.forEach(function(seed){
			Campground.create(seed,function(err,campground){
				if(err){
					console.log(err);
				}
				else{
					console.log("Added data");
					//Add comment to the newly added campground
					Comment.create({
						text:"Kaafi sundar jagah",
						author:"Gully boy"
					},function(err,comment){
						if(err){
							console.log(err);
						}
						else{
							campground.comments.push(comment);
							campground.save();
							console.log("Comment Added");
						}
					});
				}
			});
		});
	});
}

module.exports = seedDB;