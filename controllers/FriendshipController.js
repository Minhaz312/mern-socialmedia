import mongoose from 'mongoose'
import UserModel from './../models/UserModel.js'
import ChatModel from './../models/chats/ChatModel.js'
import NotificationModel from './../models/NotificationModel.js'
import eventManager from '../utils/EventManager.js'
import FriendListModel from '../models/FriendListModel.js'
import { FRIENDSHIP_STATUS } from '../utils/constants.js'

export const getAllFriends = async (req,res) => {
    try {
        let friendList = await FriendListModel.find({userId:req.body.myId});
        let formatedFriendList = []
        if(friendList.length>0){
            friendList.map(friend=>{
                const friendData = {_id:friend._id,userId:friend.userId,friendId:friend.friendId,friend_name:friend.friend_name,friend_mail:friend.friend_mail,requestedBy:friend.requestedBy,accepted:friend.accepted,friend_image:friend.friend_image,createdAt:friend.createdAt,updatedAt:friend.updatedAt}
                if(friend.accepted){
                    formatedFriendList.push({...friendData,requestStatus:FRIENDSHIP_STATUS.FRIEND})
                }else{
                    if(friend.requestedBy.toString()==req.body.myId.toString()){
                        formatedFriendList.push({...friendData,requestStatus:FRIENDSHIP_STATUS.REQUESTED_BY_ME})
                    }else{
                        formatedFriendList.push({...friendData,requestStatus:FRIENDSHIP_STATUS.REQUESTED_BY_FRIEND})
                    }
                }
            })
        }
        res.status(200)
        res.json({success:true,data:formatedFriendList});
    } catch (error) {
        console.log(error)
        res.status(500)
        res.json({success:false,data:null});
    }
}

export const getPaginatedFriends = async (req,res) => {
    try {
        const {page} = req.params;
        const take = 24
        const skip = Number(page)*take
        const friendList = await FriendListModel.find({userId:mongoose.Types.ObjectId(req.body.myId)}).skip(skip).limit(take).sort({_id:-1});
        let formatedFriendList = []
        let friendIdList = []
        friendList.map(fr=>{
            friendIdList.push({friendId:fr._id,userId:mongoose.Types.ObjectId(req.body.myId)})
            friendIdList.push({userId:fr._id,friendId:mongoose.Types.ObjectId(req.body.myId)})
        })
        // const lastMessageOfEachFriend = await ChatModel.findMany({
        //     friendId:{$in:friendIdList},
        //     friendId:{$in:friendIdList},
        // })
        // console.log('lastMessageOfEachFriend: ',lastMessageOfEachFriend)
        if(friendList.length>0){
            friendList.map(friend=>{
                const friendData = {_id:friend._id,userId:friend.userId,friendId:friend.friendId,friend_name:friend.friend_name,friend_mail:friend.friend_mail,requestedBy:friend.requestedBy,accepted:friend.accepted,friend_image:friend.friend_image,createdAt:friend.createdAt,updatedAt:friend.updatedAt}
                if(friend.accepted){
                    formatedFriendList.push({...friendData,requestStatus:FRIENDSHIP_STATUS.FRIEND})
                }else{
                    if(friend.requestedBy.toString()==req.body.myId.toString()){
                        formatedFriendList.push({...friendData,requestStatus:FRIENDSHIP_STATUS.REQUESTED_BY_ME})
                    }else{
                        formatedFriendList.push({...friendData,requestStatus:FRIENDSHIP_STATUS.REQUESTED_BY_FRIEND})
                    }
                }
            })
        }
        res.status(200)
        res.json({success:true,data:formatedFriendList});
    } catch (error) {
        console.log('error from get friend paginated: ',error)
        res.status(500)
        res.json({success:false,message:"Failed to fetch!"})
    }
}


