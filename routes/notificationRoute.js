import { Router } from "express";
import AuthMiddleware from "../middleware/AuthMiddleware.js";
import { getNotificationByPage, getReadNotificationByPage, getUnreadNotificationByPage, markNotificationAsRead } from "../controllers/NotificationController.js";

const notificationRoutes = Router();

notificationRoutes.get("/get/:page",AuthMiddleware,getNotificationByPage)
notificationRoutes.get("/get/unread/:page",AuthMiddleware,getUnreadNotificationByPage)
notificationRoutes.get("/get/read/:page",AuthMiddleware,getReadNotificationByPage)
notificationRoutes.post("/mark-as-read",AuthMiddleware,markNotificationAsRead)


export default notificationRoutes