import mongoose from 'mongoose'
import NotificationModel from './../models/NotificationModel.js'

export const getUnreadNotificationByPage = async (req,res) => {
    try {
        const {page} = req.params;
        const take = 10;
        const myFormatedId = mongoose.Types.ObjectId(req.body.myId)
        const result = await NotificationModel.find({userId:myFormatedId,seen:false}).skip(page*take).limit(take).exec();
        res.status(200)
        res.json({success:true,data:result})
    } catch (error) {
        res.status(500)
        res.json({success:false,data:null})
    }
}

export const getReadNotificationByPage = async (req,res) => {
    try {
        const {page} = req.params;
        const take = 10;
        const myFormatedId = mongoose.Types.ObjectId(req.body.myId)
        console.log("myFormatedId: ",myFormatedId)
        console.log("page: ",page)
        const result = await NotificationModel.find({userId:myFormatedId,seen:true}).skip(page*take).limit(take).exec();
        res.status(200)
        res.json({success:true,data:result})
    } catch (error) {
        res.status(500)
        res.json({success:false,data:null})
    }
}

export const getNotificationByPage = async (req,res) => {
    try {
        const {page} = req.params;
        const take = 15;
        const myFormatedId = mongoose.Types.ObjectId(req.body.myId)
        console.log("myFormatedId: ",myFormatedId)
        console.log("page: ",page)
        const result = await NotificationModel.find({userId:myFormatedId}).skip(page*take).limit(take).exec();
        res.status(200)
        res.json({success:true,data:result})
    } catch (error) {
        res.status(500)
        res.json({success:false,data:null})
    }
}

export const markNotificationAsRead = async (req,res) => {
    try {
        const {id} = req.body;
        await NotificationModel.updateOne({_id:mongoose.Types.ObjectId(id)},{$set:{seen:true}});
        res.status(200)
        res.json({success:true,message:"Marked as read"});
    } catch (error) {
        res.status(500)
        res.json({success:true,message:"Failed to mark as read"});
    }
}