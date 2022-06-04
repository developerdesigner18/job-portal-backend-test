import express from "express";
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import { checkJWT } from "../../middleware/check-jwt.js"
import {
    insertbloginfo,
    updateBlogInfo,
    getBlogInfoAll,
    deleteBlogInfo,
    getbloginfobyid,
    inserttravelinfo,
    updateTravelInfo,
    getTravelInfoAll,
    getTravelinfobyid,
    deleteTravelInfo,
    deleteTravelImage,
    deleteBlogImage,
    getTravelInfoAllByType

} from "./sports-info.controller.js";
export const sportsinfoRouter = express.Router();

var sportsinfoStorage = multer.diskStorage({
    destination: async function (req, file, cb) {
        
        const __dirname = path.resolve(path.dirname(''));
        const sportsinfoUploadDir = path.join(__dirname, '.', 'public', 'sports-info');
        if (fs.existsSync(sportsinfoUploadDir)) {
            cb(null, sportsinfoUploadDir)
        }
        else {
            fs.mkdirSync(sportsinfoUploadDir, { recursive: true })
            cb(null, sportsinfoUploadDir)
        }
    },

    filename: async function (req, file, cb) {
        // const decoded = await jwt.verify(req.headers.token, configKey.secrets.JWT_SECRET);
            // const data = await sportsinfo.findOne({ page: "Home" })
            const extension = file.originalname.substring(file.originalname.lastIndexOf('.'));
            cb(null, Math.random().toString(36).substring(2, 15) + "_" + Date.now() + extension)
    }
})

const uploadsportsImages = multer({
    storage: sportsinfoStorage,
    fileFilter: function (req, file, cb) {
        const fileType = /jpeg|jpg|png/;
        // const fileType = /jpeg|jpg|png|gif|mp4|avi/;
        const extension = file.originalname.substring(file.originalname.lastIndexOf('.') + 1);
        const mimetype = fileType.test(file.mimetype);
        file.filepath = '/sports-info/'

        if (mimetype && extension) {
            return cb(null, true);
        } else {
            cb('Error: you can upload only jpeg|jpg|png image files');
        }
    }
})

// Blog info apis

sportsinfoRouter.post("/insertbloginfo", checkJWT, uploadsportsImages.fields([{name: 'cover_image_blog', maxCount: 1},{name: 'cover_images', maxCount: 5}]), insertbloginfo)
sportsinfoRouter.post("/updatebloginfo", checkJWT, uploadsportsImages.fields([{name: 'cover_image_blog', maxCount: 1},{name: 'cover_images', maxCount: 5}]), updateBlogInfo)
sportsinfoRouter.get("/getBlogInfoAll", getBlogInfoAll)
sportsinfoRouter.get("/getbloginfobyid", getbloginfobyid)
sportsinfoRouter.post("/deleteBlogInfo", checkJWT, deleteBlogInfo)
sportsinfoRouter.post("/deleteBlogImage", checkJWT, deleteBlogImage)



// Travel Info apis

sportsinfoRouter.post("/inserttravelinfo", checkJWT, uploadsportsImages.fields([{name: 'cover_image_travel', maxCount: 1} ,{name: 'travel_images', maxCount: 20}]), inserttravelinfo)
sportsinfoRouter.post("/updateTravelInfo", checkJWT, uploadsportsImages.fields([{name: 'cover_image_travel', maxCount: 1} , {name: 'travel_images', maxCount: 20}]), updateTravelInfo)
sportsinfoRouter.post("/deleteTravelInfo", checkJWT, deleteTravelInfo)
sportsinfoRouter.post("/deleteTravelImage", checkJWT, deleteTravelImage)
sportsinfoRouter.get("/getTravelInfoAll", getTravelInfoAll)
sportsinfoRouter.get("/getTravelinfobyid", getTravelinfobyid)
sportsinfoRouter.get("/getTravelInfoAllByType", getTravelInfoAllByType)
