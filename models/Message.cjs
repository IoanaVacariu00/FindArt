const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    conversationId: {
      type: String,
    },
    sender: {
      type:mongoose.Schema.Types.ObjectId,  
      ref:'User'
    },
    text: {
      type: String,
    },
  },{ timestamps: true })

mongoose.model("Message", messageSchema);