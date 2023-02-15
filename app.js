
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const express = require('express')
const app = express()
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose  = require('mongoose')
const PORT = process.env.PORT || 5000
const {MONGOURI} = require('./config/keys.cjs') 

// const userRoute = require('./routes/user.cjs')
// const messageRoute = require('./routes/message.cjs')
// const conversationRoute = require('./routes/conversation.cjs')

//connect to mongodb
mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true

})
mongoose.connection.on('connected',()=>{
    console.log("connected to mongodb")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})

require('./models/user.cjs')
require('./models/post.cjs')  
require('./models/gigModel.cjs')
require('./models/conversation.cjs')
require('./models/message.cjs')


// app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(express.json())
app.use(helmet());
app.use(morgan("common"));

app.use(require('./routes/auth.cjs'))
app.use(require('./routes/post.cjs'))
app.use(require('./routes/user.cjs'))  
app.use(require('./routes/request.cjs'))    
app.use(require('./routes/conversation.cjs'))
app.use(require('./routes/message.cjs'))  


app.use('/conversations', require('./routes/conversation.cjs'))
app.use('/messages', require('./routes/message.cjs'))
app.use("/users", require('./routes/user.cjs'))


if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT, ()=>{
    console.log("server is running on", PORT)
})


