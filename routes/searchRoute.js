import { Router } from "express";
import { searchItem } from "../controllers/SearchController.js";
import AuthMiddleware from './../middleware/AuthMiddleware.js'
const searchRouter = Router()

searchRouter.get("/:keyword",AuthMiddleware,searchItem)

export default searchRouter