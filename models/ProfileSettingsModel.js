import mongoose, { Schema } from "mongoose";

const visibilitiesSchema = new Schema({
    mail:{
        type:Boolean,
        default:false
    },
    dateOfBirth:{
        type:Boolean,
        default:false
    },
})

const settingsSchema = new Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    visibilities:{
        type: visibilitiesSchema,
        required:true
    }
},{versionKey:false})

const ProfileSettingsModel = mongoose.model("ProfileSettings",settingsSchema);

export default ProfileSettingsModel;