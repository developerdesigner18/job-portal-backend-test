import express from "express";
import { homeRouter } from "./home/home.route.js"
import { jobinfoRouter } from "./job-info/job-info.route.js"
import { sportsinfo } from "./sports-info/sports-info.route.js"

export const restRouter = express.Router();
restRouter.use('/home', homeRouter)
restRouter.use('/job', jobinfoRouter)
restRouter.use('/sports', sportsinfo)