import mongoose, { Schema } from "mongoose";

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
    requestedBy:{type:mongoose.Types.ObjectId,required:true},
    accepted:{type:Boolean,default:false},
    friend_image:{
        type:String,
        default:null
    }
},{timestamps:true,versionKey:false});

const FriendListModel = mongoose.model("FriendList",FriendSchema)

export default FriendListModel;