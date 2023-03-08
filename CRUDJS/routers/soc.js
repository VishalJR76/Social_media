var express = require('express')
var auth = require('../middleware/auth')
var router = express.Router()
var usercontroller = require('../controller/User')
var postcontroller = require('../controller/Post')


router.post('/signup',usercontroller.SignUp)   
router.get('/Login',usercontroller.LogIN) 
router.patch('/edit/:id',auth,usercontroller.editUser)
router.delete('/delete/:id',auth,usercontroller.deleteUser)
router.put("/follow/:id",auth,usercontroller.follow)

router.post('/createpost',auth,postcontroller.createPost)
router.patch('/editpost/:id',auth,postcontroller.editPost)
router.delete('/deletepost/:id',auth,postcontroller.deletepost)
router.put('/post/:id',auth,postcontroller.like)
router.get('/getpost/:id',postcontroller.comment)

const multer= require('multer')
const upload = multer({
    dest:'avatars',
    limits:{
        fileSize:10000000
    },
    fileFilter(req,file,cb){
         if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload a JPG, PNG, JPEG file'))
         }
         cb(undefined,true)
    }
})
router.post('/me/avatars',upload.single('avatars'),(req,res)=>{
    res.status(200).json({message:'File uploaded'})
})
module.exports=router