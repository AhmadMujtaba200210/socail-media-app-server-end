import mongoose from "mongoose";

//When ever we going to create USer model first it will create user schema and later it passes it to user model.


// here we are going to create an schema of user model with properties and validations
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

},
{timestamps:true}); // whenever a user is registered the time will also store in the database

//then we pass the user schema to the mongoose model to create a user object model
const User=mongoose.model("User",UserSchema);

export default User;