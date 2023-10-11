import getAuthToken from "../helpers/getAuthToken"

const prod = true
const SERVER_DOMAIN=prod?"https://tubebook.onrender.com":"http://localhost:8080"
const API_URL=`${SERVER_DOMAIN}/api`

const {user} = getAuthToken()

const FRIENDSHIP_STATUS = {
    FRIEND:1,
    REQUESTED_BY_ME:2,
    REQUESTED_BY_FRIEND:3
}

const CHAT_EVENTS_NAME = {
    CHAT_FRIEND:`chat-friend`,
    CHAT_GROUP:"chat-group",
    CHAT_TYPING:"typing-message",
}


export {
    API_URL,
    SERVER_DOMAIN,
    FRIENDSHIP_STATUS,
    CHAT_EVENTS_NAME
}