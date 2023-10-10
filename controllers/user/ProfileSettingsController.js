import mongoose from "mongoose";
import ProfileSettingsModel from "../../models/ProfileSettingsModel";
import has from './../../helper/has'
export const updateVisibilites = async (req,res) => {
    try {
        const data = req.body;
        if(Object.entries(data).length>0){
            await ProfileSettingsModel.updateOne({userId:mongoose.Types.ObjectId(req.body.myId)},{$set:data});
            res.status(200)
            res.json({success:true,message:"Updated successfully!"})
        }else{
            res.status(400)
            res.json({success:false,message:"No data provided"})
        }
    } catch (error) {
        console.log(error)
        res.status(500)
        res.json({success:false,message:"Failed to update!"})
    }
}