import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import has from "../helper/has.js";
import UserModel from "./../models/UserModel.js"
import FriendListModel from "./../models/FriendListModel.js"
import ProfileSettingsModel from "../models/ProfileSettingsModel.js";
import { FRIENDSHIP_STATUS } from "../utils/constants.js";
const userFeatures = {}

// TODO: request data vlidation

userFeatures.registerUser = async (req,res) => {
    try {
        const body = req.body
        if(has(body,"username")===true && has(body,"mail")===true && has(body,"password")===true){
            const {username,mail,password} = body;
            bcrypt.genSalt(9, function(err, salt) {
                if(err){
                    res.status(500)
                    res.json({success:false,message:"Failed to create account!"});
                }else{
                    bcrypt.hash(password,salt,async (err,hashedPass)=>{
                        console.log("line 13: ",err)
                        if(err){
                            res.status(500)
                            res.json({success:false,message:"Failed to create account!"});
                        }else{
                            const result = await UserModel.create({username,mail,password:hashedPass});
                            res.status(200)
                            res.json({success:true,message:"Account created successfully!"});
                        }
                    })
                }
            });
        }else{
            res.status(400)
            res.json({success:false,message:"All fields required!"});
        }
    } catch (error) {
        console.log(error)
        res.status(500)
        res.json({success:false,message:"Failed to create account!"});
    }
}
userFeatures.addNewFriend = async (req,res) => {
    try {
        // const body = JSON.parse(req.body)
        const {name,mail,image} = req.body;
        const result = await UserModel.updateOne({_id:"64f1c6b95d89f8d6f589a292"},{$set:{friendList:{name:"friend 1",mail:"friend@mail.com",image:"image.png"}}});
        res.status(200).json({success:true,message:"Friend added successfully!"});
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Failed to add friend!"});
    }
}
userFeatures.getUserById = async (req,res) => {
    try {
        const {userId} = req.params;
        // need to filter user data according to he/she's profile settings: LATER WILL BE DONE
        // need to fetch some user's public videos,posts etc: LATER WILL BE DONE
        const user = await UserModel.findById(mongoose.Types.ObjectId(userId)).select("-searchHistory -password").exec();

        if(user==null){
            res.status(400);
            res.json({success:false,data:null})
        }else{
            let userData = {_id:user._id,username:user.username,image:user.image,mail:user.mail,gender:user.gender}
            const friend = await FriendListModel.findOne({
                userId:mongoose.Types.ObjectId(req.body.myId),
                friendId:user._id
            })
            const profileSettings = await ProfileSettingsModel.findById(mongoose.Types.ObjectId(userId))
            if(friend){
                if(friend.accepted){
                    userData.friendshipStatus = FRIENDSHIP_STATUS.FRIEND
                }else{
                    if(friend.requestedBy.toString()===req.body.myId.toString()){
                        userData.friendshipStatus = FRIENDSHIP_STATUS.REQUESTED_BY_ME
                    }else{
                        userData.friendshipStatus = FRIENDSHIP_STATUS.REQUESTED_BY_FRIEND
                    }
                }
                res.status(200)
                res.json({success:true,data:{user:userData,profileSettings}});
            }else{
                res.status(200)
                res.json({success:true,data:{user:userData,profileSettings}});
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500)
        res.json({success:false,data:{}})
    }
}
userFeatures.deleteUser = (req,res) => {
    res.json("delete user")
}
userFeatures.updateUser = (req,res) => {
    res.json("update user")
}
userFeatures.loginUser = async (req,res) => {
    try {
        const {mail,password} = req.body;
        const user = await UserModel.findOne({mail:mail});
        if(user==null){
            res.status(400);
            res.json({success:false,user:null,message:"Failed to login!"})
        }else{
            bcrypt.compare(password,user.password,async (err,result)=>{
                if(err){
                    res.status(400);
                    res.json({success:false,user:null,message:"Failed to login!"})
                }else{
                    if(result){
                        const token = jwt.sign({loggedin:true,user:user._id},process.env.JWT_SECRETE,{algorithm:"HS256"});
                        res.cookie("one_auth",token,{
                            httpOnly:true,
                            domain:"http://localhost:3000",
                            secure:true,
                            sameSite:"strict",
                            maxAge:86400000*30 // 30days
                        })
                        res.status(200)
                        res.json({success:true,token:token,user:user._id,message:"Logged in successfully!"});
                    }else{
                        res.status(400);
                        res.json({success:false,user:null,message:"Failed to login!"})
                    }
                }
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500)
        res.json({success:false,data:{}})
    }
}
userFeatures.logoutUser = async (req,res) => {
    res.cookie("one_auth",null,{
        httpOnly:true,
        domain:"http://localhost:3000",
        secure:true,
        sameSite:"strict",
        maxAge:-30 // 30days
    })
    res.redirect("http://localhost:5173/")
}

export default userFeatures;