import mongoose from "mongoose";

export const transactionSchema=new mongoose.Schema({
    tx_type:{type:String},
    tx_details:[
        {item_affected:{type:mongoose.Types.ObjectId, ref:'Drug'}, stock_in:{type:String}, stock_out:{type:String}, profit:{type:Number}}
    ],
    tx_total:{type:String}

},{timestamps:true})