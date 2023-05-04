const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin  = require('../middleware/requireLogin.cjs')
const Gig = mongoose.model("Gig")

router.get('/allrequests',requireLogin,(req,res)=>{
    Gig.find()
    .populate("user","_id name")
    .sort('-createdAt')
    .then((requests)=>{
        res.json({requests})
    })               
    .catch(err=>{
        console.log(err)
    })
})
// router.get('/myrequest',requireLogin,(req,res)=>{
//     Gig.find({user:req.user._id})
//     .populate("user","_id name")
//     .then(myrequest=>{
//         res.json({myrequest})
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// })
router.get('/myrequests',requireLogin,(req,res)=>{
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
        acceptedBy
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
// router.get('/getsubpost',requireLogin,(req,res)=>{

//     Post.find({user:{$in:req.user.following}})
//     .populate("user","_id name")
//     .populate("comments.postedBy","_id name")
//     .sort('-createdAt')
//     .then(posts=>{
//         res.json({posts})
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// })
  // router.put('/unlike',requireLogin,(req,res)=>{
//     Post.findByIdAndUpdate(req.body.postId,{
//         $pull:{likes:req.user._id}
//     },{
//         new:true
//     }).exec((err,result)=>{
//         if(err){
//             return res.status(422).json({error:err})
//         }else{
//             res.json(result)
//         }
//     })
// })

// router.put('/comment',requireLogin,(req,res)=>{
//     const comment = {
//         text:req.body.text,
//         postedBy:req.user._id
//     }
//     Post.findByIdAndUpdate(req.body.postId,{
//         $push:{comments:comment}
//     },{
//         new:true
//     })
//     .populate("comments.postedBy","_id name")
//     .populate("postedBy","_id name")
//     .exec((err,result)=>{
//         if(err){
//             return res.status(422).json({error:err})
//         }else{
//             res.json(result)
//         }
//     })
// })

// router.put('/accept/:requestId',requireLogin,(req,res)=>{
//     Gig.findOne({_id:req.params.requestId})
//     .populate("accepteddBy","_id")
//     .exec((err,result)=>{
//         if(err){
//             return res.status(422).json({error:err})
//         }
//         else{
//             res.json(result)
//         }
//     })
// })


module.exports = router