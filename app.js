var e= require("express"),bodyparser=require("body-parser"),mongoose=require("mongoose"),methodOverride=require("method-override");
var app=e();
Schema=mongoose.Schema;
var passport= require("passport"),LocalStrategy= require("passport-local"),passportLocalMongoose= require("passport-local-mongoose");
var User= require("./models/user");

mongoose.connect("mongodb://Deepansh:Ketan15@ds229732.mlab.com:29732/new_app", { useNewUrlParser: true });
app.set("view engine","ejs");
app.use(e.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(methodOverride("_method"));

app.use(e.static('assets'));

app.use(require("express-session")({
	secret: "I,Deepansh Nagaria am the best developer in IIT Roorkee and I made this site for ARIES IITR",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	next();
})

var nameSchema=new mongoose.Schema({
	name:String,
	features:[{
		type:String
	}]
})
var Name=mongoose.model("Name",nameSchema);


var finalProductSchrma=new mongoose.Schema({
	name:String,
	category:String,
	subcategory:String,
	price:Number,
	features:[{type:String}],
	description:[{type:String}],
	image:String
})
var FinalProduct=mongoose.model("FinalProduct",finalProductSchrma);

var subcategorySchema=new mongoose.Schema({
	name:String,
	//names:[nameSchema],
	subcategoryFeatures:[{type:String}],
	subcategoryDescription:[{type:Array}],
	subcategoryDisplay:String
})
var Subcategory=mongoose.model("Subcategory",subcategorySchema);

var categorySchema=new mongoose.Schema({
	name:String,
	subcategories:[subcategorySchema]
})
var Category=mongoose.model("Category",categorySchema);


/*app.get("/newProduct",isLoggedIn,function(req,res){
	res.render("newProduct");
})*/

/*app.get("/register",function(req,res){
	res.render("signup");
})

app.post("/register",function(req,res){
	User.register(new User({username:req.body.username}),req.body.password,function(err,user){
		if(err){
			console.log(err);
			//console.log(req.body.username);
			return res.render('signup');
		}
		passport.authenticate("local")(req,res,function(){
			res.redirect("/newProduct");
		})
	})
})*/
app.get("/login", function(req,res){
	res.render("login");
})
app.post("/login",passport.authenticate("local",{
	successRedirect:"/newProduct",
	failureRedirect:"/login"}),function(req,res){

})
app.get("/logout",function(req,res){
	req.logout();
	res.redirect("/");
})
function isLoggedIn(req,res,next){
	//console.log(req.isAuthenticated());
	if(req.isAuthenticated()){
		return next();
	}
	else
		res.redirect("/login");
}

/*Category.create({
	name:"Electronics",
	subcategories:[{
		name:"Laptops",
		subcategoryFeatures:["Brand","Screen","Battery","HDD","SSD","RAM"]
	}]
},function(err,e){});*/
/*Subcategory.create({
		name:"Laptops",
		names:[{
			name:"Acer nitro 5",
			features:["warranty"]
		},function(err,e){});
Name.create({
			name:"Acer nitro 5",
			features:["warranty"]
		},function(err,e){});*/
/*Category.create({
	name:"Food",
	subcategories:[{
		name:"Snacks",
		names:[{
			name:"Lays",
			features:["flavour"]
		}]
	}]
},function(err,e){});*/
/*var po=new Subcategory({
	name:"Desktop",
	names:[{
			name:"SuperComputer",
			features:["warranty"]
		}]
})*/
/*Category.findAndUpdate({name:"Electronics"},function(err,cat){
	cat.subcategories.push(po);
})*/
/*var categoriesSchema=new mongoose.Schema({
	list:[categorySchema]
})*/
/*var Categories=mongoose.model("Categories",categoriesSchema);*/

app.get("/newProducts",isLoggedIn,function(req,res){
	Category.find({},function(err,fg){
		if(err)
		{
			/*console.log("========================");
			console.log(err);
			console.log("========================");*/
		}
		res.render("newProduct",{categories:fg});
	})
})
app.get("/newProduct",isLoggedIn,function(req,res){
	res.render("question");
})

app.post("/newCategory",function(req,res){
	Category.create({name:req.body.name},function(err,category){
		res.redirect("/newProducts");
	})
})
app.post("/newProduct",function(req,res){
	if(req.body.choice=="1")
	{
		var id;
		Category.findOne({name:req.body.category},function(err,subcat){
			id=subcat._id;
			for(var i=0;i<subcat.subcategories.length;i++)
				{
					if(subcat.subcategories[i].name==req.body.subcategory){
						//console.log("found");
						for(var j=0;j<req.body.feature.length;j++){
							subcat.subcategories[i].subcategoryFeatures.push(req.body.feature[j]);
							subcat.subcategories[i].subcategoryDescription.push(req.body.answer[j].split(","));
						subcat.subcategoryDisplay=req.body.subcategoryDisplay;
						}
						//console.log(subcat.subcategories[i].subcategoryFeatures);
					}
				}
				/*console.log(req.body.answer);*/
			subcat.save(function(err,aa){
				/*console.log(aa);*/
			})
		})
		/*console.log(id);*/
		Subcategory.findByIdAndUpdate(id,{$push:{subcategoryFeatures:req.body.features}},function(err,subcat){
			/*console.log(subcat);*/
		})
	}
	else{
		var temp=[];
		for(var j=0;j<req.body.feature.length;j++){
			/*console.log(req.body.answer[j]);
			console.log(req.body);*/
			temp.push(req.body.answer[j].split(","));
		}
		var aa=new Subcategory({
			name:req.body.subcategoryName,
			subcategoryFeatures:req.body.feature,
			subcategoryDescription:temp,
			subcategoryDisplay:req.body.subcategoryDisplay
		})
		/*console.log(req.body.answer);*/
		aa.save(function(req,res){
			/*console.log(aa);*/
		})
		Category.findOne({name:req.body.category},function(err,subcat){
			subcat.subcategories.push(aa);
			subcat.save(function(err,bb){
				/*console.log(bb);*/
			})
		})

	}
	res.redirect("/");
})











var featureSchema=new mongoose.Schema({
	feature:String,
	description:String
});
var Feature=mongoose.model("Feature",featureSchema);

var product=new mongoose.Schema({
	category:String,
	subcategory:String,
	image:String,
	cost:Number,
	features:[featureSchema]
});
var Product=mongoose.model("Product",product);


app.get("/",function(req,res){
	res.render("Welcome");
})

app.get("/contact",function(req,res){
	res.render("message");
})

app.get("/sell",function(req,res){



	Category.find({},function(err,categories){
		res.render("sell",{categories:categories});
	})
	
})


app.post("/sell",function(req,res){
	console.log(req.body);
	FinalProduct.create({
		name:req.body.name,
		category:req.body.category,
		subcategory:req.body.subcategory,
		features:req.body.feature,
		description:req.body.description,
		image:req.body.image,
		price:req.body.price
	},function(err,ans){
		/*console.log(ans);*/
		res.redirect("/");
	})
	//console.log(req.body);
	/*res.redirect("/");*/
})



app.get("/thanks",function(req,res){
	res.render("thanks");
})

app.get("/coming_soon",function(req,res){
	res.render("coming_soon");
})

app.post("/sell",function(req,res){






	/*Product.create({
		category:req.body.category,
		subcategory:req.body.subcategory
	},function(err,newProduct){
		for(var i=0;i<req.body.feature.length;i++){
			Feature.create({
				feature:req.body.feature[i],
				description:req.body.description[i]
			},function(err,newFeature){
				newProduct.features.push(newFeature);
				console.log(newProduct.features.length);
				/*newProduct.save();
			})
		}
	})*/
	var p=new Product({
		category:req.body.category,
		subcategory:req.body.subcategory,
		image:req.body.image,
		cost:req.body.price
	});
	for(var i=0;i<req.body.feature.length;i++){
		p.features.push({
			feature:req.body.feature[i],
			description:req.body.description[i]
		});
	}
	p.save(function(err,product){
		//console.log(product);
	})
	
	res.redirect("/buy");
})

app.get("/buy/filter",function(req,res){
	Category.find({},function(err,categories){
		res.render("filter",{categories:categories});
	})
})

app.post("/buy",function(req,res){
	/*console.log(req.body);*/
	res.redirect("/buy/"+req.body.category+"/"+req.body.subcategory);
})

app.get("/buy/:category/:subcategory",function(req,res){
	FinalProduct.find({},function(err,products){
		res.render("buy",{products:products,category:req.params.category,subcategory:req.params.subcategory});
	})
})

/*app.get("/edit",function(req,res){
	Category.find({},function(err,categories){
		
		res.render("edit",{categories:categories});
	})
})
app.post("/editCategory",function(req,res){
	Category.findByIdAndUpdate(req.body.category,{name:req.body.newcategory},function(err,b){
		res.redirect("/sell");
	})
})
app.post("/editSubCategory",function(req,res){
	Subcategory.findByIdAndUpdate(req.body.subcategory,{name:req.body.newcategory},function(err,b){
		res.redirect("/sell");
	})
})*/


app.listen(3000,function(){
	console.log("Running");
});
/*app.listen(process.env.PORT,process.env.IP,function(){
	console.log("Running");
});*/
