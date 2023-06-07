const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin  = require('../middleware/requireLogin.cjs')
const Gig = mongoose.model("Gig")
const User = mongoose.model("User")

router.get('/allrequests',requireLogin,(req,res)=>{
    Gig.find({
        $and:[
            {user:{$not:{$eq:req.user._id}}}, {assigned : false}
        ]
        
    })
    .populate("user","_id name ")
    .sort('-createdAt')
    .then((requests)=>{
        res.json({requests})
    })               
    .catch(err=>{
        console.log(err)
    })
})  

router.get('/assigned',requireLogin,(req,res)=>{
    Gig.find({
        $and:[
            {user:req.user._id}, {assigned : true}
        ]
        
    })
    .populate("user","_id name")
    .sort('-createdAt')
    .then((requests)=>{
        res.json({requests})
    })               
    .catch(err=>{
        console.log(err)
    })
}) 

router.get('/unassigned',requireLogin,(req,res)=>{
    Gig.find({
        $and:[
            {user:req.user._id}, {assigned : false}
        ]
        
    })
    .populate("user","_id name")
    .sort('-createdAt')
    .then((requests)=>{
        res.json({requests})
    })               
    .catch(err=>{
        console.log(err)
    })
})   

router.get('/requestsbyme',requireLogin,(req,res)=>{
    Gig.find({user:req.user._id})
    .populate("user","_id name")
    .sort('-createdAt')
    .then((requests)=>{
        res.json({requests})
    })               
    .catch(err=>{
        console.log(err)
    })
}) 

router.get('/requestsby/:userid',requireLogin,(req,res)=>{
    Gig.find({user:req.params.userid})
    .populate("user","_id name")
    .sort('-createdAt')
    .then((requests)=>{
        res.json({requests})
    })               
    .catch(err=>{
        console.log(err)
    })
}) 

router.get('/assigned_to_me',requireLogin,(req,res)=>{
    Gig.find({$and:[{assignedTo:{$exists: true}},{assignedTo:req.user._id}]})
    .populate("user","_id name")
    .sort('-createdAt')
    .then((requests)=>{
        res.json({requests})
    })               
    .catch(err=>{
        console.log(err)
    })
})       
        

// router.get('/suggested_requests/:userid',requireLogin,(req,res)=>{
//     User.findOne({_id:req.params.userid})  
//     .select("-password")
//     .then(artist=>{
//         Gig.find({   
//             $and:[   
//                 {assigned:{$eq:false}},
//                 {$or:[
//                         {user:{$not:{$eq:req.params.userid}}},
//                         {category:{$or:[{$in:artist.categories},{$eq:"any categories"}]}},
//                         {medium:{$or:[{$in:artist.mediums},{$eq:"any mediums"}]}},
//                         {surface:{$or:[{$in:artist.surfaces},{$eq:"any surfaces"}]}},
//                         {searchtag:{$or:[{$in:artist.tags},{$eq:""}]}}
//                     ] 
//                 }]
//             }) 
//         .populate("user", "_id name")
//         .exec((err,requests)=>{
//             if(err){
//                 return res.status(422).json({error:err})
//             }
//             res.json({artist,requests})
//         })
//     }).catch(err=>{
//         return res.status(404).json({error:"User not found"})
//     })
// })

router.get("/potential_sellers/:requestid", requireLogin,(req,res)=>{  
    Gig.findOne({_id:req.params.requestid})  
    .then(request => { 
        User.find({_id:{$in:request.acceptedBy}})  
        .select('-password')
        .exec((err,artists)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            res.json({request, artists})
         })
     }).catch(err=>{
        return res.status(404).json({error:"Not found"})
    })
})

router.post('/createrequest',requireLogin,(req,res)=>{
    const {maintitle, notes, category, medium, surface, dimension, searchtag, price, days} = req.body 
    if(!maintitle || !notes ){
      return res.status(422).json({error:"Please add all the required fields"})
    }
    req.user.password = undefined
    const request = new Gig({
        maintitle,
        notes, 
        category, 
        medium, 
        surface, 
        dimension, 
        searchtag,
        price,
        days,
        user:req.user,
    })
    request.save().then(result=>{
        res.json({request:result})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.delete('/deleterequest/:requestId',requireLogin,(req,res)=>{
    Gig.findOne({_id:req.params.requestId})
    .populate("user","_id")
    .exec((err,request)=>{
        if(err || !request){
            return res.status(422).json({error:err})
        }
        if(request.user._id.toString() === req.user._id.toString()){
              request.remove()
              .then(result=>{
                  res.json(result)
              }).catch(err=>{
                  console.log(err)
              })
        }
    })
})

router.put('/acceptrequest',requireLogin,(req,res)=>{
   
    Gig.findByIdAndUpdate(req.body.requestId,{ 
        $push:{acceptedBy:req.user._id}
    },{
        new:true
    })
    .populate("user","_id name")
    .exec((err,result)=>{
       
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})  

router.put('/declinerequest',requireLogin,(req,res)=>{
   
    Gig.findByIdAndUpdate(req.body.requestId,{ 
        $pull:{acceptedBy:req.user._id}
    },{
        new:true
    })
    .populate("user","_id name")
    .exec((err,result)=>{         
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})  


router.put('/assignRequest/:requestid',requireLogin,(req,res)=>{
    Gig.findByIdAndUpdate(req.params.requestid,
    { 
        $set:{assignedTo:req.body.artistid, assigned: true}
    },{
        new:true
    })
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})  

module.exports = router