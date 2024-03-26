import mongoose, { Mongoose } from "mongoose";

export const transactionSchema=new mongoose.Schema({
    tx_type:{type:String},
    mode_of_payment:{type:String},
    tx_details:[
        {item_affected:{type:mongoose.Types.ObjectId, ref:'Drug'}, stock_in:{type:Number}, stock_out:{type:Number},selling_price:{type:String}, profit:{type:Number}}
    ],
    payment_details:[{txn_id:{type:String}, amnt_paid:{type:String}}],
    served_by:{type:mongoose.Types.ObjectId, ref:'User'},
    tx_total:{type:String}

},{timestamps:true})