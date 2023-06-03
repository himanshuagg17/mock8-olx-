const bcrypt=require("bcrypt");

const express=require("express");

const {ProductModel}=require("../models/products.model");

const ProductRouter=express.Router();

ProductRouter.get("/",async(req,res)=>{
    try{
        const products=await ProductModel.find();

        res.send(products)
    }
    catch(err){
        res.send(err.message);
    }
})


ProductRouter.post("/add",async(req,res)=>{
    try{
        const payload=req.body;

        const products=new ProductModel(payload);

        await products.save();
        res.send("the product has been added");
    }
    catch(err){
        res.send("product not added");
    }
})

ProductRouter.delete("/:id",async(req,res)=>{
    let id=req.params.id;

    await ProductModel.findByIdAndDelete(id);
    res.send("the product has been deleted");
})

ProductRouter.patch("/:id",async(req,res)=>{
    let id=req.params.id;

    let data=req.body;

    await ProductModel.findByIdAndUpdate(id,data);

    res.send("product updated");
})

module.exports={
    ProductRouter
}