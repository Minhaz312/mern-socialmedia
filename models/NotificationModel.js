import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema({
    title:{type:String,required:true},
    userId:{type:mongoose.Types.ObjectId,required:true,index:true},
    seen:{type:Boolean,default:false},
    type:{type:String,required:true,enums:["connection-request","connection-response"]},
    actionId:{type:mongoose.Types.ObjectId,default:null},
    actionTaken:{type:Boolean,default:false}
},{timestamps:true})

const NotificationModel = mongoose.model("notifications",notificationSchema);

export default NotificationModel;