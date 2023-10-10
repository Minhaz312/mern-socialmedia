import { Provider } from 'react-redux'

import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { userApi } from './services/user'
import friendListSlice from './slice/friendListSlice'
import { friendshipApi } from './services/friendship'
import { notificationApi } from './services/notification'
import chatListSlice from './slice/chatListSlice'


const sliceStore =  configureStore({
  reducer: {
    friendList: friendListSlice,
    chatList:chatListSlice,
  }
})
const store =  configureStore({
  reducer: {
    friendList: friendListSlice,
    chatList:chatListSlice,
    [userApi.reducerPath]:userApi.reducer,
    [friendshipApi.reducerPath]:friendshipApi.reducer,
    [notificationApi.reducerPath]:notificationApi.reducer,
  },
  middleware:getDefaultMiddleware=>{
    return getDefaultMiddleware()
    .concat(userApi.middleware)
    .concat(friendshipApi.middleware)
    .concat(notificationApi.middleware)
  }
})

setupListeners(store.dispatch)

export default function StoreProvider({children}){
  // const result = useGetFriendListQuery()
  // // console.log("isError: ",isError)
  // // console.log("isLoading: ",isLoading)
  // // console.log("isFetching: ",isFetching)
  // // console.log("data: ",data)
  return <Provider store={store}>
      {children}
    </Provider>
}