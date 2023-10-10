import eventManager from "./EventManager.js";
import { CHAT_EVENTS_NAME } from "./constants.js";
export default function socketManager(socket) {
    // send notification to the requested friend
    eventManager.on("connection",(notification)=>{
        socket.emit(`${notification.userId.toString()}-notification`,notification)
    })
    eventManager.on(CHAT_EVENTS_NAME.CHAT_FRIEND,(chat)=>{
        socket.emit(`${chat.friendId.toString()}-chat-friend`,chat)
    })
    socket.on(CHAT_EVENTS_NAME.CHAT_TYPING,data=>{
        eventManager.emit("msg-typing",data)
    })
    eventManager.on("msg-typing",(data)=>{
        socket.emit(`${data.friendId.toString()}-chat-friend-typing`,data)
    })
    socket.on("goOnline",data=>{
        console.log("offline data: ",data)
    })
    socket.on("goOffline",data=>{
        console.log("offline data: ",data)
    })
}
