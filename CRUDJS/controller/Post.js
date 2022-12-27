const post = require('../dbsrc/src/models/post')
const soc = require('../routers/soc')
const transporter = require('../emails/account')

async function createPost(req,res){
    const posts = new post({
        
        Pic: req.body.Pic,
    caption: req.body.caption,
    location: req.body.location,
    userid:req.body.userid,
    likes: req.body.likes,
  
    
    })
    var count = posts.likes.length
    
    try {
        const posted = await posts.save()
        res.status(201).json({message:'Posted Successfully',data:posted,count}) 

    } catch (error) {
       res.send(error)
    }
    
}

async function editPost(req,res){
    try {
        const posts = await post.findById(req.params.id)
        console.log('Updating')
        posts.caption = req.body.caption
        posts.location = req.body.location
        const p1= await posts.save()
        res.status(202).json({message:'Updated Succefully'})
    } catch (error) {
          res.send(err)
    }
}

async function deletepost(req,res){
    try {
        const posts = await post.findByIdAndDelete(req.params.id)
        console.log('On Process')
        res.status(410).json({message:'Deleted Successfully'})
    } catch (error) {
        res.send(error)
    }
}

async function like(req,res){
   try {
    const posts = await post.findById(req.params.id)
    if(!posts.likes.includes(req.body.userId)){
        await posts.updateOne({$push:{likes:req.body.userId}})
        res.status(200).json({message:'You liked the post'})
       } else{
         await posts.updateOne({$pull:{likes:req.body.userId}})
       res.status(200).json({message:'You disliked the post'})
     } 
   } catch (error) {
       res.status(500).json({message:error})
   }
    
}

module.exports ={
    createPost,
    editPost,
    deletepost,
    like
}