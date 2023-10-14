import mongoose from "mongoose";
import ChatModel from "../../models/chats/ChatModel.js";
import FriendListModel from "../../models/FriendListModel.js";
import eventManager from './../../utils/EventManager.js'
import {CHAT_EVENTS_NAME} from './../../utils/constants.js'

export const getPaginatedMessageByFriendId = async (req,res) => {
    try {
        const {page,friendId} = req.params;
        const take = 20;
        const skip = Number(page)*take;
        const myFormatedId = mongoose.Types.ObjectId(req.body.myId);
        const friendFormatedId = mongoose.Types.ObjectId(friendId);
        const isFriend = await FriendListModel.findOne({userId:myFormatedId,friendId:friendFormatedId,accepted:true})
        if(isFriend==null){
            res.status(400)
            res.json({success:false,data:null})
        }else{
            const chatList = await ChatModel.find({
                $or:[
                    {userId:myFormatedId,friendId:friendFormatedId,accepted:true},
                    {userId:friendFormatedId,friendId:myFormatedId,accepted:true}
                ]
            }).skip(skip).limit(take).exec();
            res.status(200)
            res.json({success:true,data:chatList})
        }
    } catch (error) {
        console.log('error: ',error)
        res.status(500)
        res.json({success:true,data:null})
    }
}

export const sendMessageToFriend = async (req,res) => {
    try {
        const {message,friendId,myId} = req.body;
        const data = {
            userId:mongoose.Types.ObjectId(myId),
            friendId:mongoose.Types.ObjectId(friendId),
            message
        }
        const lastMessageToFriend = {
            message,
            by:mongoose.Types.ObjectId(myId)
        }
        const friendship = await FriendListModel.findOne({
            userId:mongoose.Types.ObjectId(myId),
            friendId:mongoose.Types.ObjectId(friendId),
            accepted:true
        })
        if(friendship==null) {
            res.status(400)
            res.json({success:false,data:null})
        }
        const result = await ChatModel.create(data);
        await FriendListModel.updateMany({
            $or:[
                {userId:mongoose.Types.ObjectId(myId),friendId:mongoose.Types.ObjectId(friendId)},
                {userId:mongoose.Types.ObjectId(friendId),friendId:mongoose.Types.ObjectId(myId)},
            ]
        },{
            $set:{
                lastMessage:lastMessageToFriend
            }
        })
        eventManager.emit(CHAT_EVENTS_NAME.CHAT_FRIEND,result)
        res.status(200)
        res.json({success:true,data:result})
    } catch (error) {
        res.status(500)
        res.json({success:true,data:null})
    }
}