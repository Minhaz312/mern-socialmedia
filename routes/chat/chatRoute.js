import { Router } from "express";
import AuthMiddleware from './../../middleware/AuthMiddleware.js'
import { getPaginatedMessageByFriendId, sendMessageToFriend } from "../../controllers/chat/ChatController.js";

const chatRoutes = Router();

chatRoutes.get("/get/:friendId/:page",AuthMiddleware,getPaginatedMessageByFriendId)
chatRoutes.post("/send/friend",AuthMiddleware,sendMessageToFriend)

export default chatRoutes;