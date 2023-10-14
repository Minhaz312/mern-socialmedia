import mongoose, { Schema } from 'mongoose'
const chatSchema = new Schema({
    userId:{type:mongoose.Types.ObjectId},
    messagedBy:{type:mongoose.Types.ObjectId,index:true},
    friendId:{type:mongoose.Types.ObjectId,index:true},
    messageType:{type:String,enums:["TEXT","MEDIA","AUDIO_CALL","AUDIO","VIDEO_CALL"],default:"TEXT"},
    media:{
        type: new Schema({
            type:{type:String,required:true},
            link:{type:String,required:true}
        },{versionKey:false,_id:false}),
        default:null,
        index:true
    },
    audioCallDuration:{type:Number,default:null},
    videoCallDuration:{type:Number,default:null},
    audioDuration:{type:Number,default:null},
    message:{type:String,required:true,index:true},
    reactions:[
        {
            type:{
                type:{type:String,enums:["LIKE","LOVE","DISLIKE","ANGRY"],default:"LIKE"},
                username:{type:String,required:true}
            }
        }
    ]
},{timestamps:true,versionKey:false})

const ChatModel = mongoose.model("ChatModel",chatSchema)

export default ChatModel;