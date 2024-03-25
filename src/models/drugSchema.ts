import mongoose from "mongoose";

export const drugSchema=new mongoose.Schema({
    item_name:{type:String,required:true},
    item_price:{type:String, required:true},
    manufacturer_id:{type:mongoose.Types.ObjectId,ref:'Manufacturer', required:false},
    barcode_no:{type:String, required:false},
    in_stock:{type:Number, required:true}
},{timestamps:true})