const mongoose=require("mongoose");

const ProductSchema=mongoose.Schema({
        "name": String,
		"description" : String,
		"category" : String,
		"image" :String,
		"location" : String,
		"postedAt" : Date,
		"price" : Number
		
})

const ProductModel=mongoose.model("products",ProductSchema);

module.exports={
    ProductModel
}