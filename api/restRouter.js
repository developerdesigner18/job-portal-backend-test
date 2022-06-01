import express from "express";
import { homeRouter } from "./home/home.route.js"
import { jobinfoRouter } from "./job-info/job-info.route.js"
import { sportsinfoRouter } from "./sports-info/sports-info.route.js"
import { userInfoRouter } from "./user-info/user-info.route.js"
export const restRouter = express.Router();
restRouter.use('/job', jobinfoRouter)
restRouter.use('/sports', sportsinfoRouter)
restRouter.use('/users', userInfoRouter)
restRouter.use('/home', homeRouter)