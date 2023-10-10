import mongoose from 'mongoose';
import UserModel from './../models/UserModel.js'
import FriendListModel from '../models/FriendListModel.js';
import { FRIENDSHIP_STATUS } from '../utils/constants.js';
export const searchItem = async (req,res) =>{
    console.log("search")
    try {
        const keyword = req.params.keyword
        const regexp = new RegExp(keyword,"i");
        console.log('keyword: ',keyword)
        const myId = mongoose.Types.ObjectId(req.body.myId);
        const myFrndList = await FriendListModel.find({userId:mongoose.Types.ObjectId(myId)})
        await UserModel.updateOne({_id:myId},{$push:{searchHistory:{title:keyword}}})
        let userSearchResult = await UserModel.find({
            $or:[
                {username: {$regex:regexp}},
                {mail: {$regex:regexp}},
            ]
        }).select("-gender -dateOfBirth -searchHistory -mail -password").limit(12).exec()
        let newResultList = []
        userSearchResult.map(people=>{
            let newPeopleWithStatus = {_id:people._id,username:people.username,image:people.image}
           myFrndList.map(myfrnd=>{
            if(myfrnd.friendId.toString()===people._id.toString()){
                if(myfrnd.accepted){
                    newPeopleWithStatus.status = FRIENDSHIP_STATUS.FRIEND
                }else{
                    if(myfrnd.requestedBy.toString()===myId.toString()){
                        newPeopleWithStatus.status=FRIENDSHIP_STATUS.REQUESTED_BY_ME
                    }else{
                        newPeopleWithStatus.status=FRIENDSHIP_STATUS.REQUESTED_BY_FRIEND
                    }
                }
            }
        })
        newResultList.push(newPeopleWithStatus)
    })
        let result = [
            {type:"people",data:newResultList}
        ]
        res.status(200)
        res.json({success:true,data:result});
    } catch (error) {
        console.log(error)
        res.status(500)
        res.json({success:false,data:null});
    }
}