import express from "express";
import {
    getHomeData,
    updateHomeData,
    getQSpdData,
    updateQSpdData
} from "./home.controller.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import { home } from "./home.model.js"
import { checkJWT } from "../../middleware/check-jwt.js"

export const homeRouter = express.Router();

// Upload files for Home Page
var homeStorage = multer.diskStorage({
    destination: async function (req, file, cb) {
        
        const __dirname = path.resolve(path.dirname(''));
        const homeUploadDir = path.join(__dirname, '.', 'public', 'home', 'home');
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
        file.filepath = '/home/home/'
        
        if (mimetype && extension) {
            return cb(null, true);
        } else {
            cb('Error: you can upload only jpeg|jpg|png image or mp4 video files');
        }
    }
})

// Upload files for Q-Spd Page
var qSpdStorage = multer.diskStorage({
    destination: async function (req, file, cb) {
        
        const __dirname = path.resolve(path.dirname(''));
        const qSpdUploadDir = path.join(__dirname, '.', 'public', 'home', 'q-spd');
        if (fs.existsSync(qSpdUploadDir)) {
            cb(null, qSpdUploadDir)
        }
        else {
            fs.mkdirSync(qSpdUploadDir, { recursive: true })
            cb(null, qSpdUploadDir)
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

const uploadQSpdContent = multer({
    storage: qSpdStorage,
    fileFilter: function (req, file, cb) {
        const fileType = /jpeg|jpg|png|mp4/;
        // const fileType = /jpeg|jpg|png|gif|mp4|avi/;
        const extension = file.originalname.substring(file.originalname.lastIndexOf('.') + 1);
        const mimetype = fileType.test(file.mimetype);
        file.filepath = '/home/q-spd/'

        if (mimetype && extension) {
            return cb(null, true);
        } else {
            cb('Error: you can upload only jpeg|jpg|png image or mp4 video files');
        }
    }
})

homeRouter.get("/getHomeData", getHomeData)
homeRouter.post("/updateHomeData", checkJWT, uploadHomeContent.fields([{name: 'landing_video', maxCount: 1}, {name: 'image_1', maxCount: 1}]), updateHomeData)
homeRouter.get("/getQSpdData", getQSpdData)
homeRouter.post("/updateQSpdData", checkJWT, uploadQSpdContent.fields([{name: 'cover_image', maxCount: 1}, {name: 'images', maxCount: 20}]), updateQSpdData)