import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading:false,
    isError:false,
    isSuccess:false,
    data:null
}

const friendListSlice = createSlice({
    name:"friendListSlice",
    initialState,
    reducers:{
        initialize:(state)=>{
            state.isLoading = true
        },
        storeFriendList: (state,payload) => {
            console.log("payload")
            if(payload.operation==="success"){
                state.isLoading = false,
                state.isSuccess = true
                state.data = payload.data
            }else{
                state.isLoading = false,
                state.isError = true
            }
        },
        deleteAFriend: (state,payload) => {
            const newList = state.data.filter(f=>f.friendId!==payload.friendId);
            state.data = newList
        }
    }
})

export const { deleteAFriend, initialize, storeFriendList } = friendListSlice.actions

export default friendListSlice;