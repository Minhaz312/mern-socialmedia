import { Router } from "express";
import userFeatures from "../controllers/UserController.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";
import friendshipRoutes from "./friendshipRoute.js";

const userRoutes = Router();

userRoutes.post("/register",userFeatures.registerUser)
userRoutes.post("/add/friend/:userId",AuthMiddleware,userFeatures.loginUser)
userRoutes.get("/get/:userId",AuthMiddleware,userFeatures.getUserById)
userRoutes.put("/update/:userId",AuthMiddleware,userFeatures.updateUser)
userRoutes.delete("/delete/:userId",AuthMiddleware,userFeatures.deleteUser)

userRoutes.post("/login",userFeatures.loginUser)
userRoutes.get("/logout",AuthMiddleware,userFeatures.logoutUser)

export default userRoutes;