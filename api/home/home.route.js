import express from "express";
import {
    getHomeData,
    insertHomeData
} from "./home.controller.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import { Home } from "./home.model.js"
import { checkJWT } from "../../middleware/check-jwt.js"

export const homeRouter = express.Router();

var homeStorage = multer.diskStorage({
    destination: async function (req, file, cb) {
        
        const __dirname = path.resolve(path.dirname(''));
        const homeUploadDir = path.join(__dirname, '.', 'public', 'home');
        if (fs.existsSync(homeUploadDir)) {
            cb(null, homeUploadDir)
        }
        else {
            fs.mkdirSync(homeUploadDir, { recursive: true })
            cb(null, homeUploadDir)
        }
    },

    filename: async function (req, file, cb) {
        // const decoded = await jwt.verify(req.headers.token, configKey.secrets.JWT_SECRET);
        // const data = await Home.findOne({ page: "Home" })
        // cb(null, data._id + "_" + Date.now() + "_" + file.originalname)
        const extension = file.originalname.substring(file.originalname.lastIndexOf('.'));
        cb(null, file.fieldname + extension)
    }

})

const uploadHomeContent = multer({
    storage: homeStorage,
    fileFilter: function (req, file, cb) {
        const fileType = /jpeg|jpg|png|mp4/;
        // const fileType = /jpeg|jpg|png|gif|mp4|avi/;
        const extension = file.originalname.substring(file.originalname.lastIndexOf('.') + 1);
        const mimetype = fileType.test(file.mimetype);

        if (mimetype && extension) {
            return cb(null, true);
        } else {
            cb('Error: you can upload only jpeg|jpg|png image or mp4 video files');
        }
    }
})

homeRouter.get("/getHomeData", getHomeData)
homeRouter.post("/insertHomeData", checkJWT, uploadHomeContent.fields([{name: 'landing_video', maxCount: 1}, {name: 'image_1', maxCount: 1}]), insertHomeData)