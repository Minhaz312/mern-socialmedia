import axios from "axios"
import { API_URL } from "../../utils/constants"
import { jsonHeaders } from "../../helpers/axiosHeaders"
export const getSearchItem = (keyword,cb) =>{
    axios.get(`${API_URL}/search/${keyword}`,{headers:jsonHeaders}).then(res=>{
        if(res.status === 200 && res.data.success === true) {
            cb(null,res.data.data)
        }else{
            cb(true,null)
        }
    }).catch(err=>{
        console.log(err)
        cb(err.message,null)
    })
}