const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin  = require('../middleware/requireLogin.cjs')
const Post =  mongoose.model("Post")
const User = mongoose.model("User")
const Gig = mongoose.model("Gig")  

router.get('/user/:id',requireLogin,(req,res)=>{
    User.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
         Post.find({postedBy:req.params.id})
         .populate("postedBy","_id name")
         .exec((err,posts)=>{
             if(err){
                 return res.status(422).json({error:err})
             }
             res.json({user,posts})
         })
    }).catch(err=>{
        return res.status(404).json({error:"User not found"})
    })
})   

router.get('/finduser/:id',requireLogin,(req,res)=>{   
    User.findOne({_id:req.params.id}) 
    .select("-password")
    .then(user=>{res.json({user})})
    .catch(err=>{
        return res.status(404).json({error:"User not found"})
    })
})   
 
router.get("/friends/:id", async (req, res) => {
    try {
      const user = await User.findOne({_id:req.params.id}); 
      const friends = await Promise.all(
        user.following.map((friendId) => {
          return User.findById(friendId);
        })
      );
      let friendList = [];
      friends.map((friend) => {
        const { _id, name, pic, email } = friend;
        friendList.push({ _id, name, pic, email });
      });
      res.status(200).json(friendList)
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.put('/follow',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
      User.findByIdAndUpdate(req.user._id,{
          $push:{following:req.body.followId}
          
      },{new:true}).select("-password").then(result=>{
          res.json(result)
      }).catch(err=>{
          return res.status(422).json({error:err}) 
      })

    }
    )
})              

router.put('/unfollow',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
      User.findByIdAndUpdate(req.user._id,{
        $pull:{following:req.body.unfollowId}
      },{new:true}).select("-password").then(result=>{
          res.json(result)
      }).catch(err=>{
          return res.status(422).json({error:err})
      })

    })
})
 
router.put('/updatepic',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.user._id,{$set:{pic:req.body.pic}},{new:true},
        (err,result)=>{
         if(err){
            return res.status(422).json({error:"Error uploading image"})
         }
         res.json(result)
    })
})

router.put('/setup_account',requireLogin,(req,res)=>{

    User.findByIdAndUpdate(req.user._id,
        { $set:{accountType:req.body.accountType}},{ new:true},
        (err,result)=>{
         if(err){
            return res.status(422).json({error:"Error setting up account"})
         }
         res.json(result)
        })
    })
        
router.post('/searchusers',(req,res)=>{
    let userPattern = new RegExp("^"+req.body.query)
    User.find({name:{$regex:userPattern}})
    .select("_id name")
    .then(user=>{
        res.json({user})
    }).catch(err=>{
        console.log(err)
    })
})

router.put('/save_changes',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.user._id, 
        {$set:{accountType:req.body.accountType,categories:req.body.categories, mediums: req.body.mediums, surfaces: req.body.surfaces, tags: req.body.tags}},
        {new: true},
        (err,result)=>{
            if(err){
               return res.status(422).json({error:"Error setting up account"})
            }
            res.json(result)
           }

    )
})

module.exports = router