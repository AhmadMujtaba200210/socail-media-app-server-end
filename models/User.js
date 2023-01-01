import mongoose from "mongoose";
// here we are going to create an object of user model with properties and validations
const UserSchema=new mongoose.Schema({
    fistName:{
        type:String,
        required:true,
        min:2,
        max:50,
    },
    lastName:{
        type:String,
        required:true,
        min:2,
        max:50,
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique: true
    },
    password:{
        type:String,
        required:true,
        min:5,
    },
    picturePath:{
        type:String,
        default:"",
    },
    friends:{
        type: Array,
        default: []
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
});