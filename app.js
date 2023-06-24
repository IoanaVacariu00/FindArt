
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const PORT = process.env.PORT || 5000  

const express = require('express')
const app = express()
const mongoose  = require('mongoose')
const {MONGOURI} = require('./config/keys.cjs') 

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})  

mongoose.connection.on('connected',()=>{
    console.log("Connected to MongoDB")
})

mongoose.connection.on('error',(err)=>{
    console.log("error connecting",err)
})

require('./models/user.cjs')
require('./models/post.cjs')  
require('./models/request.cjs')

app.use(express.json())

app.use(require('./routes/auth.cjs'))
app.use(require('./routes/post.cjs'))
app.use(require('./routes/user.cjs'))  
app.use(require('./routes/request.cjs'))    

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


