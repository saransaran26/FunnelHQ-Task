import mongoose from "mongoose";

const Userschema = new mongoose.Schema({
    name:String,
    password:String,
})

const Usermodel = mongoose.model('usermern',Userschema)
export {Usermodel}