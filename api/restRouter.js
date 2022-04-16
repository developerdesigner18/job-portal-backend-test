import express from "express";
import { pagesRouter } from "./pages/pages.route.js"
import { boatInfoRouter } from "./boat-info/boat-info.route.js"

export const restRouter = express.Router();
restRouter.use('/pages', pagesRouter)
restRouter.use('/boat', boatInfoRouter)