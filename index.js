const express=require("express");
require("dotenv").config();
const cors=require("cors");
const {connection}=require("./configs/db");
const {UserRouter}=require("./routes/user.route");
const { authenticate } = require("./middleware/db");
const { ProductRouter } = require("./routes/product.route");


const app=express();
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("The home page");
})

app.use("/user",UserRouter);

app.use(authenticate);

app.use("/product",ProductRouter)

app.listen(process.env.port,async()=>{
    await connection;
    console.log(`The server is running at port ${process.env.port}`)
})