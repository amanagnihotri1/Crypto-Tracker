import mongoose from "mongoose";
const cryptoSchema=new mongoose.Schema
({
 name:String,
 last:Number,
 sell:Number,
 buy:Number,
 volume:Number,
 base_unit:String,   
});
const cryptoschema=mongoose.model('cryptoapp',cryptoSchema);
export default cryptoschema;