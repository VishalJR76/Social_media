const express = require('express')
var  app = express()
const usercontroller = require("./routers/soc")
const mongoose = require('mongoose')
const postcontroller = require('./routers/soc')
const auth= require('./middleware/auth')
mongoose.connect('mongodb://127.0.0.1:27017/social-media', {
    useNewUrlParser: true,
    
}).then(()=>{
    console.log('DB Connected')
}).catch((err)=>{
    console.log(err)
})
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/user',usercontroller)
app.use('/post',postcontroller)
const multer = require('multer')

app.listen(PORT,()=>{
console.log('Server Running')
})
