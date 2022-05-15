import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
import cryptodt from "./models/cryptodata.js";
import express from "express";
import ejs from "ejs";
import fetch from "node-fetch";
const app=express();
app.set("view engine","ejs");
mongoose.connect("mongodb+srv://Aman:Nahipata1@cluster0.kwlnx.mongodb.net/cryptodb?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>
 console.log("connected successfully")   
).catch(err=> console.log(err)
)
app.use(express.static("views"));
const url="https://api.wazirx.com/sapi/v1/tickers/24hr";
app.get("/",async(req,res)=>
{
   
       const response= await fetch(url,{method:"GET"});
       const data=await response.json();
       for(let i=0;i<10;i++)
       {

     cryptodt.create(
         {  name:data[i].symbol,
            last:data[i].lastPrice,  
            sell:data[i].askPrice,
            buy:data[i].bidPrice,
            base_unit:data[i].baseAssest,
            volume:data[i].volume,       
            });
        }
       res.render("main",{crpval:data});
    
});
app.listen(process.env.PORT,(err)=>
{
    if(err)
    {
        res.json({err});
    }
    else
    {
        console.log("server successfully running at port 3000");
    }
})