export const getPaginatedFriendByChat = async (req,res) => {
    try {
        const {page} = req.params;
        const take = 12
        const skip = Number(page)*take
        // last take=12 chat list
        const lastTakeChatList = await ChatModel.aggregate([
            {
                $match:{
                    $or:[
                        {userId:mongoose.Types.ObjectId(req.body.myId)},
                        {friendId:mongoose.Types.ObjectId(req.body.myId)}
                    ]
                }
            },
            {
                $group:{
                    _id:"$friendId"
                }
            },
            {$sort: {_id: 1}},
            {$limit:take},
            {$skip:skip}
        ])
        let friendIdList = []
        console.log('lastTakeChatList: ',lastTakeChatList)
        lastTakeChatList.map(fr=>{
            if(fr._id.toString()!=req.body.myId.toString()){
                friendIdList.push({userId:mongoose.Types.ObjectId(req.body.myId),friendId:fr._id})
            }
        })
        // console.log('lastTakeChatList: ',lastTakeChatList)
        console.log('friendIdList: ',friendIdList)
        const friendList = await FriendListModel.find({$in:friendIdList});
        console.log('friendList by lastTakeChatList: ',friendList)
        // console.log('friendList by chat: ',friendList)
        // TODO::assign last message to each friend
        // let formatedFriendList = []
        // if(friendList.length>0){
        //     friendList.map(friend=>{
        //         const friendData = {_id:friend._id,userId:friend.userId,friendId:friend.friendId,friend_name:friend.friend_name,friend_mail:friend.friend_mail,requestedBy:friend.requestedBy,accepted:friend.accepted,friend_image:friend.friend_image,createdAt:friend.createdAt,updatedAt:friend.updatedAt}
        //         if(friend.accepted){
        //             formatedFriendList.push({...friendData,requestStatus:FRIENDSHIP_STATUS.FRIEND})
        //         }else{
        //             if(friend.requestedBy.toString()==req.body.myId.toString()){
        //                 formatedFriendList.push({...friendData,requestStatus:FRIENDSHIP_STATUS.REQUESTED_BY_ME})
        //             }else{
        //                 formatedFriendList.push({...friendData,requestStatus:FRIENDSHIP_STATUS.REQUESTED_BY_FRIEND})
        //             }
        //         }
        //     })
        // }
        res.status(200)
        res.json({success:true,data:friendList});
    } catch (error) {
        console.log('error from get friend paginated: ',error)
        res.status(500)
        res.json({success:false,message:"Failed to fetch!"})
    }
}


