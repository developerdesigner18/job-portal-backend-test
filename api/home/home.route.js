import express from "express";
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
// import { homeinfo } from "./home.model.js"
import { checkJWT } from "../../middleware/check-jwt.js"
import {
    inserthomeinfo,
    updatehomeInfo,
    deletehomeImage,
    deletehomeInfo,
    gethomeInfoAll,
    gethomeinfobyid
} from "./home.controller.js";
export const homeRouter = express.Router();
// Upload files for Home Page
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
        const extension = file.originalname.substring(file.originalname.lastIndexOf('.'));
        cb(null, Math.random().toString(36).substring(2, 15) + "_" + Date.now() + extension)
    }
})
const homeStorageMul = multer({
    storage: homeStorage,
    fileFilter: function (req, file, cb) {
        const fileType = /jpeg|jpg|png|mp4/;
        const extension = file.originalname.substring(file.originalname.lastIndexOf('.') + 1);
        const mimetype = fileType.test(file.mimetype);
        file.filepath = '/home/'
        if (mimetype && extension) {
            return cb(null, true);
        } else {
            cb('Error: you can upload only jpeg|jpg|png image or mp4 video files');
        }
    }
})
homeRouter.post("/inserthomeinfo", checkJWT, homeStorageMul.fields([{name: 'home_images', maxCount: 4}, {name: 'rd3_references_rd3_image', maxCount: 1}]), inserthomeinfo)
homeRouter.post("/updateHomeInfo", checkJWT, homeStorageMul.fields([{name: 'home_images', maxCount: 4}, {name: 'rd3_references_rd3_image', maxCount: 1}]), updatehomeInfo)
homeRouter.get("/gethomeInfoAll", checkJWT, gethomeInfoAll)
homeRouter.get("/gethomeinfobyid", checkJWT, gethomeinfobyid)
homeRouter.post("/deletehomeImage", checkJWT, deletehomeImage)
homeRouter.delete("/deletehomeInfo", checkJWT, deletehomeInfo)