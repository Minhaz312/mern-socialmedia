import mongoose, { Schema, now } from "mongoose";

const FriendSchema = new Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        required:true,
    },
    friendId:{
        type:mongoose.Types.ObjectId,
        required:true,
    },
    friend_name:{
        type:String,
        required:true,
    },
    friend_mail:{
        type:String,
        required:true,
    },
    onlineStatus:{type:Boolean,required:false,default:null},
    requestedBy:{type:mongoose.Types.ObjectId,required:true},
    accepted:{type:Boolean,default:false},
    lastMessage:{
        type:{
            message:{type:String,required:true},
            by:{type:mongoose.Types.ObjectId,required:true},
            at:{type:Date,default:now()},
            seen:{type:Boolean,default:false}
        },
        default:null
    },
    friend_image:{
        type:String,
        default:null
    }
},{timestamps:true,versionKey:false});

const FriendListModel = mongoose.model("FriendList",FriendSchema)

export default FriendListModel;