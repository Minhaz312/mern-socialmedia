import { Router } from "express";
import { getAllFriends, acceptFriendRequest, makeUnfriend, sendFriendRequest, rejectFriendRequest, cancelFriendRequest, getPaginatedFriends, getPaginatedFriendByChat } from "../controllers/FriendshipController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";

const friendshipRoutes = Router();

// get friendship
friendshipRoutes.get("/",AuthMiddleware,getAllFriends)
friendshipRoutes.get("/get/:page",AuthMiddleware,getPaginatedFriends)
friendshipRoutes.get("/get/by/chat/:page",AuthMiddleware,getPaginatedFriendByChat)

// friendship request handling
friendshipRoutes.post("/request/send",AuthMiddleware,sendFriendRequest)
friendshipRoutes.post("/request/accept",AuthMiddleware,acceptFriendRequest)
friendshipRoutes.post("/request/reject",AuthMiddleware,rejectFriendRequest)
friendshipRoutes.post("/request/cancel",AuthMiddleware,cancelFriendRequest)

// friend blocking, doing unfriendship
friendshipRoutes.post("/block",AuthMiddleware,sendFriendRequest)
friendshipRoutes.post("/unfriend",AuthMiddleware,makeUnfriend)


export default friendshipRoutes