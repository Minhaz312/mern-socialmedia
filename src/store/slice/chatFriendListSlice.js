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
        setLoadingChatFriends:(state)=>{
            state.isLoading = true
        },
        storeChatFriendList: (state,action) => {
            if(action.payload.operation==="success"){
                state.isLoading = false,
                state.isSuccess = true
                state.data = action.payload.data
            }else{
                state.isLoading = false,
                state.isError = true
            }
        },
        updateChatFriendList: (state,action) => {
            state.data = action.payload;
        }
    }
})

export const { setLoadingChatFriends, storeChatFriendList, updateChatFriendList } = friendListSlice.actions

export default friendListSlice.reducer;