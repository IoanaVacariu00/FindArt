const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }, 
    accountType:{
        type:String,
    },
    resetToken:String,
    expireToken:Date,
    pic:{
     type:String,
     default:"http://res.cloudinary.com/nocompany1234567/image/upload/v1661627745/g0hex2s9hndk2vzafax7.png"
    },
    followers:[{type:ObjectId, ref:"User"}],
    following:[{type:ObjectId, ref:"User"}],
    categories:[{type:String, default:'any categories'}],  
    mediums:[{type:String, default:'any mediums'}],  
    surfaces:[{type:String, default:'any surfaces'}], 
    tags:[{type:String}]
    
})

mongoose.model("User",userSchema)