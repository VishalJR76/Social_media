const express = require("express");
const soc = require("../routers/soc");
const user = require("../dbsrc/src/models/user");
const { hashgenerate } = require("../helpers/hashing");
const { hashvalidate } = require("../helpers/hashing");
const app = express();
const usercontroller = require("../routers/soc");
const pvalid = require("../helpers/password");
const { tokengenerate } = require("../helpers/token");
const { tokenvalidate } = require("../helpers/token");
const dotenv = require("dotenv");
const auth = require("../middleware/auth");
const User = require("../dbsrc/src/models/user");


dotenv.config();

async function SignUp(req, res) {
  const hashpassword = await hashgenerate(req.body.password);
  const low_email = req.body.email.toLowerCase();
  const users = new user({
    First_name: req.body.First_name,
    Last_name: req.body.Last_name,
    username:req.body.username,
    email: low_email,
    password: hashpassword,
    age: req.body.age,
    mobilenumber: req.body.mobilenumber,
    followers:req.body.followers,
    following:req.body.following,
    bio:req.body.bio
  });
  try {
    if (!pvalid.validate(req.body.password)) {
      res.status(400).json({ message: "Not matching the password Criteria" });
      return;
    }
    const t = await users.save();
    
    res.status(201).json({ message: "Added Successfully", data: t });
  } catch (err) {
    res.send(err);
  }
}

async function LogIN(req, res) {
  try {
    const exist = await user.findOne({ email: req.body.email });
    if (!exist) {
      res.status(400).json("Email unavailable");
      return;
    }
    const exist1 = await hashvalidate(req.body.password, exist.password);
    console.log(exist1);
    if (!exist1) {
      res.status(400).json("Password invalid");
      return;
    }
    console.log('ddd');
    const token = await tokengenerate(exist.email);
    // console.log(token);
    // res.cookie("jwt", token);

    res.status(202).json({ message: "Welcome to Soc Media", data: token });
  } catch (err) {
    res.send('err');
  }
}
async function editUser(req,res){
     try {
          const users = await user.findById(req.params.id)
          if(!users){
            return res.status(404).json({message:'User Not Found'})
          }
          console.log('Updating')
          users.First_name= req.body.First_name
          // console.log(users.First_name)
          const u1=await users.save()
          res.status(202).json({message:'Updated Successfully'})
     } catch (error) {
       res.send(error)
     }
}

async function deleteUser(req,res){
  try {
          const users= await user.findByIdAndDelete(req.params.id)
          if(!users){
            return res.status(404).json({message:'User not found'})
          }
          console.log('On Process')
          res.status(410).json({message:'Deleted Successfully'})
  } catch (error) {
    res.send(error)
  }
}

async function follow(req,res){
    if(req.body.userId!== req.params.id)
    {
      
        try {
          const users= await user.findById(req.params.id)
 
          const currentuser = await user.findById(req.body.userId)
          
          if(!users.followers.includes(req.body.userId)){
             await users.updateOne({$push:{followers:req.body.userId}})
             await currentuser.updateOne({$push:{following:req.params.id}})
             res.status(200).json({message:'You are follwing the user'})
            } else{
              await users.updateOne({$pull:{followers:req.body.userId}})
             await currentuser.updateOne({$pull:{following:req.params.id}})
            res.status(200).json({message:'Unfollowed the user'})
          }   
        } catch (error) {
           res.send(error)
        }
        }
    else{
      res.status(403).json({message:'You cant follow yourself'})
    }
}

async function profile_pic(req,res){
  res.send()
}

module.exports = {
  SignUp,
  LogIN,
  editUser,
  deleteUser,
  follow
};
