import axios from "axios"
import { API_URL } from "./../../utils/constants"
import { jsonHeaders } from "../../helpers/axiosHeaders"

const url = API_URL+"/notification"

export const getUnreadNotification = (page=0,cb) => {
    axios.get(`${url}/get/unread/${page}`,{headers:jsonHeaders}).then(res=>{
        if(res.status === 200) {
            cb(null,res.data.data)
        }else{
            cb(true,false)
        }
    }).catch(err=>{
        cb(true,false)
    })
}

export const markNotificationAsRead = async notificationId => {
    return axios.post(`${url}/mark-as-read`,{id:notificationId},{headers:jsonHeaders});
}

export const getReadNotification = (page=0,cb) => {
    axios.get(`${url}/read/${page}`,{headers:jsonHeaders}).then(res=>{
        if(res.status === 200) {
            cb(null,res.data.data)
        }else{
            cb(true,false)
        }
    }).catch(err=>{
        cb(true,false)
    })
}
export const getNotification = (page=0,cb) => {
    axios.get(`${url}/${page}`,{headers:jsonHeaders}).then(res=>{
        if(res.status === 200) {
            cb(null,res.data.data)
        }else{
            cb(true,false)
        }
    }).catch(err=>{
        cb(true,false)
    })
}