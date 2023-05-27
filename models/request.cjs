// import mongoose from "mongoose";

// const gigSchema = mongoose.Schema({  
    const mongoose = require('mongoose')
    const gigSchema = new mongoose.Schema({
    maintitle:{
        type:String,
        //required:true,
    }, 

    notes:{
        type:String
    },
    category:{
        type:String,
       // required:true,
    },
    medium:{
        type:String,
        //required:true,
    },
    surface:{
        type:String
    },
    dimension:{
        type:String
    },

    searchtag:[{
        type:String,
        //required:true,
    }],
    
    days:{
        type:String,
        //required:true,
    },
    price:{
        type:String,
        //required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        //required:true,
        ref:'User'
    },
    acceptedBy:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }], 
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    // assigned:{
    //     type:Boolean,  
    //     default: false,
    // }
},{timestamps:true})

mongoose.model("Gig", gigSchema) 


