import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username:{
        type:String,
        required:[true,"Name is required"],
        index:true,
        minLength:[3,"Enter valid length of name!"],
        maxLength:[50,"Enter valid length of name!"],
    },
    mail:{
        type:String,
        required:[true,"Mail is required"],
        index:true,
        unique:[true,"Mail is already used, try another!"],
        minLength:[8,"Enter valid length of mail!"],
        maxLength:[150,"Enter valid length of mail!"],
    },
    image:{
        type:String,
        default:null
    },
    dateOfBirth:{
        type:Date,
        default:null
    },
    gender:{
        type:String,
        default:null
    },
    searchHistory:{
        type:[new Schema({
            title:{type:String,required:true}
        },{timestamps:true,versionKey:false})],
        default:[]},
    onlineStatus:{type:Boolean,required:false,default:null},
    password:{
        type:String,
        required:[true,"Password is required"],
    },
},{versionKey:false})

userSchema.methods.getFriendList = function (userId) {
    return this.find({_id:mongoose.Types.ObjectId(userId)},"friendList")
}
userSchema.methods.getFriendById = function (userId,friendId) {
    return this.find({_id:mongoose.Types.ObjectId(userId),"friendList._id":friendId},"friendList")
}

const UserModel = mongoose.model("user",userSchema)

export default UserModel;