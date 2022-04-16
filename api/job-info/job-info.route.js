import express from "express";
import {
    getjobInfoAll,
    getActivejobInfoAll,
    getjobInfoAllByType,
    getjobInfoById,
    insertjobInfo,
    updatejobInfo,
    changejobStatus,
    deletejobInfo
} from "./job-info.controller.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import { jobInfo } from "./job-info.model.js"
import { checkJWT } from "../../middleware/check-jwt.js"

export const jobinfoRouter = express.Router();

var jobInfoStorage = multer.diskStorage({
    destination: async function (req, file, cb) {
        
        const __dirname = path.resolve(path.dirname(''));
        const jobInfoUploadDir = path.join(__dirname, '.', 'public', 'job-info');
        if (fs.existsSync(jobInfoUploadDir)) {
            cb(null, jobInfoUploadDir)
        }
        else {
            fs.mkdirSync(jobInfoUploadDir, { recursive: true })
            cb(null, jobInfoUploadDir)
        }
    },

    filename: async function (req, file, cb) {
        // const decoded = await jwt.verify(req.headers.token, configKey.secrets.JWT_SECRET);
            // const data = await jobInfo.findOne({ page: "Home" })
            const extension = file.originalname.substring(file.originalname.lastIndexOf('.'));
            cb(null, Math.random().toString(36).substring(2, 15) + "_" + Date.now() + extension)
    }
})

const uploadjobImages = multer({
    storage: jobInfoStorage,
    fileFilter: function (req, file, cb) {
        const fileType = /jpeg|jpg|png/;
        // const fileType = /jpeg|jpg|png|gif|mp4|avi/;
        const extension = file.originalname.substring(file.originalname.lastIndexOf('.') + 1);
        const mimetype = fileType.test(file.mimetype);
        file.filepath = '/job-info/'

        if (mimetype && extension) {
            return cb(null, true);
        } else {
            cb('Error: you can upload only jpeg|jpg|png image files');
        }
    }
})

jobinfoRouter.get("/getjobInfoAll", getjobInfoAll)
jobinfoRouter.get("/getActivejobInfoAll", getActivejobInfoAll)
jobinfoRouter.get("/getjobInfoAllByType", getjobInfoAllByType)
jobinfoRouter.get("/getjobInfoById", getjobInfoById)
jobinfoRouter.post("/insertjobInfo", checkJWT, uploadjobImages.fields([{name: 'cover_image', maxCount: 1}, {name: 'job_images', maxCount: 20}]), insertjobInfo)
jobinfoRouter.post("/updatejobInfo", checkJWT, uploadjobImages.fields([{name: 'cover_image', maxCount: 1}, {name: 'job_images', maxCount: 20}]), updatejobInfo)
jobinfoRouter.post("/changejobStatus", checkJWT, changejobStatus)
jobinfoRouter.delete("/deletejobInfo", checkJWT, deletejobInfo)