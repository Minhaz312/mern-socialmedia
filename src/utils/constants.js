import getAuthToken from "../helpers/getAuthToken"

const SERVER_DOMAIN="https://tubebook.onrender.com"
const prod = true
const API_URL=prod?`${SERVER_DOMAIN}/api`:"http://localhost:8080/api"

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
    FRIENDSHIP_STATUS,
    CHAT_EVENTS_NAME
}