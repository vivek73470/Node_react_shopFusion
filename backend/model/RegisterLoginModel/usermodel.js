const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String, required:true,unique: true,},
    password:{type:String, required:true},
    gender:{type:String,},
    number:{type:String,},
    address:{type:String,},
    DOB:{type:String,},
},
{versionKey:false}
)

// User :  JavaScript variable name that you use to interact with your Mongoose model 
// user : This is the name of the MongoDB collection where your documents are stored.
const User = mongoose.model("user",userModel)

module.exports = User;