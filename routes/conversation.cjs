const router = require("express").Router();
const mongoose = require('mongoose')
const Conversation = mongoose.model('Conversation')

//new conv
router.post("/", async (req, res) => {
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });
  
    try {
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //get conv of a user
  
  router.get("/conversations/:id ", async (req, res) => {
    try {
      const conversation = await Conversation.find({
        members: { $in: [req.params.id] },
      });
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // get conv that includes two userIds
  
  router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    try {
      const conversation = await Conversation.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      res.status(200).json(conversation)
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;