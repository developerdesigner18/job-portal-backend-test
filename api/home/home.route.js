import express from "express";
import {
    getHomeData,
    updateHomeData,
} from "./home.controller.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import { home } from "./home.model.js"
import { checkJWT } from "../../middleware/check-jwt.js"
import {
    inserthomeinfo,
    updatehomeInfo,
    gethomeInfoAll,
    gethomeinfobyid,
    deletehomeInfo,
} from "./home.controller";

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
        const extension = file.originalname.substring(file.originalname.lastIndexOf('.'));
        cb(null, file.fieldname + extension)
    }

})

const homeStorage = multer({
    storage: homeStorage,
    fileFilter: function (req, file, cb) {
        const fileType = /jpeg|jpg|png|mp4/;
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

var homestorage = multer.diskStorage({
    destination: async function (req, file, cb) {
        
        const __dirname = path.resolve(path.dirname(''));
        const homeuploaddir = path.join(__dirname, '.', 'public', 'home');
        if (fs.existsSync(homeuploaddir)) {
            cb(null, homeuploaddir)
        }
        else {
            fs.mkdirSync(homeuploaddir, { recursive: true })
            cb(null, homeuploaddir)
        }
    },

    filename: async function (req, file, cb) {
        const extension = file.originalname.substring(file.originalname.lastIndexOf('.'));
        cb(null, file.fieldname + extension)
    }

})

const uploadhomeContent = multer({
    storage: homestorage,
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


homeRouter.post("/inserthomeinfo", checkJWT, uploadhomeContent.fields([{name: 'image_slider', maxCount: 3}]), inserthomeinfo)
homeRouter.post("/updatehomeInfo", checkJWT, uploadhomeContent.fields([{name: 'image_slider', maxCount: 3}]), updatehomeInfo)
homeRouter.get("/gethomeInfoAll", checkJWT, gethomeInfoAll)
homeRouter.get("/gethomeinfobyid", checkJWT, gethomeinfobyid)
homeRouter.post("/deletehomeInfo", checkJWT, deletehomeInfo)