const mongoose = require('mongoose');
const {Schema} = mongoose; 
const userSchema = new Schema({
    name:{
        type:String, 
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
        index: true
    },
    phone_no:{
        type:String, 
        required:true,
        unique:true,
        match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
        index: true
    },
    password:{
        type:String, 
        required:true
    },
    },{timestamps:true})

module.exports = mongoose.model('User', userSchema);