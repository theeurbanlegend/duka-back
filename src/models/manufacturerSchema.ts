import mongoose from "mongoose"; 

export const manufacturerSchema=new mongoose.Schema({
    man_name:{type:String,required:true},
    man_phone:{type:String, required:true}
})