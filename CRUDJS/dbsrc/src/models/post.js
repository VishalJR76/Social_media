const { ObjectID } = require('bson')
const mongoose = require('mongoose')

const Post = mongoose.model('Post',{
    Pic:{
        type:String,
        required:true,

    },
    caption:{
        type:String
    },
   
    location:{
        type:String,
    },
    userid:{
        type:String,
        required:true
    },
    likes:{
        type:Array,
        default:[]
    },
    comment:{
        type:Array,
        default:[]
    },
    commentedby:{
        type:Array,
        default:[]
    }
})

   

module.exports = Post