const mongoose = require('mongoose')

const contactModel = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    phone:{type:String, required:true},
    message:{type:String,required:true},
},
{versionKey:false}
)

const Contact = mongoose.model("contacts",contactModel)

module.exports = Contact;