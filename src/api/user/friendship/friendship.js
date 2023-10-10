import axios from "axios"
import { API_URL } from "../../../utils/constants"
import getAuthToken from "../../../helpers/getAuthToken"
import { jsonHeaders } from "../../../helpers/axiosHeaders"
const url = API_URL+"/friendship"
export const sendFriendRequest = (friend,cb) => {
    try {
        axios.post(`${url}/request/send`,{friendId:friend._id},{headers:jsonHeaders}).then(res=>{
            if(res.status === 200){
                cb(null,true)
            }else{
                cb(true,false)
            }
        }).catch(err=>{
            console.log(err)
            cb(true,false)
        })
    } catch (error) {
        console.log(error)
        cb(true,false)
    }
}

export const cancelFriendRequest = async (friendId) => {
    return await axios.post(`${url}/request/cancel`,{friendId},{headers:jsonHeaders})
}
export const rejectFriendRequest = async (friendId) => {
    return await axios.post(`${url}/request/reject`,{friendId},{headers:jsonHeaders})
}

export const acceptFriendshipRequest = (friendId,cb) => {
    try {
        const {user} = getAuthToken()
        const myId = user;
        axios.post(`${url}/request/accept`,{friendId,myId},{headers:jsonHeaders}).then(res=>{
            if(res.status === 200 && res.data.success === true) {
                cb(null,true)
            }else{
                cb(true,false)
            }
        })
    } catch (error) {
        cb(error.message || true,false)
    }
}

export const getFriendsByChat = (page=0) => {
    return new Promise(async(resolve,reject)=>{
        const res = await axios.get(`${url}/get/by/chat/${page}`,{headers:jsonHeaders});
        console.log('res of friend list by chat: ',res)
        resolve("asdf")
    })
}

export const makeUnfriend = (friendId,cb) => {
    return axios.post(`${url}/unfriend`,{friendId},{headers:jsonHeaders})
}