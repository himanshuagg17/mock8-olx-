const express=require("express");

const bcrypt=require('bcrypt');
const { UserModel } = require("../models/user.model");
const jwt=require("jsonwebtoken");

const UserRouter=express.Router();

UserRouter.post("/signup",async(req,res)=>{
    let {name,email,password}=req.body;

    try{
       bcrypt.hash(password,5,async(err,data)=>{
        if(err){
            res.send("the password was not hashed");
        }
        else{
            let user=new UserModel({
                name,
                email,
                password:data
            })
            
            await user.save();
            res.send("The user has been registered");
        }
       })
    }
    catch(err){
         res.send(err.message);
    }
})


UserRouter.post("/login",async(req,res)=>{
    let {email,password}=req.body;

    let user=await UserModel.find({email});

    if(user.length>0){
        bcrypt.hash(password,user[0].password,async(err,data)=>{
            if(err){
                res.send("the password does not match");
            }
            else if(data){
                let token=jwt.sign({userID:user[0]._id},"himanshu");
                res.send({"message":"The user has been logged in","token":token})

            }
        })
    }
    else{
        res.send("the user was not found");
    }
})

module.exports={
    UserRouter
}