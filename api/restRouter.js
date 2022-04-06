import express from "express";
import { homeRouter } from "./home/home.route.js"
import { boatInfoRouter } from "./boat-info/boat-info.route.js"

export const restRouter = express.Router();
restRouter.use('/home', homeRouter)
restRouter.use('/boat', boatInfoRouter)