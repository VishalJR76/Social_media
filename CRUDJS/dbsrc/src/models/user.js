const validator = require('validator')
const mongoose= require('mongoose')
const jsonwebtoken= require('jsonwebtoken')

const User = mongoose.model('User', {
    First_name: {
        type: String,
        required:true,
        trim:true
    },
    Last_name: {
        type: String,
        required:true,
        trim:true
    },
    username:{
        type:String,
        required:true,
        min:3,
        max:10,
        unique:true
    },
    profilepic:{
        type:String,
        default:''
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email')
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:7,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password not contain "Password"')
            }
        }

    },
    age: {
        type: Number,
        default:0,
        validate(value){
            if(value< 18){
                throw new Error('Age must be greater than 18')
            }
        }
    },
    mobilenumber:{
        type:Number,
        unqiue:true,
        required:true
    },
    followers:{
          type:Array,
          default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    bio:{
        type:String,
        default:''
    }
})
    
module.exports=User