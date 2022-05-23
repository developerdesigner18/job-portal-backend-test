import express from "express";
import {
    getuserinfoById,

} from "./user-info.controller.js";

export const userInfoRouter = express.Router();

userInfoRouter.get("/getuserinfoById", getuserinfoById)
