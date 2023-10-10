import axios from "axios";
import {API_URL} from "./../../utils/constants"
import { useNavigate } from "react-router-dom";
import { jsonHeaders } from "../../helpers/axiosHeaders";
export function loginUser(data,cb) {
  axios.post(`${API_URL}/user/login`,data).then(res=>{
    if(res.status===200 && res.data.success === true) {
        localStorage.setItem("one_auth",res.data.token)
        localStorage.setItem("one_user",res.data.user)
        cb(null,true)
    }else{
        cb(true,false)
    }
}).catch(err=>{
    cb(err,false)
})
}

export function registerUser(user,cb) {
    axios.post(`${API_URL}/user/register`,user).then(res=>{
      cb(null,true)
    }).catch(err=>{
      cb(err,false)
    })
}

export function getUserData(cb) {
    const userId = localStorage.getItem("one_user")
    axios.get(`${API_URL}/user/get/${userId}`,{headers:jsonHeaders}).then(res=>{
      if(res.status === 200 && res.data.success === true) {
        cb(null,res.data.data);
      }else{
        cb(true,false)
      }
    }).catch(err=>{
      cb(err,false)
    })
}

export function logoutUser(cb) {
    localStorage.removeItem("one_auth")
    localStorage.removeItem("one_user")
    window.location.href = "/"
}
