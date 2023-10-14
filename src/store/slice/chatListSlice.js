import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading:false,
    data:undefined, // selected friend inbox with chat
    inboxActivefriend:undefined // friend data
}
// data = [
//     {
//         friendId:"akf",
//         messageList:[]
//     }
// ]

const chatListSlice = createSlice({
    name:"chatListSlice",
    initialState,
    reducers:{
        setLoadingChatList: (state,action) => {
            state.loading = action.payload
        },
        addNewChatIntoList: (state,action) => {
            if(state.data===undefined){
                state.data = [action.payload]
            }else{
                const index = state.data.findIndex(chat=>chat.friendId===action.payload.friendId)
                let oldList = state.data;
                oldList.splice(index,1)
                state.data = [action.payload,...oldList]
            }
        },
        setActiveMessengerFriend: (state,action) => {
            state.inboxActivefriend = action.payload 
        },
        addMoreChatIntoAChat: (state,action) => {
            const index = state.data.findIndex(chat=>chat.friendId===action.payload.friendId)
            let oldList = state.data;
            oldList.splice(index,1)
            state.data = [...oldList,action.payload]
        }
    }
})

export const { addNewChatIntoList, addMoreChatIntoAChat, setLoadingChatList, setActiveMessengerFriend } = chatListSlice.actions

export default chatListSlice.reducer;