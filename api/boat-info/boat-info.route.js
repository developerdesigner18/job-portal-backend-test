import express from "express";
import {
    getBoatInfoAll,
    getBoatInfoById,
    insertBoatInfo,
    updateBoatInfo
} from "./boat-info.controller.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import { BoatInfo } from "./boat-info.model.js"
import { checkJWT } from "../../middleware/check-jwt.js"

export const boatInfoRouter = express.Router();

var boatInfoStorage = multer.diskStorage({
    destination: async function (req, file, cb) {
        
        const __dirname = path.resolve(path.dirname(''));
        const boatInfoUploadDir = path.join(__dirname, '.', 'public', 'boat-info');
        if (fs.existsSync(boatInfoUploadDir)) {
            cb(null, boatInfoUploadDir)
        }
        else {
            fs.mkdirSync(boatInfoUploadDir, { recursive: true })
            cb(null, boatInfoUploadDir)
        }
    },

    filename: async function (req, file, cb) {
        // const decoded = await jwt.verify(req.headers.token, configKey.secrets.JWT_SECRET);
            // const data = await BoatInfo.findOne({ page: "Home" })
            const extension = file.originalname.substring(file.originalname.lastIndexOf('.'));
            cb(null, Math.random().toString(36).substring(2, 15) + "_" + Date.now() + extension)
    }
})

const uploadBoatImages = multer({
    storage: boatInfoStorage,
    fileFilter: function (req, file, cb) {
        const fileType = /jpeg|jpg|png/;
        // const fileType = /jpeg|jpg|png|gif|mp4|avi/;
        const extension = file.originalname.substring(file.originalname.lastIndexOf('.') + 1);
        const mimetype = fileType.test(file.mimetype);

        if (mimetype && extension) {
            return cb(null, true);
        } else {
            cb('Error: you can upload only jpeg|jpg|png image files');
        }
    }
})

boatInfoRouter.get("/getBoatInfoAll", getBoatInfoAll)
boatInfoRouter.get("/getBoatInfoById", getBoatInfoById)
boatInfoRouter.post("/insertBoatInfo", checkJWT, uploadBoatImages.fields([{name: 'cover_image', maxCount: 1}, {name: 'boat_images', maxCount: 20}]), insertBoatInfo)
boatInfoRouter.post("/updateBoatInfo", checkJWT, uploadBoatImages.fields([{name: 'cover_image', maxCount: 1}, {name: 'boat_images', maxCount: 20}]), updateBoatInfo)