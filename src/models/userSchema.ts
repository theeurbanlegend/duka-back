import mongoose from "mongoose";

export const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    phone:{type:String, required:true},
    recovery_email:{type:String, required:false},
    password:{type:String, required:true}
})