// DONE
export const sendFriendRequest = async (req,res) => {
    console.log('sending request')
    try {
        const {friendId,myId} = req.body;
        const isAlreadyFriend = await FriendListModel.findOne({userId:myId,friendId:mongoose.Types.ObjectId(friendId)}).countDocuments();
        if(isAlreadyFriend>0){
            res.status(400)
            res.json({success:false,message:"Already requested"})
        }else{
            const myData = await UserModel.findById(mongoose.Types.ObjectId(myId));
            const friendData = await UserModel.findById(mongoose.Types.ObjectId(friendId));
            let authUserFriendItem = {
                userId:mongoose.Types.ObjectId(myId),
                friendId: mongoose.Types.ObjectId(friendId),
                friend_name:friendData.username,
                friend_mail:friendData.mail,
                requestedBy:mongoose.Types.ObjectId(myId),
            }
            if(friendData.image!=null){
                authUserFriendItem.friend_image = friendData.image
            }
            let friendsFriendItem = {
                userId:mongoose.Types.ObjectId(friendId),
                friendId: mongoose.Types.ObjectId(myId),
                friend_name:myData.username,
                friend_mail:myData.mail,
                requestedBy:mongoose.Types.ObjectId(myId),
            }
            if(myData.image!=null){
                friendsFriendItem.friend_image = myData.image
            }
            await FriendListModel.create([authUserFriendItem,friendsFriendItem])
            // action id is the id of who sent the request because opposite part will accept the request for which he/she will take the action against the action id
            let notification = {title:`${myData.username} sent you connection request!`,userId:friendId,seen:false,type:"connection-request",actionId:myId}
            const notificationResult = await NotificationModel.create(notification)
            eventManager.emit("connection",notificationResult)
            res.status(200)
            res.json({success:true,message:"Request sent!"})
        }
    } catch (error) {
        console.log('error: ',error)
        res.status(500)
        res.json({success:false,message:"Failed to send request!"})
    }
}
// DONE
export const acceptFriendRequest = async (req,res) => {
    try {
        const {friendId,myId} = req.body;
        const myFormatedId = mongoose.Types.ObjectId(myId)
        const friendFormatedId = mongoose.Types.ObjectId(friendId)
        const myData = await UserModel.findOne({_id:myFormatedId},{username:1,mail:1,image:1});
        await FriendListModel.updateOne({userId:myFormatedId,friendId:friendFormatedId,requestedBy:friendFormatedId},{$set:{accepted:true}});
        await FriendListModel.updateOne({userId:friendFormatedId,friendId:myFormatedId,requestedBy:friendFormatedId},{$set:{accepted:true}});
        await NotificationModel.updateOne({userId:myFormatedId,actionId:friendFormatedId},{$set:{actionTaken:true}})
        let notification = {title:`${myData.username} accepted connection request!`,userId:friendFormatedId,seen:false,type:"connection-response",actionId:friendFormatedId,actionTaken:true}
        const notificationResult = await NotificationModel.create(notification)
        eventManager.emit("connection",notificationResult)
        res.status(200)
        res.json({success:true,message:"Request sent!"})
    } catch (error) {
        console.log("err line 78: ",error)
        res.status(500)
        res.json({success:false,message:"Failed to accept"})
    }
}
// DONE
export const cancelFriendRequest = async (req,res) => {
    try {
        const {friendId,myId} = req.body;
        const myFormatedId = mongoose.Types.ObjectId(myId)
        const friendFormatedId = mongoose.Types.ObjectId(friendId)
        await FriendListModel.deleteOne({userId:myFormatedId,friendId:friendFormatedId});
        await FriendListModel.deleteOne({userId:friendFormatedId,friendId:myFormatedId});
        await NotificationModel.updateOne({userId:friendFormatedId,actionId:myFormatedId},{$set:{actionTaken:true,title:"Connection Request Cancelled"}});
        res.status(200)
        res.json({success:true,message:"Request cancelled successfully!"})
    } catch (error) {
        res.status(500)
        res.json({success:true,message:"Failed to cancel request!"})
    }
}
// DONE
export const rejectFriendRequest = async (req,res) => {
    try {
        // friendid should be provided during calling the api and no need to provide myId
        const {friendId,myId} = req.body;
        const myFormatedId = mongoose.Types.ObjectId(myId)
        const friendFormatedId = mongoose.Types.ObjectId(friendId)
        const {username:myName} = await UserModel.findById(myFormatedId,{username:true});
        const notification = {title:`${myName} rejected request`,userId:friendFormatedId,seen:false,type:"connection-request",actionTaken:true}
        const result = await NotificationModel.updateOne({userId:myFormatedId,actionId:friendFormatedId,type:"connection-request"},{$set:{actionTaken:true}});
        await FriendListModel.deleteOne({userId:myFormatedId,friendId:friendFormatedId})
        await FriendListModel.deleteOne({userId:friendFormatedId,friendId:myFormatedId})
        const notificationResult = await NotificationModel.create(notification);
        eventManager.emit("connection",notificationResult)
        res.status(200)
        res.json({success:true,message:"Request rejected!"})
    } catch (error) {
        console.log(error)
        res.status(500)
        res.json({success:false,message:"Failed to reject"})
    }
}

// later will code for deleting the chatlist
export const makeUnfriend = async (req,res) => {
    try {
        const friendId = mongoose.Types.ObjectId(req.body.friendId);
        const myId = mongoose.Types.ObjectId(req.body.myId);
        await FriendListModel.deleteOne({userId:myId,friendId:friendId})
        await FriendListModel.deleteOne({userId:friendId,friendId:myId})
        res.status(200)
        res.json({success:true,message:"Unfriend done!"})
    } catch (error) {
        console.log(error)
        res.status(500)
        res.json({success:false,message:"Failed to make unfriend"})
    }
}

export const getFriendByMyAndFriendId = async (req,res) => {
    // const result = await UserModel.findOne({_id:myFormatedId,friendList:{$elemMatch:{friendId:friendFormatedId}}},{"friendList.$":1});
}