var e= require("Express"),bodyparser=require("body-parser"),mongoose=require("mongoose"),methodOverride=require("method-override");
var app=e();
Schema=mongoose.Schema;

mongoose.connect("mongodb://Deepansh:Deepansh15@ds127342.mlab.com:27342/nagariastore", { useNewUrlParser: true });
app.set("view engine","ejs");
app.use(e.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(methodOverride("_method"));

app.use(e.static('assets'));

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
	res.render("sell");
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

app.get("/buy",function(req,res){
	Product.find({},function(err,products){
		res.render("buy",{products:products});
	})
})


app.listen(3000,function(){
	console.log("Running");
});
