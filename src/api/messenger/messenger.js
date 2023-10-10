import axios from 'axios'
import { API_URL } from '../../utils/constants'
import { jsonHeaders } from '../../helpers/axiosHeaders'

const url = API_URL+"/chat"

export function sendMessage(data) {
  return new Promise( async (resolve,reject)=>{
    const res = await axios.post(`${url}/send/friend`,data,{headers:jsonHeaders})
    if(res && res.data.success){
      resolve(res)
    }else{
      reject({success:false,error:new Error("Failed to send message")})
    }
  })
}
export function getMessage(data,cb) {
  axios.post(`${url}/get`,data).then(res=>{
    if(res.status === 200 && res.data.success === true) {
        cb(null,true)
    }else{
        cb(true,false)
    }
  }).catch(err=>{
    cb(err.message,false)
  })
}
export function getChatByFriendId(friendId,page=0){
  return new Promise(async (resolve,reject)=>{
    const res = await axios.get(`${url}/get/${friendId}/${page}`,{headers:jsonHeaders})
    resolve(res)
  })
}
