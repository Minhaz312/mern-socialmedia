import mongoose from "mongoose";
import ChatModel from "../../models/chats/ChatModel.js";
import eventManager from './../../utils/EventManager.js'
import {CHAT_EVENTS_NAME} from './../../utils/constants.js'

export const getPaginatedMessageByFriendId = async (req,res) => {
    try {
        const {page,friendId} = req.params;
        const take = 20;
        const skip = Number(page)*take;
        const myFormatedId = mongoose.Types.ObjectId(req.body.myId);
        const friendFormatedId = mongoose.Types.ObjectId(friendId);
        const chatList = await ChatModel.find({
            $or:[
                {userId:myFormatedId,friendId:friendFormatedId},
                {userId:friendFormatedId,friendId:myFormatedId}
            ]
        }).skip(skip).limit(take).exec();
        res.status(200)
        res.json({success:true,data:chatList})
    } catch (error) {
        console.log('error: ',error)
        res.status(500)
        res.json({success:true,data:null})
    }
}

export const sendMessageToFriend = async (req,res) => {
    try {
        const {message,friendId,myId} = req.body;
        console.log('friendId: ',friendId)
        console.log('myId: ',myId)
        const data = {
            userId:mongoose.Types.ObjectId(myId),
            friendId:mongoose.Types.ObjectId(friendId),
            message
        }
        const result = await ChatModel.create(data);
        console.log('send message result: ',result)
        eventManager.emit(CHAT_EVENTS_NAME.CHAT_FRIEND,result)
        res.status(200)
        res.json({success:true,data:result})
    } catch (error) {
        res.status(500)
        res.json({success:true,data:null})
    }
}