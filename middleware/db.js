

const jwt=require("jsonwebtoken");

const authenticate=async(req,res,next)=>{
    let token=req.headers.authorization;

    if(token){
        jwt.verify(token,"himanshu",(err,decoded));

        if(decoded){
            req.body.user=decoded.userID;
            next();
        }
        else{
            res.send({"message":"please login first"});
        }
    }
    else{
        res.send({"messae":"please login first"});
    }
}

module.exports={
    authenticate
}